import Breadcumb from "@/components/common/Breadcumb2";
import Cta from "@/components/common/Cta";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import Map from "@/components/contact/Map";

import React from "react";

export const metadata = {
  title: "Contact || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function page() {
  return (
    <>
      <Breadcumb pageName="Contact" title="Contact us" />
      <div className="main-content">
        {/* <Map />  */}
        <ContactInfo />
        <ContactForm />
        {/* <Cta /> */}
      </div>
    </>
  );
}
