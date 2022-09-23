export default class WindowAdapter {
    controlledWindow?: Window;

    open: boolean;

    onClose?: Function;

    constructor(onClose?: Function) {
        this.open = false;
        this.onClose = onClose;
    }

    init({
        parentWindow,
        url,
        width = 375,
        height = 650,
        target = "popupWindow",
    }: {
        parentWindow: Window;
        url: string;
        width?: number;
        height?: number;
        target?: string;
    }) {
        const _window = parentWindow.open(url, target, this.createPopupString(width, height));

        if (!_window) {
            throw new Error(`Failed to open popup. This may be caused by the browsers' popup blocker`);
        }

        this.controlledWindow = _window ?? undefined;
        this.open = true;

        this.registerListeners();
        return this.controlledWindow;
    }

    close() {
        this.controlledWindow?.close();
    }

    private registerListeners() {
        const timer = setInterval(() => {
            if (this.controlledWindow?.closed) {
                clearInterval(timer);

                this.controlledWindow = undefined;
                this.open = false;

                if (this.onClose) {
                    this.onClose();
                }
            }
        }, 50);
    }

    private createPopupString(width: number, height: number) {
        const top = window.outerHeight / 2 + window.screenY - height / 2;
        const left = window.outerWidth / 2 + window.screenX - width / 2;

        // In newer versions of chrome (>99) you need to add the `popup=true` for the new window to actually open in a popup
        const chromeVersion = this.getChromeVersion();
        const chromeVersionGreaterThan99 = chromeVersion && chromeVersion > 99;
        const popupStringBase = chromeVersionGreaterThan99 ? "popup=true," : "";

        return `${popupStringBase}height=${height},width=${width},left=${left},top=${top},resizable=yes,scrollbars=yes,toolbar=yes,menubar=true,location=no,directories=no,status=yes`;
    }

    private getChromeVersion() {
        const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
        return raw ? parseInt(raw[2]) : null;
    }
}
