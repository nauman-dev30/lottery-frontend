import Cta from "@/components/common/Cta";
import EditProfile from "@/components/dashboard/my-account/EditProfile";
import Footer1 from "@/components/footers/Footer1";
import React from "react";

export const metadata = {
  title:
    "Dashboard My Account || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      {" "}
      <div className="main-content-dashboard gap62">
        {" "}
        <EditProfile />
        {/* <Cta /> */}
        <Footer1 />
      </div>
    </>
  );
}
