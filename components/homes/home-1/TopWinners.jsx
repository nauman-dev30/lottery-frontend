"use client";
import { members } from "@/data/winners";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function TopWinners() {
  return (
    <section className="section-guide tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="guide-inner">
              <div className="heading-section">
                <div className="title wow fadeInUp" data-wow-delay="0s">
                  Top Winners
                </div>
                <p className="fs-14 lh-20">
                  The person who won by a stroke of luck this month
                </p>
              </div>
              <div className="image">
                <Image
                  src="/images/item/page-title-car.png"
                  alt=""
                  width={1316}
                  height={608}
                />
              </div>
              <Swiper
                className="swiper-container pb-none-slider mt--6"
                {...{
                  spaceBetween: 30,
                  slidesPerView: 4,
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
                      slidesPerView: 4,
                    },
                  },
                  pagination: {
                    el: ".lottery-1",
                    clickable: true,
                  },
                }}
                modules={[Pagination]}
              >
                {members.map((member, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div
                      className={`member-item style-2 ${
                        member.delay !== null ? "wow fadeInUp" : ""
                      }`}
                      {...(member.delay !== null
                        ? { "data-wow-delay": member.delay }
                        : {})}
                    >
                      <div className="wrap-image">
                        <p className="number text-color-clip style-3">
                          {member.number}
                        </p>
                        <Image
                          className="lazyload"
                          data-src={member.image}
                          src={member.image}
                          alt={member.name}
                          width={381}
                          height={396}
                        />
                      </div>
                      <div className="content">
                        <p className="title text-color-clip">
                          THE Tronado Lottery IX
                        </p>
                        <div className="name fs-18 mb-2">
                          <a href="#">{member.name}</a>
                        </div>
                        <p className="fs-12 mb-2">Draw took place on:</p>
                        <div className="time">March 14, 2024</div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}

                <div className="bottom">
                  <div className="swiper-pagination style-1 lottery-1 pagination-rectangle pt-31" />
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
