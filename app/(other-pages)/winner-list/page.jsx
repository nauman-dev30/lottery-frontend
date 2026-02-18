import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";
import Winners from "@/components/common/Winners";

import WinningNumber from "@/components/otherPages/WinningNumber";
import React from "react";

export const metadata = {
  title:
    "Winner List || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Breadcumb title="Winner list" pageName="Winner" />
      <div className="main-content">
        <WinningNumber />
        <Winners parentClass="s-lastest-winner page-winner-list tf-spacing-1" />
        {/* <Cta /> */}
      </div>
    </>
  );
}
