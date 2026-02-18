import React from "react";
import Image from "next/image";
export default function Features() {
  return (
    <section className="s-play-the-biggest tf-spacing-2">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="content-left">
              <div className="heading-section mb-40 text-left">
                <h2 className="title mb-6">Play the Biggest Lotteries</h2>
                <p className="sub-title fs-14">
                  We offer customers the opportunity to play to win the world’s
                  most popular lotteries. Our services provide:
                </p>
              </div>
              <ul className="list">
                <li
                  className="item wow hover-item fadeInUp"
                  data-wow-delay="0s"
                >
                  <div className="image-item">
                    <Image
                      alt=""
                      width={128}
                      height={128}
                      src="/images/item/play-biggest-1.png"
                    />
                  </div>
                  <div className="text-details">
                    <h4 className="mb-16 fw-9">
                      <a href="#"> Popular draws </a>
                    </h4>
                    <p className="text fs-14 type-secondary">
                      We offer a wide variety of American and European lotteries
                      including
                      <span>EuroMillions, SuperEnalotto, and EuroJackpot</span>.
                      We provide you with the latest draw results, lottery
                      information, and lotto news.
                    </p>
                  </div>
                </li>
                <li
                  className="item wow hover-item fadeInUp"
                  data-wow-delay="0s"
                >
                  <div className="image-item">
                    <Image
                      alt=""
                      width={128}
                      height={128}
                      src="/images/item/play-biggest-2.png"
                    />
                  </div>
                  <div className="text-details">
                    <h4 className="mb-16 fw-9">
                      <a href="#">Courier service</a>
                    </h4>
                    <p className="text fs-14 type-secondary">
                      We launched our <span>purchasing services</span> in 2002
                      and have led the online lotto industry ever since. Our{" "}
                      <span>lottery courier service</span> buys, scans, and
                      uploads official tickets into your account before the
                      draw.
                    </p>
                  </div>
                </li>
                <li
                  className="item wow hover-item fadeInUp"
                  data-wow-delay="0s"
                >
                  <div className="image-item">
                    <Image
                      alt=""
                      width={128}
                      height={128}
                      src="/images/item/play-biggest-3.png"
                    />
                  </div>
                  <div className="text-details">
                    <h4 className="mb-16 fw-9">
                      <a href="#">Record jackpots</a>
                    </h4>
                    <p className="text fs-14 type-secondary">
                      <span>US Powerball's</span> $2.04 billion jackpot from
                      November 2022 is the world record. Rival American lottery{" "}
                      <span>Mega Millions</span>
                      awarded a $1.602 billion prize in August 2023. Maybe
                      you’ll be the next big winner!
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="image wow fadeInRight" data-wow-delay="0s">
              <Image
                className="lazyload"
                alt=""
                width={810}
                height={991}
                src="/images/item/play-the-biggest.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
