import { BlockchainTypes } from ".";

export interface SiteMetadata {
    name: string;
    icon: string;
    url: string;
}

export enum CrossmintEmbedRequestType {
    REQUEST_ACCOUNTS = "crossmint_requestAccounts",
    SIGN_MESSAGE = "crossmint_signMessage",
    USER_REJECT = "crossmint_userReject",
}

export interface CrossmintEmbedBaseRequest<CrossmintEmbedBaseRequestDataType> {
    request: CrossmintEmbedRequestType;
    data?: CrossmintEmbedBaseRequestDataType;
}

export interface CrossmintEmbedBaseRequestData {
    libVersion: string;
    chain: BlockchainTypes;
    siteMetadata: SiteMetadata;
}

export interface CrossmintEmbedRequestAccountData extends CrossmintEmbedBaseRequestData {}

export interface CrossmintEmbedSignMessageData extends CrossmintEmbedBaseRequestData {
    message: Uint8Array;
}

// !!! Add other req data types here. If adding a new req data type also add in CrossmintEmbed.postMessage() !!!
export type CrossmintEmbedBaseRequestDataType = CrossmintEmbedRequestAccountData | CrossmintEmbedSignMessageData;
