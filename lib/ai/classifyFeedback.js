// /lib/ai/classifyFeedback.js

import { ALLOWED } from "../domain/feedbackLogic.js";

const MODEL = "gpt-5-mini";

export async function classifyFeedback(input) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: MODEL,
        input: [
          {
            role: "system",
            content:
              "Eres un clasificador de feedback de clientes. Devuelve SOLO JSON válido según el schema."
          },
          {
            role: "user",
            content: `
Clasifica este feedback.

Criterios:
- intent: intención real del mensaje
- urgency: baja | media | alta | critica
- risk: ninguno | operacional | reputacional | legal | seguridad

Topics permitidos:
${ALLOWED.topic.join(", ")}

Tipo seleccionado:
${input.type_selected}

Mensaje:
${input.message}

Nota:
${input.rating ?? ""}
`
          }
        ],
        text: {
          format: {
            type: "json_schema",
            name: "feedback_classification",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              properties: {
                intent: { type: "string", enum: ALLOWED.intent },
                urgency: { type: "string", enum: ALLOWED.urgency },
                topic: { type: "string", enum: ALLOWED.topic },
                risk: { type: "string", enum: ALLOWED.risk },
                summary: { type: "string" }
              },
              required: ["intent", "urgency", "topic", "risk", "summary"]
            }
          }
        }
      })
    });

    const raw = await res.text();

    if (!res.ok) {
      throw new Error(`OpenAI error ${res.status}: ${raw}`);
    }

    const json = JSON.parse(raw);

    if (!json.output_text) {
      throw new Error("OpenAI sin output_text");
    }

    return JSON.parse(json.output_text);

  } finally {
    clearTimeout(timeout);
  }
}
