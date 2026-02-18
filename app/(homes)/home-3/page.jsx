import Header2 from "@/components/headers/Header2";
import Topbar from "@/components/headers/Topbar";
import Contests from "@/components/homes/home-3/Contests";
import Contests2 from "@/components/homes/home-3/Contests2";
import Tips from "@/components/homes/home-3/Tips";
import Hero from "@/components/homes/home-3/Hero";
import Process from "@/components/homes/home-3/Process";
import Winners from "@/components/homes/home-3/Winners";
import React from "react";
import Contests3 from "@/components/homes/home-3/Contests3";
import Cta from "@/components/common/Cta";
import Footer1 from "@/components/footers/Footer1";

export const metadata = {
  title: "Home 03 || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Topbar />
      <Header2 />
      <Hero />
      <div className="main-content">
        <Contests />
        <Contests2 />
        <Process />
        <Winners />
        <Tips />
        <Contests3 />
        {/* <Cta /> */}
      </div>
      <Footer1 />
    </>
  );
}
