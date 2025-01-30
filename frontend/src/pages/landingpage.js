import React from "react";
import logo from "../img/SoulConnect.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import LanguageSwitcher from "../components/languageSwitch"; // Import LanguageSwitcher
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import "../i18n"; // Import i18n setup file

export default function Landingpage() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // Initialize the translation function

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col justify-center items-center p-6 relative">
      <LanguageSwitcher />
      <div className="absolute inset-0 bg-purple-50 overflow-hidden flex flex-wrap">
        {[...Array(Math.floor(window.innerWidth / 30) * Math.floor(window.innerHeight / 30))].map((_, index) => (
          <AiOutlineHeart
            key={index}
            className="text-purple-200"
            style={{
              fontSize: "20px",
              margin: "7px",
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="absolute top-4 left-4 flex items-center z-10">
        <img src={logo} alt="SoulConnect Logo" className="w-12 h-12 object-contain" />
        <h1 className="text-3xl font-bold ml-2 text-purple-700">SoulConnect</h1>
      </div>

      {/* Main Content */}
      <main
        className="flex flex-row items-stretch bg-white shadow-lg rounded-lg border border-gray-300 relative z-10"
        style={{ width: "900px", height: "500px" }}
      >
        <div className="w-1/2 h-full">
          <img
            src="https://www.famme.nl/wp-content/uploads/2021/01/mannen-vrouw-kijkt-weg-van-camera.jpeg"
            alt="A calm and reflective moment"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>
        <div className="w-1/2 h-full p-6 flex flex-col justify-center">
          <img
            src={logo}
            alt="SoulConnect Logo"
            className="w-16 h-16 object-contain mb-4 mx-auto"
          />
          <h2 className="text-2xl font-semibold text-gray-800 text-center">{t("signUp")}</h2> {/* Translated text */}
          <p className="mb-6 text-lg text-gray-600 text-center">{t("discoverPerfectPartner")}</p> {/* Translated text */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full bg-purple-500 text-white shadow-md py-2 mb-4 px-4 rounded-md hover:bg-purple-700 transition"
          >
            {t("login")} {/* Translated text */}
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")} // Navigate to profile creation page
            className="w-full bg-gray-200 text-black shadow-md py-2 px-4 rounded-md hover:bg-purple-600 transition"
          >
            {t("register")} {/* Translated text */}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 text-gray-500 text-sm relative z-10">
        <p>&copy; {new Date().getFullYear()} SoulConnect. {t("allRightsReserved")}</p> {/* Translated text */}
      </footer>
    </div>
  );
}
