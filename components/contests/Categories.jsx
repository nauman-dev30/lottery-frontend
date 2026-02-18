"use client";
import { categoryItems } from "@/data/categories";
import { contestData } from "@/data/contests";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import CountdownTimer from "../common/Countdown";
import SortingSelect from "../common/SortingSelect";
import CategorySelect from "../common/CategorySelect";
import PriceRangeSelect from "../common/PriceRangeSelect";
import Link from "next/link";
export default function Categories() {
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
    <div className="section-list-game tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="wrap-category">
              <Swiper
                className="swiper-container"
                {...{
                  spaceBetween: 30,
                  slidesPerView: 1,
                  observer: true,
                  observeParents: true,
                  breakpoints: {
                    0: {
                      slidesPerView: 2.3,
                    },
                    550: {
                      slidesPerView: 3.3,
                    },
                    767: {
                      slidesPerView: 4.3,
                    },
                    991: {
                      slidesPerView: 6,
                    },
                  },
                  navigation: {
                    nextEl: null,
                    prevEl: null,
                  },
                }}
              >
                {categoryItems.map((item, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div
                      className="category-item wow fadeInUp"
                      {...(item.delay && { "data-wow-delay": item.delay })}
                    >
                      <div className="wrap-image">
                        <Image
                          alt=""
                          src={item.image}
                          width={135}
                          height={135}
                        />
                      </div>
                      <p>
                        <a href="#">{item.label}</a>
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="tf-wrap-sort">
              <SortingSelect />
              <CategorySelect
                selectedValue={currentCategory}
                onChange={(value) => setCurrentCategory(value)}
              />
              <PriceRangeSelect />
              <form
                action="#"
                onSubmit={(e) => e.preventDefault()}
                className="form-search"
              >
                <fieldset>
                  <input type="text" placeholder="Search..." required />
                </fieldset>
                <button className="button-submit" type="submit">
                  <i className="icon-search" />
                </button>
              </form>
            </div>
            <div className="grid-column-3">
              {filtered.map((item, index) => (
                <div
                  key={index}
                  className="wg-game style-5 hover-img wow fadeInUp"
                  data-wow-delay={
                    index % 3 === 1
                      ? "0.2s"
                      : index % 3 === 2
                      ? "0.4s"
                      : undefined
                  }
                >
                  <div className="wg-game-image">
                    <Image
                      src={item.imgSrc}
                      alt=""
                      className="lazyload"
                      width={item.width}
                      height={item.height}
                    />
                    <span className="js-countdown">
                      <CountdownTimer />
                    </span>
                  </div>
                  <div className="content">
                    <div className="heading">
                      <h4 className="title fw-9">
                        <Link href={`/contest-details/${item.id}`}>
                          {item.title}
                        </Link>
                      </h4>
                      <ul className="sub-title-list">
                        <li className="item">
                          <i className="icon-remaining" />
                          <p>Contest No: {item.contestNo}</p>
                        </li>
                        <li className="item">
                          <i className="icon-ticket" />
                          <p>
                            <span>{item.remaining}</span> Remaining
                          </p>
                        </li>
                      </ul>
                      <p className="text fs-14 fw-9">Win up to</p>
                      <p className="money text-color-clip style-6">
                        ${item.winAmount.toLocaleString()}
                      </p>
                      <Link
                        href={`/contest-details/${item.id}`}
                        className="tf-btn"
                      >
                        ${item.playCost} To play <i className="icon-right"> </i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <ul className="wg-pagination">
              <li>
                <a href="#">
                  <i className="icon-back" />
                </a>
              </li>
              <li>
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
              <li className="active">
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">4</a>
              </li>
              <li>
                <a href="#">...</a>
              </li>
              <li>
                <a href="#">
                  <i className="icon-next" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
