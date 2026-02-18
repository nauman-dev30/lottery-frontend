import Cta from "@/components/common/Cta";
import ContestsSlider2 from "@/components/dashboard/ContestsSlider2";
import Footer1 from "@/components/footers/Footer1";
import React from "react";

export const metadata = {
  title:
    "Dashboard Scratch Offs || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      {" "}
      <div className="main-content-dashboard gap80">
        {" "}
        <ContestsSlider2 /> {/* <Cta /> */}
        {/* footer */}
        <Footer1 />
      </div>
    </>
  );
}
