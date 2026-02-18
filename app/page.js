import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/homes/home-1/Banner";
import Banner2 from "@/components/homes/home-1/Banner2";
import Banner3 from "@/components/homes/home-1/Banner3";
import Contests from "@/components/homes/home-1/Contests";
import CustomerSupport from "@/components/common/CustomerSupport";
import Facts from "@/components/common/Facts";
import Hero from "@/components/homes/home-1/Hero";
import Testimonials from "@/components/homes/home-1/Testimonials";
import TopWinners from "@/components/homes/home-1/TopWinners";
import Winners from "@/components/common/Winners";
import Steps from "@/components/otherPages/Steps";

export const metadata = {
  title: "Home 01 || Tronadoo - Online Lotto & Lottery React Nextjs Template",
  description: "Tronadoo - Online Lotto & Lottery React Nextjs Template",
};
export default function Home() {
  return (
    <>
      <Header1 />
      <Hero />
      <div className="main-content">
        <Banner />
        <Steps />
        <Banner2 />
        <Facts />
        <Testimonials />
        <Banner3 />
        <CustomerSupport />
      </div>
      <Footer1 />
    </>
  );
}
