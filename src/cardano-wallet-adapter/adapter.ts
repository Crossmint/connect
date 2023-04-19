import { C, toHex } from "lucid-cardano";

import CrossmintEmbed from "../CrossmintEmbed";
import { CROSSMINT_LOGO_21x21, CrossmintWalletName } from "../consts/branding";
import { BlockchainTypes, CrossmintEmbedConfig, CrossmintEmbedParams, CrossmintEnvironment } from "../types";
import { buildConfig } from "../utils/config";
import { CardanoWalletApi } from "./types";

export default class CrossmintCardanoWalletAdapter {
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

            const account = await client.login();

            if (account === null) {
                throw new Error("User rejected the request");
            }
            if (account === undefined) {
                throw new Error("User rejected the request or closed the window");
            }

            let hexAddress: string;
            try {
                hexAddress = toHex(C.Address.from_bech32(account).to_bytes());
            } catch (error: any) {
                throw new Error(error?.message, error);
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
