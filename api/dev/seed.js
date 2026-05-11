// /api/dev/seed.js

import { saveCase } from "../../lib/storage/casesStore.js";

const STORES = [
  { store_id: "mall_plaza_la_serena", store_name: "Mall Plaza La Serena" },
  { store_id: "cenco_belloto", store_name: "Cenco Belloto" },
  { store_id: "mall_marina", store_name: "Mall Marina" },
  { store_id: "cenco_florida", store_name: "Cenco Florida" },
  { store_id: "mall_plaza_vespucio", store_name: "Mall Plaza Vespucio" },
  { store_id: "outlet_estado", store_name: "Outlet Estado" },
  { store_id: "mall_plaza_egana", store_name: "Mall Plaza Egaña" },
  { store_id: "patio_outlet_la_florida", store_name: "Patio Outlet La Florida" },
  { store_id: "cenco_costanera", store_name: "Cenco Costanera" },
  { store_id: "patio_outlet_maipu", store_name: "Patio Outlet Maipú" },
  { store_id: "mall_vivo_outlet_parque_los_toros", store_name: "Mall Vivo Outlet Parque los Toros" },
  { store_id: "mall_arauco_maipu", store_name: "Mall Arauco Maipú" },
  { store_id: "cenco_alto_las_condes", store_name: "Cenco Alto Las Condes" },
  { store_id: "cenco_rancagua", store_name: "Cenco Rancagua" },
  { store_id: "mall_curico", store_name: "Mall Curicó" },
  { store_id: "espacio_urbano_de_linares", store_name: "Espacio Urbano de Linares" },
  { store_id: "mall_portal_centro_talca", store_name: "Mall Portal Centro- Talca" },
  { store_id: "mall_del_centro_concepcion", store_name: "Mall del centro Concepción" },
  { store_id: "mall_paseo_valdivia", store_name: "Mall Paseo Valdivia" },
  { store_id: "cenco_osorno", store_name: "Cenco Osorno" },
  { store_id: "mall_paseo_costanera_puerto_montt", store_name: "Mall Paseo Costanera- Puerto Montt" }
];

const SELLERS = [
  "carla",
  "marcela",
  "javiera",
  "camila",
  "paula",
  "valentina",
  "fernanda",
  "isidora",
  "daniela",
  "catalina"
];

const CASE_TEMPLATES = [
  {
    type_selected: "reclamo",
    priority: "medium",
    route: ["sac"],
    seller: "",
    message: "Esperé mucho tiempo y nadie me ayudó con los productos.",
    wants_contact: true,
    rating: 3,
    classification: {
      urgency: "media",
      topic: "atencion",
      risk: "reputacional",
      summary: "Cliente reclama demora y falta de apoyo en tienda."
    }
  },
  {
    type_selected: "reclamo",
    priority: "high",
    route: ["sac", "jefe_tienda"],
    seller: "",
    message: "Me cobraron un precio distinto al publicado en la góndola.",
    wants_contact: true,
    rating: 2,
    classification: {
      urgency: "alta",
      topic: "precio",
      risk: "legal",
      summary: "Cliente reclama diferencia entre precio cobrado y precio publicado."
    }
  },
  {
    type_selected: "reclamo",
    priority: "medium",
    route: ["sac"],
    seller: "",
    message: "No tenían stock del producto que fui a buscar, aunque aparecía disponible.",
    wants_contact: true,
    rating: 3,
    classification: {
      urgency: "media",
      topic: "stock",
      risk: "operacional",
      summary: "Cliente reclama inconsistencia entre disponibilidad informada y stock real."
    }
  },
  {
    type_selected: "reclamo",
    priority: "critical",
    route: ["sac", "gerencia"],
    seller: "",
    message: "Me resbalé porque había producto derramado en el piso.",
    wants_contact: true,
    rating: 1,
    classification: {
      urgency: "critica",
      topic: "higiene_tienda",
      risk: "seguridad",
      summary: "Cliente reporta caída por producto derramado en el piso."
    }
  },
  {
    type_selected: "reclamo",
    priority: "high",
    route: ["sac", "jefe_tienda"],
    seller: "",
    message: "La vendedora me respondió de mala forma cuando pedí ayuda.",
    wants_contact: true,
    rating: 2,
    classification: {
      urgency: "alta",
      topic: "atencion",
      risk: "reputacional",
      summary: "Cliente reclama mal trato durante la atención en tienda."
    }
  },
  {
    type_selected: "felicitacion",
    priority: "low",
    route: ["registro"],
    seller: "seller",
    message: "La atención fue excelente, rápida y muy amable.",
    wants_contact: false,
    rating: 7,
    classification: {
      urgency: "baja",
      topic: "atencion",
      risk: "ninguno",
      summary: "Cliente destaca atención rápida y amable."
    }
  },
  {
    type_selected: "felicitacion",
    priority: "low",
    route: ["registro"],
    seller: "seller",
    message: "Me explicaron muy bien las diferencias entre productos y pude comprar segura.",
    wants_contact: false,
    rating: 7,
    classification: {
      urgency: "baja",
      topic: "atencion",
      risk: "ninguno",
      summary: "Cliente felicita asesoría clara y buena orientación de compra."
    }
  },
  {
    type_selected: "sugerencia",
    priority: "low",
    route: ["registro"],
    seller: "",
    message: "Sería bueno tener más testers disponibles y en mejor estado.",
    wants_contact: false,
    rating: 6,
    classification: {
      urgency: "baja",
      topic: "producto",
      risk: "operacional",
      summary: "Cliente sugiere mejorar disponibilidad y estado de testers."
    }
  },
  {
    type_selected: "sugerencia",
    priority: "low",
    route: ["registro"],
    seller: "",
    message: "Podrían separar mejor los productos en oferta para encontrarlos más rápido.",
    wants_contact: false,
    rating: 6,
    classification: {
      urgency: "baja",
      topic: "producto",
      risk: "operacional",
      summary: "Cliente sugiere mejorar orden y señalización de productos en oferta."
    }
  },
  {
    type_selected: "consulta",
    priority: "medium",
    route: ["sac"],
    seller: "",
    message: "Quiero saber si puedo cambiar un producto comprado ayer.",
    wants_contact: true,
    rating: 5,
    classification: {
      urgency: "media",
      topic: "postventa",
      risk: "operacional",
      summary: "Cliente consulta por cambio de producto comprado recientemente."
    }
  }
];

function padSeedId(value) {
  return String(value).padStart(3, "0");
}

function buildSeedCases() {
  let counter = 1;

  return STORES.flatMap((store, storeIndex) =>
    CASE_TEMPLATES.map((template, templateIndex) => {
      const seedNumber = padSeedId(counter++);
      const seller = template.seller === "seller"
        ? SELLERS[(storeIndex + templateIndex) % SELLERS.length]
        : template.seller;

      return {
        case_id: `case_seed_${seedNumber}`,
        status: "open",
        priority: template.priority,
        route: template.route,
        has_reply: false,
        source: "seed",
        external_id: `seed_${seedNumber}`,
        type_selected: template.type_selected,
        store_id: store.store_id,
        store_name: store.store_name,
        seller,
        message: template.message,
        customer: template.wants_contact
          ? { email: `cliente${seedNumber}@test.com`, phone: "" }
          : { email: "", phone: "" },
        wants_contact: template.wants_contact,
        rating: template.rating,
        classification: {
          classification_version: "v1",
          intent: template.type_selected,
          urgency: template.classification.urgency,
          topic: template.classification.topic,
          risk: template.classification.risk,
          summary: template.classification.summary
        }
      };
    })
  );
}

const SEED_CASES = buildSeedCases();

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
      stores: STORES.length,
      cases_per_store: CASE_TEMPLATES.length,
      case_ids: cases.map((item) => item.case_id)
    });

  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message
    });
  }
}
