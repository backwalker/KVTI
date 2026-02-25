/* global process */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import localizations
import translationKo from './locales/ko/common.json';
import translationEn from './locales/en/common.json';

const resources = {
    ko: {
        translation: translationKo,
    },
    en: {
        translation: translationEn,
    },
};

i18n
    // Detects user language
    .use(LanguageDetector)
    // Passes i18n down to react-i18next
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'ko', // Fallback to Korean
        debug: process.env.NODE_ENV === 'development',

        interpolation: {
            escapeValue: false, // React already safeguards from xss
        },
    });

export default i18n;
