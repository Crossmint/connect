import { BigNumberish, BytesLike } from "ethers";
import { AccessListish } from "ethers/lib/utils";

export * from "./requests";
export * from "./config";

export enum BlockchainTypes {
    SOLANA = "solana",
    ETHEREUM = "ethereum",
    POLYGON = "polygon",
    CARDANO = "cardano",
}

export type TransactionRequest = {
    to?: string,
    from?: string,
    nonce?: BigNumberish,

    gasLimit?: BigNumberish,
    gasPrice?: BigNumberish,

    data?: BytesLike,
    value?: BigNumberish,
    chainId?: number

    type?: number;
    accessList?: AccessListish;

    maxPriorityFeePerGas?: BigNumberish;
    maxFeePerGas?: BigNumberish;

    customData?: Record<string, any>;
    ccipReadEnabled?: boolean;
}