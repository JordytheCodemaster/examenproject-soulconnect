import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false); // Dropdown state
  const dropdownRef = useRef(null); // Ref to detect outside clicks

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    setIsOpen(false); // Close dropdown after language is selected
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-4 right-4 z-50" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        🌐 Language
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
          <button
            onClick={() => changeLanguage("en")}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("fr")}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Français
          </button>
          <button
            onClick={() => changeLanguage("nl")}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Nederlands
          </button>
          <button
            onClick={() => changeLanguage("de")}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Deutsch
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
