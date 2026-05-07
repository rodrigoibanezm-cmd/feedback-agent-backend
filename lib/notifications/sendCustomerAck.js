// /lib/notifications/sendCustomerAck.js

function buildSubject(caseData) {
  return `Recibimos tu caso ${caseData.case_id}`;
}

function buildBody(caseData) {
  return `
Hola,

Gracias por escribirnos.

Recibimos tu caso y ya está siendo revisado por nuestro equipo. Nos comunicaremos contigo pronto.

Si tienes otra consulta o quieres agregar información, puedes responder directamente este correo.

ID de caso: ${caseData.case_id}

Equipo Beauty Plus
`.trim();
}

export async function sendCustomerAck(caseData) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.CUSTOMER_FROM_EMAIL || process.env.ALERT_FROM_EMAIL;
  const to = caseData.customer?.email;

  if (!apiKey || !from) {
    throw new Error("Faltan variables SendGrid");
  }

  if (!caseData.wants_contact || !to) {
    return false;
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
        name: "Beauty Plus"
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
