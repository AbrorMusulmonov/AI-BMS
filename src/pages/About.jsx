import { useLanguage } from "../i18n/language";

export default function About() {
  const { language } = useLanguage();
  const uz = language === "uz";

  return (
    <main className="page-container">
      <div className="eyebrow">{uz ? "Platforma haqida" : "About the platform"}</div>
      <h1 className="page-title">AI-BMS</h1>
      <div className="card about-card">
        <p>
          {uz
            ? "AI-BMS — litiy batareyalarni monitoring qilish, holatini baholash va optimallashtirish uchun yaratilgan aqlli Battery Management System."
            : "AI-BMS is an intelligent Battery Management System designed for lithium battery monitoring, health assessment and optimization."}
        </p>
        <p>
          {uz
            ? "Tizim batareya kuchlanishi, tok kuchi, harorati, SOC, SOH va har bir cell ma’lumotlarini yig‘adi. AI ushbu ma’lumotlarni tahlil qilib, xavflar va tavsiyalarni taqdim etadi."
            : "The system collects voltage, current, temperature, SOC, SOH and individual cell data. AI analyzes the telemetry and provides risks and recommendations."}
        </p>
      </div>
    </main>
  );
}
