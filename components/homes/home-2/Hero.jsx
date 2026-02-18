import React from "react";
import Image from "next/image";
import TextLoopAnimation from "@/components/common/TextLoopAnimation";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="tf-section">
      <div className="page-title-home style-2">
        <div className="tf-container">
          <div className="col-12">
            <div className="page-title-home-content">
              <div className="content">
                <h1 className="title">
                  Play the Lottery <br />
                  Online with <br />
                  <span className="d-block animationtext slide">
                    <span className="cd-words-wrapper">
                      <TextLoopAnimation
                        strings={[
                          "Official Tickets",
                          "Official Tickets",
                          "Official Tickets",
                        ]}
                      />
                    </span>
                  </span>
                </h1>
                <div className="text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  <br />
                  sit amet cursus velit. Suspendisse sed tristique mi
                </div>
                <Link href={`/contest`} className="tf-btn">
                  Play form $25 <i className="icon-right" />
                </Link>
              </div>
              <div className="image">
                <Image
                  src="/images/icon/page-title-home-2-item-1.png"
                  alt=""
                  className="lazyload"
                  width={519}
                  height={568}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="image-2 out">
          <Image
            src="/images/icon/page-title-home-2-item-2.png"
            alt=""
            className="lazyload"
            width={128}
            height={132}
          />
        </div>
        <div className="image-3 out">
          <Image
            src="/images/icon/page-title-home-2-item-3.png"
            alt=""
            className="lazyload"
            width={40}
            height={40}
          />
        </div>
        <div className="image-4 out">
          <Image
            src="/images/icon/page-title-home-2-item-4.png"
            alt=""
            className="lazyload"
            width={170}
            height={221}
          />
        </div>
        <div className="image-5 in">
          <Image
            src="/images/icon/page-title-home-2-item-5.png"
            alt=""
            className="lazyload"
            width={294}
            height={266}
          />
        </div>
        <div className="image-6 in">
          <Image
            src="/images/icon/page-title-home-2-item-6.png"
            alt=""
            className="lazyload"
            width={90}
            height={90}
          />
        </div>
        <div className="image-7 out">
          <Image
            src="/images/icon/page-title-home-2-item-6.png"
            alt=""
            className="lazyload"
            width={90}
            height={90}
          />
        </div>
        <div className="image-8 out">
          <Image
            src="/images/icon/page-title-home-2-item-7.png"
            alt=""
            className="lazyload"
            width={273}
            height={251}
          />
        </div>
      </div>
    </div>
  );
}
