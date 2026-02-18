import React from "react";
import Image from "next/image";
import { historyData } from "@/data/historyData";
export default function History() {
  return (
    <section className="s-our-history tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section wow fadeInUp" data-wow-delay="0s">
              <h2 className="title">Our history</h2>
              <p className="sub-title fs-14">Over 3 decades of fun</p>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="history-main">
              {historyData.map((item, index) => (
                <div
                  key={index}
                  className={`box-history ${item.style} ${item.extraClass}`}
                >
                  <p className="year wow fadeInUp" data-wow-delay={item.delay}>
                    {item.year}
                  </p>
                  <div className="content-history hover-img">
                    <h4 className="title">
                      <a href="#">{item.title}</a>
                    </h4>
                    <p className="text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus pretium fringilla fringilla. Integer facilisis
                      porta lorem, nec vestibulum arcu posuere vel.
                    </p>
                    <div className="image image-wrap">
                      <Image
                        className="lazyload"
                        data-src={item.image}
                        src={item.image}
                        alt=""
                        width={880}
                        height={496}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
