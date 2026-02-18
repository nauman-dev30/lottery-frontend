import React from "react";
import Image from "next/image";
import Link from "next/link";
import GoogleTranslate from "../common/GoogleTranslate";
export default function Footer1() {
  return (
    <footer id="footer">
      {/* <div className="footer-main">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg- col-sm-6">
              <div className="widget-footer">
                <div className="widget-title">Tronado Lottery</div>
                <ul>
                  <li>
                    <Link href={`/about-us`}>About us</Link>
                  </li>
                  <li>
                    <Link href={`/blog-list`}>Latest News</Link>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">Scratch Cards</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5 col-sm-6">
              <div className="widget-footer help">
                <div className="widget-title">How can we help?</div>
                <Link className="tf-btn" href={`/contact`}>
                  Contact us <i className="icon-right" />
                </Link>
                <p>
                  If you can’t find answer to your question, fill your query
                  &amp; submit, or you can always contact us. We answer to you
                  shortly
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="widget-footer dowload-app">
                <div className="bottom">
                  <div className="widget-title">Find us</div>
                  <br />
                  <ul className="tf-social">
                    <li>
                      <a href="#">
                        <i className="icon-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-tiktok" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-youtube" />
                      </a>
                    </li>
                  </ul>
                </div>
                <br />
                <br />
                <p>
                  If you can’t find answer to your question, fill your query
                  &amp; submit, or you can always contact us. We answer to you
                  shortly
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="footer-bottom">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="wrapper">
                <div className="left">
                  <div className="icon">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 17.5C11.6625 17.4999 13.2779 16.9477 14.5925 15.93C15.9072 14.9124 16.8466 13.4869 17.2633 11.8775M10 17.5C8.33751 17.4999 6.72212 16.9477 5.40748 15.93C4.09284 14.9124 3.1534 13.4869 2.73667 11.8775M10 17.5C12.0708 17.5 13.75 14.1417 13.75 10C13.75 5.85833 12.0708 2.5 10 2.5M10 17.5C7.92917 17.5 6.25 14.1417 6.25 10C6.25 5.85833 7.92917 2.5 10 2.5M17.2633 11.8775C17.4175 11.2775 17.5 10.6483 17.5 10C17.5021 8.71009 17.1699 7.44166 16.5358 6.31833M17.2633 11.8775C15.041 13.1095 12.541 13.754 10 13.75C7.365 13.75 4.88917 13.0708 2.73667 11.8775M2.73667 11.8775C2.57896 11.2641 2.49944 10.6333 2.5 10C2.5 8.6625 2.85 7.40583 3.46417 6.31833M10 2.5C11.3302 2.49945 12.6366 2.8528 13.7852 3.5238C14.9337 4.19481 15.8831 5.15931 16.5358 6.31833M10 2.5C8.6698 2.49945 7.3634 2.8528 6.21484 3.5238C5.06628 4.19481 4.11692 5.15931 3.46417 6.31833M16.5358 6.31833C14.7214 7.88994 12.4004 8.75345 10 8.75C7.50167 8.75 5.21667 7.83333 3.46417 6.31833"
                        stroke="#7791BA"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <GoogleTranslate />
                </div>
                <div className="center">
                  <ul>
                    <li>
                      <a href="#">Cookie Policy</a>
                    </li>
                    <li>
                      <a href="#">Data Privacy Statement</a>
                    </li>
                    <li>
                      <a href="#">Terms &amp; Conditions</a>
                    </li>
                  </ul>
                </div>
                <div className="right">
                  <span>{new Date().getFullYear()} Tronadoo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
