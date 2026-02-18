import Header1 from "@/components/headers/Header1";
import Faqs from "@/components/common/Faqs";
import Contests from "@/components/homes/home-2/Contests";
import Contests2 from "@/components/homes/home-2/Contests2";
import Facts from "@/components/homes/home-2/Facts";
import Hero from "@/components/homes/home-2/Hero";
import LotteryResults from "@/components/common/LotteryResults";
import Process from "@/components/homes/home-2/Process";
import ScratchCards from "@/components/homes/home-2/ScratchCards";
import Testimonials from "@/components/homes/home-2/Testimonials";
import React from "react";
import CustomerSupport from "@/components/common/CustomerSupport";
import Footer1 from "@/components/footers/Footer1";

export const metadata = {
  title: "Home 02 || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Header1 />
      <Hero />
      <div className="main-content">
        <Contests />
        <ScratchCards />
        <Contests2 />
        <LotteryResults />
        <Process />
        <Facts />
        <Testimonials />
        <Faqs />
        <CustomerSupport />
      </div>
      <Footer1 />
    </>
  );
}
