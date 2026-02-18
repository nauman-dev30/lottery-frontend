import React from "react";
import Image from "next/image";
export default function Banner() {
  return (
    <section className="s-ticket-online tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ticket-online-wrap">
              <div className="content">
                <h4 className="title">Buy ticket lottery online</h4>
                <p className="sub-title">
                  Buy lottery tickets online for over 50 of the biggest
                  lotteries around the world offering huge
                </p>
                <a href="#" className="btn-buy tf-btn">
                  Buy now <i className="icon-right"> </i>
                </a>
              </div>
              <div className="image wow fadeInRight" data-wow-delay="0s">
                <Image
                  alt=""
                  src="/images/item/calender-section.png"
                  width={555}
                  height={283}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
