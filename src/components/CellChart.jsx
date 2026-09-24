import {
  BarChart,
  Bar,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function CellChart({ cells, language = "en" }) {
  const uz = language === "uz";
  const data = Object.entries(cells).map(([cell, voltage]) => ({
    name: `C${cell}`,
    voltage: Number(voltage),
  }));

  return (
    <div className="chart-container">
      <div className="chart-heading">
        <div>
          <span className="section-kicker">{uz ? "16 ta cell ko‘rinishi" : "16 cell overview"}</span>
          <h2 className="chart-title">{uz ? "Cell kuchlanishlari" : "Cell voltages"}</h2>
        </div>
        <div className="chart-legend"><span /> {uz ? "Normal diapazon" : "Normal range"}</div>
      </div>
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8eee9" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#77827a", fontSize: 12 }} />
          <YAxis domain={[3, 4.3]} axisLine={false} tickLine={false} tick={{ fill: "#77827a", fontSize: 12 }} />
          <Tooltip
            cursor={{ fill: "rgba(67, 160, 71, 0.06)" }}
            contentStyle={{ borderRadius: 12, border: "1px solid #e4ebe5", boxShadow: "0 10px 30px rgba(31, 55, 38, .1)" }}
            formatter={(value) => [`${value} V`, "Voltage"]}
          />
          <Bar dataKey="voltage" radius={[6, 6, 2, 2]} maxBarSize={28}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.voltage < 3.6 || entry.voltage > 4.15 ? "#ef8c46" : "#43a047"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
