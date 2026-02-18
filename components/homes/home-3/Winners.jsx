"use client";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import CountdownTimer from "@/components/common/Countdown";
const slides = [
  { src: "/images/slider/winning-1.png", width: 243, height: 122 },
  { src: "/images/slider/winning-2.png", width: 237, height: 119 },
  { src: "/images/slider/winning-3.png", width: 249, height: 125 },
  { src: "/images/slider/winning-4.png", width: 249, height: 125 },
  { src: "/images/slider/winning-5.png", width: 276, height: 138 },
  { src: "/images/slider/winning-3.png", width: 249, height: 125 },
];

const numbers = [26, 95, 47, 47, 47, 34];

export default function Winners() {
  return (
    <section className="s-winning-number tf-spacing-2">
      <div className="tf-container full">
        <div className="heading-section mb-40">
          <h1 className="title mb-6">Winning numbers</h1>
          <p className="sub-title">Tronado Lottery’s Latest Draw Results</p>
        </div>
        <Swiper
          className="swiper-container wining-number-slider wow fadeInUp"
          data-wow-delay="0s"
          {...{
            spaceBetween: 20,
            slidesPerView: 5,
            loop: true,
            pagination: {
              el: ".pagination-s-winning",
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
              1200: {
                slidesPerView: 4,
              },
              1600: {
                slidesPerView: 5,
              },
            },
          }}
          modules={[Pagination]}
        >
          {slides.map((slide, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-game style-2 hover-img">
                <div className="wg-game-image image-wrap">
                  <Image
                    className="lazyloaded"
                    src={slide.src}
                    alt=""
                    width={slide.width}
                    height={slide.height}
                  />
                </div>
                <div className="box-winning">
                  <div className="winning-list">
                    {["Wed, feb 14, 2024", "Double play"].map((label, i) => (
                      <div className="winning-item" key={i}>
                        <p className="note fw-4 mb-10">{label}</p>
                        <ul className="number-list">
                          {numbers.map((num, j) => (
                            <li
                              key={j}
                              className={`number-item ${
                                j === 5 ? "active" : ""
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
                <div className="wg-countdown">
                  <p className="heading mb-8">Next jackpot</p>
                  <span className="js-countdown text-left">
                    <CountdownTimer />
                  </span>
                  <p className="text-color-clip fs-26">$360 Million</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-pagination pagination-s-winning pagination-rectangle style-1" />
        </Swiper>
      </div>
    </section>
  );
}
