"use client";
import React, { useState } from "react";
import Image from "next/image";
import { toggleFaqItems } from "@/data/faqs";
export default function Faqs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section-faq tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-md-6">
            <div className="content">
              <div className="title wow fadeInUp" data-wow-delay="0s">
                Rrequently asked questions
              </div>
              <p className="desc">
                We're here to help! If you can't find the answer you're looking
                for, please contact us via email at{" "}
                <a href="#">Tronado@support.com</a> or by phone at{" "}
                <span>0123456789</span>
              </p>
            </div>
            <div className="wrap-image">
              <Image
                className="lazyload"
                data-src="/images/section/section-faq.png"
                alt=""
                src="/images/section/section-faq.png"
                width={523}
                height={502}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="tf-accordion1 has-bg">
              {toggleFaqItems.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={index}
                    className={`tf-toggle1${isActive ? " active" : ""}`}
                  >
                    <div
                      className={`toggle-title${isActive ? " active" : ""}`}
                      onClick={() => handleToggle(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="title">
                        <i className="icon-question" />
                        {item.question}
                      </div>
                      <div className="icon" />
                    </div>
                    <div
                      className="toggle-content"
                      style={{ display: isActive ? "block" : "none" }}
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
