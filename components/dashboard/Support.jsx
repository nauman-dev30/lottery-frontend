"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toggleItems } from "@/data/faqs";
export default function Support() {
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  return (
    <>
      {/* form-search */}
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-dashboard mb-30 letter-space1 wow fadeInUp">
              Hello, How can we help you?
            </div>
            <form
              action="#"
              onSubmit={(e) => e.preventDefault()}
              className="form-search style-2 mb-10"
            >
              <fieldset>
                <input type="text" placeholder="Search" required />
              </fieldset>
              <button className="button-submit" type="submit">
                <i className="icon-search" />
              </button>
            </form>
            <p className="text-1">
              Or choose a category to quickly find the help you need
            </p>
          </div>
        </div>
      </div>
      {/* /form-search */}
      {/* Popular topics */}
      <section className="section-popular-topics">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-dashboard mb-30 letter-space1 wow fadeInUp">
                Popular topics
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="grid-column-4">
                <div className="getstart-item style-1 type-topic color-14 hover-item">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/topic-1.png"
                      width={301}
                      height={300}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">Account</a>
                    </div>
                  </div>
                </div>
                <div className="getstart-item style-1 type-topic color-15 hover-item">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/topic-2.png"
                      width={301}
                      height={300}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">Draw games</a>
                    </div>
                  </div>
                </div>
                <div className="getstart-item style-1 type-topic color-16 hover-item">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/topic-3.png"
                      width={301}
                      height={300}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">Bonus promotions</a>
                    </div>
                  </div>
                </div>
                <div className="getstart-item style-1 type-topic color-17 hover-item">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/topic-4.png"
                      width={301}
                      height={300}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">Winning</a>
                    </div>
                  </div>
                </div>
                <div className="getstart-item style-1 type-topic color-18 hover-item">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/topic-5.png"
                      width={301}
                      height={300}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">Education</a>
                    </div>
                  </div>
                </div>
                <div className="getstart-item style-1 type-topic color-19 hover-item">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/topic-6.png"
                      width={301}
                      height={300}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">Security</a>
                    </div>
                  </div>
                </div>
                <div className="getstart-item style-1 type-topic color-20 hover-item">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/topic-7.png"
                      width={301}
                      height={300}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">Retailers</a>
                    </div>
                  </div>
                </div>
                <div className="getstart-item style-1 type-topic color-21 hover-item">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/topic-8.png"
                      width={301}
                      height={300}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">Partnerships</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /Popular topics */}
      {/* section-common-question */}
      <section className="section-common-question">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-dashboard wow fadeInUp">
                Common Question
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="tf-accordion">
                {toggleItems.map((item, index) => (
                  <div
                    key={index}
                    className={`tf-toggle ${
                      index == activeFaqIndex ? "active" : ""
                    } ${item.extraClass ? ` ${item.extraClass}` : ""}`}
                  >
                    <div
                      className={`toggle-title ${
                        index == activeFaqIndex ? "active" : ""
                      }`}
                      onClick={() =>
                        setActiveFaqIndex((pre) => (pre == index ? -1 : index))
                      }
                    >
                      <div className="title">{item.question}</div>
                      <div className="icon" />
                    </div>
                    <div
                      className="toggle-content"
                      style={
                        index == activeFaqIndex ? { display: "block" } : {}
                      }
                    >
                      <p>{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* /section-common-question */}
      <section className="section-support">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="mb-30">
                <div className="heading-dashboard mb-6 wow fadeInUp">
                  You Still Have A Question?
                </div>
                <div className="text-1 wow fadeInUp">
                  If you can’t find answer to your question, fill your query
                  &amp; submit, or you can always contact us. We answer to you
                  shortly
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="customer-support-item page-support wow fadeInUp">
                <div className="icon">
                  <Image
                    src="/images/icon/customer-support-item-icon-1.png"
                    alt=""
                    className="lazyload"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="customer-support-item-content">
                  <h4 className="title">Talk to our support team</h4>
                  <div className="customer-support-item-text">
                    Got a question about Lotteries? Get in touch with our
                    friendly staff.
                  </div>
                  <div className="btn-customer-support-item">
                    <Link href={`/contact`} className="tf-btn">
                      Contact us <i className="icon-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="customer-support-item page-support wow fadeInUp"
                data-wow-delay="0.2s"
              >
                <div className="icon">
                  <Image
                    src="/images/icon/customer-support-item-icon-2.png"
                    alt=""
                    className="lazyload"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="customer-support-item-content">
                  <h4 className="title">Our Guide to Tronado.</h4>
                  <div className="customer-support-item-text">
                    Check out our FAQ section to see if we can provide the
                    information you need.
                  </div>
                  <div className="btn-customer-support-item">
                    <Link href={`/faq`} className="tf-btn">
                      Help center
                      <i className="icon-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
