import React from "react";
import Image from "next/image";
export default function Mission() {
  return (
    <section className="s-our-mission s-get-started tf-spacing-2">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section mb-40">
              <h1 className="title fw-9 fs-50 mb-8">Our mission</h1>
              <p className="sub-title fw-4 fs-14">
                Tronado Lottery cornerstones
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="getstart-item style-2 color-4 fs-16 type-1 wow fadeInUp"
              data-wow-delay="0s"
            >
              <div className="wrapper hover-item">
                <div className="wrap-image image-item mb-30">
                  <Image
                    alt=""
                    width={150}
                    height={150}
                    src="/images/section/our-mission-1.png"
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Education</a>
                  </div>
                  <p>
                    The Lottery exists to contribute to the success of education
                    in Florida.
                  </p>
                </div>
              </div>
              <p className="number text-color-clip style-4">01</p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="getstart-item style-2 color-3 fs-16 type- wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="wrapper hover-item">
                <div className="wrap-image image-item mb-30">
                  <Image
                    alt=""
                    width={150}
                    height={150}
                    src="/images/section/our-mission-2.png"
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">
                      Responsible gaming
                      <br />{" "}
                    </a>
                  </div>
                  <p>
                    We’re committed to facilitating knowledgeable, empowered
                    players.
                  </p>
                </div>
              </div>
              <p className="number text-color-clip style-4">02</p>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="getstart-item style-2 color-7 fs-16 type-1 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="wrapper hover-item">
                <div className="wrap-image image-item mb-30">
                  <Image
                    alt=""
                    width={150}
                    height={150}
                    src="/images/section/our-mission-3.png"
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Game play</a>
                  </div>
                  <p>
                    The Lottery offers the most exciting and engaging games in
                    the industry.
                  </p>
                </div>
              </div>
              <p className="number text-color-clip style-4">03</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
