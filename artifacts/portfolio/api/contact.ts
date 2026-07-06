import type { IncomingMessage, ServerResponse } from "node:http";
import { dispatchJsonRequest } from "../server/http.js";
import { handleContactSubmission } from "../server/endpoints.js";

export default function contactHandler(
  request: IncomingMessage,
  response: ServerResponse,
): void {
  void dispatchJsonRequest(request, response, handleContactSubmission);
}
