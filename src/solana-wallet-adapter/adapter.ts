import {
    BaseMessageSignerWalletAdapter,
    WalletNotConnectedError,
    WalletNotReadyError,
    WalletPublicKeyError,
    WalletReadyState,
    WalletSignTransactionError,
    WalletWindowClosedError,
} from "@solana/wallet-adapter-base";
import { PublicKey, Transaction } from "@solana/web3.js";

import CrossmintEmbed from "../CrossmintEmbed";
import { CROSSMINT_LOGO_21x21, CrossmintWalletName } from "../consts/branding";
import { BlockchainTypes, CrossmintEmbedConfig, CrossmintEmbedParams } from "../types";
import { buildConfig } from "../utils/config";

export class CrossmintWalletAdapter extends BaseMessageSignerWalletAdapter {
    name = CrossmintWalletName;
    url = "https://www.crossmint.io";
    icon = CROSSMINT_LOGO_21x21;

    private _connecting: boolean;
    private _publicKey: PublicKey | null;
    private _readyState: WalletReadyState =
        typeof window === "undefined" ? WalletReadyState.Unsupported : WalletReadyState.Loadable;

    private _config: CrossmintEmbedConfig;
    private _client?: CrossmintEmbed;

    constructor(params: Omit<CrossmintEmbedParams, "chain">) {
        super();

        this._connecting = false;
        this._publicKey = null;

        this._config = buildConfig({ ...params, chain: BlockchainTypes.SOLANA });
    }

    get publicKey(): PublicKey | null {
        return this._publicKey;
    }

    get connecting(): boolean {
        return this._connecting;
    }

    get connected(): boolean {
        return this._publicKey !== null && this._publicKey !== undefined;
    }

    get readyState(): WalletReadyState {
        return this._readyState;
    }

    async connect(): Promise<void> {
        try {
            if (this.connected || this.connecting) return;
            if (this._readyState !== WalletReadyState.Loadable) throw new WalletNotReadyError();

            this._connecting = true;

            const client = await CrossmintEmbed.init(this._config);

            const account = await client.login();

            if (account === null) {
                throw new WalletWindowClosedError("User rejected the request");
            }
            if (account === undefined) {
                throw new WalletNotConnectedError("User rejected the request or closed the window");
            }

            let publicKey: PublicKey;
            try {
                publicKey = new PublicKey(account);
            } catch (error: any) {
                throw new WalletPublicKeyError(error?.message, error);
            }

            this._client = client;
            this._publicKey = publicKey;

            this.emit("connect", publicKey);
        } catch (error: any) {
            this.emit("error", error);
            throw error;
        } finally {
            this._connecting = false;
        }
    }

    async disconnect(): Promise<void> {
        this._client?.cleanUp();

        this._client = undefined;
        this._publicKey = null;

        this.emit("disconnect");
    }

    async signTransaction(transaction: Transaction): Promise<Transaction> {
        throw new WalletSignTransactionError("Not implemented");
    }

    async signAllTransactions(transactions: Transaction[]): Promise<Transaction[]> {
        throw new WalletSignTransactionError("Not implemented");
    }

    async signMessage(message: Uint8Array): Promise<Uint8Array> {
        try {
            if (!this._client || !this.connected) throw new WalletNotConnectedError();

            const signedMessage = await this._client.signMessage(message);

            if (signedMessage === null) {
                throw new WalletWindowClosedError("User rejected the request");
            }
            if (signedMessage === undefined) {
                throw new WalletSignTransactionError("User rejected the request or closed the window");
            }

            return signedMessage;
        } catch (error: any) {
            this.emit("error", error);
            throw error;
        }
    }
}
