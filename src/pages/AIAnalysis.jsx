import { useState } from "react";
import { AlertTriangle, BrainCircuit, CheckCircle2, LoaderCircle, Sparkles } from "lucide-react";
import AIBox from "../components/AIBox";
import { batteryCells, batteryMonitoring } from "../data/batteryData";
import { useLanguage } from "../i18n/language";

const getInitialAnalysis = (uz) => ({
  status: uz ? "Balanslash kerak" : "Balancing required",
  summary: uz
    ? "Batareya umumiy holati yaxshi, ammo cell kuchlanishlari orasidagi farq yuqori."
    : "The battery is healthy overall, but the difference between cell voltages is high.",
  risks: uz
    ? ["Cell 13 kuchlanishi 3.5 V gacha tushgan", "Eng yuqori va past cell orasidagi farq 0.7 V"]
    : ["Cell 13 voltage is down to 3.5 V", "The maximum cell voltage difference is 0.7 V"],
  recommendations: uz
    ? ["Cell 13 va Cell 15 ni tekshiring", "Batareyani balanslang va qayta o‘lchang", "Harorat va zaryad tokini kuzating"]
    : ["Inspect Cell 13 and Cell 15", "Balance the pack and measure again", "Continue monitoring temperature and current"],
});

export default function AIAnalysis() {
  const { language } = useLanguage();
  const uz = language === "uz";
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const analysis = analysisResult?.language === language
    ? analysisResult.data
    : getInitialAnalysis(uz);

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
          language,
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Analysis failed");
      setAnalysisResult({ language, data: result });
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
          <div className="eyebrow">{uz ? "AI diagnostika" : "AI diagnostics"}</div>
          <h1 className="page-title">{uz ? "Batareya intellekti" : "Battery Intelligence"}</h1>
          <p className="page-description">
            {uz ? "16S batareya ma’lumotlarini AI orqali tahlil qiling" : "Analyze 16S battery telemetry with AI"}
          </p>
        </div>
        <button className="analyze-button" onClick={analyzeBattery} disabled={loading}>
          {loading ? <LoaderCircle className="spin" size={17} /> : <Sparkles size={17} />}
          {loading
            ? (uz ? "Tahlil qilinmoqda..." : "Analyzing...")
            : (uz ? "AI bilan tahlil qilish" : "Analyze with AI")}
        </button>
      </div>

      {error && <div className="analysis-error">{uz ? "Tahlil bajarilmadi. Qayta urinib ko‘ring." : "Analysis failed. Please try again."}</div>}

      <section className="ai-grid">
        <AIBox title={uz ? "Batareya sog‘ligi" : "Battery health"} value="98%" description={uz ? "SOH — a’lo holat" : "SOH — excellent condition"} />
        <AIBox title={uz ? "Cell kuchlanish farqi" : "Cell voltage delta"} value="0.7 V" description={uz ? "Balanslash tavsiya etiladi" : "Balancing is recommended"} />
        <AIBox title={uz ? "Eng zaif cell" : "Weakest cell"} value="Cell 13" description={uz ? "Eng past kuchlanish: 3.5 V" : "Lowest voltage: 3.5 V"} />
      </section>

      <section className="analysis-panel">
        <div className="analysis-summary">
          <div className="analysis-icon"><BrainCircuit size={25} /></div>
          <div>
            <span>{uz ? "AI baholash" : "AI assessment"}</span>
            <h2>{analysis.status}</h2>
            <p>{analysis.summary}</p>
          </div>
        </div>
        <div className="analysis-columns">
          <div>
            <h3><AlertTriangle size={17} /> {uz ? "Aniqlangan xavflar" : "Detected risks"}</h3>
            <ul>{analysis.risks.map((risk) => <li key={risk}>{risk}</li>)}</ul>
          </div>
          <div>
            <h3><CheckCircle2 size={17} /> {uz ? "Tavsiyalar" : "Recommendations"}</h3>
            <ul>{analysis.recommendations.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>
    </main>
  );
}
