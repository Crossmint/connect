import { useState } from "react";

import { BlockchainTypes, CrossmintEVMWalletAdapter, CrossmintEnvironment } from "@crossmint/connect";

function maticToWeiHex(matic: number): string {
    const wei = matic * Math.pow(10, 18);
    return `0x${wei.toString(16)}`;
}

export default function EVMConnectButton() {
    const [address, setAddress] = useState<string | undefined>(undefined);
    const [signedMessage, setSignedMessage] = useState<string | undefined>(undefined);
    const [txHash, setTxHash] = useState<string | undefined>(undefined);
    const [crossmintConnect, setCrossmintConnect] = useState<CrossmintEVMWalletAdapter | undefined>(undefined);

    async function handleClick() {
        // prompt user to trust your app
        const crossmintConnect = new CrossmintEVMWalletAdapter({
            chain: BlockchainTypes.POLYGON,
            environment: CrossmintEnvironment.LOCAL,
        });
        const _address = await crossmintConnect.connect();

        // store the result in react state
        setAddress(_address);
        setCrossmintConnect(crossmintConnect);
    }

    const signMessage = async () => {
        const message = "Hello, world!";
        if (!crossmintConnect) {
            throw new Error("not set");
        }
        // Sign the message
        const signature = await crossmintConnect.signMessage(message);
        setSignedMessage(signature);
    };

    const sendTransaction = async () => {
        const tx = {
            to: "0x3DdfBa136f0ca9E430ac444Aa426928E5088c03A",
            value: maticToWeiHex(0.01),
        };
        if (!crossmintConnect) {
            throw new Error("not set");
        }
        // Sign the message
        const txHash = await crossmintConnect.sendTransaction(tx);
        setTxHash(txHash);
    };

    const connected = address != null;

    // If connected, displays their address, else displays "Connect"
    return (
        <>
            <button onClick={handleClick} disabled={connected}>
                {connected ? `${address.slice(0, 6)}...` : "Connect"}
            </button>
            <div>
                <button onClick={signMessage}>Sign Message</button>
                {signedMessage && <div>{signedMessage}</div>}
            </div>
            <div>
                <button onClick={sendTransaction}>Send Transaction</button>
                {txHash && <div>{txHash}</div>}
            </div>
        </>
    );
}
