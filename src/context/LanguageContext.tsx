"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { translations, type Language, type TranslationDictionary } from "@/data/translations";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationDictionary;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("tr");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("kiwi_lang") as Language | null;
      if (stored === "tr" || stored === "en") {
        setLangState(stored);
      } else {
        const navLang = navigator.language || "";
        if (navLang.toLowerCase().startsWith("en")) {
          setLangState("en");
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("kiwi_lang", newLang);
      document.documentElement.lang = newLang;
    } catch {
      // Ignore
    }
  };

  const t: TranslationDictionary = translations[lang] || translations.tr;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
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
