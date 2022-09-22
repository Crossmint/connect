import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import type { NextPage } from "next";
import Head from "next/head";

import { SendTransaction } from "../components/SendTransaction";
import { SignMessage } from "../components/SignMessage";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <WalletMultiButton />
            <SignMessage />
            <SendTransaction />
        </div>
    );
};

export default Home;
