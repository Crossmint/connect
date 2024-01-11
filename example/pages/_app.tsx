import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter, TorusWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { AppProps } from "next/app";
import { FC, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";

import { BlockchainTypes, CrossmintEVMWalletAdapter, CrossmintEmbedParams, CrossmintEnvironment, CrossmintSolanaWalletAdapter } from "@crossmint/connect";

// Use require instead of import since order matters
require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");

const App: FC<AppProps> = ({ Component, pageProps }) => {
    // // Can be set to 'devnet', 'testnet', or 'mainnet-beta'
    // const network = WalletAdapterNetwork.Devnet;


    // // You can also provide a custom RPC endpoint
    // const endpoint = useMemo(() => clusterApiUrl(), [network]);

    // // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // // of wallets that your users connect to will be loaded
    // const wallets = useMemo(
    //     () => [
    //         new PhantomWalletAdapter(),
    //         new CrossmintEVMWalletAdapter({
    //             environment: CrossmintEnvironment.LOCAL,
    //             maxTimeAutoConnectMs: 500,
    //             chain: BlockchainTypes.POLYGON
    //         }),
    //         new TorusWalletAdapter({
    //             params: {},
    //         }),
    //     ],
    //     [network]
    // );

    // return (
    //     <ConnectionProvider endpoint={endpoint}>
    //         <WalletProvider wallets={wallets} autoConnect>
    //             <WalletModalProvider>
    //                 <Toaster />
    //                 <Component {...pageProps} />
    //             </WalletModalProvider>
    //         </WalletProvider>
    //     </ConnectionProvider>
    // );
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

};

export default App;
