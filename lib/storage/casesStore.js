// /lib/storage/casesStore.js

const RECENT_INDEX = "idx:cases:recent";
const OPEN_INDEX = "idx:cases:status:open";

function getKvConfig() {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;

  if (!url || !token) {
    throw new Error("Faltan variables KV_REST_API_URL / KV_REST_API_TOKEN");
  }

  return { url, token };
}

async function kvCommand(path, options = {}) {
  const { url, token } = getKvConfig();

  const res = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upstash error ${res.status}: ${text}`);
  }

  return res.json();
}

export async function saveCase(caseData) {
  const caseKey = `case:${caseData.case_id}`;
  const caseId = caseData.case_id;

  await kvCommand(`/set/${encodeURIComponent(caseKey)}`, {
    method: "POST",
    body: JSON.stringify(caseData)
  });

  await kvCommand(
    `/lpush/${encodeURIComponent(RECENT_INDEX)}/${encodeURIComponent(caseId)}`,
    { method: "POST" }
  );

  await kvCommand(
    `/ltrim/${encodeURIComponent(RECENT_INDEX)}/0/99`,
    { method: "POST" }
  );

  if (caseData.status === "open") {
    await kvCommand(
      `/lpush/${encodeURIComponent(OPEN_INDEX)}/${encodeURIComponent(caseId)}`,
      { method: "POST" }
    );
  }

  return caseKey;
}

export async function getCase(caseId) {
  const caseKey = `case:${caseId}`;

  const data = await kvCommand(`/get/${encodeURIComponent(caseKey)}`, {
    method: "GET"
  });

  if (!data.result) return null;

  return typeof data.result === "string"
    ? JSON.parse(data.result)
    : data.result;
}
