import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Steps({
  parentClass = "s-how-it-work page-contest tf-spacing-1",
}) {
  return (
    <section className={parentClass}>
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section mb-40">
              <h2 className="title mb-6 wow fadeInUp">How it works</h2>
              <p className="sub-title wow fadeInUp" data-wow-delay="0.1s">
                Follow these 3 easy steps!
              </p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="wg-how-it-work grid-column-3 gap-46-30">
              <div className="how-it-item hover-item">
                <div className="image-item">
                  <Image
                    alt=""
                    src="/images/item/how-it-work-1.png"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="content">
                  <h4 className="title fw-9">
                    <Link href={`/how-to-work`}>
                      Sign-up for a free account
                    </Link>
                  </h4>
                  <p className="text type-secondary fs-14">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                    nulla sit
                  </p>
                </div>
              </div>
              <div className="how-it-item hover-item">
                <div className="image-item">
                  <Image
                    alt=""
                    src="/images/item/how-it-work-2.png"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="content">
                  <h4 className="title fw-9">
                    <Link href={`/how-to-work`}>
                      Choose a lottery <br />
                      to play
                    </Link>
                  </h4>
                  <p className="text type-secondary fs-14">
                    Choose a lottery to play, pick your numbers, and
                    <a> order your tickets. </a>
                  </p>
                </div>
              </div>
              <div className="how-it-item hover-item">
                <div className="image-item">
                  <Image
                    alt=""
                    src="/images/item/how-it-work-3.png"
                    width={96}
                    height={96}
                  />
                </div>
                <div className="content">
                  <h4 className="title fw-9">
                    <Link href={`/how-to-work`}>
                      Buy <br />
                      official tickets
                    </Link>
                  </h4>
                  <p className="text type-secondary fs-14">
                    Our representatives will purchase official tickets on your
                    behalf.
                  </p>
                </div>
              </div>
              <div className="how-it-item hover-item">
                <div className="image-item">
                  <Image
                    alt=""
                    src="/images/item/how-it-work-4.png"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="content">
                  <h4 className="title fw-9">
                    <Link href={`/how-to-work`}> Lottery courier service</Link>
                  </h4>
                  <p className="text type-secondary fs-14">
                    Our lottery courier service lets you view your scanned
                    tickets online.
                  </p>
                </div>
              </div>
              <div className="how-it-item hover-item">
                <div className="image-item">
                  <Image
                    alt=""
                    src="/images/item/how-it-work-5.png"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="content">
                  <h4 className="title fw-9">
                    <Link href={`/how-to-work`}>Receive our notifications</Link>
                  </h4>
                  <p className="text type-secondary fs-14">
                    We will notify you by email or SMS when you win.
                  </p>
                </div>
              </div>
              <div className="how-it-item hover-item">
                <div className="image-item">
                  <Image
                    alt=""
                    src="/images/item/how-it-work-6.png"
                    width={128}
                    height={128}
                  />
                </div>
                <div className="content">
                  <h4 className="title fw-9">
                    <Link href={`/how-to-work`}>
                      Receive the winner's reward
                    </Link>
                  </h4>
                  <p className="text type-secondary fs-14">
                    Receive your full winnings, paid out 100% commission-free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
