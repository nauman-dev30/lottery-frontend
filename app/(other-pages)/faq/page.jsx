import Breadcumb from "@/components/common/Breadcumb";

import Faqs from "@/components/otherPages/Faqs";
import FaqSearch from "@/components/otherPages/FaqSearch";
import React from "react";

export const metadata = {
  title: "Faq || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Breadcumb title="Frequently asked questions" pageName="FAQ" />
      <div className="main-content">
        <FaqSearch />
        <Faqs />
      </div>
    </>
  );
}
