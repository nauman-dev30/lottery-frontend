"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

export default function AuthConnectButton({ isPage = false }) {
    const { address, isConnected } = useAccount();
    const { open } = useAppKit();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    const handleConnect = async () => {
        try {
            await open();
        } catch (e) {
            console.error("Wallet connection failed:", e);
            toast.error("Wallet connection cancelled or failed");
        }
    };

    return (
        <>
            {!isConnected ? (
                <a
                    className="tf-btn"
                    onClick={handleConnect}
                    href="#"
                >
                    <i className="icon-wallets" />
                    Connect Wallet
                </a>
            ) : (
                <>
                    <a
                        className="btn-login tf-btn"
                        onClick={handleConnect}
                        disabled={isAuthenticating}
                        href="#"
                    >
                        <i className="icon-wallets" />
                        {isAuthenticating ? "Authenticating..." : `${address.substring(0, 6)}...${address.substring(
                            address.length - 4
                        )}`}
                    </a>

                </>
            )}
        </>

    )

}