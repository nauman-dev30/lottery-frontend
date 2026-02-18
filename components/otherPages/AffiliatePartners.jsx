import React from "react";
import Image from "next/image";
export default function AffiliatePartners() {
  return (
    <section className="section-affiliate-partner tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              <h2 className="title mb-6 wow fadeInUp">
                Become our affiliate partner
              </h2>
              <p className="sub-title wow fadeInUp">
                Create more passive income with our affiliate program
              </p>
            </div>
            <div className="grid-column-4">
              <div className="getstart-item style-3 color-10 wow fadeInUp hover-item">
                <div className="wrapper">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/getstart-item-7.png"
                      width={201}
                      height={200}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">
                        Completely <br />
                        free
                      </a>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="getstart-item style-3 color-11 wow fadeInUp hover-item"
                data-wow-delay="0.2s"
              >
                <div className="wrapper">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/getstart-item-8.png"
                      width={201}
                      height={200}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">Flexible payment</a>
                    </div>
                    <p>
                      Cras justo sapien, dictum ut nunc laoreet, consectetur
                      vehicula purus.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="getstart-item style-3 color-12 wow fadeInUp hover-item"
                data-wow-delay="0.4s"
              >
                <div className="wrapper">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/getstart-item-9.png"
                      width={201}
                      height={200}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">
                        Easy <br />
                        to deploy
                      </a>
                    </div>
                    <p>
                      Suspendisse suscipit tortor mollis ante porta tristique.
                      Nunc quis tempus mauris.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="getstart-item style-3 color-13 wow fadeInUp hover-item"
                data-wow-delay="0.6s"
              >
                <div className="wrapper">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/getstart-item-10.png"
                      width={201}
                      height={200}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <a href="#">
                        Online <br />
                        support
                      </a>
                    </div>
                    <p>
                      Morbi laoreet, ipsum in semper porta, urna sapien aliquam
                      magna.
                    </p>
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
