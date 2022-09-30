import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { CrossmintEnvironment } from "../types";

export * from "./adapter";

export function networkToCrossmintEnvironment(network: WalletAdapterNetwork): CrossmintEnvironment {
    switch (network) {
        case WalletAdapterNetwork.Testnet:
            console.error("Crossmint does not support solana testnet. Falling back to staging.");
        case WalletAdapterNetwork.Devnet:
            return CrossmintEnvironment.STAGING;
        case WalletAdapterNetwork.Mainnet:
        default:
            return CrossmintEnvironment.PROD;
    }
}