import { r as react, j as jsxs, a as jsx } from "./client-entry.80f27bbc.js";
function Counter() {
  const [count, setCount] = react.exports.useState(0);
  return /* @__PURE__ */ jsxs("div", {
    children: [/* @__PURE__ */ jsx("p", {
      children: count
    }), /* @__PURE__ */ jsx("button", {
      onClick: () => setCount((count2) => count2 + 1),
      children: "\u70B9\u51FB\u52A01"
    })]
  });
}
export {
  Counter as default
};
