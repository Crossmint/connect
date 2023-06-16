import { WalletPublicKeyError, WalletSignTransactionError, WalletWindowClosedError } from "@solana/wallet-adapter-base";
import { ethers } from "ethers";

import CrossmintEmbed from "../CrossmintEmbed";
import { CROSSMINT_LOGO_21x21, CrossmintWalletName } from "../consts/branding";
import { BlockchainTypes, CrossmintEmbedConfig, CrossmintEmbedParams } from "../types";
import { buildConfig } from "../utils/config";

export class CrossmintEVMWalletAdapter {
    name = CrossmintWalletName;
    url = "https://www.crossmint.com";
    icon = CROSSMINT_LOGO_21x21;

    private _connecting: boolean;
    private _publicKeys: string[];

    private _config: CrossmintEmbedConfig;
    private _client?: CrossmintEmbed;

    constructor(
        params: Omit<CrossmintEmbedParams, "chain"> & { chain: BlockchainTypes.ETHEREUM | BlockchainTypes.POLYGON }
    ) {
        this._connecting = false;
        this._publicKeys = [];

        this._config = buildConfig({ ...params });
    }

    get publicKey(): string | null {
        if (this._publicKeys.length == 0) return null;

        return this._publicKeys[0];
    }

    get publicKeys(): string[] | null {
        if (this._publicKeys.length == 0) return null;

        return this._publicKeys;
    }

    get connecting(): boolean {
        return this._connecting;
    }

    get connected(): boolean {
        return this._publicKeys.length > 0;
    }

    async connect(): Promise<string | undefined> {
        try {
            if (this.connected || this.connecting) return;

            this._connecting = true;

            const client = CrossmintEmbed.init(this._config);

            const accounts = await client.login();

            if (accounts === null) {
                throw new WalletWindowClosedError("User rejected the request");
            }
            if (accounts === undefined || accounts.length === 0) {
                throw new WalletWindowClosedError("User rejected the request or closed the window");
            }

            const publicKeys: string[] = [];
            for (const account of accounts) {
                try {
                    publicKeys.push(ethers.utils.getAddress(account));
                } catch (error: any) {
                    throw new WalletPublicKeyError(error?.message, error);
                }
            }

            this._client = client;
            this._publicKeys = publicKeys;

            // TODO: is this behavior ok?
            return this._publicKeys[0];

            // this.emit("connect", publicKey);
        } catch (error: any) {
            throw error;
        } finally {
            this._connecting = false;
        }
    }

    async disconnect(): Promise<void> {
        this._client?.cleanUp();

        this._client = undefined;
        this._publicKeys = [];

        // this.emit("disconnect");
    }

    async signMessage(message: string): Promise<string> {
        try {
            if (!this._client || !this.connected) throw new Error("Not connected");

            const signedMessage = await this._client.signMessage(new TextEncoder().encode(message));

            if (signedMessage === null) {
                throw new WalletWindowClosedError("User rejected the request");
            }
            if (signedMessage === undefined) {
                throw new WalletSignTransactionError("User rejected the request or closed the window");
            }

            return new TextDecoder().decode(signedMessage);
        } catch (error: any) {
            // this.emit("error", error);
            throw error;
        }
    }

    async signMessageWithAllAddresses(message: string): Promise<{ [publicKey: string]: string }> {
        try {
            if (!this._client || !this.connected) throw new Error("Not connected");

            const signedMessages = await this._client.signMessages(new TextEncoder().encode(message), this.publicKeys!);
            if (signedMessages === null) {
                throw new WalletWindowClosedError("User rejected the request");
            }
            if (signedMessages === undefined) {
                throw new WalletSignTransactionError("User rejected the request or closed the window");
            }
            return Object.keys(signedMessages).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: new TextDecoder().decode(signedMessages[key]),
                }),
                {}
            );
        } catch (error: any) {
            // this.emit("error", error);
            throw error;
        }
    }
}
