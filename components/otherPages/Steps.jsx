import React from "react";
import Image from "next/image";
export default function Steps() {
  return (
    <section className="section-getstarted page-how-to-work tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section">
              <div className="title">How to get started</div>
              <p>Follow these 3 easy steps!</p>
            </div>
          </div>
          <div className="grid-column-3">
            <div className="wrap-getstarted wow fadeInUp" data-wow-delay="0s">
              <div className="guide-number">
                <span>01</span>
              </div>
              <div className="getstart-item hover-item style-1 color-1">
                <div className="wrap-image image-item">
                  <Image
                    alt=""
                    src="/images/section/getstart-item-4.png"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Quick Sign-Up</a>
                  </div>
                  <p>
                    Get started with just a few clicks – no complicated steps.
                  </p>
                </div>
              </div>
            </div>
            <div className="wrap-getstarted wow fadeInUp" data-wow-delay="0.1s">
              <div className="guide-number">
                <span>02</span>
              </div>
              <div className="getstart-item hover-item style-1 color-3">
                <div className="wrap-image image-item">
                  <Image
                    alt=""
                    src="/images/section/getstart-item-6.png"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Connect Your Wallet</a>
                  </div>
                  <p>Securely link your blockchain wallet in seconds.</p>
                </div>
              </div>
            </div>
            <div className="wrap-getstarted wow fadeInUp" data-wow-delay="0.2s">
              <div className="guide-number">
                <span>03</span>
              </div>
              <div className="getstart-item hover-item style-1 color-4">
                <div className="wrap-image image-item">
                  <Image
                    alt=""
                    src="/images/section/topic-7.png"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Buy Products</a>
                  </div>
                  <p>Choose from our product selection and make a purchase.</p>
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
          <div className="grid-column-3">
            <div className="wrap-getstarted wow fadeInUp" data-wow-delay="0s">
              <div className="guide-number">
                <span>04</span>
              </div>
              <div className="getstart-item hover-item style-1 color-20">
                <div className="wrap-image image-item">
                  <Image
                    alt=""
                    src="/images/section/getstart-item-7.png"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Earn Tickets Automatically</a>
                  </div>
                  <p>
                    With every purchase, you instantly receive lottery entries.
                  </p>
                </div>
              </div>
            </div>
            <div className="wrap-getstarted wow fadeInUp" data-wow-delay="0.1s">
              <div className="guide-number">
                <span>05</span>
              </div>
              <div className="getstart-item hover-item style-1 color-12 ">
                <div className="wrap-image image-item">
                  <Image
                    alt=""
                    src="/images/section/wg-game-2.png"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Automated Draw</a>
                  </div>
                  <p>
                    Our blockchain system runs fair, transparent draws
                    automatically.
                  </p>
                </div>
              </div>
            </div>
            <div className="wrap-getstarted wow fadeInUp" data-wow-delay="0.2s">
              <div className="guide-number">
                <span>06</span>
              </div>
              <div className="getstart-item hover-item style-1 color-13">
                <div className="wrap-image image-item">
                  <Image
                    alt=""
                    src="/images/section/getstart-item-5.png"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Instant Prize Claim</a>
                  </div>
                  <p>
                    Win? Great! Claim your prize quickly and securely right on
                    the platform.
                  </p>
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
  );
}
