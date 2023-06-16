import { C, toHex } from "lucid-cardano";

import CrossmintEmbed from "../CrossmintEmbed";
import { CROSSMINT_LOGO_21x21, CrossmintWalletName } from "../consts/branding";
import { BlockchainTypes, CrossmintEmbedConfig, CrossmintEmbedParams, CrossmintEnvironment } from "../types";
import { buildConfig } from "../utils/config";
import { CardanoWalletApi } from "./types";
import { WalletPublicKeyError, WalletWindowClosedError } from "@solana/wallet-adapter-base";

export class CrossmintCardanoWalletAdapter {
    name = CrossmintWalletName;
    url = "https://www.crossmint.com";
    icon = CROSSMINT_LOGO_21x21;
    apiVersion = 1;

    private _config: CrossmintEmbedConfig;
    private _client?: CrossmintEmbed;

    private _api?: CardanoWalletApi;

    constructor(params: Omit<CrossmintEmbedParams, "chain">) {
        this._config = buildConfig({ ...params, chain: BlockchainTypes.CARDANO });
    }

    async isEnabled(): Promise<boolean> {
        return this._api != null;
    }

    async enable(): Promise<CardanoWalletApi> {
        try {
            if (this._api != null) {
                return this._api;
            }

            const client = CrossmintEmbed.init(this._config);

            const accounts = await client.login();

            if (accounts === null) {
                throw new WalletWindowClosedError("User rejected the request");
            }
            if (accounts === undefined || accounts.length === 0) {
                throw new WalletWindowClosedError("User rejected the request or closed the window");
            }

            const account = accounts[0];

            let hexAddress: string;
            try {
                hexAddress = toHex(C.Address.from_bech32(account).to_bytes());
            } catch (error: any) {
                throw new WalletPublicKeyError(error?.message, error);
            }

            this._client = client;

            const getUsedAddresses = async () => [hexAddress];
            const getNetworkId = async () => (this._config.environment === CrossmintEnvironment.PROD ? 1 : 0);

            const walletApi = { getUsedAddresses, getNetworkId };
            this._api = walletApi;

            return walletApi;
        } catch (error: any) {
            throw error;
        }
    }
}
