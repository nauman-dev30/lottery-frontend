import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";

import AffiliatePartners from "@/components/otherPages/AffiliatePartners";
import Brands from "@/components/otherPages/Brands";
import Members from "@/components/otherPages/Members";
import Process from "@/components/otherPages/Process";
import React from "react";

export const metadata = {
  title: "Affiliate || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Breadcumb title="Become an affiliate" pageName="Winner" />
      <div className="main-content">
        <Process />
        <Brands />
        <AffiliatePartners />
        <Members />
        {/* <Cta /> */}
      </div>
    </>
  );
}
