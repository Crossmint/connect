# @crossmint/connect

Embed the Crossmint wallet directly in your app

## Build from Source

1. Clone the project:

```shell

git clone https://github.com/Crossmint/connect.git

```

2. Install dependencies:

```shell

cd connect

yarn install

```

3. Build all packages:

```shell

yarn build

```

## Run the example locally

1. Link `@crossmint/connect` from the root `/connect`:

```shell

yarn link

```

2. Link from inside the example folder:

```shell

cd example

yarn link "@crossmint/connect"

```

3. Install deps:

```shell

yarn install

```

4. Run the nextjs app:

```shell

yarn dev

```

## Solana Wallet Adapter Example

The `CrossmintSolanaWalletAdapter` is fully compatible with [@solana/wallet-adapter](https://github.com/solana-labs/wallet-adapter) and can be dropped into place like so:

    import React, { FC, useMemo } from 'react';
    import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
    import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
    import { FakeWalletAdapter } from '@solana/wallet-adapter-wallets';
    import {
        WalletModalProvider,
        WalletDisconnectButton,
        WalletMultiButton
    } from '@solana/wallet-adapter-react-ui';
    import { clusterApiUrl } from '@solana/web3.js';

    import {CrossmintSolanaWalletAdapter} from "@crossmint/connect"

    // Default styles that can be overridden by your app
    require('@solana/wallet-adapter-react-ui/styles.css');

    export const Wallet: FC = () => {
        // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
        const network = WalletAdapterNetwork.Devnet;

        // You can also provide a custom RPC endpoint.
        const endpoint = useMemo(() => clusterApiUrl(network), [network]);

        const wallets = useMemo(
            () => [
                new CrossmintSolanaWalletAdapter({})
            ],
            []
        );

        return (
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <WalletMultiButton />
                        <WalletDisconnectButton />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        );
    };

## EVM Wallet Connect Example

The following is an example of connecting to a user's Crossmint Ethereum account using the CrossmintEVMWalletAdapter

    import {
      BlockchainTypes,
      CrossmintEnvironment,
      CrossmintEVMWalletAdapter,
    } from "@crossmint/connect";

    import { useState } from "react";

    export default function YourCustomConnectButton() {
      const [address, setAddress] = useState<string | undefined>(undefined);

      async function connectToCrossmint() {
        // Initialize the Crossmint connect.
        const _crossmintConnect = new CrossmintEVMWalletAdapter({
          chain: BlockchainTypes.ETHEREUM, // BlockchainTypes.ETHEREUM || BlockchainTypes.POLYGON. For solana use BlockchainTypes.SOLANA
        });

        // Ask the user to sign in and give access to their publicKey
        const address = await _crossmintConnect.connect();

        // If the user successfully connects to Crossmint, the address will be returned.
        if (address) {
          setAddress(address);
        }
      }

      return (
        <button
          onClick={connectToCrossmint}
          className="px-6 py-2 font-semibold text-black bg-white rounded-md"
        >
          {address ? address.slice(0, 6) + "..." : "Connect"}
        </button>
      );
    }
