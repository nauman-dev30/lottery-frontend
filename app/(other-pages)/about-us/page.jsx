import Breadcumb from "@/components/common/Breadcumb";
import Facts from "@/components/common/Facts";
import Steps from "@/components/common/Steps";
import Cta from "@/components/common/Cta";

import About from "@/components/otherPages/About";
import Features from "@/components/otherPages/Features";
import History from "@/components/otherPages/History";
import Mission from "@/components/otherPages/Mission";
import React from "react";

export const metadata = {
  title: "About Us || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Breadcumb title="About the Tronado Lottery" pageName="About us" />
      <div className="main-content">
        <About />
        <Steps parentClass="s-how-it-work" />
        <Facts parentClass="s-succes-story tf-spacing-2" />
        <Features />
        <Mission />
        <History />
        {/* <Cta /> */}
      </div>
    </>
  );
}
