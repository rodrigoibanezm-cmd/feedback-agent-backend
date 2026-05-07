// /api/feedback/ingest.js

import { classifyFeedback } from "../../lib/ai/classifyFeedback.js";
import {
  CLASSIFICATION_VERSION,
  validateClassification,
  computePriority,
  computeRoute
} from "../../lib/domain/feedbackLogic.js";
import {
  safeString,
  normalizeValue,
  truncate
} from "../../lib/utils/normalize.js";

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const input = req.body;
    validateInput(input);

    const now = new Date().toISOString();
    const message = safeString(input.message);
    const externalId = safeString(input.external_id) || crypto.randomUUID();

    const classification = await classifyFeedback(input);
    validateClassification(classification);

    const finalCase = {
      case_id: `case_${externalId}`,
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
        model: "gpt-5-mini"
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
  }
}
