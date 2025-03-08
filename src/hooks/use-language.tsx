
import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageType = 'ja' | 'en';

type LanguageContextType = {
  language: LanguageType;
  setLanguage: (language: LanguageType) => void;
  t: (ja: string, en: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Try to get stored language preference or default to Japanese
  const [language, setLanguage] = useState<LanguageType>(() => {
    const stored = localStorage.getItem('language');
    return (stored === 'ja' || stored === 'en') ? stored : 'ja';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation helper function
  const t = (ja: string, en: string) => {
    return language === 'ja' ? ja : en;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
