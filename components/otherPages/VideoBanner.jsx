"use client";
import React, { useState } from "react";
import Image from "next/image";
import ModalVideo from "../common/ModalVideo";
export default function VideoBanner() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="section-video tf-spacing-1">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="widget-video">
                <div className="img">
                  <Image
                    className="lazyload"
                    data-src="/images/section/wg-video.png"
                    alt=""
                    src="/images/section/wg-video.png"
                    width={1110}
                    height={624}
                  />
                </div>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                  }}
                  className="popup-youtube"
                >
                  <div className="icon">
                    <i className="icon-play" />
                    <div className="wave" />
                    <div className="wave-1" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <ModalVideo
        isOpen={isOpen}
        videoId={"MLpWrANjFbI"}
        setIsOpen={setIsOpen}
      />{" "}
    </>
  );
}
