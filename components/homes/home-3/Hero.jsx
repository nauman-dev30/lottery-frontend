"use client";
import { slideData } from "@/data/heroSlides";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <div className="page-title-home-3">
      <Swiper
        className="swiper-container slider-home-3"
        {...{
          centeredSlides: true,
          loop: "true",
          spaceBetween: 20,
          pagination: { el: ".swiper-pagination", clickable: true },
          breakpoints: {
            1: {
              slidesPerView: 1,
            },
            1600: {
              slidesPerView: 1.7,
            },
          },
        }}
        initialSlide={1}
        modules={[Pagination]}
      >
        {slideData.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className={`slide-title-home-3 ${slide.style}`}>
              <div className="content">
                <div className="image-title">
                  <Image
                    alt=""
                    src={slide.titleImage.src}
                    width={slide.titleImage.width}
                    height={slide.titleImage.height}
                  />
                </div>
                <h4 className="title fw-9 mb-16">
                  Only $25 per line <br />4 hours to go!
                </h4>
                <p className="text-color-clip fs-50">
                  <span className="d-block animationtext letters rotate-3">
                    <span className="cd-words-wrapper">
                      <span
                        className="item-text text-color-clip fs-50  is-visible"
                        style={{ opacity: 1 }}
                      >
                        {slide.prize
                          ?.split(" ")
                          .join("_")
                          .split("")
                          .map((elm, i) => (
                            <i
                              key={i}
                              className={`rorateLetterAnim ${
                                elm == "_" ? "blankSpan" : ""
                              }`}
                              style={{ animationDelay: i * 0.07 + "s" }}
                            >
                              {elm == "_" ? " " : elm}
                            </i>
                          ))}
                      </span>
                    </span>
                  </span>
                </p>
                <div className="bot">
                  <Link href={`/contest-details/1`} className="tf-btn btn-play">
                    Play form $25
                    <i className="icon-right" />
                  </Link>
                  <p className="sub fs-14 type-secondary text-center">
                    *Guaranteed
                  </p>
                </div>
              </div>
              <div
                className={`image ${slide.showCenterImage ? "relative" : ""}`}
              >
                {slide.showCenterImage && slide.centerImage && (
                  <>
                    <Image
                      className="item-2"
                      src={slide.centerImage.src}
                      alt=""
                      width={660}
                      height={372}
                    />
                    <Image
                      className="item-1 absolute"
                      alt=""
                      src={slide.starImage.src}
                      width={slide.starImage.width}
                      height={slide.starImage.height}
                    />
                  </>
                )}
                {!slide.showCenterImage && slide.slideImage && (
                  <Image
                    alt=""
                    src={slide.slideImage.src}
                    width={slide.slideImage.width}
                    height={slide.slideImage.height}
                  />
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination pagination-rectangle style-1" />
      </Swiper>
    </div>
  );
}
