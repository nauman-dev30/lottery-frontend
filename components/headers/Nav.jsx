"use client";
import { menuItems } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Nav() {
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
        <li
          key={index}
          className={`${item.subMenu ? "has-child" : ""} ${
            item.subMenu
              ? isMenuParentActive(item.subMenu)
                ? "current-menu-item"
                : ""
              : isMenuActive(item)
              ? "current-menu-item"
              : ""
          } `}
        >
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <>
              <a href="#">{item.label}</a>
              {item.subMenu && (
                <ul className="sub-menu">
                  {item.subMenu.map((sub, subIndex) => (
                    <li
                      key={subIndex}
                      className={isMenuActive(sub) ? "current-item" : ""}
                    >
                      <Link href={sub.href}>{sub.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </li>
      ))}
    </>
  );
}
