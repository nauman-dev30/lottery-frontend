"use client";

export default function ExpandToggler() {
  return (
    <div
      onClick={() => {
        document.querySelector(".layout-wrap")?.classList.remove("active");
        document.querySelector(".mobile-button")?.classList.remove("active");
        document
          .querySelector(".section-menu-left")
          ?.classList.remove("active");
        document
          .querySelector(".section-menu-left-mobile")
          ?.classList.remove("active");
      }}
      className="button-collapse-menu"
    >
      <i className="icon-log-out" />
    </div>
  );
}
