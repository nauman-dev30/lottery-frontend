"use client";

export default function RightSidebarToggler() {
  return (
    <div
      className="button-sidebar-dashboard"
      onClick={() => {
        document
          .querySelector(".sidebar-dashboard")
          ?.classList.toggle("active");
      }}
    >
      <div className="icon">
        <i className="icon-infor-1" />
      </div>
    </div>
  );
}
