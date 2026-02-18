"use client";

import { contestCards } from "@/data/contests";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import CountdownTimer from "../common/Countdown";
import { useEffect, useState } from "react";
import Link from "next/link";
const rewardItems = ["Dream car", "Smart phone", "Watch", "Laptop", "Money"];

export default function ContestsSlider2() {
  const [activeReward, setActiveReward] = useState("Dream car"); // default active
  const [filtered, setFiltered] = useState(contestCards);
  useEffect(() => {
    setFiltered(
      contestCards.filter((elm) => elm.categories.includes(activeReward))
    );
  }, [activeReward]);

  return (
    <section className="">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              <div className="title wow fadeInUp" data-wow-delay="0s">
                Play the Lottery Online with <br />
                Official Tickets
              </div>
              <p>
                Check your ticket number's to see if you are a Winner in the
                Dream Lottery.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="widget-tabs">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <ul className="widget-menu-tab mb-30 overflow-x-auto">
                {rewardItems.map((item) => (
                  <li
                    key={item}
                    className={`item-title ${
                      activeReward === item ? "active" : ""
                    }`}
                    onClick={() => setActiveReward(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <div className="widget-content-tab">
                <div className="widget-content-inner active">
                  <Swiper
                    className="swiper-container slide-feature-game wow fadeInUp"
                    data-wow-delay="0s"
                    {...{
                      slidesPerView: 3,
                      spaceBetween: 30,
                      loop: true,
                      pagination: {
                        el: ".pagination-feature-game",
                        clickable: true,
                      },
                      breakpoints: {
                        1: {
                          slidesPerView: 1,
                        },
                        650: {
                          slidesPerView: 2,
                        },
                        991: {
                          slidesPerView: 3,
                        },
                      },
                    }}
                    modules={[Pagination]}
                  >
                    {filtered.map((card, index) => (
                      <SwiperSlide className="swiper-slide" key={index}>
                        <div
                          className="wg-game style-5 hover-img"
                          style={{ animationDelay: card.delay }}
                        >
                          <div className="wg-game-image image-wrap">
                            <Image
                              className="lazyloaded"
                              data-src={card.imgSrc}
                              alt=""
                              src={card.imgSrc}
                              width={card.width}
                              height={card.height}
                            />
                            <span className="js-countdown text-left">
                              <CountdownTimer />
                            </span>
                          </div>
                          <div className="content">
                            <div className="heading">
                              <h4 className="title fw-9">
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
                      </SwiperSlide>
                    ))}
                    <div className="swiper-pagination pagination-feature-game pagination-rectangle style-1" />
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
