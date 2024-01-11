import WindowAdapter from "./adapters/WindowAdapter";
import { ALLOWED_ORIGINS } from "./consts/origins";
import { CrossmintEmbedConfig } from "./types";
import {
    CrossmintEmbedRequestAccountData,
    CrossmintEmbedRequestType,
    CrossmintEmbedSignMessageData,
} from "./types/requests";
import { htmlToElement } from "./utils/iframe";
import buildSiteMetadata from "./utils/siteMetadata";
import { sleep } from "./utils/sleep";

export const EVM_CHAINS = [
    "ethereum",
    "ethereum-sepolia",
    "polygon",
    "bsc",
    "optimism",
    "arbitrum",
    "base",
    "zora",
    "arbitrumnova",
    "zkatana",
] as const;
export type EVMChain = (typeof EVM_CHAINS)[number];

export interface WalletProjection {
    chain: EVMChain;
    address: string;
    locator: string;
    label?: string;
}

export interface EVMAAWalletProjection extends WalletProjection {
    isAA: true;
    walletId: string;
    deviceId: string;
}

type LoginData = {
    accounts?: (WalletProjection | EVMAAWalletProjection)[];
}

export default class CrossmintEmbed {
    private _config: CrossmintEmbedConfig;

    private get _frameUrl() {
        const { environment, chain, projectId, forceWalletSelection } = this._config;
        const projectIdQueryParam = projectId != null ? `&projectId=${projectId}` : "";
        const forceWalletSelectionQueryParam = forceWalletSelection != null ? `&forceWalletSelection=${forceWalletSelection}` : "";

        return `${environment}/2023-06-09/frame?chain=${chain}${projectIdQueryParam}${forceWalletSelectionQueryParam}`;
    }

    private constructor(config: CrossmintEmbedConfig) {
        console.log("[crossmint-connect] Initialized with version:", config.libVersion);

        this._config = config;
    }

    static init(config: CrossmintEmbedConfig) {
        const client = new CrossmintEmbed(config);

        return client;
    }

    async login() {
        const crossmintWindow = new WindowAdapter();
        crossmintWindow.init({ parentWindow: window, url: this._frameUrl });

        if (this._config.autoConnect) {
            const loginData = await this.getLoginFromIFrame();

            if (loginData?.accounts?.[0] != null) {
                console.log("[crossmint-connect] Received account from auto connect");
                crossmintWindow.close();
                return loginData;
            }
        }

        return await new Promise<LoginData | null>(async (resolve, reject) => {
            console.log("[crossmint-connect] Waiting login");
            let loginData: LoginData | null = null


            const handleMessage = async (e: MessageEvent<any>) => {
                if (!ALLOWED_ORIGINS.includes(e.origin)) return;

                const { request, data } = e.data;

                switch (request) {
                    case CrossmintEmbedRequestType.REQUEST_ACCOUNTS:
                        loginData = data as LoginData
                        // await StorageAdapter.storeAccountForChain(_account, this._config.chain);
                        crossmintWindow.controlledWindow?.close();
                        break;
                    case CrossmintEmbedRequestType.USER_REJECT:
                        console.log("[crossmint-connect] User rejected login");
                        loginData = null
                        break;
                    default:
                        break;
                }
            };

            window.addEventListener("message", handleMessage);

            while (crossmintWindow.open && crossmintWindow.controlledWindow) {
                this.postMessage(
                    crossmintWindow.controlledWindow,
                    CrossmintEmbedRequestType.REQUEST_ACCOUNTS,
                    undefined,
                    this._frameUrl
                );

                await sleep(100);
            }

            window.removeEventListener("message", handleMessage);
            resolve(loginData);
        });
    }

    signMessage<T>(message: Uint8Array, walletId?: string, deviceId?: string): Promise<T>
    async signMessage(message: Uint8Array, walletId?: string, deviceId?: string) {
        const crossmintWindow = new WindowAdapter();
        crossmintWindow.init({ parentWindow: window, url: this._frameUrl });

        return await new Promise<Uint8Array | string | undefined | null>(async (resolve, reject) => {
            console.log("[crossmint-connect] Waiting sign message");

            let _signedMessage: Uint8Array | undefined | null = undefined;

            const handleMessage = async (e: MessageEvent<any>) => {
                if (!ALLOWED_ORIGINS.includes(e.origin)) return;

                const { request, data } = e.data;

                switch (request) {
                    case CrossmintEmbedRequestType.SIGN_MESSAGE:
                        const { signedMessage } = data;
                        if (walletId && deviceId) {
                            _signedMessage = signedMessage
                        } else {
                            _signedMessage = new Uint8Array(signedMessage.split(",").map(Number));
                        }
                        crossmintWindow.controlledWindow?.close();
                        break;
                    case CrossmintEmbedRequestType.USER_REJECT:
                        console.log("[crossmint-connect] User rejected signMessage");
                        _signedMessage = null;
                        break;
                    default:
                        break;
                }
            };

            window.addEventListener("message", handleMessage);

            while (crossmintWindow.open && crossmintWindow.controlledWindow) {
                await this.postMessage(
                    crossmintWindow.controlledWindow,
                    CrossmintEmbedRequestType.SIGN_MESSAGE,
                    { message, walletId, deviceId },
                    this._frameUrl
                );

                await sleep(100);
            }

            window.removeEventListener("message", handleMessage);
            resolve(_signedMessage);
        });
    }

    // When an AA is selected, just that wallet can be connected.
    // So, we don't need to adapt signMessages to support AA wallets
    async signMessages(
        message: Uint8Array,
        publicKeys: string[]
    ): Promise<{ [publicKey: string]: Uint8Array } | undefined | null> {
        const crossmintWindow = new WindowAdapter();
        crossmintWindow.init({ parentWindow: window, url: this._frameUrl });

        return await new Promise<{ [publicKey: string]: Uint8Array } | undefined | null>(async (resolve, reject) => {
            console.log("[crossmint-connect] Waiting sign messages");

            let _signedMessages: { [publicKey: string]: Uint8Array } | undefined | null = undefined;

            const handleMessage = async (e: MessageEvent<any>) => {
                if (!ALLOWED_ORIGINS.includes(e.origin)) return;

                const { request, data } = e.data;

                switch (request) {
                    case CrossmintEmbedRequestType.SIGN_MESSAGE:
                        const { signedMessages } = data;

                        _signedMessages = Object.keys(signedMessages).reduce(
                            (acc, key) => ({
                                ...acc,
                                [key]: new Uint8Array(signedMessages[key].split(",").map(Number)),
                            }),
                            {}
                        );
                        crossmintWindow.controlledWindow?.close();
                        break;
                    case CrossmintEmbedRequestType.USER_REJECT:
                        console.log("[crossmint-connect] User rejected signMessages");
                        _signedMessages = null;
                        break;
                    default:
                        break;
                }
            };

            window.addEventListener("message", handleMessage);

            while (crossmintWindow.open && crossmintWindow.controlledWindow) {
                await this.postMessage(
                    crossmintWindow.controlledWindow,
                    CrossmintEmbedRequestType.SIGN_MESSAGE,
                    { message, publicKeys },
                    this._frameUrl
                );

                await sleep(100);
            }

            window.removeEventListener("message", handleMessage);
            resolve(_signedMessages);
        });
    }

    async cleanUp() {
        // await StorageAdapter.clear();
    }

    async postMessage(
        postWindow: Window,
        request: CrossmintEmbedRequestType,
        data?: Omit<
            CrossmintEmbedSignMessageData | CrossmintEmbedRequestAccountData,
            "libVersion" | "chain" | "siteMetadata"
        >,
        targetOrigin: string = "*"
    ) {
        return postWindow.postMessage(
            {
                request,
                data: {
                    libVersion: this._config.libVersion,
                    chain: this._config.chain,
                    projectId: this._config.projectId,
                    siteMetadata: await buildSiteMetadata(this._config.appMetadata),
                    ...data,
                },
            },
            targetOrigin
        );
    }

    private async getLoginFromIFrame() {
        console.log("[crossmint] Attempting auto connect");

        const loginIframe = htmlToElement<HTMLIFrameElement>(
            `<iframe
              id="crossmintIframe"
              class="crossmintIframe"
              src="${this._frameUrl}"
              style="display: none; position: fixed; top: 0; right: 0; width: 100%;
              height: 100%; border: none; border-radius: 0; z-index: 999"
            ></iframe>`
        );

        return await new Promise<LoginData | null>((resolve, reject) => {
            try {
                window.document.body.appendChild(loginIframe);

                loginIframe.addEventListener("load", async () => {
                    const timeout = setTimeout(() => {
                        console.log(
                            "[crossmint] Failed to auto connect within",
                            this._config.maxTimeAutoConnectMs,
                            "ms"
                        );
                        window.removeEventListener("message", handleMessage);
                        window.document.body.removeChild(loginIframe);

                        resolve(null);
                    }, this._config.maxTimeAutoConnectMs);

                    const handleMessage = async (e: MessageEvent<any>) => {
                        if (!ALLOWED_ORIGINS.includes(e.origin)) return;

                        const { request, data } = e.data;

                        switch (request) {
                            case CrossmintEmbedRequestType.REQUEST_ACCOUNTS:
                                const loginData = data as LoginData;

                                clearTimeout(timeout);
                                resolve(loginData);
                                break;
                            default:
                                break;
                        }
                    };

                    window.addEventListener("message", handleMessage);

                    this.postMessage(
                        loginIframe.contentWindow!,
                        CrossmintEmbedRequestType.REQUEST_ACCOUNTS,
                        undefined,
                        this._frameUrl
                    );
                });
            } catch (e) {
                console.log(e);
                resolve(null);
            }
        });
    }
}
