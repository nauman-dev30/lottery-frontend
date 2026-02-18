"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function Descriptions() {
  const tabItems = ["Description", "Contest details"];
  const [activeTab, setActiveTab] = useState("Description"); // default active

  return (
    <div className="description-page">
      <div className="widget-tabs">
        <ul className="widget-menu-tab overflow-x-auto">
          {tabItems.map((item) => (
            <li
              key={item}
              className={`item-title ${activeTab === item ? "active" : ""}`}
              onClick={() => setActiveTab(item)}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="widget-content-tab">
          <div
            className="widget-content-inner active"
            style={
              activeTab == "Description"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <p className="caption">Award overview</p>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in
              posuere ligula. Duis purus nisl, aliquet eget est vitae, cursus
              posuere mi. Nulla felis ipsum, sodales at risus et, condimentum
              hendrerit eros. Vivamus a gravida mauris, quis venenatis leo. Duis
              mattis sem quis metus euismod vulputate. Cras est lacus, laoreet
              sit amet interdum ac, tempus vel nisi. Mauris cursus nec tellus
              quis varius. Duis ultricies vestibulum dapibus. Vestibulum feugiat
              elit sed nunc viverra, ac commodo diam molestie. Nam eu efficitur
              mi. Aliquam iaculis nunc at leo elementum pharetra. Nulla sapien
              augue, pellentesque quis sapien tempor, feugiat scelerisque arcu.
              Donec condimentum a orci sit amet euismod. Integer mattis neque
              non risus ultricies, non pharetra diam pharetra. Ut consequat
              justo eu nunc sagittis, ut ornare tortor facilisis. Pellentesque
              tortor ligula, consequat nec nunc a
            </p>
            <div className="image-item">
              <div
                className="image-tab wow fadeInUp animated"
                data-wow-delay="0s"
                style={{
                  visibility: "visible",
                  animationDelay: "0s",
                  animationName: "fadeInUp",
                }}
              >
                <Image
                  alt=""
                  src="/images/section/contest-details-1.png"
                  width={495}
                  height={473}
                />
              </div>
              <div
                className="image-tab wow fadeInUp animated"
                data-wow-delay="0.1s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.1s",
                  animationName: "fadeInUp",
                }}
              >
                <Image
                  alt=""
                  src="/images/section/contest-details-2.png"
                  width={495}
                  height={473}
                />
              </div>
              <div
                className="image-tab wow fadeInUp animated"
                data-wow-delay="0.2s"
                style={{
                  visibility: "visible",
                  animationDelay: "0.2s",
                  animationName: "fadeInUp",
                }}
              >
                <Image
                  alt=""
                  src="/images/section/contest-details-3.png"
                  width={495}
                  height={473}
                />
              </div>
            </div>
            <p className="caption">Specifications</p>
            <p className="text">
              Mauris cursus nec tellus quis varius. Duis ultricies vestibulum
              dapibus. Vestibulum feugiat elit sed nunc viverra, ac commodo diam
              molestie. Nam eu efficitur mi. Aliquam iaculis nunc at leo
              elementum pharetra. Nulla sapien augue, pellentesque quis sapien
              tempor, feugiat scelerisque arcu. Donec condimentum a orci sit
              amet euismod. Integer mattis neque non risus ultricies, non
              pharetra diam pharetra. Ut consequat justo eu nunc sagittis, ut
              ornare tortor facilisis. Pellentesque tortor ligula, consequat nec
              nunc a
            </p>
            <ul
              className="box-icon-list overflow-x-auto wow fadeInUp animated"
              data-wow-delay="0s"
              style={{
                visibility: "visible",
                animationDelay: "0s",
                animationName: "fadeInUp",
              }}
            >
              <li className="item">
                <div className="box-icon style-3">
                  <div className="image">
                    <Image
                      src="/images/icon/icon-box-style-3-1.png"
                      alt=""
                      className="lazyload"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text">
                    <span>Transmission</span>
                    <p>AT (CTV) MT</p>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="box-icon style-3">
                  <div className="image">
                    <Image
                      src="/images/icon/icon-box-style-3-2.png"
                      alt=""
                      className="lazyload"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text">
                    <span>Seat</span>
                    <p>5</p>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="box-icon style-3">
                  <div className="image">
                    <Image
                      src="/images/icon/icon-box-style-3-3.png"
                      alt=""
                      className="lazyload"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text">
                    <span>Engine</span>
                    <p>1.2L</p>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="box-icon style-3">
                  <div className="image">
                    <Image
                      src="/images/icon/icon-box-style-3-4.png"
                      alt=""
                      className="lazyload"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text">
                    <span>Max Power</span>
                    <p>89HP</p>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="box-icon style-3">
                  <div className="image">
                    <Image
                      src="/images/icon/icon-box-style-3-5.png"
                      alt=""
                      className="lazyload"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text">
                    <span>Max Torque</span>
                    <p>110 Nm</p>
                  </div>
                </div>
              </li>
            </ul>
            <p className="text">
              Integer mattis neque non risus ultricies, non pharetra diam
              pharetra. Ut consequat justo eu nunc sagittis, ut ornare tortor
              facilisis. Pellentesque tortor ligula, consequat nec nunc a
            </p>
          </div>
          <div
            className="widget-content-inner active"
            style={
              activeTab == "Contest details"
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <p className="caption">Award overview</p>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc in
              posuere ligula. Duis purus nisl, aliquet eget est vitae, cursus
              posuere mi. Nulla felis ipsum, sodales at risus et, condimentum
              hendrerit eros. Vivamus a gravida mauris, quis venenatis leo. Duis
              mattis sem quis metus euismod vulputate. Cras est lacus, laoreet
              sit amet interdum ac, tempus vel nisi. Mauris cursus nec tellus
              quis varius. Duis ultricies vestibulum dapibus. Vestibulum feugiat
              elit sed nunc viverra, ac commodo diam molestie. Nam eu efficitur
              mi. Aliquam iaculis nunc at leo elementum pharetra. Nulla sapien
              augue, pellentesque quis sapien tempor, feugiat scelerisque arcu.
              Donec condimentum a orci sit amet euismod. Integer mattis neque
              non risus ultricies, non pharetra diam pharetra. Ut consequat
              justo eu nunc sagittis, ut ornare tortor facilisis. Pellentesque
              tortor ligula, consequat nec nunc a
            </p>
            <div className="image-item">
              <div className="image-tab">
                <Image
                  alt=""
                  src="/images/section/contest-details-1.png"
                  width={495}
                  height={473}
                />
              </div>
              <div className="image-tab">
                <Image
                  alt=""
                  src="/images/section/contest-details-2.png"
                  width={495}
                  height={473}
                />
              </div>
              <div className="image-tab">
                <Image
                  alt=""
                  src="/images/section/contest-details-3.png"
                  width={495}
                  height={473}
                />
              </div>
            </div>
            <p className="caption">Specifications</p>
            <p className="text">
              Mauris cursus nec tellus quis varius. Duis ultricies vestibulum
              dapibus. Vestibulum feugiat elit sed nunc viverra, ac commodo diam
              molestie. Nam eu efficitur mi. Aliquam iaculis nunc at leo
              elementum pharetra. Nulla sapien augue, pellentesque quis sapien
              tempor, feugiat scelerisque arcu. Donec condimentum a orci sit
              amet euismod. Integer mattis neque non risus ultricies, non
              pharetra diam pharetra. Ut consequat justo eu nunc sagittis, ut
              ornare tortor facilisis. Pellentesque tortor ligula, consequat nec
              nunc a
            </p>
            <ul className="box-icon-list overflow-x-auto">
              <li className="item">
                <div className="box-icon style-3">
                  <div className="image">
                    <Image
                      src="/images/icon/icon-box-style-3-1.png"
                      alt=""
                      className="lazyload"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text">
                    <span>Transmission</span>
                    <p>AT (CTV) MT</p>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="box-icon style-3">
                  <div className="image">
                    <Image
                      src="/images/icon/icon-box-style-3-2.png"
                      alt=""
                      className="lazyload"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text">
                    <span>Seat</span>
                    <p>5</p>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="box-icon style-3">
                  <div className="image">
                    <Image
                      src="/images/icon/icon-box-style-3-3.png"
                      alt=""
                      className="lazyload"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text">
                    <span>Engine</span>
                    <p>1.2L</p>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="box-icon style-3">
                  <div className="image">
                    <Image
                      src="/images/icon/icon-box-style-3-4.png"
                      alt=""
                      className="lazyload"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text">
                    <span>Max Power</span>
                    <p>89HP</p>
                  </div>
                </div>
              </li>
              <li className="item">
                <div className="box-icon style-3">
                  <div className="image">
                    <Image
                      src="/images/icon/icon-box-style-3-5.png"
                      alt=""
                      className="lazyload"
                      width={160}
                      height={160}
                    />
                  </div>
                  <div className="text">
                    <span>Max Torque</span>
                    <p>110 Nm</p>
                  </div>
                </div>
              </li>
            </ul>
            <p className="text">
              Integer mattis neque non risus ultricies, non pharetra diam
              pharetra. Ut consequat justo eu nunc sagittis, ut ornare tortor
              facilisis. Pellentesque tortor ligula, consequat nec nunc a
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
