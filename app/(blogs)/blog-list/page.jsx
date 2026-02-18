import Blogs2 from "@/components/blogs/Blogs2";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";

import React from "react";

export const metadata = {
  title: "Blog List || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Breadcumb pageName="Blog list" title="Blog list" />
      <div className="main-content">
        <Blogs2 />
        {/* <Cta /> */}
      </div>
    </>
  );
}
