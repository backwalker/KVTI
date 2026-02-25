import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const LANGUAGES = [
    { code: 'ko', label: '한국어 (KOR)' },
    { code: 'en', label: 'English (ENG)' },
    // Future languages can be added here easily
    // { code: 'vi', label: 'Tiếng Việt (VIE)' },
    // { code: 'zh', label: '中文 (CHN)' },
];

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const currentLang = i18n.language || 'ko';
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        // eslint-disable-next-line react-hooks/immutability
        document.documentElement.lang = langCode;
        setIsOpen(false);
    };

    const currentLangLabel = LANGUAGES.find(l => l.code === currentLang)?.label.split(' ')[0] || 'KOR';

    return (
        <div className="relative" ref={dropdownRef}>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-black/30 hover:bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-full transition-all border border-white/10 shadow-lg text-sm font-bold tracking-widest z-50 text-white"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-kvti-primary shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span className="min-w-[40px] text-center drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{currentLangLabel}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={`w-3 h-3 text-white/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-3 w-40 bg-[#1a1c29]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 py-2"
                    >
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleSelectLanguage(lang.code)}
                                className={`w-full text-left px-5 py-3 text-sm transition-colors flex items-center justify-between group ${currentLang === lang.code ? 'bg-kvti-primary/20 text-white font-bold' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
                            >
                                <span>{lang.label}</span>
                                {currentLang === lang.code && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-kvti-primary shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span>
                                )}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
