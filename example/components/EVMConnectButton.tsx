import { useState } from "react";

import { BlockchainTypes, CrossmintEVMWalletAdapter } from "@crossmint/connect";

export default function EVMConnectButton() {
    const [address, setAddress] = useState<string | undefined>(undefined);

    async function connectToCrossmint() {
        // Initialize the Crossmint embed.
        const _crossmintEmbed = new CrossmintEVMWalletAdapter({
            chain: BlockchainTypes.ETHEREUM, // BlockchainTypes.ETHEREUM || BlockchainTypes.POLYGON. For solana use BlockchainTypes.SOLANA
        });

        // Ask the user to sign in and give access to their publicKey
        const address = await _crossmintEmbed.connect();

        // If the user successfully connects to Crossmint, the address will be returned.
        if (address) {
            setAddress(address);
        }
    }

    return (
        <button onClick={connectToCrossmint} className="px-6 py-2 font-semibold text-black bg-white rounded-md">
            {address ? address.slice(0, 6) + "..." : "Connect"}
        </button>
    );
}
