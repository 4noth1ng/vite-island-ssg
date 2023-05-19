"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.renderPage = exports.bundle = void 0;
const index_1 = require("./constants/index");
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
const path_1 = require("path");
const fs = __importStar(require("fs-extra"));
async function bundle(root) {
    const resolveViteConfig = (isServer) => ({
        mode: "production",
        root,
        // 注意加上这个插件，自动注入 import React from 'react'，避免 React is not defined 的错误
        plugins: [(0, plugin_react_1.default)()],
        build: {
            ssr: isServer,
            outDir: isServer ? ".temp" : "build",
            rollupOptions: {
                input: isServer ? index_1.SERVER_ENTRY_PATH : index_1.CLIENT_ENTRY_PATH,
                output: {
                    format: isServer ? "cjs" : "esm",
                },
            },
        },
    });
    console.log(`Building client + server bundles...`);
    try {
        const [clientBundle, serverBundle] = await Promise.all([
            // client build
            (0, vite_1.build)(resolveViteConfig(false)),
            // server build
            (0, vite_1.build)(resolveViteConfig(true)),
        ]);
        return [clientBundle, serverBundle];
    }
    catch (e) {
        console.log(e);
    }
}
exports.bundle = bundle;
async function renderPage(render, root, clientBundle) {
    const clientChunk = clientBundle.output.find((chunk) => chunk.type === "chunk" && chunk.isEntry); // 客户端 entry chunk
    console.log("rendering page in server side");
    const appHtml = render(); // server端返回html字符串
    // cilent端导入js脚本
    const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>title</title>
      <meta name="description" content="xxx">
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script type="module" src="./${clientChunk?.fileName}"></script>
    </body>
  </html>`.trim();
    await fs.ensureDir((0, path_1.join)(root, "build"));
    await fs.writeFile((0, path_1.join)(root, "build/index.html"), html);
    await fs.remove((0, path_1.join)(root, ".temp"));
}
exports.renderPage = renderPage;
async function build(root = process.cwd()) {
    const [clientBundle, serverBundle] = await bundle(root);
    const serverEntryPath = (0, path_1.resolve)(root, ".temp", "ssr-entry.js");
    const { render } = require(serverEntryPath); // 渲染html函数
    await renderPage(render, root, clientBundle);
}
exports.build = build;
