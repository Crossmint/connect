import { LIB_VERSION } from "../consts/version";
import { CrossmintEmbedConfig, CrossmintEmbedParams, CrossmintEnvironment } from "../types/index";

export function buildConfig(params: CrossmintEmbedParams): CrossmintEmbedConfig {
    const ret: CrossmintEmbedConfig = {
        libVersion: LIB_VERSION,
        apiKey: params.apiKey,
        projectId: params.projectId ?? "crossmint",
        environment: params.environment || CrossmintEnvironment.PROD,
        autoConnect: params.autoConnect ?? true,
        maxTimeAutoConnectMs: params.maxTimeAutoConnectMs || 300,
        appMetadata: params.appMetadata,
        chain: params.chain,
    };

    return ret;
}
