import React from "react";
import Image from "next/image";
import CountdownTimer from "@/components/common/Countdown";
import Link from "next/link";
import AuthConnectButton from "@/components/auth/AuthConnectButton";
export default function Banner3() {
  return (
    <section className="section-banner tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="banner-inner style-2">
              <div className="banner-left">
                <div className="time">
                  <span className="js-countdown">
                    <CountdownTimer />
                  </span>
                </div>
                <div className="banner">
                  <span>Try your luck LOTTERY</span>
                </div>
                <div className="text-giveaway wow fadeInUp" data-wow-delay="0s">
                  Try your luck LOTTERY
                </div>
                <div className="text">
                  How to win the lottery? 5 tip for you
                </div>
                <AuthConnectButton />
              </div>
              <div className="banner-img">
                <div className="image-1">
                  <Image
                    src="/images/icon/banner-2-item.png"
                    alt=""
                    className="lazyload"
                    width={593}
                    height={306}
                  />
                </div>
                <div className="image-2">
                  <Image
                    src="/images/item/coin-banner-2-1.png"
                    alt=""
                    className="lazyload"
                    width={110}
                    height={107}
                  />
                </div>
                <div className="image-3">
                  <Image
                    src="/images/item/coin-banner-2-2.png"
                    alt=""
                    className="lazyload"
                    width={99}
                    height={99}
                  />
                </div>
                <div className="image-4">
                  <Image
                    src="/images/item/coin-banner-2-3.png"
                    alt=""
                    className="lazyload"
                    width={118}
                    height={119}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
