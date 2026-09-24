import process from "node:process";

const allowedOrigins = [
  "https://ai-bms-five.vercel.app",
  "http://localhost:5173",
];

let selectedModel;

async function getAvailableModel(apiKey) {
  if (selectedModel) return selectedModel;

  const response = await fetch("https://api.groq.com/openai/v1/models", {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!response.ok) throw new Error("Could not load available AI models");

  const { data } = await response.json();
  const models = data.map((model) => model.id);
  const preferredModels = [
    "openai/gpt-oss-20b",
    "meta-llama/llama-4-scout-17b-16e-instruct",
    "qwen/qwen3-32b",
  ];
  selectedModel = preferredModels.find((model) => models.includes(model))
    || models.find((model) => /(llama|qwen|gemma|gpt)/i.test(model) && !/(guard|whisper|tts)/i.test(model));

  if (!selectedModel) throw new Error("No compatible AI model is available");
  return selectedModel;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const origin = request.headers.origin;
  if (origin && !allowedOrigins.includes(origin) && !origin.endsWith(".vercel.app")) {
    return response.status(403).json({ error: "Origin not allowed" });
  }

  if (!process.env.GROQ_API_KEY) {
    return response.status(503).json({ error: "AI service is not configured" });
  }

  const { monitoring, cells } = request.body || {};
  if (!monitoring || !cells || Object.keys(cells).length !== 16) {
    return response.status(400).json({ error: "Invalid battery data" });
  }

  try {
    const model = await getAvailableModel(process.env.GROQ_API_KEY);
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_completion_tokens: 700,
        messages: [
          {
            role: "system",
            content: "You are a battery diagnostics assistant. Analyze the supplied 16S Li-Ion battery telemetry. Return only JSON with keys status, summary, risks, recommendations. status and summary are strings. risks and recommendations are arrays of concise strings. Use Uzbek language. Do not claim certainty or replace professional inspection.",
          },
          {
            role: "user",
            content: JSON.stringify({ monitoring, cells }),
          },
        ],
      }),
    });

    if (!groqResponse.ok) {
      const providerError = await groqResponse.json().catch(() => ({}));
      console.error("Groq request failed", groqResponse.status, providerError.error?.code, providerError.error?.message);
      return response.status(502).json({ error: "AI provider request failed" });
    }

    const result = await groqResponse.json();
    const content = result.choices[0].message.content;
    const json = content.slice(content.indexOf("{"), content.lastIndexOf("}") + 1);
    let analysis;
    try {
      analysis = JSON.parse(json);
    } catch {
      analysis = {
        status: "AI tahlili tayyor",
        summary: content.trim(),
        risks: [],
        recommendations: [],
      };
    }
    return response.status(200).json(analysis);
  } catch {
    return response.status(500).json({ error: "Analysis could not be completed" });
  }
}
