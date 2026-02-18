import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import React from "react";

export default function layout({ children }) {
  return (
    <>
      <Header1 />
      {children}
      <Footer1 />
    </>
  );
}
