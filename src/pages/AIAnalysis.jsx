import { useState } from "react";
import { AlertTriangle, BrainCircuit, CheckCircle2, LoaderCircle, Sparkles } from "lucide-react";
import AIBox from "../components/AIBox";
import { batteryCells, batteryMonitoring } from "../data/batteryData";

const initialAnalysis = {
  status: "Balancing required",
  summary: "Pack umumiy holati yaxshi, ammo cell kuchlanishlari orasidagi farq yuqori.",
  risks: [
    "Cell 13 kuchlanishi 3.5 V gacha tushgan",
    "Eng yuqori va past cell orasidagi farq 0.7 V",
  ],
  recommendations: [
    "Cell 13 va Cell 15 ni tekshiring",
    "Packni balanslang va qayta o‘lchang",
    "Harorat va zaryad tokini kuzatishda davom eting",
  ],
};

export default function AIAnalysis() {
  const [analysis, setAnalysis] = useState(initialAnalysis);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeBattery = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          monitoring: batteryMonitoring,
          cells: batteryCells,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Analysis failed");
      setAnalysis(result);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-container">
      <div className="page-header">
        <div>
          <div className="eyebrow">AI diagnostics</div>
          <h1 className="page-title">Battery Intelligence</h1>
          <p className="page-description">16S battery telemetriyasini AI orqali tahlil qiling</p>
        </div>
        <button className="analyze-button" onClick={analyzeBattery} disabled={loading}>
          {loading ? <LoaderCircle className="spin" size={17} /> : <Sparkles size={17} />}
          {loading ? "Tahlil qilinmoqda..." : "AI bilan tahlil qilish"}
        </button>
      </div>

      {error && <div className="analysis-error">{error}. GROQ_API_KEY sozlanganini tekshiring.</div>}

      <section className="ai-grid">
        <AIBox title="Battery health" value="98%" description="SOH — excellent condition" />
        <AIBox title="Cell voltage delta" value="0.7 V" description="Balancing is recommended" />
        <AIBox title="Weakest cell" value="Cell 13" description="Lowest voltage: 3.5 V" />
      </section>

      <section className="analysis-panel">
        <div className="analysis-summary">
          <div className="analysis-icon"><BrainCircuit size={25} /></div>
          <div>
            <span>AI assessment</span>
            <h2>{analysis.status}</h2>
            <p>{analysis.summary}</p>
          </div>
        </div>
        <div className="analysis-columns">
          <div>
            <h3><AlertTriangle size={17} /> Aniqlangan xavflar</h3>
            <ul>
              {analysis.risks.map((risk) => <li key={risk}>{risk}</li>)}
            </ul>
          </div>
          <div>
            <h3><CheckCircle2 size={17} /> Tavsiyalar</h3>
            <ul>
              {analysis.recommendations.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
