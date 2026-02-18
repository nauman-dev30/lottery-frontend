import React from "react";
import ExpandToggler from "./ExpandToggler";
import { dashboardMenuItems } from "@/data/menu";
import Link from "next/link";

export default function DashboardMobileMenu() {
  return (
    <div
      className="section-menu-left-mobile active"
      id="section-menu-left-mobile"
    >
      <ul className="menu-list">
        {dashboardMenuItems.map((item, index) => {
          const dropdownId = `dropdownMenuButtonmobile${index + 1}`;
          return (
            <li
              className={`menu-item ${item.hasChildren ? "has-children" : ""}`}
              key={index}
            >
              <div className="dropdown dropend">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id={dropdownId}
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="icon">
                    <i className={item.icon}></i>
                  </span>
                </button>

                <ul className="dropdown-menu" aria-labelledby={dropdownId}>
                  {item.hasChildren ? (
                    <>
                      <li>
                        <div className="title-sub">{item.label}</div>
                      </li>
                      {item.subMenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link href={subItem.href} className="">
                            <div className="text">
                              <i className={subItem.icon}></i> {subItem.label}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </>
                  ) : (
                    <li>
                      <Link href={item.href} className="">
                        <div className="text">{item.label}</div>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          );
        })}
        <li className="menu-item has-children">
          <div className="dropdown dropend">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButtonmobile8"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="icon">
                <i className="icon-facebook" />
              </span>
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButtonmobile8"
              style={{}}
            >
              <li>
                <div className="title-sub">SOCIALS</div>
              </li>
              <li>
                <ul className="tf-social style-1 flex-wrap">
                  <li>
                    <a href="#">
                      <i className="icon-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-send" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-linkedin2" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-youtube" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-tiktok" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="icon-skype" />
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
        <li className="menu-item has-children faq">
          <div className="dropdown dropend">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButtonmobile9"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="icon">
                <i className="icon-faq" />
              </span>
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="dropdownMenuButtonmobile9"
              style={{}}
            >
              <li>
                <div className="title-sub">FAQ</div>
              </li>
              <li>
                <a href="#" className="">
                  <div className="text">
                    <i className="icon-documentation" /> Documentation
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <div className="text">
                    <i className="icon-provably-fair" /> Provably fair
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="">
                  <div className="text">
                    <i className="icon-payment-proof" /> Payment proof
                  </div>
                </a>
              </li>
              <li>
                <Link href={`/contact`} className="">
                  <div className="text">
                    <i className="icon-contact-us" /> Contact Us
                  </div>
                </Link>
              </li>
              <li>
                <a href="#" className="">
                  <div className="text">
                    <i className="icon-live-support" /> Live Support
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="menu-item">
          <ExpandToggler />
        </li>
      </ul>
    </div>
  );
}
