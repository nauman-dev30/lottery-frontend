import Cta from "@/components/common/Cta";
import FavoriteContests from "@/components/dashboard/favorite/FavoriteContests";
import FavoriteGames from "@/components/dashboard/favorite/FavoriteGames";
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
                <h2 className="fw-9">My favorite</h2>
              </div>
            </div>
          </div>
        </div>
        <FavoriteGames />
        <FavoriteContests /> {/* <Cta /> */}
        {/* footer */}
        <Footer1 />
      </div>
    </>
  );
}
