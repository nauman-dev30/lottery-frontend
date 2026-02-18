"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AuthConnectButton from "../auth/AuthConnectButton";
import { useAccount } from "wagmi";


export default function RegisterForm({ isPage = false }) {
  const { isConnected } = useAccount();

  return (
    <div className={!isPage ? "register-wrap" : ""}>
      {!isPage && (
        <div className="image">
          <Image
            className="lazyload"
            src="/images/section/register.png"
            alt="Register"
            width={1800}
            height={1800}
          />
        </div>
      )}
      <div className="content mt-5">
        {!isPage && (
          <div className="close-form">
            <a href="#" className="btn-hide-popup" data-bs-dismiss="modal">
              <i className="icon-close" />
            </a>
          </div>
        )}
        <h4 className="title">Connect Wallet to Start</h4>
        <p className="mb-20">
          {isConnected
            ? "Wallet connected! Authenticating..."
            : "Connect your wallet to sign in or create an account automatically."}
        </p>

        <div className="cols mb-20">

            <AuthConnectButton />

        </div>
      </div>
    </div>
  );
}
