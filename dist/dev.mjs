import {
  PACKAGE_ROOT,
  createVitePlugins
} from "./chunk-3BLMIU5J.mjs";
import {
  resolveConfig
} from "./chunk-ECJZXT62.mjs";

// src/node/dev.ts
import { createServer } from "vite";
async function createDevServer(root, restartServer) {
  const config = await resolveConfig(root, "serve", "development");
  return createServer({
    plugins: await createVitePlugins(config, restartServer),
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
export {
  createDevServer
};
