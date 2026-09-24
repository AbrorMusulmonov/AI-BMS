import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Battery, BrainCircuit, Info } from "lucide-react";

const choices = [
  {
    title: "Battery dashboard",
    description: "16S pack metrikalari va har bir cell kuchlanishini kuzating.",
    path: "/battery",
    icon: Battery,
  },
  {
    title: "AI analysis",
    description: "Battery holati, xavflar va tavsiyalarni bir joyda ko‘ring.",
    path: "/ai",
    icon: BrainCircuit,
  },
  {
    title: "About platform",
    description: "AI-BMS platformasi va uning imkoniyatlari bilan tanishing.",
    path: "/about",
    icon: Info,
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <div className="home-badge">Intelligent energy monitoring</div>
      <h1 className="home-title">AI<span>-BMS</span></h1>
      <p className="home-subtitle">
        Battery pack monitoring, diagnostics and intelligent analysis for safer, longer-lasting energy systems.
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
