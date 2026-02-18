import Cta from "@/components/common/Cta";
import OldContest from "@/components/dashboard/OldContest";
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
                <h2 className="fw-9">Ended Contest</h2>
              </div>
            </div>
          </div>
        </div>
        <OldContest />
         {/* <Cta /> */}
        <Footer1 />
      </div>
    </>
  );
}
