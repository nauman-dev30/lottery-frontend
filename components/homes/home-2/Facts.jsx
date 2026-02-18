import Counter from "@/components/common/Counter";
import { counterItems } from "@/data/facts";
import React from "react";

export default function Facts() {
  return (
    <section className="s-succes-story tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section mb-40 wow fadeInUp">
              <h2 className="title mb-6">Success story</h2>
              <p className="sub-title fs-14 wow fadeInUp" data-wow-delay="0.1s">
                Our success stories - What we have achieved
              </p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="wg-counter">
              {counterItems.map((item, index) => (
                <div className={`counter-item ${item.type}`} key={index}>
                  <div className="counter">
                    <div className="number-counter">
                      <span className="number">
                        <Counter max={item.number} />{" "}
                      </span>
                      <span className="plus"> {item.suffix} </span>
                    </div>
                  </div>
                  <p className="text">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
