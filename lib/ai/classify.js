// /lib/ai/classify.js
const MODEL = "gpt-5-mini";

export async function classifyFeedback(input) {
  const res = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      input: `Clasifica este mensaje: ${input.message}`,
      text: {
        format: {
          type: "json_schema",
          strict: true,
          schema: {
            type: "object",
            properties: {
              intent: { type: "string" },
              urgency: { type: "string" },
              topic: { type: "string" },
              risk: { type: "string" },
              summary: { type: "string" }
            },
            required: ["intent", "urgency", "topic", "risk", "summary"]
          }
        }
      }
    })
  });

  const json = await res.json();
  return JSON.parse(json.output_text);
}
