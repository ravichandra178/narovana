import type { IncomingMessage, ServerResponse } from "node:http";
import { dispatchJsonRequest } from "../server/http";
import { handleVisitorSubmission } from "../server/endpoints";

export default function visitorHandler(request: IncomingMessage, response: ServerResponse): void {
  void dispatchJsonRequest(request, response, handleVisitorSubmission);
}
