import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslation from "./locales/en/translation.json";
import frTranslation from "./locales/fr/translation.json";
import nlTranslation from "./locales/nl/translation.json";
import deTranslation from "./locales/de/translation.json";

// Configure i18next
i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: enTranslation }, // English translations
      fr: { translation: frTranslation }, // French translations
      nl: { translation: nlTranslation }, // English translations
      de: { translation: deTranslation }, // French translations
    },
    fallbackLng: "en", // Default language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;