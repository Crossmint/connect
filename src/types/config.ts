import { BlockchainTypes } from ".";

export interface CrossmintEmbedParams {
    /**
     * API key
     * Get yours at {@link https://console.crossmint.io | Developer Dashboard}
     */
    apiKey: string;

    chain: BlockchainTypes;

    environment?: CrossmintEnvironment;

    /**
     * Dapp Metadata
     * If metadata is not provided, it will be extracted from your application automatically
     */
    appMetadata?: AppMetadata;
}

export interface AppMetadata {
    name?: string;
    icon?: string;
}

export interface CrossmintEmbedConfig {
    libVersion: string;

    apiKey: string;

    chain: BlockchainTypes;

    environment: CrossmintEnvironment;

    appMetadata?: AppMetadata;
}

export enum CrossmintEnvironment {
    PROD = "https://www.crossmint.io",
    LOCAL = "http://localhost:3001",
}

export interface CrossmintStore {
    accounts: {
        [key in BlockchainTypes]: string | null;
    };
}
