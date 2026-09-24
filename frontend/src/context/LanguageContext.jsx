import React, { createContext, useState, useEffect } from 'react';
import en from '../i18n/en.json';
import hi from '../i18n/hi.json';
import ta from '../i18n/ta.json';
import te from '../i18n/te.json';
import bn from '../i18n/bn.json';
import mr from '../i18n/mr.json';
import kn from '../i18n/kn.json';

const translations = { en, hi, ta, te, bn, mr, kn };

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    if (saved && translations[saved]) return saved;
    const navLang = navigator.language.split('-')[0];
    return translations[navLang] ? navLang : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value === undefined) break;
      value = value[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
