export interface EndpointContext {
  method: string;
  headers: Record<string, string | string[] | undefined>;
  body: unknown;
  ip: string;
  userAgent: string;
}

export interface EndpointResult {
  status: number;
  body: Record<string, unknown>;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  website?: string;
}

export interface VisitorSubmission {
  pageUrl: string;
  referrer: string;
  language: string;
  timeZone: string;
  platform: string;
  screenResolution: string;
  viewportSize: string;
  devicePixelRatio: number;
  deviceType: "desktop" | "mobile" | "tablet";
  colorScheme: "light" | "dark";
  cookiesEnabled: boolean;
  touchSupport: boolean;
}

export interface GeoLocation {
  country?: string;
  region?: string;
  city?: string;
  timeZone?: string;
  isp?: string;
  asn?: string;
}
