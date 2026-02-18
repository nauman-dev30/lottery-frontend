"use client";

import { gameCards } from "@/data/contests";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
export default function Winners() {
  return (
    <section className="s-lastest-winner page-lottery-result tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section mb-40">
              <h2 className="title mb-6 wow fadeInUp">Latest Winner</h2>
              <p className="sub-title wow fadeInUp fs-14" data-wow-delay="0.4s">
                Tronado Lottery’s Latest Draw Results
              </p>
            </div>
          </div>
          <div className="col-lg-12">
            <Swiper
              className="swiper-container slide-feature-game"
              {...{
                slidesPerView: 3,
                spaceBetween: 30,
                loop: true,

                pagination: { el: ".pagination-feature-game", clickable: true },
                breakpoints: {
                  1: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                  },
                  650: {
                    slidesPerGroup: 2,
                    slidesPerView: 2,
                  },
                  991: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                  },
                },
              }}
              modules={[Pagination]}
            >
              {gameCards.map((game, index) => (
                <SwiperSlide
                  key={index}
                  className={`swiper-slide wow fadeInUp`}
                  data-wow-delay={game.delay}
                >
                  <div className="wg-game style-3 hover-img">
                    <div className="wg-game-image image-wrap">
                      <Image
                        src={game.imgSrc}
                        alt=""
                        className="lazyload"
                        width={game.width}
                        height={game.height}
                      />
                    </div>
                    <div className="heading">
                      <h4 className="title fw-9">
                        <Link href={`/contest-details/${game.id}`}>
                          Latest Daily Draw
                        </Link>
                      </h4>
                      <p className="sub-title">
                        <i className="icon-remaining" />
                        Contest No: {game.contestNo}
                      </p>
                    </div>
                    <div className="winning-item">
                      <p className="note fw-4">{game.drawDate}</p>
                      <ul className="number-list">
                        {game.numbers.map((num, i) => (
                          <li
                            key={i}
                            className={`number-item ${
                              i === game.numbers.length - 1 ? "active" : ""
                            }`}
                          >
                            {num}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p className="text-color-clip fs-26">
                      Win: {game.winAmount}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-pagination pagination-feature-game pagination-rectangle style-1" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
