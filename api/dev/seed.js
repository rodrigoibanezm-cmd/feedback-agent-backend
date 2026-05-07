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
  },
  {
    case_id: "case_seed_013",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_013",
    type_selected: "reclamo",
    store_id: "costanera_center",
    seller: "",
    message: "Pregunté por una base y la vendedora me respondió de mala forma.",
    customer: { email: "cliente13@test.com", phone: "" },
    wants_contact: true,
    rating: 2,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "media",
      topic: "atencion",
      risk: "reputacional",
      summary: "Cliente reclama mala forma en la atención al consultar por un producto."
    }
  },
  {
    case_id: "case_seed_014",
    status: "open",
    priority: "high",
    route: ["sac", "jefe_tienda"],
    has_reply: false,
    source: "seed",
    external_id: "seed_014",
    type_selected: "reclamo",
    store_id: "plaza_vespucio",
    seller: "",
    message: "Había cajas en el pasillo y costaba pasar con coche de guagua.",
    customer: { email: "cliente14@test.com", phone: "" },
    wants_contact: true,
    rating: 2,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "alta",
      topic: "higiene_tienda",
      risk: "seguridad",
      summary: "Cliente reporta obstrucción de pasillo con riesgo operacional y de seguridad."
    }
  },
  {
    case_id: "case_seed_015",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_015",
    type_selected: "reclamo",
    store_id: "plaza_egana",
    seller: "",
    message: "La promoción decía 2x1, pero en caja no me la respetaron.",
    customer: { email: "cliente15@test.com", phone: "" },
    wants_contact: true,
    rating: 3,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "media",
      topic: "precio",
      risk: "reputacional",
      summary: "Cliente reclama que no se respetó una promoción informada en tienda."
    }
  },
  {
    case_id: "case_seed_016",
    status: "open",
    priority: "low",
    route: ["registro"],
    has_reply: false,
    source: "seed",
    external_id: "seed_016",
    type_selected: "sugerencia",
    store_id: "alto_las_condes",
    seller: "",
    message: "Sería útil que indiquen mejor cuáles productos son cruelty free.",
    customer: { email: "", phone: "" },
    wants_contact: false,
    rating: 6,
    classification: {
      classification_version: "v1",
      intent: "sugerencia",
      urgency: "baja",
      topic: "producto",
      risk: "operacional",
      summary: "Cliente sugiere mejorar señalización de productos cruelty free."
    }
  },
  {
    case_id: "case_seed_017",
    status: "open",
    priority: "low",
    route: ["registro"],
    has_reply: false,
    source: "seed",
    external_id: "seed_017",
    type_selected: "felicitacion",
    store_id: "alto_las_condes",
    seller: "paula",
    message: "Paula me explicó muy bien las diferencias entre productos y fue muy amable.",
    customer: { email: "", phone: "" },
    wants_contact: false,
    rating: 7,
    classification: {
      classification_version: "v1",
      intent: "felicitacion",
      urgency: "baja",
      topic: "atencion",
      risk: "ninguno",
      summary: "Cliente felicita asesoría clara y atención amable de Paula."
    }
  },
  {
    case_id: "case_seed_018",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_018",
    type_selected: "consulta",
    store_id: "costanera_center",
    seller: "",
    message: "Compré un producto online y quiero saber si puedo retirarlo en esta tienda.",
    customer: { email: "cliente18@test.com", phone: "" },
    wants_contact: true,
    rating: 5,
    classification: {
      classification_version: "v1",
      intent: "consulta",
      urgency: "media",
      topic: "postventa",
      risk: "operacional",
      summary: "Cliente consulta por retiro en tienda de una compra online."
    }
  },
  {
    case_id: "case_seed_019",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_019",
    type_selected: "reclamo",
    store_id: "plaza_vespucio",
    seller: "",
    message: "Fui por un labial que aparecía disponible, pero no había stock en sala.",
    customer: { email: "cliente19@test.com", phone: "" },
    wants_contact: true,
    rating: 3,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "media",
      topic: "stock",
      risk: "operacional",
      summary: "Cliente reclama inconsistencia entre disponibilidad informada y stock en sala."
    }
  },
  {
    case_id: "case_seed_020",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_020",
    type_selected: "reclamo",
    store_id: "plaza_egana",
    seller: "",
    message: "Había una sola caja funcionando y la fila avanzaba muy lento.",
    customer: { email: "cliente20@test.com", phone: "" },
    wants_contact: true,
    rating: 3,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "media",
      topic: "tiempo_espera",
      risk: "operacional",
      summary: "Cliente reclama demora en caja por baja capacidad de atención."
    }
  },
  {
    case_id: "case_seed_021",
    status: "open",
    priority: "critical",
    route: ["sac", "gerencia"],
    has_reply: false,
    source: "seed",
    external_id: "seed_021",
    type_selected: "reclamo",
    store_id: "plaza_egana",
    seller: "",
    message: "Una repisa estaba suelta y se cayó un producto cerca de mi hija.",
    customer: { email: "cliente21@test.com", phone: "" },
    wants_contact: true,
    rating: 1,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "critica",
      topic: "higiene_tienda",
      risk: "seguridad",
      summary: "Cliente reporta posible riesgo de seguridad por repisa suelta en tienda."
    }
  },
  {
    case_id: "case_seed_022",
    status: "open",
    priority: "low",
    route: ["registro"],
    has_reply: false,
    source: "seed",
    external_id: "seed_022",
    type_selected: "felicitacion",
    store_id: "costanera_center",
    seller: "camila",
    message: "Camila me ayudó a elegir rápido y fue muy clara con las promociones.",
    customer: { email: "", phone: "" },
    wants_contact: false,
    rating: 7,
    classification: {
      classification_version: "v1",
      intent: "felicitacion",
      urgency: "baja",
      topic: "atencion",
      risk: "ninguno",
      summary: "Cliente felicita atención rápida y claridad sobre promociones."
    }
  },
  {
    case_id: "case_seed_023",
    status: "open",
    priority: "low",
    route: ["registro"],
    has_reply: false,
    source: "seed",
    external_id: "seed_023",
    type_selected: "sugerencia",
    store_id: "plaza_vespucio",
    seller: "",
    message: "Podrían tener un sector separado para productos en oferta.",
    customer: { email: "", phone: "" },
    wants_contact: false,
    rating: 6,
    classification: {
      classification_version: "v1",
      intent: "sugerencia",
      urgency: "baja",
      topic: "producto",
      risk: "operacional",
      summary: "Cliente sugiere separar productos en oferta para facilitar la compra."
    }
  },
  {
    case_id: "case_seed_024",
    status: "open",
    priority: "medium",
    route: ["sac"],
    has_reply: false,
    source: "seed",
    external_id: "seed_024",
    type_selected: "reclamo",
    store_id: "alto_las_condes",
    seller: "",
    message: "El tester estaba seco y la vendedora no supo ofrecer otra alternativa.",
    customer: { email: "cliente24@test.com", phone: "" },
    wants_contact: true,
    rating: 3,
    classification: {
      classification_version: "v1",
      intent: "reclamo",
      urgency: "media",
      topic: "producto",
      risk: "operacional",
      summary: "Cliente reclama tester en mal estado y falta de alternativa en atención."
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
