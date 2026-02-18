import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Faqs from "@/components/common/Faqs";

import Banner from "@/components/otherPages/Banner";
import Process2 from "@/components/otherPages/Process2";
import Steps from "@/components/otherPages/Steps";
import VideoBanner from "@/components/otherPages/VideoBanner";
import React from "react";

export const metadata = {
  title: "Process || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Breadcumb pageName="How to work" title="How to work" />
      <div className="main-content">
        <VideoBanner />
        <Steps />
        <Process2 />
        <Banner />
        <Faqs />
        {/* <Cta /> */}
      </div>
    </>
  );
}
