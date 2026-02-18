"use client";
import { faqItems } from "@/data/faqs";
import React, { useState } from "react";
import FaqNav from "./FaqNav";

export default function Faqs() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(1);
  const groupedFAQs = faqItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="section-faq">
      <div className="tf-container">
        <div className="row">
          <div className="col-xl-3">
            <div className="faq-wrap">
              <div className="top">
                <div className="faq-wrap-title">Category FAQ</div>
                <div className="line" />
              </div>
              <div className="faq-wrap-tabs">
                <FaqNav />
              </div>
            </div>
          </div>
          <div className="col-xl-9">
            <div className="faq-content">
              {Object.entries(groupedFAQs).map(([category, items]) => (
                <div
                  className="faq-wrap-content-tab"
                  id={category.toLowerCase().replace(/\s+/g, "-")}
                  key={category}
                >
                  <div className="tf-accordion pb-18">
                    <h3
                      className="title-accordion wow fadeInUp"
                      data-wow-delay="0s"
                    >
                      {category}
                    </h3>

                    {items.map((faq, index) => (
                      <div
                        className={`tf-toggle ${
                          faq.id == activeFaqIndex ? "active" : ""
                        } `}
                        key={index}
                      >
                        <div
                          className={`toggle-title ${
                            faq.id == activeFaqIndex ? "active" : ""
                          } `}
                          onClick={() =>
                            setActiveFaqIndex((pre) =>
                              pre == faq.id ? -1 : faq.id
                            )
                          }
                        >
                          <div className="title">{faq.question}</div>
                          <div className="icon" />
                        </div>
                        <div
                          className="toggle-content"
                          style={
                            faq.id == activeFaqIndex ? { display: "block" } : {}
                          }
                        >
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    ))}
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
