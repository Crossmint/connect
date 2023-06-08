import { BlockchainTypes } from ".";

export interface CrossmintEmbedParams {
    /**
     * API key
     * Get yours at {@link https://console.crossmint.com | Developer Dashboard}
     */
    apiKey: string;

    /**
     * Project ID
     * Get yours at {@link https://console.crossmint.com | Developer Dashboard}
     * If you don't have a Project ID, you can use one of the following options:
     * 'crossmint' - This will return data from the user's Crossmint account
     * '<project-id>' - This will return data from the user's Crossmint account under the project id
     */
    projectId?: string;

    chain: BlockchainTypes;

    environment?: CrossmintEnvironment;

    autoConnect?: boolean;
    maxTimeAutoConnectMs?: number;

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
    projectId?: string;

    chain: BlockchainTypes;

    environment: CrossmintEnvironment;

    autoConnect: boolean;
    maxTimeAutoConnectMs: number;

    appMetadata?: AppMetadata;
}

export enum CrossmintEnvironment {
    PROD = "https://www.crossmint.com",
    STAGING = "https://staging.crossmint.com",
    LOCAL = "http://localhost:3001",
}

export interface CrossmintStore {
    accounts: {
        [key in BlockchainTypes]: string | null;
    };
}
