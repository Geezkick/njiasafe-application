import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGlobe } from 'react-icons/fi';

const LanguageSwitch = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'sw', name: 'Swahili', flag: '🇹��' }
  ];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
        <FiGlobe className="w-5 h-5" />
        <span className="text-sm font-medium">{language.toUpperCase()}</span>
      </motion.button>

      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full right-0 mt-2 w-48 bg-premium-card rounded-lg shadow-xl border border-gray-800 z-50">
          <div className="p-2">
            {languages.map((lang) => (
              <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md transition-colors ${language === lang.code ? 'bg-gradient-to-r from-njia-darkblue/20 to-njia-purple/20 text-njia-orange' : 'hover:bg-gray-800'}`}>
                <span className="text-xl">{lang.flag}</span><span className="flex-1 text-left">{lang.name}</span>
                {language === lang.code && <div className="w-2 h-2 bg-njia-orange rounded-full animate-pulse" />}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
export default LanguageSwitch;
