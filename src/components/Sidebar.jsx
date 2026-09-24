import { Battery, Brain, Info } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../i18n/language";

export default function Sidebar() {
  const { language } = useLanguage();
  const uz = language === "uz";
  const menu = [
    { name: uz ? "Batareya" : "Battery View", path: "/battery", icon: <Battery size={22} /> },
    { name: uz ? "AI tahlil" : "AI Analysis", path: "/ai", icon: <Brain size={22} /> },
    { name: uz ? "Loyiha haqida" : "About", path: "/about", icon: <Info size={22} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <h1>AI<span>-BMS</span></h1>
        <p>{uz ? "Aqlli batareya tizimi" : "Intelligent Battery System"}</p>
      </div>
      <nav className="menu">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => isActive ? "menu-item menu-active" : "menu-item"}
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">© 2026 AI-BMS</div>
    </aside>
  );
}
