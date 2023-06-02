"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }






var _chunkQXXSIPNXjs = require('./chunk-QXXSIPNX.js');


var _chunk4N4EYNOUjs = require('./chunk-4N4EYNOU.js');

// src/node/cli.ts
var _cac = require('cac'); var _cac2 = _interopRequireDefault(_cac);
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

// src/node/build.ts
var _vite = require('vite');

var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);
var CLIENT_OUTPUT = "build";
async function bundle(root, config) {
  const resolveViteConfig = async (isServer) => ({
    mode: "production",
    root,
    plugins: await _chunkQXXSIPNXjs.createVitePlugins.call(void 0, config, void 0, isServer),
    ssr: {
      noExternal: ["react-router-dom", "lodash-es"]
    },
    build: {
      minify: false,
      ssr: isServer,
      outDir: isServer ? _path2.default.join(root, ".temp") : _path2.default.join(root, CLIENT_OUTPUT),
      rollupOptions: {
        input: isServer ? _chunkQXXSIPNXjs.SERVER_ENTRY_PATH : _chunkQXXSIPNXjs.CLIENT_ENTRY_PATH,
        output: {
          format: isServer ? "cjs" : "esm"
        },
        external: _chunkQXXSIPNXjs.EXTERNALS
      }
    }
  });
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      _vite.build.call(void 0, await resolveViteConfig(false)),
      _vite.build.call(void 0, await resolveViteConfig(true))
    ]);
    const publicDir = _path.join.call(void 0, root, "public");
    if (_fsextra2.default.pathExistsSync(publicDir)) {
      await _fsextra2.default.copy(publicDir, _path.join.call(void 0, root, CLIENT_OUTPUT));
    }
    await _fsextra2.default.copy(_path.join.call(void 0, _chunkQXXSIPNXjs.PACKAGE_ROOT, "vendors"), _path.join.call(void 0, root, CLIENT_OUTPUT));
    return [clientBundle, serverBundle];
  } catch (e) {
    console.log(e);
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
    esbuild: {
      jsx: "automatic"
    },
    build: {
      outDir: _path2.default.join(root, ".temp"),
      rollupOptions: {
        input: injectId,
        external: _chunkQXXSIPNXjs.EXTERNALS
      }
    },
    plugins: [
      {
        name: "island:inject",
        enforce: "post",
        resolveId(id) {
          if (id.includes(_chunkQXXSIPNXjs.MASK_SPLITTER)) {
            const [originId, importer] = id.split(_chunkQXXSIPNXjs.MASK_SPLITTER);
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
async function renderPages(render, routes, root, clientBundle) {
  console.log("Rendering page in server side...");
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === "chunk" && chunk.isEntry
  );
  return Promise.all(
    [...routes, { path: "/404" }].map(async (route) => {
      const routePath = route.path;
      const helmetContext = {
        context: {}
      };
      const {
        appHtml,
        islandToPathMap,
        islandProps = []
      } = await render(routePath, helmetContext.context);
      const styleAssets = clientBundle.output.filter(
        (chunk) => chunk.type === "asset" && chunk.fileName.endsWith(".css")
      );
      const islandBundle = await buildIslands(root, islandToPathMap);
      const islandsCode = islandBundle.output[0].code;
      const normalizeVendorFilename = (fileName2) => fileName2.replace(/\//g, "_") + ".js";
      const { helmet } = helmetContext.context;
      const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    ${_optionalChain([helmet, 'optionalAccess', _2 => _2.title, 'optionalAccess', _3 => _3.toString, 'call', _4 => _4()]) || ""}
    ${_optionalChain([helmet, 'optionalAccess', _5 => _5.meta, 'optionalAccess', _6 => _6.toString, 'call', _7 => _7()]) || ""}
    ${_optionalChain([helmet, 'optionalAccess', _8 => _8.link, 'optionalAccess', _9 => _9.toString, 'call', _10 => _10()]) || ""}
    ${_optionalChain([helmet, 'optionalAccess', _11 => _11.style, 'optionalAccess', _12 => _12.toString, 'call', _13 => _13()]) || ""}
    <meta name="description" content="xxx">
    ${styleAssets.map((item) => `<link rel="stylesheet" href="/${item.fileName}">`).join("\n")}
    <script type="importmap">
      {
        "imports": {
          ${_chunkQXXSIPNXjs.EXTERNALS.map(
        (name) => `"${name}": "/${normalizeVendorFilename(name)}"`
      ).join(",")}
        }
      }
    <\/script>
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module">${islandsCode}<\/script>
    <script type="module" src="/${_optionalChain([clientChunk, 'optionalAccess', _14 => _14.fileName])}"><\/script>
    <script id="island-props">${JSON.stringify(islandProps)}<\/script>
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

// src/node/preview.ts
var _compression = require('compression'); var _compression2 = _interopRequireDefault(_compression);
var _polka = require('polka'); var _polka2 = _interopRequireDefault(_polka);


var _sirv = require('sirv'); var _sirv2 = _interopRequireDefault(_sirv);
var DEFAULT_PORT = 4173;
async function preview(root, { port }) {
  const config = await _chunk4N4EYNOUjs.resolveConfig.call(void 0, root, "serve", "production");
  const listenPort = _nullishCoalesce(port, () => ( DEFAULT_PORT));
  const outputDir = _path2.default.resolve(root, "build");
  const notFoundPage = _fsextra2.default.readFileSync(
    _path2.default.resolve(outputDir, "404.html"),
    "utf-8"
  );
  const compress = _compression2.default.call(void 0, );
  const serve = _sirv2.default.call(void 0, outputDir, {
    etag: true,
    maxAge: 31536e3,
    immutable: true,
    setHeaders(res, pathname) {
      if (pathname.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      }
    }
  });
  const onNoMatch = (req, res) => {
    res.statusCode = 404;
    res.end(notFoundPage);
  };
  _polka2.default.call(void 0, { onNoMatch }).use(compress, serve).listen(listenPort, (err) => {
    if (err) {
      throw err;
    }
    console.log(
      `> Preview server is running at http://localhost:${listenPort}`
    );
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
cli.command("preview [root]", "preview production build").option("--port <port>", "port to use for preview server").action(async (root, { port }) => {
  try {
    root = _path.resolve.call(void 0, root);
    await preview(root, { port });
  } catch (e) {
    console.log(e);
  }
});
cli.parse();
