import { App } from "./app";
import { renderToString } from "react-dom/server";

// For ssr component render
// 服务端入口 将组件渲染成HTML字符串

export function render() {
  return renderToString(<App />);
}
