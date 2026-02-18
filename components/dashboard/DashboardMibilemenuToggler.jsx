"use client";

export default function DashboardMibilemenuToggler() {
  return (
    <div
      className="button-show-hide"
      onClick={() => {
        document.querySelector(".layout-wrap")?.classList.toggle("active");
        document.querySelector(".mobile-button")?.classList.toggle("active");
        document
          .querySelector(".section-menu-left")
          ?.classList.toggle("active");
        document
          .querySelector(".section-menu-left-mobile")
          ?.classList.toggle("active");
      }}
    >
      <div className="mobile-button">
        <span />
      </div>
    </div>
  );
}
