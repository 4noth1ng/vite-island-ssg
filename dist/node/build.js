"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.renderPage = exports.bundle = void 0;
const index_1 = require("./constants/index");
const vite_1 = require("vite");
const plugin_react_1 = require("@vitejs/plugin-react");
const path_1 = require("path");
const fs = require("fs-extra");
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
