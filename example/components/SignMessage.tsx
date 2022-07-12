import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { FC, useCallback } from "react";
import toast from "react-hot-toast";
import { sign } from "tweetnacl";

export const SignMessage: FC = () => {
    const { publicKey, signMessage } = useWallet();

    const onClick = useCallback(async () => {
        try {
            // `publicKey` will be null if the wallet isn't connected
            if (!publicKey) throw new Error("Wallet not connected!");
            // `signMessage` will be undefined if the wallet doesn't support it
            if (!signMessage) throw new Error("Wallet does not support message signing!");

            // Encode anything as bytes
            const message = new TextEncoder().encode("Crossmint test sign message\n\n" + "Nonce: " + Math.random());
            // Sign the bytes using the wallet
            const signature = await signMessage(message);
            // Verify that the bytes were signed using the private key that matches the known public key
            if (!sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error("Invalid signature!");

            toast.success(`Message signature: ${bs58.encode(signature)}`);
        } catch (error: any) {
            toast.error(`Signing failed: ${error?.message}`);
        }
    }, [publicKey, signMessage]);

    return (
        <button
            style={{
                padding: "8px 14px",
                margin: "12px",
            }}
            onClick={onClick}
            disabled={!publicKey}
        >
            Sign Message
        </button>
    );
};
