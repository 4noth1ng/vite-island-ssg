"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }




var _chunk7AW3HBADjs = require('./chunk-7AW3HBAD.js');


var _chunk4N4EYNOUjs = require('./chunk-4N4EYNOU.js');

// src/node/cli.ts
var _cac = require('cac'); var _cac2 = _interopRequireDefault(_cac);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

// src/node/build.ts
var _vite = require('vite');

var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);
async function bundle(root, config) {
  const resolveViteConfig = async (isServer) => ({
    mode: "production",
    root,
    plugins: await _chunk7AW3HBADjs.createVitePlugins.call(void 0, config, void 0, isServer),
    ssr: {
      noExternal: ["react-router-dom", "lodash-es"]
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? _path2.default.join(root, ".temp") : _path2.default.join(root, "build"),
      rollupOptions: {
        input: isServer ? _chunk7AW3HBADjs.SERVER_ENTRY_PATH : _chunk7AW3HBADjs.CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        }
      }
    }
  });
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      _vite.build.call(void 0, await resolveViteConfig(false)),
      _vite.build.call(void 0, await resolveViteConfig(true))
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
    <script type="module" src="/${_optionalChain([clientChunk, 'optionalAccess', _2 => _2.fileName])}"><\/script>
  </body>
</html>`.trim();
      const fileName = routePath.endsWith("/") ? `${routePath}index.html` : `${routePath}.html`;
      await _fsextra2.default.ensureDir(_path.join.call(void 0, root, "build", _path.dirname.call(void 0, fileName)));
      await _fsextra2.default.writeFile(_path.join.call(void 0, root, "build", fileName), html);
    })
  );
}
async function build(root = process.cwd(), config) {
  const [clientBundle] = await bundle(root, config);
  const serverEntryPath = _path.join.call(void 0, root, ".temp", "ssr-entry.js");
  const url = new URL(`file://${_path2.default.resolve(serverEntryPath)}`);
  const { render, routes } = await Promise.resolve().then(() => require(url.href));
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
  return _vite.build.call(void 0, {
    mode: "production",
    build: {
      outDir: _path2.default.join(root, ".temp"),
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
          if (id.includes(_chunk7AW3HBADjs.MASK_SPLITTER)) {
            const [originId, importer] = id.split(_chunk7AW3HBADjs.MASK_SPLITTER);
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
var cli = _cac2.default.call(void 0, "island").version("0.0.1").help();
cli.command("dev [root]", "start dev server").action(async (root) => {
  const createServer = async () => {
    const { createDevServer } = await Promise.resolve().then(() => require("./dev.js"));
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
    root = _path.resolve.call(void 0, root);
    const config = await _chunk4N4EYNOUjs.resolveConfig.call(void 0, root, "build", "production");
    await build(root, config);
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
