import { LIB_VERSION } from "../consts/version";
import { CrossmintEmbedConfig, CrossmintEmbedParams, CrossmintEnvironment } from "../types/index";

export function buildConfig(params: CrossmintEmbedParams): CrossmintEmbedConfig {
    const ret: CrossmintEmbedConfig = {
        libVersion: LIB_VERSION,
        apiKey: params.apiKey,
        environment: params.environment || CrossmintEnvironment.PROD,
        maxTimeAutoConnectMs: params.maxTimeAutoConnectMs || 300,
        appMetadata: params.appMetadata,
        chain: params.chain,
    };

    return ret;
}
