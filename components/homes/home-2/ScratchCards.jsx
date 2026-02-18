"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SortingSelect from "@/components/common/SortingSelect";
import CategorySelect from "@/components/common/CategorySelect";
import PriceRangeSelect from "@/components/common/PriceRangeSelect";
import { scratchcardData } from "@/data/contests";
import Link from "next/link";
export default function ScratchCards() {
  const [filtered, setFiltered] = useState(scratchcardData);
  const [currentCategory, setCurrentCategory] = useState("All");
  useEffect(() => {
    if (currentCategory == "All") {
      setFiltered(scratchcardData);
    } else {
      setFiltered(
        scratchcardData.filter((elm) =>
          elm.categories.includes(currentCategory)
        )
      );
    }
  }, [currentCategory]);

  return (
    <section className="section-scratchcards">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              <div className="title wow fadeInUp">Scratchcards</div>
              <p className="wow fadeInUp" data-wow-delay="0.1s">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit donec
                lectus arcu
              </p>
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
            <div className="grid-column-3">
              {filtered.map((card) => (
                <div
                  key={card.id}
                  className="wg-game style-4 hover-img wow fadeInUp"
                  data-wow-delay={card.wowDelay}
                >
                  <div className="wg-game-image">
                    <Image
                      className="lazyload"
                      data-src={card.imgSrc}
                      alt={`Scratchcard ${card.id}`}
                      src={card.imgSrc}
                      width={700}
                      height={460}
                    />
                  </div>
                  <div className="content">
                    <p className="text fs-14 fw-9">Win up to</p>
                    <p className="money text-color-clip style-6">
                      {card.jackpotAmount}
                      <span className="fs-20">Jackpot</span>
                    </p>
                    <Link
                      href={`/contest-details/${card.id}`}
                      className="tf-btn"
                    >
                      {card.price} To play <i className="icon-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
