"use client";
import { testimonials2 } from "@/data/testimonials";
import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Testimonials() {
  return (
    <section className="section-testimonial-home-2 tf-spacing-1">
      <div className="heading-section">
        <div className="title wow fadeInUp">What Our Customers Say</div>
        <p className="wow fadeInUp" data-wow-delay="0.1s">
          Follow these 3 easy steps!
        </p>
      </div>
      <div className="wrap-testimonial">
        <Swiper
          {...{
            spaceBetween: 0,
            slidesPerView: 1,
            observer: true,
            observeParents: true,
            navigation: {
              nextEl: ".testimonial-next",
              prevEl: ".testimonial-prev",
            },
          }}
          modules={[Navigation]}
          className="swiper-container"
        >
          {testimonials2.map((testimonial, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`testimonial-item style-full${
                  testimonial.isAnimated ? " wow fadeInUp" : ""
                }`}
              >
                <div className="avatar">
                  <Image
                    alt=""
                    src={testimonial.img}
                    width={testimonial.width}
                    height={testimonial.height}
                  />
                </div>
                <p
                  className="desc"
                  dangerouslySetInnerHTML={{ __html: testimonial.desc }}
                ></p>
                <div className="trust">
                  <div className="icon">
                    {[...Array(5)].map((_, i) => (
                      <i className="icon-star" key={i} />
                    ))}
                  </div>
                  <p className="verified">
                    <i className="icon-check-1" />
                    Verified
                  </p>
                </div>
                <div className="content">
                  <div className="name">
                    <a href="#">{testimonial.name}</a>
                  </div>
                  <p>
                    <span>{testimonial.role}</span>, {testimonial.date}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-next button testimonial-next">
            <i className="icon-next" />
          </div>
          <div className="swiper-button-prev button testimonial-prev">
            <i className="icon-back" />
          </div>
        </Swiper>
      </div>
    </section>
  );
}
