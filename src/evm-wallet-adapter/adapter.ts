import { ethers } from "ethers";

import CrossmintEmbed from "../CrossmintEmbed";
import { CROSSMINT_LOGO_21x21, CrossmintWalletName } from "../consts/branding";
import { BlockchainTypes, CrossmintEmbedConfig, CrossmintEmbedParams } from "../types";
import { buildConfig } from "../utils/config";

export class CrossmintEVMWalletAdapter {
    name = CrossmintWalletName;
    url = "https://www.crossmint.io";
    icon = CROSSMINT_LOGO_21x21;

    private _connecting: boolean;
    private _publicKey: string | null;

    private _config: CrossmintEmbedConfig;
    private _client?: CrossmintEmbed;

    constructor(
        params: Omit<CrossmintEmbedParams, "chain"> & { chain: BlockchainTypes.ETHEREUM | BlockchainTypes.POLYGON }
    ) {
        this._connecting = false;
        this._publicKey = null;

        this._config = buildConfig({ ...params });
    }

    get publicKey(): string | null {
        return this._publicKey;
    }

    get connecting(): boolean {
        return this._connecting;
    }

    get connected(): boolean {
        return this._publicKey !== null && this._publicKey !== undefined;
    }

    async connect(): Promise<string | undefined> {
        try {
            if (this.connected || this.connecting) return;

            this._connecting = true;

            const client = await CrossmintEmbed.init(this._config);

            const account = await client.login();

            if (account === null) {
                throw new Error("User rejected the request");
            }
            if (account === undefined) {
                throw new Error("User rejected the request or closed the window");
            }

            let publicKey: string;
            try {
                publicKey = ethers.utils.getAddress(account);
            } catch (error: any) {
                throw new Error(error?.message, error);
            }

            this._client = client;
            this._publicKey = publicKey;

            return this._publicKey;

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
        this._publicKey = null;

        // this.emit("disconnect");
    }

    async signMessage(message: string): Promise<string> {
        try {
            if (!this._client || !this.connected) throw new Error("Not connected");

            const signedMessage = await this._client.signMessage(new TextEncoder().encode(message));

            if (signedMessage === null) {
                throw new Error("User rejected the request");
            }
            if (signedMessage === undefined) {
                throw new Error("User rejected the request or closed the window");
            }

            return new TextDecoder().decode(signedMessage);
        } catch (error: any) {
            // this.emit("error", error);
            throw error;
        }
    }
}
