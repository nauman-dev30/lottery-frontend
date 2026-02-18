import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";

import Results from "@/components/otherPages/Results";
import Winners from "@/components/otherPages/Winners";
import React from "react";

export const metadata = {
  title:
    "Lottery Results || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Breadcumb title="Lottery results" pageName="Lottery results" />
      <div className="main-content page-lottery-result">
        <Winners />
        <Results />
        {/* <Cta /> */}
      </div>
    </>
  );
}
