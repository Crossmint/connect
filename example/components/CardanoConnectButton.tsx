import { useState } from "react";

import { CrossmintCardanoWalletAdapter } from "@crossmint/connect";

export default function CardanoConnectButton() {
    const [hexAddress, setAddress] = useState<string | undefined>(undefined);

    // Initialize the Crossmint connect.
    const crossmintConnect = new CrossmintCardanoWalletAdapter({});

    async function connectToCrossmint() {
        // Ask the user to sign in and give access to their address
        const walletApi = await crossmintConnect.enable();

        if (await crossmintConnect.isEnabled()) {
            const [hexAddress] = await walletApi.getUsedAddresses();
            setAddress(hexAddress);

            const networkId = await walletApi.getNetworkId();
        }

        return walletApi;
    }

    return (
        <button onClick={connectToCrossmint} className="px-6 py-2 font-semibold text-black bg-white rounded-md">
            {hexAddress ? hexAddress.slice(0, 6) + "..." : "Connect"}
        </button>
    );
}
