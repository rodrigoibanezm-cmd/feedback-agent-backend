// /api/feedback/ingest.js

const MODEL = "gpt-5-mini";
const CLASSIFICATION_VERSION = "v1";

const ALLOWED = {
  intent: ["consulta", "reclamo", "sugerencia", "felicitacion", "otro"],
  urgency: ["baja", "media", "alta", "critica"],
  topic: ["atencion", "higiene_tienda", "producto", "precio", "stock", "postventa", "tiempo_espera", "otro"],
  risk: ["ninguno", "operacional", "reputacional", "legal", "seguridad"]
};

function safeString(value) {
  if (value === null || value === undefined) return "";
  return value.toString().trim();
}

function normalizeValue(str) {
  return safeString(str)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

function truncate(str, max = 200) {
  const value = safeString(str);
  return value.length > max ? value.slice(0, max) : value;
}

function validateInput(input) {
  if (!input) throw new Error("Body vacío");

  const message = safeString(input.message);
  if (!safeString(input.type_selected)) throw new Error("Falta type_selected");
  if (!safeString(input.store_id)) throw new Error("Falta store_id");
  if (!message) throw new Error("Falta message");
  if (message.length > 2000) throw new Error("message demasiado largo");

  if (input.rating !== undefined && input.rating !== null && input.rating !== "") {
    const rating = Number(input.rating);
    if (!Number.isFinite(rating) || rating < 1 || rating > 7) {
      throw new Error("rating inválido");
    }
  }
}

function validateEnum(field, value) {
  if (!ALLOWED[field].includes(value)) {
    throw new Error(`Valor inválido en ${field}: ${value}`);
  }
}

function computePriority(c) {
  if (c.urgency === "critica") return "critical";
  if (c.urgency === "alta") return "high";
  if (c.urgency === "media") return "medium";
  return "low";
}

function computeRoute(c) {
  if (c.risk === "legal" || c.risk === "seguridad") return ["sac", "gerencia"];
  if (c.urgency === "alta" || c.urgency === "critica") return ["sac", "jefe_tienda"];
  if (c.intent === "reclamo") return ["sac"];
  return ["registro"];
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let timeout;

  try {
    const input = req.body;
    validateInput(input);

    const now = new Date().toISOString();
    const message = safeString(input.message);
    const externalId = safeString(input.external_id) || crypto.randomUUID();
    const caseId = `case_${externalId}`;

    const controller = new AbortController();
    timeout = setTimeout(() => controller.abort(), 12000);

    const openaiRes = await fetch("https://api.openai.com/v1/responses", {
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
            content: "Eres un clasificador de feedback de clientes. Devuelve SOLO JSON válido según el schema."
          },
          {
            role: "user",
            content: `
Clasifica este feedback.

Criterios:
- intent: intención real del mensaje.
- urgency baja: comentario menor.
- urgency media: problema operativo corregible.
- urgency alta: cliente molesto relevante o requiere gestión pronta.
- urgency critica: denuncia grave, seguridad, acoso, discriminación, amenaza legal o funa.
- risk operacional: afecta operación de tienda.
- risk reputacional: puede afectar imagen pública.
- risk legal: denuncia, cobro indebido grave o amenaza legal.
- risk seguridad: accidente, peligro físico, acoso o amenaza.
- risk ninguno: sin riesgo relevante.

Topics permitidos:
atencion, higiene_tienda, producto, precio, stock, postventa, tiempo_espera, otro.

Tipo seleccionado:
${safeString(input.type_selected)}

Tienda:
${safeString(input.store_id)}

Mensaje:
${message}

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

    const raw = await openaiRes.text();

    if (!openaiRes.ok) {
      throw new Error(`OpenAI error ${openaiRes.status}: ${raw}`);
    }

    const openaiJson = JSON.parse(raw);
    if (!openaiJson.output_text) throw new Error("OpenAI sin output_text");

    const classification = JSON.parse(openaiJson.output_text);

    validateEnum("intent", classification.intent);
    validateEnum("urgency", classification.urgency);
    validateEnum("topic", classification.topic);
    validateEnum("risk", classification.risk);

    if (!safeString(classification.summary)) {
      throw new Error("summary inválido");
    }

    const finalCase = {
      case_id: caseId,
      status: "open",
      priority: computePriority(classification),
      route: computeRoute(classification),
      has_reply: false,

      source: safeString(input.source),
      external_id: externalId,
      type_selected: normalizeValue(input.type_selected),
      store_id: normalizeValue(input.store_id),
      seller: safeString(input.seller),
      message,
      customer: input.customer || {},
      wants_contact: Boolean(input.wants_contact),
      rating: input.rating === undefined ? null : Number(input.rating),

      classification: {
        classification_version: CLASSIFICATION_VERSION,
        intent: classification.intent,
        urgency: classification.urgency,
        topic: classification.topic,
        risk: classification.risk,
        summary: truncate(classification.summary, 200)
      },

      audit: {
        model: MODEL
      },

      created_at: now,
      updated_at: now
    };

    return res.status(200).json({
      ok: true,
      case: finalCase
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.name === "AbortError" ? "Timeout OpenAI" : err.message
    });
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}
