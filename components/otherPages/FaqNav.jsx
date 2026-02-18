"use client";
const faqNavItems = [
  { id: 1, href: "#about-the-lotter", text: "About the Lotter" },
  { id: 2, href: "#top-5-questions", text: "Top 5 Questions", active: true },
  { id: 3, href: "#syndicates", text: "Syndicates" },
  { id: 4, href: "#payments-and-deposits", text: "Payments and Deposits" },
  { id: 5, href: "#winning", text: "Winning" },
  { id: 6, href: "#withdrawals", text: "Withdrawals" },
];
import { useEffect, useState } from "react";
export default function FaqNav({
  sectionIds = faqNavItems,
  activeClass = "active",
}) {
  const [activeSection, setActiveSection] = useState(
    sectionIds[0].href.replace("#", "")
  );

  useEffect(() => {
    // Create an IntersectionObserver to track visibility of sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Update active section when the section is visible in the viewport
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px", // Trigger when section is 50% visible
      }
    );

    // Observe each section
    setTimeout(() => {
      sectionIds.forEach((elm) => {
        const element = document.querySelector(elm.href);
        if (element) {
          observer.observe(element);
        }
      });
    });
    return () => {
      // Cleanup the observer when the component unmounts
      observer.disconnect();
    };
  }, [sectionIds]);

  const handleClick = (e, id) => {
    e.preventDefault();
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {" "}
      <ul className="faq-wrap-menu">
        {faqNavItems.map((item) => (
          <li
            key={item.id}
            className={`item-title ${
              activeSection == item.href.replace("#", "") ? " active" : ""
            }`}
            data-target={item.href}
          >
            <a onClick={(e) => handleClick(e, item.href)} href={item.href}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
