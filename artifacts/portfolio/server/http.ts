import type { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "node:http";
import type { EndpointContext, EndpointResult } from "./types.js";

/**
 * Read the raw request body once so the same logic can run in Vercel functions
 * and in the local Vite dev middleware.
 */
export async function readRequestText(request: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf8");
}

export function parseJsonBody(bodyText: string): unknown {
  if (!bodyText.trim()) {
    return {};
  }

  try {
    return JSON.parse(bodyText);
  } catch {
    throw new Error("Malformed JSON request body.");
  }
}

export function normalizeHeaderValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function getRequestIp(headers: IncomingHttpHeaders, remoteAddress?: string | null): string {
  const forwardedFor = normalizeHeaderValue(headers["x-forwarded-for"]);

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = normalizeHeaderValue(headers["x-real-ip"]);
  if (realIp) {
    return realIp.trim();
  }

  return remoteAddress?.trim() || "unknown";
}

export function getRequestUserAgent(headers: IncomingHttpHeaders): string {
  return normalizeHeaderValue(headers["user-agent"])?.trim() || "unknown";
}

export function toStringOrEmpty(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatLabelValue(label: string, value: string | undefined): string {
  return `
    <tr>
      <td style="padding:8px 12px 8px 0;font-weight:600;color:#111827;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
      <td style="padding:8px 0;color:#374151;">${escapeHtml(value || "Not provided")}</td>
    </tr>
  `;
}

export function formatSection(title: string, content: string): string {
  return `
    <section style="margin:0 0 24px;">
      <h2 style="margin:0 0 12px;font-size:18px;line-height:1.3;color:#111827;">${escapeHtml(title)}</h2>
      ${content}
    </section>
  `;
}

export function writeJsonResponse(response: ServerResponse, result: EndpointResult): void {
  response.statusCode = result.status;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(result.body));
}

export async function dispatchJsonRequest(
  request: IncomingMessage,
  response: ServerResponse,
  handler: (context: EndpointContext) => Promise<EndpointResult>,
): Promise<void> {
  try {
    const bodyText = await readRequestText(request);
    const headers = request.headers;
    const body = parseJsonBody(bodyText);

    const result = await handler({
      method: request.method ?? "GET",
      headers,
      body,
      ip: getRequestIp(headers, request.socket.remoteAddress),
      userAgent: getRequestUserAgent(headers),
    });

    writeJsonResponse(response, result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error.";
    const status = message === "Malformed JSON request body." ? 400 : 500;
    writeJsonResponse(response, {
      status,
      body: { ok: false, error: message },
    });
  }
}
