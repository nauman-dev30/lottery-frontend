"use client";
import React, { useState } from "react";

export default function CoinSelect({ onChange = (elm) => {} }) {
  const coinValues = [8840, 7840, 6840];
  const [selectedValue, setSelectedValue] = useState(7840); // Default selected

  return (
    <div className="dropdown bootstrap-select image-select">
      <button
        type="button"
        tabIndex={-1}
        className="btn dropdown-toggle btn-light w-100 show"
        data-bs-toggle="dropdown"
        role="combobox"
        aria-owns="bs-select-1"
        aria-haspopup="listbox"
        aria-expanded="true"
        title={7840}
      >
        <div className="filter-option">
          <div className="filter-option-inner">
            <div className="filter-option-inner-inner">
              <img src="images/item/coin.png" /> {selectedValue}
            </div>
          </div>{" "}
        </div>
      </button>
      <div
        className="dropdown-menu"
        style={{ height: "155px" }}
        data-popper-placement="bottom-start"
      >
        <div
          className="inner show"
          role="listbox"
          id="bs-select-1"
          tabIndex={-1}
          aria-activedescendant="bs-select-1-1"
        >
          <ul
            className="dropdown-menu inner show"
            role="presentation"
            style={{ marginTop: 0, marginBottom: 0, width: "168px" }}
          >
            {coinValues.map((value) => (
              <li
                key={value}
                className={`${
                  value === selectedValue ? "selected active" : ""
                }`}
                onClick={() => {
                  setSelectedValue(value);
                  onChange(value);
                }}
              >
                <a
                  role="option"
                  className={`dropdown-item ${
                    value === selectedValue ? "active selected" : ""
                  }`}
                >
                  <span className="text">
                    <img src="images/item/coin.png" alt="coin" /> {value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
