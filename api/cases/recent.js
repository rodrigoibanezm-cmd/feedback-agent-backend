// /api/cases/recent.js

import { getRecentCases } from "../../lib/storage/casesStore.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const limitRaw = req.query.limit || "20";
    const limit = Math.min(Math.max(Number(limitRaw) || 20, 1), 100);

    const cases = await getRecentCases(limit);

    return res.status(200).json({
      ok: true,
      count: cases.length,
      cases
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}
