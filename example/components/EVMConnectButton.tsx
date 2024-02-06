import { useState } from "react";

import { BlockchainTypes, CrossmintEVMWalletAdapter, CrossmintEnvironment } from "@crossmint/connect";

export default function EVMConnectButton() {
    const [address, setAddress] = useState<string | undefined>(undefined);
    const [signedMessage, setSignedMessage] = useState<string | undefined>(undefined);
    const [crossmintConnect, setCrossmintConnect] = useState<CrossmintEVMWalletAdapter | undefined>(undefined)

    async function handleClick() {
        // prompt user to trust your app
        const crossmintConnect = new CrossmintEVMWalletAdapter({
            chain: BlockchainTypes.POLYGON,
            environment: CrossmintEnvironment.LOCAL,
            maxTimeAutoConnectMs: 100000
        });
        const _address = await crossmintConnect.connect();


        // store the result in react state
        setAddress(_address);
        setCrossmintConnect(crossmintConnect)
    }

    const signMessage = async () => {
        const message = "Hello, world!";
        if (!crossmintConnect) {
            throw new Error('not set')
        }
        // Sign the message
        const signature = await crossmintConnect.signMessage(message);
        setSignedMessage(signature);
    }

    const connected = address != null;

    // If connected, displays their address, else displays "Connect"
    return (
        <>
            <button onClick={handleClick} disabled={connected}>
                {connected ? `${address.slice(0, 6)}...` : "Connect"}
            </button>
            <div>
                <button onClick={signMessage}>SignMessage</button>
                {signedMessage && <div>{signedMessage}</div>}
            </div>
        </>
    );

}
