"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "zh-CN", name: "简体中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇦🇪" },
];

const GoogleTranslate = () => {
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // Close dropdown on click outside
    const handleClickOutside = (event) => {
      if (!event.target.closest(".custom-translate-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang) => {
    const googleSelect = document.querySelector(".goog-te-combo");
    if (googleSelect) {
      googleSelect.value = lang.code;
      googleSelect.dispatchEvent(new Event("change"));
      setSelectedLang(lang);
      setIsOpen(false);
    }
  };

  return (
    <div className="custom-translate-container">
      <div id="google_translate_element" style={{ display: "none" }}></div>
      <Script
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      <div className="translate-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="current-flag">{selectedLang.flag}</span>
        <span className="current-name">{selectedLang.name}</span>
        <i className={`icon-arrow-down ${isOpen ? "rotate" : ""}`} />
      </div>

      {isOpen && (
        <div className="translate-dropdown">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className={`translate-item ${selectedLang.code === lang.code ? "active" : ""}`}
              onClick={() => changeLanguage(lang)}
            >
              <span className="item-flag">{lang.flag}</span>
              <span className="item-name">{lang.name}</span>
            </div>
          ))}
        </div>
      )}

      <style jsx global>{`
        .custom-translate-container {
          position: relative;
          display: inline-block;
          vertical-align: middle;
          margin-right: 15px;
          color: #fff;
          z-index: 1000;
        }

        .translate-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 140px;
        }

        .translate-trigger:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 107, 74, 0.5);
        }

        .current-flag {
          font-size: 20px;
        }

        .current-name {
          font-size: 14px;
          font-weight: 500;
        }

        .translate-trigger i {
          font-size: 10px;
          transition: transform 0.3s ease;
          margin-left: auto;
        }

        .translate-trigger i.rotate {
          transform: rotate(180deg);
        }

        .translate-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 180px;
          background: #111;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          animation: slideIn 0.3s ease forwards;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .translate-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .translate-item:last-child {
          border-bottom: none;
        }

        .translate-item:hover {
          background: rgba(255, 107, 74, 0.1);
        }

        .translate-item.active {
          background: rgba(255, 107, 74, 0.2);
          color: #ff6b4a;
        }

        .item-flag {
          font-size: 18px;
        }

        .item-name {
          font-size: 13px;
        }

        /* Hide Google Bar */
        .goog-te-banner-frame.skiptranslate, 
        .goog-te-gadget span,
        .goog-logo-link {
          display: none !important;
        }
        
        body {
          top: 0 !important;
        }

        .goog-te-menu-frame {
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;
