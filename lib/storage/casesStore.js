// /lib/storage/casesStore.js

const RECENT_INDEX = "idx:cases:recent";
const OPEN_INDEX = "idx:cases:status:open";
const CASE_KEY_PREFIX = "case:";
const RECENT_INDEX_LIMIT = 300;

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

function parseCase(value) {
  if (!value) return null;
  return typeof value === "string" ? JSON.parse(value) : value;
}

export async function saveCase(caseData) {
  const caseKey = `${CASE_KEY_PREFIX}${caseData.case_id}`;
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
    `/ltrim/${encodeURIComponent(RECENT_INDEX)}/0/${RECENT_INDEX_LIMIT - 1}`,
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
  const caseKey = `${CASE_KEY_PREFIX}${caseId}`;

  const data = await kvCommand(`/get/${encodeURIComponent(caseKey)}`, {
    method: "GET"
  });

  return parseCase(data.result);
}

export async function getAllCases() {
  let cursor = "0";
  const keys = [];

  do {
    const data = await kvCommand(
      `/scan/${encodeURIComponent(cursor)}/match/${encodeURIComponent("case:*")}/count/100`,
      { method: "GET" }
    );

    cursor = String(data.result?.[0] || "0");
    keys.push(...(data.result?.[1] || []));

  } while (cursor !== "0");

  const cases = await Promise.all(
    keys.map(async (key) => {
      const id = key.replace(CASE_KEY_PREFIX, "");
      return getCase(id);
    })
  );

  return cases.filter(Boolean);
}

export async function getRecentCases(limit = 20) {
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), RECENT_INDEX_LIMIT);

  const indexData = await kvCommand(
    `/lrange/${encodeURIComponent(RECENT_INDEX)}/0/${safeLimit - 1}`,
    { method: "GET" }
  );

  const ids = indexData.result || [];
  const cases = await Promise.all(ids.map((id) => getCase(id)));

  return cases.filter(Boolean);
}

export async function getOpenCases(limit = 20) {
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), RECENT_INDEX_LIMIT);

  const indexData = await kvCommand(
    `/lrange/${encodeURIComponent(OPEN_INDEX)}/0/${safeLimit - 1}`,
    { method: "GET" }
  );

  const ids = indexData.result || [];
  const cases = await Promise.all(ids.map((id) => getCase(id)));

  return cases.filter(Boolean);
}
