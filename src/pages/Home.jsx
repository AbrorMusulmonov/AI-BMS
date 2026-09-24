import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Battery, BrainCircuit, Info, Languages } from "lucide-react";
import { useLanguage } from "../i18n/language";

export default function Home() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const uz = language === "uz";
  const choices = [
    {
      title: uz ? "Batareya paneli" : "Battery dashboard",
      description: uz ? "16S batareya ko‘rsatkichlari va har bir cell kuchlanishini kuzating." : "Monitor 16S pack metrics and every individual cell voltage.",
      path: "/battery",
      icon: Battery,
    },
    {
      title: uz ? "AI tahlil" : "AI analysis",
      description: uz ? "Batareya holati, xavflar va tavsiyalarni AI orqali tahlil qiling." : "Analyze battery health, risks and recommendations with AI.",
      path: "/ai",
      icon: BrainCircuit,
    },
    {
      title: uz ? "Loyiha haqida" : "About platform",
      description: uz ? "AI-BMS platformasi va uning imkoniyatlari bilan tanishing." : "Learn about the AI-BMS platform and its capabilities.",
      path: "/about",
      icon: Info,
    },
  ];

  return (
    <main className="home-page">
      <div className="home-language">
        <Languages size={16} />
        <button className={uz ? "active" : ""} onClick={() => setLanguage("uz")}>UZ</button>
        <button className={!uz ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
      </div>
      <div className="home-badge">{uz ? "Aqlli energiya monitoringi" : "Intelligent energy monitoring"}</div>
      <h1 className="home-title">AI<span>-BMS</span></h1>
      <p className="home-subtitle">
        {uz
          ? "Xavfsiz va uzoq muddatli energiya tizimlari uchun batareya monitoringi, diagnostika va aqlli tahlil."
          : "Battery monitoring, diagnostics and intelligent analysis for safer, longer-lasting energy systems."}
      </p>
      <section className="selection-container">
        {choices.map(({ title, description, path, icon: Icon }) => (
          <article className="selection-card" onClick={() => navigate(path)} key={path}>
            <div className="selection-icon"><Icon size={25} /></div>
            <h2>{title} <ArrowUpRight size={16} /></h2>
            <p>{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
