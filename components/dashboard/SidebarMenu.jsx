"use client";
import { dashboardMenuItems } from "@/data/menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";

export default function SidebarMenu() {
  const [childrenActiveIndex, setChildrenActiveIndex] = useState(-1);
  const pathname = usePathname();

  // 1. Get the connected user's address from wagmi
  const { address } = useAccount();

  // 2. Get the owner's address from the Redux store
  const ownerAddress = useSelector((state) => state.trdoLottery.ownerAddress);

  // 3. Filter menu items based on admin status and user address
  // useMemo is used for optimization, so the list is not re-filtered on every render
  const visibleMenuItems = useMemo(() => {
    const isAdmin =
      address &&
      ownerAddress &&
      address.toLowerCase() === ownerAddress.toLowerCase();

    return dashboardMenuItems
      .map((item) => {
        // 1. Check if the top-level item itself is an admin page and user is not admin
        if (item.adminPage && !isAdmin) {
          return null;
        }

        // 2. If it has a submenu, filter that too
        if (item.subMenu) {
          const filteredSubMenu = item.subMenu.filter((sub) => {
            if (sub.adminPage && !isAdmin) {
              return false;
            }
            return true;
          });
          // Return a new object with the filtered submenu
          return { ...item, subMenu: filteredSubMenu };
        }

        return item;
      })
      .filter((item) => item !== null); // Remove top-level items that were hidden
  }, [address, ownerAddress]); // Re-filter only when address or ownerAddress changes

  const isMenuActive = (link) => {
    // A small fix to handle the root dashboard route correctly
    if (link.href === "/dashboard" && pathname !== "/dashboard") {
      return false;
    }
    return pathname.startsWith(link.href);
  };

  return (
    <ul className="menu-list">
      {/* 4. Map over the filtered list instead of the original one */}
      {visibleMenuItems.map((item, index) => (
        <li
          key={index}
          className={`menu-item ${isMenuActive(item) ? "active" : ""} ${item.hasChildren ? "has-children" : ""
            } ${childrenActiveIndex == index ? "active" : ""} `}
          onClick={() => {
            if (item.hasChildren) {
              setChildrenActiveIndex((pre) => (pre == index ? -1 : index));
            }
          }}
        >
          {item.hasChildren ? (
            <>
              <a href="#" className="menu-item-button">
                <div className="icon">
                  <i className={item.icon} />
                </div>
                <div className="text">{item.label}</div>
              </a>
              <ul
                className="sub-menu"
                style={childrenActiveIndex == index ? { display: "block" } : {}}
              >
                {item.subMenu?.map((sub, subIndex) => (
                  <li
                    className={`sub-menu-item  ${pathname === sub.href ? "sub-current" : ""
                      }`}
                    key={subIndex}
                  >
                    <Link href={sub.href}>
                      <div className="icon">
                        <i className={sub.icon} />
                      </div>
                      <div className="text">{sub.label}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link href={item.href} className="menu-item-button">
              <div className="icon">
                <i className={item.icon} />
              </div>
              <div className="text">{item.label}</div>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
