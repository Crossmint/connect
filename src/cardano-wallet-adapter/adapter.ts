import CrossmintEmbed from "../CrossmintEmbed";
import { CROSSMINT_LOGO_21x21, CrossmintWalletName } from "../consts/branding";
import { BlockchainTypes, CrossmintEmbedConfig, CrossmintEmbedParams, CrossmintEnvironment } from "../types";
import { buildConfig } from "../utils/config";
import { sleep } from "../utils/sleep";
import { CardanoWalletApi } from "./types";

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

            const account = await client.login();

            if (account === null) {
                throw new Error("User rejected the request");
            }
            if (account === undefined) {
                throw new Error("User rejected the request or closed the window");
            }

            let address: string;
            try {
                address = account;
            } catch (error: any) {
                throw new Error(error?.message, error);
            }

            this._client = client;

            const getUsedAddresses = async () => [address];
            const getNetworkId = async () => {
                if (this._config.environment === CrossmintEnvironment.PROD) {
                    return 1;
                } else {
                    return 0;
                }
            };

            return { getUsedAddresses, getNetworkId };
        } catch (error: any) {
            throw error;
        }
    }
}
