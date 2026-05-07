// /api/feedback/ingest.js
import { classifyFeedback } from "../../lib/ai/classify.js";
import { computePriority, computeRoute } from "../../lib/domain/logic.js";
import { normalizeValue, safeString } from "../../lib/utils/normalize.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }

  try {
    const input = req.body;

    if (!input?.type_selected || !input?.store_id || !input?.message) {
      throw new Error("input inválido");
    }

    const now = new Date().toISOString();
    const externalId = input.external_id || crypto.randomUUID();
    const caseId = `case_${externalId}`;

    const classification = await classifyFeedback(input);

    const finalCase = {
      case_id: caseId,
      status: "open",
      priority: computePriority(classification),
      route: computeRoute(classification),

      type_selected: normalizeValue(input.type_selected),
      store_id: normalizeValue(input.store_id),
      message: safeString(input.message),

      classification,
      created_at: now,
      updated_at: now
    };

    return res.status(200).json({ ok: true, case: finalCase });

  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}
