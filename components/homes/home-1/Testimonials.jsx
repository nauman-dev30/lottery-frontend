"use client";
import { testimonials } from "@/data/testimonials";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Testimonials() {
  return (
    <section className="section-testimonials tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="testimonials-inner">
              <div className="heading-section mb-0">
                <div className="title mb-4 wow fadeInUp" data-wow-delay="0s">
                  What Our Customers Say
                </div>
                <p>Real testimonials from our community of winners</p>
              </div>
              <Swiper
                className="swiper-container pb-none-slider mt--"
                {...{
                  spaceBetween: 30,
                  slidesPerView: 3,
                  breakpoints: {
                    300: {
                      slidesPerView: 1,
                    },
                    550: {
                      slidesPerView: 1.8,
                    },
                    768: {
                      slidesPerView: 3,
                    },
                    1200: {
                      slidesPerView: 3,
                    },
                    1400: {
                      slidesPerView: 3,
                    },
                  },
                  pagination: {
                    el: ".lottery-1",
                    clickable: true,
                  },
                }}
                modules={[Pagination]}
              >
                {testimonials.map((testimonial, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div
                      className={`testimonial-item ${
                        testimonial.delay ? "wow fadeInUp" : ""
                      }`}
                      data-wow-delay={testimonial.delay || undefined}
                    >
                      <div className="info">
                        <div className="avatar">
                          <Image
                            alt={testimonial.name}
                            src={testimonial.avatar}
                            width={120}
                            height={120}
                          />
                        </div>
                        <div className="content">
                          <div className="name lh-32">
                            <a href="#">{testimonial.name}</a>
                          </div>
                          <p>
                            <span>Clients</span>, {testimonial.date}
                          </p>
                        </div>
                      </div>
                      <p className="desc">“{testimonial.content}“</p>
                      <div className="trust">
                        <div className="icon">
                          {[...Array(5)].map((_, starIndex) => (
                            <i className="icon-star" key={starIndex} />
                          ))}
                        </div>
                        {testimonial.verified && (
                          <p className="verified fs-12">
                            <i className="icon-check-1" /> Verified
                          </p>
                        )}
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
