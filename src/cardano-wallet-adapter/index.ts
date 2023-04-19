import { CrossmintEnvironment } from "../types";
import { CardanoNetwork } from "./types";

export * from "./adapter";
export * from "./types";

export function cardanoNetworkToCrossmintEnvironment(network: CardanoNetwork): CrossmintEnvironment {
    switch (network) {
        case CardanoNetwork.PREVIEW:
            console.error("Crossmint does not support cardano preview testnet. Falling back to staging.");
        case CardanoNetwork.PREPROD:
            return CrossmintEnvironment.STAGING;
        case CardanoNetwork.MAINNET:
        default:
            return CrossmintEnvironment.PROD;
    }
}
