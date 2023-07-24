import { hydrateRoot } from "react-dom/client";
import React, { createContext } from "react";
import { jsx } from "react/jsx-runtime";
const scriptRel = "modulepreload";
const assetsURL = function(dep) {
  return "/" + dep;
};
const seen = {};
const __vitePreload = function preload(baseModule, deps, importerUrl) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = assetsURL(dep);
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link2 = document.createElement("link");
    link2.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link2.as = "script";
      link2.crossOrigin = "";
    }
    link2.href = dep;
    document.head.appendChild(link2);
    if (isCss) {
      return new Promise((res, rej) => {
        link2.addEventListener("load", res);
        link2.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _setPrototypeOf(o, p2) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p3) {
    o2.__proto__ = p3;
    return o2;
  };
  return _setPrototypeOf(o, p2);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
var reactIs$1 = { exports: {} };
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l$1 = b ? Symbol.for("react.async_mode") : 60111, m$1 = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l$1:
          case m$1:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m$1;
}
reactIs_production_min.AsyncMode = l$1;
reactIs_production_min.ConcurrentMode = m$1;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p;
reactIs_production_min.isAsyncMode = function(a) {
  return A(a) || z(a) === l$1;
};
reactIs_production_min.isConcurrentMode = A;
reactIs_production_min.isContextConsumer = function(a) {
  return z(a) === k;
};
reactIs_production_min.isContextProvider = function(a) {
  return z(a) === h;
};
reactIs_production_min.isElement = function(a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};
reactIs_production_min.isForwardRef = function(a) {
  return z(a) === n;
};
reactIs_production_min.isFragment = function(a) {
  return z(a) === e;
};
reactIs_production_min.isLazy = function(a) {
  return z(a) === t;
};
reactIs_production_min.isMemo = function(a) {
  return z(a) === r;
};
reactIs_production_min.isPortal = function(a) {
  return z(a) === d;
};
reactIs_production_min.isProfiler = function(a) {
  return z(a) === g;
};
reactIs_production_min.isStrictMode = function(a) {
  return z(a) === f;
};
reactIs_production_min.isSuspense = function(a) {
  return z(a) === p;
};
reactIs_production_min.isValidElementType = function(a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m$1 || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
reactIs_production_min.typeOf = z;
(function(module) {
  {
    module.exports = reactIs_production_min;
  }
})(reactIs$1);
var reactIs = reactIs$1.exports;
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function getStatics(component) {
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e2) {
        }
      }
    }
  }
  return targetComponent;
}
var hoistNonReactStatics_cjs = hoistNonReactStatics;
function invariant(condition, message) {
  if (condition)
    return;
  var error = new Error("loadable: " + message);
  error.framesToPop = 1;
  error.name = "Invariant Violation";
  throw error;
}
var Context = /* @__PURE__ */ React.createContext();
var LOADABLE_SHARED = {
  initialChunks: {}
};
var STATUS_PENDING = "PENDING";
var STATUS_RESOLVED = "RESOLVED";
var STATUS_REJECTED = "REJECTED";
function resolveConstructor(ctor) {
  if (typeof ctor === "function") {
    return {
      requireAsync: ctor,
      resolve: function resolve() {
        return void 0;
      },
      chunkName: function chunkName() {
        return void 0;
      }
    };
  }
  return ctor;
}
var withChunkExtractor = function withChunkExtractor2(Component) {
  var LoadableWithChunkExtractor = function LoadableWithChunkExtractor2(props) {
    return /* @__PURE__ */ jsx(Context.Consumer, {
      children: function(extractor) {
        return /* @__PURE__ */ jsx(Component, {
          ...Object.assign({
            __chunkExtractor: extractor
          }, props)
        });
      }
    });
  };
  if (Component.displayName) {
    LoadableWithChunkExtractor.displayName = Component.displayName + "WithChunkExtractor";
  }
  return LoadableWithChunkExtractor;
};
var identity = function identity2(v2) {
  return v2;
};
function createLoadable(_ref) {
  var _ref$defaultResolveCo = _ref.defaultResolveComponent, defaultResolveComponent2 = _ref$defaultResolveCo === void 0 ? identity : _ref$defaultResolveCo, _render = _ref.render, onLoad2 = _ref.onLoad;
  function loadable2(loadableConstructor, options) {
    if (options === void 0) {
      options = {};
    }
    var ctor = resolveConstructor(loadableConstructor);
    var cache = {};
    function _getCacheKey(props) {
      if (options.cacheKey) {
        return options.cacheKey(props);
      }
      if (ctor.resolve) {
        return ctor.resolve(props);
      }
      return "static";
    }
    function resolve(module, props, Loadable2) {
      var Component = options.resolveComponent ? options.resolveComponent(module, props) : defaultResolveComponent2(module);
      if (options.resolveComponent && !reactIs$1.exports.isValidElementType(Component)) {
        throw new Error("resolveComponent returned something that is not a React component!");
      }
      hoistNonReactStatics_cjs(Loadable2, Component, {
        preload: true
      });
      return Component;
    }
    var cachedLoad = function cachedLoad2(props) {
      var cacheKey = _getCacheKey(props);
      var promise = cache[cacheKey];
      if (!promise || promise.status === STATUS_REJECTED) {
        promise = ctor.requireAsync(props);
        promise.status = STATUS_PENDING;
        cache[cacheKey] = promise;
        promise.then(function() {
          promise.status = STATUS_RESOLVED;
        }, function(error) {
          console.error("loadable-components: failed to asynchronously load component", {
            fileName: ctor.resolve(props),
            chunkName: ctor.chunkName(props),
            error: error ? error.message : error
          });
          promise.status = STATUS_REJECTED;
        });
      }
      return promise;
    };
    var InnerLoadable = /* @__PURE__ */ function(_React$Component) {
      _inheritsLoose(InnerLoadable2, _React$Component);
      InnerLoadable2.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
        var cacheKey = _getCacheKey(props);
        return _extends({}, state, {
          cacheKey,
          loading: state.loading || state.cacheKey !== cacheKey
        });
      };
      function InnerLoadable2(props) {
        var _this;
        _this = _React$Component.call(this, props) || this;
        _this.state = {
          result: null,
          error: null,
          loading: true,
          cacheKey: _getCacheKey(props)
        };
        invariant(!props.__chunkExtractor || ctor.requireSync, "SSR requires `@loadable/babel-plugin`, please install it");
        if (props.__chunkExtractor) {
          if (options.ssr === false) {
            return _assertThisInitialized(_this);
          }
          ctor.requireAsync(props)["catch"](function() {
            return null;
          });
          _this.loadSync();
          props.__chunkExtractor.addChunk(ctor.chunkName(props));
          return _assertThisInitialized(_this);
        }
        if (options.ssr !== false && (ctor.isReady && ctor.isReady(props) || ctor.chunkName && LOADABLE_SHARED.initialChunks[ctor.chunkName(props)])) {
          _this.loadSync();
        }
        return _this;
      }
      var _proto = InnerLoadable2.prototype;
      _proto.componentDidMount = function componentDidMount() {
        this.mounted = true;
        var cachedPromise = this.getCache();
        if (cachedPromise && cachedPromise.status === STATUS_REJECTED) {
          this.setCache();
        }
        if (this.state.loading) {
          this.loadAsync();
        }
      };
      _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (prevState.cacheKey !== this.state.cacheKey) {
          this.loadAsync();
        }
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        this.mounted = false;
      };
      _proto.safeSetState = function safeSetState(nextState, callback) {
        if (this.mounted) {
          this.setState(nextState, callback);
        }
      };
      _proto.getCacheKey = function getCacheKey() {
        return _getCacheKey(this.props);
      };
      _proto.getCache = function getCache() {
        return cache[this.getCacheKey()];
      };
      _proto.setCache = function setCache(value) {
        if (value === void 0) {
          value = void 0;
        }
        cache[this.getCacheKey()] = value;
      };
      _proto.triggerOnLoad = function triggerOnLoad() {
        var _this2 = this;
        if (onLoad2) {
          setTimeout(function() {
            onLoad2(_this2.state.result, _this2.props);
          });
        }
      };
      _proto.loadSync = function loadSync() {
        if (!this.state.loading)
          return;
        try {
          var loadedModule = ctor.requireSync(this.props);
          var result = resolve(loadedModule, this.props, Loadable);
          this.state.result = result;
          this.state.loading = false;
        } catch (error) {
          console.error("loadable-components: failed to synchronously load component, which expected to be available", {
            fileName: ctor.resolve(this.props),
            chunkName: ctor.chunkName(this.props),
            error: error ? error.message : error
          });
          this.state.error = error;
        }
      };
      _proto.loadAsync = function loadAsync() {
        var _this3 = this;
        var promise = this.resolveAsync();
        promise.then(function(loadedModule) {
          var result = resolve(loadedModule, _this3.props, Loadable);
          _this3.safeSetState({
            result,
            loading: false
          }, function() {
            return _this3.triggerOnLoad();
          });
        })["catch"](function(error) {
          return _this3.safeSetState({
            error,
            loading: false
          });
        });
        return promise;
      };
      _proto.resolveAsync = function resolveAsync() {
        var _this$props = this.props;
        _this$props.__chunkExtractor;
        _this$props.forwardedRef;
        var props = _objectWithoutPropertiesLoose(_this$props, ["__chunkExtractor", "forwardedRef"]);
        return cachedLoad(props);
      };
      _proto.render = function render3() {
        var _this$props2 = this.props, forwardedRef = _this$props2.forwardedRef, propFallback = _this$props2.fallback;
        _this$props2.__chunkExtractor;
        var props = _objectWithoutPropertiesLoose(_this$props2, ["forwardedRef", "fallback", "__chunkExtractor"]);
        var _this$state = this.state, error = _this$state.error, loading = _this$state.loading, result = _this$state.result;
        if (options.suspense) {
          var cachedPromise = this.getCache() || this.loadAsync();
          if (cachedPromise.status === STATUS_PENDING) {
            throw this.loadAsync();
          }
        }
        if (error) {
          throw error;
        }
        var fallback = propFallback || options.fallback || null;
        if (loading) {
          return fallback;
        }
        return _render({
          fallback,
          result,
          options,
          props: _extends({}, props, {
            ref: forwardedRef
          })
        });
      };
      return InnerLoadable2;
    }(React.Component);
    var EnhancedInnerLoadable = withChunkExtractor(InnerLoadable);
    var Loadable = React.forwardRef(function(props, ref) {
      return /* @__PURE__ */ jsx(EnhancedInnerLoadable, {
        ...Object.assign({
          forwardedRef: ref
        }, props)
      });
    });
    Loadable.displayName = "Loadable";
    Loadable.preload = function(props) {
      Loadable.load(props);
    };
    Loadable.load = function(props) {
      return cachedLoad(props);
    };
    return Loadable;
  }
  function lazy2(ctor, options) {
    return loadable2(ctor, _extends({}, options, {
      suspense: true
    }));
  }
  return {
    loadable: loadable2,
    lazy: lazy2
  };
}
function defaultResolveComponent(loadedModule) {
  return loadedModule.__esModule ? loadedModule["default"] : loadedModule["default"] || loadedModule;
}
var _createLoadable = /* @__PURE__ */ createLoadable({
  defaultResolveComponent,
  render: function render(_ref) {
    var Component = _ref.result, props = _ref.props;
    return /* @__PURE__ */ jsx(Component, {
      ...props
    });
  }
}), loadable = _createLoadable.loadable, lazy = _createLoadable.lazy;
var _createLoadable$1 = /* @__PURE__ */ createLoadable({
  onLoad: function onLoad(result, props) {
    if (result && props.forwardedRef) {
      if (typeof props.forwardedRef === "function") {
        props.forwardedRef(result);
      } else {
        props.forwardedRef.current = result;
      }
    }
  },
  render: function render2(_ref) {
    var result = _ref.result, props = _ref.props;
    if (props.children) {
      return props.children(result);
    }
    return null;
  }
}), loadable$1 = _createLoadable$1.loadable, lazy$1 = _createLoadable$1.lazy;
var loadable$2 = loadable;
loadable$2.lib = loadable$1;
var lazy$2 = lazy;
lazy$2.lib = lazy$1;
const Route0 = loadable$2(() => __vitePreload(() => import("./Counter.d5b2d18b.js"), true ? [] : void 0));
const Route1 = loadable$2(() => __vitePreload(() => import("./b.4789c82e.js"), true ? [] : void 0));
const Route2 = loadable$2(() => __vitePreload(() => import("./a.446b557f.js"), true ? [] : void 0));
const Route3 = loadable$2(() => __vitePreload(() => import("./b.3425e3ec.js"), true ? [] : void 0));
const Route4 = loadable$2(() => __vitePreload(() => import("./c.5dd7f774.js"), true ? [] : void 0));
const Route5 = loadable$2(() => __vitePreload(() => import("./index.ed0d7078.js"), true ? [] : void 0));
const Route6 = loadable$2(() => __vitePreload(() => import("./index.140b53e0.js"), true ? [] : void 0));
const Route7 = loadable$2(() => __vitePreload(() => import("./index.bc3bce6f.js"), true ? [] : void 0));
const Route8 = loadable$2(() => __vitePreload(() => import("./index.8eacc161.js"), true ? [] : void 0));
const Route9 = loadable$2(() => __vitePreload(() => import("./mvp02.9921601b.js"), true ? [] : void 0));
[
  { path: "/Counter", element: React.createElement(Route0), preload: () => __vitePreload(() => import("./Counter.d5b2d18b.js"), true ? [] : void 0) },
  { path: "/b", element: React.createElement(Route1), preload: () => __vitePreload(() => import("./b.4789c82e.js"), true ? [] : void 0) },
  { path: "/guide/a", element: React.createElement(Route2), preload: () => __vitePreload(() => import("./a.446b557f.js"), true ? [] : void 0) },
  { path: "/guide/b", element: React.createElement(Route3), preload: () => __vitePreload(() => import("./b.3425e3ec.js"), true ? [] : void 0) },
  { path: "/guide/c", element: React.createElement(Route4), preload: () => __vitePreload(() => import("./c.5dd7f774.js"), true ? [] : void 0) },
  { path: "/guide/", element: React.createElement(Route5), preload: () => __vitePreload(() => import("./index.ed0d7078.js"), true ? [] : void 0) },
  { path: "/guide/", element: React.createElement(Route6), preload: () => __vitePreload(() => import("./index.140b53e0.js"), true ? [] : void 0) },
  { path: "/", element: React.createElement(Route7), preload: () => __vitePreload(() => import("./index.bc3bce6f.js"), true ? [] : void 0) },
  { path: "/", element: React.createElement(Route8), preload: () => __vitePreload(() => import("./index.8eacc161.js"), true ? [] : void 0) },
  { path: "/mvp02", element: React.createElement(Route9), preload: () => __vitePreload(() => import("./mvp02.9921601b.js"), true ? [] : void 0) }
];
createContext({});
const nav = "_nav_1eoyk_1";
const link$1 = "_link_1eoyk_7";
const socialLinkIcon = "_social-link-icon_1eoyk_18";
const styles$7 = {
  nav,
  link: link$1,
  socialLinkIcon
};
const check = "_check_rbkha_17";
const icon = "_icon_rbkha_34";
const dark = "_dark_rbkha_29";
const sun = "_sun_rbkha_57";
const moon = "_moon_rbkha_61";
const styles$6 = {
  "switch": "_switch_rbkha_1",
  check,
  icon,
  dark,
  sun,
  moon
};
const APPEARANCE_KEY = "appearance";
const setClassList = (isDark = false) => {
  const classList = document.documentElement.classList;
  if (isDark) {
    classList.add("dark");
  } else {
    classList.remove("dark");
  }
};
const updateAppearance = () => {
  const userPreference = localStorage.getItem(APPEARANCE_KEY);
  setClassList(userPreference === "dark");
};
if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
  updateAppearance();
  window.addEventListener("storage", updateAppearance);
}
const base = "";
const vars = "";
const doc = "";
const __uno = "";
const clip = "_clip_zensi_1";
const styles$5 = {
  clip
};
const link = "_link_r3fql_1";
const styles$4 = {
  link
};
const button = "_button_togsy_1";
const medium = "_medium_togsy_14";
const big = "_big_togsy_21";
const brand = "_brand_togsy_28";
const alt = "_alt_togsy_47";
const styles$3 = {
  button,
  medium,
  big,
  brand,
  alt
};
const sidebar = "_sidebar_16h0y_1";
const styles$2 = {
  sidebar
};
const content = "_content_1d34c_1";
const docContent = "_doc-content_1d34c_8";
const asideContainer = "_aside-container_1d34c_14";
const styles$1 = {
  content,
  docContent,
  asideContainer
};
const prev = "_prev_6xv5j_1";
const next = "_next_6xv5j_2";
const pagerLink = "_pager-link_6xv5j_6";
const title = "_title_6xv5j_20";
const desc = "_desc_6xv5j_29";
const styles = {
  prev,
  next,
  pagerLink,
  title,
  desc
};
var propTypes = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error(
      "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
    );
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes.exports = factoryWithThrowingShims();
}
var l = {
  BASE: "base",
  BODY: "body",
  HEAD: "head",
  HTML: "html",
  LINK: "link",
  META: "meta",
  NOSCRIPT: "noscript",
  SCRIPT: "script",
  STYLE: "style",
  TITLE: "title",
  FRAGMENT: "Symbol(react.fragment)"
};
Object.keys(l).map(function(t2) {
  return l[t2];
});
var m = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
Object.keys(m).reduce(function(t2, e2) {
  return t2[m[e2]] = e2, t2;
}, {});
[l.NOSCRIPT, l.SCRIPT, l.STYLE];
React.createContext({});
var D = propTypes.exports.shape({
  setHelmet: propTypes.exports.func,
  helmetInstances: propTypes.exports.shape({
    get: propTypes.exports.func,
    add: propTypes.exports.func,
    remove: propTypes.exports.func
  })
});
({
  context: propTypes.exports.shape({
    helmet: propTypes.exports.shape()
  }),
  children: propTypes.exports.node.isRequired
});
({
  context: D.isRequired
});
({
  base: propTypes.exports.object,
  bodyAttributes: propTypes.exports.object,
  children: propTypes.exports.oneOfType([propTypes.exports.arrayOf(propTypes.exports.node), propTypes.exports.node]),
  defaultTitle: propTypes.exports.string,
  defer: propTypes.exports.bool,
  encodeSpecialCharacters: propTypes.exports.bool,
  htmlAttributes: propTypes.exports.object,
  link: propTypes.exports.arrayOf(propTypes.exports.object),
  meta: propTypes.exports.arrayOf(propTypes.exports.object),
  noscript: propTypes.exports.arrayOf(propTypes.exports.object),
  onChangeClientState: propTypes.exports.func,
  script: propTypes.exports.arrayOf(propTypes.exports.object),
  style: propTypes.exports.arrayOf(propTypes.exports.object),
  title: propTypes.exports.string,
  titleAttributes: propTypes.exports.object,
  titleTemplate: propTypes.exports.string,
  prioritizeSeoTags: propTypes.exports.bool,
  helmetData: propTypes.exports.object
});
async function renderInBrowser() {
  const containerEl = document.getElementById("root");
  if (!containerEl) {
    throw new Error("#root element not found");
  }
  {
    const islands = document.querySelectorAll("[__island]");
    if (islands.length === 0) {
      return;
    }
    for (const island of islands) {
      const [id, index] = island.getAttribute("__island").split(":");
      const Element = window.ISLANDS[id];
      hydrateRoot(island, /* @__PURE__ */ jsx(Element, {
        ...window.ISLAND_PROPS[index]
      }));
    }
  }
}
renderInBrowser();
