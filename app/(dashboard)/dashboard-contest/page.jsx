import Cta from "@/components/common/Cta";
import CurrentContest from "@/components/dashboard/CurrentContest";
import Footer1 from "@/components/footers/Footer1";
import React from "react";

export const metadata = {
  title:
    "Dashboard My Favorite || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      {" "}
      <div
        className="main-content-dashboard 
      "
      >
        {" "}
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="page-heading">
                <h2 className="fw-9">Active Contest</h2>
              </div>
            </div>
          </div>
        </div>
        <CurrentContest />
         {/* <Cta /> */}
        <Footer1 />
      </div>
    </>
  );
}
