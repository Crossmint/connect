export enum CardanoNetwork {
    PREVIEW = "preview",
    PREPROD = "preprod",
    MAINNET = "mainnet",
}

// CIP-0030
export type CardanoWalletApi = {
    getNetworkId(): Promise<number>;
    getUsedAddresses(): Promise<string[]>;
};
