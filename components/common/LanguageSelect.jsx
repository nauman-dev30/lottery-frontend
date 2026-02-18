"use client";

import { useState } from "react";

const languages = ["English", "Spain"];

export default function LanguageSelect() {
  const [activeLang, setActiveLang] = useState("English");

  return (
    <div className="tf-dropdown-sort tf-languages" data-bs-toggle="dropdown">
      <div className="btn-select">
        <span className="text-sort-value">{activeLang}</span>
      </div>
      <div className="dropdown-menu">
        {languages.map((lang) => (
          <div
            key={lang}
            className={`select-item ${activeLang === lang ? "active" : ""}`}
            onClick={() => setActiveLang(lang)}
          >
            <span className="text-value-item">{lang}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
