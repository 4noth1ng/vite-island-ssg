"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TEMPLATE_PATH = exports.PACKAGE_ROOT = void 0;
const path = require("path");
exports.PACKAGE_ROOT = path.join(__dirname, "..", "..", "..");
exports.DEFAULT_TEMPLATE_PATH = path.join(exports.PACKAGE_ROOT, "template.html");
