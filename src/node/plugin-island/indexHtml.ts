import { Plugin } from "vite";
import { readFile } from "fs/promises";
import { DEFAULT_TEMPLATE_PATH } from "../constants/index";

export function pluginIndexHtml(): Plugin {
  return {
    name: "island-index-html",
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // 1. 读取template.html内容
          const content = await readFile(DEFAULT_TEMPLATE_PATH, "utf-8");
          // 2. 响应HTML浏览器
          res.setHeader("Content-Type", "text/html");
          res.end(content);
        });
      };
    },
  };
}
