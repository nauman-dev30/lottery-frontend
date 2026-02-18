import { tips } from "@/data/tips";
import React from "react";
import Image from "next/image";
export default function Tips() {
  return (
    <section className="s-play-for-fun tf-spacing-2">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="play-for-fun">
              <div className="heading-section mb-40">
                <h1 className="title mb-3">Play Responsibly, Play for Fun</h1>
                <p className="sub-title fs-14">
                  Set limits, take breaks, lock games. We have a variety of
                  tools to help you play safely.
                </p>
              </div>
              <div className="main-section">
                {tips.map((tip, index) => (
                  <div
                    key={index}
                    className="content hover-item wow fadeInUp"
                    data-wow-delay={tip.delay}
                  >
                    <div className="image image-item">
                      <Image alt="" src={tip.image} width={200} height={200} />
                    </div>
                    <div className="bot">
                      <h4 className="fw-9 mb-8">{tip.title}</h4>
                      <p
                        className="text type-secondary fs-14"
                        dangerouslySetInnerHTML={{ __html: tip.description }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
