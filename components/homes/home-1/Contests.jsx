"use client";
import { contestData } from "@/data/contests";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import CountdownTimer from "@/components/common/Countdown";
import SortingSelect from "@/components/common/SortingSelect";
import CategorySelect from "@/components/common/CategorySelect";
import PriceRangeSelect from "@/components/common/PriceRangeSelect";
import Link from "next/link";
export default function Contests() {
  const [filtered, setFiltered] = useState(contestData);
  const [currentCategory, setCurrentCategory] = useState("All");
  useEffect(() => {
    if (currentCategory == "All") {
      setFiltered(contestData);
    } else {
      setFiltered(
        contestData.filter((elm) => elm.categories.includes(currentCategory))
      );
    }
  }, [currentCategory]);

  return (
    <section className="section-game">
      <div className="tf-container full">
        <div className="row">
          <div className="col-12">
            <div className="section-game-inner">
              <div className="heading-section pb-0">
                <div className="title wow fadeInUp" data-wow-delay="0s">
                  Win up to $250k
                </div>
                <p>With our Instant Win Games</p>
              </div>
              <div className="filter">
                <div className="tf-wrap-sort">
                  <SortingSelect />
                  <CategorySelect
                    selectedValue={currentCategory}
                    onChange={(value) => setCurrentCategory(value)}
                  />
                  <PriceRangeSelect />
                  <form
                    action="#"
                    className="form-search"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <fieldset>
                      <input type="text" placeholder="Search..." required />
                    </fieldset>
                    <button className="button-submit" type="submit">
                      <i className="icon-search" />
                    </button>
                  </form>
                </div>
              </div>
              <Swiper
                className="swiper-container"
                {...{
                  spaceBetween: 30,
                  slidesPerView: 5,
                  breakpoints: {
                    300: {
                      slidesPerView: 1,
                    },
                    550: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1200: {
                      slidesPerView: 3,
                    },
                    1400: {
                      slidesPerView: 5,
                    },
                  },
                  pagination: {
                    el: ".lottery-1",
                    clickable: true,
                  },
                }}
                modules={[Pagination]}
              >
                {filtered.slice(0, 6).map((card, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="wg-game style-5 hover-img">
                      <div className="wg-game-image image-wrap">
                        <Image
                          className="ls-is-cached lazyloaded"
                          data-src={card.imgSrc}
                          src={card.imgSrc}
                          alt=""
                          width={card.width}
                          height={card.height}
                        />
                        <span className="js-countdown">
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
                            ${card.winAmount.toLocaleString()}
                          </p>
                          <Link
                            href={`/contest-details/${card.id}`}
                            className="tf-btn"
                          >
                            ${card.playCost.toFixed(2)} To play{" "}
                            <i className="icon-right"> </i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="bottom">
                  <div className="swiper-pagination style-1 lottery-1 pagination-rectangle pt-34" />
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
