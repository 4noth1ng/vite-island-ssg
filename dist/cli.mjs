import {
  CLIENT_ENTRY_PATH,
  MASK_SPLITTER,
  SERVER_ENTRY_PATH,
  createVitePlugins
} from "./chunk-35F43M6W.mjs";
import {
  resolveConfig
} from "./chunk-ECJZXT62.mjs";

// src/node/cli.ts
import cac from "cac";
import { resolve } from "path";

// src/node/build.ts
import { build as viteBuild } from "vite";
import path, { dirname, join } from "path";
import fs from "fs-extra";
async function bundle(root, config) {
  const resolveViteConfig = async (isServer) => ({
    mode: "production",
    root,
    plugins: await createVitePlugins(config, void 0, isServer),
    ssr: {
      noExternal: ["react-router-dom", "lodash-es"]
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? path.join(root, ".temp") : path.join(root, "build"),
      rollupOptions: {
        input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        }
      }
    }
  });
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      viteBuild(await resolveViteConfig(false)),
      viteBuild(await resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
  }
}
async function renderPages(render, routes, root, clientBundle) {
  console.log("Rendering page in server side...");
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  return Promise.all(
    routes.map(async (route) => {
      const routePath = route.path;
      const { appHtml, islandToPathMap, propsData } = await render(routePath);
      await buildIslands(root, islandToPathMap);
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
    <script type="module" src="/${clientChunk?.fileName}"><\/script>
  </body>
</html>`.trim();
      const fileName = routePath.endsWith("/") ? `${routePath}index.html` : `${routePath}.html`;
      await fs.ensureDir(join(root, "build", dirname(fileName)));
      await fs.writeFile(join(root, "build", fileName), html);
    })
  );
}
async function build(root = process.cwd(), config) {
  const [clientBundle] = await bundle(root, config);
  const serverEntryPath = join(root, ".temp", "ssr-entry.js");
  const url = new URL(`file://${path.resolve(serverEntryPath)}`);
  const { render, routes } = await import(url.href);
  try {
    await renderPages(render, routes, root, clientBundle);
  } catch (e) {
    console.log("Render page error.\n", e);
  }
}
async function buildIslands(root, islandPathToMap) {
  const islandsInjectCode = `
    ${Object.entries(islandPathToMap).map(
    ([islandName, islandPath]) => `import { ${islandName} } from '${islandPath}'`
  ).join("")}
window.ISLANDS = { ${Object.keys(islandPathToMap).join(", ")} };
window.ISLAND_PROPS = JSON.parse(
  document.getElementById('island-props').textContent
);
  `;
  const injectId = "island:inject";
  return viteBuild({
    mode: "production",
    build: {
      outDir: path.join(root, ".temp"),
      rollupOptions: {
        input: injectId
      }
    },
    plugins: [
      {
        name: "island:inject",
        enforce: "post",
        resolveId(id) {
          debugger;
          if (id.includes(MASK_SPLITTER)) {
            const [originId, importer] = id.split(MASK_SPLITTER);
            return this.resolve(originId, importer, { skipSelf: true });
          }
          if (id === injectId) {
            return id;
          }
        },
        load(id) {
          if (id === injectId) {
            return islandsInjectCode;
          }
        },
        generateBundle(_, bundle2) {
          for (const name in bundle2) {
            if (bundle2[name].type === "asset") {
              delete bundle2[name];
            }
          }
        }
      }
    ]
  });
}

// src/node/cli.ts
var cli = cac("island").version("0.0.1").help();
cli.command("dev [root]", "start dev server").action(async (root) => {
  const createServer = async () => {
    const { createDevServer } = await import("./dev.mjs");
    const server = await createDevServer(root, async () => {
      await server.close();
      await createServer();
    });
    await server.listen();
    server.printUrls();
  };
  await createServer();
});
cli.command("build [root]", "build in production").action(async (root) => {
  try {
    root = resolve(root);
    const config = await resolveConfig(root, "build", "production");
    await build(root, config);
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
