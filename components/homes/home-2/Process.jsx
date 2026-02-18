"use client";
import React, { useState } from "react";
import Image from "next/image";
import ModalVideo from "@/components/common/ModalVideo";
export default function Process() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="wrap-section-home-2 tf-spacing-1">
        {/* section-getstarted */}
        <section className="section-getstarted tf-spacing-1">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">
                <div className="heading-section">
                  <div className="title wow fadeInUp">How to get started</div>
                  <p className="wow fadeInUp" data-wow-delay="0.1s">
                    Follow these 3 easy steps!
                  </p>
                </div>
              </div>
              <div className="grid-column-3">
                <div className="wrap-getstarted">
                  <div className="guide-number">
                    <span>01</span>
                  </div>
                  <div className="getstart-item style-1 color-1 hover-item">
                    <div className="wrap-image">
                      <Image
                        alt=""
                        src="/images/section/getstart-item-1.png"
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Choose contest</a>
                      </div>
                      <p>Register to Tronado. &amp; Choose your contest</p>
                    </div>
                  </div>
                </div>
                <div className="wrap-getstarted">
                  <div className="guide-number">
                    <span>02</span>
                  </div>
                  <div className="getstart-item style-1 color-2 hover-item">
                    <div className="wrap-image">
                      <Image
                        alt=""
                        src="/images/section/getstart-item-2.png"
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Buy lucky numbers</a>
                      </div>
                      <p>Pick Your Numbers &amp; Complete your Purchase</p>
                    </div>
                  </div>
                </div>
                <div className="wrap-getstarted">
                  <div className="guide-number">
                    <span>03</span>
                  </div>
                  <div className="getstart-item style-1 color-3 hover-item">
                    <div className="wrap-image">
                      <Image
                        alt=""
                        src="/images/section/getstart-item-3.png"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="content">
                      <div className="title">
                        <a href="#">Take your victory</a>
                      </div>
                      <p>Dream big, you are about to reach success.</p>
                    </div>
                  </div>
                </div>
                <div className="item arow-1">
                  <Image
                    alt=""
                    src="/images/icon/curved-arrow.png"
                    width={438}
                    height={390}
                  />
                </div>
                <div className="item arow-2">
                  <Image
                    alt=""
                    src="/images/icon/curved-arrow.png"
                    width={438}
                    height={390}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /section-getstarted */}
        {/* section-video */}
        <div className="section-video">
          <div className="tf-container">
            <div className="row">
              <div className="col-12">
                <div className="heading-section">
                  <div className="title wow fadeInUp">What a short video!</div>
                  <p className="wow fadeInUp" data-wow-delay="0.1s">
                    Follow these 3 easy steps!
                  </p>
                </div>
                <div className="widget-video">
                  <Image
                    className="lazyload"
                    data-src="/images/section/wg-video.png"
                    alt=""
                    src="/images/section/wg-video.png"
                    width={1110}
                    height={624}
                  />
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(true);
                    }}
                    className="popup-youtube"
                  >
                    <div className="icon">
                      <i className="icon-play" />
                      <div className="wave" />
                      <div className="wave-1" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /section-video */}
      </div>
      <ModalVideo
        isOpen={isOpen}
        videoId={"MLpWrANjFbI"}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
