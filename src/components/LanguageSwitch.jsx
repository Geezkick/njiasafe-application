import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiCheck, FiChevronDown } from 'react-icons/fi';

const LanguageSwitch = ({ language, setLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'sw', name: 'Swahili', flag: '🇹🇿', nativeName: 'Kiswahili' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' }
  ];

  // Load language from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('njiasafe_language');
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
    // Save to localStorage
    localStorage.setItem('njiasafe_language', langCode);
    
    // Show language change notification
    const selectedLang = languages.find(lang => lang.code === langCode);
    if (selectedLang) {
      // You can replace this with a toast notification
      console.log(`Language changed to ${selectedLang.name}`);
    }
  };

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Get language name based on current language
  const getLanguageText = () => {
    if (language === 'sw') return 'SW';
    if (language === 'fr') return 'FR';
    if (language === 'es') return 'ES';
    return 'EN';
  };

  return (
    <div className="relative">
      <motion.button 
        whileHover={{ scale: 1.05 }} 
        whileTap={{ scale: 0.95 }} 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        <FiGlobe className="w-5 h-5" />
        <span className="text-sm font-medium">{getLanguageText()}</span>
        <FiChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="absolute top-full right-0 mt-2 w-56 bg-premium-card rounded-lg shadow-xl border border-gray-800 z-50"
        >
          <div className="p-3 border-b border-gray-800">
            <p className="text-sm font-medium text-gray-300">Select Language</p>
          </div>
          <div className="p-2 max-h-64 overflow-y-auto">
            {languages.map((lang) => (
              <button 
                key={lang.code} 
                onClick={() => handleLanguageChange(lang.code)} 
                className={`flex items-center justify-between w-full px-3 py-3 rounded-md transition-colors ${
                  language === lang.code 
                    ? 'bg-gradient-to-r from-njia-darkblue/20 to-njia-purple/20 text-white' 
                    : 'hover:bg-gray-800 text-gray-300'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{lang.flag}</span>
                  <div className="text-left">
                    <p className="font-medium">{lang.name}</p>
                    <p className="text-xs text-gray-400">{lang.nativeName}</p>
                  </div>
                </div>
                {language === lang.code && <FiCheck className="w-4 h-4 text-njia-orange" />}
              </button>
            ))}
          </div>
          <div className="p-2 border-t border-gray-800">
            <p className="text-xs text-gray-400 text-center">App interface will update</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LanguageSwitch;
