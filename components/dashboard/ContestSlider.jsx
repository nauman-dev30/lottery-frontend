"use client";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function ContestSlider() {
  return (
    <section className="">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="page-title-dashboard">
              <Swiper
                className="swiper-container"
                {...{
                  spaceBetween: 0,
                  slidesPerView: 1,
                  pagination: {
                    el: ".page-title-pagination",
                    clickable: true,
                  },
                }}
                modules={[Pagination]}
              >
                <SwiperSlide className="swiper-slide">
                  <div className="content">
                    <Image
                      alt=""
                      src="/images/slider/dashboard-1.png"
                      width={167}
                      height={104}
                    />
                    <h4 className="fw-9 title">
                      Only $25 per line <br />4 hours to go!
                    </h4>
                    <p className="text-color-clip style-2 type-color-1">
                      <span className="d-block animationtext letters rotate-3">
                        <span className="cd-words-wrapper">
                          <span
                            className="item-text text-color-clip style-2 type-color-1  is-visible"
                            style={{ opacity: 1 }}
                          >
                            {"$1 Million*"
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
                      <Link className="tf-btn style-lg" href={`/contest`}>
                        <span>Play form $25</span>
                        <i className="icon-right" />
                      </Link>
                      <div className="sub">*Guaranteed</div>
                    </div>
                    <div className="image">
                      <Image
                        className="lazyload"
                        data-src="/images/slider/dashboard-2.png"
                        alt=""
                        src="/images/slider/dashboard-2.png"
                        width={713}
                        height={470}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="content">
                    <Image
                      alt=""
                      src="/images/slider/dashboard-1.png"
                      width={167}
                      height={104}
                    />
                    <h4 className="fw-9 title">
                      Only $25 per line <br />4 hours to go!
                    </h4>
                    <p className="text-color-clip style-2 type-color-1">
                      <span className="d-block animationtext letters rotate-3">
                        <span className="cd-words-wrapper">
                          <span
                            className="item-text text-color-clip style-2 type-color-1  is-visible"
                            style={{ opacity: 1 }}
                          >
                            {"$1 Million*"
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
                      <Link className="tf-btn style-lg" href={`/contest`}>
                        <span>Play form $25</span>
                        <i className="icon-right" />
                      </Link>
                      <div className="sub">*Guaranteed</div>
                    </div>
                    <div className="image">
                      <Image
                        className="lazyload"
                        data-src="/images/slider/dashboard-2.png"
                        alt=""
                        src="/images/slider/dashboard-2.png"
                        width={713}
                        height={470}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div className="content">
                    <Image
                      alt=""
                      src="/images/slider/dashboard-1.png"
                      width={167}
                      height={104}
                    />
                    <h4 className="fw-9 title">
                      Only $25 per line <br />4 hours to go!
                    </h4>
                    <p className="text-color-clip style-2 type-color-1">
                      <span className="d-block animationtext letters rotate-3">
                        <span className="cd-words-wrapper">
                          <span
                            className="item-text text-color-clip style-2 type-color-1  is-visible"
                            style={{ opacity: 1 }}
                          >
                            {"$1 Million*"
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
                      <Link className="tf-btn style-lg" href={`/contest`}>
                        <span>Play form $25</span>
                        <i className="icon-right" />
                      </Link>
                      <div className="sub">*Guaranteed</div>
                    </div>
                    <div className="image">
                      <Image
                        className="lazyload"
                        data-src="/images/slider/dashboard-2.png"
                        alt=""
                        src="/images/slider/dashboard-2.png"
                        width={713}
                        height={470}
                      />
                    </div>
                  </div>
                </SwiperSlide>

                <div className="bottom">
                  <div className="swiper-pagination page-title-pagination pagination-rectangle" />
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
