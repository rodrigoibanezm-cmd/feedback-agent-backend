// /lib/notifications/sendTicketAlert.js

function buildSubject(caseData) {
  const priority = caseData.priority || "unknown";
  const intent = caseData.classification?.intent || caseData.type_selected || "ticket";
  const store = caseData.store_id || "sin_tienda";

  return `[${priority}] Nuevo ${intent} - ${store}`;
}

function buildBody(caseData) {
  const agentUrl = process.env.AGENT_URL || "";

  return `
Nuevo ticket recibido

ID: ${caseData.case_id}
Tipo seleccionado: ${caseData.type_selected}
Intención detectada: ${caseData.classification?.intent || ""}
Urgencia: ${caseData.classification?.urgency || ""}
Prioridad: ${caseData.priority}
Riesgo: ${caseData.classification?.risk || ""}
Tienda: ${caseData.store_id}
Tema: ${caseData.classification?.topic || ""}
Nota: ${caseData.rating ?? ""}
Contacto solicitado: ${caseData.wants_contact ? "sí" : "no"}
Email cliente: ${caseData.customer?.email || ""}

Resumen:
${caseData.classification?.summary || ""}

Mensaje:
"${caseData.message || ""}"

Agente:
${agentUrl}

Para revisar el caso:
1. Abre el agente
2. Pega este ID: ${caseData.case_id}
`.trim();
}

export async function sendTicketAlert(caseData) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.ALERT_FROM_EMAIL;
  const to = process.env.ALERT_TO_EMAIL;

  if (!apiKey || !from || !to) {
    throw new Error("Faltan variables SendGrid");
  }

  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: to }]
        }
      ],
      from: {
        email: from,
        name: "Beauty Plus Feedback"
      },
      subject: buildSubject(caseData),
      content: [
        {
          type: "text/plain",
          value: buildBody(caseData)
        }
      ]
    })
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SendGrid error ${res.status}: ${text}`);
  }

  return true;
}
