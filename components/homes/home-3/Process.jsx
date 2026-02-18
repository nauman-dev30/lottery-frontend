import { getStartedItems } from "@/data/process";
import React from "react";
import Image from "next/image";
export default function Process() {
  return (
    <section className="s-get-started tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section mb-40">
              <h1 className="title fw-9 fs-50 mb-3">How to get started</h1>
              <p className="sub-title fw-4 fs-14">
                Follow these 33 easy steps!
              </p>
            </div>
          </div>
          {getStartedItems.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div
                className={`getstart-item style-2 ${item.colorClass} wow fadeInUp`}
                data-wow-delay={item.delay}
              >
                <div className="wrapper hover-item">
                  <div className="wrap-image image-item">
                    <Image alt="" src={item.image} width={150} height={150} />
                  </div>
                  <div className="content">
                    <div
                      className="title mb-5"
                      dangerouslySetInnerHTML={{
                        __html: `<a href="#">${item.title}</a>`,
                      }}
                    />
                    <p dangerouslySetInnerHTML={{ __html: item.description }} />
                  </div>
                </div>
                <p className="number text-color-clip style-4">{item.number}</p>
              </div>
            </div>
          ))}
          <div className="col-lg-12">
            <div className="bot">
              <h4 className="title-bot fw-9 mb-6">
                Play Responsibly, Play for Fun
              </h4>
              <p className="sub type-secondary mb-20 fs-14">
                Set limits, take breaks, lock games. We have a variety of tools
                to help you play safely.
              </p>
              <a href="#" className="tf-btn">
                Learn more <i className="icon-right" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
