import { useMemo } from "react";
import { Activity, BatteryCharging, Thermometer, Zap } from "lucide-react";
import BatteryCard from "../components/BatteryCard";
import CellChart from "../components/CellChart";
import { batteryCells, batteryMonitoring } from "../data/batteryData";
import { useLanguage } from "../i18n/language";

export default function Battery() {
  const { language } = useLanguage();
  const uz = language === "uz";
  const monitoring = batteryMonitoring;
  const cells = batteryCells;

  const cellStats = useMemo(() => {
    const values = Object.values(cells).map(Number);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return {
      min,
      max,
      weakCell: values.indexOf(min) + 1,
      delta: max - min,
    };
  }, [cells]);

  return (
    <main className="page-container">
      <div className="page-header">
        <div>
          <div className="eyebrow">{uz ? "Jonli monitoring" : "Live monitoring"}</div>
          <h1 className="page-title">Li-Ion 16S Battery</h1>
          <p className="page-description">
            {uz ? "Batareya holati va cell kuchlanishlari" : "Battery status and individual cell voltages"}
          </p>
        </div>
        <div className="live-badge"><span /> {uz ? "Tizim faol" : "System online"}</div>
      </div>

      <section className="battery-hero">
        <div className="battery-visual">
          <div className="battery-shell">
            <div className="battery-level" style={{ width: `${monitoring.soc}%` }} />
            <span>{monitoring.soc}%</span>
          </div>
          <div>
            <p>{uz ? "Batareya zaryadi" : "Battery charge"}</p>
            <h2>{monitoring.soc}% {uz ? "mavjud" : "available"}</h2>
            <small>{uz ? "Taxminiy batareya sog‘ligi" : "Estimated pack health"}: {monitoring.soh}%</small>
          </div>
        </div>
        <div className="hero-metric">
          <Activity size={20} />
          <div><span>{uz ? "Batareya holati" : "Pack status"}</span><strong>{uz ? "Barqaror" : "Stable"}</strong></div>
        </div>
        <div className="hero-metric">
          <BatteryCharging size={20} />
          <div><span>{uz ? "Konfiguratsiya" : "Configuration"}</span><strong>16S Li-Ion</strong></div>
        </div>
      </section>

      <section className="cards-container">
        <BatteryCard title={uz ? "Zaryad holati" : "State of charge"} value="80%" type="SOC" progress={80} />
        <BatteryCard title={uz ? "Batareya sog‘ligi" : "State of health"} value="98%" type="SOH" progress={98} />
        <BatteryCard title={uz ? "Umumiy kuchlanish" : "Pack voltage"} value="64 V" type="Voltage" />
        <BatteryCard title={uz ? "Tok kuchi" : "Pack current"} value="12 A" type="Current" />
        <BatteryCard title={uz ? "Harorat" : "Temperature"} value="24,5 °C" icon={<Thermometer size={22} />} />
        <BatteryCard title={uz ? "Chiqish quvvati" : "Output power"} value="768 W" icon={<Zap size={22} />} />
      </section>

      <section className="dashboard-grid">
        <CellChart cells={cells} language={language} />
        <aside className="cell-summary">
          <div>
            <span className="section-kicker">{uz ? "Cell diagnostikasi" : "Cell diagnostics"}</span>
            <h2>{uz ? "Batareya xulosasi" : "Pack summary"}</h2>
          </div>
          <div className="summary-row"><span>{uz ? "Eng yuqori kuchlanish" : "Highest voltage"}</span><strong>{cellStats.max.toFixed(1)} V</strong></div>
          <div className="summary-row"><span>{uz ? "Eng past kuchlanish" : "Lowest voltage"}</span><strong>{cellStats.min.toFixed(1)} V</strong></div>
          <div className="summary-row"><span>{uz ? "Kuchlanish farqi" : "Voltage delta"}</span><strong className="warning-value">{cellStats.delta.toFixed(1)} V</strong></div>
          <div className="summary-row"><span>{uz ? "Eng zaif cell" : "Weakest cell"}</span><strong>Cell {cellStats.weakCell}</strong></div>
          <div className="status-note">
            <span>{uz ? "E’tibor talab qilinadi" : "Attention needed"}</span>
            {uz
              ? `Cell ${cellStats.weakCell} boshqa cellarga nisbatan past. Balanslash tavsiya etiladi.`
              : `Cell ${cellStats.weakCell} is lower than the other cells. Balancing is recommended.`}
          </div>
        </aside>
      </section>
    </main>
  );
}
