import { useMemo, useState } from "react";
import { LanguageContext } from "./language";

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("ai-bms-language") || "uz");

  const changeLanguage = (value) => {
    setLanguage(value);
    localStorage.setItem("ai-bms-language", value);
    document.documentElement.lang = value;
  };

  const value = useMemo(() => ({ language, setLanguage: changeLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
