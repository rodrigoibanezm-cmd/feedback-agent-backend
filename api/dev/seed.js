// /api/dev/seed.js

import { saveCase } from "../../lib/storage/casesStore.js";

const SEED_CASES = [
  {
    case_id: "case_seed_001",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_001",
    type_selected: "reclamo",
    store_id: "costanera_center",
    seller: "carla",
    message: "Esperé mucho tiempo y nadie me ayudó con los productos.",
    customer: { email: "cliente1@test.com", phone: "" },
    wants_contact: true,
    rating: 3,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "media",
      topic: "atencion",
      risk: "reputacional",
      summary: "Cliente reclama demora y falta de apoyo en tienda."
    }
  },
  {
    case_id: "case_seed_002",
    status: "open",
    priority: "high",
    route: ["sac", "jefe_tienda"],
    has_reply: false,
    source: "seed",
    external_id: "seed_002",
    type_selected: "reclamo",
    store_id: "plaza_vespucio",
    seller: "",
    message: "La tienda tenía muy mal olor y daba mala impresión.",
    customer: { email: "cliente2@test.com", phone: "" },
    wants_contact: true,
    rating: 2,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "alta",
      topic: "higiene_tienda",
      risk: "reputacional",
      summary: "Cliente reporta mal olor en tienda y mala impresión general."
    }
  },
  {
    case_id: "case_seed_003",
    status: "open",
    priority: "critical",
    route: ["sac", "gerencia"],
    has_reply: false,
    source: "seed",
    external_id: "seed_003",
    type_selected: "reclamo",
    store_id: "alto_las_condes",
    seller: "",
    message: "Me sentí discriminada por la forma en que me trataron.",
    customer: { email: "cliente3@test.com", phone: "" },
    wants_contact: true,
    rating: 1,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "critica",
      topic: "atencion",
      risk: "legal",
      summary: "Cliente reporta posible trato discriminatorio en tienda."
    }
  },
  {
    case_id: "case_seed_004",
    status: "open",
    priority: "low",
    route: ["registro"],
    has_reply: false,
    source: "seed",
    external_id: "seed_004",
    type_selected: "sugerencia",
    store_id: "costanera_center",
    seller: "",
    message: "Sería bueno tener más testers disponibles.",
    customer: { email: "", phone: "" },
    wants_contact: false,
    rating: 5,
    classification: {
      classification_version: "v1",
      intent: "sugerencia",
      urgency: "baja",
      topic: "producto",
      risk: "operacional",
      summary: "Cliente sugiere aumentar disponibilidad de testers."
    }
  },
  {
    case_id: "case_seed_005",
    status: "open",
    priority: "low",
    route: ["registro"],
    has_reply: false,
    source: "seed",
    external_id: "seed_005",
    type_selected: "felicitacion",
    store_id: "plaza_egana",
    seller: "marcela",
    message: "Marcela me atendió excelente y encontró justo lo que necesitaba.",
    customer: { email: "", phone: "" },
    wants_contact: false,
    rating: 7,
    classification: {
      classification_version: "v1",
      intent: "felicitacion",
      urgency: "baja",
      topic: "atencion",
      risk: "ninguno",
      summary: "Cliente felicita atención de vendedora Marcela."
    }
  },
  {
    case_id: "case_seed_006",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_006",
    type_selected: "reclamo",
    store_id: "alto_las_condes",
    seller: "",
    message: "No tenían stock del producto que fui a buscar.",
    customer: { email: "cliente6@test.com", phone: "" },
    wants_contact: true,
    rating: 4,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "media",
      topic: "stock",
      risk: "operacional",
      summary: "Cliente reclama falta de stock del producto buscado."
    }
  },
  {
    case_id: "case_seed_007",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_007",
    type_selected: "consulta",
    store_id: "plaza_vespucio",
    seller: "",
    message: "Quiero saber si puedo cambiar un producto comprado ayer.",
    customer: { email: "cliente7@test.com", phone: "" },
    wants_contact: true,
    rating: 5,
    classification: {
      classification_version: "v1",
      intent: "consulta",
      urgency: "media",
      topic: "postventa",
      risk: "operacional",
      summary: "Cliente consulta por cambio de producto comprado recientemente."
    }
  },
  {
    case_id: "case_seed_008",
    status: "open",
    priority: "high",
    route: ["sac", "jefe_tienda"],
    has_reply: false,
    source: "seed",
    external_id: "seed_008",
    type_selected: "reclamo",
    store_id: "plaza_egana",
    seller: "",
    message: "Me cobraron un precio distinto al publicado.",
    customer: { email: "cliente8@test.com", phone: "" },
    wants_contact: true,
    rating: 2,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "alta",
      topic: "precio",
      risk: "legal",
      summary: "Cliente reclama diferencia entre precio cobrado y precio publicado."
    }
  },
  {
    case_id: "case_seed_009",
    status: "open",
    priority: "low",
    route: ["registro"],
    has_reply: false,
    source: "seed",
    external_id: "seed_009",
    type_selected: "felicitacion",
    store_id: "costanera_center",
    seller: "javiera",
    message: "Muy buena atención, rápida y amable.",
    customer: { email: "", phone: "" },
    wants_contact: false,
    rating: 7,
    classification: {
      classification_version: "v1",
      intent: "felicitacion",
      urgency: "baja",
      topic: "atencion",
      risk: "ninguno",
      summary: "Cliente destaca atención rápida y amable."
    }
  },
  {
    case_id: "case_seed_010",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_010",
    type_selected: "reclamo",
    store_id: "alto_las_condes",
    seller: "",
    message: "Esperé demasiado en caja para pagar.",
    customer: { email: "cliente10@test.com", phone: "" },
    wants_contact: true,
    rating: 3,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "media",
      topic: "tiempo_espera",
      risk: "operacional",
      summary: "Cliente reclama demora excesiva en caja."
    }
  },
  {
    case_id: "case_seed_011",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_011",
    type_selected: "reclamo",
    store_id: "plaza_vespucio",
    seller: "",
    message: "El producto venía abierto y nadie me dio solución clara.",
    customer: { email: "cliente11@test.com", phone: "" },
    wants_contact: true,
    rating: 2,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "media",
      topic: "producto",
      risk: "operacional",
      summary: "Cliente reclama producto abierto y falta de solución clara."
    }
  },
  {
    case_id: "case_seed_012",
    status: "open",
    priority: "critical",
    route: ["sac", "gerencia"],
    has_reply: false,
    source: "seed",
    external_id: "seed_012",
    type_selected: "reclamo",
    store_id: "costanera_center",
    seller: "",
    message: "Me caí porque había producto derramado en el piso.",
    customer: { email: "cliente12@test.com", phone: "" },
    wants_contact: true,
    rating: 1,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "critica",
      topic: "higiene_tienda",
      risk: "seguridad",
      summary: "Cliente reporta caída por producto derramado en el piso."
    }
  }
];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  try {
    const token = req.headers["x-seed-token"];

    if (!process.env.DEV_SEED_TOKEN || token !== process.env.DEV_SEED_TOKEN) {
      return res.status(401).json({ ok: false, error: "Unauthorized" });
    }

    const now = new Date().toISOString();

    const cases = SEED_CASES.map((item) => ({
      ...item,
      messages: [],
      audit: { source: "seed" },
      created_at: now,
      updated_at: now
    }));

    for (const item of cases) {
      await saveCase(item);
    }

    return res.status(200).json({
      ok: true,
      inserted: cases.length,
      case_ids: cases.map((item) => item.case_id)
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}
