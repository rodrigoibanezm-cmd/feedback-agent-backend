// /api/cases/search.js

import { getRecentCases } from "../../lib/storage/casesStore.js";
import { normalizeValue } from "../../lib/utils/normalize.js";

function matchesQuery(caseData, query) {
  if (query.intent && caseData.classification?.intent !== query.intent) {
    return false;
  }

  if (query.status && caseData.status !== query.status) {
    return false;
  }

  if (query.priority && caseData.priority !== query.priority) {
    return false;
  }

  if (query.topic && caseData.classification?.topic !== query.topic) {
    return false;
  }

  if (query.urgency && caseData.classification?.urgency !== query.urgency) {
    return false;
  }

  if (query.risk && caseData.classification?.risk !== query.risk) {
    return false;
  }

  if (query.store_id && caseData.store_id !== normalizeValue(query.store_id)) {
    return false;
  }

  return true;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const limitRaw = req.query.limit || "20";
    const limit = Math.min(Math.max(Number(limitRaw) || 20, 1), 100);

    const recentCases = await getRecentCases(100);

    const filtered = recentCases
      .filter((caseData) => matchesQuery(caseData, req.query))
      .slice(0, limit);

    return res.status(200).json({
      ok: true,
      count: filtered.length,
      cases: filtered
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}
