"use client";
import { contestCards } from "@/data/contests";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CountdownTimer from "@/components/common/Countdown";
import Link from "next/link";
const categories = ["Lotteries", "Scratchcards", "Raffles"];

export default function Contests() {
  const [filtered, setFiltered] = useState(contestCards);
  const [activeCategory, setActiveCategory] = useState("Lotteries");
  useEffect(() => {
    setFiltered(
      contestCards.filter((elm) => elm.categories2.includes(activeCategory))
    );
  }, [activeCategory]);

  return (
    <div className="my-account-contest">
      <div className="widget-tabs">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="top">
                <div className="heading">
                  <h3
                    className="title fw-9 mb-10 wow fadeInUp"
                    data-wow-delay="0s"
                  >
                    Contest entered
                  </h3>
                  <p className="sub-title fw-4">
                    You have yet to get into the lottery action. <br />
                    Start playing the most exciting lottery draws!
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <ul className="widget-menu-tab overflow-x-auto">
                    {categories.map((category, index) => (
                      <li
                        key={index}
                        className={`item-title ${
                          activeCategory === category ? "active" : ""
                        }`}
                        onClick={() => setActiveCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="widget-content-tab">
            <div className="widget-content-inner active">
              <div className="row">
                {filtered.slice(0, 3).map((card, index) => (
                  <div key={index} className="col-md-4">
                    <div className="wg-game style-5">
                      <div className="wg-game-image">
                        <Image
                          className="ls-is-cached lazyloaded"
                          data-src={card.imgSrc}
                          alt=""
                          src={card.imgSrc}
                          width={card.width}
                          height={card.height}
                        />
                        <span className="js-countdown">
                          <CountdownTimer />
                        </span>
                      </div>
                      <div className="content">
                        <div className="heading">
                          <h4 className="title fw-9 mb-0">
                            <Link href={`/contest-details/${card.id}`}>
                              {card.title}
                            </Link>
                          </h4>
                          <ul className="sub-title-list">
                            <li className="item">
                              <i className="icon-remaining" />
                              <p>Contest No: {card.contestNo}</p>
                            </li>
                            <li className="item">
                              <i className="icon-ticket" />
                              <p>
                                <span>{card.remaining}</span> Remaining
                              </p>
                            </li>
                          </ul>
                          <p className="text fs-14 fw-9">Win up to</p>
                          <p className="money text-color-clip style-6">
                            $
                            {card.winAmount.toLocaleString(undefined, {
                              minimumFractionDigits: 3,
                            })}
                          </p>
                          <Link
                            href={`/contest-details/${card.id}`}
                            className="tf-btn"
                          >
                            $25 To play <i className="icon-right"> </i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
