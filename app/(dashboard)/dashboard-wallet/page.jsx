import Cta from "@/components/common/Cta";
import Wallet from "@/components/dashboard/Wallet";
import Footer1 from "@/components/footers/Footer1";
import React from "react";

export const metadata = {
  title:
    "Dashboard Wallet || Tronadoo - Online Lotto & Lottery React Nextjs Template",
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
                <h2 className="fw-9 wow fadeInUp" data-wow-delay="0s">
                  Wallet
                </h2>
              </div>
            </div>
          </div>
        </div>
        <Wallet /> {/* <Cta /> */}
        {/* footer */}
        <Footer1 />
      </div>
    </>
  );
}
