import { BlockchainTypes } from ".";

export interface CrossmintEmbedParams {
    /**
     * API key
     * Get yours at {@link https://www.crossmint.com/console/projects/apiKeys | Developer Dashboard}
     */
    apiKey: string;

    /**
     * Project ID
     * This will return data from the user's Crossmint account under the Project ID.
     * Get yours at {@link https://www.crossmint.com/console/projects/apiKeys | Developer Dashboard}
     * If you don't have a Project ID, you can exclude this parameter or set it to undefined.
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
