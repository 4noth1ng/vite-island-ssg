// node_modules/.pnpm/registry.npmmirror.com+tsup@6.7.0_typescript@5.0.4/node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename = () => fileURLToPath(import.meta.url);
var getDirname = () => path.dirname(getFilename());
var __dirname = /* @__PURE__ */ getDirname();

// src/node/cli.ts
import cac from "cac";

// src/node/dev.ts
import { createServer } from "vite";

// src/node/plugin-island/indexHtml.ts
import { readFile } from "fs/promises";

// src/node/constants/index.ts
import { join } from "path";
var PACKAGE_ROOT = join(__dirname, "..");
var CLIENT_ENTRY_PATH = join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "client-entry.tsx"
);
var DEFAULT_HTML_PATH = join(PACKAGE_ROOT, "template.html");
var SERVER_ENTRY_PATH = join(
  PACKAGE_ROOT,
  "src",
  "runtime",
  "ssr-entry.tsx"
);

// src/node/plugin-island/indexHtml.ts
function pluginIndexHtml() {
  return {
    name: "island:index-html",
    apply: "serve",
    // 插入入口 script 标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: "body"
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await readFile(DEFAULT_HTML_PATH, "utf-8");
          try {
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}

// src/node/dev.ts
import pluginReact from "@vitejs/plugin-react";
function createDevServer(root) {
  return createServer({
    root,
    plugins: [pluginIndexHtml(), pluginReact()]
  });
}

// src/node/build.ts
import { build as viteBuild } from "vite";
import pluginReact2 from "@vitejs/plugin-react";
import { resolve, join as join2 } from "path";
import fs from "fs-extra";
import { pathToFileURL } from "url";
async function bundle(root) {
  const resolveViteConfig = (isServer) => ({
    mode: "production",
    root,
    // 注意加上这个插件，自动注入 import React from 'react'，避免 React is not defined 的错误
    plugins: [pluginReact2()],
    build: {
      ssr: isServer,
      outDir: isServer ? ".temp" : "build",
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        }
      }
    }
  });
  console.log("Building client + server bundles...");
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(resolveViteConfig(false)),
      // server build
      viteBuild(resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
}
async function renderPage(render, root, clientBundle) {
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  console.log("rendering page in server side");
  const appHtml = render();
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
  await fs.ensureDir(join2(root, "build"));
  await fs.writeFile(join2(root, "build/index.html"), html);
  await fs.remove(join2(root, ".temp"));
}
async function build(root = process.cwd()) {
  const [clientBundle, serverBundle] = await bundle(root);
  const serverEntryPath = resolve(root, ".temp", "ssr-entry.js");
  const { render } = await import(pathToFileURL(serverEntryPath).toString());
  await renderPage(render, root, clientBundle);
}

// src/node/cli.ts
var cli = cac("island").version("0.0.1").help();
cli.command("dev [root]", "start dev server").action(async (root) => {
  const server = await createDevServer(root);
  await server.listen();
  server.printUrls();
});
cli.command("build [root]", "build in production").action(async (root) => {
  await build(root);
});
cli.parse();