"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }// src/node/constants/index.ts
var _path = require('path'); var _path2 = _interopRequireDefault(_path);
var PACKAGE_ROOT = _path.join.call(void 0, __dirname, "..");
var RUNTIME_PATH = _path.join.call(void 0, PACKAGE_ROOT, "src", "runtime");
var CLIENT_ENTRY_PATH = _path.join.call(void 0, RUNTIME_PATH, "client-entry.tsx");
var SERVER_ENTRY_PATH = _path.join.call(void 0, RUNTIME_PATH, "ssr-entry.tsx");
var DEFAULT_HTML_PATH = _path.join.call(void 0, PACKAGE_ROOT, "template.html");
var MD_REGEX = /\.mdx?$/;

// src/node/plugin-island/indexHtml.ts
var _fsextra = require('fs-extra'); var _fsextra2 = _interopRequireDefault(_fsextra);
function pluginIndexHtml() {
  return {
    name: "island:index-html",
    apply: "serve",
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              type: "module",
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: "body"
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await _fsextra2.default.readFile(DEFAULT_HTML_PATH, "utf-8");
          try {
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/html");
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}

// src/node/vitePlugins.ts
var _pluginreact = require('@vitejs/plugin-react'); var _pluginreact2 = _interopRequireDefault(_pluginreact);

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
        },
        css: {
          modules: {
            localsConvention: "camelCaseOnly"
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

// src/node/plugin-routes/RouteService.ts
var _fastglob = require('fast-glob'); var _fastglob2 = _interopRequireDefault(_fastglob);
var _vite = require('vite');

var RouteService = class {
  #scanDir;
  #routeData = [];
  constructor(scanDir) {
    this.#scanDir = scanDir;
  }
  async init() {
    const files = _fastglob2.default.sync(["**/*.{js,jsx,ts,tsx,md,mdx}"], {
      cwd: this.#scanDir,
      absolute: true,
      ignore: ["**/node_modules/**", "**/build/**", "config.ts"]
    }).sort();
    files.forEach((file) => {
      const fileRelativePath = _vite.normalizePath.call(void 0, 
        _path2.default.relative(this.#scanDir, file)
      );
      const routePath = this.normalizeRoutePath(fileRelativePath);
      this.#routeData.push({
        routePath,
        absolutePath: file
      });
    });
  }
  getRouteMeta() {
    return this.#routeData;
  }
  normalizeRoutePath(rawPath) {
    const routePath = rawPath.replace(/\.(.*)?$/, "").replace(/index$/, "");
    return routePath.startsWith("/") ? routePath : `/${routePath}`;
  }
  generateRoutesCode(ssr = false) {
    return `
import React from 'react';
${ssr ? "" : 'import loadable from "@loadable/component";'}

${this.#routeData.map((route, index) => {
      return ssr ? `import Route${index} from "${route.absolutePath}";` : `const Route${index} = loadable(() => import('${route.absolutePath}'));`;
    }).join("\n")}
export const routes = [
  ${this.#routeData.map((route, index) => {
      return `{ path: '${route.routePath}', element: React.createElement(Route${index}), preload: () => import('${route.absolutePath}') }`;
    }).join(",\n")}
];
`;
  }
};

// src/node/plugin-routes/index.ts
var CONVENTIONAL_ROUTE_ID = "island:routes";
function pluginRoutes(options2) {
  const routeService = new RouteService(options2.root);
  return {
    name: "island:routes",
    async configResolved() {
      await routeService.init();
    },
    resolveId(id) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return "\0" + id;
      }
    },
    load(id) {
      if (id === "\0" + CONVENTIONAL_ROUTE_ID) {
        return routeService.generateRoutesCode(options2.isSSR);
      }
    }
  };
}

// src/node/plugin-mdx/pluginMdxHmr.ts
var _assert = require('assert'); var _assert2 = _interopRequireDefault(_assert);
function pluginMdxHMR() {
  let viteReactPlugin;
  return {
    name: "vite-plugin-mdx-hmr",
    apply: "serve",
    configResolved(config) {
      viteReactPlugin = config.plugins.find(
        (plugin) => plugin.name === "vite:react-babel"
      );
    },
    async transform(code, id, opts) {
      if (MD_REGEX.test(id)) {
        _assert2.default.call(void 0, typeof viteReactPlugin.transform === "function");
        const result = await _optionalChain([viteReactPlugin, 'access', _ => _.transform, 'optionalAccess', _2 => _2.call, 'call', _3 => _3(
          this,
          code,
          id + "?.jsx",
          opts
        )]);
        const selfAcceptCode = "import.meta.hot.accept();";
        if (typeof result === "object" && !_optionalChain([result, 'access', _4 => _4.code, 'optionalAccess', _5 => _5.includes, 'call', _6 => _6(selfAcceptCode)])) {
          result.code += selfAcceptCode;
        }
        return result;
      }
    }
  };
}

// src/node/plugin-mdx/pluginMdxRollup.ts
var _rollup = require('@mdx-js/rollup'); var _rollup2 = _interopRequireDefault(_rollup);
var _remarkgfm = require('remark-gfm'); var _remarkgfm2 = _interopRequireDefault(_remarkgfm);
var _rehypeautolinkheadings = require('rehype-autolink-headings'); var _rehypeautolinkheadings2 = _interopRequireDefault(_rehypeautolinkheadings);

// node_modules/.pnpm/rehype-slug@5.1.0/node_modules/rehype-slug/index.js
var _githubslugger = require('github-slugger'); var _githubslugger2 = _interopRequireDefault(_githubslugger);

// node_modules/.pnpm/hast-util-has-property@2.0.0/node_modules/hast-util-has-property/index.js
var own = {}.hasOwnProperty;
function hasProperty(node, name) {
  var value = name && node && typeof node === "object" && node.type === "element" && node.properties && own.call(node.properties, name) && node.properties[name];
  return value !== null && value !== void 0 && value !== false;
}

// node_modules/.pnpm/hast-util-heading-rank@2.1.0/node_modules/hast-util-heading-rank/index.js
function headingRank(node) {
  var name = node && node.type === "element" && node.tagName.toLowerCase() || "";
  var code = name.length === 2 && name.charCodeAt(0) === 104 ? name.charCodeAt(1) : 0;
  return code > 48 && code < 55 ? code - 48 : null;
}

// node_modules/.pnpm/hast-util-to-string@2.0.0/node_modules/hast-util-to-string/index.js
function toString(node) {
  if ("children" in node) {
    return all(node);
  }
  return "value" in node ? node.value : "";
}
function one(node) {
  if (node.type === "text") {
    return node.value;
  }
  return "children" in node ? all(node) : "";
}
function all(node) {
  let index = -1;
  const result = [];
  while (++index < node.children.length) {
    result[index] = one(node.children[index]);
  }
  return result.join("");
}

// node_modules/.pnpm/unist-util-is@5.1.1/node_modules/unist-util-is/index.js
var convert = function(test) {
  if (test === void 0 || test === null) {
    return ok;
  }
  if (typeof test === "string") {
    return typeFactory(test);
  }
  if (typeof test === "object") {
    return Array.isArray(test) ? anyFactory(test) : propsFactory(test);
  }
  if (typeof test === "function") {
    return castFactory(test);
  }
  throw new Error("Expected function, string, or object as test");
};
function anyFactory(tests) {
  const checks = [];
  let index = -1;
  while (++index < tests.length) {
    checks[index] = convert(tests[index]);
  }
  return castFactory(any);
  function any(...parameters) {
    let index2 = -1;
    while (++index2 < checks.length) {
      if (checks[index2].call(this, ...parameters))
        return true;
    }
    return false;
  }
}
function propsFactory(check) {
  return castFactory(all2);
  function all2(node) {
    let key;
    for (key in check) {
      if (node[key] !== check[key])
        return false;
    }
    return true;
  }
}
function typeFactory(check) {
  return castFactory(type);
  function type(node) {
    return node && node.type === check;
  }
}
function castFactory(check) {
  return assertion;
  function assertion(...parameters) {
    return Boolean(check.call(this, ...parameters));
  }
}
function ok() {
  return true;
}

// node_modules/.pnpm/unist-util-visit-parents@5.1.1/node_modules/unist-util-visit-parents/color.js
function color(d) {
  return "\x1B[33m" + d + "\x1B[39m";
}

// node_modules/.pnpm/unist-util-visit-parents@5.1.1/node_modules/unist-util-visit-parents/index.js
var CONTINUE = true;
var SKIP = "skip";
var EXIT = false;
var visitParents = function(tree, test, visitor, reverse) {
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
    test = null;
  }
  const is = convert(test);
  const step = reverse ? -1 : 1;
  factory(tree, null, [])();
  function factory(node, index, parents) {
    const value = typeof node === "object" && node !== null ? node : {};
    let name;
    if (typeof value.type === "string") {
      name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : void 0;
      Object.defineProperty(visit2, "name", {
        value: "node (" + color(value.type + (name ? "<" + name + ">" : "")) + ")"
      });
    }
    return visit2;
    function visit2() {
      let result = [];
      let subresult;
      let offset;
      let grandparents;
      if (!test || is(node, index, parents[parents.length - 1] || null)) {
        result = toResult(visitor(node, parents));
        if (result[0] === EXIT) {
          return result;
        }
      }
      if (node.children && result[0] !== SKIP) {
        offset = (reverse ? node.children.length : -1) + step;
        grandparents = parents.concat(node);
        while (offset > -1 && offset < node.children.length) {
          subresult = factory(node.children[offset], offset, grandparents)();
          if (subresult[0] === EXIT) {
            return subresult;
          }
          offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
        }
      }
      return result;
    }
  }
};
function toResult(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === "number") {
    return [CONTINUE, value];
  }
  return [value];
}

// node_modules/.pnpm/unist-util-visit@4.1.1/node_modules/unist-util-visit/index.js
var visit = function(tree, test, visitor, reverse) {
  if (typeof test === "function" && typeof visitor !== "function") {
    reverse = visitor;
    visitor = test;
    test = null;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node, parents) {
    const parent = parents[parents.length - 1];
    return visitor(
      node,
      parent ? parent.children.indexOf(node) : null,
      parent
    );
  }
};

// node_modules/.pnpm/rehype-slug@5.1.0/node_modules/rehype-slug/index.js
var slugs = new (0, _githubslugger2.default)();
function rehypeSlug(options2 = {}) {
  const prefix = options2.prefix || "";
  return (tree) => {
    slugs.reset();
    visit(tree, "element", (node) => {
      if (headingRank(node) && node.properties && !hasProperty(node, "id")) {
        node.properties.id = prefix + slugs.slug(toString(node));
      }
    });
  };
}

// src/node/plugin-mdx/pluginMdxRollup.ts
var _remarkmdxfrontmatter = require('remark-mdx-frontmatter'); var _remarkmdxfrontmatter2 = _interopRequireDefault(_remarkmdxfrontmatter);
var _remarkfrontmatter = require('remark-frontmatter'); var _remarkfrontmatter2 = _interopRequireDefault(_remarkfrontmatter);

// src/node/plugin-mdx/rehypePlugins/preWrapper.ts
var rehypePluginPreWrapper = () => {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (node.tagName === "pre" && _optionalChain([node, 'access', _7 => _7.children, 'access', _8 => _8[0], 'optionalAccess', _9 => _9.type]) === "element" && node.children[0].tagName === "code" && !_optionalChain([node, 'access', _10 => _10.data, 'optionalAccess', _11 => _11.isVisited])) {
        const codeNode = node.children[0];
        const codeClassName = _optionalChain([codeNode, 'access', _12 => _12.properties, 'optionalAccess', _13 => _13.className, 'optionalAccess', _14 => _14.toString, 'call', _15 => _15()]) || "";
        const lang = codeClassName.split("-")[1];
        const clonedNode = {
          type: "element",
          tagName: "pre",
          children: node.children,
          data: {
            isVisited: true
          }
        };
        node.tagName = "div";
        node.properties = node.properties || {};
        node.properties.className = codeClassName;
        node.children = [
          {
            type: "element",
            tagName: "span",
            properties: {
              className: "lang"
            },
            children: [
              {
                type: "text",
                value: lang
              }
            ]
          },
          clonedNode
        ];
      }
    });
  };
};

// src/node/plugin-mdx/rehypePlugins/shiki.ts
var _hastutilfromhtml = require('hast-util-from-html');
var rehypePluginShiki = ({ highlighter }) => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "pre" && _optionalChain([node, 'access', _16 => _16.children, 'access', _17 => _17[0], 'optionalAccess', _18 => _18.type]) === "element" && node.children[0].tagName === "code") {
        const codeNode = node.children[0];
        const codeContent = codeNode.children[0].value;
        const codeClassName = _optionalChain([codeNode, 'access', _19 => _19.properties, 'optionalAccess', _20 => _20.className, 'optionalAccess', _21 => _21.toString, 'call', _22 => _22()]) || "";
        const lang = codeClassName.split("-")[1];
        if (!lang) {
          return;
        }
        const highlightedCode = highlighter.codeToHtml(codeContent, { lang });
        const fragmentAst = _hastutilfromhtml.fromHtml.call(void 0, highlightedCode, { fragment: true });
        parent.children.splice(index, 1, ...fragmentAst.children);
      }
    });
  };
};

// src/node/plugin-mdx/pluginMdxRollup.ts
var _shiki = require('shiki'); var _shiki2 = _interopRequireDefault(_shiki);

// src/node/plugin-mdx/remarkPlugins/toc.ts

var _acorn = require('acorn');
var slugger = new (0, _githubslugger2.default)();
var remarkPluginToc = () => {
  return (tree) => {
    const toc = [];
    visit(tree, "heading", (node) => {
      if (!node.depth || !node.children) {
        return;
      }
      if (node.depth > 1 && node.depth < 5) {
        const originText = node.children.map((child) => {
          switch (child.type) {
            case "link":
              return _optionalChain([child, 'access', _23 => _23.children, 'optionalAccess', _24 => _24.map, 'call', _25 => _25((c) => c.value), 'access', _26 => _26.join, 'call', _27 => _27("")]) || "";
            default:
              return child.value;
          }
        }).join("");
        const id = slugger.slug(originText);
        toc.push({
          id,
          text: originText,
          depth: node.depth
        });
      }
    });
    const insertCode = `export const toc = ${JSON.stringify(toc, null, 2)};`;
    tree.children.push({
      type: "mdxjsEsm",
      value: insertCode,
      data: {
        estree: _acorn.parse.call(void 0, insertCode, {
          ecmaVersion: 2020,
          sourceType: "module"
        })
      }
    });
  };
};

// src/node/plugin-mdx/pluginMdxRollup.ts
async function pluginMdxRollup() {
  return _rollup2.default.call(void 0, {
    remarkPlugins: [
      _remarkgfm2.default,
      _remarkfrontmatter2.default,
      [_remarkmdxfrontmatter2.default, { name: "frontmatter" }],
      remarkPluginToc
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        _rehypeautolinkheadings2.default,
        {
          properties: {
            class: "header-anchor"
          },
          content: {
            type: "text",
            value: "#"
          }
        }
      ],
      rehypePluginPreWrapper,
      [
        rehypePluginShiki,
        { highlighter: await _shiki2.default.getHighlighter({ theme: "nord" }) }
      ]
    ]
  });
}

// src/node/plugin-mdx/index.ts
async function pluginMdx2() {
  return [await pluginMdxRollup(), pluginMdxHMR()];
}

// src/node/vitePlugins.ts
var _vite3 = require('unocss/vite'); var _vite4 = _interopRequireDefault(_vite3);

// src/node/unocssOptions.ts
var _unocss = require('unocss');
var options = {
  presets: [_unocss.presetAttributify.call(void 0, ), _unocss.presetWind.call(void 0, {}), _unocss.presetIcons.call(void 0, )],
  rules: [
    [
      /^divider-(\w+)$/,
      ([, w]) => ({
        [`border-${w}`]: "1px solid var(--island-c-divider-light)"
      })
    ]
  ]
};
var unocssOptions_default = options;

// src/node/vitePlugins.ts
async function createVitePlugins(config, restartServer, isSSR = false) {
  return [
    _vite4.default.call(void 0, unocssOptions_default),
    pluginIndexHtml(),
    _pluginreact2.default.call(void 0, {
      jsxRuntime: "automatic"
    }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSSR
    }),
    await pluginMdx2()
  ];
}






exports.PACKAGE_ROOT = PACKAGE_ROOT; exports.CLIENT_ENTRY_PATH = CLIENT_ENTRY_PATH; exports.SERVER_ENTRY_PATH = SERVER_ENTRY_PATH; exports.createVitePlugins = createVitePlugins;
