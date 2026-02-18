import React from "react";
import Image from "next/image";
export default function Steps() {
  return (
    <section className="section-get-started tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-start pb-0">
              <div className="title pb-1">How to get started</div>
              <p className="text-title fs-14">Follow these 3 easy steps!</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="get-started-content">
              <div className="get-started-main">
                <div
                  className="getstart-item color-1 hover-item wow fadeInUp"
                  data-wow-delay="0s"
                >
                  <div className="wrap-image image-item">
                    <Image
                      alt=""
                      src="/images/section/getstart-item-1.png"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">Choose favorite contest</a>
                    </div>
                    <p className="fs-16">
                      Register to Tronado. &amp; Choose your contest
                    </p>
                  </div>
                </div>
                <div
                  className="getstart-item hover-item color-2 wow fadeInUp"
                  data-wow-delay="0s"
                >
                  <div className="wrap-image image-item">
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
                    <p className="fs-16">
                      Pick Your Numbers &amp; Complete your Purchase
                    </p>
                  </div>
                </div>
                <div
                  className="getstart-item hover-item color-3 wow fadeInUp"
                  data-wow-delay="0s"
                >
                  <div className="wrap-image image-item">
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
                    <p className="fs-16">
                      Dream big, you are about to reach success.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="get-started-image">
              <div className="image-2 wow pulse animated" data-wow-delay="1s">
                <Image
                  src="/images/item/get-started-item-2.png"
                  alt=""
                  className="lazyload"
                  width={811}
                  height={602}
                />
              </div>
              <div className="image-1">
                <Image
                  src="/images/item/get-started-item-1.png"
                  alt=""
                  className="lazyload"
                  width={810}
                  height={696}
                />
              </div>
              <div className="coin-image-1">
                <Image
                  src="/images/item/get-started-item-coin-1.png"
                  alt=""
                  className="lazyload"
                  width={104}
                  height={123}
                />
              </div>
              <div className="coin-image-2">
                <Image
                  src="/images/item/get-started-item-coin-2.png"
                  alt=""
                  className="lazyload"
                  width={98}
                  height={90}
                />
              </div>
              <div className="coin-image-3">
                <Image
                  src="/images/item/get-started-item-coin-3.png"
                  alt=""
                  className="lazyload"
                  width={72}
                  height={108}
                />
              </div>
              <div className="coin-image-4">
                <Image
                  src="/images/item/get-started-item-coin-4.png"
                  alt=""
                  className="lazyload"
                  width={43}
                  height={65}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
