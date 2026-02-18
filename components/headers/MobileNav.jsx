"use client";
import React, { useState } from "react";
import Link from "next/link";
import { menuItems } from "@/data/menu";
import { usePathname } from "next/navigation";
export default function MobileNav() {
  const [activeDD, setActiveDD] = useState(-1);
  const pathname = usePathname();
  const isMenuActive = (link) => {
    return link.href?.split("/")[1] == pathname.split("/")[1];
  };
  const isMenuParentActive = (menu) => {
    return menu.some((elm) => isMenuActive(elm));
  };
  return (
    <>
      {" "}
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`menu-item ${
            item.subMenu ? "menu-item-has-children-mobile" : ""
          }  ${
            item.subMenu
              ? isMenuParentActive(item.subMenu)
                ? "current-menu-item"
                : ""
              : isMenuActive(item)
              ? "current-menu-item"
              : ""
          } ${activeDD == index ? "active" : ""}`}
          onClick={() => {
            if (item.subMenu) {
              setActiveDD((pre) => (pre == index ? -1 : index));
            }
          }}
        >
          {item.subMenu ? (
            <>
              <a className="item-menu-mobile" href="#">
                {item.label}
              </a>
              <ul
                className="sub-menu-mobile"
                style={activeDD == index ? { display: "block" } : {}}
              >
                {item.subMenu.map((sub, i) => (
                  <li
                    key={i}
                    className={`menu-item ${
                      isMenuActive(sub) ? "current-item" : ""
                    } `}
                  >
                    <Link href={sub.href}>{sub.label}</Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link className="item-menu-mobile" href={item.href}>
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </>
  );
}
