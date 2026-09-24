import { Battery, HeartPulse, Zap, Gauge } from "lucide-react";

const icons = {
  SOC: <Battery size={22} />,
  SOH: <HeartPulse size={22} />,
  Voltage: <Zap size={22} />,
  Current: <Gauge size={22} />,
};

export default function BatteryCard({ title, value, type, progress, icon }) {
  return (
    <article className="battery-card">
      <div className="card-topline">
        <div className="battery-icon">{icon || icons[type]}</div>
        <span className="metric-status">Live</span>
      </div>
      <p className="battery-label">{title}</p>
      <h2 className="battery-value">{value}</h2>
      {progress !== undefined && (
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </article>
  );
}
