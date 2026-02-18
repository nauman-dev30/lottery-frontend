import Cta from "@/components/common/Cta";
import Support from "@/components/dashboard/Support";
import Footer1 from "@/components/footers/Footer1";
import React from "react";

export const metadata = {
  title:
    "Dashboard Support || Tronadoo - Online Lotto & Lottery React Nextjs Template",
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
                <h2 className="fw-9 wow fadeInUp">Support</h2>
              </div>
            </div>
          </div>
        </div>
        <Support /> {/* <Cta /> */}
        {/* footer */}
        <Footer1 />
      </div>
    </>
  );
}
