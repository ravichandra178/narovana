import { useEffect } from "react";
import { buildVisitorSubmission } from "@/lib/visitorTracking";

const SESSION_KEY = "portfolio:visitor-tracking-sent";

/**
 * Sends one background visitor event per browser session without blocking render.
 */
export function useVisitorTracking(): void {
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      if (window.sessionStorage.getItem(SESSION_KEY)) {
        return;
      }

      window.sessionStorage.setItem(SESSION_KEY, "pending");
    } catch {
      // Session storage may be blocked; the request can still run once per load.
    }

    const schedule = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 0));

    schedule(() => {
      void fetch("/api/visitor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buildVisitorSubmission()),
        keepalive: true,
      }).catch(() => {
        // Fail silently by design.
      });
    });
  }, []);
}
