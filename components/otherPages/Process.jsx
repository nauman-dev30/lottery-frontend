import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Process() {
  return (
    <section className="s-how-it-work page-affiliate tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section">
              <h2 className="title mb-6 wow fadeInUp">How it works</h2>
              <p className="sub-title wow fadeInUp">
                Affiliate Program is our special feature for Customers and
                Partners to earn commission <br />
                percentages by inviting new players.
              </p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="grid-column-3">
              <div className="getstart-item style-2 color-4 wow fadeInUp hover-item">
                <div className="wrapper">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/getstart-item-4.png"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <Link href={`/how-to-work`}>Sign up</Link>
                    </div>
                    <p>
                      Yes! You can
                      <span>
                        &nbsp;buy lottery tickets for the biggest international
                        draws&nbsp;
                      </span>
                      from anywhere, anytime. We give you access to exciting
                      daily and weekly draws, all available online!
                    </p>
                  </div>
                </div>
                <p className="number text-color-clip style-4">01</p>
              </div>
              <div
                className="getstart-item style-2 color-8 wow fadeInUp hover-item"
                data-wow-delay="0.2s"
              >
                <div className="wrapper">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/getstart-item-5.png"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <Link href={`/how-to-work`}>Promote</Link>
                    </div>
                    <p>
                      Small prizes will be credited to your account, and when
                      you win big, we’ll arrange for you to claim your prize in
                      person. You’ll get all your winnings commission-free!
                    </p>
                  </div>
                </div>
                <p className="number text-color-clip style-4">02</p>
              </div>
              <div
                className="getstart-item style-2 color-9 wow fadeInUp hover-item"
                data-wow-delay="0.4s"
              >
                <div className="wrapper">
                  <div className="wrap-image">
                    <Image
                      alt=""
                      src="/images/section/getstart-item-6.png"
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className="content">
                    <div className="title">
                      <Link href={`/how-to-work`}>Earn</Link>
                    </div>
                    <p>
                      Your online play with us is&nbsp;completely safe, as our
                      satisfied customers can confirm. We safeguard your
                      personal details and account transactions, and guarantee
                      your privacy.
                    </p>
                  </div>
                </div>
                <p className="number text-color-clip style-4">03</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
