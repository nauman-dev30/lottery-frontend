import { gameCards2 } from "@/data/contests";
import React from "react";
import Image from "next/image";
import CountdownTimer from "@/components/common/Countdown";
import Link from "next/link";
export default function Contests() {
  return (
    <section className="s-lottery-online tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section mb-32">
              <h1 className="title fw-9 fs-50">
                Play the Lottery Online with <br />
                Official Tickets
              </h1>
              <p className="sub-title fw-4 fs-14">Follow these 3 easy steps!</p>
            </div>
            <div className="grid-column-3 grid-wg-game">
              {gameCards2.map((card, index) => (
                <div
                  key={index}
                  className="wg-game style-1 hover-img wow fadeInUp"
                  data-wow-delay={card.delay}
                >
                  <div className="wg-game-image image-wrap">
                    <Image
                      className="lazyloaded"
                      src={card.imgSrc}
                      alt=""
                      width={card.width}
                      height={card.height}
                    />
                  </div>
                  <div className={`countdown-wrap ${card.styleColor}`}>
                    <div className="heading">
                      <h3 className="title fs-26 fw-9 mb-8">Twice a day</h3>
                      <p className="sub-title fs-12 fw-6">
                        Pick-3 brings you fun, excitement and prizes
                      </p>
                    </div>
                    <p className="text fs-14 mb-8">Draw closes in 2 days</p>
                    <div className="wg-countdown">
                      <span className="js-countdown text-left">
                        <CountdownTimer />
                      </span>
                    </div>
                  </div>
                  <div className="box-winning">
                    <p className="heading fs-12 fw-6">
                      Current winning numbers
                    </p>
                    <div className="winning-list">
                      {["Monday", "Evening"].map((session, i) => (
                        <div key={i} className="winning-item">
                          <div className="time">
                            <p className="day fs-14 fw-6">{session}</p>
                            <p className="date fw-4">(01/07/2024)</p>
                          </div>
                          <ul className="number-list">
                            {["26", "95", "47", "34"].map((num, j) => (
                              <li
                                key={j}
                                className={`number-item ${
                                  num === "34" ? "active" : ""
                                }`}
                              >
                                {num}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/contest-details/${card.id}`}
                    className="tf-btn btn-past"
                  >
                    Past drawings <i className="icon-right"> </i>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
