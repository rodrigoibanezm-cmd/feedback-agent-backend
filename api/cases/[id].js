// /api/cases/[id].js

import { getCase } from "../../lib/storage/casesStore.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const id = req.query.id;

    if (!id) {
      return res.status(400).json({
        ok: false,
        error: "Falta case_id"
      });
    }

    const caseData = await getCase(id);

    if (!caseData) {
      return res.status(404).json({
        ok: false,
        error: "Case not found",
        id
      });
    }

    return res.status(200).json({
      ok: true,
      case: caseData
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}
