// /lib/utils/normalize.js
export function safeString(value) {
  if (value === null || value === undefined) return "";
  return value.toString().trim();
}

export function normalizeValue(value) {
  return safeString(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
}

export function truncate(value, max = 200) {
  const str = safeString(value);
  return str.length > max ? str.slice(0, max) : str;
}
