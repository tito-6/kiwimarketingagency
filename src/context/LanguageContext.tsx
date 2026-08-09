"use client";

import React, { createContext, useContext } from "react";
import { translations, type Language, type TranslationDictionary } from "@/data/translations";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/** Site is Turkish-only — language toggle removed from the navbar. */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const value: LanguageContextType = {
    lang: "tr",
    setLang: () => {},
    t: translations.tr,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      lang: "tr" as Language,
      setLang: () => {},
      t: translations.tr,
    };
  }
  return context;
}
