import { Bell, Languages } from "lucide-react";
import { useLanguage } from "../i18n/language";

export default function Navbar() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="navbar">
      <h2 className="nav-title">
        {language === "uz" ? "Batareya monitoringi" : "Battery Monitoring"}
      </h2>
      <div className="nav-actions">
        <div className="language-switch" aria-label="Language">
          <Languages size={16} />
          <button className={language === "uz" ? "active" : ""} onClick={() => setLanguage("uz")}>UZ</button>
          <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
        </div>
        <button className="notification-button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="profile">A</div>
      </div>
    </header>
  );
}
