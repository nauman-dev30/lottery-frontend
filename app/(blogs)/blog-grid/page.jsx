import Blogs1 from "@/components/blogs/Blogs1";
import Breadcumb from "@/components/common/Breadcumb";
import Cta from "@/components/common/Cta";

import React from "react";
export const metadata = {
  title: "Blog Grid || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};

export default function page() {
  return (
    <>
      <Breadcumb pageName="Blog grid" title="Blog grid" />
      <div className="main-content">
        <Blogs1 />
        {/* <Cta /> */}
      </div>
    </>
  );
}
