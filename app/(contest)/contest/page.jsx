import Categories from "@/components/contests/Categories";
import Cta from "@/components/common/Cta";

import Steps from "@/components/common/Steps";

import React from "react";
import Breadcumb from "@/components/common/Breadcumb2";

export const metadata = {
  title: "Contest || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Breadcumb pageName="Contest" title="Contest" />
      <div className="main-content">
        <Categories />
        <Steps />
        {/* <Cta /> */}
      </div>
    </>
  );
}
