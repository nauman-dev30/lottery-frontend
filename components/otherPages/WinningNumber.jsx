import React from "react";
import Link from "next/link";
export default function WinningNumber() {
  return (
    <section className="winning-number tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          {/* winning-number */}
          <div className="col-12">
            <div className="winning-number bg-multi-color">
              <div className="heading-section">
                <div className="title wow fadeInUp">The Breeze Zodiac IX</div>
                <p className="wow fadeInUp" data-wow-delay="0.1s">
                  Draw took place on : <span>Saturday May 20, 2023</span>
                </p>
              </div>
              <div className="content">
                <div className="title">Latest bigest Winning Numbers:</div>
                <ul className="list-number">
                  <li>54</li>
                  <li>06</li>
                  <li>19</li>
                  <li>32</li>
                  <li>81</li>
                  <li>42</li>
                  <li>10</li>
                </ul>
                <div className="button">
                  <a className="tf-btn" href="#">
                    Alerts
                  </a>
                  <Link className="tf-btn style-3" href={`/faq`}>
                    How to claim
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* /winning-number */}
        </div>
      </div>
    </section>
  );
}
