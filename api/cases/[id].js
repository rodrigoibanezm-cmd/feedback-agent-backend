// /api/cases/[id].js

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const id = req.query.id;
    const key = `case:${id}`;

    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
      throw new Error("Faltan variables KV_REST_API_URL / KV_REST_API_TOKEN");
    }

    const kvRes = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!kvRes.ok) {
      const text = await kvRes.text();
      throw new Error(`Upstash error ${kvRes.status}: ${text}`);
    }

    const data = await kvRes.json();

    if (!data.result) {
      return res.status(404).json({
        ok: false,
        error: "Case not found",
        id
      });
    }

    const parsedCase =
      typeof data.result === "string" ? JSON.parse(data.result) : data.result;

    return res.status(200).json({
      ok: true,
      case: parsedCase
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}
