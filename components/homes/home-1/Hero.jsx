"use client";
import React from "react";
import Image from "next/image";
import TyperAnimation from "@/components/common/TyperAnimation";
import Link from "next/link";
import { useSelector } from "react-redux";
import AuthConnectButton from "@/components/auth/AuthConnectButton";
export default function Hero() {
  const trdoDecimals = useSelector((state) => state.trdoToken.trdoDecimals);
  const trdoBalance = useSelector((state) => state.trdoToken.trdoBalance);
  return (
    <>
      {/* page-title-home-1 */}
      <div className="page-title-home-1">
        {/* <Image class="item-page-title-home-1"  alt=""    src="/images/item/page-title-1.png" width="1920" height="1018" /> */}
        <Image
          className="coin item-2"
          alt=""
          src="/images/item/coin-4.png"
          width={80}
          height={96}
        />
        <Image
          className="coin item-4"
          alt=""
          src="/images/item/coin-6.png"
          width={74}
          height={68}
        />
        <Image
          className="coin item-5"
          alt=""
          src="/images/item/coin-7.png"
          width={115}
          height={99}
        />
        <Image
          className="coin item-6"
          alt=""
          src="/images/item/coin-8.png"
          width={76}
          height={69}
        />
        <Image
          className="coin item-8"
          alt=""
          src="/images/item/ball-1.png"
          width={177}
          height={176}
        />
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="main-page-title">
                <p className="title">
                  Win Big With
                  <span className="d-block animationtext clip">
                    <TyperAnimation strings={["Tronado Lottery."]} />
                  </span>
                </p>
                <p className="sub-title">
                  Transparent, decentralized, and rewarding — powered by
                  blockchain.
                </p>

                <div className="item-car">
                  <Image
                    alt=""
                    src="/images/section/hero-1.png"
                    width={400}
                    height={608}
                  />
                </div>
                <br></br>
                <br></br>
                <AuthConnectButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
