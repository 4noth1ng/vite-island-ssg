import { jsx, jsxs, Fragment } from "react/jsx-runtime";
const frontmatter = void 0;
const toc = [];
function _createMdxContent(props) {
  const _components = Object.assign({
    ol: "ol",
    li: "li",
    p: "p",
    ul: "ul",
    code: "code",
    div: "div",
    span: "span",
    pre: "pre"
  }, props.components);
  return jsxs(Fragment, {
    children: [jsxs(_components.ol, {
      children: ["\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "bin \u7684\u4F5C\u7528\r\npackage.json \u7684 bin \u5B57\u6BB5 \u53EF\u4EE5\u5B9A\u4E49\u547D\u4EE4\uFF0C\u5728\u5B89\u88C5\u4F9D\u8D56\u7684\u8FC7\u7A0B\u4E2D\u4F1A\u5B89\u88C5\u5230\u5168\u5C40\u73AF\u5883\u4E2D\uFF0C\u5373\u6BD4\u5982\u5B9A\u4E49\u4E86 island \u547D\u4EE4\uFF0C\u6211\u4EEC\u53EF\u4EE5\u76F4\u63A5\u5728\u7EC8\u7AEF\u4F7F\u7528 island \u8FDB\u884C\u6267\u884C island \u5B57\u6BB5\u5BF9\u5E94\u7684\u6587\u4EF6."
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u5165\u53E3 HTML \u6587\u4EF6\u54CD\u5E94"
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u4E3B\u9898 \u6E32\u67D3"
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u63A5\u5165 HMR\r\ntransformIndexHtml + react plugin\r\nIn middleware mode, you should make sure your entry index.html file is transformed by Vite."
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "SSR \u540C\u6784\u4F53\u7CFB"
        }), "\n"]
      }), "\n"]
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsx(_components.li, {
        children: "\u540C\u6837\u7684\u4EE3\u7801\u65E2\u8FD0\u884C\u5728\u5BA2\u6237\u7AEF\u4E5F\u8FD0\u884C\u5728\u670D\u52A1\u7AEF"
      }), "\n"]
    }), "\n", jsxs(_components.ol, {
      start: "6",
      children: ["\n", jsx(_components.li, {
        children: "\u5173\u4E8E\u6253\u5305 build"
      }), "\n"]
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u6253\u5305 client \u7AEF + server \u7AEF\r\nclient \u7AEF\u4E3A esm \u683C\u5F0F\uFF0Cserver \u7AEF\u4E3A cjs \u683C\u5F0F"
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u5F15\u5165 server-entry \u6A21\u5757\r\nserver-entry \u6A21\u5757\u5BFC\u51FA\u4E86 render \u65B9\u6CD5\uFF0C\u5229\u7528\u4E86 react-router \u63D0\u4F9B\u7684 StaicRouter \u548C react \u63D0\u4F9B\u7684 RenderToString, \u4EA7\u51FA\u5BF9\u5E94\u8DEF\u7531\u7684 html"
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u670D\u52A1\u7AEF\u6E32\u67D3\uFF0C\u4EA7\u51FA html \u6587\u4EF6"
        }), "\n"]
      }), "\n"]
    }), "\n", jsxs(_components.ol, {
      start: "7",
      children: ["\n", jsx(_components.li, {
        children: "\u5F15\u5165 tsup \u8FDB\u884C\u5E93\u6784\u5EFA"
      }), "\n"]
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsx(_components.li, {
        children: "tsup \u6253\u5305 ts \u6587\u4EF6\u5E76\u4EA7\u51FA cjs, esm \u683C\u5F0F"
      }), "\n"]
    }), "\n", jsxs(_components.ol, {
      start: "8",
      children: ["\n", jsx(_components.li, {
        children: "\u914D\u7F6E\u6587\u4EF6\u89E3\u6790"
      }), "\n"]
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsxs(_components.li, {
        children: ["\u5229\u7528 vite \u63D0\u4F9B\u7684", jsx(_components.code, {
          children: "loadConfigFromFile"
        }), "\u89E3\u6790\u914D\u7F6E\u6587\u4EF6\uFF0C"]
      }), "\n"]
    }), "\n", jsxs(_components.ol, {
      start: "9",
      children: ["\n", jsx(_components.li, {
        children: "\u914D\u7F6E\u6587\u4EF6\u7684\u70ED\u66F4\u65B0"
      }), "\n"]
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsx(_components.li, {
        children: "\u524D\u7F6E\u6761\u4EF6\uFF1A\u6211\u4EEC\u7F16\u5199\u4E86\u4E00\u4E2A configPlugin\uFF0C\u7528\u6765\u7EC4\u88C5\u914D\u7F6E\u4FE1\u606F\uFF0C\u901A\u8FC7\u865A\u62DF\u6A21\u5757\u6CE8\u5165"
      }), "\n", jsxs(_components.li, {
        children: ["\u5229\u7528 plugin \u63D0\u4F9B\u7684", jsx(_components.code, {
          children: "handleHotUpdate"
        }), "\u94A9\u5B50\uFF0C\u5728 config \u66F4\u65B0\u65F6\u8FDB\u884C\u76F8\u5173\u64CD\u4F5C\u3002"]
      }), "\n", jsx(_components.li, {
        children: "\u65B9\u6848 1\uFF1A\u91CD\u542F vite dev server\uFF0C\u65E0\u6548\u679C\uFF0C\u56E0\u4E3A\u6CA1\u6709\u91CD\u65B0\u8BFB\u53D6\u914D\u7F6E\u6587\u4EF6"
      }), "\n", jsxs(_components.li, {
        children: ["\u65B9\u6848 2: \u5C06 dev.ts \u5355\u72EC\u6253\u5305, \u5E76\u4FEE\u6539 dev \u542F\u52A8\u7684\u903B\u8F91\uFF0C\u5728 createServer \u65F6\uFF0C\u6211\u4EEC\u63D0\u4F9B\u4E00\u4E2A\u52A8\u6001\u5F15\u5165 dev.js \u5E76\u91CD\u65B0\u542F\u52A8 dev server \u7684\u65B9\u6CD5\uFF0C\u7136\u540E\u5728", jsx(_components.code, {
          children: "handleHotUpdate"
        }), "\u94A9\u5B50\u5185\u4F7F\u7528\u8BE5\u65B9\u6CD5\u8FBE\u5230\u66F4\u65B0\u6548\u679C, \u7531\u4E8E dev.js \u5185\u6211\u4EEC\u4F1A\u89E3\u6790 config.ts \u7684\u5185\u5BB9\uFF0C\u6240\u4EE5\u53EF\u4EE5\u8FBE\u5230\u66F4\u65B0\u6548\u679C\u3002"]
      }), "\n"]
    }), "\n", jsxs(_components.ol, {
      start: "10",
      children: ["\n", jsx(_components.li, {
        children: "\u7EA6\u5B9A\u5F0F\u8DEF\u7531"
      }), "\n"]
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsx(_components.li, {
        children: "\u4E00\u822C\u60C5\u51B5\u4E0B\uFF0C\u6211\u4EEC\u9700\u8981\u624B\u52A8\u7F16\u5199\u8DEF\u7531\u4FE1\u606F\u5728\u5BA2\u6237\u7AEF\u4F7F\u7528\uFF0C\u7EA6\u5B9A\u5F0F\u8DEF\u7531\u5373\u8BFB\u53D6\u5BF9\u5E94\u6587\u4EF6\u5939\u4E0B\u7684\u6587\u4EF6\u8FDB\u884C\u8DEF\u7531\u4FE1\u606F\u7684\u62FC\u63A5\u3002"
      }), "\n", jsx(_components.li, {
        children: "\u540C\u65F6\uFF0C\u4F7F\u7528\u865A\u62DF\u6A21\u5757\u5C06\u4FE1\u606F\u6CE8\u5165\uFF0C\u6240\u4EE5\u53EF\u4EE5\u76F4\u63A5 import \u5F97\u5230\u8DEF\u7531\u4FE1\u606F"
      }), "\n"]
    }), "\n", jsxs(_components.ol, {
      start: "11",
      children: ["\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u5173\u4E8E noExternal\r\n\u5728\u6784\u5EFA\u65F6\uFF0C\u6211\u4EEC\u5C06 react-router-dom(\u540E\u7EED\u8FD8\u6709 lodash-es)\u8FD9\u79CD\u5305\u653E\u5230 noExternal \u5F53\u4E2D\u3002\u7531\u4E8E\u8FD9\u4E9B\u5305\u662F\u7EAF ESM \u7684\u5305\uFF0C\u800C\u6211\u4EEC\u6253\u5305\u7684\u4EA7\u7269\u4E3A CJS \u683C\u5F0F\u7684\uFF0C\u4E0D\u80FD\u4F7F\u7528 ESM \u7684\u5305\uFF08\u4E0D\u52A0\u5165 noExternal\uFF0Cvite \u4F1A\u5C06\u5176\u5F53\u505A\u5916\u90E8\u4F9D\u8D56\u5728\u6253\u5305\u4E2D\u76F4\u63A5\u4FDD\u7559\uFF09\uFF0C\u603B\u7ED3\u8BF4 noExternal \u5C31\u662F\u5C06\u5176\u52A0\u5165\u6784\u5EFA\u8FC7\u7A0B\u4E2D\u3002"
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "MDX\r\nmarkdown + jsx"
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "index.mdx \u70ED\u66F4\u65B0\u5931\u6548\u95EE\u9898"
        }), "\n"]
      }), "\n"]
    }), "\n", jsxs(_components.ul, {
      children: ["\n", jsx(_components.li, {
        children: "index.mdx \u4F5C\u4E3A Content \u7EC4\u4EF6\u5339\u914D\u5230\u7684\u8DEF\u7531\u7EC4\u4EF6\uFF0C\u56E0\u6B64 vite \u5728\u70ED\u66F4\u65B0\u65F6\u5C06\u70ED\u66F4\u65B0\u7684\u8FB9\u754C\u5B9A\u4E3A\u4E86 Content.tsx, \u8FD9\u5BFC\u81F4 index.mdx \u81EA\u8EAB\u7684\u70ED\u66F4\u65B0\u5931\u6548\u3002\u4E3E\u4F8B\u5B50\u800C\u8A00\uFF0Cindex.mdx \u5185\u7EC4\u4EF6\u72B6\u6001\u4F1A\u4E22\u5931\u3002"
      }), "\n", jsxs(_components.li, {
        children: ["\u56E0\u6B64\uFF0C\u6211\u4EEC\u8981\u81EA\u5B9A\u4E49 index.mdx \u70ED\u66F4\u65B0\u65F6\u7684\u903B\u8F91, \u5373\u4F7F\u7528", jsx(_components.code, {
          children: "false.accept"
        }), ", \u5F53 index.mdx \u53D8\u5316\u65F6\uFF0C\u52A0\u5165\u6062\u590D index.mdx \u7EC4\u4EF6\u72B6\u6001\u903B\u8F91\u7684\u6548\u679C\u3002"]
      }), "\n"]
    }), "\n", jsxs(_components.ol, {
      start: "14",
      children: ["\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u591A\u8DEF\u7531\u6253\u5305\r\n\u5728 dev server \u4E0B\uFF0C\u6211\u4EEC\u662F SPA\uFF0C\u6240\u4EE5\u6211\u4EEC\u5728\u8FDB\u884C\u8DEF\u7531\u4FE1\u606F\u7684\u62FC\u63A5\u65F6\uFF0C\u6211\u4EEC\u9700\u8981\u4F7F\u7528 loadable \u8FBE\u5230\u6309\u9700\u52A0\u8F7D\u7684\u6548\u679C\uFF0C\u4EE5\u514D\u76F4\u63A5\u5168\u91CF\u8BF7\u6C42\u3002\r\n\u5728 SSR/SSG \u4E0B\uFF0Cjs \u662F\u5728\u672C\u5730\u78C1\u76D8\u8BFB\u53D6\uFF0C\u6240\u4EE5\u6211\u4EEC\u4E0D\u9700\u8981\u5728\u6309\u9700\u52A0\u8F7D, \u9759\u6001 import \u5373\u53EF\r\n\u591A\u8DEF\u7531\u6253\u5305\uFF0C\u5373\u751F\u6210\u591A\u4E2A html \u6587\u4EF6\uFF0C\u6211\u4EEC\u53EA\u9700 build \u65F6\u904D\u5386 route \u4FE1\u606F\u8C03\u7528 render \u751F\u6210 html \u5373\u53EF"
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u6570\u636E\u81EA\u52A8\u7EC4\u88C5\u9875\u9762\r\n\u83B7\u53D6 mdx \u4FE1\u606F\uFF0C\u904D\u5386\u751F\u6210\u7EC4\u4EF6\u76F8\u5173\u5185\u5BB9\u5373\u53EF"
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "TOC \u70ED\u66F4\u65B0\u95EE\u9898\r\n\u5F53\u6211\u4EEC\u5728 index.mdx \u6DFB\u52A0\u6216\u5220\u9664\u6807\u9898\u65F6\uFF0C\u53F3\u4FA7\u7684 ASide \u5E76\u6CA1\u6709\u8FDB\u884C\u70ED\u66F4\u65B0, \u56E0\u4E3A index.mdx \u5BF9\u5E94\u7684\u662F Content \u7684\u5185\u5BB9\uFF0C\u6240\u4EE5\u6211\u4EEC\u4E5F\u9700\u8981\u81EA\u5B9A\u4E49\u70ED\u66F4\u65B0\u5185\u5BB9\u3002"
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u4F20\u7EDF SSR\u3001SSR \u540C\u6784\u4E0E islands \u67B6\u6784\r\n\u4F20\u7EDF SSR\uFF1A\u670D\u52A1\u7AEF\u5C06\u6240\u6709 JS \u6267\u884C\u5B8C\u6BD5\u5E76\u6CE8\u5165 HTML \u4E2D\uFF0C\u5BA2\u6237\u7AEF\u53EA\u5145\u5F53\u5C55\u793A HTML \u6587\u4EF6\u7684\u5A92\u4ECB\r\nSSR \u540C\u6784\uFF1A\u5373\u670D\u52A1\u7AEF\u548C\u5BA2\u6237\u7AEF\u80FD\u6267\u884C\u76F8\u540C\u7684\u4EE3\u7801\uFF0C\u73B0\u4EE3 SSR \u7684\u6D41\u7A0B\u662F\uFF1A\u670D\u52A1\u7AEF\u63D0\u4F9B\u5B8C\u6574\u7684 HTML\uFF0C\u7136\u540E\u8BF7\u6C42 JS \u811A\u672C\u5E76\u6267\u884C\uFF08\u72B6\u6001\u7BA1\u7406\u3001\u8DEF\u7531\u8DF3\u8F6C\u3001\u4EA4\u4E92\u76F8\u5173\uFF09\uFF0C\u5BF9\u6BD4 SPA\uFF0CSPA \u7684 html \u901A\u8FC7 JS \u811A\u672C\u6267\u884C\u6E32\u67D3\uFF0C\u6240\u4EE5\u767D\u5C4F\u65F6\u95F4\u4F1A\u66F4\u957F\uFF0C\u4F46\u4ECE\u7F51\u7EDC IO \u7684\u89D2\u5EA6\u8BB2\uFF0C\u4E24\u8005\u5E76\u65E0\u5927\u7684\u533A\u522B\r\nislands \u67B6\u6784\uFF1A\u5B64\u5C9B\u67B6\u6784\uFF0C\u8FD9\u79CD\u67B6\u6784\u7684\u524D\u63D0\u662F\u53EA\u6709\u90E8\u5206\u53EF\u4EA4\u4E92\u7EC4\u4EF6\uFF0C\u6BD4\u8D77 SSR \u540C\u6784\uFF0C\u4F18\u70B9\u5728\u4E8E\u65E0\u9700\u6267\u884C\u5168\u91CF\u7684\u6CE8\u6C34\u64CD\u4F5C\u3002"
        }), "\n"]
      }), "\n", jsxs(_components.li, {
        children: ["\n", jsx(_components.p, {
          children: "\u5B9E\u73B0 island \u7EC4\u4EF6\u7684\u6807\u8BB0"
        }), "\n"]
      }), "\n"]
    }), "\n", jsxs(_components.p, {
      children: ["\u9996\u5148\u4F7F\u7528", jsx(_components.code, {
        children: "__island"
      }), "prop \u6807\u8BB0 island \u7684\u7EC4\u4EF6\r\nimport { Aside } from '../components/Aside';"]
    }), "\n", jsxs(_components.p, {
      children: ["export function Layout() {\r\nreturn ", ";\r\n}\r\n\u7136\u540E\u4F7F\u7528 babel \u8FDB\u884C\u8F6C\u5316\r\n// \u8F6C\u6362\u524D"]
    }), "\n", "\n", jsx(_components.p, {
      children: "// \u8F6C\u6362\u540E"
    }), "\n", "\n", jsxs(_components.div, {
      className: "",
      children: [jsx(_components.span, {
        className: "lang"
      }), jsx(_components.pre, {
        children: jsx(_components.code, {
          children: `import { Aside } from '../components/Aside';\r
\r
export function Layout() {\r
  return <Aside __island="/Users/project/src/components/Aside.tsx" />;\r
}
`
        })
      })]
    }), "\n", jsx(_components.p, {
      children: "\u8FD9\u6837\u6211\u4EEC\u5C31\u80FD\u8BB0\u5F55\u4E0B\u6240\u6709 island \u7EC4\u4EF6\u7684\u8DEF\u5F84\u4FE1\u606F\uFF0C\u4ECE\u800C\u8FDB\u884C\u6253\u5305\uFF0C\u5F62\u6210 island bundle\uFF0C\u5E76\u5C06\u7EC4\u4EF6\u6302\u8F7D\u5230 window \u5BF9\u8C61\u4E0A"
    }), "\n", jsx(_components.p, {
      children: "\u56E0\u6B64\uFF0C\u6211\u4EEC\u9700\u8981\u4E24\u4E2A\u63D2\u4EF6\uFF0C\u4E00\u4E2A\u662F babel \u63D2\u4EF6\uFF0C\u5B8C\u6210\u7F16\u8BD1\u65F6 island \u7EC4\u4EF6\u8DEF\u5F84\u4FE1\u606F\u7684\u6CE8\u5165\r\n\u53E6\u4E00\u4E2A\u662F\u8FD0\u884C\u65F6\u63D2\u4EF6\uFF0C\u62E6\u622A Islands \u7EC4\u4EF6\uFF0C\u8BB0\u5F55 island \u7EC4\u4EF6\u7684\u8DEF\u5F84\u4EE5\u53CA\u5185\u5BB9\r\n\u6700\u540E\u5C06\u5176\u5355\u72EC\u6253\u5305\uFF0C\u6302\u8F7D\u5230\u5168\u5C40\u5BF9\u8C61\u4E0A\uFF0C\u5E76\u6CE8\u5165\u5230 html \u4E2D"
    }), "\n", jsxs(_components.ol, {
      start: "19",
      children: ["\n", jsx(_components.li, {
        children: "\u6253\u5305 islands \u7EC4\u4EF6\u4EE3\u7801\r\n\u9996\u5148\u6839\u636E\u6807\u8BB0\u4EE5\u53CA\u6807\u8BB0\u7EC4\u4EF6\u7684\u4FE1\u606F\u8FDB\u884C\u62FC\u63A5\uFF0C\u6BD4\u5982\u5C06```ts\r\n{\r\nAside: 'some-path'\r\n}"
      }), "\n"]
    }), "\n", jsxs(_components.div, {
      className: "",
      children: [jsx(_components.span, {
        className: "lang"
      }), jsx(_components.pre, {
        children: jsx(_components.code, {
          children: "\u8F6C\u5316\u4E3A\r\n    ```ts\r\n    import { Aside } from 'some-path';\r\n// \u5168\u5C40\u6CE8\u518C Islands \u7EC4\u4EF6\r\nwindow.ISLANDS = { Aside }\r\n// \u6CE8\u518C Islands \u7EC4\u4EF6\u7684 props \u6570\u636E\r\nwindow.ISLAND_PROPS = JSON.parse(\r\ndocument.getElementById('island-props').textContent\r\n)\r\n\n"
        })
      })]
    })]
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout ? jsx(MDXLayout, Object.assign({}, props, {
    children: jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
export {
  MDXContent as default,
  frontmatter,
  toc
};
