"use client";
import { brandImages } from "@/data/brands";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
export default function Brands() {
  return (
    <div className="brand tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="title">Trusted by over 150+ major companies</div>
            <Swiper
              className="swiper-container width-slide"
              {...{
                spaceBetween: 30,
                slidesPerView: "auto",
                loop: "true",
                speed: 10000,
                autoplay: {
                  delay: "0",
                  disableOnInteraction: false,
                },
                observer: true,
                observeParents: true,
              }}
              modules={[Autoplay]}
            >
              {brandImages.map((src, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <a href="#">
                    <Image alt="" src={src} width={320} height={160} />
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
