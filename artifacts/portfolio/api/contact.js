import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(body));
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      if (!body.trim()) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Malformed JSON request body."));
      }
    });

    request.on("error", reject);
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildHtml(submission, timestamp) {
  const rows = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Phone", submission.phone],
    ["Company", submission.company],
    ["Subject", submission.subject],
    ["Timestamp", timestamp],
  ];

  const tableRows = rows
    .map(([label, value]) => `
      <tr>
        <td style="padding:8px 12px 8px 0;font-weight:600;color:#111827;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;color:#374151;">${escapeHtml(value || "Not provided")}</td>
      </tr>
    `)
    .join("");

  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <div style="max-width:760px;margin:0 auto;padding:32px 20px;">
          <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;padding:28px;box-shadow:0 12px 30px rgba(17,24,39,0.08);">
            <h1 style="margin:0 0 24px;font-size:24px;line-height:1.2;">New Contact Form Submission</h1>
            <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
              ${tableRows}
            </table>
            <div style="margin-top:24px;padding:16px;border:1px solid #e5e7eb;border-radius:16px;background:#f9fafb;white-space:pre-wrap;line-height:1.65;">
              ${escapeHtml(submission.message || "")}
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    sendJson(response, 405, { ok: false, error: "Method not allowed." });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();
    const subject = String(body.subject || "Website contact").trim();

    if (!name || !email || !message) {
      sendJson(response, 400, { ok: false, error: "Missing required fields." });
      return;
    }

    const timestamp = new Date().toISOString();
    const html = buildHtml({
      name,
      email,
      phone: String(body.phone || ""),
      company: String(body.company || ""),
      subject,
      message,
    }, timestamp);

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Narovana Portfolio <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL,
      subject: `Website Contact: ${subject}`,
      html,
      replyTo: email,
    });

    if (error) {
      sendJson(response, 502, { ok: false, error: error.message || "Unable to deliver the email." });
      return;
    }

    sendJson(response, 200, { ok: true, message: "Message sent successfully." });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    const status = message === "Malformed JSON request body." ? 400 : 500;
    sendJson(response, status, { ok: false, error: message });
  }
}
