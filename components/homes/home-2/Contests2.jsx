import React from "react";
import Image from "next/image";
import CountdownTimer from "@/components/common/Countdown";
export default function Contests2() {
  return (
    <section className="section-raffles tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              <div className="title wow fadeInUp">Raffles</div>
              <p className="wow fadeInUp" data-wow-delay="0.1s">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit donec
                lectus arcu
              </p>
            </div>
            <div className="grid-column-3">
              <div className="wg-game style-7 wow fadeInUp">
                <div className="wg-game-image">
                  <Image
                    alt=""
                    src="/images/section/wg-game-1.png"
                    width={248}
                    height={248}
                  />
                </div>
                <div className="content">
                  <div className="money-wrap mb-16">
                    <p className="money text-color-clip fs-50">$120</p>
                    <span className="fs-14 fw-9">
                      Million <br />
                      in prizes!
                    </span>
                  </div>
                  <div className="wg-countdown">
                    <p className="title fs-14 fw-4">Draw closes in 2 days</p>
                    <span className="js-countdown">
                      <CountdownTimer />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="wg-game style-7 wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="wg-game-image">
                  <Image
                    alt=""
                    src="/images/section/wg-game-2.png"
                    width={260}
                    height={206}
                  />
                </div>
                <div className="content">
                  <div className="money-wrap mb-16">
                    <p className="money text-color-clip fs-50">$120</p>
                    <span className="fs-14 fw-9">
                      Million <br />
                      in prizes!
                    </span>
                  </div>
                  <div className="wg-countdown">
                    <p className="title fs-14 fw-4">Draw closes in 2 days</p>
                    <span className="js-countdown">
                      <CountdownTimer />
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="wg-game style-7 wow fadeInUp"
                data-wow-delay="0.4s"
              >
                <div className="wg-game-image">
                  <Image
                    alt=""
                    src="/images/section/wg-game-4.png"
                    width={248}
                    height={202}
                  />
                </div>
                <div className="content">
                  <div className="money-wrap mb-16">
                    <p className="money text-color-clip fs-50">$120</p>
                    <span className="fs-14 fw-9">
                      Million <br />
                      in prizes!
                    </span>
                  </div>
                  <div className="wg-countdown">
                    <p className="title fs-14 fw-4">Draw closes in 2 days</p>
                    <span className="js-countdown">
                      <CountdownTimer />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="start-now">
          Become the next winner with just $25, <a href="#">Start Now!</a>
        </div>
      </div>
    </section>
  );
}
