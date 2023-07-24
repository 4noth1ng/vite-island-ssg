import {
  __dirname
} from "./chunk-ECJZXT62.mjs";

// src/node/constants/index.ts
import { join } from "path";
var PACKAGE_ROOT = join(__dirname, "..");
var RUNTIME_PATH = join(PACKAGE_ROOT, "src", "runtime");
var CLIENT_ENTRY_PATH = join(RUNTIME_PATH, "client-entry.tsx");
var SERVER_ENTRY_PATH = join(RUNTIME_PATH, "ssr-entry.tsx");
var DEFAULT_HTML_PATH = join(PACKAGE_ROOT, "template.html");

// src/node/plugin-island/config.ts
import { relative, join as join2 } from "path";
var SITE_DATA_ID = "island:site-data";
function pluginConfig(config, restartServer) {
  return {
    name: "island:config",
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            "@runtime": join2(PACKAGE_ROOT, "src", "runtime", "index.ts")
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
${relative(config.root, ctx.file)} changed, restarting server...`
        );
        await restartServer();
      }
    }
  };
}

export {
  PACKAGE_ROOT,
  CLIENT_ENTRY_PATH,
  SERVER_ENTRY_PATH,
  DEFAULT_HTML_PATH,
  pluginConfig
};
