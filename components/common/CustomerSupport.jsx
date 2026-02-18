import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function CustomerSupport() {
  return (
    <section className="section-support">
      <div className="tf-container">
        <div className="row">
          <div className="heading-section">
            <div className="title">Customers Support</div>
            <p>
              Have a question or need help? Contact our friendly support team.
            </p>
          </div>
          <div className="col-md-6">
            <div
              className="customer-support-item wow fadeInUp"
              data-wow-delay="0s"
            >
              <div className="icon">
                <Image
                  src="/images/icon/customer-support-item-icon-1.png"
                  alt=""
                  className="lazyload"
                  width={300}
                  height={300}
                />
              </div>
              <div className="customer-support-item-content">
                <h4 className="title">Talk to our support team</h4>
                <div className="customer-support-item-text">
                  Got a question about Lotteries? Get in touch with our friendly
                  staff.
                </div>
                <div className="btn-customer-support-item">
                  <Link href={`/contact`} className="tf-btn">
                    Contact us <i className="icon-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="customer-support-item wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="icon">
                <Image
                  src="/images/icon/customer-support-item-icon-2.png"
                  alt=""
                  className="lazyload"
                  width={300}
                  height={300}
                />
              </div>
              <div className="customer-support-item-content">
                <h4 className="title">Our Guide to Tronado.</h4>
                <div className="customer-support-item-text">
                  Check out our FAQ section to see if we can provide the
                  information you need.
                </div>
                <div className="btn-customer-support-item">
                  <Link href={`/faq`} className="tf-btn">
                    Help center
                    <i className="icon-right" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
