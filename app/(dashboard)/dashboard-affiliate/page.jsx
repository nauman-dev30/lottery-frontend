import Footer1 from "@/components/footers/Footer1";
import ReferralLink from "@/components/dashboard/affiliate/ReferralLink";
import React from "react";
import MatrixTree from "@/components/dashboard/affiliate/MatrixTree";

export const metadata = {
  title:
    "Dashboard Affiliate || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      {" "}
      <div className="main-content-dashboard">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="page-heading">
                <h2 className="fw-9">Affiliate</h2>
              </div>
            </div>
          </div>
        </div>
        <ReferralLink />
        <MatrixTree />
        {/* <Cta /> */}
        {/* footer */}
        <Footer1 />
      </div>
    </>
  );
}
