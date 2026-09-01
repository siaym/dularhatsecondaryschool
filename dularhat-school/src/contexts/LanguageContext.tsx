"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "bn" | "en";

export type BilingualText = {
  bengali: string;
  english: string;
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (content: BilingualText | string) => string;
  isBengali: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("bn");

  const t = (content: BilingualText | string): string => {
    if (typeof content === "string") return content;
    return language === "bn" ? content.bengali : content.english;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isBengali: language === "bn",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
