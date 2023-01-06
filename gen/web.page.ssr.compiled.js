var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../../pkgs/royal/pkgs/web-init/src/layout.tsx
var layout;
var init_layout = __esm({
  "../../pkgs/royal/pkgs/web-init/src/layout.tsx"() {
    "use strict";
    layout = (opt) => {
      return opt.component;
    };
  }
});

// ../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.production.min.js
var require_react_production_min = __commonJS({
  "../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = Symbol.for("react.element");
    var n = Symbol.for("react.portal");
    var p = Symbol.for("react.fragment");
    var q = Symbol.for("react.strict_mode");
    var r = Symbol.for("react.profiler");
    var t = Symbol.for("react.provider");
    var u = Symbol.for("react.context");
    var v = Symbol.for("react.forward_ref");
    var w3 = Symbol.for("react.suspense");
    var x = Symbol.for("react.memo");
    var y = Symbol.for("react.lazy");
    var z = Symbol.iterator;
    function A(a) {
      if (null === a || "object" !== typeof a)
        return null;
      a = z && a[z] || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var B = { isMounted: function() {
      return false;
    }, enqueueForceUpdate: function() {
    }, enqueueReplaceState: function() {
    }, enqueueSetState: function() {
    } };
    var C = Object.assign;
    var D = {};
    function E(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function(a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a)
        throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function(a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {
    }
    F.prototype = E.prototype;
    function G(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    var H = G.prototype = new F();
    H.constructor = G;
    C(H, E.prototype);
    H.isPureReactComponent = true;
    var I = Array.isArray;
    var J = Object.prototype.hasOwnProperty;
    var K = { current: null };
    var L = { key: true, ref: true, __self: true, __source: true };
    function M(a, b, e) {
      var d, c = {}, k = null, h = null;
      if (null != b)
        for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b)
          J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (1 === g)
        c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++)
          f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps)
        for (d in g = a.defaultProps, g)
          void 0 === c[d] && (c[d] = g[d]);
      return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
    }
    function N(a, b) {
      return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
    }
    function O(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return "$" + a.replace(/[=:]/g, function(a2) {
        return b[a2];
      });
    }
    var P = /\/+/g;
    function Q(a, b) {
      return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
    }
    function R(a, b, e, d, c) {
      var k = typeof a;
      if ("undefined" === k || "boolean" === k)
        a = null;
      var h = false;
      if (null === a)
        h = true;
      else
        switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
      if (h)
        return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
      h = 0;
      d = "" === d ? "." : d + ":";
      if (I(a))
        for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
      else if (f = A(a), "function" === typeof f)
        for (a = f.call(a), g = 0; !(k = a.next()).done; )
          k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
      else if ("object" === k)
        throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
      return h;
    }
    function S(a, b, e) {
      if (null == a)
        return a;
      var d = [], c = 0;
      R(a, d, "", "", function(a2) {
        return b.call(e, a2, c++);
      });
      return d;
    }
    function T(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(function(b2) {
          if (0 === a._status || -1 === a._status)
            a._status = 1, a._result = b2;
        }, function(b2) {
          if (0 === a._status || -1 === a._status)
            a._status = 2, a._result = b2;
        });
        -1 === a._status && (a._status = 0, a._result = b);
      }
      if (1 === a._status)
        return a._result.default;
      throw a._result;
    }
    var U = { current: null };
    var V = { transition: null };
    var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
    exports.Children = { map: S, forEach: function(a, b, e) {
      S(a, function() {
        b.apply(this, arguments);
      }, e);
    }, count: function(a) {
      var b = 0;
      S(a, function() {
        b++;
      });
      return b;
    }, toArray: function(a) {
      return S(a, function(a2) {
        return a2;
      }) || [];
    }, only: function(a) {
      if (!O(a))
        throw Error("React.Children.only expected to receive a single React element child.");
      return a;
    } };
    exports.Component = E;
    exports.Fragment = p;
    exports.Profiler = r;
    exports.PureComponent = G;
    exports.StrictMode = q;
    exports.Suspense = w3;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    exports.cloneElement = function(a, b, e) {
      if (null === a || void 0 === a)
        throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
      var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
      if (null != b) {
        void 0 !== b.ref && (k = b.ref, h = K.current);
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps)
          var g = a.type.defaultProps;
        for (f in b)
          J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (1 === f)
        d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++)
          g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    exports.createContext = function(a) {
      a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
      a.Provider = { $$typeof: t, _context: a };
      return a.Consumer = a;
    };
    exports.createElement = M;
    exports.createFactory = function(a) {
      var b = M.bind(null, a);
      b.type = a;
      return b;
    };
    exports.createRef = function() {
      return { current: null };
    };
    exports.forwardRef = function(a) {
      return { $$typeof: v, render: a };
    };
    exports.isValidElement = O;
    exports.lazy = function(a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    exports.memo = function(a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
    };
    exports.startTransition = function(a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    exports.unstable_act = function() {
      throw Error("act(...) is not supported in production builds of React.");
    };
    exports.useCallback = function(a, b) {
      return U.current.useCallback(a, b);
    };
    exports.useContext = function(a) {
      return U.current.useContext(a);
    };
    exports.useDebugValue = function() {
    };
    exports.useDeferredValue = function(a) {
      return U.current.useDeferredValue(a);
    };
    exports.useEffect = function(a, b) {
      return U.current.useEffect(a, b);
    };
    exports.useId = function() {
      return U.current.useId();
    };
    exports.useImperativeHandle = function(a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    exports.useInsertionEffect = function(a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    exports.useLayoutEffect = function(a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    exports.useMemo = function(a, b) {
      return U.current.useMemo(a, b);
    };
    exports.useReducer = function(a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    exports.useRef = function(a) {
      return U.current.useRef(a);
    };
    exports.useState = function(a) {
      return U.current.useState(a);
    };
    exports.useSyncExternalStore = function(a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    exports.useTransition = function() {
      return U.current.useTransition();
    };
    exports.version = "18.2.0";
  }
});

// ../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.development.js
var require_react_development = __commonJS({
  "../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react.development.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var ReactVersion = "18.2.0";
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactCurrentDispatcher = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactCurrentBatchConfig = {
          transition: null
        };
        var ReactCurrentActQueue = {
          current: null,
          // Used to reproduce behavior of `batchedUpdates` in legacy mode.
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false
        };
        var ReactCurrentOwner = {
          /**
           * @internal
           * @type {ReactComponent}
           */
          current: null
        };
        var ReactDebugCurrentFrame = {};
        var currentExtraStackFrame = null;
        function setExtraStackFrame(stack) {
          {
            currentExtraStackFrame = stack;
          }
        }
        {
          ReactDebugCurrentFrame.setExtraStackFrame = function(stack) {
            {
              currentExtraStackFrame = stack;
            }
          };
          ReactDebugCurrentFrame.getCurrentStack = null;
          ReactDebugCurrentFrame.getStackAddendum = function() {
            var stack = "";
            if (currentExtraStackFrame) {
              stack += currentExtraStackFrame;
            }
            var impl = ReactDebugCurrentFrame.getCurrentStack;
            if (impl) {
              stack += impl() || "";
            }
            return stack;
          };
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var ReactSharedInternals = {
          ReactCurrentDispatcher,
          ReactCurrentBatchConfig,
          ReactCurrentOwner
        };
        {
          ReactSharedInternals.ReactDebugCurrentFrame = ReactDebugCurrentFrame;
          ReactSharedInternals.ReactCurrentActQueue = ReactCurrentActQueue;
        }
        function warn(format) {
          {
            {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }
              printWarning("warn", format, args);
            }
          }
        }
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var didWarnStateUpdateForUnmountedComponent = {};
        function warnNoop(publicInstance, callerName) {
          {
            var _constructor = publicInstance.constructor;
            var componentName = _constructor && (_constructor.displayName || _constructor.name) || "ReactClass";
            var warningKey = componentName + "." + callerName;
            if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
              return;
            }
            error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, componentName);
            didWarnStateUpdateForUnmountedComponent[warningKey] = true;
          }
        }
        var ReactNoopUpdateQueue = {
          /**
           * Checks whether or not this composite component is mounted.
           * @param {ReactClass} publicInstance The instance we want to test.
           * @return {boolean} True if mounted, false otherwise.
           * @protected
           * @final
           */
          isMounted: function(publicInstance) {
            return false;
          },
          /**
           * Forces an update. This should only be invoked when it is known with
           * certainty that we are **not** in a DOM transaction.
           *
           * You may want to call this when you know that some deeper aspect of the
           * component's state has changed but `setState` was not called.
           *
           * This will not invoke `shouldComponentUpdate`, but it will invoke
           * `componentWillUpdate` and `componentDidUpdate`.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueForceUpdate: function(publicInstance, callback, callerName) {
            warnNoop(publicInstance, "forceUpdate");
          },
          /**
           * Replaces all of the state. Always use this or `setState` to mutate state.
           * You should treat `this.state` as immutable.
           *
           * There is no guarantee that `this.state` will be immediately updated, so
           * accessing `this.state` after calling this method may return the old value.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} completeState Next state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} callerName name of the calling function in the public API.
           * @internal
           */
          enqueueReplaceState: function(publicInstance, completeState, callback, callerName) {
            warnNoop(publicInstance, "replaceState");
          },
          /**
           * Sets a subset of the state. This only exists because _pendingState is
           * internal. This provides a merging strategy that is not available to deep
           * properties which is confusing. TODO: Expose pendingState or don't use it
           * during the merge.
           *
           * @param {ReactClass} publicInstance The instance that should rerender.
           * @param {object} partialState Next partial state to be merged with state.
           * @param {?function} callback Called after component is updated.
           * @param {?string} Name of the calling function in the public API.
           * @internal
           */
          enqueueSetState: function(publicInstance, partialState, callback, callerName) {
            warnNoop(publicInstance, "setState");
          }
        };
        var assign2 = Object.assign;
        var emptyObject = {};
        {
          Object.freeze(emptyObject);
        }
        function Component2(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        Component2.prototype.isReactComponent = {};
        Component2.prototype.setState = function(partialState, callback) {
          if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null) {
            throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
          }
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component2.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        {
          var deprecatedAPIs = {
            isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
            replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
          };
          var defineDeprecationWarning = function(methodName, info) {
            Object.defineProperty(Component2.prototype, methodName, {
              get: function() {
                warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
                return void 0;
              }
            });
          };
          for (var fnName in deprecatedAPIs) {
            if (deprecatedAPIs.hasOwnProperty(fnName)) {
              defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
            }
          }
        }
        function ComponentDummy() {
        }
        ComponentDummy.prototype = Component2.prototype;
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
        pureComponentPrototype.constructor = PureComponent;
        assign2(pureComponentPrototype, Component2.prototype);
        pureComponentPrototype.isPureReactComponent = true;
        function createRef() {
          var refObject = {
            current: null
          };
          {
            Object.seal(refObject);
          }
          return refObject;
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var hasOwnProperty2 = Object.prototype.hasOwnProperty;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty2.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty2.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          var warnAboutAccessingKey = function() {
            {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function defineRefPropWarningGetter(props, displayName) {
          var warnAboutAccessingRef = function() {
            {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
        function warnIfStringRefCannotBeAutoConverted(config) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', componentName, config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        var ReactElement3 = function(type, key, ref, self2, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self2
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function createElement4(type, config, children) {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          var self2 = null;
          var source = null;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              {
                warnIfStringRefCannotBeAutoConverted(config);
              }
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            self2 = config.__self === void 0 ? null : config.__self;
            source = config.__source === void 0 ? null : config.__source;
            for (propName in config) {
              if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            {
              if (Object.freeze) {
                Object.freeze(childArray);
              }
            }
            props.children = childArray;
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          {
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
          }
          return ReactElement3(type, key, ref, self2, source, ReactCurrentOwner.current, props);
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          var newElement = ReactElement3(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
          return newElement;
        }
        function cloneElement(element, config, children) {
          if (element === null || element === void 0) {
            throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + element + ".");
          }
          var propName;
          var props = assign2({}, element.props);
          var key = element.key;
          var ref = element.ref;
          var self2 = element._self;
          var source = element._source;
          var owner = element._owner;
          if (config != null) {
            if (hasValidRef(config)) {
              ref = config.ref;
              owner = ReactCurrentOwner.current;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            var defaultProps;
            if (element.type && element.type.defaultProps) {
              defaultProps = element.type.defaultProps;
            }
            for (propName in config) {
              if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                if (config[propName] === void 0 && defaultProps !== void 0) {
                  props[propName] = defaultProps[propName];
                } else {
                  props[propName] = config[propName];
                }
              }
            }
          }
          var childrenLength = arguments.length - 2;
          if (childrenLength === 1) {
            props.children = children;
          } else if (childrenLength > 1) {
            var childArray = Array(childrenLength);
            for (var i = 0; i < childrenLength; i++) {
              childArray[i] = arguments[i + 2];
            }
            props.children = childArray;
          }
          return ReactElement3(element.type, key, ref, self2, source, owner, props);
        }
        function isValidElement3(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var SEPARATOR = ".";
        var SUBSEPARATOR = ":";
        function escape(key) {
          var escapeRegex = /[=:]/g;
          var escaperLookup = {
            "=": "=0",
            ":": "=2"
          };
          var escapedString = key.replace(escapeRegex, function(match2) {
            return escaperLookup[match2];
          });
          return "$" + escapedString;
        }
        var didWarnAboutMaps = false;
        var userProvidedKeyEscapeRegex = /\/+/g;
        function escapeUserProvidedKey(text) {
          return text.replace(userProvidedKeyEscapeRegex, "$&/");
        }
        function getElementKey(element, index) {
          if (typeof element === "object" && element !== null && element.key != null) {
            {
              checkKeyStringCoercion(element.key);
            }
            return escape("" + element.key);
          }
          return index.toString(36);
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if (type === "undefined" || type === "boolean") {
            children = null;
          }
          var invokeCallback = false;
          if (children === null) {
            invokeCallback = true;
          } else {
            switch (type) {
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                }
            }
          }
          if (invokeCallback) {
            var _child = children;
            var mappedChild = callback(_child);
            var childKey = nameSoFar === "" ? SEPARATOR + getElementKey(_child, 0) : nameSoFar;
            if (isArray(mappedChild)) {
              var escapedChildKey = "";
              if (childKey != null) {
                escapedChildKey = escapeUserProvidedKey(childKey) + "/";
              }
              mapIntoArray(mappedChild, array, escapedChildKey, "", function(c) {
                return c;
              });
            } else if (mappedChild != null) {
              if (isValidElement3(mappedChild)) {
                {
                  if (mappedChild.key && (!_child || _child.key !== mappedChild.key)) {
                    checkKeyStringCoercion(mappedChild.key);
                  }
                }
                mappedChild = cloneAndReplaceKey(
                  mappedChild,
                  // Keep both the (mapped) and old keys if they differ, just as
                  // traverseAllChildren used to do for objects as children
                  escapedPrefix + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
                  (mappedChild.key && (!_child || _child.key !== mappedChild.key) ? (
                    // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
                    // eslint-disable-next-line react-internal/safe-string-coercion
                    escapeUserProvidedKey("" + mappedChild.key) + "/"
                  ) : "") + childKey
                );
              }
              array.push(mappedChild);
            }
            return 1;
          }
          var child;
          var nextName;
          var subtreeCount = 0;
          var nextNamePrefix = nameSoFar === "" ? SEPARATOR : nameSoFar + SUBSEPARATOR;
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              child = children[i];
              nextName = nextNamePrefix + getElementKey(child, i);
              subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
            }
          } else {
            var iteratorFn = getIteratorFn(children);
            if (typeof iteratorFn === "function") {
              var iterableChildren = children;
              {
                if (iteratorFn === iterableChildren.entries) {
                  if (!didWarnAboutMaps) {
                    warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead.");
                  }
                  didWarnAboutMaps = true;
                }
              }
              var iterator = iteratorFn.call(iterableChildren);
              var step;
              var ii = 0;
              while (!(step = iterator.next()).done) {
                child = step.value;
                nextName = nextNamePrefix + getElementKey(child, ii++);
                subtreeCount += mapIntoArray(child, array, escapedPrefix, nextName, callback);
              }
            } else if (type === "object") {
              var childrenString = String(children);
              throw new Error("Objects are not valid as a React child (found: " + (childrenString === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : childrenString) + "). If you meant to render a collection of children, use an array instead.");
            }
          }
          return subtreeCount;
        }
        function mapChildren(children, func, context) {
          if (children == null) {
            return children;
          }
          var result = [];
          var count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function countChildren(children) {
          var n = 0;
          mapChildren(children, function() {
            n++;
          });
          return n;
        }
        function forEachChildren(children, forEachFunc, forEachContext) {
          mapChildren(children, function() {
            forEachFunc.apply(this, arguments);
          }, forEachContext);
        }
        function toArray(children) {
          return mapChildren(children, function(child) {
            return child;
          }) || [];
        }
        function onlyChild(children) {
          if (!isValidElement3(children)) {
            throw new Error("React.Children.only expected to receive a single React element child.");
          }
          return children;
        }
        function createContext8(defaultValue) {
          var context = {
            $$typeof: REACT_CONTEXT_TYPE,
            // As a workaround to support multiple concurrent renderers, we categorize
            // some renderers as primary and others as secondary. We only expect
            // there to be two concurrent renderers at most: React Native (primary) and
            // Fabric (secondary); React DOM (primary) and React ART (secondary).
            // Secondary renderers store their context values on separate fields.
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            // Used to track how many concurrent renderers this context currently
            // supports within in a single renderer. Such as parallel server rendering.
            _threadCount: 0,
            // These are circular
            Provider: null,
            Consumer: null,
            // Add these to use same hidden class in VM as ServerContext
            _defaultValue: null,
            _globalName: null
          };
          context.Provider = {
            $$typeof: REACT_PROVIDER_TYPE,
            _context: context
          };
          var hasWarnedAboutUsingNestedContextConsumers = false;
          var hasWarnedAboutUsingConsumerProvider = false;
          var hasWarnedAboutDisplayNameOnConsumer = false;
          {
            var Consumer = {
              $$typeof: REACT_CONTEXT_TYPE,
              _context: context
            };
            Object.defineProperties(Consumer, {
              Provider: {
                get: function() {
                  if (!hasWarnedAboutUsingConsumerProvider) {
                    hasWarnedAboutUsingConsumerProvider = true;
                    error("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?");
                  }
                  return context.Provider;
                },
                set: function(_Provider) {
                  context.Provider = _Provider;
                }
              },
              _currentValue: {
                get: function() {
                  return context._currentValue;
                },
                set: function(_currentValue) {
                  context._currentValue = _currentValue;
                }
              },
              _currentValue2: {
                get: function() {
                  return context._currentValue2;
                },
                set: function(_currentValue2) {
                  context._currentValue2 = _currentValue2;
                }
              },
              _threadCount: {
                get: function() {
                  return context._threadCount;
                },
                set: function(_threadCount) {
                  context._threadCount = _threadCount;
                }
              },
              Consumer: {
                get: function() {
                  if (!hasWarnedAboutUsingNestedContextConsumers) {
                    hasWarnedAboutUsingNestedContextConsumers = true;
                    error("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?");
                  }
                  return context.Consumer;
                }
              },
              displayName: {
                get: function() {
                  return context.displayName;
                },
                set: function(displayName) {
                  if (!hasWarnedAboutDisplayNameOnConsumer) {
                    warn("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", displayName);
                    hasWarnedAboutDisplayNameOnConsumer = true;
                  }
                }
              }
            });
            context.Consumer = Consumer;
          }
          {
            context._currentRenderer = null;
            context._currentRenderer2 = null;
          }
          return context;
        }
        var Uninitialized = -1;
        var Pending = 0;
        var Resolved = 1;
        var Rejected = 2;
        function lazyInitializer(payload) {
          if (payload._status === Uninitialized) {
            var ctor = payload._result;
            var thenable = ctor();
            thenable.then(function(moduleObject2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var resolved = payload;
                resolved._status = Resolved;
                resolved._result = moduleObject2;
              }
            }, function(error2) {
              if (payload._status === Pending || payload._status === Uninitialized) {
                var rejected = payload;
                rejected._status = Rejected;
                rejected._result = error2;
              }
            });
            if (payload._status === Uninitialized) {
              var pending = payload;
              pending._status = Pending;
              pending._result = thenable;
            }
          }
          if (payload._status === Resolved) {
            var moduleObject = payload._result;
            {
              if (moduleObject === void 0) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", moduleObject);
              }
            }
            {
              if (!("default" in moduleObject)) {
                error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", moduleObject);
              }
            }
            return moduleObject.default;
          } else {
            throw payload._result;
          }
        }
        function lazy2(ctor) {
          var payload = {
            // We use these fields to store the result.
            _status: Uninitialized,
            _result: ctor
          };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: payload,
            _init: lazyInitializer
          };
          {
            var defaultProps;
            var propTypes;
            Object.defineProperties(lazyType, {
              defaultProps: {
                configurable: true,
                get: function() {
                  return defaultProps;
                },
                set: function(newDefaultProps) {
                  error("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  defaultProps = newDefaultProps;
                  Object.defineProperty(lazyType, "defaultProps", {
                    enumerable: true
                  });
                }
              },
              propTypes: {
                configurable: true,
                get: function() {
                  return propTypes;
                },
                set: function(newPropTypes) {
                  error("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it.");
                  propTypes = newPropTypes;
                  Object.defineProperty(lazyType, "propTypes", {
                    enumerable: true
                  });
                }
              }
            });
          }
          return lazyType;
        }
        function forwardRef3(render) {
          {
            if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
              error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).");
            } else if (typeof render !== "function") {
              error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render);
            } else {
              if (render.length !== 0 && render.length !== 2) {
                error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
              }
            }
            if (render != null) {
              if (render.defaultProps != null || render.propTypes != null) {
                error("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
              }
            }
          }
          var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!render.name && !render.displayName) {
                  render.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function memo(type, compare) {
          {
            if (!isValidElementType(type)) {
              error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
            }
          }
          var elementType = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: compare === void 0 ? null : compare
          };
          {
            var ownName;
            Object.defineProperty(elementType, "displayName", {
              enumerable: false,
              configurable: true,
              get: function() {
                return ownName;
              },
              set: function(name) {
                ownName = name;
                if (!type.name && !type.displayName) {
                  type.displayName = name;
                }
              }
            });
          }
          return elementType;
        }
        function resolveDispatcher() {
          var dispatcher = ReactCurrentDispatcher.current;
          {
            if (dispatcher === null) {
              error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.");
            }
          }
          return dispatcher;
        }
        function useContext8(Context) {
          var dispatcher = resolveDispatcher();
          {
            if (Context._context !== void 0) {
              var realContext = Context._context;
              if (realContext.Consumer === Context) {
                error("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?");
              } else if (realContext.Provider === Context) {
                error("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
              }
            }
          }
          return dispatcher.useContext(Context);
        }
        function useState7(initialState) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useState(initialState);
        }
        function useReducer3(reducer, initialArg, init) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useReducer(reducer, initialArg, init);
        }
        function useRef11(initialValue) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useRef(initialValue);
        }
        function useEffect13(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useEffect(create, deps);
        }
        function useInsertionEffect5(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useInsertionEffect(create, deps);
        }
        function useLayoutEffect4(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useLayoutEffect(create, deps);
        }
        function useCallback5(callback, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useCallback(callback, deps);
        }
        function useMemo5(create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useMemo(create, deps);
        }
        function useImperativeHandle(ref, create, deps) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useImperativeHandle(ref, create, deps);
        }
        function useDebugValue(value, formatterFn) {
          {
            var dispatcher = resolveDispatcher();
            return dispatcher.useDebugValue(value, formatterFn);
          }
        }
        function useTransition() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useTransition();
        }
        function useDeferredValue(value) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useDeferredValue(value);
        }
        function useId2() {
          var dispatcher = resolveDispatcher();
          return dispatcher.useId();
        }
        function useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
          var dispatcher = resolveDispatcher();
          return dispatcher.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
        }
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign2({}, props, {
                  value: prevLog
                }),
                info: assign2({}, props, {
                  value: prevInfo
                }),
                warn: assign2({}, props, {
                  value: prevWarn
                }),
                error: assign2({}, props, {
                  value: prevError
                }),
                group: assign2({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign2({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign2({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix2;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix2 === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match2 = x.stack.trim().match(/\n( *(at )?)/);
                prefix2 = match2 && match2[1] || "";
              }
            }
            return "\n" + prefix2 + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher$1.current;
            ReactCurrentDispatcher$1.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher$1.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component3) {
          var prototype = Component3.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location2, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty2);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location2, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              setExtraStackFrame(stack);
            } else {
              setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function getDeclarationErrorAddendum() {
          if (ReactCurrentOwner.current) {
            var name = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
        function getSourceInfoErrorAddendum(source) {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
        function getSourceInfoErrorAddendumForProps(elementProps) {
          if (elementProps !== null && elementProps !== void 0) {
            return getSourceInfoErrorAddendum(elementProps.__source);
          }
          return "";
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
        function validateExplicitKey(element, parentType) {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          {
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node2, parentType) {
          if (typeof node2 !== "object") {
            return;
          }
          if (isArray(node2)) {
            for (var i = 0; i < node2.length; i++) {
              var child = node2[i];
              if (isValidElement3(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement3(node2)) {
            if (node2._store) {
              node2._store.validated = true;
            }
          } else if (node2) {
            var iteratorFn = getIteratorFn(node2);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node2.entries) {
                var iterator = iteratorFn.call(node2);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement3(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function createElementWithValidation(type, props, children) {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendumForProps(props);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            {
              error("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
          }
          var element = createElement4.apply(this, arguments);
          if (element == null) {
            return element;
          }
          if (validType) {
            for (var i = 2; i < arguments.length; i++) {
              validateChildKeys(arguments[i], type);
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
        var didWarnAboutDeprecatedCreateFactory = false;
        function createFactoryWithValidation(type) {
          var validatedFactory = createElementWithValidation.bind(null, type);
          validatedFactory.type = type;
          {
            if (!didWarnAboutDeprecatedCreateFactory) {
              didWarnAboutDeprecatedCreateFactory = true;
              warn("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.");
            }
            Object.defineProperty(validatedFactory, "type", {
              enumerable: false,
              get: function() {
                warn("Factory.type is deprecated. Access the class directly before passing it to createFactory.");
                Object.defineProperty(this, "type", {
                  value: type
                });
                return type;
              }
            });
          }
          return validatedFactory;
        }
        function cloneElementWithValidation(element, props, children) {
          var newElement = cloneElement.apply(this, arguments);
          for (var i = 2; i < arguments.length; i++) {
            validateChildKeys(arguments[i], newElement.type);
          }
          validatePropTypes(newElement);
          return newElement;
        }
        function startTransition(scope, options) {
          var prevTransition = ReactCurrentBatchConfig.transition;
          ReactCurrentBatchConfig.transition = {};
          var currentTransition = ReactCurrentBatchConfig.transition;
          {
            ReactCurrentBatchConfig.transition._updatedFibers = /* @__PURE__ */ new Set();
          }
          try {
            scope();
          } finally {
            ReactCurrentBatchConfig.transition = prevTransition;
            {
              if (prevTransition === null && currentTransition._updatedFibers) {
                var updatedFibersCount = currentTransition._updatedFibers.size;
                if (updatedFibersCount > 10) {
                  warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.");
                }
                currentTransition._updatedFibers.clear();
              }
            }
          }
        }
        var didWarnAboutMessageChannel = false;
        var enqueueTaskImpl = null;
        function enqueueTask(task) {
          if (enqueueTaskImpl === null) {
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              var nodeRequire = module2 && module2[requireString];
              enqueueTaskImpl = nodeRequire.call(module2, "timers").setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                {
                  if (didWarnAboutMessageChannel === false) {
                    didWarnAboutMessageChannel = true;
                    if (typeof MessageChannel === "undefined") {
                      error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning.");
                    }
                  }
                }
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          }
          return enqueueTaskImpl(task);
        }
        var actScopeDepth = 0;
        var didWarnNoAwaitAct = false;
        function act(callback) {
          {
            var prevActScopeDepth = actScopeDepth;
            actScopeDepth++;
            if (ReactCurrentActQueue.current === null) {
              ReactCurrentActQueue.current = [];
            }
            var prevIsBatchingLegacy = ReactCurrentActQueue.isBatchingLegacy;
            var result;
            try {
              ReactCurrentActQueue.isBatchingLegacy = true;
              result = callback();
              if (!prevIsBatchingLegacy && ReactCurrentActQueue.didScheduleLegacyUpdate) {
                var queue = ReactCurrentActQueue.current;
                if (queue !== null) {
                  ReactCurrentActQueue.didScheduleLegacyUpdate = false;
                  flushActQueue(queue);
                }
              }
            } catch (error2) {
              popActScope(prevActScopeDepth);
              throw error2;
            } finally {
              ReactCurrentActQueue.isBatchingLegacy = prevIsBatchingLegacy;
            }
            if (result !== null && typeof result === "object" && typeof result.then === "function") {
              var thenableResult = result;
              var wasAwaited = false;
              var thenable = {
                then: function(resolve, reject) {
                  wasAwaited = true;
                  thenableResult.then(function(returnValue2) {
                    popActScope(prevActScopeDepth);
                    if (actScopeDepth === 0) {
                      recursivelyFlushAsyncActWork(returnValue2, resolve, reject);
                    } else {
                      resolve(returnValue2);
                    }
                  }, function(error2) {
                    popActScope(prevActScopeDepth);
                    reject(error2);
                  });
                }
              };
              {
                if (!didWarnNoAwaitAct && typeof Promise !== "undefined") {
                  Promise.resolve().then(function() {
                  }).then(function() {
                    if (!wasAwaited) {
                      didWarnNoAwaitAct = true;
                      error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);");
                    }
                  });
                }
              }
              return thenable;
            } else {
              var returnValue = result;
              popActScope(prevActScopeDepth);
              if (actScopeDepth === 0) {
                var _queue = ReactCurrentActQueue.current;
                if (_queue !== null) {
                  flushActQueue(_queue);
                  ReactCurrentActQueue.current = null;
                }
                var _thenable = {
                  then: function(resolve, reject) {
                    if (ReactCurrentActQueue.current === null) {
                      ReactCurrentActQueue.current = [];
                      recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                    } else {
                      resolve(returnValue);
                    }
                  }
                };
                return _thenable;
              } else {
                var _thenable2 = {
                  then: function(resolve, reject) {
                    resolve(returnValue);
                  }
                };
                return _thenable2;
              }
            }
          }
        }
        function popActScope(prevActScopeDepth) {
          {
            if (prevActScopeDepth !== actScopeDepth - 1) {
              error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
            }
            actScopeDepth = prevActScopeDepth;
          }
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          {
            var queue = ReactCurrentActQueue.current;
            if (queue !== null) {
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  if (queue.length === 0) {
                    ReactCurrentActQueue.current = null;
                    resolve(returnValue);
                  } else {
                    recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  }
                });
              } catch (error2) {
                reject(error2);
              }
            } else {
              resolve(returnValue);
            }
          }
        }
        var isFlushing = false;
        function flushActQueue(queue) {
          {
            if (!isFlushing) {
              isFlushing = true;
              var i = 0;
              try {
                for (; i < queue.length; i++) {
                  var callback = queue[i];
                  do {
                    callback = callback(true);
                  } while (callback !== null);
                }
                queue.length = 0;
              } catch (error2) {
                queue = queue.slice(i + 1);
                throw error2;
              } finally {
                isFlushing = false;
              }
            }
          }
        }
        var createElement$1 = createElementWithValidation;
        var cloneElement$1 = cloneElementWithValidation;
        var createFactory = createFactoryWithValidation;
        var Children = {
          map: mapChildren,
          forEach: forEachChildren,
          count: countChildren,
          toArray,
          only: onlyChild
        };
        exports.Children = Children;
        exports.Component = Component2;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
        exports.cloneElement = cloneElement$1;
        exports.createContext = createContext8;
        exports.createElement = createElement$1;
        exports.createFactory = createFactory;
        exports.createRef = createRef;
        exports.forwardRef = forwardRef3;
        exports.isValidElement = isValidElement3;
        exports.lazy = lazy2;
        exports.memo = memo;
        exports.startTransition = startTransition;
        exports.unstable_act = act;
        exports.useCallback = useCallback5;
        exports.useContext = useContext8;
        exports.useDebugValue = useDebugValue;
        exports.useDeferredValue = useDeferredValue;
        exports.useEffect = useEffect13;
        exports.useId = useId2;
        exports.useImperativeHandle = useImperativeHandle;
        exports.useInsertionEffect = useInsertionEffect5;
        exports.useLayoutEffect = useLayoutEffect4;
        exports.useMemo = useMemo5;
        exports.useReducer = useReducer3;
        exports.useRef = useRef11;
        exports.useState = useState7;
        exports.useSyncExternalStore = useSyncExternalStore;
        exports.useTransition = useTransition;
        exports.version = ReactVersion;
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function") {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
      })();
    }
  }
});

// ../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js
var require_react = __commonJS({
  "../../node_modules/.pnpm/react@18.2.0/node_modules/react/index.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_production_min();
    } else {
      module2.exports = require_react_development();
    }
  }
});

// ../../pkgs/royal/pkgs/web-utils/src/use-local.ts
var import_react;
var init_use_local = __esm({
  "../../pkgs/royal/pkgs/web-utils/src/use-local.ts"() {
    "use strict";
    import_react = __toESM(require_react());
  }
});

// ../../pkgs/royal/pkgs/web-utils/src/use-global.ts
var import_react2, GlobalContext;
var init_use_global = __esm({
  "../../pkgs/royal/pkgs/web-utils/src/use-global.ts"() {
    "use strict";
    import_react2 = __toESM(require_react());
    GlobalContext = (0, import_react2.createContext)({
      global: /* @__PURE__ */ new WeakMap(),
      render: () => {
      }
    });
  }
});

// ../../pkgs/royal/pkgs/web-utils/src/wait-until.ts
var waitUntil;
var init_wait_until = __esm({
  "../../pkgs/royal/pkgs/web-utils/src/wait-until.ts"() {
    "use strict";
    waitUntil = (condition, timeout) => {
      return new Promise(async (resolve) => {
        if (typeof condition === "function") {
          let tout = null;
          if (timeout) {
            tout = setTimeout(resolve, timeout);
          }
          if (await condition()) {
            clearTimeout(tout);
            resolve();
            return;
          }
          let count = 0;
          const c = setInterval(async () => {
            if (await condition()) {
              if (tout)
                clearTimeout(tout);
              clearInterval(c);
              resolve();
            }
            if (count > 100) {
              clearInterval(c);
            }
          }, 100);
        } else if (typeof condition === "number") {
          setTimeout(() => {
            resolve();
          }, condition);
        }
      });
    };
  }
});

// ../../pkgs/royal/pkgs/web-utils/src/index.ts
var init_src = __esm({
  "../../pkgs/royal/pkgs/web-utils/src/index.ts"() {
    init_use_local();
    init_use_global();
    init_wait_until();
  }
});

// ../../pkgs/royal/pkgs/web-init/src/core/router.ts
var import_react3, w;
var init_router = __esm({
  "../../pkgs/royal/pkgs/web-init/src/core/router.ts"() {
    "use strict";
    import_react3 = __toESM(require_react());
    w = typeof isSSR === "undefined" ? window : global.window;
    if (w && w.appRoot) {
      w.appRoot.router = void 0;
      if (w.appRoot.render)
        w.appRoot.render();
    }
  }
});

// ../../node_modules/.pnpm/@emotion+sheet@1.2.1/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      return document.styleSheets[i];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet;
var init_emotion_sheet_esm = __esm({
  "../../node_modules/.pnpm/@emotion+sheet@1.2.1/node_modules/@emotion/sheet/dist/emotion-sheet.esm.js"() {
    StyleSheet = /* @__PURE__ */ function() {
      function StyleSheet2(options) {
        var _this = this;
        this._insertTag = function(tag) {
          var before;
          if (_this.tags.length === 0) {
            if (_this.insertionPoint) {
              before = _this.insertionPoint.nextSibling;
            } else if (_this.prepend) {
              before = _this.container.firstChild;
            } else {
              before = _this.before;
            }
          } else {
            before = _this.tags[_this.tags.length - 1].nextSibling;
          }
          _this.container.insertBefore(tag, before);
          _this.tags.push(tag);
        };
        this.isSpeedy = options.speedy === void 0 ? process.env.NODE_ENV === "production" : options.speedy;
        this.tags = [];
        this.ctr = 0;
        this.nonce = options.nonce;
        this.key = options.key;
        this.container = options.container;
        this.prepend = options.prepend;
        this.insertionPoint = options.insertionPoint;
        this.before = null;
      }
      var _proto = StyleSheet2.prototype;
      _proto.hydrate = function hydrate(nodes) {
        nodes.forEach(this._insertTag);
      };
      _proto.insert = function insert(rule) {
        if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
          this._insertTag(createStyleElement(this));
        }
        var tag = this.tags[this.tags.length - 1];
        if (process.env.NODE_ENV !== "production") {
          var isImportRule3 = rule.charCodeAt(0) === 64 && rule.charCodeAt(1) === 105;
          if (isImportRule3 && this._alreadyInsertedOrderInsensitiveRule) {
            console.error("You're attempting to insert the following rule:\n" + rule + "\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.");
          }
          this._alreadyInsertedOrderInsensitiveRule = this._alreadyInsertedOrderInsensitiveRule || !isImportRule3;
        }
        if (this.isSpeedy) {
          var sheet = sheetForTag(tag);
          try {
            sheet.insertRule(rule, sheet.cssRules.length);
          } catch (e) {
            if (process.env.NODE_ENV !== "production" && !/:(-moz-placeholder|-moz-focus-inner|-moz-focusring|-ms-input-placeholder|-moz-read-write|-moz-read-only|-ms-clear|-ms-expand|-ms-reveal){/.test(rule)) {
              console.error('There was a problem inserting the following rule: "' + rule + '"', e);
            }
          }
        } else {
          tag.appendChild(document.createTextNode(rule));
        }
        this.ctr++;
      };
      _proto.flush = function flush() {
        this.tags.forEach(function(tag) {
          return tag.parentNode && tag.parentNode.removeChild(tag);
        });
        this.tags = [];
        this.ctr = 0;
        if (process.env.NODE_ENV !== "production") {
          this._alreadyInsertedOrderInsensitiveRule = false;
        }
      };
      return StyleSheet2;
    }();
  }
});

// ../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Enum.js
var MS, MOZ, WEBKIT, COMMENT, RULESET, DECLARATION, IMPORT, KEYFRAMES;
var init_Enum = __esm({
  "../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Enum.js"() {
    MS = "-ms-";
    MOZ = "-moz-";
    WEBKIT = "-webkit-";
    COMMENT = "comm";
    RULESET = "rule";
    DECLARATION = "decl";
    IMPORT = "@import";
    KEYFRAMES = "@keyframes";
  }
});

// ../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Utility.js
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var abs, from, assign;
var init_Utility = __esm({
  "../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Utility.js"() {
    abs = Math.abs;
    from = String.fromCharCode;
    assign = Object.assign;
  }
});

// ../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Tokenizer.js
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
var line, column, length, position, character, characters;
var init_Tokenizer = __esm({
  "../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Tokenizer.js"() {
    init_Utility();
    line = 1;
    column = 1;
    length = 0;
    position = 0;
    character = 0;
    characters = "";
  }
});

// ../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Parser.js
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
var init_Parser = __esm({
  "../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Parser.js"() {
    init_Enum();
    init_Utility();
    init_Tokenizer();
  }
});

// ../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Prefixer.js
var init_Prefixer = __esm({
  "../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Prefixer.js"() {
  }
});

// ../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Serializer.js
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
var init_Serializer = __esm({
  "../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Serializer.js"() {
    init_Enum();
    init_Utility();
  }
});

// ../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Middleware.js
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
var init_Middleware = __esm({
  "../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/src/Middleware.js"() {
    init_Utility();
  }
});

// ../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/index.js
var init_stylis = __esm({
  "../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/index.js"() {
    init_Enum();
    init_Utility();
    init_Parser();
    init_Prefixer();
    init_Tokenizer();
    init_Serializer();
    init_Middleware();
  }
});

// ../../node_modules/.pnpm/@emotion+weak-memoize@0.3.0/node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js
var weakMemoize, emotion_weak_memoize_esm_default;
var init_emotion_weak_memoize_esm = __esm({
  "../../node_modules/.pnpm/@emotion+weak-memoize@0.3.0/node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js"() {
    weakMemoize = function weakMemoize2(func) {
      var cache = /* @__PURE__ */ new WeakMap();
      return function(arg) {
        if (cache.has(arg)) {
          return cache.get(arg);
        }
        var ret = func(arg);
        cache.set(arg, ret);
        return ret;
      };
    };
    emotion_weak_memoize_esm_default = weakMemoize;
  }
});

// ../../node_modules/.pnpm/@emotion+memoize@0.8.0/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js
function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0)
      cache[arg] = fn(arg);
    return cache[arg];
  };
}
var emotion_memoize_esm_default;
var init_emotion_memoize_esm = __esm({
  "../../node_modules/.pnpm/@emotion+memoize@0.8.0/node_modules/@emotion/memoize/dist/emotion-memoize.esm.js"() {
    emotion_memoize_esm_default = memoize;
  }
});

// ../../node_modules/.pnpm/@emotion+cache@11.10.5/node_modules/@emotion/cache/dist/emotion-cache.esm.js
function prefix(value, length2) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 6828:
    case 4268:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/, "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2) + value : value;
        }
      break;
    case 4949:
      if (charat(value, length2 + 1) !== 115)
        break;
    case 6444:
      switch (charat(value, strlen(value) - 3 - (~indexof(value, "!important") && 10))) {
        case 107:
          return replace(value, ":", ":" + WEBKIT) + value;
        case 101:
          return replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
      }
      break;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
      return WEBKIT + value + MS + value + value;
  }
  return value;
}
var identifierWithPointTracking, toRules, getRules, fixedElements, compat, removeLabel, ignoreFlag, isIgnoringComment, createUnsafeSelectorsAlarm, isImportRule, isPrependedWithRegularRules, nullifyElement, incorrectImportAlarm, prefixer, isBrowser, getServerStylisCache, defaultStylisPlugins, createCache, emotion_cache_esm_default;
var init_emotion_cache_esm = __esm({
  "../../node_modules/.pnpm/@emotion+cache@11.10.5/node_modules/@emotion/cache/dist/emotion-cache.esm.js"() {
    init_emotion_sheet_esm();
    init_stylis();
    init_emotion_weak_memoize_esm();
    init_emotion_memoize_esm();
    identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
      var previous = 0;
      var character2 = 0;
      while (true) {
        previous = character2;
        character2 = peek();
        if (previous === 38 && character2 === 12) {
          points[index] = 1;
        }
        if (token(character2)) {
          break;
        }
        next();
      }
      return slice(begin, position);
    };
    toRules = function toRules2(parsed, points) {
      var index = -1;
      var character2 = 44;
      do {
        switch (token(character2)) {
          case 0:
            if (character2 === 38 && peek() === 12) {
              points[index] = 1;
            }
            parsed[index] += identifierWithPointTracking(position - 1, points, index);
            break;
          case 2:
            parsed[index] += delimit(character2);
            break;
          case 4:
            if (character2 === 44) {
              parsed[++index] = peek() === 58 ? "&\f" : "";
              points[index] = parsed[index].length;
              break;
            }
          default:
            parsed[index] += from(character2);
        }
      } while (character2 = next());
      return parsed;
    };
    getRules = function getRules2(value, points) {
      return dealloc(toRules(alloc(value), points));
    };
    fixedElements = /* @__PURE__ */ new WeakMap();
    compat = function compat2(element) {
      if (element.type !== "rule" || !element.parent || // positive .length indicates that this rule contains pseudo
      // negative .length indicates that this rule has been already prefixed
      element.length < 1) {
        return;
      }
      var value = element.value, parent = element.parent;
      var isImplicitRule = element.column === parent.column && element.line === parent.line;
      while (parent.type !== "rule") {
        parent = parent.parent;
        if (!parent)
          return;
      }
      if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
        return;
      }
      if (isImplicitRule) {
        return;
      }
      fixedElements.set(element, true);
      var points = [];
      var rules = getRules(value, points);
      var parentRules = parent.props;
      for (var i = 0, k = 0; i < rules.length; i++) {
        for (var j = 0; j < parentRules.length; j++, k++) {
          element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
        }
      }
    };
    removeLabel = function removeLabel2(element) {
      if (element.type === "decl") {
        var value = element.value;
        if (// charcode for l
        value.charCodeAt(0) === 108 && // charcode for b
        value.charCodeAt(2) === 98) {
          element["return"] = "";
          element.value = "";
        }
      }
    };
    ignoreFlag = "emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason";
    isIgnoringComment = function isIgnoringComment2(element) {
      return element.type === "comm" && element.children.indexOf(ignoreFlag) > -1;
    };
    createUnsafeSelectorsAlarm = function createUnsafeSelectorsAlarm2(cache) {
      return function(element, index, children) {
        if (element.type !== "rule" || cache.compat)
          return;
        var unsafePseudoClasses = element.value.match(/(:first|:nth|:nth-last)-child/g);
        if (unsafePseudoClasses) {
          var isNested = element.parent === children[0];
          var commentContainer = isNested ? children[0].children : (
            // global rule at the root level
            children
          );
          for (var i = commentContainer.length - 1; i >= 0; i--) {
            var node2 = commentContainer[i];
            if (node2.line < element.line) {
              break;
            }
            if (node2.column < element.column) {
              if (isIgnoringComment(node2)) {
                return;
              }
              break;
            }
          }
          unsafePseudoClasses.forEach(function(unsafePseudoClass) {
            console.error('The pseudo class "' + unsafePseudoClass + '" is potentially unsafe when doing server-side rendering. Try changing it to "' + unsafePseudoClass.split("-child")[0] + '-of-type".');
          });
        }
      };
    };
    isImportRule = function isImportRule2(element) {
      return element.type.charCodeAt(1) === 105 && element.type.charCodeAt(0) === 64;
    };
    isPrependedWithRegularRules = function isPrependedWithRegularRules2(index, children) {
      for (var i = index - 1; i >= 0; i--) {
        if (!isImportRule(children[i])) {
          return true;
        }
      }
      return false;
    };
    nullifyElement = function nullifyElement2(element) {
      element.type = "";
      element.value = "";
      element["return"] = "";
      element.children = "";
      element.props = "";
    };
    incorrectImportAlarm = function incorrectImportAlarm2(element, index, children) {
      if (!isImportRule(element)) {
        return;
      }
      if (element.parent) {
        console.error("`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles.");
        nullifyElement(element);
      } else if (isPrependedWithRegularRules(index, children)) {
        console.error("`@import` rules can't be after other rules. Please put your `@import` rules before your other rules.");
        nullifyElement(element);
      }
    };
    prefixer = function prefixer2(element, index, children, callback) {
      if (element.length > -1) {
        if (!element["return"])
          switch (element.type) {
            case DECLARATION:
              element["return"] = prefix(element.value, element.length);
              break;
            case KEYFRAMES:
              return serialize([copy(element, {
                value: replace(element.value, "@", "@" + WEBKIT)
              })], callback);
            case RULESET:
              if (element.length)
                return combine(element.props, function(value) {
                  switch (match(value, /(::plac\w+|:read-\w+)/)) {
                    case ":read-only":
                    case ":read-write":
                      return serialize([copy(element, {
                        props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")]
                      })], callback);
                    case "::placeholder":
                      return serialize([copy(element, {
                        props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")]
                      }), copy(element, {
                        props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")]
                      }), copy(element, {
                        props: [replace(value, /:(plac\w+)/, MS + "input-$1")]
                      })], callback);
                  }
                  return "";
                });
          }
      }
    };
    isBrowser = typeof document !== "undefined";
    getServerStylisCache = isBrowser ? void 0 : emotion_weak_memoize_esm_default(function() {
      return emotion_memoize_esm_default(function() {
        var cache = {};
        return function(name) {
          return cache[name];
        };
      });
    });
    defaultStylisPlugins = [prefixer];
    createCache = function createCache2(options) {
      var key = options.key;
      if (process.env.NODE_ENV !== "production" && !key) {
        throw new Error("You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements.");
      }
      if (isBrowser && key === "css") {
        var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
        Array.prototype.forEach.call(ssrStyles, function(node2) {
          var dataEmotionAttribute = node2.getAttribute("data-emotion");
          if (dataEmotionAttribute.indexOf(" ") === -1) {
            return;
          }
          document.head.appendChild(node2);
          node2.setAttribute("data-s", "");
        });
      }
      var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
      if (process.env.NODE_ENV !== "production") {
        if (/[^a-z-]/.test(key)) {
          throw new Error('Emotion key must only contain lower case alphabetical characters and - but "' + key + '" was passed');
        }
      }
      var inserted = {};
      var container;
      var nodesToHydrate = [];
      if (isBrowser) {
        container = options.container || document.head;
        Array.prototype.forEach.call(
          // this means we will ignore elements which don't have a space in them which
          // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
          document.querySelectorAll('style[data-emotion^="' + key + ' "]'),
          function(node2) {
            var attrib = node2.getAttribute("data-emotion").split(" ");
            for (var i = 1; i < attrib.length; i++) {
              inserted[attrib[i]] = true;
            }
            nodesToHydrate.push(node2);
          }
        );
      }
      var _insert;
      var omnipresentPlugins = [compat, removeLabel];
      if (process.env.NODE_ENV !== "production") {
        omnipresentPlugins.push(createUnsafeSelectorsAlarm({
          get compat() {
            return cache.compat;
          }
        }), incorrectImportAlarm);
      }
      if (isBrowser) {
        var currentSheet;
        var finalizingPlugins = [stringify, process.env.NODE_ENV !== "production" ? function(element) {
          if (!element.root) {
            if (element["return"]) {
              currentSheet.insert(element["return"]);
            } else if (element.value && element.type !== COMMENT) {
              currentSheet.insert(element.value + "{}");
            }
          }
        } : rulesheet(function(rule) {
          currentSheet.insert(rule);
        })];
        var serializer = middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
        var stylis = function stylis2(styles) {
          return serialize(compile(styles), serializer);
        };
        _insert = function insert(selector, serialized, sheet, shouldCache) {
          currentSheet = sheet;
          if (process.env.NODE_ENV !== "production" && serialized.map !== void 0) {
            currentSheet = {
              insert: function insert2(rule) {
                sheet.insert(rule + serialized.map);
              }
            };
          }
          stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
          if (shouldCache) {
            cache.inserted[serialized.name] = true;
          }
        };
      } else {
        var _finalizingPlugins = [stringify];
        var _serializer = middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));
        var _stylis = function _stylis2(styles) {
          return serialize(compile(styles), _serializer);
        };
        var serverStylisCache = getServerStylisCache(stylisPlugins)(key);
        var getRules3 = function getRules4(selector, serialized) {
          var name = serialized.name;
          if (serverStylisCache[name] === void 0) {
            serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
          }
          return serverStylisCache[name];
        };
        _insert = function _insert2(selector, serialized, sheet, shouldCache) {
          var name = serialized.name;
          var rules = getRules3(selector, serialized);
          if (cache.compat === void 0) {
            if (shouldCache) {
              cache.inserted[name] = true;
            }
            if (// using === development instead of !== production
            // because if people do ssr in tests, the source maps showing up would be annoying
            process.env.NODE_ENV === "development" && serialized.map !== void 0) {
              return rules + serialized.map;
            }
            return rules;
          } else {
            if (shouldCache) {
              cache.inserted[name] = rules;
            } else {
              return rules;
            }
          }
        };
      }
      var cache = {
        key,
        sheet: new StyleSheet({
          key,
          container,
          nonce: options.nonce,
          speedy: options.speedy,
          prepend: options.prepend,
          insertionPoint: options.insertionPoint
        }),
        nonce: options.nonce,
        inserted,
        registered: {},
        insert: _insert
      };
      cache.sheet.hydrate(nodesToHydrate);
      return cache;
    };
    emotion_cache_esm_default = createCache;
  }
});

// ../../node_modules/.pnpm/@babel+runtime@7.20.6/node_modules/@babel/runtime/helpers/esm/extends.js
var init_extends = __esm({
  "../../node_modules/.pnpm/@babel+runtime@7.20.6/node_modules/@babel/runtime/helpers/esm/extends.js"() {
  }
});

// ../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.production.min.js
var require_react_is_production_min = __commonJS({
  "../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.production.min.js"(exports) {
    "use strict";
    var b = "function" === typeof Symbol && Symbol.for;
    var c = b ? Symbol.for("react.element") : 60103;
    var d = b ? Symbol.for("react.portal") : 60106;
    var e = b ? Symbol.for("react.fragment") : 60107;
    var f = b ? Symbol.for("react.strict_mode") : 60108;
    var g = b ? Symbol.for("react.profiler") : 60114;
    var h = b ? Symbol.for("react.provider") : 60109;
    var k = b ? Symbol.for("react.context") : 60110;
    var l = b ? Symbol.for("react.async_mode") : 60111;
    var m = b ? Symbol.for("react.concurrent_mode") : 60111;
    var n = b ? Symbol.for("react.forward_ref") : 60112;
    var p = b ? Symbol.for("react.suspense") : 60113;
    var q = b ? Symbol.for("react.suspense_list") : 60120;
    var r = b ? Symbol.for("react.memo") : 60115;
    var t = b ? Symbol.for("react.lazy") : 60116;
    var v = b ? Symbol.for("react.block") : 60121;
    var w3 = b ? Symbol.for("react.fundamental") : 60117;
    var x = b ? Symbol.for("react.responder") : 60118;
    var y = b ? Symbol.for("react.scope") : 60119;
    function z(a) {
      if ("object" === typeof a && null !== a) {
        var u = a.$$typeof;
        switch (u) {
          case c:
            switch (a = a.type, a) {
              case l:
              case m:
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
      return z(a) === m;
    }
    exports.AsyncMode = l;
    exports.ConcurrentMode = m;
    exports.ContextConsumer = k;
    exports.ContextProvider = h;
    exports.Element = c;
    exports.ForwardRef = n;
    exports.Fragment = e;
    exports.Lazy = t;
    exports.Memo = r;
    exports.Portal = d;
    exports.Profiler = g;
    exports.StrictMode = f;
    exports.Suspense = p;
    exports.isAsyncMode = function(a) {
      return A(a) || z(a) === l;
    };
    exports.isConcurrentMode = A;
    exports.isContextConsumer = function(a) {
      return z(a) === k;
    };
    exports.isContextProvider = function(a) {
      return z(a) === h;
    };
    exports.isElement = function(a) {
      return "object" === typeof a && null !== a && a.$$typeof === c;
    };
    exports.isForwardRef = function(a) {
      return z(a) === n;
    };
    exports.isFragment = function(a) {
      return z(a) === e;
    };
    exports.isLazy = function(a) {
      return z(a) === t;
    };
    exports.isMemo = function(a) {
      return z(a) === r;
    };
    exports.isPortal = function(a) {
      return z(a) === d;
    };
    exports.isProfiler = function(a) {
      return z(a) === g;
    };
    exports.isStrictMode = function(a) {
      return z(a) === f;
    };
    exports.isSuspense = function(a) {
      return z(a) === p;
    };
    exports.isValidElementType = function(a) {
      return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w3 || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
    };
    exports.typeOf = z;
  }
});

// ../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS({
  "../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/cjs/react-is.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var hasSymbol = typeof Symbol === "function" && Symbol.for;
        var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
        var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
        var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
        var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
        var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
        var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
        var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
        var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
        var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
        var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
        var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
        var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
        var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
        var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
        var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
        var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
        var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
        var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
        function isValidElementType(type) {
          return typeof type === "string" || typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
        }
        function typeOf(object) {
          if (typeof object === "object" && object !== null) {
            var $$typeof = object.$$typeof;
            switch ($$typeof) {
              case REACT_ELEMENT_TYPE:
                var type = object.type;
                switch (type) {
                  case REACT_ASYNC_MODE_TYPE:
                  case REACT_CONCURRENT_MODE_TYPE:
                  case REACT_FRAGMENT_TYPE:
                  case REACT_PROFILER_TYPE:
                  case REACT_STRICT_MODE_TYPE:
                  case REACT_SUSPENSE_TYPE:
                    return type;
                  default:
                    var $$typeofType = type && type.$$typeof;
                    switch ($$typeofType) {
                      case REACT_CONTEXT_TYPE:
                      case REACT_FORWARD_REF_TYPE:
                      case REACT_LAZY_TYPE:
                      case REACT_MEMO_TYPE:
                      case REACT_PROVIDER_TYPE:
                        return $$typeofType;
                      default:
                        return $$typeof;
                    }
                }
              case REACT_PORTAL_TYPE:
                return $$typeof;
            }
          }
          return void 0;
        }
        var AsyncMode = REACT_ASYNC_MODE_TYPE;
        var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment6 = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense2 = REACT_SUSPENSE_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        function isAsyncMode(object) {
          {
            if (!hasWarnedAboutDeprecatedIsAsyncMode) {
              hasWarnedAboutDeprecatedIsAsyncMode = true;
              console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
            }
          }
          return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
        }
        function isConcurrentMode(object) {
          return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
        }
        function isContextConsumer(object) {
          return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
          return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
          return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
          return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
          return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
          return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
          return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
          return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
          return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
          return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        exports.AsyncMode = AsyncMode;
        exports.ConcurrentMode = ConcurrentMode;
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment6;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense2;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
      })();
    }
  }
});

// ../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/index.js
var require_react_is = __commonJS({
  "../../node_modules/.pnpm/react-is@16.13.1/node_modules/react-is/index.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_is_production_min();
    } else {
      module2.exports = require_react_is_development();
    }
  }
});

// ../../node_modules/.pnpm/hoist-non-react-statics@3.3.2/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var require_hoist_non_react_statics_cjs = __commonJS({
  "../../node_modules/.pnpm/hoist-non-react-statics@3.3.2/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"(exports, module2) {
    "use strict";
    var reactIs = require_react_is();
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
            } catch (e) {
            }
          }
        }
      }
      return targetComponent;
    }
    module2.exports = hoistNonReactStatics;
  }
});

// ../../node_modules/.pnpm/@emotion+utils@1.2.0/node_modules/@emotion/utils/dist/emotion-utils.esm.js
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var isBrowser2, registerStyles, insertStyles;
var init_emotion_utils_esm = __esm({
  "../../node_modules/.pnpm/@emotion+utils@1.2.0/node_modules/@emotion/utils/dist/emotion-utils.esm.js"() {
    isBrowser2 = typeof document !== "undefined";
    registerStyles = function registerStyles2(cache, serialized, isStringTag) {
      var className = cache.key + "-" + serialized.name;
      if ((isStringTag === false || // we need to always store it if we're in compat mode and
      // in node since emotion-server relies on whether a style is in
      // the registered cache to know whether a style is global or not
      // also, note that this check will be dead code eliminated in the browser
      isBrowser2 === false && cache.compat !== void 0) && cache.registered[className] === void 0) {
        cache.registered[className] = serialized.styles;
      }
    };
    insertStyles = function insertStyles2(cache, serialized, isStringTag) {
      registerStyles(cache, serialized, isStringTag);
      var className = cache.key + "-" + serialized.name;
      if (cache.inserted[serialized.name] === void 0) {
        var stylesForSSR = "";
        var current = serialized;
        do {
          var maybeStyles = cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
          if (!isBrowser2 && maybeStyles !== void 0) {
            stylesForSSR += maybeStyles;
          }
          current = current.next;
        } while (current !== void 0);
        if (!isBrowser2 && stylesForSSR.length !== 0) {
          return stylesForSSR;
        }
      }
    };
  }
});

// ../../node_modules/.pnpm/@emotion+hash@0.9.0/node_modules/@emotion/hash/dist/emotion-hash.esm.js
function murmur2(str) {
  var h = 0;
  var k, i = 0, len = str.length;
  for (; len >= 4; ++i, len -= 4) {
    k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
    k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
    k ^= /* k >>> r: */
    k >>> 24;
    h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 255) << 16;
    case 2:
      h ^= (str.charCodeAt(i + 1) & 255) << 8;
    case 1:
      h ^= str.charCodeAt(i) & 255;
      h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  }
  h ^= h >>> 13;
  h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
  return ((h ^ h >>> 15) >>> 0).toString(36);
}
var emotion_hash_esm_default;
var init_emotion_hash_esm = __esm({
  "../../node_modules/.pnpm/@emotion+hash@0.9.0/node_modules/@emotion/hash/dist/emotion-hash.esm.js"() {
    emotion_hash_esm_default = murmur2;
  }
});

// ../../node_modules/.pnpm/@emotion+unitless@0.8.0/node_modules/@emotion/unitless/dist/emotion-unitless.esm.js
var unitlessKeys, emotion_unitless_esm_default;
var init_emotion_unitless_esm = __esm({
  "../../node_modules/.pnpm/@emotion+unitless@0.8.0/node_modules/@emotion/unitless/dist/emotion-unitless.esm.js"() {
    unitlessKeys = {
      animationIterationCount: 1,
      borderImageOutset: 1,
      borderImageSlice: 1,
      borderImageWidth: 1,
      boxFlex: 1,
      boxFlexGroup: 1,
      boxOrdinalGroup: 1,
      columnCount: 1,
      columns: 1,
      flex: 1,
      flexGrow: 1,
      flexPositive: 1,
      flexShrink: 1,
      flexNegative: 1,
      flexOrder: 1,
      gridRow: 1,
      gridRowEnd: 1,
      gridRowSpan: 1,
      gridRowStart: 1,
      gridColumn: 1,
      gridColumnEnd: 1,
      gridColumnSpan: 1,
      gridColumnStart: 1,
      msGridRow: 1,
      msGridRowSpan: 1,
      msGridColumn: 1,
      msGridColumnSpan: 1,
      fontWeight: 1,
      lineHeight: 1,
      opacity: 1,
      order: 1,
      orphans: 1,
      tabSize: 1,
      widows: 1,
      zIndex: 1,
      zoom: 1,
      WebkitLineClamp: 1,
      // SVG-related properties
      fillOpacity: 1,
      floodOpacity: 1,
      stopOpacity: 1,
      strokeDasharray: 1,
      strokeDashoffset: 1,
      strokeMiterlimit: 1,
      strokeOpacity: 1,
      strokeWidth: 1
    };
    emotion_unitless_esm_default = unitlessKeys;
  }
});

// ../../node_modules/.pnpm/@emotion+serialize@1.1.1/node_modules/@emotion/serialize/dist/emotion-serialize.esm.js
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    if (process.env.NODE_ENV !== "production" && interpolation.toString() === "NO_COMPONENT_SELECTOR") {
      throw new Error(noComponentSelectorMessage);
    }
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next2 = interpolation.next;
        if (next2 !== void 0) {
          while (next2 !== void 0) {
            cursor = {
              name: next2.name,
              styles: next2.styles,
              next: cursor
            };
            next2 = next2.next;
          }
        }
        var styles = interpolation.styles + ";";
        if (process.env.NODE_ENV !== "production" && interpolation.map !== void 0) {
          styles += interpolation.map;
        }
        return styles;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      } else if (process.env.NODE_ENV !== "production") {
        console.error("Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`");
      }
      break;
    }
    case "string":
      if (process.env.NODE_ENV !== "production") {
        var matched = [];
        var replaced = interpolation.replace(animationRegex, function(match2, p1, p2) {
          var fakeVarName = "animation" + matched.length;
          matched.push("const " + fakeVarName + " = keyframes`" + p2.replace(/^@keyframes animation-\w+/, "") + "`");
          return "${" + fakeVarName + "}";
        });
        if (matched.length) {
          console.error("`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n" + [].concat(matched, ["`" + replaced + "`"]).join("\n") + "\n\nYou should wrap it with `css` like this:\n\n" + ("css`" + replaced + "`"));
        }
      }
      break;
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string = "";
  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++) {
      string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && process.env.NODE_ENV !== "production") {
          throw new Error(noComponentSelectorMessage);
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              if (process.env.NODE_ENV !== "production" && _key === "undefined") {
                console.error(UNDEFINED_AS_OBJECT_KEY_ERROR);
              }
              string += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string;
}
var ILLEGAL_ESCAPE_SEQUENCE_ERROR, UNDEFINED_AS_OBJECT_KEY_ERROR, hyphenateRegex, animationRegex, isCustomProperty, isProcessableValue, processStyleName, processStyleValue, contentValuePattern, contentValues, oldProcessStyleValue, msPattern, hyphenPattern, hyphenatedCache, noComponentSelectorMessage, labelPattern, sourceMapPattern, cursor, serializeStyles;
var init_emotion_serialize_esm = __esm({
  "../../node_modules/.pnpm/@emotion+serialize@1.1.1/node_modules/@emotion/serialize/dist/emotion-serialize.esm.js"() {
    init_emotion_hash_esm();
    init_emotion_unitless_esm();
    init_emotion_memoize_esm();
    ILLEGAL_ESCAPE_SEQUENCE_ERROR = `You have illegal escape sequence in your template literal, most likely inside content's property value.
Because you write your CSS inside a JavaScript string you actually have to do double escaping, so for example "content: '\\00d7';" should become "content: '\\\\00d7';".
You can read more about this here:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences`;
    UNDEFINED_AS_OBJECT_KEY_ERROR = "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key).";
    hyphenateRegex = /[A-Z]|^ms/g;
    animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
    isCustomProperty = function isCustomProperty2(property) {
      return property.charCodeAt(1) === 45;
    };
    isProcessableValue = function isProcessableValue2(value) {
      return value != null && typeof value !== "boolean";
    };
    processStyleName = /* @__PURE__ */ emotion_memoize_esm_default(function(styleName) {
      return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
    });
    processStyleValue = function processStyleValue2(key, value) {
      switch (key) {
        case "animation":
        case "animationName": {
          if (typeof value === "string") {
            return value.replace(animationRegex, function(match2, p1, p2) {
              cursor = {
                name: p1,
                styles: p2,
                next: cursor
              };
              return p1;
            });
          }
        }
      }
      if (emotion_unitless_esm_default[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
        return value + "px";
      }
      return value;
    };
    if (process.env.NODE_ENV !== "production") {
      contentValuePattern = /(var|attr|counters?|url|element|(((repeating-)?(linear|radial))|conic)-gradient)\(|(no-)?(open|close)-quote/;
      contentValues = ["normal", "none", "initial", "inherit", "unset"];
      oldProcessStyleValue = processStyleValue;
      msPattern = /^-ms-/;
      hyphenPattern = /-(.)/g;
      hyphenatedCache = {};
      processStyleValue = function processStyleValue3(key, value) {
        if (key === "content") {
          if (typeof value !== "string" || contentValues.indexOf(value) === -1 && !contentValuePattern.test(value) && (value.charAt(0) !== value.charAt(value.length - 1) || value.charAt(0) !== '"' && value.charAt(0) !== "'")) {
            throw new Error("You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" + value + "\"'`");
          }
        }
        var processed = oldProcessStyleValue(key, value);
        if (processed !== "" && !isCustomProperty(key) && key.indexOf("-") !== -1 && hyphenatedCache[key] === void 0) {
          hyphenatedCache[key] = true;
          console.error("Using kebab-case for css properties in objects is not supported. Did you mean " + key.replace(msPattern, "ms-").replace(hyphenPattern, function(str, _char) {
            return _char.toUpperCase();
          }) + "?");
        }
        return processed;
      };
    }
    noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
    labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
    if (process.env.NODE_ENV !== "production") {
      sourceMapPattern = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g;
    }
    serializeStyles = function serializeStyles2(args, registered, mergedProps) {
      if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
        return args[0];
      }
      var stringMode = true;
      var styles = "";
      cursor = void 0;
      var strings = args[0];
      if (strings == null || strings.raw === void 0) {
        stringMode = false;
        styles += handleInterpolation(mergedProps, registered, strings);
      } else {
        if (process.env.NODE_ENV !== "production" && strings[0] === void 0) {
          console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
        }
        styles += strings[0];
      }
      for (var i = 1; i < args.length; i++) {
        styles += handleInterpolation(mergedProps, registered, args[i]);
        if (stringMode) {
          if (process.env.NODE_ENV !== "production" && strings[i] === void 0) {
            console.error(ILLEGAL_ESCAPE_SEQUENCE_ERROR);
          }
          styles += strings[i];
        }
      }
      var sourceMap;
      if (process.env.NODE_ENV !== "production") {
        styles = styles.replace(sourceMapPattern, function(match3) {
          sourceMap = match3;
          return "";
        });
      }
      labelPattern.lastIndex = 0;
      var identifierName = "";
      var match2;
      while ((match2 = labelPattern.exec(styles)) !== null) {
        identifierName += "-" + // $FlowFixMe we know it's not null
        match2[1];
      }
      var name = emotion_hash_esm_default(styles) + identifierName;
      if (process.env.NODE_ENV !== "production") {
        return {
          name,
          styles,
          map: sourceMap,
          next: cursor,
          toString: function toString() {
            return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
          }
        };
      }
      return {
        name,
        styles,
        next: cursor
      };
    };
  }
});

// ../../node_modules/.pnpm/@emotion+use-insertion-effect-with-fallbacks@1.0.0_react@18.2.0/node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.esm.js
var React, import_react4, isBrowser3, syncFallback, useInsertionEffect2, useInsertionEffectAlwaysWithSyncFallback;
var init_emotion_use_insertion_effect_with_fallbacks_esm = __esm({
  "../../node_modules/.pnpm/@emotion+use-insertion-effect-with-fallbacks@1.0.0_react@18.2.0/node_modules/@emotion/use-insertion-effect-with-fallbacks/dist/emotion-use-insertion-effect-with-fallbacks.esm.js"() {
    React = __toESM(require_react());
    import_react4 = __toESM(require_react());
    isBrowser3 = typeof document !== "undefined";
    syncFallback = function syncFallback2(create) {
      return create();
    };
    useInsertionEffect2 = React["useInsertionEffect"] ? React["useInsertionEffect"] : false;
    useInsertionEffectAlwaysWithSyncFallback = !isBrowser3 ? syncFallback : useInsertionEffect2 || syncFallback;
  }
});

// ../../node_modules/.pnpm/@babel+runtime@7.20.6/node_modules/@babel/runtime/helpers/extends.js
var require_extends = __commonJS({
  "../../node_modules/.pnpm/@babel+runtime@7.20.6/node_modules/@babel/runtime/helpers/extends.js"(exports, module2) {
    function _extends2() {
      module2.exports = _extends2 = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i];
          for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
              target[key] = source[key];
            }
          }
        }
        return target;
      }, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
      return _extends2.apply(this, arguments);
    }
    module2.exports = _extends2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// ../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react-jsx-runtime.production.min.js
var require_react_jsx_runtime_production_min = __commonJS({
  "../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
    "use strict";
    var f = require_react();
    var k = Symbol.for("react.element");
    var l = Symbol.for("react.fragment");
    var m = Object.prototype.hasOwnProperty;
    var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
    var p = { key: true, ref: true, __self: true, __source: true };
    function q(c, a, g) {
      var b, d = {}, e = null, h = null;
      void 0 !== g && (e = "" + g);
      void 0 !== a.key && (e = "" + a.key);
      void 0 !== a.ref && (h = a.ref);
      for (b in a)
        m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
      if (c && c.defaultProps)
        for (b in a = c.defaultProps, a)
          void 0 === d[b] && (d[b] = a[b]);
      return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
    }
    exports.Fragment = l;
    exports.jsx = q;
    exports.jsxs = q;
  }
});

// ../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS({
  "../../node_modules/.pnpm/react@18.2.0/node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
    "use strict";
    if (process.env.NODE_ENV !== "production") {
      (function() {
        "use strict";
        var React27 = require_react();
        var REACT_ELEMENT_TYPE = Symbol.for("react.element");
        var REACT_PORTAL_TYPE = Symbol.for("react.portal");
        var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
        var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
        var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
        var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
        var REACT_CONTEXT_TYPE = Symbol.for("react.context");
        var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
        var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
        var REACT_MEMO_TYPE = Symbol.for("react.memo");
        var REACT_LAZY_TYPE = Symbol.for("react.lazy");
        var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
        var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
        var FAUX_ITERATOR_SYMBOL = "@@iterator";
        function getIteratorFn(maybeIterable) {
          if (maybeIterable === null || typeof maybeIterable !== "object") {
            return null;
          }
          var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
          if (typeof maybeIterator === "function") {
            return maybeIterator;
          }
          return null;
        }
        var ReactSharedInternals = React27.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        function error(format) {
          {
            {
              for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                args[_key2 - 1] = arguments[_key2];
              }
              printWarning("error", format, args);
            }
          }
        }
        function printWarning(level, format, args) {
          {
            var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
            var stack = ReactDebugCurrentFrame2.getStackAddendum();
            if (stack !== "") {
              format += "%s";
              args = args.concat([stack]);
            }
            var argsWithFormat = args.map(function(item) {
              return String(item);
            });
            argsWithFormat.unshift("Warning: " + format);
            Function.prototype.apply.call(console[level], console, argsWithFormat);
          }
        }
        var enableScopeAPI = false;
        var enableCacheElement = false;
        var enableTransitionTracing = false;
        var enableLegacyHidden = false;
        var enableDebugTracing = false;
        var REACT_MODULE_REFERENCE;
        {
          REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
        }
        function isValidElementType(type) {
          if (typeof type === "string" || typeof type === "function") {
            return true;
          }
          if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
            return true;
          }
          if (typeof type === "object" && type !== null) {
            if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
            // types supported by any Flight configuration anywhere since
            // we don't know which Flight build this will end up being used
            // with.
            type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
              return true;
            }
          }
          return false;
        }
        function getWrappedName(outerType, innerType, wrapperName) {
          var displayName = outerType.displayName;
          if (displayName) {
            return displayName;
          }
          var functionName = innerType.displayName || innerType.name || "";
          return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
        }
        function getContextName(type) {
          return type.displayName || "Context";
        }
        function getComponentNameFromType(type) {
          if (type == null) {
            return null;
          }
          {
            if (typeof type.tag === "number") {
              error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
            }
          }
          if (typeof type === "function") {
            return type.displayName || type.name || null;
          }
          if (typeof type === "string") {
            return type;
          }
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_CONTEXT_TYPE:
                var context = type;
                return getContextName(context) + ".Consumer";
              case REACT_PROVIDER_TYPE:
                var provider = type;
                return getContextName(provider._context) + ".Provider";
              case REACT_FORWARD_REF_TYPE:
                return getWrappedName(type, type.render, "ForwardRef");
              case REACT_MEMO_TYPE:
                var outerName = type.displayName || null;
                if (outerName !== null) {
                  return outerName;
                }
                return getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return getComponentNameFromType(init(payload));
                } catch (x) {
                  return null;
                }
              }
            }
          }
          return null;
        }
        var assign2 = Object.assign;
        var disabledDepth = 0;
        var prevLog;
        var prevInfo;
        var prevWarn;
        var prevError;
        var prevGroup;
        var prevGroupCollapsed;
        var prevGroupEnd;
        function disabledLog() {
        }
        disabledLog.__reactDisabledLog = true;
        function disableLogs() {
          {
            if (disabledDepth === 0) {
              prevLog = console.log;
              prevInfo = console.info;
              prevWarn = console.warn;
              prevError = console.error;
              prevGroup = console.group;
              prevGroupCollapsed = console.groupCollapsed;
              prevGroupEnd = console.groupEnd;
              var props = {
                configurable: true,
                enumerable: true,
                value: disabledLog,
                writable: true
              };
              Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
              });
            }
            disabledDepth++;
          }
        }
        function reenableLogs() {
          {
            disabledDepth--;
            if (disabledDepth === 0) {
              var props = {
                configurable: true,
                enumerable: true,
                writable: true
              };
              Object.defineProperties(console, {
                log: assign2({}, props, {
                  value: prevLog
                }),
                info: assign2({}, props, {
                  value: prevInfo
                }),
                warn: assign2({}, props, {
                  value: prevWarn
                }),
                error: assign2({}, props, {
                  value: prevError
                }),
                group: assign2({}, props, {
                  value: prevGroup
                }),
                groupCollapsed: assign2({}, props, {
                  value: prevGroupCollapsed
                }),
                groupEnd: assign2({}, props, {
                  value: prevGroupEnd
                })
              });
            }
            if (disabledDepth < 0) {
              error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
            }
          }
        }
        var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
        var prefix2;
        function describeBuiltInComponentFrame(name, source, ownerFn) {
          {
            if (prefix2 === void 0) {
              try {
                throw Error();
              } catch (x) {
                var match2 = x.stack.trim().match(/\n( *(at )?)/);
                prefix2 = match2 && match2[1] || "";
              }
            }
            return "\n" + prefix2 + name;
          }
        }
        var reentry = false;
        var componentFrameCache;
        {
          var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
          componentFrameCache = new PossiblyWeakMap();
        }
        function describeNativeComponentFrame(fn, construct) {
          if (!fn || reentry) {
            return "";
          }
          {
            var frame = componentFrameCache.get(fn);
            if (frame !== void 0) {
              return frame;
            }
          }
          var control;
          reentry = true;
          var previousPrepareStackTrace = Error.prepareStackTrace;
          Error.prepareStackTrace = void 0;
          var previousDispatcher;
          {
            previousDispatcher = ReactCurrentDispatcher.current;
            ReactCurrentDispatcher.current = null;
            disableLogs();
          }
          try {
            if (construct) {
              var Fake = function() {
                throw Error();
              };
              Object.defineProperty(Fake.prototype, "props", {
                set: function() {
                  throw Error();
                }
              });
              if (typeof Reflect === "object" && Reflect.construct) {
                try {
                  Reflect.construct(Fake, []);
                } catch (x) {
                  control = x;
                }
                Reflect.construct(fn, [], Fake);
              } else {
                try {
                  Fake.call();
                } catch (x) {
                  control = x;
                }
                fn.call(Fake.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                control = x;
              }
              fn();
            }
          } catch (sample) {
            if (sample && control && typeof sample.stack === "string") {
              var sampleLines = sample.stack.split("\n");
              var controlLines = control.stack.split("\n");
              var s = sampleLines.length - 1;
              var c = controlLines.length - 1;
              while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
                c--;
              }
              for (; s >= 1 && c >= 0; s--, c--) {
                if (sampleLines[s] !== controlLines[c]) {
                  if (s !== 1 || c !== 1) {
                    do {
                      s--;
                      c--;
                      if (c < 0 || sampleLines[s] !== controlLines[c]) {
                        var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                        if (fn.displayName && _frame.includes("<anonymous>")) {
                          _frame = _frame.replace("<anonymous>", fn.displayName);
                        }
                        {
                          if (typeof fn === "function") {
                            componentFrameCache.set(fn, _frame);
                          }
                        }
                        return _frame;
                      }
                    } while (s >= 1 && c >= 0);
                  }
                  break;
                }
              }
            }
          } finally {
            reentry = false;
            {
              ReactCurrentDispatcher.current = previousDispatcher;
              reenableLogs();
            }
            Error.prepareStackTrace = previousPrepareStackTrace;
          }
          var name = fn ? fn.displayName || fn.name : "";
          var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
          {
            if (typeof fn === "function") {
              componentFrameCache.set(fn, syntheticFrame);
            }
          }
          return syntheticFrame;
        }
        function describeFunctionComponentFrame(fn, source, ownerFn) {
          {
            return describeNativeComponentFrame(fn, false);
          }
        }
        function shouldConstruct(Component2) {
          var prototype = Component2.prototype;
          return !!(prototype && prototype.isReactComponent);
        }
        function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
          if (type == null) {
            return "";
          }
          if (typeof type === "function") {
            {
              return describeNativeComponentFrame(type, shouldConstruct(type));
            }
          }
          if (typeof type === "string") {
            return describeBuiltInComponentFrame(type);
          }
          switch (type) {
            case REACT_SUSPENSE_TYPE:
              return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
              return describeBuiltInComponentFrame("SuspenseList");
          }
          if (typeof type === "object") {
            switch (type.$$typeof) {
              case REACT_FORWARD_REF_TYPE:
                return describeFunctionComponentFrame(type.render);
              case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
              case REACT_LAZY_TYPE: {
                var lazyComponent = type;
                var payload = lazyComponent._payload;
                var init = lazyComponent._init;
                try {
                  return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
                } catch (x) {
                }
              }
            }
          }
          return "";
        }
        var hasOwnProperty2 = Object.prototype.hasOwnProperty;
        var loggedTypeFailures = {};
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame.setExtraStackFrame(null);
            }
          }
        }
        function checkPropTypes(typeSpecs, values, location2, componentName, element) {
          {
            var has = Function.call.bind(hasOwnProperty2);
            for (var typeSpecName in typeSpecs) {
              if (has(typeSpecs, typeSpecName)) {
                var error$1 = void 0;
                try {
                  if (typeof typeSpecs[typeSpecName] !== "function") {
                    var err = Error((componentName || "React class") + ": " + location2 + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                    err.name = "Invariant Violation";
                    throw err;
                  }
                  error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location2, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
                } catch (ex) {
                  error$1 = ex;
                }
                if (error$1 && !(error$1 instanceof Error)) {
                  setCurrentlyValidatingElement(element);
                  error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location2, typeSpecName, typeof error$1);
                  setCurrentlyValidatingElement(null);
                }
                if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                  loggedTypeFailures[error$1.message] = true;
                  setCurrentlyValidatingElement(element);
                  error("Failed %s type: %s", location2, error$1.message);
                  setCurrentlyValidatingElement(null);
                }
              }
            }
          }
        }
        var isArrayImpl = Array.isArray;
        function isArray(a) {
          return isArrayImpl(a);
        }
        function typeName(value) {
          {
            var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
            var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            return type;
          }
        }
        function willCoercionThrow(value) {
          {
            try {
              testStringCoercion(value);
              return false;
            } catch (e) {
              return true;
            }
          }
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          {
            if (willCoercionThrow(value)) {
              error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
              return testStringCoercion(value);
            }
          }
        }
        var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
        var RESERVED_PROPS = {
          key: true,
          ref: true,
          __self: true,
          __source: true
        };
        var specialPropKeyWarningShown;
        var specialPropRefWarningShown;
        var didWarnAboutStringRefs;
        {
          didWarnAboutStringRefs = {};
        }
        function hasValidRef(config) {
          {
            if (hasOwnProperty2.call(config, "ref")) {
              var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.ref !== void 0;
        }
        function hasValidKey(config) {
          {
            if (hasOwnProperty2.call(config, "key")) {
              var getter = Object.getOwnPropertyDescriptor(config, "key").get;
              if (getter && getter.isReactWarning) {
                return false;
              }
            }
          }
          return config.key !== void 0;
        }
        function warnIfStringRefCannotBeAutoConverted(config, self2) {
          {
            if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
              var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
              if (!didWarnAboutStringRefs[componentName]) {
                error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
                didWarnAboutStringRefs[componentName] = true;
              }
            }
          }
        }
        function defineKeyPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingKey = function() {
              if (!specialPropKeyWarningShown) {
                specialPropKeyWarningShown = true;
                error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingKey.isReactWarning = true;
            Object.defineProperty(props, "key", {
              get: warnAboutAccessingKey,
              configurable: true
            });
          }
        }
        function defineRefPropWarningGetter(props, displayName) {
          {
            var warnAboutAccessingRef = function() {
              if (!specialPropRefWarningShown) {
                specialPropRefWarningShown = true;
                error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
              }
            };
            warnAboutAccessingRef.isReactWarning = true;
            Object.defineProperty(props, "ref", {
              get: warnAboutAccessingRef,
              configurable: true
            });
          }
        }
        var ReactElement3 = function(type, key, ref, self2, source, owner, props) {
          var element = {
            // This tag allows us to uniquely identify this as a React Element
            $$typeof: REACT_ELEMENT_TYPE,
            // Built-in properties that belong on the element
            type,
            key,
            ref,
            props,
            // Record the component responsible for creating this element.
            _owner: owner
          };
          {
            element._store = {};
            Object.defineProperty(element._store, "validated", {
              configurable: false,
              enumerable: false,
              writable: true,
              value: false
            });
            Object.defineProperty(element, "_self", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: self2
            });
            Object.defineProperty(element, "_source", {
              configurable: false,
              enumerable: false,
              writable: false,
              value: source
            });
            if (Object.freeze) {
              Object.freeze(element.props);
              Object.freeze(element);
            }
          }
          return element;
        };
        function jsxDEV(type, config, maybeKey, source, self2) {
          {
            var propName;
            var props = {};
            var key = null;
            var ref = null;
            if (maybeKey !== void 0) {
              {
                checkKeyStringCoercion(maybeKey);
              }
              key = "" + maybeKey;
            }
            if (hasValidKey(config)) {
              {
                checkKeyStringCoercion(config.key);
              }
              key = "" + config.key;
            }
            if (hasValidRef(config)) {
              ref = config.ref;
              warnIfStringRefCannotBeAutoConverted(config, self2);
            }
            for (propName in config) {
              if (hasOwnProperty2.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
                props[propName] = config[propName];
              }
            }
            if (type && type.defaultProps) {
              var defaultProps = type.defaultProps;
              for (propName in defaultProps) {
                if (props[propName] === void 0) {
                  props[propName] = defaultProps[propName];
                }
              }
            }
            if (key || ref) {
              var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
              if (key) {
                defineKeyPropWarningGetter(props, displayName);
              }
              if (ref) {
                defineRefPropWarningGetter(props, displayName);
              }
            }
            return ReactElement3(type, key, ref, self2, source, ReactCurrentOwner.current, props);
          }
        }
        var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
        var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
        function setCurrentlyValidatingElement$1(element) {
          {
            if (element) {
              var owner = element._owner;
              var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
              ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
            } else {
              ReactDebugCurrentFrame$1.setExtraStackFrame(null);
            }
          }
        }
        var propTypesMisspellWarningShown;
        {
          propTypesMisspellWarningShown = false;
        }
        function isValidElement3(object) {
          {
            return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
          }
        }
        function getDeclarationErrorAddendum() {
          {
            if (ReactCurrentOwner$1.current) {
              var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
              if (name) {
                return "\n\nCheck the render method of `" + name + "`.";
              }
            }
            return "";
          }
        }
        function getSourceInfoErrorAddendum(source) {
          {
            if (source !== void 0) {
              var fileName = source.fileName.replace(/^.*[\\\/]/, "");
              var lineNumber = source.lineNumber;
              return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
            }
            return "";
          }
        }
        var ownerHasKeyUseWarning = {};
        function getCurrentComponentErrorInfo(parentType) {
          {
            var info = getDeclarationErrorAddendum();
            if (!info) {
              var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
              if (parentName) {
                info = "\n\nCheck the top-level render call using <" + parentName + ">.";
              }
            }
            return info;
          }
        }
        function validateExplicitKey(element, parentType) {
          {
            if (!element._store || element._store.validated || element.key != null) {
              return;
            }
            element._store.validated = true;
            var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
            if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
              return;
            }
            ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
            var childOwner = "";
            if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
              childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
            }
            setCurrentlyValidatingElement$1(element);
            error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
            setCurrentlyValidatingElement$1(null);
          }
        }
        function validateChildKeys(node2, parentType) {
          {
            if (typeof node2 !== "object") {
              return;
            }
            if (isArray(node2)) {
              for (var i = 0; i < node2.length; i++) {
                var child = node2[i];
                if (isValidElement3(child)) {
                  validateExplicitKey(child, parentType);
                }
              }
            } else if (isValidElement3(node2)) {
              if (node2._store) {
                node2._store.validated = true;
              }
            } else if (node2) {
              var iteratorFn = getIteratorFn(node2);
              if (typeof iteratorFn === "function") {
                if (iteratorFn !== node2.entries) {
                  var iterator = iteratorFn.call(node2);
                  var step;
                  while (!(step = iterator.next()).done) {
                    if (isValidElement3(step.value)) {
                      validateExplicitKey(step.value, parentType);
                    }
                  }
                }
              }
            }
          }
        }
        function validatePropTypes(element) {
          {
            var type = element.type;
            if (type === null || type === void 0 || typeof type === "string") {
              return;
            }
            var propTypes;
            if (typeof type === "function") {
              propTypes = type.propTypes;
            } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
            // Inner props are checked in the reconciler.
            type.$$typeof === REACT_MEMO_TYPE)) {
              propTypes = type.propTypes;
            } else {
              return;
            }
            if (propTypes) {
              var name = getComponentNameFromType(type);
              checkPropTypes(propTypes, element.props, "prop", name, element);
            } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
              propTypesMisspellWarningShown = true;
              var _name = getComponentNameFromType(type);
              error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
            }
            if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
              error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
            }
          }
        }
        function validateFragmentProps(fragment) {
          {
            var keys = Object.keys(fragment.props);
            for (var i = 0; i < keys.length; i++) {
              var key = keys[i];
              if (key !== "children" && key !== "key") {
                setCurrentlyValidatingElement$1(fragment);
                error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
                setCurrentlyValidatingElement$1(null);
                break;
              }
            }
            if (fragment.ref !== null) {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid attribute `ref` supplied to `React.Fragment`.");
              setCurrentlyValidatingElement$1(null);
            }
          }
        }
        function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
          {
            var validType = isValidElementType(type);
            if (!validType) {
              var info = "";
              if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
                info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
              }
              var sourceInfo = getSourceInfoErrorAddendum(source);
              if (sourceInfo) {
                info += sourceInfo;
              } else {
                info += getDeclarationErrorAddendum();
              }
              var typeString;
              if (type === null) {
                typeString = "null";
              } else if (isArray(type)) {
                typeString = "array";
              } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
                typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
                info = " Did you accidentally export a JSX literal instead of a component?";
              } else {
                typeString = typeof type;
              }
              error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
            }
            var element = jsxDEV(type, props, key, source, self2);
            if (element == null) {
              return element;
            }
            if (validType) {
              var children = props.children;
              if (children !== void 0) {
                if (isStaticChildren) {
                  if (isArray(children)) {
                    for (var i = 0; i < children.length; i++) {
                      validateChildKeys(children[i], type);
                    }
                    if (Object.freeze) {
                      Object.freeze(children);
                    }
                  } else {
                    error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                  }
                } else {
                  validateChildKeys(children, type);
                }
              }
            }
            if (type === REACT_FRAGMENT_TYPE) {
              validateFragmentProps(element);
            } else {
              validatePropTypes(element);
            }
            return element;
          }
        }
        function jsxWithValidationStatic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, true);
          }
        }
        function jsxWithValidationDynamic(type, props, key) {
          {
            return jsxWithValidation(type, props, key, false);
          }
        }
        var jsx3 = jsxWithValidationDynamic;
        var jsxs2 = jsxWithValidationStatic;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = jsx3;
        exports.jsxs = jsxs2;
      })();
    }
  }
});

// ../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS({
  "../../node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_react_jsx_runtime_production_min();
    } else {
      module2.exports = require_react_jsx_runtime_development();
    }
  }
});

// ../../node_modules/.pnpm/@emotion+react@11.10.5_xl5my4wapvq2ctl7qwehtbgorq/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js
var import_react5, import_extends, import_hoist_non_react_statics, import_jsx_runtime;
var init_emotion_react_jsx_runtime_esm = __esm({
  "../../node_modules/.pnpm/@emotion+react@11.10.5_xl5my4wapvq2ctl7qwehtbgorq/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"() {
    import_react5 = __toESM(require_react());
    init_emotion_cache_esm();
    import_extends = __toESM(require_extends());
    init_emotion_weak_memoize_esm();
    import_hoist_non_react_statics = __toESM(require_hoist_non_react_statics_cjs());
    init_emotion_utils_esm();
    init_emotion_serialize_esm();
    init_emotion_use_insertion_effect_with_fallbacks_esm();
    import_jsx_runtime = __toESM(require_jsx_runtime());
  }
});

// ../../pkgs/royal/pkgs/web-init/src/error.tsx
var import_react6;
var init_error = __esm({
  "../../pkgs/royal/pkgs/web-init/src/error.tsx"() {
    "use strict";
    import_react6 = __toESM(require_react());
    init_emotion_react_jsx_runtime_esm();
  }
});

// ../../pkgs/royal/pkgs/web-init/src/app.tsx
var import_react7;
var init_app = __esm({
  "../../pkgs/royal/pkgs/web-init/src/app.tsx"() {
    "use strict";
    import_react7 = __toESM(require_react());
    init_src();
    init_router();
    init_error();
    init_emotion_react_jsx_runtime_esm();
  }
});

// ../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/pad.js
var require_pad = __commonJS({
  "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/pad.js"(exports, module2) {
    module2.exports = function pad(num, size) {
      var s = "000000000" + num;
      return s.substr(s.length - size);
    };
  }
});

// ../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/fingerprint.js
var require_fingerprint = __commonJS({
  "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/fingerprint.js"(exports, module2) {
    var pad = require_pad();
    var os = require("os");
    var padding = 2;
    var pid = pad(process.pid.toString(36), padding);
    var hostname = os.hostname();
    var length2 = hostname.length;
    var hostId = pad(
      hostname.split("").reduce(function(prev2, char2) {
        return +prev2 + char2.charCodeAt(0);
      }, +length2 + 36).toString(36),
      padding
    );
    module2.exports = function fingerprint() {
      return pid + hostId;
    };
  }
});

// ../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/getRandomValue.js
var require_getRandomValue = __commonJS({
  "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/lib/getRandomValue.js"(exports, module2) {
    var crypto = require("crypto");
    var lim = Math.pow(2, 32) - 1;
    module2.exports = function random() {
      return Math.abs(crypto.randomBytes(4).readInt32BE() / lim);
    };
  }
});

// ../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/index.js
var require_cuid = __commonJS({
  "../../node_modules/.pnpm/cuid@2.1.8/node_modules/cuid/index.js"(exports, module2) {
    var fingerprint = require_fingerprint();
    var pad = require_pad();
    var getRandomValue = require_getRandomValue();
    var c = 0;
    var blockSize = 4;
    var base = 36;
    var discreteValues = Math.pow(base, blockSize);
    function randomBlock() {
      return pad((getRandomValue() * discreteValues << 0).toString(base), blockSize);
    }
    function safeCounter() {
      c = c < discreteValues ? c : 0;
      c++;
      return c - 1;
    }
    function cuid2() {
      var letter = "c", timestamp = new Date().getTime().toString(base), counter = pad(safeCounter().toString(base), blockSize), print = fingerprint(), random = randomBlock() + randomBlock();
      return letter + timestamp + counter + print + random;
    }
    cuid2.slug = function slug() {
      var date = new Date().getTime().toString(36), counter = safeCounter().toString(36).slice(-4), print = fingerprint().slice(0, 1) + fingerprint().slice(-1), random = randomBlock().slice(-2);
      return date.slice(-2) + counter + print + random;
    };
    cuid2.isCuid = function isCuid(stringToCheck) {
      if (typeof stringToCheck !== "string")
        return false;
      if (stringToCheck.startsWith("c"))
        return true;
      return false;
    };
    cuid2.isSlug = function isSlug(stringToCheck) {
      if (typeof stringToCheck !== "string")
        return false;
      var stringLength = stringToCheck.length;
      if (stringLength >= 7 && stringLength <= 10)
        return true;
      return false;
    };
    cuid2.fingerprint = fingerprint;
    module2.exports = cuid2;
  }
});

// ../../pkgs/royal/pkgs/web-init/src/core/iframe-cors.ts
var import_cuid, createFrameCors;
var init_iframe_cors = __esm({
  "../../pkgs/royal/pkgs/web-init/src/core/iframe-cors.ts"() {
    "use strict";
    init_src();
    import_cuid = __toESM(require_cuid());
    createFrameCors = (url) => {
      const id = `__` + url.replace(/\W/g, "");
      if (!document.querySelector(`#${id}`)) {
        const iframe = document.createElement("iframe");
        iframe.style.display = "none";
        iframe.id = id;
        const _url = new URL(url);
        _url.pathname = "/_api_frm";
        iframe.src = _url.toString();
        const onInit = () => {
          iframe.setAttribute("loaded", "y");
          window.removeEventListener("message", onInit);
        };
        window.addEventListener("message", onInit);
        document.body.appendChild(iframe);
      }
      const wm = {};
      const sendRaw = async (input, init) => {
        const iframe = document.querySelector(`#${id}`);
        if (!iframe || !iframe.contentWindow || iframe && iframe.getAttribute("loaded") !== "y") {
          await waitUntil(
            () => iframe && iframe.contentWindow && iframe.getAttribute("loaded") === "y"
          );
        }
        return new Promise((resolve) => {
          if (iframe && iframe.contentWindow) {
            const id2 = (0, import_cuid.default)();
            wm[id2] = (e) => {
              if (id2 === e.data.id) {
                window.removeEventListener("message", wm[id2]);
                delete wm[id2];
                resolve(e.data.result);
              }
            };
            window.addEventListener("message", wm[id2]);
            iframe.contentWindow.postMessage({ input, init, id: id2 }, "*");
          }
        });
      };
      return {
        send(input, data, _headers) {
          const uri = input.toString();
          const headers = { ..._headers };
          if (!(data instanceof FormData || data instanceof File)) {
            headers["content-type"] = "application/json";
          }
          return sendRaw(
            `${url.endsWith("/") ? url : `${url}/`}${uri.startsWith("/") ? uri.substring(1) : uri}`,
            data ? {
              method: "post",
              headers,
              body: data instanceof FormData || data instanceof File ? data : JSON.stringify(data)
            } : {}
          );
        }
      };
    };
  }
});

// ../../pkgs/royal/pkgs/web-init/src/core/init.ts
var import_react8, w2, dbClient, fetchSendDb;
var init_init = __esm({
  "../../pkgs/royal/pkgs/web-init/src/core/init.ts"() {
    "use strict";
    import_react8 = __toESM(require_react());
    init_iframe_cors();
    init_router();
    init_web_layout();
    init_web_page_ssr();
    w2 = typeof isSSR === "undefined" ? window : global.window;
    dbClient = (name) => {
      return new Proxy(
        {},
        {
          get(_, table) {
            if (table.startsWith("$")) {
              return (...params) => {
                return fetchSendDb(name, {
                  db: name,
                  action: "query",
                  table,
                  params
                });
              };
            }
            return new Proxy(
              {},
              {
                get(_2, action) {
                  return (...params) => {
                    if (table === "query") {
                      table = action;
                      action = "query";
                    }
                    return fetchSendDb(name, {
                      db: name,
                      action,
                      table,
                      params
                    });
                  };
                }
              }
            );
          }
        }
      );
    };
    fetchSendDb = async (name, params) => {
      const w3 = window;
      let url = `/_dbs/${name}`;
      let frm;
      if (params.table) {
        url += `/${params.table}`;
      }
      if (!w3.frmapi) {
        w3.frmapi = {};
        w3.frmapi[w3.serverurl] = createFrameCors(w3.serverurl);
      }
      frm = w3.frmapi[w3.serverurl];
      return await frm.send(url, params, w3.apiHeaders);
    };
    if (w2) {
      w2.db = dbClient("db");
    }
  }
});

// ../../pkgs/royal/pkgs/web-init/src/core/modify-props.tsx
var init_modify_props = __esm({
  "../../pkgs/royal/pkgs/web-init/src/core/modify-props.tsx"() {
    "use strict";
  }
});

// ../../pkgs/royal/pkgs/web-init/src/index.tsx
var init_src2 = __esm({
  "../../pkgs/royal/pkgs/web-init/src/index.tsx"() {
    init_layout();
    init_app();
    init_init();
    init_iframe_cors();
    init_modify_props();
  }
});

// ../../node_modules/.pnpm/@emotion+react@11.10.5_jp5qgyg6plq757v5hojp7ls2oe/node_modules/@emotion/react/dist/emotion-element-3838ba9e.esm.js
var import_react9, isBrowser4, hasOwnProperty, EmotionCacheContext, CacheProvider, withEmotionCache, ThemeContext, getLastPart, getFunctionNameFromStackTraceLine, internalReactFunctionNames, sanitizeIdentifier, getLabelFromStackTrace, typePropName, labelPropName, createEmotionProps, Insertion, Emotion;
var init_emotion_element_3838ba9e_esm = __esm({
  "../../node_modules/.pnpm/@emotion+react@11.10.5_jp5qgyg6plq757v5hojp7ls2oe/node_modules/@emotion/react/dist/emotion-element-3838ba9e.esm.js"() {
    import_react9 = __toESM(require_react());
    init_emotion_cache_esm();
    init_extends();
    init_emotion_weak_memoize_esm();
    init_emotion_utils_esm();
    init_emotion_serialize_esm();
    init_emotion_use_insertion_effect_with_fallbacks_esm();
    isBrowser4 = typeof document !== "undefined";
    hasOwnProperty = {}.hasOwnProperty;
    EmotionCacheContext = /* @__PURE__ */ (0, import_react9.createContext)(
      // we're doing this to avoid preconstruct's dead code elimination in this one case
      // because this module is primarily intended for the browser and node
      // but it's also required in react native and similar environments sometimes
      // and we could have a special build just for that
      // but this is much easier and the native packages
      // might use a different theme context in the future anyway
      typeof HTMLElement !== "undefined" ? /* @__PURE__ */ emotion_cache_esm_default({
        key: "css"
      }) : null
    );
    if (process.env.NODE_ENV !== "production") {
      EmotionCacheContext.displayName = "EmotionCacheContext";
    }
    CacheProvider = EmotionCacheContext.Provider;
    withEmotionCache = function withEmotionCache2(func) {
      return /* @__PURE__ */ (0, import_react9.forwardRef)(function(props, ref) {
        var cache = (0, import_react9.useContext)(EmotionCacheContext);
        return func(props, cache, ref);
      });
    };
    if (!isBrowser4) {
      withEmotionCache = function withEmotionCache3(func) {
        return function(props) {
          var cache = (0, import_react9.useContext)(EmotionCacheContext);
          if (cache === null) {
            cache = emotion_cache_esm_default({
              key: "css"
            });
            return /* @__PURE__ */ (0, import_react9.createElement)(EmotionCacheContext.Provider, {
              value: cache
            }, func(props, cache));
          } else {
            return func(props, cache);
          }
        };
      };
    }
    ThemeContext = /* @__PURE__ */ (0, import_react9.createContext)({});
    if (process.env.NODE_ENV !== "production") {
      ThemeContext.displayName = "EmotionThemeContext";
    }
    getLastPart = function getLastPart2(functionName) {
      var parts = functionName.split(".");
      return parts[parts.length - 1];
    };
    getFunctionNameFromStackTraceLine = function getFunctionNameFromStackTraceLine2(line2) {
      var match2 = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line2);
      if (match2)
        return getLastPart(match2[1]);
      match2 = /^([A-Za-z0-9$.]+)@/.exec(line2);
      if (match2)
        return getLastPart(match2[1]);
      return void 0;
    };
    internalReactFunctionNames = /* @__PURE__ */ new Set(["renderWithHooks", "processChild", "finishClassComponent", "renderToString"]);
    sanitizeIdentifier = function sanitizeIdentifier2(identifier2) {
      return identifier2.replace(/\$/g, "-");
    };
    getLabelFromStackTrace = function getLabelFromStackTrace2(stackTrace) {
      if (!stackTrace)
        return void 0;
      var lines = stackTrace.split("\n");
      for (var i = 0; i < lines.length; i++) {
        var functionName = getFunctionNameFromStackTraceLine(lines[i]);
        if (!functionName)
          continue;
        if (internalReactFunctionNames.has(functionName))
          break;
        if (/^[A-Z]/.test(functionName))
          return sanitizeIdentifier(functionName);
      }
      return void 0;
    };
    typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__";
    labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__";
    createEmotionProps = function createEmotionProps2(type, props) {
      if (process.env.NODE_ENV !== "production" && typeof props.css === "string" && // check if there is a css declaration
      props.css.indexOf(":") !== -1) {
        throw new Error("Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/react' like this: css`" + props.css + "`");
      }
      var newProps = {};
      for (var key in props) {
        if (hasOwnProperty.call(props, key)) {
          newProps[key] = props[key];
        }
      }
      newProps[typePropName] = type;
      if (process.env.NODE_ENV !== "production" && !!props.css && (typeof props.css !== "object" || typeof props.css.name !== "string" || props.css.name.indexOf("-") === -1)) {
        var label = getLabelFromStackTrace(new Error().stack);
        if (label)
          newProps[labelPropName] = label;
      }
      return newProps;
    };
    Insertion = function Insertion2(_ref) {
      var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
      registerStyles(cache, serialized, isStringTag);
      var rules = useInsertionEffectAlwaysWithSyncFallback(function() {
        return insertStyles(cache, serialized, isStringTag);
      });
      if (!isBrowser4 && rules !== void 0) {
        var _ref2;
        var serializedNames = serialized.name;
        var next2 = serialized.next;
        while (next2 !== void 0) {
          serializedNames += " " + next2.name;
          next2 = next2.next;
        }
        return /* @__PURE__ */ (0, import_react9.createElement)("style", (_ref2 = {}, _ref2["data-emotion"] = cache.key + " " + serializedNames, _ref2.dangerouslySetInnerHTML = {
          __html: rules
        }, _ref2.nonce = cache.sheet.nonce, _ref2));
      }
      return null;
    };
    Emotion = /* @__PURE__ */ withEmotionCache(function(props, cache, ref) {
      var cssProp = props.css;
      if (typeof cssProp === "string" && cache.registered[cssProp] !== void 0) {
        cssProp = cache.registered[cssProp];
      }
      var WrappedComponent = props[typePropName];
      var registeredStyles = [cssProp];
      var className = "";
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache.registered, registeredStyles, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(registeredStyles, void 0, (0, import_react9.useContext)(ThemeContext));
      if (process.env.NODE_ENV !== "production" && serialized.name.indexOf("-") === -1) {
        var labelFromStack = props[labelPropName];
        if (labelFromStack) {
          serialized = serializeStyles([serialized, "label:" + labelFromStack + ";"]);
        }
      }
      className += cache.key + "-" + serialized.name;
      var newProps = {};
      for (var key in props) {
        if (hasOwnProperty.call(props, key) && key !== "css" && key !== typePropName && (process.env.NODE_ENV === "production" || key !== labelPropName)) {
          newProps[key] = props[key];
        }
      }
      newProps.ref = ref;
      newProps.className = className;
      return /* @__PURE__ */ (0, import_react9.createElement)(import_react9.Fragment, null, /* @__PURE__ */ (0, import_react9.createElement)(Insertion, {
        cache,
        serialized,
        isStringTag: typeof WrappedComponent === "string"
      }), /* @__PURE__ */ (0, import_react9.createElement)(WrappedComponent, newProps));
    });
    if (process.env.NODE_ENV !== "production") {
      Emotion.displayName = "EmotionCssPropInternal";
    }
  }
});

// ../../node_modules/.pnpm/@emotion+react@11.10.5_jp5qgyg6plq757v5hojp7ls2oe/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js
function jsx2(type, props, key) {
  if (!hasOwnProperty.call(props, "css")) {
    return (0, import_jsx_runtime4.jsx)(type, props, key);
  }
  return (0, import_jsx_runtime4.jsx)(Emotion, createEmotionProps(type, props), key);
}
var import_react10, import_extends3, import_hoist_non_react_statics2, import_jsx_runtime4, Fragment4;
var init_emotion_react_jsx_runtime_esm2 = __esm({
  "../../node_modules/.pnpm/@emotion+react@11.10.5_jp5qgyg6plq757v5hojp7ls2oe/node_modules/@emotion/react/jsx-runtime/dist/emotion-react-jsx-runtime.esm.js"() {
    import_react10 = __toESM(require_react());
    init_emotion_cache_esm();
    init_emotion_element_3838ba9e_esm();
    import_extends3 = __toESM(require_extends());
    init_emotion_weak_memoize_esm();
    import_hoist_non_react_statics2 = __toESM(require_hoist_non_react_statics_cjs());
    init_emotion_utils_esm();
    init_emotion_serialize_esm();
    init_emotion_use_insertion_effect_with_fallbacks_esm();
    import_jsx_runtime4 = __toESM(require_jsx_runtime());
    Fragment4 = import_jsx_runtime4.Fragment;
  }
});

// ../../app/web/src/base/layout/blank.tsx
var blank_exports = {};
__export(blank_exports, {
  default: () => blank_default
});
var blank_default;
var init_blank = __esm({
  "../../app/web/src/base/layout/blank.tsx"() {
    "use strict";
    init_src2();
    init_emotion_react_jsx_runtime_esm2();
    blank_default = layout({
      component: ({ children }) => {
        return /* @__PURE__ */ jsx2(Fragment4, { children });
      }
    });
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/generateStyles.cjs.js
var require_generateStyles_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/generateStyles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var positionMap = ["Top", "Right", "Bottom", "Left"];
    function generateStyles(property, suffix, ...values) {
      const [firstValue, secondValue = firstValue, thirdValue = firstValue, fourthValue = secondValue] = values;
      const valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
      const styles = {};
      for (let i = 0; i < valuesWithDefaults.length; i += 1) {
        if (valuesWithDefaults[i] || valuesWithDefaults[i] === 0) {
          const newKey = property + positionMap[i] + suffix;
          styles[newKey] = valuesWithDefaults[i];
        }
      }
      return styles;
    }
    exports.generateStyles = generateStyles;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderWidth.cjs.js
var require_borderWidth_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderWidth.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var generateStyles = require_generateStyles_cjs();
    function borderWidth(...values) {
      return generateStyles.generateStyles("border", "Width", ...values);
    }
    exports.borderWidth = borderWidth;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderStyle.cjs.js
var require_borderStyle_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderStyle.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var generateStyles = require_generateStyles_cjs();
    function borderStyle(...values) {
      return generateStyles.generateStyles("border", "Style", ...values);
    }
    exports.borderStyle = borderStyle;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderColor.cjs.js
var require_borderColor_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderColor.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var generateStyles = require_generateStyles_cjs();
    function borderColor(...values) {
      return generateStyles.generateStyles("border", "Color", ...values);
    }
    exports.borderColor = borderColor;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/border.cjs.js
var require_border_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/border.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var borderWidth = require_borderWidth_cjs();
    var borderStyle = require_borderStyle_cjs();
    var borderColor = require_borderColor_cjs();
    function border(...values) {
      return Object.assign(Object.assign(Object.assign({}, borderWidth.borderWidth(values[0])), values[1] && borderStyle.borderStyle(values[1])), values[2] && borderColor.borderColor(values[2]));
    }
    exports.border = border;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderLeft.cjs.js
var require_borderLeft_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderLeft.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function borderLeft(...values) {
      return Object.assign(Object.assign({
        borderLeftWidth: values[0]
      }, values[1] && {
        borderLeftStyle: values[1]
      }), values[2] && {
        borderLeftColor: values[2]
      });
    }
    exports.borderLeft = borderLeft;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderBottom.cjs.js
var require_borderBottom_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderBottom.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function borderBottom(...values) {
      return Object.assign(Object.assign({
        borderBottomWidth: values[0]
      }, values[1] && {
        borderBottomStyle: values[1]
      }), values[2] && {
        borderBottomColor: values[2]
      });
    }
    exports.borderBottom = borderBottom;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderRight.cjs.js
var require_borderRight_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderRight.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function borderRight(...values) {
      return Object.assign(Object.assign({
        borderRightWidth: values[0]
      }, values[1] && {
        borderRightStyle: values[1]
      }), values[2] && {
        borderRightColor: values[2]
      });
    }
    exports.borderRight = borderRight;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderTop.cjs.js
var require_borderTop_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderTop.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function borderTop(...values) {
      return Object.assign(Object.assign({
        borderTopWidth: values[0]
      }, values[1] && {
        borderTopStyle: values[1]
      }), values[2] && {
        borderTopColor: values[2]
      });
    }
    exports.borderTop = borderTop;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderRadius.cjs.js
var require_borderRadius_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/borderRadius.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function borderRadius2(value1, value2 = value1, value3 = value1, value4 = value2) {
      return {
        borderBottomRightRadius: value3,
        borderBottomLeftRadius: value4,
        borderTopRightRadius: value2,
        borderTopLeftRadius: value1
      };
    }
    exports.borderRadius = borderRadius2;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/flex.cjs.js
var require_flex_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/flex.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isUnit = (value) => typeof value === "string" && /(\d+(\w+|%))/.test(value);
    var isUnitless = (value) => typeof value === "number" && !Number.isNaN(value);
    var isInitial = (value) => value === "initial";
    var isAuto = (value) => value === "auto";
    var isNone = (value) => value === "none";
    var widthReservedKeys = ["content", "fit-content", "max-content", "min-content"];
    var isWidth = (value) => widthReservedKeys.some((key) => value === key) || isUnit(value);
    function flex(...values) {
      const isOneValueSyntax = values.length === 1;
      const isTwoValueSyntax = values.length === 2;
      const isThreeValueSyntax = values.length === 3;
      if (isOneValueSyntax) {
        const [firstValue] = values;
        if (isInitial(firstValue)) {
          return {
            flexGrow: 0,
            flexShrink: 1,
            flexBasis: "auto"
          };
        }
        if (isAuto(firstValue)) {
          return {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: "auto"
          };
        }
        if (isNone(firstValue)) {
          return {
            flexGrow: 0,
            flexShrink: 0,
            flexBasis: "auto"
          };
        }
        if (isUnitless(firstValue)) {
          return {
            flexGrow: firstValue,
            flexShrink: 1,
            flexBasis: 0
          };
        }
        if (isWidth(firstValue)) {
          return {
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: firstValue
          };
        }
      }
      if (isTwoValueSyntax) {
        const [firstValue, secondValue] = values;
        if (isUnitless(secondValue)) {
          return {
            flexGrow: firstValue,
            flexShrink: secondValue,
            flexBasis: 0
          };
        }
        if (isWidth(secondValue)) {
          return {
            flexGrow: firstValue,
            flexShrink: 1,
            flexBasis: secondValue
          };
        }
      }
      if (isThreeValueSyntax) {
        const [firstValue, secondValue, thirdValue] = values;
        if (isUnitless(firstValue) && isUnitless(secondValue) && (isAuto(thirdValue) || isWidth(thirdValue))) {
          return {
            flexGrow: firstValue,
            flexShrink: secondValue,
            flexBasis: thirdValue
          };
        }
      }
      if (process.env.NODE_ENV !== "production") {
        console.error(`The value passed to shorthands.flex did not match any flex property specs. The CSS styles were not generated. Please, check the flex documentation.`);
      }
      return {};
    }
    exports.flex = flex;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/gap.cjs.js
var require_gap_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/gap.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function gap(columnGap, rowGap = columnGap) {
      return {
        columnGap,
        rowGap
      };
    }
    exports.gap = gap;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/gridArea.cjs.js
var require_gridArea_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/gridArea.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cssVarRegEx = /var\(.*\)/gi;
    function isValidGridAreaInput(value) {
      return value === void 0 || typeof value === "number" || typeof value === "string" && !cssVarRegEx.test(value);
    }
    var customIdentRegEx = /^[a-zA-Z0-9\-_\\#;]+$/;
    var nonCustomIdentRegEx = /^-moz-initial$|^auto$|^initial$|^inherit$|^revert$|^unset$|^span \d+$|\d.*/;
    function isCustomIdent(value) {
      return value !== void 0 && typeof value === "string" && customIdentRegEx.test(value) && !nonCustomIdentRegEx.test(value);
    }
    function gridArea(...values) {
      if (values.some((value) => !isValidGridAreaInput(value))) {
        if (process.env.NODE_ENV !== "production") {
          console.error(`The value passed to shorthands.gridArea() did not match any gridArea property specs. The CSS styles were not generated. Please, check the gridArea documentation.`, ["The value passed to shorthands.gridArea() did not match any gridArea property specs. ", "The CSS styles were not generated.\n", "Please, check the `grid-area` documentation:\n", "- https://developer.mozilla.org/docs/Web/CSS/grid-area", "- https://griffel.js.org/react/api/shorthands#shorthandsgridarea"].join(""));
        }
        return {};
      }
      const gridRowStart = values[0] !== void 0 ? values[0] : "auto";
      const gridColumnStart = values[1] !== void 0 ? values[1] : isCustomIdent(gridRowStart) ? gridRowStart : "auto";
      const gridRowEnd = values[2] !== void 0 ? values[2] : isCustomIdent(gridRowStart) ? gridRowStart : "auto";
      const gridColumnEnd = values[3] !== void 0 ? values[3] : isCustomIdent(gridColumnStart) ? gridColumnStart : "auto";
      return {
        gridRowStart,
        gridColumnStart,
        gridRowEnd,
        gridColumnEnd
      };
    }
    exports.gridArea = gridArea;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/margin.cjs.js
var require_margin_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/margin.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var generateStyles = require_generateStyles_cjs();
    function margin(...values) {
      return generateStyles.generateStyles("margin", "", ...values);
    }
    exports.margin = margin;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/padding.cjs.js
var require_padding_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/padding.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var generateStyles = require_generateStyles_cjs();
    function padding(...values) {
      return generateStyles.generateStyles("padding", "", ...values);
    }
    exports.padding = padding;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/overflow.cjs.js
var require_overflow_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/overflow.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function overflow(overflowX, overflowY = overflowX) {
      return {
        overflowX,
        overflowY
      };
    }
    exports.overflow = overflow;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/inset.cjs.js
var require_inset_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/inset.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function inset(...values) {
      const [firstValue, secondValue = firstValue, thirdValue = firstValue, fourthValue = secondValue] = values;
      return {
        top: firstValue,
        right: secondValue,
        bottom: thirdValue,
        left: fourthValue
      };
    }
    exports.inset = inset;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/outline.cjs.js
var require_outline_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/outline.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function outline(outlineWidth, outlineStyle, outlineColor) {
      return Object.assign(Object.assign({
        outlineWidth
      }, outlineStyle && {
        outlineStyle
      }), outlineColor && {
        outlineColor
      });
    }
    exports.outline = outline;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/transition.cjs.js
var require_transition_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/shorthands/transition.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function transition(...values) {
      if (isTransitionGlobalInputs(values)) {
        return {
          transitionDelay: values[0],
          transitionDuration: values[0],
          transitionProperty: values[0],
          transitionTimingFunction: values[0]
        };
      }
      const transitionInputs = normalizeTransitionInputs(values);
      return transitionInputs.reduce((acc, [property, duration = "0s", delay = "0s", timingFunction = "ease"], index) => {
        if (index === 0) {
          acc.transitionProperty = property;
          acc.transitionDuration = duration;
          acc.transitionDelay = delay;
          acc.transitionTimingFunction = timingFunction;
        } else {
          acc.transitionProperty += `, ${property}`;
          acc.transitionDuration += `, ${duration}`;
          acc.transitionDelay += `, ${delay}`;
          acc.transitionTimingFunction += `, ${timingFunction}`;
        }
        return acc;
      }, {});
    }
    var transitionGlobalInputs = ["-moz-initial", "inherit", "initial", "revert", "unset"];
    function isTransitionGlobalInputs(values) {
      return values.length === 1 && transitionGlobalInputs.includes(values[0]);
    }
    function normalizeTransitionInputs(transitionInputs) {
      if (transitionInputs.length === 1 && Array.isArray(transitionInputs[0])) {
        return transitionInputs[0];
      }
      return [transitionInputs];
    }
    exports.transition = transition;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/constants.cjs.js
var require_constants_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/constants.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var __GLOBAL__ = typeof window === "undefined" ? global : window;
    var __NAMESPACE_PREFIX__ = "@griffel/";
    function getGlobalVar(name, defaultValue) {
      if (!__GLOBAL__[Symbol.for(__NAMESPACE_PREFIX__ + name)]) {
        __GLOBAL__[Symbol.for(__NAMESPACE_PREFIX__ + name)] = defaultValue;
      }
      return __GLOBAL__[Symbol.for(__NAMESPACE_PREFIX__ + name)];
    }
    var DEBUG_RESET_CLASSES = /* @__PURE__ */ getGlobalVar("DEBUG_RESET_CLASSES", {});
    var DEFINITION_LOOKUP_TABLE = /* @__PURE__ */ getGlobalVar("DEFINITION_LOOKUP_TABLE", {});
    var DATA_BUCKET_ATTR = "data-make-styles-bucket";
    var HASH_PREFIX = "f";
    var RESET_HASH_PREFIX = "r";
    var SEQUENCE_HASH_LENGTH = 7;
    var SEQUENCE_PREFIX = "___";
    var DEBUG_SEQUENCE_SEPARATOR = "_";
    var SEQUENCE_SIZE = process.env.NODE_ENV === "production" ? SEQUENCE_PREFIX.length + SEQUENCE_HASH_LENGTH : SEQUENCE_PREFIX.length + SEQUENCE_HASH_LENGTH + DEBUG_SEQUENCE_SEPARATOR.length + SEQUENCE_HASH_LENGTH;
    var LOOKUP_DEFINITIONS_INDEX = 0;
    var LOOKUP_DIR_INDEX = 1;
    var UNSUPPORTED_CSS_PROPERTIES = {
      all: 1,
      animation: 1,
      background: 1,
      backgroundPosition: 1,
      border: 1,
      borderBlock: 1,
      borderBlockEnd: 1,
      borderBlockStart: 1,
      borderBottom: 1,
      borderColor: 1,
      borderImage: 1,
      borderInline: 1,
      borderInlineEnd: 1,
      borderInlineStart: 1,
      borderLeft: 1,
      borderRadius: 1,
      borderRight: 1,
      borderStyle: 1,
      borderTop: 1,
      borderWidth: 1,
      columns: 1,
      columnRule: 1,
      flex: 1,
      flexFlow: 1,
      font: 1,
      gap: 1,
      grid: 1,
      gridArea: 1,
      gridColumn: 1,
      gridRow: 1,
      gridTemplate: 1,
      lineClamp: 1,
      listStyle: 1,
      margin: 1,
      mask: 1,
      maskBorder: 1,
      motion: 1,
      offset: 1,
      outline: 1,
      overflow: 1,
      overscrollBehavior: 1,
      padding: 1,
      placeItems: 1,
      placeSelf: 1,
      textDecoration: 1,
      textEmphasis: 1,
      transition: 1
    };
    exports.DATA_BUCKET_ATTR = DATA_BUCKET_ATTR;
    exports.DEBUG_RESET_CLASSES = DEBUG_RESET_CLASSES;
    exports.DEBUG_SEQUENCE_SEPARATOR = DEBUG_SEQUENCE_SEPARATOR;
    exports.DEFINITION_LOOKUP_TABLE = DEFINITION_LOOKUP_TABLE;
    exports.HASH_PREFIX = HASH_PREFIX;
    exports.LOOKUP_DEFINITIONS_INDEX = LOOKUP_DEFINITIONS_INDEX;
    exports.LOOKUP_DIR_INDEX = LOOKUP_DIR_INDEX;
    exports.RESET_HASH_PREFIX = RESET_HASH_PREFIX;
    exports.SEQUENCE_HASH_LENGTH = SEQUENCE_HASH_LENGTH;
    exports.SEQUENCE_PREFIX = SEQUENCE_PREFIX;
    exports.SEQUENCE_SIZE = SEQUENCE_SIZE;
    exports.UNSUPPORTED_CSS_PROPERTIES = UNSUPPORTED_CSS_PROPERTIES;
  }
});

// ../../node_modules/.pnpm/@emotion+hash@0.8.0/node_modules/@emotion/hash/dist/hash.cjs.prod.js
var require_hash_cjs_prod = __commonJS({
  "../../node_modules/.pnpm/@emotion+hash@0.8.0/node_modules/@emotion/hash/dist/hash.cjs.prod.js"(exports) {
    "use strict";
    function murmur22(str) {
      for (var k, h = 0, i = 0, len = str.length; len >= 4; ++i, len -= 4)
        k = 1540483477 * (65535 & (k = 255 & str.charCodeAt(i) | (255 & str.charCodeAt(++i)) << 8 | (255 & str.charCodeAt(++i)) << 16 | (255 & str.charCodeAt(++i)) << 24)) + (59797 * (k >>> 16) << 16), h = 1540483477 * (65535 & (k ^= k >>> 24)) + (59797 * (k >>> 16) << 16) ^ 1540483477 * (65535 & h) + (59797 * (h >>> 16) << 16);
      switch (len) {
        case 3:
          h ^= (255 & str.charCodeAt(i + 2)) << 16;
        case 2:
          h ^= (255 & str.charCodeAt(i + 1)) << 8;
        case 1:
          h = 1540483477 * (65535 & (h ^= 255 & str.charCodeAt(i))) + (59797 * (h >>> 16) << 16);
      }
      return (((h = 1540483477 * (65535 & (h ^= h >>> 13)) + (59797 * (h >>> 16) << 16)) ^ h >>> 15) >>> 0).toString(36);
    }
    Object.defineProperty(exports, "__esModule", {
      value: true
    }), exports.default = murmur22;
  }
});

// ../../node_modules/.pnpm/@emotion+hash@0.8.0/node_modules/@emotion/hash/dist/hash.cjs.dev.js
var require_hash_cjs_dev = __commonJS({
  "../../node_modules/.pnpm/@emotion+hash@0.8.0/node_modules/@emotion/hash/dist/hash.cjs.dev.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function murmur22(str) {
      var h = 0;
      var k, i = 0, len = str.length;
      for (; len >= 4; ++i, len -= 4) {
        k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
        k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
        k ^= /* k >>> r: */
        k >>> 24;
        h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      }
      switch (len) {
        case 3:
          h ^= (str.charCodeAt(i + 2) & 255) << 16;
        case 2:
          h ^= (str.charCodeAt(i + 1) & 255) << 8;
        case 1:
          h ^= str.charCodeAt(i) & 255;
          h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      }
      h ^= h >>> 13;
      h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
      return ((h ^ h >>> 15) >>> 0).toString(36);
    }
    exports.default = murmur22;
  }
});

// ../../node_modules/.pnpm/@emotion+hash@0.8.0/node_modules/@emotion/hash/dist/hash.cjs.js
var require_hash_cjs = __commonJS({
  "../../node_modules/.pnpm/@emotion+hash@0.8.0/node_modules/@emotion/hash/dist/hash.cjs.js"(exports, module2) {
    "use strict";
    if (process.env.NODE_ENV === "production") {
      module2.exports = require_hash_cjs_prod();
    } else {
      module2.exports = require_hash_cjs_dev();
    }
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/hashSequence.cjs.js
var require_hashSequence_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/hashSequence.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hashString = require_hash_cjs();
    var constants = require_constants_cjs();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var hashString__default = /* @__PURE__ */ _interopDefaultLegacy(hashString);
    function padEndHash(value) {
      const hashLength = value.length;
      if (hashLength === constants.SEQUENCE_HASH_LENGTH) {
        return value;
      }
      for (let i = hashLength; i < constants.SEQUENCE_HASH_LENGTH; i++) {
        value += "0";
      }
      return value;
    }
    function hashSequence(classes, dir, sequenceIds = []) {
      if (process.env.NODE_ENV === "production") {
        return constants.SEQUENCE_PREFIX + padEndHash(hashString__default["default"](classes + dir));
      }
      return constants.SEQUENCE_PREFIX + padEndHash(hashString__default["default"](classes + dir)) + constants.DEBUG_SEQUENCE_SEPARATOR + padEndHash(hashString__default["default"](sequenceIds.join("")));
    }
    exports.hashSequence = hashSequence;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/reduceToClassNameForSlots.cjs.js
var require_reduceToClassNameForSlots_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/reduceToClassNameForSlots.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants = require_constants_cjs();
    var hashSequence = require_hashSequence_cjs();
    function reduceToClassName(classMap, dir) {
      let className = "";
      for (const propertyHash in classMap) {
        const classNameMapping = classMap[propertyHash];
        if (classNameMapping) {
          const hasRTLClassName = Array.isArray(classNameMapping);
          if (dir === "rtl") {
            className += (hasRTLClassName ? classNameMapping[1] : classNameMapping) + " ";
          } else {
            className += (hasRTLClassName ? classNameMapping[0] : classNameMapping) + " ";
          }
        }
      }
      return className.slice(0, -1);
    }
    function reduceToClassNameForSlots(classesMapBySlot, dir) {
      const classNamesForSlots = {};
      for (const slotName in classesMapBySlot) {
        const slotClasses = reduceToClassName(classesMapBySlot[slotName], dir);
        if (slotClasses === "") {
          classNamesForSlots[slotName] = "";
          continue;
        }
        const sequenceHash = hashSequence.hashSequence(slotClasses, dir);
        const resultSlotClasses = sequenceHash + " " + slotClasses;
        constants.DEFINITION_LOOKUP_TABLE[sequenceHash] = [classesMapBySlot[slotName], dir];
        classNamesForSlots[slotName] = resultSlotClasses;
      }
      return classNamesForSlots;
    }
    exports.reduceToClassName = reduceToClassName;
    exports.reduceToClassNameForSlots = reduceToClassNameForSlots;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/mergeClasses.cjs.js
var require_mergeClasses_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/mergeClasses.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants = require_constants_cjs();
    var hashSequence = require_hashSequence_cjs();
    var reduceToClassNameForSlots = require_reduceToClassNameForSlots_cjs();
    var mergeClassesCachedResults = {};
    function mergeClasses2() {
      let dir = null;
      let resultClassName = "";
      let sequenceMatch = "";
      const sequencesIds = new Array(arguments.length);
      let containsResetClassName = "";
      for (let i = 0; i < arguments.length; i++) {
        const className = arguments[i];
        if (typeof className === "string" && className !== "") {
          const sequenceIndex = className.indexOf(constants.SEQUENCE_PREFIX);
          if (sequenceIndex === -1) {
            if (process.env.NODE_ENV !== "production") {
              className.split(" ").forEach((entry) => {
                if (entry.startsWith(constants.RESET_HASH_PREFIX) && constants.DEBUG_RESET_CLASSES[entry]) {
                  if (containsResetClassName) {
                    console.error(`mergeClasses(): a passed string contains multiple classes produced by makeResetStyles (${className} & ${resultClassName}, this will lead to non-deterministic behavior. Learn more:https://griffel.js.org/react/api/make-reset-styles#limitations
Source string: ${className}`);
                  } else {
                    containsResetClassName = entry;
                  }
                }
              });
            }
            resultClassName += className + " ";
          } else {
            const sequenceId = className.substr(sequenceIndex, constants.SEQUENCE_SIZE);
            if (sequenceIndex > 0) {
              resultClassName += className.slice(0, sequenceIndex);
            }
            sequenceMatch += sequenceId;
            sequencesIds[i] = sequenceId;
          }
          if (process.env.NODE_ENV !== "production") {
            if (className.indexOf(constants.SEQUENCE_PREFIX, sequenceIndex + 1) !== -1) {
              console.error(`mergeClasses(): a passed string contains multiple identifiers of atomic classes (classes that start with "${constants.SEQUENCE_PREFIX}"), it's possible that passed classes were concatenated in a wrong way. Source string: ${className}`);
            }
          }
        }
      }
      if (sequenceMatch === "") {
        return resultClassName.slice(0, -1);
      }
      const mergeClassesResult = mergeClassesCachedResults[sequenceMatch];
      if (mergeClassesResult !== void 0) {
        return resultClassName + mergeClassesResult;
      }
      const sequenceMappings = [];
      for (let i = 0; i < arguments.length; i++) {
        const sequenceId = sequencesIds[i];
        if (sequenceId) {
          const sequenceMapping = constants.DEFINITION_LOOKUP_TABLE[sequenceId];
          if (sequenceMapping) {
            sequenceMappings.push(sequenceMapping[constants.LOOKUP_DEFINITIONS_INDEX]);
            if (process.env.NODE_ENV !== "production") {
              if (dir !== null && dir !== sequenceMapping[constants.LOOKUP_DIR_INDEX]) {
                console.error(`mergeClasses(): a passed string contains an identifier (${sequenceId}) that has different direction (dir="${sequenceMapping[1] ? "rtl" : "ltr"}") setting than other classes. This is not supported. Source string: ${arguments[i]}`);
              }
            }
            dir = sequenceMapping[constants.LOOKUP_DIR_INDEX];
          } else {
            if (process.env.NODE_ENV !== "production") {
              console.error(`mergeClasses(): a passed string contains an identifier (${sequenceId}) that does not match any entry in cache. Source string: ${arguments[i]}`);
            }
          }
        }
      }
      const resultDefinitions = Object.assign.apply(
        Object,
        // .assign() mutates the first object, we can't mutate mappings as it will produce invalid results later
        [{}].concat(sequenceMappings)
      );
      let atomicClassNames = reduceToClassNameForSlots.reduceToClassName(resultDefinitions, dir);
      const newSequenceHash = hashSequence.hashSequence(atomicClassNames, dir, sequencesIds);
      atomicClassNames = newSequenceHash + " " + atomicClassNames;
      mergeClassesCachedResults[sequenceMatch] = atomicClassNames;
      constants.DEFINITION_LOOKUP_TABLE[newSequenceHash] = [resultDefinitions, dir];
      return resultClassName + atomicClassNames;
    }
    exports.mergeClasses = mergeClasses2;
    exports.mergeClassesCachedResults = mergeClassesCachedResults;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/store.cjs.js
var require_store_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/store.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants = require_constants_cjs();
    var mergeClasses2 = require_mergeClasses_cjs();
    var sequenceDetails = {};
    var cssRules = /* @__PURE__ */ new Set();
    var debugData = {
      getChildrenSequences: (debugSequenceHash) => {
        const key = Object.keys(mergeClasses2.mergeClassesCachedResults).find((key2) => mergeClasses2.mergeClassesCachedResults[key2].startsWith(debugSequenceHash));
        if (key) {
          return key.split(constants.SEQUENCE_PREFIX).filter((sequence) => sequence.length).map((sequence) => constants.SEQUENCE_PREFIX + sequence);
        }
        return [];
      },
      addCSSRule: (rule) => {
        cssRules.add(rule);
      },
      addSequenceDetails: (classNamesForSlots, sourceURL) => {
        Object.entries(classNamesForSlots).forEach(([slotName, sequenceHash]) => {
          sequenceDetails[sequenceHash.substring(0, constants.SEQUENCE_SIZE)] = {
            slotName,
            sourceURL
          };
        });
      },
      getCSSRules: () => {
        return Array.from(cssRules);
      },
      getSequenceDetails: (sequenceHash) => {
        return sequenceDetails[sequenceHash];
      }
    };
    exports.debugData = debugData;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/utils.cjs.js
var require_utils_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/utils.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getDirectionalClassName(classes, direction) {
      return Array.isArray(classes) ? direction === "rtl" ? classes[1] : classes[0] : classes;
    }
    function getDebugClassNames(lookupItem, parentLookupItem, parentDebugClassNames, overridingSiblings) {
      const classesMapping = lookupItem[0];
      const direction = lookupItem[1];
      return Object.entries(classesMapping).map(([propertyHash, classes]) => {
        const className = getDirectionalClassName(classes, direction);
        let overriddenBy;
        if (parentDebugClassNames && parentLookupItem) {
          const matching = parentDebugClassNames.find(({
            className: parentClassName
          }) => parentClassName === className);
          if (!matching && parentLookupItem[0][propertyHash]) {
            overriddenBy = getDirectionalClassName(parentLookupItem[0][propertyHash], parentLookupItem[1]);
          } else if (matching && parentLookupItem[0][propertyHash]) {
            const siblingHasSameRule = overridingSiblings ? overridingSiblings.filter(({
              debugClassNames
            }) => debugClassNames.filter(({
              className: siblingClassName
            }) => siblingClassName === className).length > 0).length > 0 : false;
            overriddenBy = siblingHasSameRule ? matching.className : matching.overriddenBy;
          } else if (!matching && !parentLookupItem[0][propertyHash]) {
            overriddenBy = void 0;
          } else if (matching && !parentLookupItem[0][propertyHash]) {
            overriddenBy = void 0;
          }
        }
        return {
          className,
          overriddenBy
        };
      });
    }
    exports.getDebugClassNames = getDebugClassNames;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/getDebugTree.cjs.js
var require_getDebugTree_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/getDebugTree.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants = require_constants_cjs();
    var store = require_store_cjs();
    var utils = require_utils_cjs();
    function getDebugTree(debugSequenceHash, parentNode) {
      const lookupItem = constants.DEFINITION_LOOKUP_TABLE[debugSequenceHash];
      if (lookupItem === void 0) {
        return void 0;
      }
      const parentLookupItem = parentNode ? constants.DEFINITION_LOOKUP_TABLE[parentNode.sequenceHash] : void 0;
      const debugClassNames = utils.getDebugClassNames(lookupItem, parentLookupItem, parentNode === null || parentNode === void 0 ? void 0 : parentNode.debugClassNames, parentNode === null || parentNode === void 0 ? void 0 : parentNode.children);
      const node2 = {
        sequenceHash: debugSequenceHash,
        direction: lookupItem[1],
        children: [],
        debugClassNames
      };
      const childrenSequences = store.debugData.getChildrenSequences(node2.sequenceHash);
      childrenSequences.reverse().forEach((sequence) => {
        const child = getDebugTree(sequence, node2);
        if (child) {
          node2.children.push(child);
        }
      });
      if (!node2.children.length) {
        node2.rules = {};
        node2.debugClassNames.forEach(({
          className
        }) => {
          const mapData = store.debugData.getSequenceDetails(debugSequenceHash);
          if (mapData) {
            node2.slot = mapData.slotName;
            node2.sourceURL = mapData.sourceURL;
          }
          const cssRule = store.debugData.getCSSRules().find((cssRule2) => {
            return cssRule2.includes(className);
          });
          node2.rules[className] = cssRule;
        });
      }
      return node2;
    }
    exports.getDebugTree = getDebugTree;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/injectDevTools.cjs.js
var require_injectDevTools_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/injectDevTools.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants = require_constants_cjs();
    var getDebugTree = require_getDebugTree_cjs();
    function injectDevTools(document2) {
      const window2 = document2.defaultView;
      if (!window2 || window2.__GRIFFEL_DEVTOOLS__) {
        return;
      }
      const devtools = {
        getInfo: (element) => {
          const rootDebugSequenceHash = Array.from(element.classList).find((className) => className.startsWith(constants.SEQUENCE_PREFIX));
          if (rootDebugSequenceHash === void 0) {
            return void 0;
          }
          return getDebugTree.getDebugTree(rootDebugSequenceHash);
        }
      };
      Object.defineProperty(window2, "__GRIFFEL_DEVTOOLS__", {
        configurable: false,
        enumerable: false,
        get() {
          return devtools;
        }
      });
    }
    exports.injectDevTools = injectDevTools;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/isDevToolsEnabled.cjs.js
var require_isDevToolsEnabled_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/isDevToolsEnabled.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isDevToolsEnabled = /* @__PURE__ */ (() => {
      var _a;
      try {
        return Boolean(typeof window !== "undefined" && ((_a = window.sessionStorage) === null || _a === void 0 ? void 0 : _a.getItem("__GRIFFEL_DEVTOOLS__")));
      } catch (e) {
        return false;
      }
    })();
    exports.isDevToolsEnabled = isDevToolsEnabled;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/normalizeCSSBucketEntry.cjs.js
var require_normalizeCSSBucketEntry_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/normalizeCSSBucketEntry.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function normalizeCSSBucketEntry(entry) {
      if (!Array.isArray(entry)) {
        return [entry];
      }
      if (process.env.NODE_ENV !== "production" && entry.length > 2) {
        throw new Error("CSS Bucket contains an entry with greater than 2 items, please report this to https://github.com/microsoft/griffel/issues");
      }
      return entry;
    }
    exports.normalizeCSSBucketEntry = normalizeCSSBucketEntry;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/renderer/createIsomorphicStyleSheet.cjs.js
var require_createIsomorphicStyleSheet_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/renderer/createIsomorphicStyleSheet.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants = require_constants_cjs();
    function createIsomorphicStyleSheet(styleElement, bucketName, elementAttributes) {
      const __cssRulesForSSR = [];
      elementAttributes[constants.DATA_BUCKET_ATTR] = bucketName;
      if (styleElement) {
        for (const attrName in elementAttributes) {
          styleElement.setAttribute(attrName, elementAttributes[attrName]);
        }
      }
      function insertRule(rule) {
        if (styleElement === null || styleElement === void 0 ? void 0 : styleElement.sheet) {
          return styleElement.sheet.insertRule(rule, styleElement.sheet.cssRules.length);
        }
        return __cssRulesForSSR.push(rule);
      }
      return {
        elementAttributes,
        insertRule,
        element: styleElement,
        bucketName,
        cssRules() {
          if (styleElement === null || styleElement === void 0 ? void 0 : styleElement.sheet) {
            return Array.from(styleElement.sheet.cssRules).map((cssRule) => cssRule.cssText);
          }
          return __cssRulesForSSR;
        }
      };
    }
    function createIsomorphicStyleSheetFromElement(element) {
      const elementAttributes = Array.from(element.attributes).reduce((acc, attr) => {
        acc[attr.name] = attr.value;
        return acc;
      }, {});
      const stylesheet = createIsomorphicStyleSheet(element, elementAttributes[constants.DATA_BUCKET_ATTR], elementAttributes);
      return stylesheet;
    }
    exports.createIsomorphicStyleSheet = createIsomorphicStyleSheet;
    exports.createIsomorphicStyleSheetFromElement = createIsomorphicStyleSheetFromElement;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/renderer/getStyleSheetForBucket.cjs.js
var require_getStyleSheetForBucket_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/renderer/getStyleSheetForBucket.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants = require_constants_cjs();
    var createIsomorphicStyleSheet = require_createIsomorphicStyleSheet_cjs();
    var styleBucketOrdering = [
      // reset styles
      "r",
      // catch-all
      "d",
      // link
      "l",
      // visited
      "v",
      // focus-within
      "w",
      // focus
      "f",
      // focus-visible
      "i",
      // hover
      "h",
      // active
      "a",
      // keyframes
      "k",
      // at-rules
      "t",
      // @media rules
      "m"
    ];
    var styleBucketOrderingMap = /* @__PURE__ */ styleBucketOrdering.reduce((acc, cur, j) => {
      acc[cur] = j;
      return acc;
    }, {});
    function getStyleSheetForBucket(bucketName, target, renderer, metadata = {}) {
      const isMediaBucket = bucketName === "m";
      const stylesheetKey = isMediaBucket ? bucketName + metadata["m"] : bucketName;
      if (!renderer.stylesheets[stylesheetKey]) {
        const tag = target && target.createElement("style");
        const stylesheet = createIsomorphicStyleSheet.createIsomorphicStyleSheet(tag, bucketName, Object.assign(Object.assign({}, renderer.styleElementAttributes), isMediaBucket && {
          media: metadata["m"]
        }));
        renderer.stylesheets[stylesheetKey] = stylesheet;
        if (target && tag) {
          const elementSibling = findElementSibling(target, bucketName, renderer, metadata);
          target.head.insertBefore(tag, elementSibling);
        }
      }
      return renderer.stylesheets[stylesheetKey];
    }
    function findElementSibling(target, targetBucket, renderer, metadata) {
      const targetOrder = styleBucketOrderingMap[targetBucket];
      let comparer = (el) => targetOrder - styleBucketOrderingMap[el.getAttribute(constants.DATA_BUCKET_ATTR)];
      let styleElements = target.head.querySelectorAll(`[${constants.DATA_BUCKET_ATTR}]`);
      if (targetBucket === "m" && metadata) {
        const mediaElements = target.head.querySelectorAll(`[${constants.DATA_BUCKET_ATTR}="${targetBucket}"]`);
        if (mediaElements.length) {
          styleElements = mediaElements;
          comparer = (el) => renderer.compareMediaQueries(metadata["m"], el.media);
        }
      }
      for (const styleElement of styleElements) {
        if (comparer(styleElement) < 0) {
          return styleElement;
        }
      }
      return null;
    }
    exports.getStyleSheetForBucket = getStyleSheetForBucket;
    exports.styleBucketOrdering = styleBucketOrdering;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/renderer/createDOMRenderer.cjs.js
var require_createDOMRenderer_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/renderer/createDOMRenderer.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var injectDevTools = require_injectDevTools_cjs();
    var isDevToolsEnabled = require_isDevToolsEnabled_cjs();
    var store = require_store_cjs();
    var normalizeCSSBucketEntry = require_normalizeCSSBucketEntry_cjs();
    var getStyleSheetForBucket = require_getStyleSheetForBucket_cjs();
    var lastIndex = 0;
    var defaultCompareMediaQueries = (a, b) => a < b ? -1 : a > b ? 1 : 0;
    function createDOMRenderer(target = typeof document === "undefined" ? void 0 : document, options = {}) {
      const {
        unstable_filterCSSRule,
        styleElementAttributes,
        compareMediaQueries = defaultCompareMediaQueries
      } = options;
      const renderer = {
        insertionCache: {},
        stylesheets: {},
        styleElementAttributes: Object.freeze(styleElementAttributes),
        compareMediaQueries,
        id: `d${lastIndex++}`,
        insertCSSRules(cssRules) {
          for (const styleBucketName in cssRules) {
            const cssRulesForBucket = cssRules[styleBucketName];
            for (let i = 0, l = cssRulesForBucket.length; i < l; i++) {
              const [ruleCSS, metadata] = normalizeCSSBucketEntry.normalizeCSSBucketEntry(cssRulesForBucket[i]);
              const sheet = getStyleSheetForBucket.getStyleSheetForBucket(styleBucketName, target, renderer, metadata);
              if (renderer.insertionCache[ruleCSS]) {
                continue;
              }
              renderer.insertionCache[ruleCSS] = styleBucketName;
              if (process.env.NODE_ENV !== "production" && isDevToolsEnabled.isDevToolsEnabled) {
                store.debugData.addCSSRule(ruleCSS);
              }
              try {
                if (unstable_filterCSSRule) {
                  if (unstable_filterCSSRule(ruleCSS)) {
                    sheet.insertRule(ruleCSS);
                  }
                } else {
                  sheet.insertRule(ruleCSS);
                }
              } catch (e) {
                if (process.env.NODE_ENV !== "production" && !ignoreSuffixesRegex.test(ruleCSS)) {
                  console.error(`There was a problem inserting the following rule: "${ruleCSS}"`, e);
                }
              }
            }
          }
        }
      };
      if (target && process.env.NODE_ENV !== "production" && isDevToolsEnabled.isDevToolsEnabled) {
        injectDevTools.injectDevTools(target);
      }
      return renderer;
    }
    var ignoreSuffixes = /* @__PURE__ */ ["-moz-placeholder", "-moz-focus-inner", "-moz-focusring", "-ms-input-placeholder", "-moz-read-write", "-moz-read-only"].join("|");
    var ignoreSuffixesRegex = /* @__PURE__ */ new RegExp(`:(${ignoreSuffixes})`);
    exports.createDOMRenderer = createDOMRenderer;
    exports.defaultCompareMediaQueries = defaultCompareMediaQueries;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/renderer/rehydrateRendererCache.cjs.js
var require_rehydrateRendererCache_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/renderer/rehydrateRendererCache.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var createIsomorphicStyleSheet = require_createIsomorphicStyleSheet_cjs();
    require_constants_cjs();
    var store = require_store_cjs();
    var isDevToolsEnabled = require_isDevToolsEnabled_cjs();
    var KEYFRAMES_HYDRATOR = /@(-webkit-)?keyframes ([^{]+){((?:(?:from|to|(?:\d+\.?\d*%))\{(?:[^}])*})*)}/g;
    var AT_RULES_HYDRATOR = /@(media|supports|layer)[^{]+\{([\s\S]+?})\s*}/g;
    var STYLES_HYDRATOR = /\.([^{:]+)(:[^{]+)?{(?:[^}]*;)?([^}]*?)}/g;
    var regexps = {
      k: KEYFRAMES_HYDRATOR,
      t: AT_RULES_HYDRATOR,
      m: AT_RULES_HYDRATOR
    };
    function rehydrateRendererCache(renderer, target = typeof document === "undefined" ? void 0 : document) {
      if (target) {
        const styleElements = target.querySelectorAll("[data-make-styles-bucket]");
        styleElements.forEach((styleElement) => {
          const bucketName = styleElement.dataset["makeStylesBucket"];
          const regex = regexps[bucketName] || STYLES_HYDRATOR;
          const stylesheetKey = bucketName === "m" ? bucketName + styleElement.media : bucketName;
          if (!renderer.stylesheets[stylesheetKey]) {
            renderer.stylesheets[stylesheetKey] = createIsomorphicStyleSheet.createIsomorphicStyleSheetFromElement(styleElement);
          }
          let match2;
          while (match2 = regex.exec(styleElement.textContent)) {
            const [cssRule] = match2;
            renderer.insertionCache[cssRule] = bucketName;
            if (process.env.NODE_ENV !== "production" && isDevToolsEnabled.isDevToolsEnabled) {
              store.debugData.addCSSRule(cssRule);
            }
          }
        });
      }
    }
    exports.rehydrateRendererCache = rehydrateRendererCache;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/react-render-tracker/stackTrace.cjs.js
var require_stackTrace_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/react-render-tracker/stackTrace.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UNKNOWN_FUNCTION = "<unknown>";
    function parseStackTraceLine(line2) {
      return parseChrome(line2) || parseGecko(line2) || parseJSC(line2);
    }
    var chromeRe = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)?\)?\s*$/i;
    var chromeRe2 = /^\s*at ()((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/|[a-z]:\\|\\\\).*?)\s*$/i;
    var chromeEvalRe = /\((\S*)\)/;
    function parseChrome(line2) {
      const parts = chromeRe.exec(line2) || chromeRe2.exec(line2);
      if (!parts) {
        return null;
      }
      let loc = parts[2];
      const isNative = loc && loc.indexOf("native") === 0;
      const isEval = loc && loc.indexOf("eval") === 0;
      const submatch = chromeEvalRe.exec(loc);
      if (isEval && submatch != null) {
        loc = submatch[1];
      }
      return {
        loc: !isNative ? parts[2] : null,
        name: parts[1] || UNKNOWN_FUNCTION
      };
    }
    var geckoRe = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)\s*$/i;
    var geckoEvalRe = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    function parseGecko(line2) {
      const parts = geckoRe.exec(line2);
      if (!parts) {
        return null;
      }
      let loc = parts[3];
      const isEval = loc && loc.indexOf(" > eval") > -1;
      const submatch = geckoEvalRe.exec(loc);
      if (isEval && submatch != null) {
        loc = submatch[1];
      }
      return {
        loc: parts[3],
        name: parts[1] || UNKNOWN_FUNCTION
      };
    }
    var javaScriptCoreRe = /^\s*(?:([^@]*)(?:\((.*?)\))?@)?(\S.*?)\s*$/i;
    function parseJSC(line2) {
      const parts = javaScriptCoreRe.exec(line2);
      if (!parts) {
        return null;
      }
      return {
        loc: parts[3],
        name: parts[1] || UNKNOWN_FUNCTION
      };
    }
    exports.parseStackTraceLine = parseStackTraceLine;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/getSourceURLfromError.cjs.js
var require_getSourceURLfromError_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/devtools/getSourceURLfromError.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stackTrace = require_stackTrace_cjs();
    function getSourceURLfromError() {
      const stacks = String(new Error().stack).split("\n");
      const userMakeStyleCallLine = findUserMakeStyleCallInStacks(stacks);
      if (userMakeStyleCallLine === void 0) {
        return void 0;
      }
      const result = stackTrace.parseStackTraceLine(userMakeStyleCallLine);
      return result === null || result === void 0 ? void 0 : result.loc;
    }
    function findUserMakeStyleCallInStacks(stacks) {
      for (let i = stacks.length - 1; i >= 0; --i) {
        if (stacks[i].includes("at getSourceURLfromError")) {
          return stacks[i + 3];
        }
      }
      return void 0;
    }
    exports.getSourceURLfromError = getSourceURLfromError;
  }
});

// ../../node_modules/.pnpm/rtl-css-js@1.16.0/node_modules/rtl-css-js/dist/cjs/convert-17f6283d.js
var require_convert_17f6283d = __commonJS({
  "../../node_modules/.pnpm/rtl-css-js@1.16.0/node_modules/rtl-css-js/dist/cjs/convert-17f6283d.js"(exports) {
    "use strict";
    function arrayToObject(array) {
      return array.reduce(function(obj, _ref) {
        var prop1 = _ref[0], prop2 = _ref[1];
        obj[prop1] = prop2;
        obj[prop2] = prop1;
        return obj;
      }, {});
    }
    function isBoolean(val) {
      return typeof val === "boolean";
    }
    function isFunction(val) {
      return typeof val === "function";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isNullOrUndefined(val) {
      return val === null || typeof val === "undefined";
    }
    function isObject(val) {
      return val && typeof val === "object";
    }
    function isString(val) {
      return typeof val === "string";
    }
    function includes(inclusive, inclusee) {
      return inclusive.indexOf(inclusee) !== -1;
    }
    function flipSign(value) {
      if (parseFloat(value) === 0) {
        return value;
      }
      if (value[0] === "-") {
        return value.slice(1);
      }
      return "-" + value;
    }
    function flipTransformSign(match2, prefix2, offset, suffix) {
      return prefix2 + flipSign(offset) + suffix;
    }
    function calculateNewBackgroundPosition(value) {
      var idx = value.indexOf(".");
      if (idx === -1) {
        value = 100 - parseFloat(value) + "%";
      } else {
        var len = value.length - idx - 2;
        value = 100 - parseFloat(value);
        value = value.toFixed(len) + "%";
      }
      return value;
    }
    function getValuesAsList(value) {
      return value.replace(/ +/g, " ").split(" ").map(function(i) {
        return i.trim();
      }).filter(Boolean).reduce(function(_ref2, item) {
        var list = _ref2.list, state = _ref2.state;
        var openParansCount = (item.match(/\(/g) || []).length;
        var closedParansCount = (item.match(/\)/g) || []).length;
        if (state.parensDepth > 0) {
          list[list.length - 1] = list[list.length - 1] + " " + item;
        } else {
          list.push(item);
        }
        state.parensDepth += openParansCount - closedParansCount;
        return {
          list,
          state
        };
      }, {
        list: [],
        state: {
          parensDepth: 0
        }
      }).list;
    }
    function handleQuartetValues(value) {
      var splitValues = getValuesAsList(value);
      if (splitValues.length <= 3 || splitValues.length > 4) {
        return value;
      }
      var top = splitValues[0], right = splitValues[1], bottom = splitValues[2], left = splitValues[3];
      return [top, left, bottom, right].join(" ");
    }
    function canConvertValue(value) {
      return !isBoolean(value) && !isNullOrUndefined(value);
    }
    function splitShadow(value) {
      var shadows = [];
      var start = 0;
      var end = 0;
      var rgba = false;
      while (end < value.length) {
        if (!rgba && value[end] === ",") {
          shadows.push(value.substring(start, end).trim());
          end++;
          start = end;
        } else if (value[end] === "(") {
          rgba = true;
          end++;
        } else if (value[end] === ")") {
          rgba = false;
          end++;
        } else {
          end++;
        }
      }
      if (start != end) {
        shadows.push(value.substring(start, end + 1));
      }
      return shadows;
    }
    var propertyValueConverters = {
      padding: function padding(_ref) {
        var value = _ref.value;
        if (isNumber(value)) {
          return value;
        }
        return handleQuartetValues(value);
      },
      textShadow: function textShadow(_ref2) {
        var value = _ref2.value;
        var flippedShadows = splitShadow(value).map(function(shadow) {
          return shadow.replace(/(^|\s)(-*)([.|\d]+)/, function(match2, whiteSpace, negative, number) {
            if (number === "0") {
              return match2;
            }
            var doubleNegative = negative === "" ? "-" : "";
            return "" + whiteSpace + doubleNegative + number;
          });
        });
        return flippedShadows.join(",");
      },
      borderColor: function borderColor(_ref3) {
        var value = _ref3.value;
        return handleQuartetValues(value);
      },
      borderRadius: function borderRadius2(_ref4) {
        var value = _ref4.value;
        if (isNumber(value)) {
          return value;
        }
        if (includes(value, "/")) {
          var _value$split = value.split("/"), radius1 = _value$split[0], radius2 = _value$split[1];
          var convertedRadius1 = propertyValueConverters.borderRadius({
            value: radius1.trim()
          });
          var convertedRadius2 = propertyValueConverters.borderRadius({
            value: radius2.trim()
          });
          return convertedRadius1 + " / " + convertedRadius2;
        }
        var splitValues = getValuesAsList(value);
        switch (splitValues.length) {
          case 2: {
            return splitValues.reverse().join(" ");
          }
          case 4: {
            var topLeft = splitValues[0], topRight = splitValues[1], bottomRight = splitValues[2], bottomLeft = splitValues[3];
            return [topRight, topLeft, bottomLeft, bottomRight].join(" ");
          }
          default: {
            return value;
          }
        }
      },
      background: function background(_ref5) {
        var value = _ref5.value, valuesToConvert2 = _ref5.valuesToConvert, isRtl = _ref5.isRtl, bgImgDirectionRegex2 = _ref5.bgImgDirectionRegex, bgPosDirectionRegex2 = _ref5.bgPosDirectionRegex;
        if (isNumber(value)) {
          return value;
        }
        var backgroundPositionValue = value.replace(/(url\(.*?\))|(rgba?\(.*?\))|(hsl\(.*?\))|(#[a-fA-F0-9]+)|((^| )(\D)+( |$))/g, "").trim();
        value = value.replace(backgroundPositionValue, propertyValueConverters.backgroundPosition({
          value: backgroundPositionValue,
          valuesToConvert: valuesToConvert2,
          isRtl,
          bgPosDirectionRegex: bgPosDirectionRegex2
        }));
        return propertyValueConverters.backgroundImage({
          value,
          valuesToConvert: valuesToConvert2,
          bgImgDirectionRegex: bgImgDirectionRegex2
        });
      },
      backgroundImage: function backgroundImage(_ref6) {
        var value = _ref6.value, valuesToConvert2 = _ref6.valuesToConvert, bgImgDirectionRegex2 = _ref6.bgImgDirectionRegex;
        if (!includes(value, "url(") && !includes(value, "linear-gradient(")) {
          return value;
        }
        return value.replace(bgImgDirectionRegex2, function(match2, g1, group2) {
          return match2.replace(group2, valuesToConvert2[group2]);
        });
      },
      backgroundPosition: function backgroundPosition(_ref7) {
        var value = _ref7.value, valuesToConvert2 = _ref7.valuesToConvert, isRtl = _ref7.isRtl, bgPosDirectionRegex2 = _ref7.bgPosDirectionRegex;
        return value.replace(isRtl ? /^((-|\d|\.)+%)/ : null, function(match2, group) {
          return calculateNewBackgroundPosition(group);
        }).replace(bgPosDirectionRegex2, function(match2) {
          return valuesToConvert2[match2];
        });
      },
      backgroundPositionX: function backgroundPositionX(_ref8) {
        var value = _ref8.value, valuesToConvert2 = _ref8.valuesToConvert, isRtl = _ref8.isRtl, bgPosDirectionRegex2 = _ref8.bgPosDirectionRegex;
        if (isNumber(value)) {
          return value;
        }
        return propertyValueConverters.backgroundPosition({
          value,
          valuesToConvert: valuesToConvert2,
          isRtl,
          bgPosDirectionRegex: bgPosDirectionRegex2
        });
      },
      transition: function transition(_ref9) {
        var value = _ref9.value, propertiesToConvert2 = _ref9.propertiesToConvert;
        return value.split(/,\s*/g).map(function(transition2) {
          var values = transition2.split(" ");
          values[0] = propertiesToConvert2[values[0]] || values[0];
          return values.join(" ");
        }).join(", ");
      },
      transitionProperty: function transitionProperty(_ref10) {
        var value = _ref10.value, propertiesToConvert2 = _ref10.propertiesToConvert;
        return value.split(/,\s*/g).map(function(prop) {
          return propertiesToConvert2[prop] || prop;
        }).join(", ");
      },
      transform: function transform(_ref11) {
        var value = _ref11.value;
        var nonAsciiPattern = "[^\\u0020-\\u007e]";
        var escapePattern = "(?:(?:(?:\\[0-9a-f]{1,6})(?:\\r\\n|\\s)?)|\\\\[^\\r\\n\\f0-9a-f])";
        var signedQuantPattern = "((?:-?" + ("(?:[0-9]*\\.[0-9]+|[0-9]+)(?:\\s*(?:em|ex|px|cm|mm|in|pt|pc|deg|rad|grad|ms|s|hz|khz|%)|" + ("-?" + ("(?:[_a-z]|" + nonAsciiPattern + "|" + escapePattern + ")") + ("(?:[_a-z0-9-]|" + nonAsciiPattern + "|" + escapePattern + ")") + "*") + ")?") + ")|(?:inherit|auto))";
        var translateXRegExp = new RegExp("(translateX\\s*\\(\\s*)" + signedQuantPattern + "(\\s*\\))", "gi");
        var translateRegExp = new RegExp("(translate\\s*\\(\\s*)" + signedQuantPattern + "((?:\\s*,\\s*" + signedQuantPattern + "){0,1}\\s*\\))", "gi");
        var translate3dRegExp = new RegExp("(translate3d\\s*\\(\\s*)" + signedQuantPattern + "((?:\\s*,\\s*" + signedQuantPattern + "){0,2}\\s*\\))", "gi");
        var rotateRegExp = new RegExp("(rotate[ZY]?\\s*\\(\\s*)" + signedQuantPattern + "(\\s*\\))", "gi");
        return value.replace(translateXRegExp, flipTransformSign).replace(translateRegExp, flipTransformSign).replace(translate3dRegExp, flipTransformSign).replace(rotateRegExp, flipTransformSign);
      }
    };
    propertyValueConverters.objectPosition = propertyValueConverters.backgroundPosition;
    propertyValueConverters.margin = propertyValueConverters.padding;
    propertyValueConverters.borderWidth = propertyValueConverters.padding;
    propertyValueConverters.boxShadow = propertyValueConverters.textShadow;
    propertyValueConverters.webkitBoxShadow = propertyValueConverters.boxShadow;
    propertyValueConverters.mozBoxShadow = propertyValueConverters.boxShadow;
    propertyValueConverters.WebkitBoxShadow = propertyValueConverters.boxShadow;
    propertyValueConverters.MozBoxShadow = propertyValueConverters.boxShadow;
    propertyValueConverters.borderStyle = propertyValueConverters.borderColor;
    propertyValueConverters.webkitTransform = propertyValueConverters.transform;
    propertyValueConverters.mozTransform = propertyValueConverters.transform;
    propertyValueConverters.WebkitTransform = propertyValueConverters.transform;
    propertyValueConverters.MozTransform = propertyValueConverters.transform;
    propertyValueConverters.transformOrigin = propertyValueConverters.backgroundPosition;
    propertyValueConverters.webkitTransformOrigin = propertyValueConverters.transformOrigin;
    propertyValueConverters.mozTransformOrigin = propertyValueConverters.transformOrigin;
    propertyValueConverters.WebkitTransformOrigin = propertyValueConverters.transformOrigin;
    propertyValueConverters.MozTransformOrigin = propertyValueConverters.transformOrigin;
    propertyValueConverters.webkitTransition = propertyValueConverters.transition;
    propertyValueConverters.mozTransition = propertyValueConverters.transition;
    propertyValueConverters.WebkitTransition = propertyValueConverters.transition;
    propertyValueConverters.MozTransition = propertyValueConverters.transition;
    propertyValueConverters.webkitTransitionProperty = propertyValueConverters.transitionProperty;
    propertyValueConverters.mozTransitionProperty = propertyValueConverters.transitionProperty;
    propertyValueConverters.WebkitTransitionProperty = propertyValueConverters.transitionProperty;
    propertyValueConverters.MozTransitionProperty = propertyValueConverters.transitionProperty;
    propertyValueConverters["text-shadow"] = propertyValueConverters.textShadow;
    propertyValueConverters["border-color"] = propertyValueConverters.borderColor;
    propertyValueConverters["border-radius"] = propertyValueConverters.borderRadius;
    propertyValueConverters["background-image"] = propertyValueConverters.backgroundImage;
    propertyValueConverters["background-position"] = propertyValueConverters.backgroundPosition;
    propertyValueConverters["background-position-x"] = propertyValueConverters.backgroundPositionX;
    propertyValueConverters["object-position"] = propertyValueConverters.objectPosition;
    propertyValueConverters["border-width"] = propertyValueConverters.padding;
    propertyValueConverters["box-shadow"] = propertyValueConverters.textShadow;
    propertyValueConverters["-webkit-box-shadow"] = propertyValueConverters.textShadow;
    propertyValueConverters["-moz-box-shadow"] = propertyValueConverters.textShadow;
    propertyValueConverters["border-style"] = propertyValueConverters.borderColor;
    propertyValueConverters["-webkit-transform"] = propertyValueConverters.transform;
    propertyValueConverters["-moz-transform"] = propertyValueConverters.transform;
    propertyValueConverters["transform-origin"] = propertyValueConverters.transformOrigin;
    propertyValueConverters["-webkit-transform-origin"] = propertyValueConverters.transformOrigin;
    propertyValueConverters["-moz-transform-origin"] = propertyValueConverters.transformOrigin;
    propertyValueConverters["-webkit-transition"] = propertyValueConverters.transition;
    propertyValueConverters["-moz-transition"] = propertyValueConverters.transition;
    propertyValueConverters["transition-property"] = propertyValueConverters.transitionProperty;
    propertyValueConverters["-webkit-transition-property"] = propertyValueConverters.transitionProperty;
    propertyValueConverters["-moz-transition-property"] = propertyValueConverters.transitionProperty;
    var propertiesToConvert = arrayToObject([
      ["paddingLeft", "paddingRight"],
      ["marginLeft", "marginRight"],
      ["left", "right"],
      ["borderLeft", "borderRight"],
      ["borderLeftColor", "borderRightColor"],
      ["borderLeftStyle", "borderRightStyle"],
      ["borderLeftWidth", "borderRightWidth"],
      ["borderTopLeftRadius", "borderTopRightRadius"],
      ["borderBottomLeftRadius", "borderBottomRightRadius"],
      // kebab-case versions
      ["padding-left", "padding-right"],
      ["margin-left", "margin-right"],
      ["border-left", "border-right"],
      ["border-left-color", "border-right-color"],
      ["border-left-style", "border-right-style"],
      ["border-left-width", "border-right-width"],
      ["border-top-left-radius", "border-top-right-radius"],
      ["border-bottom-left-radius", "border-bottom-right-radius"]
    ]);
    var propsToIgnore = ["content"];
    var valuesToConvert = arrayToObject([["ltr", "rtl"], ["left", "right"], ["w-resize", "e-resize"], ["sw-resize", "se-resize"], ["nw-resize", "ne-resize"]]);
    var bgImgDirectionRegex = new RegExp("(^|\\W|_)((ltr)|(rtl)|(left)|(right))(\\W|_|$)", "g");
    var bgPosDirectionRegex = new RegExp("(left)|(right)");
    function convert(object) {
      return Object.keys(object).reduce(function(newObj, originalKey) {
        var originalValue = object[originalKey];
        if (isString(originalValue)) {
          originalValue = originalValue.trim();
        }
        if (includes(propsToIgnore, originalKey)) {
          newObj[originalKey] = originalValue;
          return newObj;
        }
        var _convertProperty = convertProperty(originalKey, originalValue), key = _convertProperty.key, value = _convertProperty.value;
        newObj[key] = value;
        return newObj;
      }, Array.isArray(object) ? [] : {});
    }
    function convertProperty(originalKey, originalValue) {
      var isNoFlip = /\/\*\s?@noflip\s?\*\//.test(originalValue);
      var key = isNoFlip ? originalKey : getPropertyDoppelganger(originalKey);
      var value = isNoFlip ? originalValue : getValueDoppelganger(key, originalValue);
      return {
        key,
        value
      };
    }
    function getPropertyDoppelganger(property) {
      return propertiesToConvert[property] || property;
    }
    function getValueDoppelganger(key, originalValue) {
      if (!canConvertValue(originalValue)) {
        return originalValue;
      }
      if (isObject(originalValue)) {
        return convert(originalValue);
      }
      var isNum = isNumber(originalValue);
      var isFunc = isFunction(originalValue);
      var importantlessValue = isNum || isFunc ? originalValue : originalValue.replace(/ !important.*?$/, "");
      var isImportant = !isNum && importantlessValue.length !== originalValue.length;
      var valueConverter = propertyValueConverters[key];
      var newValue;
      if (valueConverter) {
        newValue = valueConverter({
          value: importantlessValue,
          valuesToConvert,
          propertiesToConvert,
          isRtl: true,
          bgImgDirectionRegex,
          bgPosDirectionRegex
        });
      } else {
        newValue = valuesToConvert[importantlessValue] || importantlessValue;
      }
      if (isImportant) {
        return newValue + " !important";
      }
      return newValue;
    }
    exports.arrayToObject = arrayToObject;
    exports.calculateNewBackgroundPosition = calculateNewBackgroundPosition;
    exports.canConvertValue = canConvertValue;
    exports.convert = convert;
    exports.convertProperty = convertProperty;
    exports.flipSign = flipSign;
    exports.flipTransformSign = flipTransformSign;
    exports.getPropertyDoppelganger = getPropertyDoppelganger;
    exports.getValueDoppelganger = getValueDoppelganger;
    exports.getValuesAsList = getValuesAsList;
    exports.handleQuartetValues = handleQuartetValues;
    exports.includes = includes;
    exports.isBoolean = isBoolean;
    exports.isFunction = isFunction;
    exports.isNullOrUndefined = isNullOrUndefined;
    exports.isNumber = isNumber;
    exports.isObject = isObject;
    exports.isString = isString;
    exports.propertiesToConvert = propertiesToConvert;
    exports.propertyValueConverters = propertyValueConverters;
    exports.propsToIgnore = propsToIgnore;
    exports.splitShadow = splitShadow;
    exports.valuesToConvert = valuesToConvert;
  }
});

// ../../node_modules/.pnpm/rtl-css-js@1.16.0/node_modules/rtl-css-js/dist/cjs/core.js
var require_core = __commonJS({
  "../../node_modules/.pnpm/rtl-css-js@1.16.0/node_modules/rtl-css-js/dist/cjs/core.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var convert = require_convert_17f6283d();
    exports.arrayToObject = convert.arrayToObject;
    exports.calculateNewBackgroundPosition = convert.calculateNewBackgroundPosition;
    exports.calculateNewTranslate = convert.flipTransformSign;
    exports.canConvertValue = convert.canConvertValue;
    exports.convert = convert.convert;
    exports.convertProperty = convert.convertProperty;
    exports.flipSign = convert.flipSign;
    exports.flipTransformSign = convert.flipTransformSign;
    exports.getPropertyDoppelganger = convert.getPropertyDoppelganger;
    exports.getValueDoppelganger = convert.getValueDoppelganger;
    exports.getValuesAsList = convert.getValuesAsList;
    exports.handleQuartetValues = convert.handleQuartetValues;
    exports.includes = convert.includes;
    exports.isBoolean = convert.isBoolean;
    exports.isFunction = convert.isFunction;
    exports.isNullOrUndefined = convert.isNullOrUndefined;
    exports.isNumber = convert.isNumber;
    exports.isObject = convert.isObject;
    exports.isString = convert.isString;
    exports.propertiesToConvert = convert.propertiesToConvert;
    exports.propertyValueConverters = convert.propertyValueConverters;
    exports.propsToIgnore = convert.propsToIgnore;
    exports.splitShadow = convert.splitShadow;
    exports.valuesToConvert = convert.valuesToConvert;
  }
});

// ../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/dist/umd/stylis.js
var require_stylis = __commonJS({
  "../../node_modules/.pnpm/stylis@4.1.3/node_modules/stylis/dist/umd/stylis.js"(exports, module2) {
    (function(e, r) {
      typeof exports === "object" && typeof module2 !== "undefined" ? r(exports) : typeof define === "function" && define.amd ? define(["exports"], r) : (e = e || self, r(e.stylis = {}));
    })(exports, function(e) {
      "use strict";
      var r = "-ms-";
      var a = "-moz-";
      var c = "-webkit-";
      var t = "comm";
      var n = "rule";
      var s = "decl";
      var i = "@page";
      var u = "@media";
      var o = "@import";
      var f = "@charset";
      var l = "@viewport";
      var p = "@supports";
      var h = "@document";
      var v = "@namespace";
      var d = "@keyframes";
      var b = "@font-face";
      var w3 = "@counter-style";
      var m = "@font-feature-values";
      var g = Math.abs;
      var k = String.fromCharCode;
      var $ = Object.assign;
      function x(e2, r2) {
        return A(e2, 0) ^ 45 ? (((r2 << 2 ^ A(e2, 0)) << 2 ^ A(e2, 1)) << 2 ^ A(e2, 2)) << 2 ^ A(e2, 3) : 0;
      }
      function E(e2) {
        return e2.trim();
      }
      function y(e2, r2) {
        return (e2 = r2.exec(e2)) ? e2[0] : e2;
      }
      function T(e2, r2, a2) {
        return e2.replace(r2, a2);
      }
      function O(e2, r2) {
        return e2.indexOf(r2);
      }
      function A(e2, r2) {
        return e2.charCodeAt(r2) | 0;
      }
      function M(e2, r2, a2) {
        return e2.slice(r2, a2);
      }
      function C(e2) {
        return e2.length;
      }
      function S(e2) {
        return e2.length;
      }
      function R(e2, r2) {
        return r2.push(e2), e2;
      }
      function z(e2, r2) {
        return e2.map(r2).join("");
      }
      e.line = 1;
      e.column = 1;
      e.length = 0;
      e.position = 0;
      e.character = 0;
      e.characters = "";
      function N(r2, a2, c2, t2, n2, s2, i2) {
        return { value: r2, root: a2, parent: c2, type: t2, props: n2, children: s2, line: e.line, column: e.column, length: i2, return: "" };
      }
      function P(e2, r2) {
        return $(N("", null, null, "", null, null, 0), e2, { length: -e2.length }, r2);
      }
      function j() {
        return e.character;
      }
      function U() {
        e.character = e.position > 0 ? A(e.characters, --e.position) : 0;
        if (e.column--, e.character === 10)
          e.column = 1, e.line--;
        return e.character;
      }
      function _() {
        e.character = e.position < e.length ? A(e.characters, e.position++) : 0;
        if (e.column++, e.character === 10)
          e.column = 1, e.line++;
        return e.character;
      }
      function F() {
        return A(e.characters, e.position);
      }
      function I() {
        return e.position;
      }
      function L(r2, a2) {
        return M(e.characters, r2, a2);
      }
      function D(e2) {
        switch (e2) {
          case 0:
          case 9:
          case 10:
          case 13:
          case 32:
            return 5;
          case 33:
          case 43:
          case 44:
          case 47:
          case 62:
          case 64:
          case 126:
          case 59:
          case 123:
          case 125:
            return 4;
          case 58:
            return 3;
          case 34:
          case 39:
          case 40:
          case 91:
            return 2;
          case 41:
          case 93:
            return 1;
        }
        return 0;
      }
      function K(r2) {
        return e.line = e.column = 1, e.length = C(e.characters = r2), e.position = 0, [];
      }
      function V(r2) {
        return e.characters = "", r2;
      }
      function W(r2) {
        return E(L(e.position - 1, Z(r2 === 91 ? r2 + 2 : r2 === 40 ? r2 + 1 : r2)));
      }
      function Y(e2) {
        return V(G(K(e2)));
      }
      function B(r2) {
        while (e.character = F())
          if (e.character < 33)
            _();
          else
            break;
        return D(r2) > 2 || D(e.character) > 3 ? "" : " ";
      }
      function G(r2) {
        while (_())
          switch (D(e.character)) {
            case 0:
              R(J(e.position - 1), r2);
              break;
            case 2:
              R(W(e.character), r2);
              break;
            default:
              R(k(e.character), r2);
          }
        return r2;
      }
      function H(r2, a2) {
        while (--a2 && _())
          if (e.character < 48 || e.character > 102 || e.character > 57 && e.character < 65 || e.character > 70 && e.character < 97)
            break;
        return L(r2, I() + (a2 < 6 && F() == 32 && _() == 32));
      }
      function Z(r2) {
        while (_())
          switch (e.character) {
            case r2:
              return e.position;
            case 34:
            case 39:
              if (r2 !== 34 && r2 !== 39)
                Z(e.character);
              break;
            case 40:
              if (r2 === 41)
                Z(r2);
              break;
            case 92:
              _();
              break;
          }
        return e.position;
      }
      function q(r2, a2) {
        while (_())
          if (r2 + e.character === 47 + 10)
            break;
          else if (r2 + e.character === 42 + 42 && F() === 47)
            break;
        return "/*" + L(a2, e.position - 1) + "*" + k(r2 === 47 ? r2 : _());
      }
      function J(r2) {
        while (!D(F()))
          _();
        return L(r2, e.position);
      }
      function Q(e2) {
        return V(X("", null, null, null, [""], e2 = K(e2), 0, [0], e2));
      }
      function X(e2, r2, a2, c2, t2, n2, s2, i2, u2) {
        var o2 = 0;
        var f2 = 0;
        var l2 = s2;
        var p2 = 0;
        var h2 = 0;
        var v2 = 0;
        var d2 = 1;
        var b2 = 1;
        var w4 = 1;
        var m2 = 0;
        var g2 = "";
        var $2 = t2;
        var x2 = n2;
        var E2 = c2;
        var y2 = g2;
        while (b2)
          switch (v2 = m2, m2 = _()) {
            case 40:
              if (v2 != 108 && A(y2, l2 - 1) == 58) {
                if (O(y2 += T(W(m2), "&", "&\f"), "&\f") != -1)
                  w4 = -1;
                break;
              }
            case 34:
            case 39:
            case 91:
              y2 += W(m2);
              break;
            case 9:
            case 10:
            case 13:
            case 32:
              y2 += B(v2);
              break;
            case 92:
              y2 += H(I() - 1, 7);
              continue;
            case 47:
              switch (F()) {
                case 42:
                case 47:
                  R(re(q(_(), I()), r2, a2), u2);
                  break;
                default:
                  y2 += "/";
              }
              break;
            case 123 * d2:
              i2[o2++] = C(y2) * w4;
            case 125 * d2:
            case 59:
            case 0:
              switch (m2) {
                case 0:
                case 125:
                  b2 = 0;
                case 59 + f2:
                  if (h2 > 0 && C(y2) - l2)
                    R(h2 > 32 ? ae(y2 + ";", c2, a2, l2 - 1) : ae(T(y2, " ", "") + ";", c2, a2, l2 - 2), u2);
                  break;
                case 59:
                  y2 += ";";
                default:
                  R(E2 = ee(y2, r2, a2, o2, f2, t2, i2, g2, $2 = [], x2 = [], l2), n2);
                  if (m2 === 123)
                    if (f2 === 0)
                      X(y2, r2, E2, E2, $2, n2, l2, i2, x2);
                    else
                      switch (p2 === 99 && A(y2, 3) === 110 ? 100 : p2) {
                        case 100:
                        case 109:
                        case 115:
                          X(e2, E2, E2, c2 && R(ee(e2, E2, E2, 0, 0, t2, i2, g2, t2, $2 = [], l2), x2), t2, x2, l2, i2, c2 ? $2 : x2);
                          break;
                        default:
                          X(y2, E2, E2, E2, [""], x2, 0, i2, x2);
                      }
              }
              o2 = f2 = h2 = 0, d2 = w4 = 1, g2 = y2 = "", l2 = s2;
              break;
            case 58:
              l2 = 1 + C(y2), h2 = v2;
            default:
              if (d2 < 1) {
                if (m2 == 123)
                  --d2;
                else if (m2 == 125 && d2++ == 0 && U() == 125)
                  continue;
              }
              switch (y2 += k(m2), m2 * d2) {
                case 38:
                  w4 = f2 > 0 ? 1 : (y2 += "\f", -1);
                  break;
                case 44:
                  i2[o2++] = (C(y2) - 1) * w4, w4 = 1;
                  break;
                case 64:
                  if (F() === 45)
                    y2 += W(_());
                  p2 = F(), f2 = l2 = C(g2 = y2 += J(I())), m2++;
                  break;
                case 45:
                  if (v2 === 45 && C(y2) == 2)
                    d2 = 0;
              }
          }
        return n2;
      }
      function ee(e2, r2, a2, c2, t2, s2, i2, u2, o2, f2, l2) {
        var p2 = t2 - 1;
        var h2 = t2 === 0 ? s2 : [""];
        var v2 = S(h2);
        for (var d2 = 0, b2 = 0, w4 = 0; d2 < c2; ++d2)
          for (var m2 = 0, k2 = M(e2, p2 + 1, p2 = g(b2 = i2[d2])), $2 = e2; m2 < v2; ++m2)
            if ($2 = E(b2 > 0 ? h2[m2] + " " + k2 : T(k2, /&\f/g, h2[m2])))
              o2[w4++] = $2;
        return N(e2, r2, a2, t2 === 0 ? n : u2, o2, f2, l2);
      }
      function re(e2, r2, a2) {
        return N(e2, r2, a2, t, k(j()), M(e2, 2, -2), 0);
      }
      function ae(e2, r2, a2, c2) {
        return N(e2, r2, a2, s, M(e2, 0, c2), M(e2, c2 + 1, -1), c2);
      }
      function ce(e2, t2, n2) {
        switch (x(e2, t2)) {
          case 5103:
            return c + "print-" + e2 + e2;
          case 5737:
          case 4201:
          case 3177:
          case 3433:
          case 1641:
          case 4457:
          case 2921:
          case 5572:
          case 6356:
          case 5844:
          case 3191:
          case 6645:
          case 3005:
          case 6391:
          case 5879:
          case 5623:
          case 6135:
          case 4599:
          case 4855:
          case 4215:
          case 6389:
          case 5109:
          case 5365:
          case 5621:
          case 3829:
            return c + e2 + e2;
          case 4789:
            return a + e2 + e2;
          case 5349:
          case 4246:
          case 4810:
          case 6968:
          case 2756:
            return c + e2 + a + e2 + r + e2 + e2;
          case 5936:
            switch (A(e2, t2 + 11)) {
              case 114:
                return c + e2 + r + T(e2, /[svh]\w+-[tblr]{2}/, "tb") + e2;
              case 108:
                return c + e2 + r + T(e2, /[svh]\w+-[tblr]{2}/, "tb-rl") + e2;
              case 45:
                return c + e2 + r + T(e2, /[svh]\w+-[tblr]{2}/, "lr") + e2;
            }
          case 6828:
          case 4268:
          case 2903:
            return c + e2 + r + e2 + e2;
          case 6165:
            return c + e2 + r + "flex-" + e2 + e2;
          case 5187:
            return c + e2 + T(e2, /(\w+).+(:[^]+)/, c + "box-$1$2" + r + "flex-$1$2") + e2;
          case 5443:
            return c + e2 + r + "flex-item-" + T(e2, /flex-|-self/g, "") + (!y(e2, /flex-|baseline/) ? r + "grid-row-" + T(e2, /flex-|-self/g, "") : "") + e2;
          case 4675:
            return c + e2 + r + "flex-line-pack" + T(e2, /align-content|flex-|-self/g, "") + e2;
          case 5548:
            return c + e2 + r + T(e2, "shrink", "negative") + e2;
          case 5292:
            return c + e2 + r + T(e2, "basis", "preferred-size") + e2;
          case 6060:
            return c + "box-" + T(e2, "-grow", "") + c + e2 + r + T(e2, "grow", "positive") + e2;
          case 4554:
            return c + T(e2, /([^-])(transform)/g, "$1" + c + "$2") + e2;
          case 6187:
            return T(T(T(e2, /(zoom-|grab)/, c + "$1"), /(image-set)/, c + "$1"), e2, "") + e2;
          case 5495:
          case 3959:
            return T(e2, /(image-set\([^]*)/, c + "$1$`$1");
          case 4968:
            return T(T(e2, /(.+:)(flex-)?(.*)/, c + "box-pack:$3" + r + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + c + e2 + e2;
          case 4200:
            if (!y(e2, /flex-|baseline/))
              return r + "grid-column-align" + M(e2, t2) + e2;
            break;
          case 2592:
          case 3360:
            return r + T(e2, "template-", "") + e2;
          case 4384:
          case 3616:
            if (n2 && n2.some(function(e3, r2) {
              return t2 = r2, y(e3.props, /grid-\w+-end/);
            })) {
              return ~O(e2 + (n2 = n2[t2].value), "span") ? e2 : r + T(e2, "-start", "") + e2 + r + "grid-row-span:" + (~O(n2, "span") ? y(n2, /\d+/) : +y(n2, /\d+/) - +y(e2, /\d+/)) + ";";
            }
            return r + T(e2, "-start", "") + e2;
          case 4896:
          case 4128:
            return n2 && n2.some(function(e3) {
              return y(e3.props, /grid-\w+-start/);
            }) ? e2 : r + T(T(e2, "-end", "-span"), "span ", "") + e2;
          case 4095:
          case 3583:
          case 4068:
          case 2532:
            return T(e2, /(.+)-inline(.+)/, c + "$1$2") + e2;
          case 8116:
          case 7059:
          case 5753:
          case 5535:
          case 5445:
          case 5701:
          case 4933:
          case 4677:
          case 5533:
          case 5789:
          case 5021:
          case 4765:
            if (C(e2) - 1 - t2 > 6)
              switch (A(e2, t2 + 1)) {
                case 109:
                  if (A(e2, t2 + 4) !== 45)
                    break;
                case 102:
                  return T(e2, /(.+:)(.+)-([^]+)/, "$1" + c + "$2-$3$1" + a + (A(e2, t2 + 3) == 108 ? "$3" : "$2-$3")) + e2;
                case 115:
                  return ~O(e2, "stretch") ? ce(T(e2, "stretch", "fill-available"), t2, n2) + e2 : e2;
              }
            break;
          case 5152:
          case 5920:
            return T(e2, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(a2, c2, t3, n3, s2, i2, u2) {
              return r + c2 + ":" + t3 + u2 + (n3 ? r + c2 + "-span:" + (s2 ? i2 : +i2 - +t3) + u2 : "") + e2;
            });
          case 4949:
            if (A(e2, t2 + 6) === 121)
              return T(e2, ":", ":" + c) + e2;
            break;
          case 6444:
            switch (A(e2, A(e2, 14) === 45 ? 18 : 11)) {
              case 120:
                return T(e2, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + c + (A(e2, 14) === 45 ? "inline-" : "") + "box$3$1" + c + "$2$3$1" + r + "$2box$3") + e2;
              case 100:
                return T(e2, ":", ":" + r) + e2;
            }
            break;
          case 5719:
          case 2647:
          case 2135:
          case 3927:
          case 2391:
            return T(e2, "scroll-", "scroll-snap-") + e2;
        }
        return e2;
      }
      function te(e2, r2) {
        var a2 = "";
        var c2 = S(e2);
        for (var t2 = 0; t2 < c2; t2++)
          a2 += r2(e2[t2], t2, e2, r2) || "";
        return a2;
      }
      function ne(e2, r2, a2, c2) {
        switch (e2.type) {
          case o:
          case s:
            return e2.return = e2.return || e2.value;
          case t:
            return "";
          case d:
            return e2.return = e2.value + "{" + te(e2.children, c2) + "}";
          case n:
            e2.value = e2.props.join(",");
        }
        return C(a2 = te(e2.children, c2)) ? e2.return = e2.value + "{" + a2 + "}" : "";
      }
      function se(e2) {
        var r2 = S(e2);
        return function(a2, c2, t2, n2) {
          var s2 = "";
          for (var i2 = 0; i2 < r2; i2++)
            s2 += e2[i2](a2, c2, t2, n2) || "";
          return s2;
        };
      }
      function ie(e2) {
        return function(r2) {
          if (!r2.root) {
            if (r2 = r2.return)
              e2(r2);
          }
        };
      }
      function ue(e2, t2, i2, u2) {
        if (e2.length > -1) {
          if (!e2.return)
            switch (e2.type) {
              case s:
                e2.return = ce(e2.value, e2.length, i2);
                return;
              case d:
                return te([P(e2, { value: T(e2.value, "@", "@" + c) })], u2);
              case n:
                if (e2.length)
                  return z(e2.props, function(t3) {
                    switch (y(t3, /(::plac\w+|:read-\w+)/)) {
                      case ":read-only":
                      case ":read-write":
                        return te([P(e2, { props: [T(t3, /:(read-\w+)/, ":" + a + "$1")] })], u2);
                      case "::placeholder":
                        return te([P(e2, { props: [T(t3, /:(plac\w+)/, ":" + c + "input-$1")] }), P(e2, { props: [T(t3, /:(plac\w+)/, ":" + a + "$1")] }), P(e2, { props: [T(t3, /:(plac\w+)/, r + "input-$1")] })], u2);
                    }
                    return "";
                  });
            }
        }
      }
      function oe(e2) {
        switch (e2.type) {
          case n:
            e2.props = e2.props.map(function(r2) {
              return z(Y(r2), function(r3, a2, c2) {
                switch (A(r3, 0)) {
                  case 12:
                    return M(r3, 1, C(r3));
                  case 0:
                  case 40:
                  case 43:
                  case 62:
                  case 126:
                    return r3;
                  case 58:
                    if (c2[++a2] === "global")
                      c2[a2] = "", c2[++a2] = "\f" + M(c2[a2], a2 = 1, -1);
                  case 32:
                    return a2 === 1 ? "" : r3;
                  default:
                    switch (a2) {
                      case 0:
                        e2 = r3;
                        return S(c2) > 1 ? "" : r3;
                      case (a2 = S(c2) - 1):
                      case 2:
                        return a2 === 2 ? r3 + e2 + e2 : r3 + e2;
                      default:
                        return r3;
                    }
                }
              });
            });
        }
      }
      e.CHARSET = f;
      e.COMMENT = t;
      e.COUNTER_STYLE = w3;
      e.DECLARATION = s;
      e.DOCUMENT = h;
      e.FONT_FACE = b;
      e.FONT_FEATURE_VALUES = m;
      e.IMPORT = o;
      e.KEYFRAMES = d;
      e.MEDIA = u;
      e.MOZ = a;
      e.MS = r;
      e.NAMESPACE = v;
      e.PAGE = i;
      e.RULESET = n;
      e.SUPPORTS = p;
      e.VIEWPORT = l;
      e.WEBKIT = c;
      e.abs = g;
      e.alloc = K;
      e.append = R;
      e.assign = $;
      e.caret = I;
      e.char = j;
      e.charat = A;
      e.combine = z;
      e.comment = re;
      e.commenter = q;
      e.compile = Q;
      e.copy = P;
      e.dealloc = V;
      e.declaration = ae;
      e.delimit = W;
      e.delimiter = Z;
      e.escaping = H;
      e.from = k;
      e.hash = x;
      e.identifier = J;
      e.indexof = O;
      e.match = y;
      e.middleware = se;
      e.namespace = oe;
      e.next = _;
      e.node = N;
      e.parse = X;
      e.peek = F;
      e.prefix = ce;
      e.prefixer = ue;
      e.prev = U;
      e.replace = T;
      e.ruleset = ee;
      e.rulesheet = ie;
      e.serialize = te;
      e.sizeof = S;
      e.slice = L;
      e.stringify = ne;
      e.strlen = C;
      e.substr = M;
      e.token = D;
      e.tokenize = Y;
      e.tokenizer = G;
      e.trim = E;
      e.whitespace = B;
      Object.defineProperty(e, "__esModule", { value: true });
    });
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/stylis/globalPlugin.cjs.js
var require_globalPlugin_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/stylis/globalPlugin.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stylis = require_stylis();
    var globalPlugin = (element) => {
      switch (element.type) {
        case stylis.RULESET:
          if (typeof element.props === "string") {
            if (process.env.NODE_ENV !== "production") {
              throw new Error(`"element.props" has type "string" (${JSON.stringify(element.props, null, 2)}), it's not expected. Please report a bug if it happens.`);
            }
            return;
          }
          element.props = element.props.map((value) => {
            if (value.indexOf(":global(") === -1) {
              return value;
            }
            return stylis.tokenize(value).reduce((acc, value2, index, children) => {
              if (value2 === "") {
                return acc;
              }
              if (value2 === ":" && children[index + 1] === "global") {
                const selector = (
                  // An inner part of ":global()"
                  children[index + 2].slice(1, -1) + // A separator between selectors i.e. "body .class"
                  " "
                );
                acc.unshift(selector);
                children[index + 1] = "";
                children[index + 2] = "";
                return acc;
              }
              acc.push(value2);
              return acc;
            }, []).join("");
          });
      }
    };
    exports.globalPlugin = globalPlugin;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/hyphenateProperty.cjs.js
var require_hyphenateProperty_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/hyphenateProperty.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var uppercasePattern = /[A-Z]/g;
    var msPattern = /^ms-/;
    var cache = {};
    function toHyphenLower(match2) {
      return "-" + match2.toLowerCase();
    }
    function hyphenateProperty(name) {
      if (Object.prototype.hasOwnProperty.call(cache, name)) {
        return cache[name];
      }
      if (name.substr(0, 2) === "--") {
        return name;
      }
      const hName = name.replace(uppercasePattern, toHyphenLower);
      return cache[name] = msPattern.test(hName) ? "-" + hName : hName;
    }
    exports.hyphenateProperty = hyphenateProperty;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/normalizeNestedProperty.cjs.js
var require_normalizeNestedProperty_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/normalizeNestedProperty.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function normalizeNestedProperty(nestedProperty) {
      if (nestedProperty.charAt(0) === "&") {
        return nestedProperty.slice(1);
      }
      return nestedProperty;
    }
    exports.normalizeNestedProperty = normalizeNestedProperty;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/compileCSS.cjs.js
var require_compileCSS_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/compileCSS.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stylis = require_stylis();
    var globalPlugin = require_globalPlugin_cjs();
    var hyphenateProperty = require_hyphenateProperty_cjs();
    var normalizeNestedProperty = require_normalizeNestedProperty_cjs();
    var PSEUDO_SELECTOR_REGEX = /,( *[^ &])/g;
    function normalizePseudoSelector(pseudoSelector) {
      return "&" + normalizeNestedProperty.normalizeNestedProperty(
        // Regex there replaces a comma, spaces and an ampersand if it's present with comma and an ampersand.
        // This allows to normalize input, see examples in JSDoc.
        pseudoSelector.replace(PSEUDO_SELECTOR_REGEX, ",&$1")
      );
    }
    function compileCSSRules(cssRules) {
      const rules = [];
      stylis.serialize(stylis.compile(cssRules), stylis.middleware([
        globalPlugin.globalPlugin,
        stylis.prefixer,
        stylis.stringify,
        // 💡 we are using `.insertRule()` API for DOM operations, which does not support
        // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
        // individual rules to be used with this API
        stylis.rulesheet((rule) => rules.push(rule))
      ]));
      return rules;
    }
    function createCSSRule(classNameSelector, cssDeclaration, pseudos) {
      let cssRule = cssDeclaration;
      if (pseudos.length > 0) {
        cssRule = pseudos.reduceRight((acc, selector) => {
          return `${normalizePseudoSelector(selector)} { ${acc} }`;
        }, cssDeclaration);
      }
      return `${classNameSelector}{${cssRule}}`;
    }
    function compileCSS(options) {
      const {
        className,
        media,
        layer,
        selectors,
        support,
        property,
        rtlClassName,
        rtlProperty,
        rtlValue,
        value
      } = options;
      const classNameSelector = `.${className}`;
      const cssDeclaration = Array.isArray(value) ? `${value.map((v) => `${hyphenateProperty.hyphenateProperty(property)}: ${v}`).join(";")};` : `${hyphenateProperty.hyphenateProperty(property)}: ${value};`;
      let cssRule = createCSSRule(classNameSelector, cssDeclaration, selectors);
      if (rtlProperty && rtlClassName) {
        const rtlClassNameSelector = `.${rtlClassName}`;
        const rtlCSSDeclaration = Array.isArray(rtlValue) ? `${rtlValue.map((v) => `${hyphenateProperty.hyphenateProperty(rtlProperty)}: ${v}`).join(";")};` : `${hyphenateProperty.hyphenateProperty(rtlProperty)}: ${rtlValue};`;
        cssRule += createCSSRule(rtlClassNameSelector, rtlCSSDeclaration, selectors);
      }
      if (media) {
        cssRule = `@media ${media} { ${cssRule} }`;
      }
      if (layer) {
        cssRule = `@layer ${layer} { ${cssRule} }`;
      }
      if (support) {
        cssRule = `@supports ${support} { ${cssRule} }`;
      }
      return compileCSSRules(cssRule);
    }
    exports.compileCSS = compileCSS;
    exports.compileCSSRules = compileCSSRules;
    exports.normalizePseudoSelector = normalizePseudoSelector;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/cssifyObject.cjs.js
var require_cssifyObject_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/cssifyObject.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hyphenateProperty = require_hyphenateProperty_cjs();
    function cssifyObject(style) {
      let css2 = "";
      for (const property in style) {
        const value = style[property];
        if (typeof value !== "string" && typeof value !== "number") {
          continue;
        }
        css2 += hyphenateProperty.hyphenateProperty(property) + ":" + value + ";";
      }
      return css2;
    }
    exports.cssifyObject = cssifyObject;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/compileKeyframeCSS.cjs.js
var require_compileKeyframeCSS_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/compileKeyframeCSS.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stylis = require_stylis();
    var cssifyObject = require_cssifyObject_cjs();
    function compileKeyframeRule(keyframeObject) {
      let css2 = "";
      for (const percentage in keyframeObject) {
        css2 += `${percentage}{${cssifyObject.cssifyObject(keyframeObject[percentage])}}`;
      }
      return css2;
    }
    function compileKeyframesCSS(keyframeName, keyframeCSS) {
      const cssRule = `@keyframes ${keyframeName} {${keyframeCSS}}`;
      const rules = [];
      stylis.serialize(stylis.compile(cssRule), stylis.middleware([
        stylis.prefixer,
        stylis.stringify,
        // 💡 we are using `.insertRule()` API for DOM operations, which does not support
        // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
        // individual rules to be used with this API
        stylis.rulesheet((rule) => rules.push(rule))
      ]));
      return rules;
    }
    exports.compileKeyframeRule = compileKeyframeRule;
    exports.compileKeyframesCSS = compileKeyframesCSS;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/generateCombinedMediaQuery.cjs.js
var require_generateCombinedMediaQuery_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/generateCombinedMediaQuery.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function generateCombinedQuery(currentMediaQuery, nestedMediaQuery) {
      if (currentMediaQuery.length === 0) {
        return nestedMediaQuery;
      }
      return `${currentMediaQuery} and ${nestedMediaQuery}`;
    }
    exports.generateCombinedQuery = generateCombinedQuery;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/isMediaQuerySelector.cjs.js
var require_isMediaQuerySelector_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/isMediaQuerySelector.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isMediaQuerySelector(property) {
      return property.substr(0, 6) === "@media";
    }
    exports.isMediaQuerySelector = isMediaQuerySelector;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/isLayerSelector.cjs.js
var require_isLayerSelector_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/isLayerSelector.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isLayerSelector(property) {
      return property.substr(0, 6) === "@layer";
    }
    exports.isLayerSelector = isLayerSelector;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/isNestedSelector.cjs.js
var require_isNestedSelector_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/isNestedSelector.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var regex = /^(:|\[|>|&)/;
    function isNestedSelector(property) {
      return regex.test(property);
    }
    exports.isNestedSelector = isNestedSelector;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/isSupportQuerySelector.cjs.js
var require_isSupportQuerySelector_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/isSupportQuerySelector.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isSupportQuerySelector(property) {
      return property.substr(0, 9) === "@supports";
    }
    exports.isSupportQuerySelector = isSupportQuerySelector;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/isObject.cjs.js
var require_isObject_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/isObject.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isObject(val) {
      return val != null && typeof val === "object" && Array.isArray(val) === false;
    }
    exports.isObject = isObject;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/getStyleBucketName.cjs.js
var require_getStyleBucketName_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/getStyleBucketName.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var pseudosMap = {
      // :focus-within
      "us-w": "w",
      // :focus-visible
      "us-v": "i",
      // :link
      nk: "l",
      // :visited
      si: "v",
      // :focus
      cu: "f",
      // :hover
      ve: "h",
      // :active
      ti: "a"
    };
    function getStyleBucketName(selectors, layer, media, support) {
      if (media) {
        return "m";
      }
      if (layer || support) {
        return "t";
      }
      if (selectors.length > 0) {
        const normalizedPseudo = selectors[0].trim();
        if (normalizedPseudo.charCodeAt(0) === 58) {
          return pseudosMap[normalizedPseudo.slice(4, 8)] || pseudosMap[normalizedPseudo.slice(3, 5)] || "d";
        }
      }
      return "d";
    }
    exports.getStyleBucketName = getStyleBucketName;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/hashClassName.cjs.js
var require_hashClassName_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/hashClassName.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hashString = require_hash_cjs();
    var constants = require_constants_cjs();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var hashString__default = /* @__PURE__ */ _interopDefaultLegacy(hashString);
    function hashClassName({
      media,
      layer,
      property,
      selectors,
      support,
      value
    }) {
      const classNameHash = hashString__default["default"](selectors.join("") + media + layer + support + property + value.trim());
      return constants.HASH_PREFIX + classNameHash;
    }
    exports.hashClassName = hashClassName;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/hashPropertyKey.cjs.js
var require_hashPropertyKey_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/utils/hashPropertyKey.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hashString = require_hash_cjs();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var hashString__default = /* @__PURE__ */ _interopDefaultLegacy(hashString);
    function hashPropertyKey(selectors, media, support, property) {
      const computedKey = selectors.join("") + media + support + property;
      const hashedKey = hashString__default["default"](computedKey);
      const firstCharCode = hashedKey.charCodeAt(0);
      const startsWithNumber = firstCharCode >= 48 && firstCharCode <= 57;
      if (startsWithNumber) {
        return String.fromCharCode(firstCharCode + 17) + hashedKey.substr(1);
      }
      return hashedKey;
    }
    exports.hashPropertyKey = hashPropertyKey;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/resolveStyleRules.cjs.js
var require_resolveStyleRules_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/resolveStyleRules.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hashString = require_hash_cjs();
    var core = require_core();
    var constants = require_constants_cjs();
    var compileCSS = require_compileCSS_cjs();
    var compileKeyframeCSS = require_compileKeyframeCSS_cjs();
    var generateCombinedMediaQuery = require_generateCombinedMediaQuery_cjs();
    var isMediaQuerySelector = require_isMediaQuerySelector_cjs();
    var isLayerSelector = require_isLayerSelector_cjs();
    var isNestedSelector = require_isNestedSelector_cjs();
    var isSupportQuerySelector = require_isSupportQuerySelector_cjs();
    var normalizeNestedProperty = require_normalizeNestedProperty_cjs();
    var isObject = require_isObject_cjs();
    var getStyleBucketName = require_getStyleBucketName_cjs();
    var hashClassName = require_hashClassName_cjs();
    var hashPropertyKey = require_hashPropertyKey_cjs();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var hashString__default = /* @__PURE__ */ _interopDefaultLegacy(hashString);
    function pushToClassesMap(classesMap, propertyKey, ltrClassname, rtlClassname) {
      classesMap[propertyKey] = rtlClassname ? [ltrClassname, rtlClassname] : ltrClassname;
    }
    function createBucketEntry(cssRule, metadata) {
      if (metadata) {
        return [cssRule, metadata];
      }
      return cssRule;
    }
    function pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, media) {
      var _a;
      let metadata;
      if (styleBucketName === "m" && media) {
        metadata = {
          m: media
        };
      }
      (_a = cssRulesByBucket[styleBucketName]) !== null && _a !== void 0 ? _a : cssRulesByBucket[styleBucketName] = [];
      if (ltrCSS) {
        cssRulesByBucket[styleBucketName].push(createBucketEntry(ltrCSS, metadata));
      }
      if (rtlCSS) {
        cssRulesByBucket[styleBucketName].push(createBucketEntry(rtlCSS, metadata));
      }
    }
    function resolveStyleRules(styles, selectors = [], media = "", layer = "", support = "", cssClassesMap = {}, cssRulesByBucket = {}, rtlValue) {
      for (const property in styles) {
        if (constants.UNSUPPORTED_CSS_PROPERTIES.hasOwnProperty(property)) {
          if (process.env.NODE_ENV !== "production") {
            console.error([`@griffel/react: You are using unsupported shorthand CSS property "${property}". Please check your "makeStyles" calls, there *should not* be following:`, " ".repeat(2) + `makeStyles({`, " ".repeat(4) + `[slot]: { ${property}: "${styles[property]}" }`, " ".repeat(2) + `})`, "", "Learn why CSS shorthands are not supported: https://aka.ms/griffel-css-shorthands"].join("\n"));
          }
          continue;
        }
        const value = styles[property];
        if (value == null) {
          continue;
        }
        if (typeof value === "string" || typeof value === "number") {
          const key = hashPropertyKey.hashPropertyKey(selectors, media, support, property);
          const className = hashClassName.hashClassName({
            media,
            layer,
            value: value.toString(),
            support,
            selectors,
            property
          });
          const rtlDefinition = rtlValue && {
            key: property,
            value: rtlValue
          } || core.convertProperty(property, value);
          const flippedInRtl = rtlDefinition.key !== property || rtlDefinition.value !== value;
          const rtlClassName = flippedInRtl ? hashClassName.hashClassName({
            value: rtlDefinition.value.toString(),
            property: rtlDefinition.key,
            selectors,
            media,
            layer,
            support
          }) : void 0;
          const rtlCompileOptions = flippedInRtl ? {
            rtlClassName,
            rtlProperty: rtlDefinition.key,
            rtlValue: rtlDefinition.value
          } : void 0;
          const styleBucketName = getStyleBucketName.getStyleBucketName(selectors, layer, media, support);
          const [ltrCSS, rtlCSS] = compileCSS.compileCSS(Object.assign({
            className,
            media,
            layer,
            selectors,
            property,
            support,
            value
          }, rtlCompileOptions));
          pushToClassesMap(cssClassesMap, key, className, rtlClassName);
          pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, media);
        } else if (property === "animationName") {
          const animationNameValue = Array.isArray(value) ? value : [value];
          const animationNames = [];
          const rtlAnimationNames = [];
          for (const keyframeObject of animationNameValue) {
            const keyframeCSS = compileKeyframeCSS.compileKeyframeRule(keyframeObject);
            const rtlKeyframeCSS = compileKeyframeCSS.compileKeyframeRule(core.convert(keyframeObject));
            const animationName = constants.HASH_PREFIX + hashString__default["default"](keyframeCSS);
            let rtlAnimationName;
            const keyframeRules = compileKeyframeCSS.compileKeyframesCSS(animationName, keyframeCSS);
            let rtlKeyframeRules = [];
            if (keyframeCSS === rtlKeyframeCSS) {
              rtlAnimationName = animationName;
            } else {
              rtlAnimationName = constants.HASH_PREFIX + hashString__default["default"](rtlKeyframeCSS);
              rtlKeyframeRules = compileKeyframeCSS.compileKeyframesCSS(rtlAnimationName, rtlKeyframeCSS);
            }
            for (let i = 0; i < keyframeRules.length; i++) {
              pushToCSSRules(
                cssRulesByBucket,
                // keyframes styles should be inserted into own bucket
                "k",
                keyframeRules[i],
                rtlKeyframeRules[i],
                media
              );
            }
            animationNames.push(animationName);
            rtlAnimationNames.push(rtlAnimationName);
          }
          resolveStyleRules({
            animationName: animationNames.join(", ")
          }, selectors, media, layer, support, cssClassesMap, cssRulesByBucket, rtlAnimationNames.join(", "));
        } else if (Array.isArray(value)) {
          if (value.length === 0) {
            if (process.env.NODE_ENV !== "production") {
              console.warn(`makeStyles(): An empty array was passed as input to "${property}", the property will be omitted in the styles.`);
            }
            continue;
          }
          const key = hashPropertyKey.hashPropertyKey(selectors, media, support, property);
          const className = hashClassName.hashClassName({
            media,
            layer,
            value: value.map((v) => (v !== null && v !== void 0 ? v : "").toString()).join(";"),
            support,
            selectors,
            property
          });
          const rtlDefinitions = value.map((v) => core.convertProperty(property, v));
          const rtlPropertyConsistent = !rtlDefinitions.some((v) => v.key !== rtlDefinitions[0].key);
          if (!rtlPropertyConsistent) {
            if (process.env.NODE_ENV !== "production") {
              console.error("makeStyles(): mixing CSS fallback values which result in multiple CSS properties in RTL is not supported.");
            }
            continue;
          }
          const flippedInRtl = rtlDefinitions[0].key !== property || rtlDefinitions.some((v, i) => v.value !== value[i]);
          const rtlClassName = flippedInRtl ? hashClassName.hashClassName({
            value: rtlDefinitions.map((v) => {
              var _a;
              return ((_a = v === null || v === void 0 ? void 0 : v.value) !== null && _a !== void 0 ? _a : "").toString();
            }).join(";"),
            property: rtlDefinitions[0].key,
            selectors,
            layer,
            media,
            support
          }) : void 0;
          const rtlCompileOptions = flippedInRtl ? {
            rtlClassName,
            rtlProperty: rtlDefinitions[0].key,
            rtlValue: rtlDefinitions.map((d) => d.value)
          } : void 0;
          const styleBucketName = getStyleBucketName.getStyleBucketName(selectors, layer, media, support);
          const [ltrCSS, rtlCSS] = compileCSS.compileCSS(Object.assign({
            className,
            media,
            layer,
            selectors,
            property,
            support,
            value
          }, rtlCompileOptions));
          pushToClassesMap(cssClassesMap, key, className, rtlClassName);
          pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, media);
        } else if (isObject.isObject(value)) {
          if (isNestedSelector.isNestedSelector(property)) {
            resolveStyleRules(value, selectors.concat(normalizeNestedProperty.normalizeNestedProperty(property)), media, layer, support, cssClassesMap, cssRulesByBucket);
          } else if (isMediaQuerySelector.isMediaQuerySelector(property)) {
            const combinedMediaQuery = generateCombinedMediaQuery.generateCombinedQuery(media, property.slice(6).trim());
            resolveStyleRules(value, selectors, combinedMediaQuery, layer, support, cssClassesMap, cssRulesByBucket);
          } else if (isLayerSelector.isLayerSelector(property)) {
            const combinedLayerQuery = (layer ? `${layer}.` : "") + property.slice(6).trim();
            resolveStyleRules(value, selectors, media, combinedLayerQuery, support, cssClassesMap, cssRulesByBucket);
          } else if (isSupportQuerySelector.isSupportQuerySelector(property)) {
            const combinedSupportQuery = generateCombinedMediaQuery.generateCombinedQuery(support, property.slice(9).trim());
            resolveStyleRules(value, selectors, media, layer, combinedSupportQuery, cssClassesMap, cssRulesByBucket);
          } else {
            if (process.env.NODE_ENV !== "production") {
              console.error(`Please fix the unresolved style rule: 
 ${property} 
 ${JSON.stringify(value, null, 2)}"`);
            }
          }
        }
      }
      return [cssClassesMap, cssRulesByBucket];
    }
    exports.resolveStyleRules = resolveStyleRules;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/resolveStyleRulesForSlots.cjs.js
var require_resolveStyleRulesForSlots_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/resolveStyleRulesForSlots.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var resolveStyleRules = require_resolveStyleRules_cjs();
    function resolveStyleRulesForSlots(stylesBySlots) {
      const classesMapBySlot = {};
      const cssRules = {};
      for (const slotName in stylesBySlots) {
        const slotStyles = stylesBySlots[slotName];
        const [cssClassMap, cssRulesByBucket] = resolveStyleRules.resolveStyleRules(slotStyles);
        classesMapBySlot[slotName] = cssClassMap;
        Object.keys(cssRulesByBucket).forEach((styleBucketName) => {
          cssRules[styleBucketName] = (cssRules[styleBucketName] || []).concat(cssRulesByBucket[styleBucketName]);
        });
      }
      return [classesMapBySlot, cssRules];
    }
    exports.resolveStyleRulesForSlots = resolveStyleRulesForSlots;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/makeStyles.cjs.js
var require_makeStyles_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/makeStyles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require_constants_cjs();
    var store = require_store_cjs();
    var isDevToolsEnabled = require_isDevToolsEnabled_cjs();
    var getSourceURLfromError = require_getSourceURLfromError_cjs();
    var resolveStyleRulesForSlots = require_resolveStyleRulesForSlots_cjs();
    var reduceToClassNameForSlots = require_reduceToClassNameForSlots_cjs();
    function makeStyles(stylesBySlots) {
      const insertionCache = {};
      let classesMapBySlot = null;
      let cssRules = null;
      let ltrClassNamesForSlots = null;
      let rtlClassNamesForSlots = null;
      let sourceURL;
      if (process.env.NODE_ENV !== "production" && isDevToolsEnabled.isDevToolsEnabled) {
        sourceURL = getSourceURLfromError.getSourceURLfromError();
      }
      function computeClasses(options) {
        const {
          dir,
          renderer
        } = options;
        if (classesMapBySlot === null) {
          [classesMapBySlot, cssRules] = resolveStyleRulesForSlots.resolveStyleRulesForSlots(stylesBySlots);
        }
        const isLTR = dir === "ltr";
        const rendererId = isLTR ? renderer.id : renderer.id + "r";
        if (isLTR) {
          if (ltrClassNamesForSlots === null) {
            ltrClassNamesForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots(classesMapBySlot, dir);
          }
        } else {
          if (rtlClassNamesForSlots === null) {
            rtlClassNamesForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots(classesMapBySlot, dir);
          }
        }
        if (insertionCache[rendererId] === void 0) {
          renderer.insertCSSRules(cssRules);
          insertionCache[rendererId] = true;
        }
        const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;
        if (process.env.NODE_ENV !== "production" && isDevToolsEnabled.isDevToolsEnabled) {
          store.debugData.addSequenceDetails(classNamesForSlots, sourceURL);
        }
        return classNamesForSlots;
      }
      return computeClasses;
    }
    exports.makeStyles = makeStyles;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/compileStaticCSS.cjs.js
var require_compileStaticCSS_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/compileStaticCSS.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var compileCSS = require_compileCSS_cjs();
    var cssifyObject = require_cssifyObject_cjs();
    function compileStaticCSS(property, value) {
      const cssRule = `${property} {${cssifyObject.cssifyObject(value)}}`;
      return compileCSS.compileCSSRules(cssRule)[0];
    }
    exports.compileStaticCSS = compileStaticCSS;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/resolveStaticStyleRules.cjs.js
var require_resolveStaticStyleRules_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/resolveStaticStyleRules.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var compileStaticCSS = require_compileStaticCSS_cjs();
    var compileCSS = require_compileCSS_cjs();
    function resolveStaticStyleRules(styles, result = {}) {
      if (typeof styles === "string") {
        const cssRules = compileCSS.compileCSSRules(styles);
        for (const rule of cssRules) {
          addResolvedStyles(rule, result);
        }
      } else {
        for (const property in styles) {
          const value = styles[property];
          const staticCSS = compileStaticCSS.compileStaticCSS(property, value);
          addResolvedStyles(staticCSS, result);
        }
      }
      return result;
    }
    function addResolvedStyles(cssRule, result = {}) {
      result.d = result.d || [];
      result.d.push(cssRule);
    }
    exports.resolveStaticStyleRules = resolveStaticStyleRules;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/makeStaticStyles.cjs.js
var require_makeStaticStyles_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/makeStaticStyles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var resolveStaticStyleRules = require_resolveStaticStyleRules_cjs();
    function makeStaticStyles(styles) {
      const styleCache = {};
      const stylesSet = Array.isArray(styles) ? styles : [styles];
      function useStaticStyles(options) {
        const cacheKey = options.renderer.id;
        if (styleCache[cacheKey]) {
          return;
        }
        for (const styleRules of stylesSet) {
          options.renderer.insertCSSRules(resolveStaticStyleRules.resolveStaticStyleRules(styleRules));
        }
        styleCache[cacheKey] = true;
      }
      return useStaticStyles;
    }
    exports.makeStaticStyles = makeStaticStyles;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/resolveResetStyleRules.cjs.js
var require_resolveResetStyleRules_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/runtime/resolveResetStyleRules.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hashString = require_hash_cjs();
    var core = require_core();
    var constants = require_constants_cjs();
    var isMediaQuerySelector = require_isMediaQuerySelector_cjs();
    var isLayerSelector = require_isLayerSelector_cjs();
    var isNestedSelector = require_isNestedSelector_cjs();
    var isSupportQuerySelector = require_isSupportQuerySelector_cjs();
    var isObject = require_isObject_cjs();
    var hyphenateProperty = require_hyphenateProperty_cjs();
    var compileCSS = require_compileCSS_cjs();
    var compileKeyframeCSS = require_compileKeyframeCSS_cjs();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var hashString__default = /* @__PURE__ */ _interopDefaultLegacy(hashString);
    function createStringFromStyles(styles) {
      let ltrCSS = "";
      let rtlCSS = "";
      for (const property in styles) {
        const value = styles[property];
        if (value == null) {
          continue;
        }
        if (typeof value === "string" || typeof value === "number") {
          const {
            key: rtlProperty,
            value: rtlValue
          } = core.convertProperty(property, value);
          ltrCSS += `${hyphenateProperty.hyphenateProperty(property)}:${value};`;
          rtlCSS += `${hyphenateProperty.hyphenateProperty(rtlProperty)}:${rtlValue};`;
          continue;
        }
        if (property === "animationName" && typeof value === "object") {
          const values = Array.isArray(value) ? value : [value];
          const ltrAnimationNames = [];
          const rtlAnimationNames = [];
          for (const keyframeObject of values) {
            const ltrKeyframeRule = compileKeyframeCSS.compileKeyframeRule(keyframeObject);
            const rtlKeyframeRule = compileKeyframeCSS.compileKeyframeRule(core.convert(keyframeObject));
            const ltrAnimationName = constants.RESET_HASH_PREFIX + hashString__default["default"](ltrKeyframeRule);
            const rtlAnimationName = constants.RESET_HASH_PREFIX + hashString__default["default"](rtlKeyframeRule);
            ltrAnimationNames.push(ltrAnimationName);
            rtlAnimationNames.push(rtlAnimationName);
            ltrCSS += compileKeyframeCSS.compileKeyframesCSS(ltrAnimationName, ltrKeyframeRule).join("");
            if (ltrAnimationName !== rtlAnimationName) {
              rtlCSS += compileKeyframeCSS.compileKeyframesCSS(rtlAnimationName, rtlKeyframeRule).join("");
            }
          }
          ltrCSS += `animation-name:${ltrAnimationNames.join(",")};`;
          rtlCSS += `animation-name:${rtlAnimationNames.join(",")};`;
          continue;
        }
        if (Array.isArray(value)) {
          if (value.length === 0) {
            if (process.env.NODE_ENV !== "production") {
              console.warn(`makeResetStyles(): An empty array was passed as input to "${property}", the property will be omitted in the styles.`);
            }
            continue;
          }
          const rtlDefinitions = value.map((v) => core.convertProperty(property, v));
          const rtlPropertyConsistent = !rtlDefinitions.some((v) => v.key !== rtlDefinitions[0].key);
          if (!rtlPropertyConsistent) {
            if (process.env.NODE_ENV !== "production") {
              console.error("makeStyles(): mixing CSS fallback values which result in multiple CSS properties in RTL is not supported.");
            }
            continue;
          }
          const rtlProperty = rtlDefinitions[0].key;
          ltrCSS += value.map((v) => `${hyphenateProperty.hyphenateProperty(property)}:${v};`).join("");
          rtlCSS += rtlDefinitions.map((definition) => `${hyphenateProperty.hyphenateProperty(rtlProperty)}:${definition.value};`).join("");
          continue;
        }
        if (isObject.isObject(value)) {
          if (isNestedSelector.isNestedSelector(property)) {
            const nestedSelector = compileCSS.normalizePseudoSelector(property);
            const [ltrNested, rtlNested] = createStringFromStyles(value);
            ltrCSS += `${nestedSelector}{${ltrNested}}`;
            rtlCSS += `${nestedSelector}{${rtlNested}}`;
            continue;
          }
          if (isMediaQuerySelector.isMediaQuerySelector(property) || isLayerSelector.isLayerSelector(property) || isSupportQuerySelector.isSupportQuerySelector(property)) {
            const [ltrNested, rtlNested] = createStringFromStyles(value);
            ltrCSS += `${property}{${ltrNested}}`;
            rtlCSS += `${property}{${rtlNested}}`;
            continue;
          }
        }
        if (process.env.NODE_ENV !== "production") {
          console.error(`Please fix the unresolved style rule: 
 ${property} 
 ${JSON.stringify(value, null, 2)}"`);
        }
      }
      return [ltrCSS, rtlCSS];
    }
    function resolveResetStyleRules(styles) {
      const [ltrRule, rtlRule] = createStringFromStyles(styles);
      const ltrClassName = constants.RESET_HASH_PREFIX + hashString__default["default"](ltrRule);
      const ltrCSS = compileCSS.compileCSSRules(`.${ltrClassName}{${ltrRule}}`);
      if (ltrRule === rtlRule) {
        return [ltrClassName, null, ltrCSS];
      }
      const rtlClassName = constants.RESET_HASH_PREFIX + hashString__default["default"](rtlRule);
      const rtlCSS = compileCSS.compileCSSRules(`.${rtlClassName}{${rtlRule}}`);
      return [ltrClassName, rtlClassName, ltrCSS.concat(rtlCSS)];
    }
    exports.resolveResetStyleRules = resolveResetStyleRules;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/makeResetStyles.cjs.js
var require_makeResetStyles_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/makeResetStyles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants = require_constants_cjs();
    var resolveResetStyleRules = require_resolveResetStyleRules_cjs();
    function makeResetStyles(styles) {
      const insertionCache = {};
      let ltrClassName = null;
      let rtlClassName = null;
      let cssRules = null;
      function computeClassName(options) {
        const {
          dir,
          renderer
        } = options;
        if (ltrClassName === null) {
          [ltrClassName, rtlClassName, cssRules] = resolveResetStyleRules.resolveResetStyleRules(styles);
        }
        const isLTR = dir === "ltr";
        const rendererId = isLTR ? renderer.id : renderer.id + "r";
        if (insertionCache[rendererId] === void 0) {
          renderer.insertCSSRules({
            r: cssRules
          });
          insertionCache[rendererId] = true;
        }
        const className = isLTR ? ltrClassName : rtlClassName || ltrClassName;
        if (process.env.NODE_ENV !== "production") {
          constants.DEBUG_RESET_CLASSES[className] = 1;
        }
        return className;
      }
      return computeClassName;
    }
    exports.makeResetStyles = makeResetStyles;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/__css.cjs.js
var require_css_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/__css.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require_constants_cjs();
    var store = require_store_cjs();
    var isDevToolsEnabled = require_isDevToolsEnabled_cjs();
    var reduceToClassNameForSlots = require_reduceToClassNameForSlots_cjs();
    function __css(classesMapBySlot) {
      let ltrClassNamesForSlots = null;
      let rtlClassNamesForSlots = null;
      function computeClasses(options) {
        const {
          dir
        } = options;
        const isLTR = dir === "ltr";
        if (isLTR) {
          if (ltrClassNamesForSlots === null) {
            ltrClassNamesForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots(classesMapBySlot, dir);
          }
        } else {
          if (rtlClassNamesForSlots === null) {
            rtlClassNamesForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots(classesMapBySlot, dir);
          }
        }
        const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;
        if (process.env.NODE_ENV !== "production" && isDevToolsEnabled.isDevToolsEnabled) {
          store.debugData.addSequenceDetails(classNamesForSlots);
        }
        return classNamesForSlots;
      }
      return computeClasses;
    }
    exports.__css = __css;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/__styles.cjs.js
var require_styles_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/__styles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require_constants_cjs();
    var store = require_store_cjs();
    var isDevToolsEnabled = require_isDevToolsEnabled_cjs();
    var getSourceURLfromError = require_getSourceURLfromError_cjs();
    var reduceToClassNameForSlots = require_reduceToClassNameForSlots_cjs();
    function __styles2(classesMapBySlot, cssRules) {
      const insertionCache = {};
      let ltrClassNamesForSlots = null;
      let rtlClassNamesForSlots = null;
      let sourceURL;
      if (process.env.NODE_ENV !== "production" && isDevToolsEnabled.isDevToolsEnabled) {
        sourceURL = getSourceURLfromError.getSourceURLfromError();
      }
      function computeClasses(options) {
        const {
          dir,
          renderer
        } = options;
        const isLTR = dir === "ltr";
        const rendererId = isLTR ? renderer.id : renderer.id + "r";
        if (isLTR) {
          if (ltrClassNamesForSlots === null) {
            ltrClassNamesForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots(classesMapBySlot, dir);
          }
        } else {
          if (rtlClassNamesForSlots === null) {
            rtlClassNamesForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots(classesMapBySlot, dir);
          }
        }
        if (insertionCache[rendererId] === void 0) {
          renderer.insertCSSRules(cssRules);
          insertionCache[rendererId] = true;
        }
        const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;
        if (process.env.NODE_ENV !== "production" && isDevToolsEnabled.isDevToolsEnabled) {
          store.debugData.addSequenceDetails(classNamesForSlots, sourceURL);
        }
        return classNamesForSlots;
      }
      return computeClasses;
    }
    exports.__styles = __styles2;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/__resetCSS.cjs.js
var require_resetCSS_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/__resetCSS.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants = require_constants_cjs();
    function __resetCSS(ltrClassName, rtlClassName) {
      function computeClassName(options) {
        const {
          dir
        } = options;
        const className = dir === "ltr" ? ltrClassName : rtlClassName || ltrClassName;
        if (process.env.NODE_ENV !== "production") {
          constants.DEBUG_RESET_CLASSES[className] = 1;
        }
        return className;
      }
      return computeClassName;
    }
    exports.__resetCSS = __resetCSS;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/__resetStyles.cjs.js
var require_resetStyles_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/__resetStyles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constants = require_constants_cjs();
    function __resetStyles(ltrClassName, rtlClassName, cssRules) {
      const insertionCache = {};
      function computeClassName(options) {
        const {
          dir,
          renderer
        } = options;
        const isLTR = dir === "ltr";
        const rendererId = isLTR ? renderer.id : renderer.id + "r";
        if (insertionCache[rendererId] === void 0) {
          renderer.insertCSSRules({
            r: cssRules
          });
          insertionCache[rendererId] = true;
        }
        const className = isLTR ? ltrClassName : rtlClassName || ltrClassName;
        if (process.env.NODE_ENV !== "production") {
          constants.DEBUG_RESET_CLASSES[className] = 1;
        }
        return className;
      }
      return computeClassName;
    }
    exports.__resetStyles = __resetStyles;
  }
});

// ../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/index.cjs.js
var require_index_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+core@1.9.0/node_modules/@griffel/core/index.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var border = require_border_cjs();
    var borderLeft = require_borderLeft_cjs();
    var borderBottom = require_borderBottom_cjs();
    var borderRight = require_borderRight_cjs();
    var borderTop = require_borderTop_cjs();
    var borderColor = require_borderColor_cjs();
    var borderStyle = require_borderStyle_cjs();
    var borderRadius2 = require_borderRadius_cjs();
    var borderWidth = require_borderWidth_cjs();
    var flex = require_flex_cjs();
    var gap = require_gap_cjs();
    var gridArea = require_gridArea_cjs();
    var margin = require_margin_cjs();
    var padding = require_padding_cjs();
    var overflow = require_overflow_cjs();
    var inset = require_inset_cjs();
    var outline = require_outline_cjs();
    var transition = require_transition_cjs();
    var createDOMRenderer = require_createDOMRenderer_cjs();
    var rehydrateRendererCache = require_rehydrateRendererCache_cjs();
    var mergeClasses2 = require_mergeClasses_cjs();
    var makeStyles = require_makeStyles_cjs();
    var makeStaticStyles = require_makeStaticStyles_cjs();
    var makeResetStyles = require_makeResetStyles_cjs();
    var resolveStyleRulesForSlots = require_resolveStyleRulesForSlots_cjs();
    var __css = require_css_cjs();
    var __styles2 = require_styles_cjs();
    var __resetCSS = require_resetCSS_cjs();
    var __resetStyles = require_resetStyles_cjs();
    var normalizeCSSBucketEntry = require_normalizeCSSBucketEntry_cjs();
    var getStyleSheetForBucket = require_getStyleSheetForBucket_cjs();
    var getStyleBucketName = require_getStyleBucketName_cjs();
    var reduceToClassNameForSlots = require_reduceToClassNameForSlots_cjs();
    var resolveStyleRules = require_resolveStyleRules_cjs();
    var resolveResetStyleRules = require_resolveResetStyleRules_cjs();
    var constants = require_constants_cjs();
    var shorthands = {
      border: border.border,
      borderLeft: borderLeft.borderLeft,
      borderBottom: borderBottom.borderBottom,
      borderRight: borderRight.borderRight,
      borderTop: borderTop.borderTop,
      borderColor: borderColor.borderColor,
      borderStyle: borderStyle.borderStyle,
      borderRadius: borderRadius2.borderRadius,
      borderWidth: borderWidth.borderWidth,
      flex: flex.flex,
      gap: gap.gap,
      gridArea: gridArea.gridArea,
      margin: margin.margin,
      padding: padding.padding,
      overflow: overflow.overflow,
      inset: inset.inset,
      outline: outline.outline,
      transition: transition.transition
    };
    exports.createDOMRenderer = createDOMRenderer.createDOMRenderer;
    exports.defaultCompareMediaQueries = createDOMRenderer.defaultCompareMediaQueries;
    exports.rehydrateRendererCache = rehydrateRendererCache.rehydrateRendererCache;
    exports.mergeClasses = mergeClasses2.mergeClasses;
    exports.makeStyles = makeStyles.makeStyles;
    exports.makeStaticStyles = makeStaticStyles.makeStaticStyles;
    exports.makeResetStyles = makeResetStyles.makeResetStyles;
    exports.resolveStyleRulesForSlots = resolveStyleRulesForSlots.resolveStyleRulesForSlots;
    exports.__css = __css.__css;
    exports.__styles = __styles2.__styles;
    exports.__resetCSS = __resetCSS.__resetCSS;
    exports.__resetStyles = __resetStyles.__resetStyles;
    exports.normalizeCSSBucketEntry = normalizeCSSBucketEntry.normalizeCSSBucketEntry;
    exports.styleBucketOrdering = getStyleSheetForBucket.styleBucketOrdering;
    exports.getStyleBucketName = getStyleBucketName.getStyleBucketName;
    exports.reduceToClassNameForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots;
    exports.resolveStyleRules = resolveStyleRules.resolveStyleRules;
    exports.resolveResetStyleRules = resolveResetStyleRules.resolveResetStyleRules;
    exports.DATA_BUCKET_ATTR = constants.DATA_BUCKET_ATTR;
    exports.DEBUG_RESET_CLASSES = constants.DEBUG_RESET_CLASSES;
    exports.DEBUG_SEQUENCE_SEPARATOR = constants.DEBUG_SEQUENCE_SEPARATOR;
    exports.DEFINITION_LOOKUP_TABLE = constants.DEFINITION_LOOKUP_TABLE;
    exports.HASH_PREFIX = constants.HASH_PREFIX;
    exports.LOOKUP_DEFINITIONS_INDEX = constants.LOOKUP_DEFINITIONS_INDEX;
    exports.LOOKUP_DIR_INDEX = constants.LOOKUP_DIR_INDEX;
    exports.RESET_HASH_PREFIX = constants.RESET_HASH_PREFIX;
    exports.SEQUENCE_HASH_LENGTH = constants.SEQUENCE_HASH_LENGTH;
    exports.SEQUENCE_PREFIX = constants.SEQUENCE_PREFIX;
    exports.SEQUENCE_SIZE = constants.SEQUENCE_SIZE;
    exports.UNSUPPORTED_CSS_PROPERTIES = constants.UNSUPPORTED_CSS_PROPERTIES;
    exports.shorthands = shorthands;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/utils/isInsideComponent.cjs.js
var require_isInsideComponent_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/utils/isInsideComponent.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React27 = require_react();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React27);
    function isInsideComponent() {
      try {
        const dispatcher = React__namespace.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher.current;
        if (dispatcher === null || dispatcher === void 0) {
          return false;
        }
        dispatcher.useContext({});
        return true;
      } catch (e) {
        return false;
      }
    }
    exports.isInsideComponent = isInsideComponent;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/RendererContext.cjs.js
var require_RendererContext_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/RendererContext.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_index_cjs();
    var React27 = require_react();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React27);
    function canUseDOM2() {
      return typeof window !== "undefined" && !!(window.document && window.document.createElement);
    }
    var RendererContext = /* @__PURE__ */ React__namespace.createContext(/* @__PURE__ */ core.createDOMRenderer());
    var RendererProvider = ({
      children,
      renderer,
      targetDocument
    }) => {
      if (canUseDOM2()) {
        React__namespace.useMemo(() => {
          core.rehydrateRendererCache(renderer, targetDocument);
        }, [renderer, targetDocument]);
      }
      return /* @__PURE__ */ React__namespace.createElement(RendererContext.Provider, {
        value: renderer
      }, children);
    };
    function useRenderer() {
      return React__namespace.useContext(RendererContext);
    }
    exports.RendererProvider = RendererProvider;
    exports.useRenderer = useRenderer;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/TextDirectionContext.cjs.js
var require_TextDirectionContext_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/TextDirectionContext.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React27 = require_react();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React27);
    var TextDirectionContext = /* @__PURE__ */ React__namespace.createContext("ltr");
    var TextDirectionProvider2 = ({
      children,
      dir
    }) => {
      return /* @__PURE__ */ React__namespace.createElement(TextDirectionContext.Provider, {
        value: dir
      }, children);
    };
    function useTextDirection() {
      return React__namespace.useContext(TextDirectionContext);
    }
    exports.TextDirectionProvider = TextDirectionProvider2;
    exports.useTextDirection = useTextDirection;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/makeStyles.cjs.js
var require_makeStyles_cjs2 = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/makeStyles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_index_cjs();
    var isInsideComponent = require_isInsideComponent_cjs();
    var RendererContext = require_RendererContext_cjs();
    var TextDirectionContext = require_TextDirectionContext_cjs();
    function makeStyles(stylesBySlots) {
      const getStyles = core.makeStyles(stylesBySlots);
      if (process.env.NODE_ENV !== "production") {
        if (isInsideComponent.isInsideComponent()) {
          throw new Error(["makeStyles(): this function cannot be called in component's scope.", "All makeStyles() calls should be top level i.e. in a root scope of a file."].join(" "));
        }
      }
      return function useClasses() {
        const dir = TextDirectionContext.useTextDirection();
        const renderer = RendererContext.useRenderer();
        return getStyles({
          dir,
          renderer
        });
      };
    }
    exports.makeStyles = makeStyles;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/makeResetStyles.cjs.js
var require_makeResetStyles_cjs2 = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/makeResetStyles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_index_cjs();
    var isInsideComponent = require_isInsideComponent_cjs();
    var RendererContext = require_RendererContext_cjs();
    var TextDirectionContext = require_TextDirectionContext_cjs();
    function makeResetStyles(styles) {
      const getStyles = core.makeResetStyles(styles);
      if (process.env.NODE_ENV !== "production") {
        if (isInsideComponent.isInsideComponent()) {
          throw new Error(["makeResetStyles(): this function cannot be called in component's scope.", "All makeResetStyles() calls should be top level i.e. in a root scope of a file."].join(" "));
        }
      }
      return function useClassName() {
        const dir = TextDirectionContext.useTextDirection();
        const renderer = RendererContext.useRenderer();
        return getStyles({
          dir,
          renderer
        });
      };
    }
    exports.makeResetStyles = makeResetStyles;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/makeStaticStyles.cjs.js
var require_makeStaticStyles_cjs2 = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/makeStaticStyles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_index_cjs();
    var RendererContext = require_RendererContext_cjs();
    function makeStaticStyles(styles) {
      const getStyles = core.makeStaticStyles(styles);
      if (process.env.NODE_ENV === "test") {
        return () => {
        };
      }
      return function useStaticStyles() {
        const renderer = RendererContext.useRenderer();
        const options = {
          renderer
        };
        return getStyles(options);
      };
    }
    exports.makeStaticStyles = makeStaticStyles;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/renderToStyleElements.cjs.js
var require_renderToStyleElements_cjs = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/renderToStyleElements.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_index_cjs();
    var React27 = require_react();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        Object.keys(e).forEach(function(k) {
          if (k !== "default") {
            var d = Object.getOwnPropertyDescriptor(e, k);
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        });
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React27);
    function renderToStyleElements(renderer) {
      const stylesheets = Object.values(renderer.stylesheets).sort((a, b) => {
        return core.styleBucketOrdering.indexOf(a.bucketName) - core.styleBucketOrdering.indexOf(b.bucketName);
      }).sort((a, b) => {
        const mediaA = a.elementAttributes["media"];
        const mediaB = b.elementAttributes["media"];
        if (mediaA && mediaB) {
          return renderer.compareMediaQueries(mediaA, mediaB);
        }
        if (mediaA || mediaB) {
          return mediaA ? 1 : -1;
        }
        return 0;
      });
      return stylesheets.map((stylesheet) => {
        const cssRules = stylesheet.cssRules();
        if (!cssRules.length) {
          return null;
        }
        return /* @__PURE__ */ React__namespace.createElement("style", Object.assign(Object.assign({
          key: stylesheet.bucketName
        }, stylesheet.elementAttributes), {
          "data-make-styles-rehydration": "true",
          dangerouslySetInnerHTML: {
            __html: cssRules.join("")
          }
        }));
      }).filter(Boolean);
    }
    exports.renderToStyleElements = renderToStyleElements;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/__css.cjs.js
var require_css_cjs2 = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/__css.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_index_cjs();
    var TextDirectionContext = require_TextDirectionContext_cjs();
    function __css(classesMapBySlot) {
      const getStyles = core.__css(classesMapBySlot);
      return function useClasses() {
        const dir = TextDirectionContext.useTextDirection();
        return getStyles({
          dir
        });
      };
    }
    exports.__css = __css;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/__styles.cjs.js
var require_styles_cjs2 = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/__styles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_index_cjs();
    var RendererContext = require_RendererContext_cjs();
    var TextDirectionContext = require_TextDirectionContext_cjs();
    function __styles2(classesMapBySlot, cssRules) {
      const getStyles = core.__styles(classesMapBySlot, cssRules);
      return function useClasses() {
        const dir = TextDirectionContext.useTextDirection();
        const renderer = RendererContext.useRenderer();
        return getStyles({
          dir,
          renderer
        });
      };
    }
    exports.__styles = __styles2;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/__resetCSS.cjs.js
var require_resetCSS_cjs2 = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/__resetCSS.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_index_cjs();
    var TextDirectionContext = require_TextDirectionContext_cjs();
    function __resetCSS(ltrClassName, rtlClassName) {
      const getStyles = core.__resetCSS(ltrClassName, rtlClassName);
      return function useClasses() {
        const dir = TextDirectionContext.useTextDirection();
        return getStyles({
          dir
        });
      };
    }
    exports.__resetCSS = __resetCSS;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/__resetStyles.cjs.js
var require_resetStyles_cjs2 = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/__resetStyles.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_index_cjs();
    var RendererContext = require_RendererContext_cjs();
    var TextDirectionContext = require_TextDirectionContext_cjs();
    function __resetStyles(ltrClassName, rtlClassName, cssRules) {
      const getStyles = core.__resetStyles(ltrClassName, rtlClassName, cssRules);
      return function useClasses() {
        const dir = TextDirectionContext.useTextDirection();
        const renderer = RendererContext.useRenderer();
        return getStyles({
          dir,
          renderer
        });
      };
    }
    exports.__resetStyles = __resetStyles;
  }
});

// ../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/index.cjs.js
var require_index_cjs2 = __commonJS({
  "../../node_modules/.pnpm/@griffel+react@1.5.2_react@18.2.0/node_modules/@griffel/react/index.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_index_cjs();
    var makeStyles = require_makeStyles_cjs2();
    var makeResetStyles = require_makeResetStyles_cjs2();
    var makeStaticStyles = require_makeStaticStyles_cjs2();
    var renderToStyleElements = require_renderToStyleElements_cjs();
    var RendererContext = require_RendererContext_cjs();
    var TextDirectionContext = require_TextDirectionContext_cjs();
    var __css = require_css_cjs2();
    var __styles2 = require_styles_cjs2();
    var __resetCSS = require_resetCSS_cjs2();
    var __resetStyles = require_resetStyles_cjs2();
    Object.defineProperty(exports, "createDOMRenderer", {
      enumerable: true,
      get: function() {
        return core.createDOMRenderer;
      }
    });
    Object.defineProperty(exports, "mergeClasses", {
      enumerable: true,
      get: function() {
        return core.mergeClasses;
      }
    });
    Object.defineProperty(exports, "shorthands", {
      enumerable: true,
      get: function() {
        return core.shorthands;
      }
    });
    exports.makeStyles = makeStyles.makeStyles;
    exports.makeResetStyles = makeResetStyles.makeResetStyles;
    exports.makeStaticStyles = makeStaticStyles.makeStaticStyles;
    exports.renderToStyleElements = renderToStyleElements.renderToStyleElements;
    exports.RendererProvider = RendererContext.RendererProvider;
    exports.useRenderer_unstable = RendererContext.useRenderer;
    exports.TextDirectionProvider = TextDirectionContext.TextDirectionProvider;
    exports.__css = __css.__css;
    exports.__styles = __styles2.__styles;
    exports.__resetCSS = __resetCSS.__resetCSS;
    exports.__resetStyles = __resetStyles.__resetStyles;
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeContext/ThemeContext.js
var React3, ThemeContext2, ThemeProvider;
var init_ThemeContext = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeContext/ThemeContext.js"() {
    React3 = __toESM(require_react());
    ThemeContext2 = /* @__PURE__ */ React3.createContext(void 0);
    ThemeProvider = ThemeContext2.Provider;
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeContext/index.js
var init_ThemeContext2 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeContext/index.js"() {
    init_ThemeContext();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeContext.js
var init_ThemeContext3 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeContext.js"() {
    init_ThemeContext2();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeClassNameContext/ThemeClassNameContext.js
var React4, ThemeClassNameContext, ThemeClassNameProvider;
var init_ThemeClassNameContext = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeClassNameContext/ThemeClassNameContext.js"() {
    React4 = __toESM(require_react());
    ThemeClassNameContext = /* @__PURE__ */ React4.createContext(void 0);
    ThemeClassNameProvider = ThemeClassNameContext.Provider;
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeClassNameContext/index.js
var init_ThemeClassNameContext2 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeClassNameContext/index.js"() {
    init_ThemeClassNameContext();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeClassNameContext.js
var init_ThemeClassNameContext3 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ThemeClassNameContext.js"() {
    init_ThemeClassNameContext2();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/TooltipVisibilityContext/TooltipContext.js
var React5, TooltipVisibilityContext, TooltipVisibilityProvider;
var init_TooltipContext = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/TooltipVisibilityContext/TooltipContext.js"() {
    React5 = __toESM(require_react());
    TooltipVisibilityContext = /* @__PURE__ */ React5.createContext(void 0);
    TooltipVisibilityProvider = TooltipVisibilityContext.Provider;
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/TooltipVisibilityContext/index.js
var init_TooltipVisibilityContext = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/TooltipVisibilityContext/index.js"() {
    init_TooltipContext();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/TooltipVisibilityContext.js
var init_TooltipVisibilityContext2 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/TooltipVisibilityContext.js"() {
    init_TooltipVisibilityContext();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ProviderContext/ProviderContext.js
function useFluent() {
  var _a;
  return (_a = React6.useContext(ProviderContext)) !== null && _a !== void 0 ? _a : providerContextDefaultValue;
}
var React6, ProviderContext, providerContextDefaultValue, Provider;
var init_ProviderContext = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ProviderContext/ProviderContext.js"() {
    React6 = __toESM(require_react());
    ProviderContext = /* @__PURE__ */ React6.createContext(void 0);
    providerContextDefaultValue = {
      targetDocument: typeof document === "object" ? document : void 0,
      dir: "ltr"
    };
    Provider = ProviderContext.Provider;
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ProviderContext/index.js
var init_ProviderContext2 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ProviderContext/index.js"() {
    init_ProviderContext();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ProviderContext.js
var init_ProviderContext3 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/ProviderContext.js"() {
    init_ProviderContext2();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/index.js
var init_lib = __esm({
  "../../node_modules/.pnpm/@fluentui+react-shared-contexts@9.1.4_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-shared-contexts/lib/index.js"() {
    init_ThemeContext3();
    init_ThemeClassNameContext3();
    init_TooltipVisibilityContext2();
    init_ProviderContext3();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/omit.js
function omit(obj, exclusions) {
  const result = {};
  for (const key in obj) {
    if (exclusions.indexOf(key) === -1 && obj.hasOwnProperty(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
var init_omit = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/omit.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/compose/getSlots.js
function getSlots(state) {
  const slots = {};
  const slotProps = {};
  const slotNames = Object.keys(state.components);
  for (const slotName of slotNames) {
    const [slot, props] = getSlot(state, slotName);
    slots[slotName] = slot;
    slotProps[slotName] = props;
  }
  return {
    slots,
    slotProps
  };
}
function getSlot(state, slotName) {
  var _a, _b, _c;
  if (state[slotName] === void 0) {
    return [null, void 0];
  }
  const {
    children,
    as: asProp,
    ...rest
  } = state[slotName];
  const slot = ((_a = state.components) === null || _a === void 0 ? void 0 : _a[slotName]) === void 0 || typeof state.components[slotName] === "string" ? asProp || ((_b = state.components) === null || _b === void 0 ? void 0 : _b[slotName]) || "div" : state.components[slotName];
  if (typeof children === "function") {
    const render = children;
    return [React7.Fragment, {
      children: render(slot, rest)
    }];
  }
  const shouldOmitAsProp = typeof slot === "string" && ((_c = state[slotName]) === null || _c === void 0 ? void 0 : _c.as);
  const slotProps = shouldOmitAsProp ? omit(state[slotName], ["as"]) : state[slotName];
  return [slot, slotProps];
}
var React7;
var init_getSlots = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/compose/getSlots.js"() {
    React7 = __toESM(require_react());
    init_omit();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/compose/resolveShorthand.js
var import_react11;
var init_resolveShorthand = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/compose/resolveShorthand.js"() {
    import_react11 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/compose/types.js
var init_types = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/compose/types.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/compose/isResolvedShorthand.js
var import_react12;
var init_isResolvedShorthand = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/compose/isResolvedShorthand.js"() {
    import_react12 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/compose/index.js
var init_compose = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/compose/index.js"() {
    init_getSlots();
    init_resolveShorthand();
    init_types();
    init_isResolvedShorthand();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useControllableState.js
var React8;
var init_useControllableState = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useControllableState.js"() {
    React8 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/ssr/canUseDOM.js
function canUseDOM() {
  return typeof window !== "undefined" && !!(window.document && // eslint-disable-next-line deprecation/deprecation
  window.document.createElement);
}
var init_canUseDOM = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/ssr/canUseDOM.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/ssr/SSRContext.js
function useSSRContext() {
  var _a;
  return (_a = React9.useContext(SSRContext)) !== null && _a !== void 0 ? _a : defaultSSRContextValue;
}
var React9, defaultSSRContextValue, SSRContext;
var init_SSRContext = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/ssr/SSRContext.js"() {
    React9 = __toESM(require_react());
    defaultSSRContextValue = {
      current: 0
    };
    SSRContext = /* @__PURE__ */ React9.createContext(void 0);
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/ssr/index.js
var init_ssr = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/ssr/index.js"() {
    init_canUseDOM();
    init_SSRContext();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useIsomorphicLayoutEffect.js
var React10, useIsomorphicLayoutEffect;
var init_useIsomorphicLayoutEffect = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useIsomorphicLayoutEffect.js"() {
    React10 = __toESM(require_react());
    init_ssr();
    useIsomorphicLayoutEffect = /* @__PURE__ */ canUseDOM() ? React10.useLayoutEffect : React10.useEffect;
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useEventCallback.js
var React11;
var init_useEventCallback = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useEventCallback.js"() {
    React11 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useFirstMount.js
var React12;
var init_useFirstMount = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useFirstMount.js"() {
    React12 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useForceUpdate.js
var import_react13;
var init_useForceUpdate = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useForceUpdate.js"() {
    import_react13 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useId.js
function useId(prefix2 = "fui-", providedId) {
  const contextValue = useSSRContext();
  return React13.useMemo(() => {
    if (providedId) {
      return providedId;
    }
    return `${prefix2}${++contextValue.current}`;
  }, [prefix2, providedId, contextValue]);
}
var React13;
var init_useId = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useId.js"() {
    React13 = __toESM(require_react());
    init_ssr();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useMergedRefs.js
function useMergedRefs(...refs) {
  const mergedCallback = React14.useCallback(
    (value) => {
      mergedCallback.current = value;
      for (const ref of refs) {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref) {
          ref.current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- already exhaustive
    [...refs]
  );
  return mergedCallback;
}
var React14;
var init_useMergedRefs = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useMergedRefs.js"() {
    React14 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useOnClickOutside.js
var React15;
var init_useOnClickOutside = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useOnClickOutside.js"() {
    React15 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useOnScrollOutside.js
var React16;
var init_useOnScrollOutside = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useOnScrollOutside.js"() {
    React16 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/usePrevious.js
var React17;
var init_usePrevious = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/usePrevious.js"() {
    React17 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useTimeout.js
var React18;
var init_useTimeout = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/useTimeout.js"() {
    React18 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/index.js
var init_hooks = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/hooks/index.js"() {
    init_useControllableState();
    init_useEventCallback();
    init_useFirstMount();
    init_useForceUpdate();
    init_useId();
    init_useIsomorphicLayoutEffect();
    init_useMergedRefs();
    init_useOnClickOutside();
    init_useOnScrollOutside();
    init_usePrevious();
    init_useTimeout();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/clamp.js
var init_clamp = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/clamp.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/properties.js
function getNativeProps(props, allowedPropNames, excludedPropNames) {
  const isArray = Array.isArray(allowedPropNames);
  const result = {};
  const keys = Object.keys(props);
  for (const key of keys) {
    const isNativeProp = !isArray && allowedPropNames[key] || isArray && allowedPropNames.indexOf(key) >= 0 || key.indexOf("data-") === 0 || key.indexOf("aria-") === 0;
    if (isNativeProp && (!excludedPropNames || (excludedPropNames === null || excludedPropNames === void 0 ? void 0 : excludedPropNames.indexOf(key)) === -1)) {
      result[key] = props[key];
    }
  }
  return result;
}
var toObjectMap, baseElementEvents, baseElementProperties, microdataProperties, htmlElementProperties, labelProperties, audioProperties, videoProperties, olProperties, liProperties, anchorProperties, timeProperties, buttonProperties, inputProperties, textAreaProperties, selectProperties, optionProperties, tableProperties, trProperties, thProperties, tdProperties, colGroupProperties, colProperties, fieldsetProperties, formProperties, iframeProperties, imgProperties, dialogProperties;
var init_properties = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/properties.js"() {
    toObjectMap = (...items) => {
      const result = {};
      for (const item of items) {
        const keys = Array.isArray(item) ? item : Object.keys(item);
        for (const key of keys) {
          result[key] = 1;
        }
      }
      return result;
    };
    baseElementEvents = /* @__PURE__ */ toObjectMap(["onAuxClick", "onCopy", "onCut", "onPaste", "onCompositionEnd", "onCompositionStart", "onCompositionUpdate", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onInput", "onSubmit", "onLoad", "onError", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyUp", "onAbort", "onCanPlay", "onCanPlayThrough", "onDurationChange", "onEmptied", "onEncrypted", "onEnded", "onLoadedData", "onLoadedMetadata", "onLoadStart", "onPause", "onPlay", "onPlaying", "onProgress", "onRateChange", "onSeeked", "onSeeking", "onStalled", "onSuspend", "onTimeUpdate", "onVolumeChange", "onWaiting", "onClick", "onClickCapture", "onContextMenu", "onDoubleClick", "onDrag", "onDragEnd", "onDragEnter", "onDragExit", "onDragLeave", "onDragOver", "onDragStart", "onDrop", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseOut", "onMouseOver", "onMouseUp", "onMouseUpCapture", "onSelect", "onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart", "onScroll", "onWheel", "onPointerCancel", "onPointerDown", "onPointerEnter", "onPointerLeave", "onPointerMove", "onPointerOut", "onPointerOver", "onPointerUp", "onGotPointerCapture", "onLostPointerCapture"]);
    baseElementProperties = /* @__PURE__ */ toObjectMap([
      "accessKey",
      "children",
      "className",
      "contentEditable",
      "dir",
      "draggable",
      "hidden",
      "htmlFor",
      "id",
      "lang",
      "ref",
      "role",
      "style",
      "tabIndex",
      "title",
      "translate",
      "spellCheck",
      "name"
      // global
    ]);
    microdataProperties = /* @__PURE__ */ toObjectMap([
      "itemID",
      "itemProp",
      "itemRef",
      "itemScope",
      "itemType"
      // global
    ]);
    htmlElementProperties = /* @__PURE__ */ toObjectMap(baseElementProperties, baseElementEvents, microdataProperties);
    labelProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "form"
      // button, fieldset, input, label, meter, object, output, select, textarea
    ]);
    audioProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "height",
      "loop",
      "muted",
      "preload",
      "src",
      "width"
      // canvas, embed, iframe, img, input, object, video
    ]);
    videoProperties = /* @__PURE__ */ toObjectMap(audioProperties, [
      "poster"
      // video
    ]);
    olProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "start"
      // ol
    ]);
    liProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "value"
      // button, input, li, option, meter, progress, param
    ]);
    anchorProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "download",
      "href",
      "hrefLang",
      "media",
      "rel",
      "target",
      "type"
      // a, button, input, link, menu, object, script, source, style
    ]);
    timeProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "dateTime"
      // time
    ]);
    buttonProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "autoFocus",
      "disabled",
      "form",
      "formAction",
      "formEncType",
      "formMethod",
      "formNoValidate",
      "formTarget",
      "type",
      "value"
      // button, input, li, option, meter, progress, param,
    ]);
    inputProperties = /* @__PURE__ */ toObjectMap(buttonProperties, [
      "accept",
      "alt",
      "autoCapitalize",
      "autoComplete",
      "checked",
      "dirname",
      "form",
      "height",
      "inputMode",
      "list",
      "max",
      "maxLength",
      "min",
      "multiple",
      "pattern",
      "placeholder",
      "readOnly",
      "required",
      "src",
      "step",
      "size",
      "type",
      "value",
      "width"
      // canvas, embed, iframe, img, input, object, video
    ]);
    textAreaProperties = /* @__PURE__ */ toObjectMap(buttonProperties, [
      "autoCapitalize",
      "cols",
      "dirname",
      "form",
      "maxLength",
      "placeholder",
      "readOnly",
      "required",
      "rows",
      "wrap"
      // textarea
    ]);
    selectProperties = /* @__PURE__ */ toObjectMap(buttonProperties, [
      "form",
      "multiple",
      "required"
      // input, select, textarea
    ]);
    optionProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "selected",
      "value"
      // button, input, li, option, meter, progress, param
    ]);
    tableProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "cellPadding",
      "cellSpacing"
      // table
    ]);
    trProperties = htmlElementProperties;
    thProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "colSpan",
      "rowSpan",
      "scope"
      // th
    ]);
    tdProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "colSpan",
      "headers",
      "rowSpan",
      "scope"
      // th
    ]);
    colGroupProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "span"
      // col, colgroup
    ]);
    colProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "span"
      // col, colgroup
    ]);
    fieldsetProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "disabled",
      "form"
      // button, fieldset, input, label, meter, object, output, select, textarea
    ]);
    formProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "acceptCharset",
      "action",
      "encType",
      "encType",
      "method",
      "noValidate",
      "target"
      // form
    ]);
    iframeProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "allow",
      "allowFullScreen",
      "allowPaymentRequest",
      "allowTransparency",
      "csp",
      "height",
      "importance",
      "referrerPolicy",
      "sandbox",
      "src",
      "srcDoc",
      "width"
      // canvas, embed, iframe, img, input, object, video,
    ]);
    imgProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, [
      "alt",
      "crossOrigin",
      "height",
      "src",
      "srcSet",
      "useMap",
      "width"
      // canvas, embed, iframe, img, input, object, video
    ]);
    dialogProperties = /* @__PURE__ */ toObjectMap(htmlElementProperties, ["open", "onCancel", "onClose"]);
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/getNativeElementProps.js
function getNativeElementProps(tagName, props, excludedPropNames) {
  const allowedPropNames = tagName && nativeElementMap[tagName] || htmlElementProperties;
  allowedPropNames.as = 1;
  return getNativeProps(props, allowedPropNames, excludedPropNames);
}
var nativeElementMap;
var init_getNativeElementProps = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/getNativeElementProps.js"() {
    init_properties();
    nativeElementMap = {
      label: labelProperties,
      audio: audioProperties,
      video: videoProperties,
      ol: olProperties,
      li: liProperties,
      a: anchorProperties,
      button: buttonProperties,
      input: inputProperties,
      textarea: textAreaProperties,
      select: selectProperties,
      option: optionProperties,
      table: tableProperties,
      tr: trProperties,
      th: thProperties,
      td: tdProperties,
      colGroup: colGroupProperties,
      col: colProperties,
      fieldset: fieldsetProperties,
      form: formProperties,
      iframe: iframeProperties,
      img: imgProperties,
      time: timeProperties,
      dialog: dialogProperties
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/getRTLSafeKey.js
var init_getRTLSafeKey = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/getRTLSafeKey.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/mergeCallbacks.js
var init_mergeCallbacks = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/mergeCallbacks.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/isHTMLElement.js
var init_isHTMLElement = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/isHTMLElement.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/isInteractiveHTMLElement.js
var init_isInteractiveHTMLElement = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/isInteractiveHTMLElement.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/index.js
var init_utils = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/utils/index.js"() {
    init_clamp();
    init_getNativeElementProps();
    init_getRTLSafeKey();
    init_mergeCallbacks();
    init_omit();
    init_properties();
    init_isHTMLElement();
    init_isInteractiveHTMLElement();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/index.js
var init_lib2 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-utilities@9.3.1_kzbn2opkn2327fwg5yzwzya5o4/node_modules/@fluentui/react-utilities/lib/index.js"() {
    init_compose();
    init_hooks();
    init_utils();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/renderFluentProvider.js
var React19, import_react14, renderFluentProvider_unstable;
var init_renderFluentProvider = __esm({
  "../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/renderFluentProvider.js"() {
    React19 = __toESM(require_react());
    import_react14 = __toESM(require_index_cjs2());
    init_lib();
    init_lib2();
    renderFluentProvider_unstable = (state, contextValues) => {
      const {
        slots,
        slotProps
      } = getSlots(state);
      return /* @__PURE__ */ React19.createElement(Provider, {
        value: contextValues.provider
      }, /* @__PURE__ */ React19.createElement(ThemeProvider, {
        value: contextValues.theme
      }, /* @__PURE__ */ React19.createElement(ThemeClassNameProvider, {
        value: contextValues.themeClassName
      }, /* @__PURE__ */ React19.createElement(TooltipVisibilityProvider, {
        value: contextValues.tooltip
      }, /* @__PURE__ */ React19.createElement(import_react14.TextDirectionProvider, {
        dir: contextValues.textDirection
      }, /* @__PURE__ */ React19.createElement(slots.root, {
        ...slotProps.root
      }, state.root.children))))));
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useTabsterAttributes.js
var init_useTabsterAttributes = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useTabsterAttributes.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useArrowNavigationGroup.js
var init_useArrowNavigationGroup = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useArrowNavigationGroup.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useFocusableGroup.js
var init_useFocusableGroup = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useFocusableGroup.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useFocusFinders.js
var React20;
var init_useFocusFinders = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useFocusFinders.js"() {
    React20 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/keyborg@1.2.1/node_modules/keyborg/dist/index.js
var require_dist = __commonJS({
  "../../node_modules/.pnpm/keyborg@1.2.1/node_modules/keyborg/dist/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _canUseWeakRef = typeof WeakRef !== "undefined";
    var WeakRefInstance = class {
      constructor(instance) {
        if (_canUseWeakRef && typeof instance === "object") {
          this._weakRef = new WeakRef(instance);
        } else {
          this._instance = instance;
        }
      }
      /**
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef/deref}
       */
      deref() {
        var _a, _b, _c;
        let instance;
        if (this._weakRef) {
          instance = (_a = this._weakRef) === null || _a === void 0 ? void 0 : _a.deref();
          if (!instance) {
            delete this._weakRef;
          }
        } else {
          instance = this._instance;
          if ((_c = (_b = instance) === null || _b === void 0 ? void 0 : _b.isDisposed) === null || _c === void 0 ? void 0 : _c.call(_b)) {
            delete this._instance;
          }
        }
        return instance;
      }
    };
    var KEYBORG_FOCUSIN2 = "keyborg:focusin";
    function canOverrideNativeFocus(win) {
      const HTMLElement2 = win.HTMLElement;
      const origFocus = HTMLElement2.prototype.focus;
      let isCustomFocusCalled = false;
      HTMLElement2.prototype.focus = function focus() {
        isCustomFocusCalled = true;
      };
      const btn = win.document.createElement("button");
      btn.focus();
      HTMLElement2.prototype.focus = origFocus;
      return isCustomFocusCalled;
    }
    var _canOverrideNativeFocus = false;
    function nativeFocus(element) {
      const focus = element.focus;
      if (focus.__keyborgNativeFocus) {
        focus.__keyborgNativeFocus.call(element);
      } else {
        element.focus();
      }
    }
    function setupFocusEvent(win) {
      const kwin = win;
      if (!_canOverrideNativeFocus) {
        _canOverrideNativeFocus = canOverrideNativeFocus(kwin);
      }
      const origFocus = kwin.HTMLElement.prototype.focus;
      if (origFocus.__keyborgNativeFocus) {
        return;
      }
      kwin.HTMLElement.prototype.focus = focus;
      const data = kwin.__keyborgData = {
        focusInHandler: (e) => {
          var _a;
          const target = e.target;
          if (!target) {
            return;
          }
          const event = document.createEvent("HTMLEvents");
          event.initEvent(KEYBORG_FOCUSIN2, true, true);
          const details = {
            relatedTarget: e.relatedTarget || void 0
          };
          if (_canOverrideNativeFocus || data.lastFocusedProgrammatically) {
            details.isFocusedProgrammatically = target === ((_a = data.lastFocusedProgrammatically) === null || _a === void 0 ? void 0 : _a.deref());
            data.lastFocusedProgrammatically = void 0;
          }
          event.details = details;
          target.dispatchEvent(event);
        }
      };
      kwin.document.addEventListener("focusin", kwin.__keyborgData.focusInHandler, true);
      function focus() {
        const keyborgNativeFocusEvent = kwin.__keyborgData;
        if (keyborgNativeFocusEvent) {
          keyborgNativeFocusEvent.lastFocusedProgrammatically = new WeakRefInstance(this);
        }
        return origFocus.apply(this, arguments);
      }
      focus.__keyborgNativeFocus = origFocus;
    }
    function disposeFocusEvent(win) {
      const kwin = win;
      const proto = kwin.HTMLElement.prototype;
      const origFocus = proto.focus.__keyborgNativeFocus;
      const keyborgNativeFocusEvent = kwin.__keyborgData;
      if (keyborgNativeFocusEvent) {
        kwin.document.removeEventListener("focusin", keyborgNativeFocusEvent.focusInHandler, true);
        delete kwin.__keyborgData;
      }
      if (origFocus) {
        proto.focus = origFocus;
      }
    }
    function getLastFocusedProgrammatically(win) {
      var _a;
      const keyborgNativeFocusEvent = win.__keyborgData;
      return keyborgNativeFocusEvent ? ((_a = keyborgNativeFocusEvent.lastFocusedProgrammatically) === null || _a === void 0 ? void 0 : _a.deref()) || null : void 0;
    }
    var KeyTab = 9;
    var KeyEsc = 27;
    var _dismissTimeout = 500;
    var _lastId = 0;
    var KeyborgState = class {
      constructor() {
        this.__keyborgCoreRefs = {};
        this._isNavigatingWithKeyboard = false;
      }
      add(keyborg) {
        const id = keyborg.id;
        if (!(id in this.__keyborgCoreRefs)) {
          this.__keyborgCoreRefs[id] = new WeakRefInstance(keyborg);
        }
      }
      remove(id) {
        delete this.__keyborgCoreRefs[id];
        if (Object.keys(this.__keyborgCoreRefs).length === 0) {
          this._isNavigatingWithKeyboard = false;
        }
      }
      setVal(isNavigatingWithKeyboard) {
        if (this._isNavigatingWithKeyboard === isNavigatingWithKeyboard) {
          return;
        }
        this._isNavigatingWithKeyboard = isNavigatingWithKeyboard;
        for (const id of Object.keys(this.__keyborgCoreRefs)) {
          const ref = this.__keyborgCoreRefs[id];
          const keyborg = ref.deref();
          if (keyborg) {
            keyborg.update(isNavigatingWithKeyboard);
          } else {
            this.remove(id);
          }
        }
      }
      getVal() {
        return this._isNavigatingWithKeyboard;
      }
    };
    var _state = /* @__PURE__ */ new KeyborgState();
    var KeyborgCore = class {
      constructor(win) {
        this._isMouseUsed = false;
        this._onFocusIn = (e) => {
          if (this._isMouseUsed) {
            this._isMouseUsed = false;
            return;
          }
          if (_state.getVal()) {
            return;
          }
          const details = e.details;
          if (!details.relatedTarget) {
            return;
          }
          if (details.isFocusedProgrammatically || details.isFocusedProgrammatically === void 0) {
            return;
          }
          _state.setVal(true);
        };
        this._onMouseDown = (e) => {
          if (e.buttons === 0 || e.clientX === 0 && e.clientY === 0 && e.screenX === 0 && e.screenY === 0) {
            return;
          }
          this._isMouseUsed = true;
          _state.setVal(false);
        };
        this._onKeyDown = (e) => {
          const isNavigatingWithKeyboard = _state.getVal();
          if (!isNavigatingWithKeyboard && e.keyCode === KeyTab) {
            _state.setVal(true);
          } else if (isNavigatingWithKeyboard && e.keyCode === KeyEsc) {
            this._scheduleDismiss();
          }
        };
        this.id = "c" + ++_lastId;
        this._win = win;
        const doc = win.document;
        doc.addEventListener(KEYBORG_FOCUSIN2, this._onFocusIn, true);
        doc.addEventListener("mousedown", this._onMouseDown, true);
        win.addEventListener("keydown", this._onKeyDown, true);
        setupFocusEvent(win);
        _state.add(this);
      }
      dispose() {
        const win = this._win;
        if (win) {
          if (this._dismissTimer) {
            win.clearTimeout(this._dismissTimer);
            this._dismissTimer = void 0;
          }
          disposeFocusEvent(win);
          const doc = win.document;
          doc.removeEventListener(KEYBORG_FOCUSIN2, this._onFocusIn, true);
          doc.removeEventListener("mousedown", this._onMouseDown, true);
          win.removeEventListener("keydown", this._onKeyDown, true);
          delete this._win;
          _state.remove(this.id);
        }
      }
      isDisposed() {
        return !!this._win;
      }
      /**
       * Updates all keyborg instances with the keyboard navigation state
       */
      update(isNavigatingWithKeyboard) {
        var _a, _b;
        const keyborgs = (_b = (_a = this._win) === null || _a === void 0 ? void 0 : _a.__keyborg) === null || _b === void 0 ? void 0 : _b.refs;
        if (keyborgs) {
          for (const id of Object.keys(keyborgs)) {
            Keyborg.update(keyborgs[id], isNavigatingWithKeyboard);
          }
        }
      }
      _scheduleDismiss() {
        const win = this._win;
        if (win) {
          if (this._dismissTimer) {
            win.clearTimeout(this._dismissTimer);
            this._dismissTimer = void 0;
          }
          const was = win.document.activeElement;
          this._dismissTimer = win.setTimeout(() => {
            this._dismissTimer = void 0;
            const cur = win.document.activeElement;
            if (was && cur && was === cur) {
              _state.setVal(false);
            }
          }, _dismissTimeout);
        }
      }
    };
    var Keyborg = class {
      constructor(win) {
        this._cb = [];
        this._id = "k" + ++_lastId;
        this._win = win;
        const current = win.__keyborg;
        if (current) {
          this._core = current.core;
          current.refs[this._id] = this;
        } else {
          this._core = new KeyborgCore(win);
          win.__keyborg = {
            core: this._core,
            refs: {
              [this._id]: this
            }
          };
        }
      }
      static create(win) {
        return new Keyborg(win);
      }
      static dispose(instance) {
        instance.dispose();
      }
      /**
       * Updates all subscribed callbacks with the keyboard navigation state
       */
      static update(instance, isNavigatingWithKeyboard) {
        instance._cb.forEach((callback) => callback(isNavigatingWithKeyboard));
      }
      dispose() {
        var _a;
        const current = (_a = this._win) === null || _a === void 0 ? void 0 : _a.__keyborg;
        if (current === null || current === void 0 ? void 0 : current.refs[this._id]) {
          delete current.refs[this._id];
          if (Object.keys(current.refs).length === 0) {
            current.core.dispose();
            delete this._win.__keyborg;
          }
        } else if (process.env.NODE_ENV === "development") {
          console.error("Keyborg instance " + this._id + " is being disposed incorrectly.");
        }
        this._cb = [];
        delete this._core;
        delete this._win;
      }
      /**
       * @returns Whether the user is navigating with keyboard
       */
      isNavigatingWithKeyboard() {
        return _state.getVal();
      }
      /**
       * @param callback - Called when the keyboard navigation state changes
       */
      subscribe(callback) {
        this._cb.push(callback);
      }
      /**
       * @param callback - Registered with subscribe
       */
      unsubscribe(callback) {
        const index = this._cb.indexOf(callback);
        if (index >= 0) {
          this._cb.splice(index, 1);
        }
      }
      /**
       * Manually set the keyboard navigtion state
       */
      setVal(isNavigatingWithKeyboard) {
        _state.setVal(isNavigatingWithKeyboard);
      }
    };
    function createKeyborg2(win) {
      return Keyborg.create(win);
    }
    function disposeKeyborg2(instance) {
      Keyborg.dispose(instance);
    }
    var version = "1.2.1";
    exports.KEYBORG_FOCUSIN = KEYBORG_FOCUSIN2;
    exports.Keyborg = Keyborg;
    exports.createKeyborg = createKeyborg2;
    exports.disposeKeyborg = disposeKeyborg2;
    exports.getLastFocusedProgrammatically = getLastFocusedProgrammatically;
    exports.nativeFocus = nativeFocus;
    exports.version = version;
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/focus/constants.js
var KEYBOARD_NAV_ATTRIBUTE, KEYBOARD_NAV_SELECTOR, FOCUS_VISIBLE_ATTR;
var init_constants = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/focus/constants.js"() {
    KEYBOARD_NAV_ATTRIBUTE = "data-keyboard-nav";
    KEYBOARD_NAV_SELECTOR = `:global([${KEYBOARD_NAV_ATTRIBUTE}])`;
    FOCUS_VISIBLE_ATTR = "data-fui-focus-visible";
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/focus/focusVisiblePolyfill.js
function applyFocusVisiblePolyfill(scope, win) {
  if (alreadyInScope(scope)) {
    return () => void 0;
  }
  const state = {
    current: void 0
  };
  const keyborg = (0, import_keyborg.createKeyborg)(win);
  keyborg.subscribe((isNavigatingWithKeyboard) => {
    if (!isNavigatingWithKeyboard && state.current) {
      removeFocusVisibleClass(state.current);
      state.current = void 0;
    }
  });
  const keyborgListener = (e) => {
    if (state.current) {
      removeFocusVisibleClass(state.current);
      state.current = void 0;
    }
    if (keyborg.isNavigatingWithKeyboard() && isHTMLElement2(e.target) && e.target) {
      state.current = e.target;
      applyFocusVisibleClass(state.current);
    }
  };
  const blurListener = (e) => {
    if (!e.relatedTarget || isHTMLElement2(e.relatedTarget) && !scope.contains(e.relatedTarget)) {
      if (state.current) {
        removeFocusVisibleClass(state.current);
        state.current = void 0;
      }
    }
  };
  scope.addEventListener(import_keyborg.KEYBORG_FOCUSIN, keyborgListener);
  scope.addEventListener("focusout", blurListener);
  scope.focusVisible = true;
  return () => {
    scope.removeEventListener(import_keyborg.KEYBORG_FOCUSIN, keyborgListener);
    scope.removeEventListener("focusout", blurListener);
    delete scope.focusVisible;
    (0, import_keyborg.disposeKeyborg)(keyborg);
  };
}
function applyFocusVisibleClass(el) {
  el.setAttribute(FOCUS_VISIBLE_ATTR, "");
}
function removeFocusVisibleClass(el) {
  el.removeAttribute(FOCUS_VISIBLE_ATTR);
}
function isHTMLElement2(target) {
  if (!target) {
    return false;
  }
  return Boolean(target && typeof target === "object" && "classList" in target && "contains" in target);
}
function alreadyInScope(el) {
  if (!el) {
    return false;
  }
  if (el.focusVisible) {
    return true;
  }
  return alreadyInScope(el === null || el === void 0 ? void 0 : el.parentElement);
}
var import_keyborg;
var init_focusVisiblePolyfill = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/focus/focusVisiblePolyfill.js"() {
    import_keyborg = __toESM(require_dist());
    init_constants();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useFocusVisible.js
function useFocusVisible() {
  const {
    targetDocument
  } = useFluent();
  const scopeRef = React21.useRef(null);
  React21.useEffect(() => {
    if ((targetDocument === null || targetDocument === void 0 ? void 0 : targetDocument.defaultView) && scopeRef.current) {
      return applyFocusVisiblePolyfill(scopeRef.current, targetDocument.defaultView);
    }
  }, [scopeRef, targetDocument]);
  return scopeRef;
}
var React21;
var init_useFocusVisible = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useFocusVisible.js"() {
    React21 = __toESM(require_react());
    init_lib();
    init_focusVisiblePolyfill();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useFocusWithin.js
var React22;
var init_useFocusWithin = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useFocusWithin.js"() {
    React22 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useKeyboardNavAttribute.js
var import_react15;
var init_useKeyboardNavAttribute = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useKeyboardNavAttribute.js"() {
    import_react15 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useModalAttributes.js
var init_useModalAttributes = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/useModalAttributes.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/index.js
var init_hooks2 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/hooks/index.js"() {
    init_useArrowNavigationGroup();
    init_useFocusableGroup();
    init_useFocusFinders();
    init_useFocusVisible();
    init_useFocusWithin();
    init_useKeyboardNavAttribute();
    init_useModalAttributes();
    init_useTabsterAttributes();
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/colors.js
var grey, whiteAlpha, blackAlpha, white, black, darkRed, cranberry, red, darkOrange, pumpkin, peach, marigold, yellow, gold, brass, brown, forest, seafoam, lightGreen, green, darkGreen, lightTeal, teal, steel, blue, royalBlue, cornflower, navy, lavender, purple, grape, berry, lilac, pink, magenta, plum, beige, mink, platinum, anchor;
var init_colors = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/colors.js"() {
    grey = {
      "0": "#000000",
      "2": "#050505",
      "4": "#0a0a0a",
      "6": "#0f0f0f",
      "8": "#141414",
      "10": "#1a1a1a",
      "12": "#1f1f1f",
      "14": "#242424",
      "16": "#292929",
      "18": "#2e2e2e",
      "20": "#333333",
      "22": "#383838",
      "24": "#3d3d3d",
      "26": "#424242",
      "28": "#474747",
      "30": "#4d4d4d",
      "32": "#525252",
      "34": "#575757",
      "36": "#5c5c5c",
      "38": "#616161",
      "40": "#666666",
      "42": "#6b6b6b",
      "44": "#707070",
      "46": "#757575",
      "48": "#7a7a7a",
      "50": "#808080",
      "52": "#858585",
      "54": "#8a8a8a",
      "56": "#8f8f8f",
      "58": "#949494",
      "60": "#999999",
      "62": "#9e9e9e",
      "64": "#a3a3a3",
      "66": "#a8a8a8",
      "68": "#adadad",
      "70": "#b3b3b3",
      "72": "#b8b8b8",
      "74": "#bdbdbd",
      "76": "#c2c2c2",
      "78": "#c7c7c7",
      "80": "#cccccc",
      "82": "#d1d1d1",
      "84": "#d6d6d6",
      "86": "#dbdbdb",
      "88": "#e0e0e0",
      "90": "#e6e6e6",
      "92": "#ebebeb",
      "94": "#f0f0f0",
      "96": "#f5f5f5",
      "98": "#fafafa",
      "100": "#ffffff"
    };
    whiteAlpha = {
      "5": "rgba(255, 255, 255, 0.05)",
      "10": "rgba(255, 255, 255, 0.1)",
      "20": "rgba(255, 255, 255, 0.2)",
      "30": "rgba(255, 255, 255, 0.3)",
      "40": "rgba(255, 255, 255, 0.4)",
      "50": "rgba(255, 255, 255, 0.5)",
      "60": "rgba(255, 255, 255, 0.6)",
      "70": "rgba(255, 255, 255, 0.7)",
      "80": "rgba(255, 255, 255, 0.8)",
      "90": "rgba(255, 255, 255, 0.9)"
    };
    blackAlpha = {
      "5": "rgba(0, 0, 0, 0.05)",
      "10": "rgba(0, 0, 0, 0.1)",
      "20": "rgba(0, 0, 0, 0.2)",
      "30": "rgba(0, 0, 0, 0.3)",
      "40": "rgba(0, 0, 0, 0.4)",
      "50": "rgba(0, 0, 0, 0.5)",
      "60": "rgba(0, 0, 0, 0.6)",
      "70": "rgba(0, 0, 0, 0.7)",
      "80": "rgba(0, 0, 0, 0.8)",
      "90": "rgba(0, 0, 0, 0.9)"
    };
    white = "#ffffff";
    black = "#000000";
    darkRed = {
      shade50: "#130204",
      shade40: "#230308",
      shade30: "#420610",
      shade20: "#590815",
      shade10: "#690a19",
      primary: "#750b1c",
      tint10: "#861b2c",
      tint20: "#962f3f",
      tint30: "#ac4f5e",
      tint40: "#d69ca5",
      tint50: "#e9c7cd",
      tint60: "#f9f0f2"
    };
    cranberry = {
      shade50: "#200205",
      shade40: "#3b0509",
      shade30: "#6e0811",
      shade20: "#960b18",
      shade10: "#b10e1c",
      primary: "#c50f1f",
      tint10: "#cc2635",
      tint20: "#d33f4c",
      tint30: "#dc626d",
      tint40: "#eeacb2",
      tint50: "#f6d1d5",
      tint60: "#fdf3f4"
    };
    red = {
      shade50: "#210809",
      shade40: "#3f1011",
      shade30: "#751d1f",
      shade20: "#9f282b",
      shade10: "#bc2f32",
      primary: "#d13438",
      tint10: "#d7494c",
      tint20: "#dc5e62",
      tint30: "#e37d80",
      tint40: "#f1bbbc",
      tint50: "#f8dadb",
      tint60: "#fdf6f6"
    };
    darkOrange = {
      shade50: "#230900",
      shade40: "#411200",
      shade30: "#7a2101",
      shade20: "#a62d01",
      shade10: "#c43501",
      primary: "#da3b01",
      tint10: "#de501c",
      tint20: "#e36537",
      tint30: "#e9835e",
      tint40: "#f4bfab",
      tint50: "#f9dcd1",
      tint60: "#fdf6f3"
    };
    pumpkin = {
      shade50: "#200d03",
      shade40: "#3d1805",
      shade30: "#712d09",
      shade20: "#9a3d0c",
      shade10: "#b6480e",
      primary: "#ca5010",
      tint10: "#d06228",
      tint20: "#d77440",
      tint30: "#df8e64",
      tint40: "#efc4ad",
      tint50: "#f7dfd2",
      tint60: "#fdf7f4"
    };
    peach = {
      shade50: "#291600",
      shade40: "#4d2a00",
      shade30: "#8f4e00",
      shade20: "#c26a00",
      shade10: "#e67e00",
      primary: "#ff8c00",
      tint10: "#ff9a1f",
      tint20: "#ffa83d",
      tint30: "#ffba66",
      tint40: "#ffddb3",
      tint50: "#ffedd6",
      tint60: "#fffaf5"
    };
    marigold = {
      shade50: "#251a00",
      shade40: "#463100",
      shade30: "#835b00",
      shade20: "#b27c00",
      shade10: "#d39300",
      primary: "#eaa300",
      tint10: "#edad1c",
      tint20: "#efb839",
      tint30: "#f2c661",
      tint40: "#f9e2ae",
      tint50: "#fcefd3",
      tint60: "#fefbf4"
    };
    yellow = {
      primary: "#fde300",
      shade10: "#e4cc00",
      shade20: "#c0ad00",
      shade30: "#817400",
      shade40: "#4c4400",
      shade50: "#282400",
      tint10: "#fde61e",
      tint20: "#fdea3d",
      tint30: "#feee66",
      tint40: "#fef7b2",
      tint50: "#fffad6",
      tint60: "#fffef5"
    };
    gold = {
      shade50: "#1f1900",
      shade40: "#3a2f00",
      shade30: "#6c5700",
      shade20: "#937700",
      shade10: "#ae8c00",
      primary: "#c19c00",
      tint10: "#c8a718",
      tint20: "#d0b232",
      tint30: "#dac157",
      tint40: "#ecdfa5",
      tint50: "#f5eece",
      tint60: "#fdfbf2"
    };
    brass = {
      shade50: "#181202",
      shade40: "#2e2103",
      shade30: "#553e06",
      shade20: "#745408",
      shade10: "#89640a",
      primary: "#986f0b",
      tint10: "#a47d1e",
      tint20: "#b18c34",
      tint30: "#c1a256",
      tint40: "#e0cea2",
      tint50: "#efe4cb",
      tint60: "#fbf8f2"
    };
    brown = {
      shade50: "#170e07",
      shade40: "#2b1a0e",
      shade30: "#50301a",
      shade20: "#6c4123",
      shade10: "#804d29",
      primary: "#8e562e",
      tint10: "#9c663f",
      tint20: "#a97652",
      tint30: "#bb8f6f",
      tint40: "#ddc3b0",
      tint50: "#edded3",
      tint60: "#faf7f4"
    };
    forest = {
      shade50: "#0c1501",
      shade40: "#162702",
      shade30: "#294903",
      shade20: "#376304",
      shade10: "#427505",
      primary: "#498205",
      tint10: "#599116",
      tint20: "#6ba02b",
      tint30: "#85b44c",
      tint40: "#bdd99b",
      tint50: "#dbebc7",
      tint60: "#f6faf0"
    };
    seafoam = {
      shade50: "#002111",
      shade40: "#003d20",
      shade30: "#00723b",
      shade20: "#009b51",
      shade10: "#00b85f",
      primary: "#00cc6a",
      tint10: "#19d279",
      tint20: "#34d889",
      tint30: "#5ae0a0",
      tint40: "#a8f0cd",
      tint50: "#cff7e4",
      tint60: "#f3fdf8"
    };
    lightGreen = {
      shade50: "#031a02",
      shade40: "#063004",
      shade30: "#0b5a08",
      shade20: "#0e7a0b",
      shade10: "#11910d",
      primary: "#13a10e",
      tint10: "#27ac22",
      tint20: "#3db838",
      tint30: "#5ec75a",
      tint40: "#a7e3a5",
      tint50: "#cef0cd",
      tint60: "#f2fbf2"
    };
    green = {
      shade50: "#031403",
      shade40: "#052505",
      shade30: "#094509",
      shade20: "#0c5e0c",
      shade10: "#0e700e",
      primary: "#107c10",
      tint10: "#218c21",
      tint20: "#359b35",
      tint30: "#54b054",
      tint40: "#9fd89f",
      tint50: "#c9eac9",
      tint60: "#f1faf1"
    };
    darkGreen = {
      shade50: "#021102",
      shade40: "#032003",
      shade30: "#063b06",
      shade20: "#085108",
      shade10: "#0a5f0a",
      primary: "#0b6a0b",
      tint10: "#1a7c1a",
      tint20: "#2d8e2d",
      tint30: "#4da64d",
      tint40: "#9ad29a",
      tint50: "#c6e7c6",
      tint60: "#f0f9f0"
    };
    lightTeal = {
      shade50: "#001d1f",
      shade40: "#00373a",
      shade30: "#00666d",
      shade20: "#008b94",
      shade10: "#00a5af",
      primary: "#00b7c3",
      tint10: "#18bfca",
      tint20: "#32c8d1",
      tint30: "#58d3db",
      tint40: "#a6e9ed",
      tint50: "#cef3f5",
      tint60: "#f2fcfd"
    };
    teal = {
      shade50: "#001516",
      shade40: "#012728",
      shade30: "#02494c",
      shade20: "#026467",
      shade10: "#037679",
      primary: "#038387",
      tint10: "#159195",
      tint20: "#2aa0a4",
      tint30: "#4cb4b7",
      tint40: "#9bd9db",
      tint50: "#c7ebec",
      tint60: "#f0fafa"
    };
    steel = {
      shade50: "#000f12",
      shade40: "#001b22",
      shade30: "#00333f",
      shade20: "#004555",
      shade10: "#005265",
      primary: "#005b70",
      tint10: "#0f6c81",
      tint20: "#237d92",
      tint30: "#4496a9",
      tint40: "#94c8d4",
      tint50: "#c3e1e8",
      tint60: "#eff7f9"
    };
    blue = {
      shade50: "#001322",
      shade40: "#002440",
      shade30: "#004377",
      shade20: "#005ba1",
      shade10: "#006cbf",
      primary: "#0078d4",
      tint10: "#1a86d9",
      tint20: "#3595de",
      tint30: "#5caae5",
      tint40: "#a9d3f2",
      tint50: "#d0e7f8",
      tint60: "#f3f9fd"
    };
    royalBlue = {
      shade50: "#000c16",
      shade40: "#00172a",
      shade30: "#002c4e",
      shade20: "#003b6a",
      shade10: "#00467e",
      primary: "#004e8c",
      tint10: "#125e9a",
      tint20: "#286fa8",
      tint30: "#4a89ba",
      tint40: "#9abfdc",
      tint50: "#c7dced",
      tint60: "#f0f6fa"
    };
    cornflower = {
      shade50: "#0d1126",
      shade40: "#182047",
      shade30: "#2c3c85",
      shade20: "#3c51b4",
      shade10: "#4760d5",
      primary: "#4f6bed",
      tint10: "#637cef",
      tint20: "#778df1",
      tint30: "#93a4f4",
      tint40: "#c8d1fa",
      tint50: "#e1e6fc",
      tint60: "#f7f9fe"
    };
    navy = {
      shade50: "#00061d",
      shade40: "#000c36",
      shade30: "#001665",
      shade20: "#001e89",
      shade10: "#0023a2",
      primary: "#0027b4",
      tint10: "#173bbd",
      tint20: "#3050c6",
      tint30: "#546fd2",
      tint40: "#a3b2e8",
      tint50: "#ccd5f3",
      tint60: "#f2f4fc"
    };
    lavender = {
      shade50: "#120f25",
      shade40: "#221d46",
      shade30: "#3f3682",
      shade20: "#5649b0",
      shade10: "#6656d1",
      primary: "#7160e8",
      tint10: "#8172eb",
      tint20: "#9184ee",
      tint30: "#a79cf1",
      tint40: "#d2ccf8",
      tint50: "#e7e4fb",
      tint60: "#f9f8fe"
    };
    purple = {
      shade50: "#0f0717",
      shade40: "#1c0e2b",
      shade30: "#341a51",
      shade20: "#46236e",
      shade10: "#532982",
      primary: "#5c2e91",
      tint10: "#6b3f9e",
      tint20: "#7c52ab",
      tint30: "#9470bd",
      tint40: "#c6b1de",
      tint50: "#e0d3ed",
      tint60: "#f7f4fb"
    };
    grape = {
      shade50: "#160418",
      shade40: "#29072e",
      shade30: "#4c0d55",
      shade20: "#671174",
      shade10: "#7a1589",
      primary: "#881798",
      tint10: "#952aa4",
      tint20: "#a33fb1",
      tint30: "#b55fc1",
      tint40: "#d9a7e0",
      tint50: "#eaceef",
      tint60: "#faf2fb"
    };
    berry = {
      shade50: "#1f091d",
      shade40: "#3a1136",
      shade30: "#6d2064",
      shade20: "#932b88",
      shade10: "#af33a1",
      primary: "#c239b3",
      tint10: "#c94cbc",
      tint20: "#d161c4",
      tint30: "#da7ed0",
      tint40: "#edbbe7",
      tint50: "#f5daf2",
      tint60: "#fdf5fc"
    };
    lilac = {
      shade50: "#1c0b1f",
      shade40: "#35153a",
      shade30: "#63276d",
      shade20: "#863593",
      shade10: "#9f3faf",
      primary: "#b146c2",
      tint10: "#ba58c9",
      tint20: "#c36bd1",
      tint30: "#cf87da",
      tint40: "#e6bfed",
      tint50: "#f2dcf5",
      tint60: "#fcf6fd"
    };
    pink = {
      shade50: "#24091b",
      shade40: "#441232",
      shade30: "#80215d",
      shade20: "#ad2d7e",
      shade10: "#cd3595",
      primary: "#e43ba6",
      tint10: "#e750b0",
      tint20: "#ea66ba",
      tint30: "#ef85c8",
      tint40: "#f7c0e3",
      tint50: "#fbddf0",
      tint60: "#fef6fb"
    };
    magenta = {
      shade50: "#1f0013",
      shade40: "#390024",
      shade30: "#6b0043",
      shade20: "#91005a",
      shade10: "#ac006b",
      primary: "#bf0077",
      tint10: "#c71885",
      tint20: "#ce3293",
      tint30: "#d957a8",
      tint40: "#eca5d1",
      tint50: "#f5cee6",
      tint60: "#fcf2f9"
    };
    plum = {
      shade50: "#13000c",
      shade40: "#240017",
      shade30: "#43002b",
      shade20: "#5a003b",
      shade10: "#6b0045",
      primary: "#77004d",
      tint10: "#87105d",
      tint20: "#98246f",
      tint30: "#ad4589",
      tint40: "#d696c0",
      tint50: "#e9c4dc",
      tint60: "#faf0f6"
    };
    beige = {
      shade50: "#141313",
      shade40: "#252323",
      shade30: "#444241",
      shade20: "#5d5958",
      shade10: "#6e6968",
      primary: "#7a7574",
      tint10: "#8a8584",
      tint20: "#9a9594",
      tint30: "#afabaa",
      tint40: "#d7d4d4",
      tint50: "#eae8e8",
      tint60: "#faf9f9"
    };
    mink = {
      shade50: "#0f0e0e",
      shade40: "#1c1b1a",
      shade30: "#343231",
      shade20: "#474443",
      shade10: "#54514f",
      primary: "#5d5a58",
      tint10: "#706d6b",
      tint20: "#84817e",
      tint30: "#9e9b99",
      tint40: "#cecccb",
      tint50: "#e5e4e3",
      tint60: "#f8f8f8"
    };
    platinum = {
      shade50: "#111314",
      shade40: "#1f2426",
      shade30: "#3b4447",
      shade20: "#505c60",
      shade10: "#5f6d71",
      primary: "#69797e",
      tint10: "#79898d",
      tint20: "#89989d",
      tint30: "#a0adb2",
      tint40: "#cdd6d8",
      tint50: "#e4e9ea",
      tint60: "#f8f9fa"
    };
    anchor = {
      shade50: "#090a0b",
      shade40: "#111315",
      shade30: "#202427",
      shade20: "#2b3135",
      shade10: "#333a3f",
      primary: "#394146",
      tint10: "#4d565c",
      tint20: "#626c72",
      tint30: "#808a90",
      tint40: "#bcc3c7",
      tint50: "#dbdfe1",
      tint60: "#f6f7f8"
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/colorPalette.js
var statusSharedColors, personaSharedColors;
var init_colorPalette = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/colorPalette.js"() {
    init_colors();
    statusSharedColors = {
      red,
      green,
      darkOrange,
      yellow,
      berry,
      lightGreen,
      marigold
    };
    personaSharedColors = {
      darkRed,
      cranberry,
      pumpkin,
      peach,
      gold,
      brass,
      brown,
      forest,
      seafoam,
      darkGreen,
      lightTeal,
      teal,
      steel,
      blue,
      royalBlue,
      cornflower,
      navy,
      lavender,
      purple,
      grape,
      lilac,
      pink,
      magenta,
      plum,
      beige,
      mink,
      platinum,
      anchor
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/sharedColorNames.js
var statusSharedColorNames, personaSharedColorNames;
var init_sharedColorNames = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/sharedColorNames.js"() {
    statusSharedColorNames = ["red", "green", "darkOrange", "yellow", "berry", "lightGreen", "marigold"];
    personaSharedColorNames = ["darkRed", "cranberry", "pumpkin", "peach", "gold", "brass", "brown", "forest", "seafoam", "darkGreen", "lightTeal", "teal", "steel", "blue", "royalBlue", "cornflower", "navy", "lavender", "purple", "grape", "lilac", "pink", "magenta", "plum", "beige", "mink", "platinum", "anchor"];
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/alias/lightColorPalette.js
var statusColorPaletteTokens, personaColorPaletteTokens, colorPaletteTokens;
var init_lightColorPalette = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/alias/lightColorPalette.js"() {
    init_colorPalette();
    init_sharedColorNames();
    statusColorPaletteTokens = /* @__PURE__ */ statusSharedColorNames.reduce((acc, sharedColor) => {
      const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
      const sharedColorTokens = {
        [`colorPalette${color}Background1`]: statusSharedColors[sharedColor].tint60,
        [`colorPalette${color}Background2`]: statusSharedColors[sharedColor].tint40,
        [`colorPalette${color}Background3`]: statusSharedColors[sharedColor].primary,
        [`colorPalette${color}Foreground1`]: statusSharedColors[sharedColor].shade10,
        [`colorPalette${color}Foreground2`]: statusSharedColors[sharedColor].shade30,
        [`colorPalette${color}Foreground3`]: statusSharedColors[sharedColor].primary,
        [`colorPalette${color}BorderActive`]: statusSharedColors[sharedColor].primary,
        [`colorPalette${color}Border1`]: statusSharedColors[sharedColor].tint40,
        [`colorPalette${color}Border2`]: statusSharedColors[sharedColor].primary
      };
      return Object.assign(acc, sharedColorTokens);
    }, {});
    statusColorPaletteTokens.colorPaletteYellowForeground1 = statusSharedColors.yellow.shade30;
    statusColorPaletteTokens.colorPaletteRedForegroundInverted = statusSharedColors.red.tint20;
    statusColorPaletteTokens.colorPaletteGreenForegroundInverted = statusSharedColors.green.tint20;
    statusColorPaletteTokens.colorPaletteYellowForegroundInverted = statusSharedColors.yellow.tint40;
    personaColorPaletteTokens = /* @__PURE__ */ personaSharedColorNames.reduce((acc, sharedColor) => {
      const color = sharedColor.slice(0, 1).toUpperCase() + sharedColor.slice(1);
      const sharedColorTokens = {
        [`colorPalette${color}Background2`]: personaSharedColors[sharedColor].tint40,
        [`colorPalette${color}Foreground2`]: personaSharedColors[sharedColor].shade30,
        [`colorPalette${color}BorderActive`]: personaSharedColors[sharedColor].primary
      };
      return Object.assign(acc, sharedColorTokens);
    }, {});
    colorPaletteTokens = {
      ...statusColorPaletteTokens,
      ...personaColorPaletteTokens
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/alias/lightColor.js
var generateColorTokens;
var init_lightColor = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/alias/lightColor.js"() {
    init_colors();
    generateColorTokens = (brand) => ({
      colorNeutralForeground1: grey[14],
      colorNeutralForeground1Hover: grey[14],
      colorNeutralForeground1Pressed: grey[14],
      colorNeutralForeground1Selected: grey[14],
      colorNeutralForeground2: grey[26],
      colorNeutralForeground2Hover: grey[14],
      colorNeutralForeground2Pressed: grey[14],
      colorNeutralForeground2Selected: grey[14],
      colorNeutralForeground2BrandHover: brand[80],
      colorNeutralForeground2BrandPressed: brand[70],
      colorNeutralForeground2BrandSelected: brand[80],
      colorNeutralForeground3: grey[38],
      colorNeutralForeground3Hover: grey[26],
      colorNeutralForeground3Pressed: grey[26],
      colorNeutralForeground3Selected: grey[26],
      colorNeutralForeground3BrandHover: brand[80],
      colorNeutralForeground3BrandPressed: brand[70],
      colorNeutralForeground3BrandSelected: brand[80],
      colorNeutralForeground4: grey[44],
      colorNeutralForegroundDisabled: grey[74],
      colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
      colorBrandForegroundLink: brand[70],
      colorBrandForegroundLinkHover: brand[60],
      colorBrandForegroundLinkPressed: brand[40],
      colorBrandForegroundLinkSelected: brand[70],
      colorNeutralForeground2Link: grey[26],
      colorNeutralForeground2LinkHover: grey[14],
      colorNeutralForeground2LinkPressed: grey[14],
      colorNeutralForeground2LinkSelected: grey[14],
      colorCompoundBrandForeground1: brand[80],
      colorCompoundBrandForeground1Hover: brand[70],
      colorCompoundBrandForeground1Pressed: brand[60],
      colorBrandForeground1: brand[80],
      colorBrandForeground2: brand[70],
      colorNeutralForeground1Static: grey[14],
      colorNeutralForegroundStaticInverted: white,
      colorNeutralForegroundInverted: white,
      colorNeutralForegroundInvertedHover: white,
      colorNeutralForegroundInvertedPressed: white,
      colorNeutralForegroundInvertedSelected: white,
      colorNeutralForegroundInverted2: white,
      colorNeutralForegroundOnBrand: white,
      colorNeutralForegroundInvertedLink: white,
      colorNeutralForegroundInvertedLinkHover: white,
      colorNeutralForegroundInvertedLinkPressed: white,
      colorNeutralForegroundInvertedLinkSelected: white,
      colorBrandForegroundInverted: brand[100],
      colorBrandForegroundInvertedHover: brand[110],
      colorBrandForegroundInvertedPressed: brand[100],
      colorBrandForegroundOnLight: brand[80],
      colorBrandForegroundOnLightHover: brand[70],
      colorBrandForegroundOnLightPressed: brand[50],
      colorBrandForegroundOnLightSelected: brand[60],
      colorNeutralBackground1: white,
      colorNeutralBackground1Hover: grey[96],
      colorNeutralBackground1Pressed: grey[88],
      colorNeutralBackground1Selected: grey[92],
      colorNeutralBackground2: grey[98],
      colorNeutralBackground2Hover: grey[94],
      colorNeutralBackground2Pressed: grey[86],
      colorNeutralBackground2Selected: grey[90],
      colorNeutralBackground3: grey[96],
      colorNeutralBackground3Hover: grey[92],
      colorNeutralBackground3Pressed: grey[84],
      colorNeutralBackground3Selected: grey[88],
      colorNeutralBackground4: grey[94],
      colorNeutralBackground4Hover: grey[98],
      colorNeutralBackground4Pressed: grey[96],
      colorNeutralBackground4Selected: white,
      colorNeutralBackground5: grey[92],
      colorNeutralBackground5Hover: grey[96],
      colorNeutralBackground5Pressed: grey[94],
      colorNeutralBackground5Selected: grey[98],
      colorNeutralBackground6: grey[90],
      colorNeutralBackgroundInverted: grey[16],
      colorNeutralBackgroundStatic: grey[20],
      colorSubtleBackground: "transparent",
      colorSubtleBackgroundHover: grey[96],
      colorSubtleBackgroundPressed: grey[88],
      colorSubtleBackgroundSelected: grey[92],
      colorSubtleBackgroundLightAlphaHover: whiteAlpha[70],
      colorSubtleBackgroundLightAlphaPressed: whiteAlpha[50],
      colorSubtleBackgroundLightAlphaSelected: "transparent",
      colorSubtleBackgroundInverted: "transparent",
      colorSubtleBackgroundInvertedHover: blackAlpha[10],
      colorSubtleBackgroundInvertedPressed: blackAlpha[30],
      colorSubtleBackgroundInvertedSelected: blackAlpha[20],
      colorTransparentBackground: "transparent",
      colorTransparentBackgroundHover: "transparent",
      colorTransparentBackgroundPressed: "transparent",
      colorTransparentBackgroundSelected: "transparent",
      colorNeutralBackgroundDisabled: grey[94],
      colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
      colorNeutralStencil1: grey[90],
      colorNeutralStencil2: grey[98],
      colorNeutralStencil1Alpha: blackAlpha[10],
      colorNeutralStencil2Alpha: blackAlpha[5],
      colorBackgroundOverlay: blackAlpha[40],
      colorScrollbarOverlay: blackAlpha[50],
      colorBrandBackground: brand[80],
      colorBrandBackgroundHover: brand[70],
      colorBrandBackgroundPressed: brand[40],
      colorBrandBackgroundSelected: brand[60],
      colorCompoundBrandBackground: brand[80],
      colorCompoundBrandBackgroundHover: brand[70],
      colorCompoundBrandBackgroundPressed: brand[60],
      colorBrandBackgroundStatic: brand[80],
      colorBrandBackground2: brand[160],
      colorBrandBackgroundInverted: white,
      colorBrandBackgroundInvertedHover: brand[160],
      colorBrandBackgroundInvertedPressed: brand[140],
      colorBrandBackgroundInvertedSelected: brand[150],
      colorNeutralStrokeAccessible: grey[38],
      colorNeutralStrokeAccessibleHover: grey[34],
      colorNeutralStrokeAccessiblePressed: grey[30],
      colorNeutralStrokeAccessibleSelected: brand[80],
      colorNeutralStroke1: grey[82],
      colorNeutralStroke1Hover: grey[78],
      colorNeutralStroke1Pressed: grey[70],
      colorNeutralStroke1Selected: grey[74],
      colorNeutralStroke2: grey[88],
      colorNeutralStroke3: grey[94],
      colorNeutralStrokeOnBrand: white,
      colorNeutralStrokeOnBrand2: white,
      colorNeutralStrokeOnBrand2Hover: white,
      colorNeutralStrokeOnBrand2Pressed: white,
      colorNeutralStrokeOnBrand2Selected: white,
      colorBrandStroke1: brand[80],
      colorBrandStroke2: brand[140],
      colorCompoundBrandStroke: brand[80],
      colorCompoundBrandStrokeHover: brand[70],
      colorCompoundBrandStrokePressed: brand[60],
      colorNeutralStrokeDisabled: grey[88],
      colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
      colorTransparentStroke: "transparent",
      colorTransparentStrokeInteractive: "transparent",
      colorTransparentStrokeDisabled: "transparent",
      colorStrokeFocus1: white,
      colorStrokeFocus2: black,
      colorNeutralShadowAmbient: "rgba(0,0,0,0.12)",
      colorNeutralShadowKey: "rgba(0,0,0,0.14)",
      colorNeutralShadowAmbientLighter: "rgba(0,0,0,0.06)",
      colorNeutralShadowKeyLighter: "rgba(0,0,0,0.07)",
      colorNeutralShadowAmbientDarker: "rgba(0,0,0,0.20)",
      colorNeutralShadowKeyDarker: "rgba(0,0,0,0.24)",
      colorBrandShadowAmbient: "rgba(0,0,0,0.30)",
      colorBrandShadowKey: "rgba(0,0,0,0.25)"
      // rgba(0,0,0,0.25) undefined
    });
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/borderRadius.js
var borderRadius;
var init_borderRadius = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/borderRadius.js"() {
    borderRadius = {
      borderRadiusNone: "0",
      borderRadiusSmall: "2px",
      borderRadiusMedium: "4px",
      borderRadiusLarge: "6px",
      borderRadiusXLarge: "8px",
      borderRadiusCircular: "10000px"
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/curves.js
var curves;
var init_curves = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/curves.js"() {
    curves = {
      curveAccelerateMax: "cubic-bezier(1,0,1,1)",
      curveAccelerateMid: "cubic-bezier(0.7,0,1,0.5)",
      curveAccelerateMin: "cubic-bezier(0.8,0,1,1)",
      curveDecelerateMax: "cubic-bezier(0,0,0,1)",
      curveDecelerateMid: "cubic-bezier(0.1,0.9,0.2,1)",
      curveDecelerateMin: "cubic-bezier(0.33,0,0.1,1)",
      curveEasyEaseMax: "cubic-bezier(0.8,0,0.1,1)",
      curveEasyEase: "cubic-bezier(0.33,0,0.67,1)",
      curveLinear: "cubic-bezier(0,0,1,1)"
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/durations.js
var durations;
var init_durations = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/durations.js"() {
    durations = {
      durationUltraFast: "50ms",
      durationFaster: "100ms",
      durationFast: "150ms",
      durationNormal: "200ms",
      durationSlow: "300ms",
      durationSlower: "400ms",
      durationUltraSlow: "500ms"
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/fonts.js
var fontSizes, lineHeights, fontWeights, fontFamilies;
var init_fonts = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/fonts.js"() {
    fontSizes = {
      fontSizeBase100: "10px",
      fontSizeBase200: "12px",
      fontSizeBase300: "14px",
      fontSizeBase400: "16px",
      fontSizeBase500: "20px",
      fontSizeBase600: "24px",
      fontSizeHero700: "28px",
      fontSizeHero800: "32px",
      fontSizeHero900: "40px",
      fontSizeHero1000: "68px"
    };
    lineHeights = {
      lineHeightBase100: "14px",
      lineHeightBase200: "16px",
      lineHeightBase300: "20px",
      lineHeightBase400: "22px",
      lineHeightBase500: "28px",
      lineHeightBase600: "32px",
      lineHeightHero700: "36px",
      lineHeightHero800: "40px",
      lineHeightHero900: "52px",
      lineHeightHero1000: "92px"
    };
    fontWeights = {
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightSemibold: 600,
      fontWeightBold: 700
    };
    fontFamilies = {
      fontFamilyBase: (
        // eslint-disable-next-line @fluentui/max-len
        "'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"
      ),
      fontFamilyMonospace: "Consolas, 'Courier New', Courier, monospace",
      fontFamilyNumeric: (
        // eslint-disable-next-line @fluentui/max-len
        "Bahnschrift, 'Segoe UI', 'Segoe UI Web (West European)', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif"
      )
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/spacings.js
var spacings, horizontalSpacings, verticalSpacings;
var init_spacings = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/spacings.js"() {
    spacings = {
      none: "0",
      xxs: "2px",
      xs: "4px",
      sNudge: "6px",
      s: "8px",
      mNudge: "10px",
      m: "12px",
      l: "16px",
      xl: "20px",
      xxl: "24px",
      xxxl: "32px"
    };
    horizontalSpacings = {
      spacingHorizontalNone: spacings.none,
      spacingHorizontalXXS: spacings.xxs,
      spacingHorizontalXS: spacings.xs,
      spacingHorizontalSNudge: spacings.sNudge,
      spacingHorizontalS: spacings.s,
      spacingHorizontalMNudge: spacings.mNudge,
      spacingHorizontalM: spacings.m,
      spacingHorizontalL: spacings.l,
      spacingHorizontalXL: spacings.xl,
      spacingHorizontalXXL: spacings.xxl,
      spacingHorizontalXXXL: spacings.xxxl
    };
    verticalSpacings = {
      spacingVerticalNone: spacings.none,
      spacingVerticalXXS: spacings.xxs,
      spacingVerticalXS: spacings.xs,
      spacingVerticalSNudge: spacings.sNudge,
      spacingVerticalS: spacings.s,
      spacingVerticalMNudge: spacings.mNudge,
      spacingVerticalM: spacings.m,
      spacingVerticalL: spacings.l,
      spacingVerticalXL: spacings.xl,
      spacingVerticalXXL: spacings.xxl,
      spacingVerticalXXXL: spacings.xxxl
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/strokeWidths.js
var strokeWidths;
var init_strokeWidths = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/strokeWidths.js"() {
    strokeWidths = {
      strokeWidthThin: "1px",
      strokeWidthThick: "2px",
      strokeWidthThicker: "3px",
      strokeWidthThickest: "4px"
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/tokens.js
var tokens;
var init_tokens = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/tokens.js"() {
    tokens = {
      // Color tokens
      colorNeutralForeground1: "var(--colorNeutralForeground1)",
      colorNeutralForeground1Hover: "var(--colorNeutralForeground1Hover)",
      colorNeutralForeground1Pressed: "var(--colorNeutralForeground1Pressed)",
      colorNeutralForeground1Selected: "var(--colorNeutralForeground1Selected)",
      colorNeutralForeground2: "var(--colorNeutralForeground2)",
      colorNeutralForeground2Hover: "var(--colorNeutralForeground2Hover)",
      colorNeutralForeground2Pressed: "var(--colorNeutralForeground2Pressed)",
      colorNeutralForeground2Selected: "var(--colorNeutralForeground2Selected)",
      colorNeutralForeground2BrandHover: "var(--colorNeutralForeground2BrandHover)",
      colorNeutralForeground2BrandPressed: "var(--colorNeutralForeground2BrandPressed)",
      colorNeutralForeground2BrandSelected: "var(--colorNeutralForeground2BrandSelected)",
      colorNeutralForeground3: "var(--colorNeutralForeground3)",
      colorNeutralForeground3Hover: "var(--colorNeutralForeground3Hover)",
      colorNeutralForeground3Pressed: "var(--colorNeutralForeground3Pressed)",
      colorNeutralForeground3Selected: "var(--colorNeutralForeground3Selected)",
      colorNeutralForeground3BrandHover: "var(--colorNeutralForeground3BrandHover)",
      colorNeutralForeground3BrandPressed: "var(--colorNeutralForeground3BrandPressed)",
      colorNeutralForeground3BrandSelected: "var(--colorNeutralForeground3BrandSelected)",
      colorNeutralForeground4: "var(--colorNeutralForeground4)",
      colorNeutralForegroundDisabled: "var(--colorNeutralForegroundDisabled)",
      colorBrandForegroundLink: "var(--colorBrandForegroundLink)",
      colorBrandForegroundLinkHover: "var(--colorBrandForegroundLinkHover)",
      colorBrandForegroundLinkPressed: "var(--colorBrandForegroundLinkPressed)",
      colorBrandForegroundLinkSelected: "var(--colorBrandForegroundLinkSelected)",
      colorNeutralForeground2Link: "var(--colorNeutralForeground2Link)",
      colorNeutralForeground2LinkHover: "var(--colorNeutralForeground2LinkHover)",
      colorNeutralForeground2LinkPressed: "var(--colorNeutralForeground2LinkPressed)",
      colorNeutralForeground2LinkSelected: "var(--colorNeutralForeground2LinkSelected)",
      colorCompoundBrandForeground1: "var(--colorCompoundBrandForeground1)",
      colorCompoundBrandForeground1Hover: "var(--colorCompoundBrandForeground1Hover)",
      colorCompoundBrandForeground1Pressed: "var(--colorCompoundBrandForeground1Pressed)",
      colorNeutralForegroundOnBrand: "var(--colorNeutralForegroundOnBrand)",
      colorNeutralForegroundInverted: "var(--colorNeutralForegroundInverted)",
      colorNeutralForegroundInvertedHover: "var(--colorNeutralForegroundInvertedHover)",
      colorNeutralForegroundInvertedPressed: "var(--colorNeutralForegroundInvertedPressed)",
      colorNeutralForegroundInvertedSelected: "var(--colorNeutralForegroundInvertedSelected)",
      colorNeutralForegroundInverted2: "var(--colorNeutralForegroundInverted2)",
      colorNeutralForegroundStaticInverted: "var(--colorNeutralForegroundStaticInverted)",
      colorNeutralForegroundInvertedLink: "var(--colorNeutralForegroundInvertedLink)",
      colorNeutralForegroundInvertedLinkHover: "var(--colorNeutralForegroundInvertedLinkHover)",
      colorNeutralForegroundInvertedLinkPressed: "var(--colorNeutralForegroundInvertedLinkPressed)",
      colorNeutralForegroundInvertedLinkSelected: "var(--colorNeutralForegroundInvertedLinkSelected)",
      colorNeutralForegroundInvertedDisabled: "var(--colorNeutralForegroundInvertedDisabled)",
      colorBrandForeground1: "var(--colorBrandForeground1)",
      colorBrandForeground2: "var(--colorBrandForeground2)",
      colorNeutralForeground1Static: "var(--colorNeutralForeground1Static)",
      colorBrandForegroundInverted: "var(--colorBrandForegroundInverted)",
      colorBrandForegroundInvertedHover: "var(--colorBrandForegroundInvertedHover)",
      colorBrandForegroundInvertedPressed: "var(--colorBrandForegroundInvertedPressed)",
      colorBrandForegroundOnLight: "var(--colorBrandForegroundOnLight)",
      colorBrandForegroundOnLightHover: "var(--colorBrandForegroundOnLightHover)",
      colorBrandForegroundOnLightPressed: "var(--colorBrandForegroundOnLightPressed)",
      colorBrandForegroundOnLightSelected: "var(--colorBrandForegroundOnLightSelected)",
      colorNeutralBackground1: "var(--colorNeutralBackground1)",
      colorNeutralBackground1Hover: "var(--colorNeutralBackground1Hover)",
      colorNeutralBackground1Pressed: "var(--colorNeutralBackground1Pressed)",
      colorNeutralBackground1Selected: "var(--colorNeutralBackground1Selected)",
      colorNeutralBackground2: "var(--colorNeutralBackground2)",
      colorNeutralBackground2Hover: "var(--colorNeutralBackground2Hover)",
      colorNeutralBackground2Pressed: "var(--colorNeutralBackground2Pressed)",
      colorNeutralBackground2Selected: "var(--colorNeutralBackground2Selected)",
      colorNeutralBackground3: "var(--colorNeutralBackground3)",
      colorNeutralBackground3Hover: "var(--colorNeutralBackground3Hover)",
      colorNeutralBackground3Pressed: "var(--colorNeutralBackground3Pressed)",
      colorNeutralBackground3Selected: "var(--colorNeutralBackground3Selected)",
      colorNeutralBackground4: "var(--colorNeutralBackground4)",
      colorNeutralBackground4Hover: "var(--colorNeutralBackground4Hover)",
      colorNeutralBackground4Pressed: "var(--colorNeutralBackground4Pressed)",
      colorNeutralBackground4Selected: "var(--colorNeutralBackground4Selected)",
      colorNeutralBackground5: "var(--colorNeutralBackground5)",
      colorNeutralBackground5Hover: "var(--colorNeutralBackground5Hover)",
      colorNeutralBackground5Pressed: "var(--colorNeutralBackground5Pressed)",
      colorNeutralBackground5Selected: "var(--colorNeutralBackground5Selected)",
      colorNeutralBackground6: "var(--colorNeutralBackground6)",
      colorNeutralBackgroundStatic: "var(--colorNeutralBackgroundStatic)",
      colorNeutralBackgroundInverted: "var(--colorNeutralBackgroundInverted)",
      colorSubtleBackground: "var(--colorSubtleBackground)",
      colorSubtleBackgroundHover: "var(--colorSubtleBackgroundHover)",
      colorSubtleBackgroundPressed: "var(--colorSubtleBackgroundPressed)",
      colorSubtleBackgroundSelected: "var(--colorSubtleBackgroundSelected)",
      colorSubtleBackgroundLightAlphaHover: "var(--colorSubtleBackgroundLightAlphaHover)",
      colorSubtleBackgroundLightAlphaPressed: "var(--colorSubtleBackgroundLightAlphaPressed)",
      colorSubtleBackgroundLightAlphaSelected: "var(--colorSubtleBackgroundLightAlphaSelected)",
      colorSubtleBackgroundInverted: "var(--colorSubtleBackgroundInverted)",
      colorSubtleBackgroundInvertedHover: "var(--colorSubtleBackgroundInvertedHover)",
      colorSubtleBackgroundInvertedPressed: "var(--colorSubtleBackgroundInvertedPressed)",
      colorSubtleBackgroundInvertedSelected: "var(--colorSubtleBackgroundInvertedSelected)",
      colorTransparentBackground: "var(--colorTransparentBackground)",
      colorTransparentBackgroundHover: "var(--colorTransparentBackgroundHover)",
      colorTransparentBackgroundPressed: "var(--colorTransparentBackgroundPressed)",
      colorTransparentBackgroundSelected: "var(--colorTransparentBackgroundSelected)",
      colorNeutralBackgroundDisabled: "var(--colorNeutralBackgroundDisabled)",
      colorNeutralBackgroundInvertedDisabled: "var(--colorNeutralBackgroundInvertedDisabled)",
      colorNeutralStencil1: "var(--colorNeutralStencil1)",
      colorNeutralStencil2: "var(--colorNeutralStencil2)",
      colorNeutralStencil1Alpha: "var(--colorNeutralStencil1Alpha)",
      colorNeutralStencil2Alpha: "var(--colorNeutralStencil2Alpha)",
      colorBackgroundOverlay: "var(--colorBackgroundOverlay)",
      colorScrollbarOverlay: "var(--colorScrollbarOverlay)",
      colorBrandBackground: "var(--colorBrandBackground)",
      colorBrandBackgroundHover: "var(--colorBrandBackgroundHover)",
      colorBrandBackgroundPressed: "var(--colorBrandBackgroundPressed)",
      colorBrandBackgroundSelected: "var(--colorBrandBackgroundSelected)",
      colorCompoundBrandBackground: "var(--colorCompoundBrandBackground)",
      colorCompoundBrandBackgroundHover: "var(--colorCompoundBrandBackgroundHover)",
      colorCompoundBrandBackgroundPressed: "var(--colorCompoundBrandBackgroundPressed)",
      colorBrandBackgroundStatic: "var(--colorBrandBackgroundStatic)",
      colorBrandBackground2: "var(--colorBrandBackground2)",
      colorBrandBackgroundInverted: "var(--colorBrandBackgroundInverted)",
      colorBrandBackgroundInvertedHover: "var(--colorBrandBackgroundInvertedHover)",
      colorBrandBackgroundInvertedPressed: "var(--colorBrandBackgroundInvertedPressed)",
      colorBrandBackgroundInvertedSelected: "var(--colorBrandBackgroundInvertedSelected)",
      colorNeutralStrokeAccessible: "var(--colorNeutralStrokeAccessible)",
      colorNeutralStrokeAccessibleHover: "var(--colorNeutralStrokeAccessibleHover)",
      colorNeutralStrokeAccessiblePressed: "var(--colorNeutralStrokeAccessiblePressed)",
      colorNeutralStrokeAccessibleSelected: "var(--colorNeutralStrokeAccessibleSelected)",
      colorNeutralStroke1: "var(--colorNeutralStroke1)",
      colorNeutralStroke1Hover: "var(--colorNeutralStroke1Hover)",
      colorNeutralStroke1Pressed: "var(--colorNeutralStroke1Pressed)",
      colorNeutralStroke1Selected: "var(--colorNeutralStroke1Selected)",
      colorNeutralStroke2: "var(--colorNeutralStroke2)",
      colorNeutralStroke3: "var(--colorNeutralStroke3)",
      colorNeutralStrokeOnBrand: "var(--colorNeutralStrokeOnBrand)",
      colorNeutralStrokeOnBrand2: "var(--colorNeutralStrokeOnBrand2)",
      colorNeutralStrokeOnBrand2Hover: "var(--colorNeutralStrokeOnBrand2Hover)",
      colorNeutralStrokeOnBrand2Pressed: "var(--colorNeutralStrokeOnBrand2Pressed)",
      colorNeutralStrokeOnBrand2Selected: "var(--colorNeutralStrokeOnBrand2Selected)",
      colorBrandStroke1: "var(--colorBrandStroke1)",
      colorBrandStroke2: "var(--colorBrandStroke2)",
      colorCompoundBrandStroke: "var(--colorCompoundBrandStroke)",
      colorCompoundBrandStrokeHover: "var(--colorCompoundBrandStrokeHover)",
      colorCompoundBrandStrokePressed: "var(--colorCompoundBrandStrokePressed)",
      colorNeutralStrokeDisabled: "var(--colorNeutralStrokeDisabled)",
      colorNeutralStrokeInvertedDisabled: "var(--colorNeutralStrokeInvertedDisabled)",
      colorTransparentStroke: "var(--colorTransparentStroke)",
      colorTransparentStrokeInteractive: "var(--colorTransparentStrokeInteractive)",
      colorTransparentStrokeDisabled: "var(--colorTransparentStrokeDisabled)",
      colorStrokeFocus1: "var(--colorStrokeFocus1)",
      colorStrokeFocus2: "var(--colorStrokeFocus2)",
      colorNeutralShadowAmbient: "var(--colorNeutralShadowAmbient)",
      colorNeutralShadowKey: "var(--colorNeutralShadowKey)",
      colorNeutralShadowAmbientLighter: "var(--colorNeutralShadowAmbientLighter)",
      colorNeutralShadowKeyLighter: "var(--colorNeutralShadowKeyLighter)",
      colorNeutralShadowAmbientDarker: "var(--colorNeutralShadowAmbientDarker)",
      colorNeutralShadowKeyDarker: "var(--colorNeutralShadowKeyDarker)",
      colorBrandShadowAmbient: "var(--colorBrandShadowAmbient)",
      colorBrandShadowKey: "var(--colorBrandShadowKey)",
      // Color palette tokens
      // Color palette red tokens
      colorPaletteRedBackground1: "var(--colorPaletteRedBackground1)",
      colorPaletteRedBackground2: "var(--colorPaletteRedBackground2)",
      colorPaletteRedBackground3: "var(--colorPaletteRedBackground3)",
      colorPaletteRedBorderActive: "var(--colorPaletteRedBorderActive)",
      colorPaletteRedBorder1: "var(--colorPaletteRedBorder1)",
      colorPaletteRedBorder2: "var(--colorPaletteRedBorder2)",
      colorPaletteRedForeground1: "var(--colorPaletteRedForeground1)",
      colorPaletteRedForeground2: "var(--colorPaletteRedForeground2)",
      colorPaletteRedForeground3: "var(--colorPaletteRedForeground3)",
      colorPaletteRedForegroundInverted: "var(--colorPaletteRedForegroundInverted)",
      // Color palette green tokens
      colorPaletteGreenBackground1: "var(--colorPaletteGreenBackground1)",
      colorPaletteGreenBackground2: "var(--colorPaletteGreenBackground2)",
      colorPaletteGreenBackground3: "var(--colorPaletteGreenBackground3)",
      colorPaletteGreenBorderActive: "var(--colorPaletteGreenBorderActive)",
      colorPaletteGreenBorder1: "var(--colorPaletteGreenBorder1)",
      colorPaletteGreenBorder2: "var(--colorPaletteGreenBorder2)",
      colorPaletteGreenForeground1: "var(--colorPaletteGreenForeground1)",
      colorPaletteGreenForeground2: "var(--colorPaletteGreenForeground2)",
      colorPaletteGreenForeground3: "var(--colorPaletteGreenForeground3)",
      colorPaletteGreenForegroundInverted: "var(--colorPaletteGreenForegroundInverted)",
      // Color palette dark orange tokens
      colorPaletteDarkOrangeBackground1: "var(--colorPaletteDarkOrangeBackground1)",
      colorPaletteDarkOrangeBackground2: "var(--colorPaletteDarkOrangeBackground2)",
      colorPaletteDarkOrangeBackground3: "var(--colorPaletteDarkOrangeBackground3)",
      colorPaletteDarkOrangeBorderActive: "var(--colorPaletteDarkOrangeBorderActive)",
      colorPaletteDarkOrangeBorder1: "var(--colorPaletteDarkOrangeBorder1)",
      colorPaletteDarkOrangeBorder2: "var(--colorPaletteDarkOrangeBorder2)",
      colorPaletteDarkOrangeForeground1: "var(--colorPaletteDarkOrangeForeground1)",
      colorPaletteDarkOrangeForeground2: "var(--colorPaletteDarkOrangeForeground2)",
      colorPaletteDarkOrangeForeground3: "var(--colorPaletteDarkOrangeForeground3)",
      // Color palette yellow tokens
      colorPaletteYellowBackground1: "var(--colorPaletteYellowBackground1)",
      colorPaletteYellowBackground2: "var(--colorPaletteYellowBackground2)",
      colorPaletteYellowBackground3: "var(--colorPaletteYellowBackground3)",
      colorPaletteYellowBorderActive: "var(--colorPaletteYellowBorderActive)",
      colorPaletteYellowBorder1: "var(--colorPaletteYellowBorder1)",
      colorPaletteYellowBorder2: "var(--colorPaletteYellowBorder2)",
      colorPaletteYellowForeground1: "var(--colorPaletteYellowForeground1)",
      colorPaletteYellowForeground2: "var(--colorPaletteYellowForeground2)",
      colorPaletteYellowForeground3: "var(--colorPaletteYellowForeground3)",
      colorPaletteYellowForegroundInverted: "var(--colorPaletteYellowForegroundInverted)",
      // Color palette berry tokens
      colorPaletteBerryBackground1: "var(--colorPaletteBerryBackground1)",
      colorPaletteBerryBackground2: "var(--colorPaletteBerryBackground2)",
      colorPaletteBerryBackground3: "var(--colorPaletteBerryBackground3)",
      colorPaletteBerryBorderActive: "var(--colorPaletteBerryBorderActive)",
      colorPaletteBerryBorder1: "var(--colorPaletteBerryBorder1)",
      colorPaletteBerryBorder2: "var(--colorPaletteBerryBorder2)",
      colorPaletteBerryForeground1: "var(--colorPaletteBerryForeground1)",
      colorPaletteBerryForeground2: "var(--colorPaletteBerryForeground2)",
      colorPaletteBerryForeground3: "var(--colorPaletteBerryForeground3)",
      // Color palette marigold tokens
      colorPaletteMarigoldBackground1: "var(--colorPaletteMarigoldBackground1)",
      colorPaletteMarigoldBackground2: "var(--colorPaletteMarigoldBackground2)",
      colorPaletteMarigoldBackground3: "var(--colorPaletteMarigoldBackground3)",
      colorPaletteMarigoldBorderActive: "var(--colorPaletteMarigoldBorderActive)",
      colorPaletteMarigoldBorder1: "var(--colorPaletteMarigoldBorder1)",
      colorPaletteMarigoldBorder2: "var(--colorPaletteMarigoldBorder2)",
      colorPaletteMarigoldForeground1: "var(--colorPaletteMarigoldForeground1)",
      colorPaletteMarigoldForeground2: "var(--colorPaletteMarigoldForeground2)",
      colorPaletteMarigoldForeground3: "var(--colorPaletteMarigoldForeground3)",
      // Color palette light green tokens
      colorPaletteLightGreenBackground1: "var(--colorPaletteLightGreenBackground1)",
      colorPaletteLightGreenBackground2: "var(--colorPaletteLightGreenBackground2)",
      colorPaletteLightGreenBackground3: "var(--colorPaletteLightGreenBackground3)",
      colorPaletteLightGreenBorderActive: "var(--colorPaletteLightGreenBorderActive)",
      colorPaletteLightGreenBorder1: "var(--colorPaletteLightGreenBorder1)",
      colorPaletteLightGreenBorder2: "var(--colorPaletteLightGreenBorder2)",
      colorPaletteLightGreenForeground1: "var(--colorPaletteLightGreenForeground1)",
      colorPaletteLightGreenForeground2: "var(--colorPaletteLightGreenForeground2)",
      colorPaletteLightGreenForeground3: "var(--colorPaletteLightGreenForeground3)",
      // Color palette anchor tokens
      colorPaletteAnchorBackground2: "var(--colorPaletteAnchorBackground2)",
      colorPaletteAnchorBorderActive: "var(--colorPaletteAnchorBorderActive)",
      colorPaletteAnchorForeground2: "var(--colorPaletteAnchorForeground2)",
      // Color palette beige tokens
      colorPaletteBeigeBackground2: "var(--colorPaletteBeigeBackground2)",
      colorPaletteBeigeBorderActive: "var(--colorPaletteBeigeBorderActive)",
      colorPaletteBeigeForeground2: "var(--colorPaletteBeigeForeground2)",
      // Color palette blue tokens
      colorPaletteBlueBackground2: "var(--colorPaletteBlueBackground2)",
      colorPaletteBlueBorderActive: "var(--colorPaletteBlueBorderActive)",
      colorPaletteBlueForeground2: "var(--colorPaletteBlueForeground2)",
      // Color palette brass tokens
      colorPaletteBrassBackground2: "var(--colorPaletteBrassBackground2)",
      colorPaletteBrassBorderActive: "var(--colorPaletteBrassBorderActive)",
      colorPaletteBrassForeground2: "var(--colorPaletteBrassForeground2)",
      // Color palette brown tokens
      colorPaletteBrownBackground2: "var(--colorPaletteBrownBackground2)",
      colorPaletteBrownBorderActive: "var(--colorPaletteBrownBorderActive)",
      colorPaletteBrownForeground2: "var(--colorPaletteBrownForeground2)",
      // Color palette cornflower tokens
      colorPaletteCornflowerBackground2: "var(--colorPaletteCornflowerBackground2)",
      colorPaletteCornflowerBorderActive: "var(--colorPaletteCornflowerBorderActive)",
      colorPaletteCornflowerForeground2: "var(--colorPaletteCornflowerForeground2)",
      // Color palette cranberry tokens
      colorPaletteCranberryBackground2: "var(--colorPaletteCranberryBackground2)",
      colorPaletteCranberryBorderActive: "var(--colorPaletteCranberryBorderActive)",
      colorPaletteCranberryForeground2: "var(--colorPaletteCranberryForeground2)",
      // Color palette dark green tokens
      colorPaletteDarkGreenBackground2: "var(--colorPaletteDarkGreenBackground2)",
      colorPaletteDarkGreenBorderActive: "var(--colorPaletteDarkGreenBorderActive)",
      colorPaletteDarkGreenForeground2: "var(--colorPaletteDarkGreenForeground2)",
      // Color palette dark red tokens
      colorPaletteDarkRedBackground2: "var(--colorPaletteDarkRedBackground2)",
      colorPaletteDarkRedBorderActive: "var(--colorPaletteDarkRedBorderActive)",
      colorPaletteDarkRedForeground2: "var(--colorPaletteDarkRedForeground2)",
      // Color palette forest tokens
      colorPaletteForestBackground2: "var(--colorPaletteForestBackground2)",
      colorPaletteForestBorderActive: "var(--colorPaletteForestBorderActive)",
      colorPaletteForestForeground2: "var(--colorPaletteForestForeground2)",
      // Color palette gold tokens
      colorPaletteGoldBackground2: "var(--colorPaletteGoldBackground2)",
      colorPaletteGoldBorderActive: "var(--colorPaletteGoldBorderActive)",
      colorPaletteGoldForeground2: "var(--colorPaletteGoldForeground2)",
      // Color palette grape tokens
      colorPaletteGrapeBackground2: "var(--colorPaletteGrapeBackground2)",
      colorPaletteGrapeBorderActive: "var(--colorPaletteGrapeBorderActive)",
      colorPaletteGrapeForeground2: "var(--colorPaletteGrapeForeground2)",
      // Color palette lavender tokens
      colorPaletteLavenderBackground2: "var(--colorPaletteLavenderBackground2)",
      colorPaletteLavenderBorderActive: "var(--colorPaletteLavenderBorderActive)",
      colorPaletteLavenderForeground2: "var(--colorPaletteLavenderForeground2)",
      // Color palette light teal tokens
      colorPaletteLightTealBackground2: "var(--colorPaletteLightTealBackground2)",
      colorPaletteLightTealBorderActive: "var(--colorPaletteLightTealBorderActive)",
      colorPaletteLightTealForeground2: "var(--colorPaletteLightTealForeground2)",
      // Color palette lilac tokens
      colorPaletteLilacBackground2: "var(--colorPaletteLilacBackground2)",
      colorPaletteLilacBorderActive: "var(--colorPaletteLilacBorderActive)",
      colorPaletteLilacForeground2: "var(--colorPaletteLilacForeground2)",
      // Color palette magenta tokens
      colorPaletteMagentaBackground2: "var(--colorPaletteMagentaBackground2)",
      colorPaletteMagentaBorderActive: "var(--colorPaletteMagentaBorderActive)",
      colorPaletteMagentaForeground2: "var(--colorPaletteMagentaForeground2)",
      // Color palette mink tokens
      colorPaletteMinkBackground2: "var(--colorPaletteMinkBackground2)",
      colorPaletteMinkBorderActive: "var(--colorPaletteMinkBorderActive)",
      colorPaletteMinkForeground2: "var(--colorPaletteMinkForeground2)",
      // Color palette navy tokens
      colorPaletteNavyBackground2: "var(--colorPaletteNavyBackground2)",
      colorPaletteNavyBorderActive: "var(--colorPaletteNavyBorderActive)",
      colorPaletteNavyForeground2: "var(--colorPaletteNavyForeground2)",
      // Color palette peach tokens
      colorPalettePeachBackground2: "var(--colorPalettePeachBackground2)",
      colorPalettePeachBorderActive: "var(--colorPalettePeachBorderActive)",
      colorPalettePeachForeground2: "var(--colorPalettePeachForeground2)",
      // Color palette pink tokens
      colorPalettePinkBackground2: "var(--colorPalettePinkBackground2)",
      colorPalettePinkBorderActive: "var(--colorPalettePinkBorderActive)",
      colorPalettePinkForeground2: "var(--colorPalettePinkForeground2)",
      // Color palette platinum tokens
      colorPalettePlatinumBackground2: "var(--colorPalettePlatinumBackground2)",
      colorPalettePlatinumBorderActive: "var(--colorPalettePlatinumBorderActive)",
      colorPalettePlatinumForeground2: "var(--colorPalettePlatinumForeground2)",
      // Color palette plum tokens
      colorPalettePlumBackground2: "var(--colorPalettePlumBackground2)",
      colorPalettePlumBorderActive: "var(--colorPalettePlumBorderActive)",
      colorPalettePlumForeground2: "var(--colorPalettePlumForeground2)",
      // Color palette pumpkin tokens
      colorPalettePumpkinBackground2: "var(--colorPalettePumpkinBackground2)",
      colorPalettePumpkinBorderActive: "var(--colorPalettePumpkinBorderActive)",
      colorPalettePumpkinForeground2: "var(--colorPalettePumpkinForeground2)",
      // Color palette purple tokens
      colorPalettePurpleBackground2: "var(--colorPalettePurpleBackground2)",
      colorPalettePurpleBorderActive: "var(--colorPalettePurpleBorderActive)",
      colorPalettePurpleForeground2: "var(--colorPalettePurpleForeground2)",
      // Color palette royal blue tokens
      colorPaletteRoyalBlueBackground2: "var(--colorPaletteRoyalBlueBackground2)",
      colorPaletteRoyalBlueBorderActive: "var(--colorPaletteRoyalBlueBorderActive)",
      colorPaletteRoyalBlueForeground2: "var(--colorPaletteRoyalBlueForeground2)",
      // Color palette seafoam tokens
      colorPaletteSeafoamBackground2: "var(--colorPaletteSeafoamBackground2)",
      colorPaletteSeafoamBorderActive: "var(--colorPaletteSeafoamBorderActive)",
      colorPaletteSeafoamForeground2: "var(--colorPaletteSeafoamForeground2)",
      // Color palette steel tokens
      colorPaletteSteelBackground2: "var(--colorPaletteSteelBackground2)",
      colorPaletteSteelBorderActive: "var(--colorPaletteSteelBorderActive)",
      colorPaletteSteelForeground2: "var(--colorPaletteSteelForeground2)",
      // Color palette teal tokens
      colorPaletteTealBackground2: "var(--colorPaletteTealBackground2)",
      colorPaletteTealBorderActive: "var(--colorPaletteTealBorderActive)",
      colorPaletteTealForeground2: "var(--colorPaletteTealForeground2)",
      // Border radius tokens
      borderRadiusNone: "var(--borderRadiusNone)",
      borderRadiusSmall: "var(--borderRadiusSmall)",
      borderRadiusMedium: "var(--borderRadiusMedium)",
      borderRadiusLarge: "var(--borderRadiusLarge)",
      borderRadiusXLarge: "var(--borderRadiusXLarge)",
      borderRadiusCircular: "var(--borderRadiusCircular)",
      // Font family tokens
      fontFamilyBase: "var(--fontFamilyBase)",
      fontFamilyMonospace: "var(--fontFamilyMonospace)",
      fontFamilyNumeric: "var(--fontFamilyNumeric)",
      // Font size tokens
      fontSizeBase100: "var(--fontSizeBase100)",
      fontSizeBase200: "var(--fontSizeBase200)",
      fontSizeBase300: "var(--fontSizeBase300)",
      fontSizeBase400: "var(--fontSizeBase400)",
      fontSizeBase500: "var(--fontSizeBase500)",
      fontSizeBase600: "var(--fontSizeBase600)",
      fontSizeHero700: "var(--fontSizeHero700)",
      fontSizeHero800: "var(--fontSizeHero800)",
      fontSizeHero900: "var(--fontSizeHero900)",
      fontSizeHero1000: "var(--fontSizeHero1000)",
      // Font weight tokens
      fontWeightRegular: "var(--fontWeightRegular)",
      fontWeightMedium: "var(--fontWeightMedium)",
      fontWeightSemibold: "var(--fontWeightSemibold)",
      fontWeightBold: "var(--fontWeightBold)",
      // Line height tokens
      lineHeightBase100: "var(--lineHeightBase100)",
      lineHeightBase200: "var(--lineHeightBase200)",
      lineHeightBase300: "var(--lineHeightBase300)",
      lineHeightBase400: "var(--lineHeightBase400)",
      lineHeightBase500: "var(--lineHeightBase500)",
      lineHeightBase600: "var(--lineHeightBase600)",
      lineHeightHero700: "var(--lineHeightHero700)",
      lineHeightHero800: "var(--lineHeightHero800)",
      lineHeightHero900: "var(--lineHeightHero900)",
      lineHeightHero1000: "var(--lineHeightHero1000)",
      // Shadow tokens
      shadow2: "var(--shadow2)",
      shadow4: "var(--shadow4)",
      shadow8: "var(--shadow8)",
      shadow16: "var(--shadow16)",
      shadow28: "var(--shadow28)",
      shadow64: "var(--shadow64)",
      // Shadow brand tokens
      shadow2Brand: "var(--shadow2Brand)",
      shadow4Brand: "var(--shadow4Brand)",
      shadow8Brand: "var(--shadow8Brand)",
      shadow16Brand: "var(--shadow16Brand)",
      shadow28Brand: "var(--shadow28Brand)",
      shadow64Brand: "var(--shadow64Brand)",
      // Stroke width tokens
      strokeWidthThin: "var(--strokeWidthThin)",
      strokeWidthThick: "var(--strokeWidthThick)",
      strokeWidthThicker: "var(--strokeWidthThicker)",
      strokeWidthThickest: "var(--strokeWidthThickest)",
      // Spacings
      spacingHorizontalNone: "var(--spacingHorizontalNone)",
      spacingHorizontalXXS: "var(--spacingHorizontalXXS)",
      spacingHorizontalXS: "var(--spacingHorizontalXS)",
      spacingHorizontalSNudge: "var(--spacingHorizontalSNudge)",
      spacingHorizontalS: "var(--spacingHorizontalS)",
      spacingHorizontalMNudge: "var(--spacingHorizontalMNudge)",
      spacingHorizontalM: "var(--spacingHorizontalM)",
      spacingHorizontalL: "var(--spacingHorizontalL)",
      spacingHorizontalXL: "var(--spacingHorizontalXL)",
      spacingHorizontalXXL: "var(--spacingHorizontalXXL)",
      spacingHorizontalXXXL: "var(--spacingHorizontalXXXL)",
      spacingVerticalNone: "var(--spacingVerticalNone)",
      spacingVerticalXXS: "var(--spacingVerticalXXS)",
      spacingVerticalXS: "var(--spacingVerticalXS)",
      spacingVerticalSNudge: "var(--spacingVerticalSNudge)",
      spacingVerticalS: "var(--spacingVerticalS)",
      spacingVerticalMNudge: "var(--spacingVerticalMNudge)",
      spacingVerticalM: "var(--spacingVerticalM)",
      spacingVerticalL: "var(--spacingVerticalL)",
      spacingVerticalXL: "var(--spacingVerticalXL)",
      spacingVerticalXXL: "var(--spacingVerticalXXL)",
      spacingVerticalXXXL: "var(--spacingVerticalXXXL)",
      // Durations
      durationUltraFast: "var(--durationUltraFast)",
      durationFaster: "var(--durationFaster)",
      durationFast: "var(--durationFast)",
      durationNormal: "var(--durationNormal)",
      durationSlow: "var(--durationSlow)",
      durationSlower: "var(--durationSlower)",
      durationUltraSlow: "var(--durationUltraSlow)",
      // Curves
      curveAccelerateMax: "var(--curveAccelerateMax)",
      curveAccelerateMid: "var(--curveAccelerateMid)",
      curveAccelerateMin: "var(--curveAccelerateMin)",
      curveDecelerateMax: "var(--curveDecelerateMax)",
      curveDecelerateMid: "var(--curveDecelerateMid)",
      curveDecelerateMin: "var(--curveDecelerateMin)",
      curveEasyEaseMax: "var(--curveEasyEaseMax)",
      curveEasyEase: "var(--curveEasyEase)",
      curveLinear: "var(--curveLinear)"
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/typographyStyles.js
var typographyStyles;
var init_typographyStyles = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/typographyStyles.js"() {
    init_tokens();
    typographyStyles = {
      body1: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightRegular,
        lineHeight: tokens.lineHeightBase300
      },
      body1Strong: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase300
      },
      body1Stronger: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightBold,
        lineHeight: tokens.lineHeightBase300
      },
      body2: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightRegular,
        lineHeight: tokens.lineHeightBase400
      },
      caption1: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightRegular,
        lineHeight: tokens.lineHeightBase200
      },
      caption1Strong: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase200
      },
      caption1Stronger: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase200,
        fontWeight: tokens.fontWeightBold,
        lineHeight: tokens.lineHeightBase200
      },
      caption2: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase100,
        fontWeight: tokens.fontWeightRegular,
        lineHeight: tokens.lineHeightBase100
      },
      caption2Strong: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase100,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase100
      },
      subtitle1: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase500
      },
      subtitle2: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase400
      },
      subtitle2Stronger: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightBold,
        lineHeight: tokens.lineHeightBase400
      },
      title1: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero800
      },
      title2: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeHero700,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero700
      },
      title3: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase600,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightBase600
      },
      largeTitle: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeHero900,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero900
      },
      display: {
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeHero1000,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero1000
      }
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/index.js
var init_global = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/index.js"() {
    init_borderRadius();
    init_colors();
    init_curves();
    init_durations();
    init_fonts();
    init_spacings();
    init_strokeWidths();
    init_borderRadius();
    init_typographyStyles();
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/utils/shadows.js
function createShadowTokens(ambientColor, keyColor, tokenSuffix = "") {
  return {
    [`shadow2${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 1px 2px ${keyColor}`,
    [`shadow4${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 2px 4px ${keyColor}`,
    [`shadow8${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 4px 8px ${keyColor}`,
    [`shadow16${tokenSuffix}`]: `0 0 2px ${ambientColor}, 0 8px 16px ${keyColor}`,
    [`shadow28${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 14px 28px ${keyColor}`,
    [`shadow64${tokenSuffix}`]: `0 0 8px ${ambientColor}, 0 32px 64px ${keyColor}`
  };
}
var init_shadows = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/utils/shadows.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/utils/createLightTheme.js
var createLightTheme;
var init_createLightTheme = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/utils/createLightTheme.js"() {
    init_lightColorPalette();
    init_lightColor();
    init_global();
    init_shadows();
    init_durations();
    init_curves();
    init_spacings();
    createLightTheme = (brand) => {
      const colorTokens = generateColorTokens(brand);
      return {
        ...borderRadius,
        ...fontSizes,
        ...lineHeights,
        ...fontFamilies,
        ...fontWeights,
        ...strokeWidths,
        ...horizontalSpacings,
        ...verticalSpacings,
        ...durations,
        ...curves,
        ...colorTokens,
        ...colorPaletteTokens,
        ...createShadowTokens(colorTokens.colorNeutralShadowAmbient, colorTokens.colorNeutralShadowKey),
        ...createShadowTokens(colorTokens.colorBrandShadowAmbient, colorTokens.colorBrandShadowKey, "Brand")
      };
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/brandColors.js
var brandWeb;
var init_brandColors = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/global/brandColors.js"() {
    brandWeb = {
      10: `#061724`,
      20: `#082338`,
      30: `#0a2e4a`,
      40: `#0c3b5e`,
      50: `#0e4775`,
      60: `#0f548c`,
      70: `#115ea3`,
      80: `#0f6cbd`,
      90: `#2886de`,
      100: `#479ef5`,
      110: `#62abf5`,
      120: `#77b7f7`,
      130: `#96c6fa`,
      140: `#b4d6fa`,
      150: `#cfe4fa`,
      160: `#ebf3fc`
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/teams/lightTheme.js
var init_lightTheme = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/teams/lightTheme.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/teams/darkTheme.js
var init_darkTheme = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/teams/darkTheme.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/teams/highContrastTheme.js
var init_highContrastTheme = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/teams/highContrastTheme.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/teams/index.js
var init_teams = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/teams/index.js"() {
    init_lightTheme();
    init_darkTheme();
    init_highContrastTheme();
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/web/lightTheme.js
var webLightTheme;
var init_lightTheme2 = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/web/lightTheme.js"() {
    init_createLightTheme();
    init_brandColors();
    webLightTheme = /* @__PURE__ */ createLightTheme(brandWeb);
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/web/darkTheme.js
var init_darkTheme2 = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/web/darkTheme.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/web/index.js
var init_web = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/web/index.js"() {
    init_lightTheme2();
    init_darkTheme2();
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/index.js
var init_themes = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/themes/index.js"() {
    init_teams();
    init_web();
  }
});

// ../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/index.js
var init_lib3 = __esm({
  "../../node_modules/.pnpm/@fluentui+tokens@1.0.0-alpha.2/node_modules/@fluentui/tokens/lib/index.js"() {
    init_themes();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-theme@9.1.5/node_modules/@fluentui/react-theme/lib/index.js
var init_lib4 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-theme@9.1.5/node_modules/@fluentui/react-theme/lib/index.js"() {
    init_lib3();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/index.js
var init_lib5 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-tabster@9.3.5_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-tabster/lib/index.js"() {
    init_hooks2();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/useFluentProviderStyles.js
var import_core, import_react16, fluentProviderClassNames, useStyles, useFluentProviderStyles_unstable;
var init_useFluentProviderStyles = __esm({
  "../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/useFluentProviderStyles.js"() {
    import_core = __toESM(require_index_cjs());
    import_react16 = __toESM(require_index_cjs2());
    fluentProviderClassNames = {
      root: "fui-FluentProvider"
    };
    useStyles = /* @__PURE__ */ (0, import_core.__styles)({
      root: {
        sj55zd: "f19n0e5",
        De3pzq: "fxugw4r",
        fsow6f: ["f1o700av", "fes3tcz"],
        Bahqtrf: "fk6fouc",
        Be2twd7: "fkhj508",
        Bhrd7zp: "figsok6",
        Bg96gwp: "f1i3iumi"
      }
    }, {
      d: [".f19n0e5{color:var(--colorNeutralForeground1);}", ".fxugw4r{background-color:var(--colorNeutralBackground1);}", ".f1o700av{text-align:left;}", ".fes3tcz{text-align:right;}", ".fk6fouc{font-family:var(--fontFamilyBase);}", ".fkhj508{font-size:var(--fontSizeBase300);}", ".figsok6{font-weight:var(--fontWeightRegular);}", ".f1i3iumi{line-height:var(--lineHeightBase300);}"]
    });
    useFluentProviderStyles_unstable = (state) => {
      const renderer = (0, import_react16.useRenderer_unstable)();
      const styles = useStyles({
        dir: state.dir,
        renderer
      });
      state.root.className = (0, import_core.mergeClasses)(fluentProviderClassNames.root, state.themeClassName, styles.root, state.root.className);
      return state;
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/useFluentProviderThemeStyleTag.js
var import_react17, React23, useInsertionEffect4, createStyleTag, insertSheet, useFluentProviderThemeStyleTag;
var init_useFluentProviderThemeStyleTag = __esm({
  "../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/useFluentProviderThemeStyleTag.js"() {
    init_lib2();
    import_react17 = __toESM(require_index_cjs2());
    React23 = __toESM(require_react());
    init_useFluentProviderStyles();
    useInsertionEffect4 = React23["useInsertionEffect"] ? React23["useInsertionEffect"] : useIsomorphicLayoutEffect;
    createStyleTag = (target, elementAttributes) => {
      if (!target) {
        return void 0;
      }
      const tag = target.createElement("style");
      Object.keys(elementAttributes).forEach((attrName) => {
        tag.setAttribute(attrName, elementAttributes[attrName]);
      });
      target.head.appendChild(tag);
      return tag;
    };
    insertSheet = (tag, rule) => {
      const sheet = tag.sheet;
      if (sheet) {
        if (sheet.cssRules.length > 0) {
          sheet.deleteRule(0);
        }
        sheet.insertRule(rule, 0);
      } else if (process.env.NODE_ENV !== "production") {
        console.error("FluentProvider: No sheet available on styleTag, styles will not be inserted into DOM.");
      }
    };
    useFluentProviderThemeStyleTag = (options) => {
      const {
        targetDocument,
        theme: theme2
      } = options;
      const renderer = (0, import_react17.useRenderer_unstable)();
      const styleTag = React23.useRef();
      const styleTagId = useId(fluentProviderClassNames.root);
      const styleElementAttributes = renderer.styleElementAttributes;
      const cssVarsAsString = React23.useMemo(() => {
        return theme2 ? Object.keys(theme2).reduce((cssVarRule, cssVar) => {
          cssVarRule += `--${cssVar}: ${theme2[cssVar]}; `;
          return cssVarRule;
        }, "") : "";
      }, [theme2]);
      const rule = `.${styleTagId} { ${cssVarsAsString} }`;
      useInsertionEffect4(() => {
        styleTag.current = createStyleTag(targetDocument, {
          ...styleElementAttributes,
          id: styleTagId
        });
        if (styleTag.current) {
          insertSheet(styleTag.current, rule);
          return () => {
            var _a;
            (_a = styleTag.current) === null || _a === void 0 ? void 0 : _a.remove();
          };
        }
      }, [styleTagId, targetDocument, rule, styleElementAttributes]);
      return styleTagId;
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/useFluentProvider.js
function mergeThemes(a, b) {
  if (a && b) {
    return {
      ...a,
      ...b
    };
  }
  if (a) {
    return a;
  }
  return b;
}
function useTheme() {
  return React24.useContext(ThemeContext2);
}
var React24, useFluentProvider_unstable;
var init_useFluentProvider = __esm({
  "../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/useFluentProvider.js"() {
    init_lib5();
    init_lib();
    init_lib2();
    React24 = __toESM(require_react());
    init_useFluentProviderThemeStyleTag();
    useFluentProvider_unstable = (props, ref) => {
      const parentContext = useFluent();
      const parentTheme = useTheme();
      const {
        applyStylesToPortals = true,
        dir = parentContext.dir,
        targetDocument = parentContext.targetDocument,
        theme: theme2
      } = props;
      const mergedTheme = mergeThemes(parentTheme, theme2);
      React24.useEffect(() => {
        if (process.env.NODE_ENV !== "production" && mergedTheme === void 0) {
          console.warn(`
      FluentProvider: your "theme" is not defined !
      =============================================
      Make sure your root FluentProvider has set a theme or you're setting the theme in your child FluentProvider.
      `);
        }
      }, []);
      return {
        applyStylesToPortals,
        dir,
        targetDocument,
        theme: mergedTheme,
        themeClassName: useFluentProviderThemeStyleTag({
          theme: mergedTheme,
          targetDocument
        }),
        components: {
          root: "div"
        },
        root: getNativeElementProps("div", {
          ...props,
          dir,
          ref: useMergedRefs(ref, useFocusVisible())
        })
      };
    };
  }
});

// ../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/useFluentProviderContextValues.js
function useFluentProviderContextValues_unstable(state) {
  const {
    applyStylesToPortals,
    dir,
    root,
    targetDocument,
    theme: theme2,
    themeClassName
  } = state;
  const provider = React25.useMemo(() => ({
    dir,
    targetDocument
  }), [dir, targetDocument]);
  const [tooltip] = React25.useState(() => ({}));
  return {
    provider,
    textDirection: dir,
    tooltip,
    theme: theme2,
    themeClassName: applyStylesToPortals ? root.className : themeClassName
  };
}
var React25;
var init_useFluentProviderContextValues = __esm({
  "../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/useFluentProviderContextValues.js"() {
    React25 = __toESM(require_react());
  }
});

// ../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/FluentProvider.js
var React26, FluentProvider;
var init_FluentProvider = __esm({
  "../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/FluentProvider.js"() {
    React26 = __toESM(require_react());
    init_renderFluentProvider();
    init_useFluentProvider();
    init_useFluentProviderStyles();
    init_useFluentProviderContextValues();
    FluentProvider = /* @__PURE__ */ React26.forwardRef((props, ref) => {
      const state = useFluentProvider_unstable(props, ref);
      useFluentProviderStyles_unstable(state);
      const contextValues = useFluentProviderContextValues_unstable(state);
      return renderFluentProvider_unstable(state, contextValues);
    });
    FluentProvider.displayName = "FluentProvider";
  }
});

// ../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/FluentProvider.types.js
var init_FluentProvider_types = __esm({
  "../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/FluentProvider.types.js"() {
  }
});

// ../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/index.js
var init_FluentProvider2 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/components/FluentProvider/index.js"() {
    init_FluentProvider();
    init_FluentProvider_types();
    init_renderFluentProvider();
    init_useFluentProvider();
    init_useFluentProviderStyles();
    init_useFluentProviderContextValues();
    init_useFluentProviderThemeStyleTag();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/FluentProvider.js
var init_FluentProvider3 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/FluentProvider.js"() {
    init_FluentProvider2();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/index.js
var init_lib6 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-provider@9.2.0_ie75ejlwqy5zh3tldgt7pftwcu/node_modules/@fluentui/react-provider/lib/index.js"() {
    init_FluentProvider3();
  }
});

// ../../node_modules/.pnpm/@fluentui+react-components@9.8.0_dkgu264sflw5t3ai23uklgdsou/node_modules/@fluentui/react-components/lib/index.js
var init_lib7 = __esm({
  "../../node_modules/.pnpm/@fluentui+react-components@9.8.0_dkgu264sflw5t3ai23uklgdsou/node_modules/@fluentui/react-components/lib/index.js"() {
    init_lib6();
    init_lib4();
  }
});

// ../../app/web/src/theme.tsx
var customTheme;
var init_theme = __esm({
  "../../app/web/src/theme.tsx"() {
    "use strict";
    customTheme = {
      borderRadiusSmall: "2px",
      borderRadiusMedium: "3px",
      borderRadiusLarge: "4px",
      fontFamilyBase: `"Source Sans Pro", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif`
    };
  }
});

// ../../app/web/src/base/layout/default.tsx
var default_exports = {};
__export(default_exports, {
  default: () => default_default
});
var theme, default_default;
var init_default = __esm({
  "../../app/web/src/base/layout/default.tsx"() {
    "use strict";
    init_lib7();
    init_src2();
    init_theme();
    init_emotion_react_jsx_runtime_esm2();
    theme = {};
    theme = webLightTheme;
    default_default = layout({
      component: ({ children }) => {
        return /* @__PURE__ */ jsx2(FluentProvider, { theme: { ...theme, ...customTheme }, children });
      }
    });
  }
});

// ../../gen/web.layout.ts
var web_layout_default;
var init_web_layout = __esm({
  "../../gen/web.layout.ts"() {
    web_layout_default = {
      web: {
        blank: () => Promise.resolve().then(() => (init_blank(), blank_exports)),
        default: () => Promise.resolve().then(() => (init_default(), default_exports))
      }
    };
  }
});

// ../../app/web/types/content.ts
var layouts, pages, page;
var init_content = __esm({
  "../../app/web/types/content.ts"() {
    "use strict";
    init_web_layout();
    init_web_page_ssr();
    layouts = web_layout_default["web"];
    pages = web_page_ssr_default["web"];
    page = (opt) => {
      return opt;
    };
  }
});

// ../../app/web/src/base/page/site.tsx
var site_exports = {};
__export(site_exports, {
  default: () => site_default
});
var dec, site_default;
var init_site = __esm({
  "../../app/web/src/base/page/site.tsx"() {
    "use strict";
    init_content();
    init_emotion_react_jsx_runtime_esm2();
    dec = new TextDecoder();
    site_default = page({
      url: "/site/:name/*",
      ssr: true,
      layout: "ssr",
      component: ({}) => {
        return /* @__PURE__ */ jsx2("div", { children: "Halo" });
      }
    });
  }
});

// ../../gen/web.page.ssr.ts
var web_page_ssr_exports = {};
__export(web_page_ssr_exports, {
  default: () => web_page_ssr_default
});
module.exports = __toCommonJS(web_page_ssr_exports);
var web_page_ssr_default;
var init_web_page_ssr = __esm({
  "../../gen/web.page.ssr.ts"() {
    web_page_ssr_default = {
      web: {
        site: [
          "/site/:name/*",
          "ssr",
          () => Promise.resolve().then(() => (init_site(), site_exports))
        ]
      }
    };
  }
});
init_web_page_ssr();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.production.min.js:
  (** @license React v16.13.1
   * react-is.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-is/cjs/react-is.development.js:
  (** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

keyborg/dist/index.js:
  (*!
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)
*/
