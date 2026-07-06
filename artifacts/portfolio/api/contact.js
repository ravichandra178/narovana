"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = contactHandler;
var http_js_1 = require("../server/http.js");
var endpoints_js_1 = require("../server/endpoints.js");
function contactHandler(request, response) {
    void (0, http_js_1.dispatchJsonRequest)(request, response, endpoints_js_1.handleContactSubmission);
}
