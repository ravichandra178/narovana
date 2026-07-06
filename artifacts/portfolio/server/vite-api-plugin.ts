import type { Plugin, PreviewServer, ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "node:http";
import { dispatchJsonRequest } from "./http";
import { handleContactSubmission, handleVisitorSubmission } from "./endpoints";

function routeApiRequest() {
  return async (request: IncomingMessage, response: ServerResponse, next: () => void) => {
    const pathname = request.url ? new URL(request.url, "http://localhost").pathname : "";

    if (pathname === "/api/contact") {
      await dispatchJsonRequest(request, response, handleContactSubmission);
      return;
    }

    if (pathname === "/api/visitor") {
      await dispatchJsonRequest(request, response, handleVisitorSubmission);
      return;
    }

    next();
  };
}

/**
 * Register the serverless endpoints during local Vite development and preview.
 */
export function apiEndpointPlugin(): Plugin {
  const middleware = routeApiRequest();

  return {
    name: "portfolio-api-endpoints",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use(middleware);
    },
  };
}
