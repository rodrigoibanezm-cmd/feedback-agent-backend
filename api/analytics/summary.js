// /api/analytics/summary.js

import { getAllCases } from "../../lib/storage/casesStore.js";

function increment(map, key) {
  if (!key) return;
  map[key] = (map[key] || 0) + 1;
}

function topFromMap(map, limit = 5) {
  return Object.entries(map)
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const cases = await getAllCases();

    const byIntent = {};
    const byTopic = {};
    const byStore = {};
    const byPriority = {};
    const byRisk = {};

    let openCases = 0;
    let urgentCases = 0;
    let totalRating = 0;
    let ratingCount = 0;

    for (const item of cases) {
      const classification = item.classification || {};

      increment(byIntent, classification.intent);
      increment(byTopic, classification.topic);
      increment(byStore, item.store_id);
      increment(byPriority, item.priority);
      increment(byRisk, classification.risk);

      if (item.status === "open") openCases += 1;
      if (item.priority === "high" || item.priority === "critical") urgentCases += 1;

      if (typeof item.rating === "number") {
        totalRating += item.rating;
        ratingCount += 1;
      }
    }

    const topTopics = topFromMap(byTopic);
    const topStores = topFromMap(byStore);

    return res.status(200).json({
      ok: true,
      sample_size: cases.length,
      scope: "all_cases",

      totals: {
        total_cases: cases.length,
        open_cases: openCases,
        urgent_cases: urgentCases,
        avg_rating: ratingCount ? Number((totalRating / ratingCount).toFixed(2)) : null
      },

      breakdowns: {
        by_intent: byIntent,
        by_topic: byTopic,
        by_store: byStore,
        by_priority: byPriority,
        by_risk: byRisk
      },

      top: {
        topics: topTopics,
        stores: topStores
      },

      recommendation_signal: {
        main_topic: topTopics[0] || null,
        main_store: topStores[0] || null
      }
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}
