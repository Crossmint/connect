import { WalletSignTransactionError, WalletWindowClosedError } from "@solana/wallet-adapter-base";

import CrossmintEmbed, { EVMAAWalletProjection, WalletProjection } from "../CrossmintEmbed";
import { CROSSMINT_LOGO_21x21, CrossmintWalletName } from "../consts/branding";
import { BlockchainTypes, CrossmintEmbedConfig, CrossmintEmbedParams } from "../types";
import { buildConfig } from "../utils/config";

export class CrossmintEVMWalletAdapter {
    name = CrossmintWalletName;
    url = "https://www.crossmint.com";
    icon = CROSSMINT_LOGO_21x21;

    private _connecting: boolean;

    private _config: CrossmintEmbedConfig;
    private _client?: CrossmintEmbed;

    private _accounts?: (WalletProjection | EVMAAWalletProjection)[];

    constructor(
        params: Omit<CrossmintEmbedParams, "chain"> & { chain: BlockchainTypes.ETHEREUM | BlockchainTypes.POLYGON }
    ) {
        this._connecting = false;

        this._config = buildConfig({ ...params });
    }

    get publicKey() {
        return this._accounts?.[0].address;
    }

    get publicKeys() {
        return this._accounts?.map(({ address }) => address);
    }

    get connecting() {
        return this._connecting;
    }

    get connected() {
        return this._accounts?.[0] != null;
    }

    async connect(): Promise<string | undefined> {
        try {
            if (this.connected || this.connecting) return;

            this._connecting = true;

            const client = CrossmintEmbed.init(this._config);

            const loginData = await client.login();
            console.log(loginData);
            if (loginData?.accounts?.[0] == null) {
                throw new WalletWindowClosedError("User rejected the request or closed the window");
            }

            const { accounts } = loginData;

            this._client = client;

            this._accounts = accounts;

            //In Crossbit we sort it by recommended
            return this._accounts[0].address;

            // this.emit("connect", publicKey);
        } catch (error: any) {
            throw error;
        } finally {
            this._connecting = false;
        }
    }

    async disconnect(): Promise<void> {
        this._client?.cleanUp();

        delete this._client;
        delete this._accounts;
        // this.emit("disconnect");
    }

    async signMessage(message: string): Promise<string> {
        try {
            if (!this._client || !this.connected || this._accounts == null) throw new Error("Not connected");

            let signedMessage;
            const account = this._accounts[0];
            if (isAAWallet(account)) {
                signedMessage = await this._client.signMessage<string>(
                    new TextEncoder().encode(message),
                    account.address,
                    account.walletId,
                    account.deviceId
                );
            } else {
                signedMessage = await this._client.signMessage<Uint8Array>(new TextEncoder().encode(message));
            }

            if (signedMessage === null) {
                throw new WalletWindowClosedError("User rejected the request");
            }
            if (signedMessage === undefined) {
                throw new WalletSignTransactionError("User rejected the request or closed the window");
            }

            return isAAWallet(account)
                ? (signedMessage as string)
                : new TextDecoder().decode(signedMessage as Uint8Array);
        } catch (error: any) {
            // this.emit("error", error);
            throw error;
        }
    }

    // Q from Matias: Does this work?
    async signMessageWithAllAddresses(message: string): Promise<{ [publicKey: string]: string }> {
        try {
            if (!this._client || !this.connected) throw new Error("Not connected");

            if (this.publicKeys == null) {
                throw new Error("Please, connect the wallet first");
            }

            const signedMessages = await this._client.signMessages(new TextEncoder().encode(message), this.publicKeys);
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

function isAAWallet(wallet: WalletProjection | EVMAAWalletProjection): wallet is EVMAAWalletProjection {
    return wallet != null && "isAA" in wallet && wallet.isAA;
}
