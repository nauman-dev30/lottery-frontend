import React from "react";
import Image from "next/image";
import CountdownTimer from "@/components/common/Countdown";
import Link from "next/link";
export default function Banner() {
  return (
    <section className="section-cta tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="section-cta-inner">
              <div className="cta-content ">
                <br></br>

                <p className="text-color-clip style-2 ">Ready to Win Big?</p>
                <br></br>

                <div className="text">
                  Join thousands of players who are already winning with the
                  most transparent and fair lottery platform on blockchain. Your
                  next big win is just one click away!
                </div>
              </div>
              <div className="cta-middle">
                <div className="icon">
                  <Image
                    src="/images/icon/cta-item-1.png"
                    alt=""
                    className="lazyload"
                    width={208}
                    height={172}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
