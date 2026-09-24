import { useEffect, useMemo, useState } from "react";
import { ref, onValue } from "firebase/database";
import { Activity, BatteryCharging, Thermometer, Zap } from "lucide-react";
import { database } from "../firebase/config";
import BatteryCard from "../components/BatteryCard";
import CellChart from "../components/CellChart";
import { batteryCells, batteryMonitoring } from "../data/batteryData";

export default function Battery() {
  const [monitoring, setMonitoring] = useState(batteryMonitoring);
  const [cells, setCells] = useState(batteryCells);

  useEffect(() => {
    const monitoringRef = ref(database, "batteries/LiIon_16S_001/monitoring");
    const cellRef = ref(database, "batteries/LiIon_16S_001/cells");
    const stopMonitoring = onValue(monitoringRef, (snapshot) => {
      if (snapshot.exists()) setMonitoring(snapshot.val());
    });
    const stopCells = onValue(cellRef, (snapshot) => {
      if (snapshot.exists()) setCells(snapshot.val());
    });

    return () => {
      stopMonitoring();
      stopCells();
    };
  }, []);

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
          <div className="eyebrow">Live monitoring</div>
          <h1 className="page-title">Li-Ion 16S Battery</h1>
          <p className="page-description">Pack holati va cell kuchlanishlari real vaqt rejimida</p>
        </div>
        <div className="live-badge"><span /> System online</div>
      </div>

      <section className="battery-hero">
        <div className="battery-visual">
          <div className="battery-shell">
            <div className="battery-level" style={{ width: `${monitoring.soc}%` }} />
            <span>{monitoring.soc}%</span>
          </div>
          <div>
            <p>Battery charge</p>
            <h2>{monitoring.soc}% available</h2>
            <small>Estimated pack health: {monitoring.soh}%</small>
          </div>
        </div>
        <div className="hero-metric">
          <Activity size={20} />
          <div><span>Pack status</span><strong>Stable</strong></div>
        </div>
        <div className="hero-metric">
          <BatteryCharging size={20} />
          <div><span>Configuration</span><strong>16S Li-Ion</strong></div>
        </div>
      </section>

      <section className="cards-container">
        <BatteryCard title="State of charge" value={`${monitoring.soc}%`} type="SOC" progress={monitoring.soc} />
        <BatteryCard title="State of health" value={`${monitoring.soh}%`} type="SOH" progress={monitoring.soh} />
        <BatteryCard title="Pack voltage" value={`${monitoring.voltage} V`} type="Voltage" />
        <BatteryCard title="Pack current" value={`${monitoring.current} A`} type="Current" />
        <BatteryCard title="Temperature" value={`${String(monitoring.temperature).replace(".", ",")} °C`} icon={<Thermometer size={22} />} />
        <BatteryCard title="Output power" value={`${monitoring.power} W`} icon={<Zap size={22} />} />
      </section>

      <section className="dashboard-grid">
        <CellChart cells={cells} />
        <aside className="cell-summary">
          <div>
            <span className="section-kicker">Cell diagnostics</span>
            <h2>Pack summary</h2>
          </div>
          <div className="summary-row"><span>Highest voltage</span><strong>{cellStats.max.toFixed(1)} V</strong></div>
          <div className="summary-row"><span>Lowest voltage</span><strong>{cellStats.min.toFixed(1)} V</strong></div>
          <div className="summary-row"><span>Voltage delta</span><strong className="warning-value">{cellStats.delta.toFixed(1)} V</strong></div>
          <div className="summary-row"><span>Weakest cell</span><strong>Cell {cellStats.weakCell}</strong></div>
          <div className="status-note">
            <span>Attention needed</span>
            Cell {cellStats.weakCell} boshqa cellarga nisbatan past. Balanslash tavsiya etiladi.
          </div>
        </aside>
      </section>
    </main>
  );
}
