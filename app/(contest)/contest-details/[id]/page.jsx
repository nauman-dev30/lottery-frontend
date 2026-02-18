import Breadcumb from "@/components/common/Breadcumb2";
import ContestDetails from "@/components/contests/ContestDetails";
import Cta from "@/components/common/Cta";

import React from "react";
import { allContests } from "@/data/contests";

export const metadata = {
  title:
    "Contest Details || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default async function page({ params }) {
  const { id } = await params;

  const contest = allContests.filter((p) => p.id == id)[0] || allContests[0];

  return (
    <>
      <Breadcumb title="Buy lottery tickets online" pageName="Contest" />
      <div className="main-content page-contest-details">
        <ContestDetails contest={contest} id={id} />
        {/* <Cta /> */}
      </div>
    </>
  );
}
