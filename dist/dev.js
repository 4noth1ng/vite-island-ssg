"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _chunkQXXSIPNXjs = require('./chunk-QXXSIPNX.js');


var _chunk4N4EYNOUjs = require('./chunk-4N4EYNOU.js');

// src/node/dev.ts
var _vite = require('vite');
async function createDevServer(root, restartServer) {
  const config = await _chunk4N4EYNOUjs.resolveConfig.call(void 0, root, "serve", "development");
  return _vite.createServer.call(void 0, {
    plugins: await _chunkQXXSIPNXjs.createVitePlugins.call(void 0, config, restartServer),
    server: {
      fs: {
        allow: [_chunkQXXSIPNXjs.PACKAGE_ROOT]
      }
    }
  });
}


exports.createDevServer = createDevServer;
