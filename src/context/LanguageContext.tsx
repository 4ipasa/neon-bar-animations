
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Available languages
export type Language = 'ru' | 'en' | 'kz';

// Language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'ru',
  setLanguage: () => {},
  t: () => '',
});

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Props for the language provider
interface LanguageProviderProps {
  children: ReactNode;
}

// Language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get saved language from localStorage or default to Russian
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'ru';
  };

  // State for the current language
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  
  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Import translation files
import { ruTranslations } from '../translations/ru';
import { enTranslations } from '../translations/en';
import { kzTranslations } from '../translations/kz';

// Combine all translations
const translations = {
  ru: ruTranslations,
  en: enTranslations,
  kz: kzTranslations,
};
