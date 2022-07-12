import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, TransactionInstruction, TransactionSignature } from "@solana/web3.js";
import { FC, useCallback } from "react";
import toast from "react-hot-toast";

export const SendTransaction: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const onClick = useCallback(async () => {
        if (!publicKey) {
            toast.error("Wallet not connected!");
            return;
        }

        let signature: TransactionSignature = "";
        try {
            const transaction = new Transaction().add(
                new TransactionInstruction({
                    data: Buffer.from("Hello, from the Solana Wallet Adapter example app!"),
                    keys: [],
                    programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
                })
            );

            signature = await sendTransaction(transaction, connection);
            toast.loading("Transaction sent:" + signature);

            await connection.confirmTransaction(signature, "processed");
            toast.success("Transaction successful!" + signature);
        } catch (error: any) {
            toast.error(`Transaction failed! ${error?.message}` + signature);
            return;
        }
    }, [publicKey, connection, sendTransaction]);

    return (
        <button
            style={{
                padding: "8px 14px",
                margin: "12px",
            }}
            onClick={onClick}
            disabled={!publicKey}
        >
            Send Transaction (devnet)
        </button>
    );
};
