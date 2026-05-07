// /lib/domain/feedbackLogic.js

export const CLASSIFICATION_VERSION = "v1";

export const ALLOWED = {
  intent: ["consulta", "reclamo", "sugerencia", "felicitacion", "otro"],
  urgency: ["baja", "media", "alta", "critica"],
  topic: [
    "atencion",
    "higiene_tienda",
    "producto",
    "precio",
    "stock",
    "postventa",
    "tiempo_espera",
    "otro"
  ],
  risk: ["ninguno", "operacional", "reputacional", "legal", "seguridad"]
};

export function validateEnum(field, value) {
  if (!ALLOWED[field] || !ALLOWED[field].includes(value)) {
    throw new Error(`Valor inválido en ${field}: ${value}`);
  }
}

export function validateClassification(classification) {
  validateEnum("intent", classification.intent);
  validateEnum("urgency", classification.urgency);
  validateEnum("topic", classification.topic);
  validateEnum("risk", classification.risk);

  if (!classification.summary || typeof classification.summary !== "string") {
    throw new Error("summary inválido");
  }
}

export function computePriority(classification) {
  if (classification.urgency === "critica") return "critical";
  if (classification.urgency === "alta") return "high";
  if (classification.urgency === "media") return "medium";
  return "low";
}

export function computeRoute(classification) {
  if (
    classification.risk === "legal" ||
    classification.risk === "seguridad"
  ) {
    return ["sac", "gerencia"];
  }

  if (
    classification.urgency === "alta" ||
    classification.urgency === "critica"
  ) {
    return ["sac", "jefe_tienda"];
  }

  if (classification.intent === "reclamo") {
    return ["sac"];
  }

  return ["registro"];
}
