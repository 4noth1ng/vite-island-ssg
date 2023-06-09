"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cac_1 = __importDefault(require("cac"));
const dev_1 = require("./dev");
const build_1 = require("./build");
const cli = (0, cac_1.default)("island").version("0.0.1").help();
cli.command("dev [root]", "start dev server").action(async (root) => {
    const server = await (0, dev_1.createDevServer)(root);
    await server.listen();
    server.printUrls();
});
cli
    .command("build [root]", "build in production")
    .action(async (root) => {
    // console.log("build", root);
    await (0, build_1.build)(root);
});
cli.parse();
// 调试 CLI:
// 1. 在 package.json 中声明 bin 字段
// 2. 通过 npm link 将命令 link 到全局
// 3. 执行 island dev 命令
