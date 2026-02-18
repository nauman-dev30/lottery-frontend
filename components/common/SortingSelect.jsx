"use client";

import { useEffect, useRef, useState } from "react";
const optionsDefault = [
  "Latest contest",
  "Recently added",
  "Price: Low to High",
  "Price: High to Low",
  "Auction ending soon",
];
export default function SortingSelect({
  onChange = (elm) => {},
  options = optionsDefault,
  defaultOption,
  selectedValue,
  addtionalParentClass = "",
}) {
  const selectRef = useRef();
  const optionsRef = useRef();
  const [selected, setSelected] = useState(options[0]);
  const toggleDropdown = () => {
    selectRef.current.classList.toggle("open");
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!selectRef.current.contains(event.target)) {
        selectRef.current.classList.remove("open");
      }
    };

    // Add event listeners to each dropdown element

    // Add a global click event listener to detect outside clicks
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Function to handle clicks outside the select or options
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        selectRef.current.contains(event.target) &&
        optionsRef.current &&
        !optionsRef.current.contains(event.target)
      ) {
        // Close the options if clicked outside
        toggleDropdown();
      }
    };

    // Add event listener on mount
    document.addEventListener("click", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className={`nice-select ${addtionalParentClass}`} ref={selectRef}>
        <div className="icon">
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.125 5.625H16.875M3.125 10H16.875M3.125 14.375H10"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span> Sort by:</span>
        <span className="current">
          {selectedValue || selected || defaultOption || options[0]}
        </span>
        <ul className="list" ref={optionsRef}>
          {options.map((elm, i) => (
            <li
              key={i}
              onClick={() => {
                setSelected(elm);
                onChange(elm);
                toggleDropdown();
              }}
              className={`option ${
                !selectedValue
                  ? selected == elm
                    ? "selected"
                    : ""
                  : selectedValue == elm
                  ? "selected"
                  : ""
              }  text text-1`}
            >
              {elm}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
