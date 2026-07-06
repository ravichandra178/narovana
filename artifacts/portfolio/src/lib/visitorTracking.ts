import type { VisitorSubmission } from "../../server/types";

const deviceTypeBreakpoints = {
  mobile: 640,
  tablet: 1024,
} as const;

function getViewportSize(): string {
  return `${window.innerWidth}x${window.innerHeight}`;
}

function getDeviceType(): VisitorSubmission["deviceType"] {
  const width = window.innerWidth;
  const hasTouch = navigator.maxTouchPoints > 0 || "ontouchstart" in window;

  if (width <= deviceTypeBreakpoints.mobile || /Mobi|Android/i.test(navigator.userAgent)) {
    return "mobile";
  }

  if (width <= deviceTypeBreakpoints.tablet || hasTouch) {
    return "tablet";
  }

  return "desktop";
}

export function buildVisitorSubmission(): VisitorSubmission {
  const platform = navigator.userAgentData?.platform ?? navigator.platform ?? "Unknown";
  const language = navigator.language || navigator.languages[0] || "unknown";

  return {
    pageUrl: window.location.href,
    referrer: document.referrer,
    language,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    platform,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    viewportSize: getViewportSize(),
    devicePixelRatio: window.devicePixelRatio || 1,
    deviceType: getDeviceType(),
    colorScheme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
    cookiesEnabled: navigator.cookieEnabled,
    touchSupport: navigator.maxTouchPoints > 0 || "ontouchstart" in window,
  };
}
