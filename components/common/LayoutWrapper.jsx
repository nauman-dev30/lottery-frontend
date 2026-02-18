"use client";

import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Import the script only on the client side
      import("bootstrap/dist/js/bootstrap.esm").then(() => {
        // Module is imported, you can access any exported functionality if
      });
    }
  }, []);
  useEffect(() => {
    const header = document.querySelector("header");

    if (header && header.classList.contains("header-fixed")) {
      const nav = document.getElementById("header-main");

      if (nav) {
        const offsetTop = nav.offsetTop;
        const headerHeight = nav.offsetHeight;

        const injectSpace = document.createElement("div");
        injectSpace.style.height = `${headerHeight}px`;
        injectSpace.style.display = "none";

        if (!header.classList.contains("style-absolute")) {
          nav.parentNode.insertBefore(injectSpace, nav.nextSibling);
        }

        const onScroll = () => {
          const scrollTop = window.scrollY;

          if (scrollTop > offsetTop + headerHeight) {
            nav.classList.add("is-fixed");
          } else {
            nav.classList.remove("is-fixed");
          }

          if (scrollTop > 300) {
            nav.classList.add("is-small");
          } else {
            nav.classList.remove("is-small");
          }
        };

        window.addEventListener("load", onScroll);
        window.addEventListener("scroll", onScroll);

        // Cleanup
        return () => {
          window.removeEventListener("load", onScroll);
          window.removeEventListener("scroll", onScroll);
        };
      }
    }
  }, [pathname]);

  useEffect(() => {
    const WOW = require("@/utils/wow");
    const wow = new WOW.default({
      mobile: false,
      live: false,
    });
    wow.init();
  }, [pathname]);
  useEffect(() => {
    // Dynamically import Bootstrap
    import("bootstrap")
      .then((bootstrap) => {
        // Close any open modal
        const modalElements = document.querySelectorAll(".modal.show");
        modalElements.forEach((modal) => {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        });

        // Close any open offcanvas
        const offcanvasElements = document.querySelectorAll(".offcanvas.show");
        offcanvasElements.forEach((offcanvas) => {
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
          if (offcanvasInstance) {
            offcanvasInstance.hide();
          }
        });
      })
      .catch((error) => {
        console.error("Error loading Bootstrap:", error);
      });
  }, [pathname]); // Runs every time the route changes

  return <>{children}</>;
}
