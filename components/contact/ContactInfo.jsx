import React from "react";
import Image from "next/image";
export default function ContactInfo() {
  return (
    <section className="s-contact-infor s-get-started tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="heading-section mb-40">
              {/* <h1 className="title fw-9 fs-50 mb-8">Contact info</h1>
              <p className="sub-title fw-4">Follow these 3 easy steps!</p> */}
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="getstart-item style-2 color-1 type-1 wow fadeInUp"
              data-wow-delay="0s"
            >
              <div className="wrapper hover-item">
                <div className="wrap-image image-item">
                  <Image
                    alt=""
                    src="/images/item/infor-call.png"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Phone</a>
                  </div>
                  <p className="text-1">Hotline: (319) 555-0115</p>
                  <p>Fax: (201) 555-0124</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="getstart-item style-2 color-3 type-1 wow fadeInUp"
              data-wow-delay="0.1s"
            >
              <div className="wrapper hover-item">
                <div className="wrap-image image-item">
                  <Image
                    alt=""
                    src="/images/item/infor-email.png"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Email</a>
                  </div>
                  <p className="text-2">Service: Tronado@support.com</p>
                  <p>Job: hr@Tronado.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className="getstart-item style-2 color-3 type-1 wow fadeInUp"
              data-wow-delay="0.2s"
            >
              <div className="wrapper hover-item">
                <div className="wrap-image image-item">
                  <Image
                    alt=""
                    src="/images/item/infor-address.png"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="content">
                  <div className="title">
                    <a href="#">Location</a>
                  </div>
                  <p>4517 Washington Ave. Manchester, Kentucky 39495</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="wg-social">
              <p className="caption fw-9 fs-20">Follow us on socials media</p>
              <ul className="list-social">
                <li className="item">
                  <a href="#" className="">
                    <i className="icon-facebook" />
                  </a>
                </li>
                <li className="item">
                  <a href="#" className="">
                    <i className="icon-twitter" />
                  </a>
                </li>
                <li className="item">
                  <a href="#" className="">
                    <i className="icon-tiktok" />
                  </a>
                </li>
                <li className="item">
                  <a href="#" className="">
                    <i className="icon-youtube" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
