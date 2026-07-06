import { z } from "zod";
import type { ContactSubmission, EndpointContext, EndpointResult, GeoLocation, VisitorSubmission } from "./types.js";
import { escapeHtml, formatLabelValue, formatSection } from "./http.js";
import { sendAdminEmail } from "./email.js";

const optionalText = (maxLength: number) => z.string().trim().max(maxLength).optional().default("");

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: optionalText(50),
  company: optionalText(120),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(5000),
  website: z.string().trim().max(0).optional().default(""),
});

const visitorSchema = z.object({
  pageUrl: z.string().url().max(2048),
  referrer: z.string().max(2048),
  language: z.string().trim().min(1).max(32),
  timeZone: z.string().trim().min(1).max(64),
  platform: z.string().trim().min(1).max(80),
  screenResolution: z.string().regex(/^\d+x\d+$/),
  viewportSize: z.string().regex(/^\d+x\d+$/),
  devicePixelRatio: z.number().positive().max(10),
  deviceType: z.enum(["desktop", "mobile", "tablet"]),
  colorScheme: z.enum(["light", "dark"]),
  cookiesEnabled: z.boolean(),
  touchSupport: z.boolean(),
});

interface LocationParts {
  country?: string;
  region?: string;
  city?: string;
  timeZone?: string;
  isp?: string;
  asn?: string;
}

function getRequestTimestamp(): string {
  return new Date().toISOString();
}

function buildTable(rows: string[]): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
      ${rows.join("")}
    </table>
  `;
}

function buildHtmlDocument(title: string, body: string): string {
  return `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <div style="max-width:760px;margin:0 auto;padding:32px 20px;">
          <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:20px;padding:28px;box-shadow:0 12px 30px rgba(17,24,39,0.08);">
            <h1 style="margin:0 0 24px;font-size:24px;line-height:1.2;">${escapeHtml(title)}</h1>
            ${body}
          </div>
        </div>
      </body>
    </html>
  `;
}

function formatContactHtml(submission: ContactSubmission, timestamp: string): string {
  const sections = [
    formatSection(
      "Visitor Information",
      buildTable([
        formatLabelValue("Name", submission.name),
        formatLabelValue("Email", submission.email),
        formatLabelValue("Phone", submission.phone),
        formatLabelValue("Company", submission.company),
        formatLabelValue("Subject", submission.subject),
        formatLabelValue("Timestamp", timestamp),
      ]),
    ),
    formatSection(
      "Message",
      `<div style="white-space:pre-wrap;line-height:1.65;color:#374151;background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:16px;">${escapeHtml(submission.message)}</div>`,
    ),
  ];

  return buildHtmlDocument("New Contact Form Submission", sections.join(""));
}

function formatLocation(location: LocationParts): string {
  const parts = [location.city, location.region, location.country].filter(Boolean).join(", ");
  const details = [parts || undefined, location.timeZone, location.isp, location.asn ? `ASN ${location.asn}` : undefined].filter(Boolean);

  return details.length > 0 ? details.join(" | ") : "Not available";
}

function formatVisitorHtml(submission: VisitorSubmission, timestamp: string, ip: string, location: LocationParts): string {
  const sections = [
    formatSection(
      "Visitor Information",
      buildTable([
        formatLabelValue("Timestamp", timestamp),
        formatLabelValue("IP Address", ip),
        formatLabelValue("Country", location.country),
        formatLabelValue("Region", location.region),
        formatLabelValue("City", location.city),
        formatLabelValue("Time Zone", location.timeZone),
        formatLabelValue("ISP / ASN", [location.isp, location.asn ? `ASN ${location.asn}` : undefined].filter(Boolean).join(" | ") || undefined),
      ]),
    ),
    formatSection(
      "Approximate Location",
      `<p style="margin:0;line-height:1.7;color:#374151;">${escapeHtml(formatLocation(location))}</p>`,
    ),
    formatSection(
      "Browser Information",
      buildTable([
        formatLabelValue("Page URL", submission.pageUrl),
        formatLabelValue("Referrer", submission.referrer || undefined),
        formatLabelValue("Language", submission.language),
        formatLabelValue("Time Zone", submission.timeZone),
        formatLabelValue("Platform", submission.platform),
        formatLabelValue("Color Scheme", submission.colorScheme),
        formatLabelValue("Cookies Enabled", submission.cookiesEnabled ? "Yes" : "No"),
      ]),
    ),
    formatSection(
      "Device Information",
      buildTable([
        formatLabelValue("Device Type", submission.deviceType),
        formatLabelValue("Touch Support", submission.touchSupport ? "Yes" : "No"),
        formatLabelValue("Device Pixel Ratio", submission.devicePixelRatio.toString()),
      ]),
    ),
    formatSection(
      "Display Information",
      buildTable([
        formatLabelValue("Screen Resolution", submission.screenResolution),
        formatLabelValue("Viewport Size", submission.viewportSize),
      ]),
    ),
    formatSection(
      "Visit Information",
      buildTable([
        formatLabelValue("URL", submission.pageUrl),
        formatLabelValue("Referrer", submission.referrer || undefined),
      ]),
    ),
  ];

  return buildHtmlDocument("New Website Visitor", sections.join(""));
}

async function fetchGeoLocation(ip: string): Promise<LocationParts> {
  if (!ip || ip === "unknown" || ip === "127.0.0.1" || ip === "::1") {
    return {};
  }

  const controller = new AbortController();
  const timeout = globalThis.setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {};
    }

    const payload = await response.json() as {
      success?: boolean;
      country?: string;
      region?: string;
      city?: string;
      timezone?: { id?: string };
      connection?: { isp?: string; asn?: string | number };
    };

    if (payload.success === false) {
      return {};
    }

    return {
      country: payload.country,
      region: payload.region,
      city: payload.city,
      timeZone: payload.timezone?.id,
      isp: payload.connection?.isp,
      asn: payload.connection?.asn ? String(payload.connection.asn) : undefined,
    };
  } catch {
    return {};
  } finally {
    clearTimeout(timeout);
  }
}

export async function handleContactSubmission(context: EndpointContext): Promise<EndpointResult> {
  if (context.method !== "POST") {
    return { status: 405, body: { ok: false, error: "Method not allowed." } };
  }

  const parsed = contactSchema.safeParse(context.body);
  if (!parsed.success) {
    return { status: 400, body: { ok: false, error: "Malformed contact submission." } };
  }

  const submission = parsed.data as ContactSubmission;
  if (submission.website) {
    return { status: 400, body: { ok: false, error: "Submission rejected." } };
  }

  const timestamp = getRequestTimestamp();
  const html = formatContactHtml(submission, timestamp);

  try {
    await sendAdminEmail(
      `Website Contact: ${submission.subject}`,
      html,
      submission.email,
    );
  } catch (error) {
    return {
      status: 502,
      body: {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to deliver the email.",
      },
    };
  }

  return {
    status: 200,
    body: { ok: true, message: "Message sent successfully." },
  };
}

export async function handleVisitorSubmission(context: EndpointContext): Promise<EndpointResult> {
  if (context.method !== "POST") {
    return { status: 405, body: { ok: false, error: "Method not allowed." } };
  }

  const parsed = visitorSchema.safeParse(context.body);
  if (!parsed.success) {
    return { status: 400, body: { ok: false, error: "Malformed visitor payload." } };
  }

  const submission = parsed.data as VisitorSubmission;
  const timestamp = getRequestTimestamp();
  const location = await fetchGeoLocation(context.ip);
  const html = formatVisitorHtml(submission, timestamp, context.ip, location);

  try {
    await sendAdminEmail("New Website Visitor", html);
  } catch (error) {
    return {
      status: 502,
      body: {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to deliver the email.",
      },
    };
  }

  return {
    status: 200,
    body: { ok: true },
  };
}
