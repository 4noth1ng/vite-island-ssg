"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/node/constants/index.ts
var _path = require('path');
var PACKAGE_ROOT = _path.join.call(void 0, __dirname, "..");
var RUNTIME_PATH = _path.join.call(void 0, PACKAGE_ROOT, "src", "runtime");
var CLIENT_ENTRY_PATH = _path.join.call(void 0, RUNTIME_PATH, "client-entry.tsx");
var SERVER_ENTRY_PATH = _path.join.call(void 0, RUNTIME_PATH, "ssr-entry.tsx");
var DEFAULT_HTML_PATH = _path.join.call(void 0, PACKAGE_ROOT, "template.html");

// src/node/plugin-island/config.ts

var SITE_DATA_ID = "island:site-data";
function pluginConfig(config, restartServer) {
  return {
    name: "island:config",
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            "@runtime": _path.join.call(void 0, PACKAGE_ROOT, "src", "runtime", "index.ts")
          }
        }
      };
    },
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return "\0" + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === "\0" + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`;
      }
    },
    async handleHotUpdate(ctx) {
      const customWatchedFiles = [config.configPath];
      const include = (id) => customWatchedFiles.some((file) => id.includes(file));
      if (include(ctx.file)) {
        console.log(
          `
${_path.relative.call(void 0, config.root, ctx.file)} changed, restarting server...`
        );
        await restartServer();
      }
    }
  };
}







exports.PACKAGE_ROOT = PACKAGE_ROOT; exports.CLIENT_ENTRY_PATH = CLIENT_ENTRY_PATH; exports.SERVER_ENTRY_PATH = SERVER_ENTRY_PATH; exports.DEFAULT_HTML_PATH = DEFAULT_HTML_PATH; exports.pluginConfig = pluginConfig;
