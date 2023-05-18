import { cac } from "cac";
import path = require("path");

import { resolve } from "path";
import { createDevServer } from "./dev";

const version = require("../../package.json").version;

// 创建实例 初始化提示信息
const cli = cac("island").version(version).help();

cli
  .command("[root]", "start dev server")
  .alias("dev")
  .action(async (root: string) => {
    // create dev server
    const server = await createDevServer(root);
    // listen
    await server.listen();
    server.printUrls();
  });

cli
  .command("build [root]", "build for production")
  .action(async (root: string) => {
    console.log("build", root);
  });

cli.parse();
