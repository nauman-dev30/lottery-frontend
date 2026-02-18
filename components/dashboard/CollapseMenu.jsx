"use client";

export default function CollapseMenu() {
  return (
    <div
      className="button-collapse-menu"
      onClick={() => {
        document.querySelector(".layout-wrap")?.classList.add("active");
        document.querySelector(".mobile-button")?.classList.add("active");
        document.querySelector(".section-menu-left")?.classList.add("active");
        document
          .querySelector(".section-menu-left-mobile")
          ?.classList.add("active");
      }}
    >
      <i className="icon-collapse" />
      Collapse
    </div>
  );
}
