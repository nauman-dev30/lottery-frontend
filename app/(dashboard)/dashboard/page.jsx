import Cta from "@/components/common/Cta";
import LotteryResults from "@/components/common/LotteryResults";
import ContestSlider from "@/components/dashboard/ContestSlider";
import ContestsSlider2 from "@/components/dashboard/ContestsSlider2";
import CurrentContest from "@/components/dashboard/CurrentContest";
import DashboardData from "@/components/dashboard/DashboardData";
import Footer1 from "@/components/footers/Footer1";
import React from "react";

export const metadata = {
  title: "Dashboard || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div className="main-content-dashboard gap80">
        {/* <ContestSlider /> */}
        <DashboardData />
        {/* <ContestsSlider2 /> */}
        {/* <LotteryResults parentClass="section-lottery-results" /> */}
        {/* <Cta /> */}
        {/* footer */}
        <Footer1 />
      </div>
    </>
  );
}
