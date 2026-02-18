"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { winnersData } from "@/data/winners";
const categories = ["All", "Dream Car", "Dream Bike", "Laptop", "Money"];

export default function Winners({
  parentClass = "section-latest-winners tf-spacing-2",
}) {
  const [filtered, setFiltered] = useState(winnersData);
  const [activeCategory, setActiveCategory] = useState("All");
  useEffect(() => {
    if (activeCategory == "All") {
      setFiltered(winnersData);
    } else {
      setFiltered(winnersData.filter((elm) => elm.category == activeCategory));
    }
  }, [activeCategory]);

  return (
    <section className={parentClass}>
      <div className="tf-container">
        <div className="col-12">
          <div className="section-latest-winners-inner">
            <div className="heading-section pb-0">
              <div className="title wow fadeInUp" data-wow-delay="0s">
                Latest Winners
              </div>
              <p className="fs-14 lh-20">
                Check your ticket number's to see if you are a Winner in the
                Dream Lottery.
              </p>
            </div>
            <div className="main">
              <div className="widget-tabs">
                <ul className="widget-menu-tab overflow-x-auto">
                  {categories.map((category) => (
                    <li
                      key={category}
                      className={`item-title ${
                        activeCategory === category ? "active" : ""
                      }`}
                      onClick={() => setActiveCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <div className="widget-content-tab">
                  <div className="widget-content-inner active">
                    <div className="table-latest-winners">
                      <div className="title">
                        <div>Contest No</div>
                        <div>Winners</div>
                        <div>Winning numbers</div>
                        <div>Time</div>
                        <div>reward</div>
                      </div>
                      {filtered.map((item) => (
                        <div key={item.id} className="item-table">
                          <div>{item.contestNo}</div>
                          <div>
                            <a href="#">{item.winner}</a>
                          </div>
                          <div>
                            <ul className="number-list">
                              {item.numbers.map((num, idx) => (
                                <li
                                  key={idx}
                                  className={
                                    typeof num === "object" && num.active
                                      ? "active"
                                      : ""
                                  }
                                >
                                  {typeof num === "object" ? num.value : num}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>{item.time}</div>
                          <div className="img">
                            <Image
                              alt={`Reward ${item.id}`}
                              src={item.rewardImg.src}
                              width={item.rewardImg.width}
                              height={item.rewardImg.height}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
