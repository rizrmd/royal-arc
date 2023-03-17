// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"iLELz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "baseMain", ()=>baseMain);
var _bundler = require("bundler");
var _watch = require("bundler/src/watch");
var _catchExit = require("catch-exit");
var _chalk = require("chalk");
var _chalkDefault = parcelHelpers.interopDefault(_chalk);
var _lodashPadend = require("lodash.padend");
var _lodashPadendDefault = parcelHelpers.interopDefault(_lodashPadend);
var _app = require("./builder/app");
var _service = require("./builder/service");
var _commitHook = require("./commit-hook");
var _upgrade = require("./upgrade");
var _versionCheck = require("./version-check");
var _vscode = require("./vscode");
var _all = require("./watcher/all");
const baseMain = async ()=>{
    process.removeAllListeners("warning");
    (0, _vscode.vscodeSettings)();
    const args = process.argv.slice(2);
    if (await (0, _commitHook.commitHook)(args)) return;
    if (await (0, _upgrade.upgradeHook)(args)) return;
    console.log(`── ${(0, _lodashPadendDefault.default)((0, _chalkDefault.default).yellow(`BASE`) + " ", 47, "─")}`);
    if (args.includes("build") || args.includes("deploy") || args.includes("prod") || args.includes("staging")) ;
    else {
        (0, _versionCheck.versionCheck)({
            timeout: 3000
        });
        const onExit = async ()=>{
            await (0, _watch.watcher).dispose();
        };
        (0, _catchExit.addExitCallback)(()=>{});
        (0, _all.setupWatchers)(args, onExit);
        const app = await (0, _app.buildApp)({
            watch: true
        });
        await Promise.all(app.serviceNames.map((0, _service.buildService)));
        await (0, _bundler.runner).run({
            path: app.path,
            cwd: app.cwd
        });
    }
};
baseMain();

},{"bundler/src/watch":"2P9Gs","catch-exit":"eRV4l","chalk":"1lbiC","lodash.padend":"iZ5sw","./builder/app":"4336l","./builder/service":"7ii00","./commit-hook":"aBIlz","./upgrade":"enXmf","./version-check":"eANhU","./vscode":"1Ws3e","./watcher/all":"auii2","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl","bundler":"fcLYH"}],"2P9Gs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "watcher", ()=>watcher);
var _watcher = require("@parcel/watcher");
const watcher = {
    _watches: new Set(),
    async dispose () {
        await Promise.all([
            ...this._watches.values()
        ].map(async (e)=>{
            (await e).unsubscribe();
        }));
    },
    watch (dirs) {
        const _dirs = Array.isArray(dirs) ? dirs : [
            dirs
        ];
        for (const item of _dirs)this._watches.add((0, _watcher.subscribe)(item.dir, item.event, {
            ignore: item.ignore ? item.ignore : [
                "node_modules",
                "*/**"
            ]
        }));
    }
};

},{"@parcel/watcher":"@parcel/watcher","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"bmjVl":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"eRV4l":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.enableLogging = exports.setupCatchExit = exports.registerStringifyError = exports.catchSignalStrings = exports.removeExitCallback = exports.addExitCallback = void 0;
const async_hooks_1 = require("21a70a6e654dff29");
const fs_1 = require("e51cc906492f8e5c");
const human_signals_1 = require("9764029028b4a2f5");
/**
 * Add a callback function to be called upon process exit or death.
 *
 * @param callback The callback function with signature: (signal: CatchSignals, exitCode?: number,
 *   error?: Error) => undefined | void
 *
 *   Typed to block async functions. Async functions will not work for 'exit' events, triggered from
 *   process.exit(), but will work with other events this catches. If you wish to perform async
 *   functions have this callback call an async function but remember it won't be awaited if the
 *   signal is 'exit'.
 * @returns The callback itself for chaining purposes.
 */ function addExitCallback(callback) {
    // setup the exit handling once a callback has actually been added
    setupProcessExitHandling();
    callbacks.push(callback);
    return callback;
}
exports.addExitCallback = addExitCallback;
/**
 * Remove the given callback function from the list of callbacks to be called on process exit or death.
 *
 * @param callback The exact callback (exact by reference) added at some earlier point by addExitCallback.
 * @returns The callback removed or undefined if the given callback was not found.
 */ function removeExitCallback(callback) {
    // assume that at this point the user wants the handler to be setup
    setupProcessExitHandling();
    const index = callbacks.indexOf(callback);
    return index > -1 ? callbacks.splice(index, 1)[0] : undefined;
}
exports.removeExitCallback = removeExitCallback;
// used in the listener far setup below
const signals = [
    "SIGHUP",
    // catches ctrl+c event
    "SIGINT",
    // catches "kill pid"
    "SIGTERM",
    "SIGQUIT"
];
/** The different signal types that can be passed to the exit callback. */ exports.catchSignalStrings = [
    ...signals,
    "exit",
    "uncaughtException"
];
function stringifyError(error) {
    if (customStringifyError) return customStringifyError(error);
    if (error instanceof Error) return (error.stack || error.toString()) + "\n";
    else return String(error);
}
/**
 * Allow customization of error message printing. Defaults to just printing the stack trace.
 *
 * @param errorStringifyFunction Function that accepts an error and returns a string
 */ function registerStringifyError(errorStringifyFunction) {
    // assume that at this point the user wants the handler to be setup
    setupProcessExitHandling();
    customStringifyError = errorStringifyFunction;
}
exports.registerStringifyError = registerStringifyError;
let customStringifyError;
/**
 * Setup process exit or death handlers without adding any callbacks
 *
 * @param options Setup options, see SetupOptions type for details
 */ function setupCatchExit(options) {
    setupProcessExitHandling();
    if (options) {
        const { loggingEnabled , customErrorStringify  } = options;
        if (customErrorStringify) registerStringifyError(customErrorStringify);
        if (loggingEnabled) enableLogging();
    }
}
exports.setupCatchExit = setupCatchExit;
let loggingEnabled = false;
/**
 * Enable logging of this package's methods.
 *
 * @param enable True (default) to enable, false to disable
 * @returns The value of the passed or defaulted "enable" argument
 */ function enableLogging(enable = true) {
    // assume that at this point the user wants the handler to be setup
    setupProcessExitHandling();
    loggingEnabled = enable;
    return enable;
}
exports.enableLogging = enableLogging;
// console.log is async and these log functions must be sync
function log(value) {
    if (loggingEnabled) (0, fs_1.writeSync)(1, value + "\n");
}
function logError(value) {
    (0, fs_1.writeSync)(2, value);
}
const callbacks = [];
// not sure what all the different async types mean but I seem to not care about at least these
const ignoredAsyncTypes = [
    "TTYWRAP",
    "SIGNALWRAP",
    "PIPEWRAP"
];
const asyncHook = (0, async_hooks_1.createHook)({
    init (id, type) {
        if (!ignoredAsyncTypes.includes(type)) (0, fs_1.writeSync)(2, `\nERROR: Async operation of type "${type}" was created in "process.exit" callback. This will not run to completion as "process.exit" will not complete async tasks.\n`);
    }
});
let alreadySetup = false;
/**
 * This is used to prevent double clean up (since the process.exit in exitHandler gets caught the
 * first time, firing exitHandler again).
 */ let alreadyExiting = false;
function setupProcessExitHandling() {
    if (alreadySetup) return;
    // so the program will not close instantly
    // process.stdin.resume();
    function exitHandler(signal, exitCode, inputError) {
        log(`handling signal: ${signal} with code ${exitCode}`);
        if (!alreadyExiting) {
            log("setting alreadyExiting");
            alreadyExiting = true;
            try {
                log(`Firing ${callbacks.length} callbacks`);
                // only exit prevents async callbacks from completing
                if (signal === "exit") asyncHook.enable();
                callbacks.forEach((callback)=>callback(signal, exitCode, inputError));
                asyncHook.disable();
            } catch (callbackError) {
                log("Error in callback");
                // 7 here means there was an error in the exit handler, which there was if we got to this point
                exitWithError(callbackError, 7);
            }
            if (inputError instanceof Error) exitWithError(inputError, exitCode);
            else process.exit(exitCode);
        } else {
            log("Already exiting, not doing anything");
            return;
        }
    }
    // prevents all exit codes from being 7 when they shouldn't be
    function exitWithError(error, code) {
        log(`Exiting with error and code ${code}`);
        logError(stringifyError(error));
        process.exit(code);
    }
    signals.forEach((signal)=>process.on(signal, ()=>{
            var _a;
            const signalNumber = (_a = human_signals_1.signalsByName[signal]) === null || _a === void 0 ? void 0 : _a.number;
            if (signalNumber == undefined) throw new Error(`Failed to find number for signal "${signal}"`);
            exitHandler(signal, 128 + signalNumber);
        }));
    process.on("exit", (code)=>{
        log(`exit listener with code ${code}`);
        exitHandler("exit", code);
    });
    process.on("unhandledRejection", (reason)=>{
        log("unhandledRejection listener");
        const error = reason instanceof Error ? reason : new Error(reason ? `${reason}` : "");
        error.name = "UnhandledRejection";
        throw error;
    });
    // catches uncaught exceptions
    process.on("uncaughtException", (error)=>{
        log("uncaughtException listener");
        exitHandler("uncaughtException", 1, error);
    });
    alreadySetup = true;
}

},{"21a70a6e654dff29":"async_hooks","e51cc906492f8e5c":"fs","9764029028b4a2f5":"dHK84"}],"dHK84":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.signalsByNumber = exports.signalsByName = void 0;
var _os = require("3df0e622d7fc0e82");
var _signals = require("e59a2f89048c204a");
var _realtime = require("40b15abb6fd23aaa");
const getSignalsByName = function() {
    const signals = (0, _signals.getSignals)();
    return signals.reduce(getSignalByName, {});
};
const getSignalByName = function(signalByNameMemo, { name , number , description , supported , action , forced , standard  }) {
    return {
        ...signalByNameMemo,
        [name]: {
            name,
            number,
            description,
            supported,
            action,
            forced,
            standard
        }
    };
};
const signalsByName = getSignalsByName();
exports.signalsByName = signalsByName;
const getSignalsByNumber = function() {
    const signals = (0, _signals.getSignals)();
    const length = _realtime.SIGRTMAX + 1;
    const signalsA = Array.from({
        length
    }, (value, number)=>getSignalByNumber(number, signals));
    return Object.assign({}, ...signalsA);
};
const getSignalByNumber = function(number, signals) {
    const signal = findSignalByNumber(number, signals);
    if (signal === undefined) return {};
    const { name , description , supported , action , forced , standard  } = signal;
    return {
        [number]: {
            name,
            number,
            description,
            supported,
            action,
            forced,
            standard
        }
    };
};
const findSignalByNumber = function(number, signals) {
    const signal = signals.find(({ name  })=>_os.constants.signals[name] === number);
    if (signal !== undefined) return signal;
    return signals.find((signalA)=>signalA.number === number);
};
const signalsByNumber = getSignalsByNumber();
exports.signalsByNumber = signalsByNumber;

},{"3df0e622d7fc0e82":"os","e59a2f89048c204a":"mmSNL","40b15abb6fd23aaa":"gYVtp"}],"mmSNL":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getSignals = void 0;
var _os = require("b2e2dc5e04fe8f90");
var _core = require("d609ef56aa894f2e");
var _realtime = require("ac565af5a28b897f");
const getSignals = function() {
    const realtimeSignals = (0, _realtime.getRealtimeSignals)();
    const signals = [
        ..._core.SIGNALS,
        ...realtimeSignals
    ].map(normalizeSignal);
    return signals;
};
exports.getSignals = getSignals;
const normalizeSignal = function({ name , number: defaultNumber , description , action , forced =false , standard  }) {
    const { signals: { [name]: constantSignal  }  } = _os.constants;
    const supported = constantSignal !== undefined;
    const number = supported ? constantSignal : defaultNumber;
    return {
        name,
        number,
        description,
        supported,
        action,
        forced,
        standard
    };
};

},{"b2e2dc5e04fe8f90":"os","d609ef56aa894f2e":"kfDYa","ac565af5a28b897f":"gYVtp"}],"kfDYa":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SIGNALS = void 0;
const SIGNALS = [
    {
        name: "SIGHUP",
        number: 1,
        action: "terminate",
        description: "Terminal closed",
        standard: "posix"
    },
    {
        name: "SIGINT",
        number: 2,
        action: "terminate",
        description: "User interruption with CTRL-C",
        standard: "ansi"
    },
    {
        name: "SIGQUIT",
        number: 3,
        action: "core",
        description: "User interruption with CTRL-\\",
        standard: "posix"
    },
    {
        name: "SIGILL",
        number: 4,
        action: "core",
        description: "Invalid machine instruction",
        standard: "ansi"
    },
    {
        name: "SIGTRAP",
        number: 5,
        action: "core",
        description: "Debugger breakpoint",
        standard: "posix"
    },
    {
        name: "SIGABRT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "ansi"
    },
    {
        name: "SIGIOT",
        number: 6,
        action: "core",
        description: "Aborted",
        standard: "bsd"
    },
    {
        name: "SIGBUS",
        number: 7,
        action: "core",
        description: "Bus error due to misaligned, non-existing address or paging error",
        standard: "bsd"
    },
    {
        name: "SIGEMT",
        number: 7,
        action: "terminate",
        description: "Command should be emulated but is not implemented",
        standard: "other"
    },
    {
        name: "SIGFPE",
        number: 8,
        action: "core",
        description: "Floating point arithmetic error",
        standard: "ansi"
    },
    {
        name: "SIGKILL",
        number: 9,
        action: "terminate",
        description: "Forced termination",
        standard: "posix",
        forced: true
    },
    {
        name: "SIGUSR1",
        number: 10,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
    },
    {
        name: "SIGSEGV",
        number: 11,
        action: "core",
        description: "Segmentation fault",
        standard: "ansi"
    },
    {
        name: "SIGUSR2",
        number: 12,
        action: "terminate",
        description: "Application-specific signal",
        standard: "posix"
    },
    {
        name: "SIGPIPE",
        number: 13,
        action: "terminate",
        description: "Broken pipe or socket",
        standard: "posix"
    },
    {
        name: "SIGALRM",
        number: 14,
        action: "terminate",
        description: "Timeout or timer",
        standard: "posix"
    },
    {
        name: "SIGTERM",
        number: 15,
        action: "terminate",
        description: "Termination",
        standard: "ansi"
    },
    {
        name: "SIGSTKFLT",
        number: 16,
        action: "terminate",
        description: "Stack is empty or overflowed",
        standard: "other"
    },
    {
        name: "SIGCHLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "posix"
    },
    {
        name: "SIGCLD",
        number: 17,
        action: "ignore",
        description: "Child process terminated, paused or unpaused",
        standard: "other"
    },
    {
        name: "SIGCONT",
        number: 18,
        action: "unpause",
        description: "Unpaused",
        standard: "posix",
        forced: true
    },
    {
        name: "SIGSTOP",
        number: 19,
        action: "pause",
        description: "Paused",
        standard: "posix",
        forced: true
    },
    {
        name: "SIGTSTP",
        number: 20,
        action: "pause",
        description: 'Paused using CTRL-Z or "suspend"',
        standard: "posix"
    },
    {
        name: "SIGTTIN",
        number: 21,
        action: "pause",
        description: "Background process cannot read terminal input",
        standard: "posix"
    },
    {
        name: "SIGBREAK",
        number: 21,
        action: "terminate",
        description: "User interruption with CTRL-BREAK",
        standard: "other"
    },
    {
        name: "SIGTTOU",
        number: 22,
        action: "pause",
        description: "Background process cannot write to terminal output",
        standard: "posix"
    },
    {
        name: "SIGURG",
        number: 23,
        action: "ignore",
        description: "Socket received out-of-band data",
        standard: "bsd"
    },
    {
        name: "SIGXCPU",
        number: 24,
        action: "core",
        description: "Process timed out",
        standard: "bsd"
    },
    {
        name: "SIGXFSZ",
        number: 25,
        action: "core",
        description: "File too big",
        standard: "bsd"
    },
    {
        name: "SIGVTALRM",
        number: 26,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
    },
    {
        name: "SIGPROF",
        number: 27,
        action: "terminate",
        description: "Timeout or timer",
        standard: "bsd"
    },
    {
        name: "SIGWINCH",
        number: 28,
        action: "ignore",
        description: "Terminal window size changed",
        standard: "bsd"
    },
    {
        name: "SIGIO",
        number: 29,
        action: "terminate",
        description: "I/O is available",
        standard: "other"
    },
    {
        name: "SIGPOLL",
        number: 29,
        action: "terminate",
        description: "Watched event",
        standard: "other"
    },
    {
        name: "SIGINFO",
        number: 29,
        action: "ignore",
        description: "Request for process information",
        standard: "other"
    },
    {
        name: "SIGPWR",
        number: 30,
        action: "terminate",
        description: "Device running out of power",
        standard: "systemv"
    },
    {
        name: "SIGSYS",
        number: 31,
        action: "core",
        description: "Invalid system call",
        standard: "other"
    },
    {
        name: "SIGUNUSED",
        number: 31,
        action: "terminate",
        description: "Invalid system call",
        standard: "other"
    }
];
exports.SIGNALS = SIGNALS;

},{}],"gYVtp":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SIGRTMAX = exports.getRealtimeSignals = void 0;
const getRealtimeSignals = function() {
    const length = SIGRTMAX - SIGRTMIN + 1;
    return Array.from({
        length
    }, getRealtimeSignal);
};
exports.getRealtimeSignals = getRealtimeSignals;
const getRealtimeSignal = function(value, index) {
    return {
        name: `SIGRT${index + 1}`,
        number: SIGRTMIN + index,
        action: "terminate",
        description: "Application-specific signal (realtime)",
        standard: "posix"
    };
};
const SIGRTMIN = 34;
const SIGRTMAX = 64;
exports.SIGRTMAX = SIGRTMAX;

},{}],"1lbiC":[function(require,module,exports) {
"use strict";
const ansiStyles = require("97c24f57e31bbc89");
const { stdout: stdoutColor , stderr: stderrColor  } = require("7215a10cd8a8fa0c");
const { stringReplaceAll , stringEncaseCRLFWithFirstIndex  } = require("d89d704fe4620b6a");
const { isArray  } = Array;
// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = [
    "ansi",
    "ansi",
    "ansi256",
    "ansi16m"
];
const styles = Object.create(null);
const applyOptions = (object, options = {})=>{
    if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) throw new Error("The `level` option should be an integer from 0 to 3");
    // Detect level if not set manually
    const colorLevel = stdoutColor ? stdoutColor.level : 0;
    object.level = options.level === undefined ? colorLevel : options.level;
};
class ChalkClass {
    constructor(options){
        // eslint-disable-next-line no-constructor-return
        return chalkFactory(options);
    }
}
const chalkFactory = (options)=>{
    const chalk = {};
    applyOptions(chalk, options);
    chalk.template = (...arguments_)=>chalkTag(chalk.template, ...arguments_);
    Object.setPrototypeOf(chalk, Chalk.prototype);
    Object.setPrototypeOf(chalk.template, chalk);
    chalk.template.constructor = ()=>{
        throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
    };
    chalk.template.Instance = ChalkClass;
    return chalk.template;
};
function Chalk(options) {
    return chalkFactory(options);
}
for (const [styleName, style] of Object.entries(ansiStyles))styles[styleName] = {
    get () {
        const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
        Object.defineProperty(this, styleName, {
            value: builder
        });
        return builder;
    }
};
styles.visible = {
    get () {
        const builder = createBuilder(this, this._styler, true);
        Object.defineProperty(this, "visible", {
            value: builder
        });
        return builder;
    }
};
const usedModels = [
    "rgb",
    "hex",
    "keyword",
    "hsl",
    "hsv",
    "hwb",
    "ansi",
    "ansi256"
];
for (const model of usedModels)styles[model] = {
    get () {
        const { level  } = this;
        return function(...arguments_) {
            const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
            return createBuilder(this, styler, this._isEmpty);
        };
    }
};
for (const model of usedModels){
    const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
    styles[bgModel] = {
        get () {
            const { level  } = this;
            return function(...arguments_) {
                const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
                return createBuilder(this, styler, this._isEmpty);
            };
        }
    };
}
const proto = Object.defineProperties(()=>{}, {
    ...styles,
    level: {
        enumerable: true,
        get () {
            return this._generator.level;
        },
        set (level) {
            this._generator.level = level;
        }
    }
});
const createStyler = (open, close, parent)=>{
    let openAll;
    let closeAll;
    if (parent === undefined) {
        openAll = open;
        closeAll = close;
    } else {
        openAll = parent.openAll + open;
        closeAll = close + parent.closeAll;
    }
    return {
        open,
        close,
        openAll,
        closeAll,
        parent
    };
};
const createBuilder = (self, _styler, _isEmpty)=>{
    const builder = (...arguments_)=>{
        if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) // Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
        return applyStyle(builder, chalkTag(builder, ...arguments_));
        // Single argument is hot path, implicit coercion is faster than anything
        // eslint-disable-next-line no-implicit-coercion
        return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
    };
    // We alter the prototype because we must return a function, but there is
    // no way to create a function with a different prototype
    Object.setPrototypeOf(builder, proto);
    builder._generator = self;
    builder._styler = _styler;
    builder._isEmpty = _isEmpty;
    return builder;
};
const applyStyle = (self, string)=>{
    if (self.level <= 0 || !string) return self._isEmpty ? "" : string;
    let styler = self._styler;
    if (styler === undefined) return string;
    const { openAll , closeAll  } = styler;
    if (string.indexOf("\x1b") !== -1) while(styler !== undefined){
        // Replace any instances already present with a re-opening code
        // otherwise only the part of the string until said closing code
        // will be colored, and the rest will simply be 'plain'.
        string = stringReplaceAll(string, styler.close, styler.open);
        styler = styler.parent;
    }
    // We can move both next actions out of loop, because remaining actions in loop won't have
    // any/visible effect on parts we add here. Close the styling before a linebreak and reopen
    // after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
    const lfIndex = string.indexOf("\n");
    if (lfIndex !== -1) string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
    return openAll + string + closeAll;
};
let template;
const chalkTag = (chalk, ...strings)=>{
    const [firstString] = strings;
    if (!isArray(firstString) || !isArray(firstString.raw)) // If chalk() was called by itself or with a string,
    // return the string itself as a string.
    return strings.join(" ");
    const arguments_ = strings.slice(1);
    const parts = [
        firstString.raw[0]
    ];
    for(let i = 1; i < firstString.length; i++)parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
    if (template === undefined) template = require("ac2dc23703ebfe28");
    return template(chalk, parts.join(""));
};
Object.defineProperties(Chalk.prototype, styles);
const chalk = Chalk(); // eslint-disable-line new-cap
chalk.supportsColor = stdoutColor;
chalk.stderr = Chalk({
    level: stderrColor ? stderrColor.level : 0
}); // eslint-disable-line new-cap
chalk.stderr.supportsColor = stderrColor;
module.exports = chalk;

},{"97c24f57e31bbc89":"giUVR","7215a10cd8a8fa0c":"dF455","d89d704fe4620b6a":"5Xnnz","ac2dc23703ebfe28":"8Fq3e"}],"giUVR":[function(require,module,exports) {
"use strict";
const wrapAnsi16 = (fn, offset)=>(...args)=>{
        const code = fn(...args);
        return `\u001B[${code + offset}m`;
    };
const wrapAnsi256 = (fn, offset)=>(...args)=>{
        const code = fn(...args);
        return `\u001B[${38 + offset};5;${code}m`;
    };
const wrapAnsi16m = (fn, offset)=>(...args)=>{
        const rgb = fn(...args);
        return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
const ansi2ansi = (n)=>n;
const rgb2rgb = (r, g, b)=>[
        r,
        g,
        b
    ];
const setLazyProperty = (object, property, get)=>{
    Object.defineProperty(object, property, {
        get: ()=>{
            const value = get();
            Object.defineProperty(object, property, {
                value,
                enumerable: true,
                configurable: true
            });
            return value;
        },
        enumerable: true,
        configurable: true
    });
};
/** @type {typeof import('color-convert')} */ let colorConvert;
const makeDynamicStyles = (wrap, targetSpace, identity, isBackground)=>{
    if (colorConvert === undefined) colorConvert = require("51c9480ea67799f1");
    const offset = isBackground ? 10 : 0;
    const styles = {};
    for (const [sourceSpace, suite] of Object.entries(colorConvert)){
        const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
        if (sourceSpace === targetSpace) styles[name] = wrap(identity, offset);
        else if (typeof suite === "object") styles[name] = wrap(suite[targetSpace], offset);
    }
    return styles;
};
function assembleStyles() {
    const codes = new Map();
    const styles = {
        modifier: {
            reset: [
                0,
                0
            ],
            // 21 isn't widely supported and 22 does the same thing
            bold: [
                1,
                22
            ],
            dim: [
                2,
                22
            ],
            italic: [
                3,
                23
            ],
            underline: [
                4,
                24
            ],
            inverse: [
                7,
                27
            ],
            hidden: [
                8,
                28
            ],
            strikethrough: [
                9,
                29
            ]
        },
        color: {
            black: [
                30,
                39
            ],
            red: [
                31,
                39
            ],
            green: [
                32,
                39
            ],
            yellow: [
                33,
                39
            ],
            blue: [
                34,
                39
            ],
            magenta: [
                35,
                39
            ],
            cyan: [
                36,
                39
            ],
            white: [
                37,
                39
            ],
            // Bright color
            blackBright: [
                90,
                39
            ],
            redBright: [
                91,
                39
            ],
            greenBright: [
                92,
                39
            ],
            yellowBright: [
                93,
                39
            ],
            blueBright: [
                94,
                39
            ],
            magentaBright: [
                95,
                39
            ],
            cyanBright: [
                96,
                39
            ],
            whiteBright: [
                97,
                39
            ]
        },
        bgColor: {
            bgBlack: [
                40,
                49
            ],
            bgRed: [
                41,
                49
            ],
            bgGreen: [
                42,
                49
            ],
            bgYellow: [
                43,
                49
            ],
            bgBlue: [
                44,
                49
            ],
            bgMagenta: [
                45,
                49
            ],
            bgCyan: [
                46,
                49
            ],
            bgWhite: [
                47,
                49
            ],
            // Bright color
            bgBlackBright: [
                100,
                49
            ],
            bgRedBright: [
                101,
                49
            ],
            bgGreenBright: [
                102,
                49
            ],
            bgYellowBright: [
                103,
                49
            ],
            bgBlueBright: [
                104,
                49
            ],
            bgMagentaBright: [
                105,
                49
            ],
            bgCyanBright: [
                106,
                49
            ],
            bgWhiteBright: [
                107,
                49
            ]
        }
    };
    // Alias bright black as gray (and grey)
    styles.color.gray = styles.color.blackBright;
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
    styles.color.grey = styles.color.blackBright;
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles)){
        for (const [styleName, style] of Object.entries(group)){
            styles[styleName] = {
                open: `\u001B[${style[0]}m`,
                close: `\u001B[${style[1]}m`
            };
            group[styleName] = styles[styleName];
            codes.set(style[0], style[1]);
        }
        Object.defineProperty(styles, groupName, {
            value: group,
            enumerable: false
        });
    }
    Object.defineProperty(styles, "codes", {
        value: codes,
        enumerable: false
    });
    styles.color.close = "\x1b[39m";
    styles.bgColor.close = "\x1b[49m";
    setLazyProperty(styles.color, "ansi", ()=>makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi256", ()=>makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
    setLazyProperty(styles.color, "ansi16m", ()=>makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
    setLazyProperty(styles.bgColor, "ansi", ()=>makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi256", ()=>makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
    setLazyProperty(styles.bgColor, "ansi16m", ()=>makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
    return styles;
}
// Make the export immutable
Object.defineProperty(module, "exports", {
    enumerable: true,
    get: assembleStyles
});

},{"51c9480ea67799f1":"ejHXH"}],"ejHXH":[function(require,module,exports) {
const conversions = require("5cea820ecae4480c");
const route = require("a1b1f1421f0ba3c3");
const convert = {};
const models = Object.keys(conversions);
function wrapRaw(fn) {
    const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === undefined || arg0 === null) return arg0;
        if (arg0.length > 1) args = arg0;
        return fn(args);
    };
    // Preserve .conversion property if there is one
    if ("conversion" in fn) wrappedFn.conversion = fn.conversion;
    return wrappedFn;
}
function wrapRounded(fn) {
    const wrappedFn = function(...args) {
        const arg0 = args[0];
        if (arg0 === undefined || arg0 === null) return arg0;
        if (arg0.length > 1) args = arg0;
        const result = fn(args);
        // We're assuming the result is an array here.
        // see notice in conversions.js; don't use box types
        // in conversion functions.
        if (typeof result === "object") for(let len = result.length, i = 0; i < len; i++)result[i] = Math.round(result[i]);
        return result;
    };
    // Preserve .conversion property if there is one
    if ("conversion" in fn) wrappedFn.conversion = fn.conversion;
    return wrappedFn;
}
models.forEach((fromModel)=>{
    convert[fromModel] = {};
    Object.defineProperty(convert[fromModel], "channels", {
        value: conversions[fromModel].channels
    });
    Object.defineProperty(convert[fromModel], "labels", {
        value: conversions[fromModel].labels
    });
    const routes = route(fromModel);
    const routeModels = Object.keys(routes);
    routeModels.forEach((toModel)=>{
        const fn = routes[toModel];
        convert[fromModel][toModel] = wrapRounded(fn);
        convert[fromModel][toModel].raw = wrapRaw(fn);
    });
});
module.exports = convert;

},{"5cea820ecae4480c":"fPIGR","a1b1f1421f0ba3c3":"io5C2"}],"fPIGR":[function(require,module,exports) {
/* MIT license */ /* eslint-disable no-mixed-operators */ const cssKeywords = require("202a4bc8a79b4e07");
// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)
const reverseKeywords = {};
for (const key of Object.keys(cssKeywords))reverseKeywords[cssKeywords[key]] = key;
const convert = {
    rgb: {
        channels: 3,
        labels: "rgb"
    },
    hsl: {
        channels: 3,
        labels: "hsl"
    },
    hsv: {
        channels: 3,
        labels: "hsv"
    },
    hwb: {
        channels: 3,
        labels: "hwb"
    },
    cmyk: {
        channels: 4,
        labels: "cmyk"
    },
    xyz: {
        channels: 3,
        labels: "xyz"
    },
    lab: {
        channels: 3,
        labels: "lab"
    },
    lch: {
        channels: 3,
        labels: "lch"
    },
    hex: {
        channels: 1,
        labels: [
            "hex"
        ]
    },
    keyword: {
        channels: 1,
        labels: [
            "keyword"
        ]
    },
    ansi16: {
        channels: 1,
        labels: [
            "ansi16"
        ]
    },
    ansi256: {
        channels: 1,
        labels: [
            "ansi256"
        ]
    },
    hcg: {
        channels: 3,
        labels: [
            "h",
            "c",
            "g"
        ]
    },
    apple: {
        channels: 3,
        labels: [
            "r16",
            "g16",
            "b16"
        ]
    },
    gray: {
        channels: 1,
        labels: [
            "gray"
        ]
    }
};
module.exports = convert;
// Hide .channels and .labels properties
for (const model of Object.keys(convert)){
    if (!("channels" in convert[model])) throw new Error("missing channels property: " + model);
    if (!("labels" in convert[model])) throw new Error("missing channel labels property: " + model);
    if (convert[model].labels.length !== convert[model].channels) throw new Error("channel and label counts mismatch: " + model);
    const { channels , labels  } = convert[model];
    delete convert[model].channels;
    delete convert[model].labels;
    Object.defineProperty(convert[model], "channels", {
        value: channels
    });
    Object.defineProperty(convert[model], "labels", {
        value: labels
    });
}
convert.rgb.hsl = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    let h;
    let s;
    if (max === min) h = 0;
    else if (r === max) h = (g - b) / delta;
    else if (g === max) h = 2 + (b - r) / delta;
    else if (b === max) h = 4 + (r - g) / delta;
    h = Math.min(h * 60, 360);
    if (h < 0) h += 360;
    const l = (min + max) / 2;
    if (max === min) s = 0;
    else if (l <= 0.5) s = delta / (max + min);
    else s = delta / (2 - max - min);
    return [
        h,
        s * 100,
        l * 100
    ];
};
convert.rgb.hsv = function(rgb) {
    let rdif;
    let gdif;
    let bdif;
    let h;
    let s;
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const v = Math.max(r, g, b);
    const diff = v - Math.min(r, g, b);
    const diffc = function(c) {
        return (v - c) / 6 / diff + 0.5;
    };
    if (diff === 0) {
        h = 0;
        s = 0;
    } else {
        s = diff / v;
        rdif = diffc(r);
        gdif = diffc(g);
        bdif = diffc(b);
        if (r === v) h = bdif - gdif;
        else if (g === v) h = 1 / 3 + rdif - bdif;
        else if (b === v) h = 2 / 3 + gdif - rdif;
        if (h < 0) h += 1;
        else if (h > 1) h -= 1;
    }
    return [
        h * 360,
        s * 100,
        v * 100
    ];
};
convert.rgb.hwb = function(rgb) {
    const r = rgb[0];
    const g = rgb[1];
    let b = rgb[2];
    const h = convert.rgb.hsl(rgb)[0];
    const w = 1 / 255 * Math.min(r, Math.min(g, b));
    b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    return [
        h,
        w * 100,
        b * 100
    ];
};
convert.rgb.cmyk = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    return [
        c * 100,
        m * 100,
        y * 100,
        k * 100
    ];
};
function comparativeDistance(x, y) {
    /*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/ return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
}
convert.rgb.keyword = function(rgb) {
    const reversed = reverseKeywords[rgb];
    if (reversed) return reversed;
    let currentClosestDistance = Infinity;
    let currentClosestKeyword;
    for (const keyword of Object.keys(cssKeywords)){
        const value = cssKeywords[keyword];
        // Compute comparative distance
        const distance = comparativeDistance(rgb, value);
        // Check if its less, if so set as closest
        if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
        }
    }
    return currentClosestKeyword;
};
convert.keyword.rgb = function(keyword) {
    return cssKeywords[keyword];
};
convert.rgb.xyz = function(rgb) {
    let r = rgb[0] / 255;
    let g = rgb[1] / 255;
    let b = rgb[2] / 255;
    // Assume sRGB
    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [
        x * 100,
        y * 100,
        z * 100
    ];
};
convert.rgb.lab = function(rgb) {
    const xyz = convert.rgb.xyz(rgb);
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [
        l,
        a,
        b
    ];
};
convert.hsl.rgb = function(hsl) {
    const h = hsl[0] / 360;
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    let t2;
    let t3;
    let val;
    if (s === 0) {
        val = l * 255;
        return [
            val,
            val,
            val
        ];
    }
    if (l < 0.5) t2 = l * (1 + s);
    else t2 = l + s - l * s;
    const t1 = 2 * l - t2;
    const rgb = [
        0,
        0,
        0
    ];
    for(let i = 0; i < 3; i++){
        t3 = h + 1 / 3 * -(i - 1);
        if (t3 < 0) t3++;
        if (t3 > 1) t3--;
        if (6 * t3 < 1) val = t1 + (t2 - t1) * 6 * t3;
        else if (2 * t3 < 1) val = t2;
        else if (3 * t3 < 2) val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
        else val = t1;
        rgb[i] = val * 255;
    }
    return rgb;
};
convert.hsl.hsv = function(hsl) {
    const h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    let smin = s;
    const lmin = Math.max(l, 0.01);
    l *= 2;
    s *= l <= 1 ? l : 2 - l;
    smin *= lmin <= 1 ? lmin : 2 - lmin;
    const v = (l + s) / 2;
    const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
    return [
        h,
        sv * 100,
        v * 100
    ];
};
convert.hsv.rgb = function(hsv) {
    const h = hsv[0] / 60;
    const s = hsv[1] / 100;
    let v = hsv[2] / 100;
    const hi = Math.floor(h) % 6;
    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v *= 255;
    switch(hi){
        case 0:
            return [
                v,
                t,
                p
            ];
        case 1:
            return [
                q,
                v,
                p
            ];
        case 2:
            return [
                p,
                v,
                t
            ];
        case 3:
            return [
                p,
                q,
                v
            ];
        case 4:
            return [
                t,
                p,
                v
            ];
        case 5:
            return [
                v,
                p,
                q
            ];
    }
};
convert.hsv.hsl = function(hsv) {
    const h = hsv[0];
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const vmin = Math.max(v, 0.01);
    let sl;
    let l;
    l = (2 - s) * v;
    const lmin = (2 - s) * vmin;
    sl = s * vmin;
    sl /= lmin <= 1 ? lmin : 2 - lmin;
    sl = sl || 0;
    l /= 2;
    return [
        h,
        sl * 100,
        l * 100
    ];
};
// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function(hwb) {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let f;
    // Wh + bl cant be > 1
    if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
    }
    const i = Math.floor(6 * h);
    const v = 1 - bl;
    f = 6 * h - i;
    if ((i & 0x01) !== 0) f = 1 - f;
    const n = wh + f * (v - wh); // Linear interpolation
    let r;
    let g;
    let b;
    /* eslint-disable max-statements-per-line,no-multi-spaces */ switch(i){
        default:
        case 6:
        case 0:
            r = v;
            g = n;
            b = wh;
            break;
        case 1:
            r = n;
            g = v;
            b = wh;
            break;
        case 2:
            r = wh;
            g = v;
            b = n;
            break;
        case 3:
            r = wh;
            g = n;
            b = v;
            break;
        case 4:
            r = n;
            g = wh;
            b = v;
            break;
        case 5:
            r = v;
            g = wh;
            b = n;
            break;
    }
    /* eslint-enable max-statements-per-line,no-multi-spaces */ return [
        r * 255,
        g * 255,
        b * 255
    ];
};
convert.cmyk.rgb = function(cmyk) {
    const c = cmyk[0] / 100;
    const m = cmyk[1] / 100;
    const y = cmyk[2] / 100;
    const k = cmyk[3] / 100;
    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);
    return [
        r * 255,
        g * 255,
        b * 255
    ];
};
convert.xyz.rgb = function(xyz) {
    const x = xyz[0] / 100;
    const y = xyz[1] / 100;
    const z = xyz[2] / 100;
    let r;
    let g;
    let b;
    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.0570;
    // Assume sRGB
    r = r > 0.0031308 ? 1.055 * r ** (1.0 / 2.4) - 0.055 : r * 12.92;
    g = g > 0.0031308 ? 1.055 * g ** (1.0 / 2.4) - 0.055 : g * 12.92;
    b = b > 0.0031308 ? 1.055 * b ** (1.0 / 2.4) - 0.055 : b * 12.92;
    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);
    return [
        r * 255,
        g * 255,
        b * 255
    ];
};
convert.xyz.lab = function(xyz) {
    let x = xyz[0];
    let y = xyz[1];
    let z = xyz[2];
    x /= 95.047;
    y /= 100;
    z /= 108.883;
    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [
        l,
        a,
        b
    ];
};
convert.lab.xyz = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let x;
    let y;
    let z;
    y = (l + 16) / 116;
    x = a / 500 + y;
    z = y - b / 200;
    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;
    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
    x *= 95.047;
    y *= 100;
    z *= 108.883;
    return [
        x,
        y,
        z
    ];
};
convert.lab.lch = function(lab) {
    const l = lab[0];
    const a = lab[1];
    const b = lab[2];
    let h;
    const hr = Math.atan2(b, a);
    h = hr * 360 / 2 / Math.PI;
    if (h < 0) h += 360;
    const c = Math.sqrt(a * a + b * b);
    return [
        l,
        c,
        h
    ];
};
convert.lch.lab = function(lch) {
    const l = lch[0];
    const c = lch[1];
    const h = lch[2];
    const hr = h / 360 * 2 * Math.PI;
    const a = c * Math.cos(hr);
    const b = c * Math.sin(hr);
    return [
        l,
        a,
        b
    ];
};
convert.rgb.ansi16 = function(args, saturation = null) {
    const [r, g, b] = args;
    let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization
    value = Math.round(value / 50);
    if (value === 0) return 30;
    let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
    if (value === 2) ansi += 60;
    return ansi;
};
convert.hsv.ansi16 = function(args) {
    // Optimization here; we already know the value and don't need to get
    // it converted for us.
    return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};
convert.rgb.ansi256 = function(args) {
    const r = args[0];
    const g = args[1];
    const b = args[2];
    // We use the extended greyscale palette here, with the exception of
    // black and white. normal palette only has 4 greyscale shades.
    if (r === g && g === b) {
        if (r < 8) return 16;
        if (r > 248) return 231;
        return Math.round((r - 8) / 247 * 24) + 232;
    }
    const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
    return ansi;
};
convert.ansi16.rgb = function(args) {
    let color = args % 10;
    // Handle greyscale
    if (color === 0 || color === 7) {
        if (args > 50) color += 3.5;
        color = color / 10.5 * 255;
        return [
            color,
            color,
            color
        ];
    }
    const mult = (~~(args > 50) + 1) * 0.5;
    const r = (color & 1) * mult * 255;
    const g = (color >> 1 & 1) * mult * 255;
    const b = (color >> 2 & 1) * mult * 255;
    return [
        r,
        g,
        b
    ];
};
convert.ansi256.rgb = function(args) {
    // Handle greyscale
    if (args >= 232) {
        const c = (args - 232) * 10 + 8;
        return [
            c,
            c,
            c
        ];
    }
    args -= 16;
    let rem;
    const r = Math.floor(args / 36) / 5 * 255;
    const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
    const b = rem % 6 / 5 * 255;
    return [
        r,
        g,
        b
    ];
};
convert.rgb.hex = function(args) {
    const integer = ((Math.round(args[0]) & 0xFF) << 16) + ((Math.round(args[1]) & 0xFF) << 8) + (Math.round(args[2]) & 0xFF);
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
};
convert.hex.rgb = function(args) {
    const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
    if (!match) return [
        0,
        0,
        0
    ];
    let colorString = match[0];
    if (match[0].length === 3) colorString = colorString.split("").map((char)=>{
        return char + char;
    }).join("");
    const integer = parseInt(colorString, 16);
    const r = integer >> 16 & 0xFF;
    const g = integer >> 8 & 0xFF;
    const b = integer & 0xFF;
    return [
        r,
        g,
        b
    ];
};
convert.rgb.hcg = function(rgb) {
    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;
    const max = Math.max(Math.max(r, g), b);
    const min = Math.min(Math.min(r, g), b);
    const chroma = max - min;
    let grayscale;
    let hue;
    if (chroma < 1) grayscale = min / (1 - chroma);
    else grayscale = 0;
    if (chroma <= 0) hue = 0;
    else if (max === r) hue = (g - b) / chroma % 6;
    else if (max === g) hue = 2 + (b - r) / chroma;
    else hue = 4 + (r - g) / chroma;
    hue /= 6;
    hue %= 1;
    return [
        hue * 360,
        chroma * 100,
        grayscale * 100
    ];
};
convert.hsl.hcg = function(hsl) {
    const s = hsl[1] / 100;
    const l = hsl[2] / 100;
    const c = l < 0.5 ? 2.0 * s * l : 2.0 * s * (1.0 - l);
    let f = 0;
    if (c < 1.0) f = (l - 0.5 * c) / (1.0 - c);
    return [
        hsl[0],
        c * 100,
        f * 100
    ];
};
convert.hsv.hcg = function(hsv) {
    const s = hsv[1] / 100;
    const v = hsv[2] / 100;
    const c = s * v;
    let f = 0;
    if (c < 1.0) f = (v - c) / (1 - c);
    return [
        hsv[0],
        c * 100,
        f * 100
    ];
};
convert.hcg.rgb = function(hcg) {
    const h = hcg[0] / 360;
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    if (c === 0.0) return [
        g * 255,
        g * 255,
        g * 255
    ];
    const pure = [
        0,
        0,
        0
    ];
    const hi = h % 1 * 6;
    const v = hi % 1;
    const w = 1 - v;
    let mg = 0;
    /* eslint-disable max-statements-per-line */ switch(Math.floor(hi)){
        case 0:
            pure[0] = 1;
            pure[1] = v;
            pure[2] = 0;
            break;
        case 1:
            pure[0] = w;
            pure[1] = 1;
            pure[2] = 0;
            break;
        case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v;
            break;
        case 3:
            pure[0] = 0;
            pure[1] = w;
            pure[2] = 1;
            break;
        case 4:
            pure[0] = v;
            pure[1] = 0;
            pure[2] = 1;
            break;
        default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w;
    }
    /* eslint-enable max-statements-per-line */ mg = (1.0 - c) * g;
    return [
        (c * pure[0] + mg) * 255,
        (c * pure[1] + mg) * 255,
        (c * pure[2] + mg) * 255
    ];
};
convert.hcg.hsv = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1.0 - c);
    let f = 0;
    if (v > 0.0) f = c / v;
    return [
        hcg[0],
        f * 100,
        v * 100
    ];
};
convert.hcg.hsl = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const l = g * (1.0 - c) + 0.5 * c;
    let s = 0;
    if (l > 0.0 && l < 0.5) s = c / (2 * l);
    else if (l >= 0.5 && l < 1.0) s = c / (2 * (1 - l));
    return [
        hcg[0],
        s * 100,
        l * 100
    ];
};
convert.hcg.hwb = function(hcg) {
    const c = hcg[1] / 100;
    const g = hcg[2] / 100;
    const v = c + g * (1.0 - c);
    return [
        hcg[0],
        (v - c) * 100,
        (1 - v) * 100
    ];
};
convert.hwb.hcg = function(hwb) {
    const w = hwb[1] / 100;
    const b = hwb[2] / 100;
    const v = 1 - b;
    const c = v - w;
    let g = 0;
    if (c < 1) g = (v - c) / (1 - c);
    return [
        hwb[0],
        c * 100,
        g * 100
    ];
};
convert.apple.rgb = function(apple) {
    return [
        apple[0] / 65535 * 255,
        apple[1] / 65535 * 255,
        apple[2] / 65535 * 255
    ];
};
convert.rgb.apple = function(rgb) {
    return [
        rgb[0] / 255 * 65535,
        rgb[1] / 255 * 65535,
        rgb[2] / 255 * 65535
    ];
};
convert.gray.rgb = function(args) {
    return [
        args[0] / 100 * 255,
        args[0] / 100 * 255,
        args[0] / 100 * 255
    ];
};
convert.gray.hsl = function(args) {
    return [
        0,
        0,
        args[0]
    ];
};
convert.gray.hsv = convert.gray.hsl;
convert.gray.hwb = function(gray) {
    return [
        0,
        100,
        gray[0]
    ];
};
convert.gray.cmyk = function(gray) {
    return [
        0,
        0,
        0,
        gray[0]
    ];
};
convert.gray.lab = function(gray) {
    return [
        gray[0],
        0,
        0
    ];
};
convert.gray.hex = function(gray) {
    const val = Math.round(gray[0] / 100 * 255) & 0xFF;
    const integer = (val << 16) + (val << 8) + val;
    const string = integer.toString(16).toUpperCase();
    return "000000".substring(string.length) + string;
};
convert.rgb.gray = function(rgb) {
    const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
    return [
        val / 255 * 100
    ];
};

},{"202a4bc8a79b4e07":"64jru"}],"64jru":[function(require,module,exports) {
"use strict";
module.exports = {
    "aliceblue": [
        240,
        248,
        255
    ],
    "antiquewhite": [
        250,
        235,
        215
    ],
    "aqua": [
        0,
        255,
        255
    ],
    "aquamarine": [
        127,
        255,
        212
    ],
    "azure": [
        240,
        255,
        255
    ],
    "beige": [
        245,
        245,
        220
    ],
    "bisque": [
        255,
        228,
        196
    ],
    "black": [
        0,
        0,
        0
    ],
    "blanchedalmond": [
        255,
        235,
        205
    ],
    "blue": [
        0,
        0,
        255
    ],
    "blueviolet": [
        138,
        43,
        226
    ],
    "brown": [
        165,
        42,
        42
    ],
    "burlywood": [
        222,
        184,
        135
    ],
    "cadetblue": [
        95,
        158,
        160
    ],
    "chartreuse": [
        127,
        255,
        0
    ],
    "chocolate": [
        210,
        105,
        30
    ],
    "coral": [
        255,
        127,
        80
    ],
    "cornflowerblue": [
        100,
        149,
        237
    ],
    "cornsilk": [
        255,
        248,
        220
    ],
    "crimson": [
        220,
        20,
        60
    ],
    "cyan": [
        0,
        255,
        255
    ],
    "darkblue": [
        0,
        0,
        139
    ],
    "darkcyan": [
        0,
        139,
        139
    ],
    "darkgoldenrod": [
        184,
        134,
        11
    ],
    "darkgray": [
        169,
        169,
        169
    ],
    "darkgreen": [
        0,
        100,
        0
    ],
    "darkgrey": [
        169,
        169,
        169
    ],
    "darkkhaki": [
        189,
        183,
        107
    ],
    "darkmagenta": [
        139,
        0,
        139
    ],
    "darkolivegreen": [
        85,
        107,
        47
    ],
    "darkorange": [
        255,
        140,
        0
    ],
    "darkorchid": [
        153,
        50,
        204
    ],
    "darkred": [
        139,
        0,
        0
    ],
    "darksalmon": [
        233,
        150,
        122
    ],
    "darkseagreen": [
        143,
        188,
        143
    ],
    "darkslateblue": [
        72,
        61,
        139
    ],
    "darkslategray": [
        47,
        79,
        79
    ],
    "darkslategrey": [
        47,
        79,
        79
    ],
    "darkturquoise": [
        0,
        206,
        209
    ],
    "darkviolet": [
        148,
        0,
        211
    ],
    "deeppink": [
        255,
        20,
        147
    ],
    "deepskyblue": [
        0,
        191,
        255
    ],
    "dimgray": [
        105,
        105,
        105
    ],
    "dimgrey": [
        105,
        105,
        105
    ],
    "dodgerblue": [
        30,
        144,
        255
    ],
    "firebrick": [
        178,
        34,
        34
    ],
    "floralwhite": [
        255,
        250,
        240
    ],
    "forestgreen": [
        34,
        139,
        34
    ],
    "fuchsia": [
        255,
        0,
        255
    ],
    "gainsboro": [
        220,
        220,
        220
    ],
    "ghostwhite": [
        248,
        248,
        255
    ],
    "gold": [
        255,
        215,
        0
    ],
    "goldenrod": [
        218,
        165,
        32
    ],
    "gray": [
        128,
        128,
        128
    ],
    "green": [
        0,
        128,
        0
    ],
    "greenyellow": [
        173,
        255,
        47
    ],
    "grey": [
        128,
        128,
        128
    ],
    "honeydew": [
        240,
        255,
        240
    ],
    "hotpink": [
        255,
        105,
        180
    ],
    "indianred": [
        205,
        92,
        92
    ],
    "indigo": [
        75,
        0,
        130
    ],
    "ivory": [
        255,
        255,
        240
    ],
    "khaki": [
        240,
        230,
        140
    ],
    "lavender": [
        230,
        230,
        250
    ],
    "lavenderblush": [
        255,
        240,
        245
    ],
    "lawngreen": [
        124,
        252,
        0
    ],
    "lemonchiffon": [
        255,
        250,
        205
    ],
    "lightblue": [
        173,
        216,
        230
    ],
    "lightcoral": [
        240,
        128,
        128
    ],
    "lightcyan": [
        224,
        255,
        255
    ],
    "lightgoldenrodyellow": [
        250,
        250,
        210
    ],
    "lightgray": [
        211,
        211,
        211
    ],
    "lightgreen": [
        144,
        238,
        144
    ],
    "lightgrey": [
        211,
        211,
        211
    ],
    "lightpink": [
        255,
        182,
        193
    ],
    "lightsalmon": [
        255,
        160,
        122
    ],
    "lightseagreen": [
        32,
        178,
        170
    ],
    "lightskyblue": [
        135,
        206,
        250
    ],
    "lightslategray": [
        119,
        136,
        153
    ],
    "lightslategrey": [
        119,
        136,
        153
    ],
    "lightsteelblue": [
        176,
        196,
        222
    ],
    "lightyellow": [
        255,
        255,
        224
    ],
    "lime": [
        0,
        255,
        0
    ],
    "limegreen": [
        50,
        205,
        50
    ],
    "linen": [
        250,
        240,
        230
    ],
    "magenta": [
        255,
        0,
        255
    ],
    "maroon": [
        128,
        0,
        0
    ],
    "mediumaquamarine": [
        102,
        205,
        170
    ],
    "mediumblue": [
        0,
        0,
        205
    ],
    "mediumorchid": [
        186,
        85,
        211
    ],
    "mediumpurple": [
        147,
        112,
        219
    ],
    "mediumseagreen": [
        60,
        179,
        113
    ],
    "mediumslateblue": [
        123,
        104,
        238
    ],
    "mediumspringgreen": [
        0,
        250,
        154
    ],
    "mediumturquoise": [
        72,
        209,
        204
    ],
    "mediumvioletred": [
        199,
        21,
        133
    ],
    "midnightblue": [
        25,
        25,
        112
    ],
    "mintcream": [
        245,
        255,
        250
    ],
    "mistyrose": [
        255,
        228,
        225
    ],
    "moccasin": [
        255,
        228,
        181
    ],
    "navajowhite": [
        255,
        222,
        173
    ],
    "navy": [
        0,
        0,
        128
    ],
    "oldlace": [
        253,
        245,
        230
    ],
    "olive": [
        128,
        128,
        0
    ],
    "olivedrab": [
        107,
        142,
        35
    ],
    "orange": [
        255,
        165,
        0
    ],
    "orangered": [
        255,
        69,
        0
    ],
    "orchid": [
        218,
        112,
        214
    ],
    "palegoldenrod": [
        238,
        232,
        170
    ],
    "palegreen": [
        152,
        251,
        152
    ],
    "paleturquoise": [
        175,
        238,
        238
    ],
    "palevioletred": [
        219,
        112,
        147
    ],
    "papayawhip": [
        255,
        239,
        213
    ],
    "peachpuff": [
        255,
        218,
        185
    ],
    "peru": [
        205,
        133,
        63
    ],
    "pink": [
        255,
        192,
        203
    ],
    "plum": [
        221,
        160,
        221
    ],
    "powderblue": [
        176,
        224,
        230
    ],
    "purple": [
        128,
        0,
        128
    ],
    "rebeccapurple": [
        102,
        51,
        153
    ],
    "red": [
        255,
        0,
        0
    ],
    "rosybrown": [
        188,
        143,
        143
    ],
    "royalblue": [
        65,
        105,
        225
    ],
    "saddlebrown": [
        139,
        69,
        19
    ],
    "salmon": [
        250,
        128,
        114
    ],
    "sandybrown": [
        244,
        164,
        96
    ],
    "seagreen": [
        46,
        139,
        87
    ],
    "seashell": [
        255,
        245,
        238
    ],
    "sienna": [
        160,
        82,
        45
    ],
    "silver": [
        192,
        192,
        192
    ],
    "skyblue": [
        135,
        206,
        235
    ],
    "slateblue": [
        106,
        90,
        205
    ],
    "slategray": [
        112,
        128,
        144
    ],
    "slategrey": [
        112,
        128,
        144
    ],
    "snow": [
        255,
        250,
        250
    ],
    "springgreen": [
        0,
        255,
        127
    ],
    "steelblue": [
        70,
        130,
        180
    ],
    "tan": [
        210,
        180,
        140
    ],
    "teal": [
        0,
        128,
        128
    ],
    "thistle": [
        216,
        191,
        216
    ],
    "tomato": [
        255,
        99,
        71
    ],
    "turquoise": [
        64,
        224,
        208
    ],
    "violet": [
        238,
        130,
        238
    ],
    "wheat": [
        245,
        222,
        179
    ],
    "white": [
        255,
        255,
        255
    ],
    "whitesmoke": [
        245,
        245,
        245
    ],
    "yellow": [
        255,
        255,
        0
    ],
    "yellowgreen": [
        154,
        205,
        50
    ]
};

},{}],"io5C2":[function(require,module,exports) {
const conversions = require("4134055868a78b1");
/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/ function buildGraph() {
    const graph = {};
    // https://jsperf.com/object-keys-vs-for-in-with-closure/3
    const models = Object.keys(conversions);
    for(let len = models.length, i = 0; i < len; i++)graph[models[i]] = {
        // http://jsperf.com/1-vs-infinity
        // micro-opt, but this is simple.
        distance: -1,
        parent: null
    };
    return graph;
}
// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
    const graph = buildGraph();
    const queue = [
        fromModel
    ]; // Unshift -> queue -> pop
    graph[fromModel].distance = 0;
    while(queue.length){
        const current = queue.pop();
        const adjacents = Object.keys(conversions[current]);
        for(let len = adjacents.length, i = 0; i < len; i++){
            const adjacent = adjacents[i];
            const node = graph[adjacent];
            if (node.distance === -1) {
                node.distance = graph[current].distance + 1;
                node.parent = current;
                queue.unshift(adjacent);
            }
        }
    }
    return graph;
}
function link(from, to) {
    return function(args) {
        return to(from(args));
    };
}
function wrapConversion(toModel, graph) {
    const path = [
        graph[toModel].parent,
        toModel
    ];
    let fn = conversions[graph[toModel].parent][toModel];
    let cur = graph[toModel].parent;
    while(graph[cur].parent){
        path.unshift(graph[cur].parent);
        fn = link(conversions[graph[cur].parent][cur], fn);
        cur = graph[cur].parent;
    }
    fn.conversion = path;
    return fn;
}
module.exports = function(fromModel) {
    const graph = deriveBFS(fromModel);
    const conversion = {};
    const models = Object.keys(graph);
    for(let len = models.length, i = 0; i < len; i++){
        const toModel = models[i];
        const node = graph[toModel];
        if (node.parent === null) continue;
        conversion[toModel] = wrapConversion(toModel, graph);
    }
    return conversion;
};

},{"4134055868a78b1":"fPIGR"}],"dF455":[function(require,module,exports) {
"use strict";
const os = require("73a16740b284ea0b");
const tty = require("921f9149f729fc6e");
const hasFlag = require("13069c7dc230f2af");
const { env  } = process;
let forceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) forceColor = 0;
else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) forceColor = 1;
if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") forceColor = 1;
    else if (env.FORCE_COLOR === "false") forceColor = 0;
    else forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
}
function translateLevel(level) {
    if (level === 0) return false;
    return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
    };
}
function supportsColor(haveStream, streamIsTTY) {
    if (forceColor === 0) return 0;
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) return 3;
    if (hasFlag("color=256")) return 2;
    if (haveStream && !streamIsTTY && forceColor === undefined) return 0;
    const min = forceColor || 0;
    if (env.TERM === "dumb") return min;
    if (process.platform === "win32") {
        // Windows 10 build 10586 is the first Windows release that supports 256 colors.
        // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) return Number(osRelease[2]) >= 14931 ? 3 : 2;
        return 1;
    }
    if ("CI" in env) {
        if ([
            "TRAVIS",
            "CIRCLECI",
            "APPVEYOR",
            "GITLAB_CI",
            "GITHUB_ACTIONS",
            "BUILDKITE"
        ].some((sign)=>sign in env) || env.CI_NAME === "codeship") return 1;
        return min;
    }
    if ("TEAMCITY_VERSION" in env) return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    if (env.COLORTERM === "truecolor") return 3;
    if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch(env.TERM_PROGRAM){
            case "iTerm.app":
                return version >= 3 ? 3 : 2;
            case "Apple_Terminal":
                return 2;
        }
    }
    if (/-256(color)?$/i.test(env.TERM)) return 2;
    if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) return 1;
    if ("COLORTERM" in env) return 1;
    return min;
}
function getSupportLevel(stream) {
    const level = supportsColor(stream, stream && stream.isTTY);
    return translateLevel(level);
}
module.exports = {
    supportsColor: getSupportLevel,
    stdout: translateLevel(supportsColor(true, tty.isatty(1))),
    stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};

},{"73a16740b284ea0b":"os","921f9149f729fc6e":"tty","13069c7dc230f2af":"13N3U"}],"13N3U":[function(require,module,exports) {
"use strict";
module.exports = (flag, argv = process.argv)=>{
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const position = argv.indexOf(prefix + flag);
    const terminatorPosition = argv.indexOf("--");
    return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};

},{}],"5Xnnz":[function(require,module,exports) {
"use strict";
const stringReplaceAll = (string, substring, replacer)=>{
    let index = string.indexOf(substring);
    if (index === -1) return string;
    const substringLength = substring.length;
    let endIndex = 0;
    let returnValue = "";
    do {
        returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
        endIndex = index + substringLength;
        index = string.indexOf(substring, endIndex);
    }while (index !== -1);
    returnValue += string.substr(endIndex);
    return returnValue;
};
const stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index)=>{
    let endIndex = 0;
    let returnValue = "";
    do {
        const gotCR = string[index - 1] === "\r";
        returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
        endIndex = index + 1;
        index = string.indexOf("\n", endIndex);
    }while (index !== -1);
    returnValue += string.substr(endIndex);
    return returnValue;
};
module.exports = {
    stringReplaceAll,
    stringEncaseCRLFWithFirstIndex
};

},{}],"8Fq3e":[function(require,module,exports) {
"use strict";
const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
const ESCAPES = new Map([
    [
        "n",
        "\n"
    ],
    [
        "r",
        "\r"
    ],
    [
        "t",
        "	"
    ],
    [
        "b",
        "\b"
    ],
    [
        "f",
        "\f"
    ],
    [
        "v",
        "\v"
    ],
    [
        "0",
        "\0"
    ],
    [
        "\\",
        "\\"
    ],
    [
        "e",
        "\x1b"
    ],
    [
        "a",
        "\x07"
    ]
]);
function unescape(c) {
    const u = c[0] === "u";
    const bracket = c[1] === "{";
    if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) return String.fromCharCode(parseInt(c.slice(1), 16));
    if (u && bracket) return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
    return ESCAPES.get(c) || c;
}
function parseArguments(name, arguments_) {
    const results = [];
    const chunks = arguments_.trim().split(/\s*,\s*/g);
    let matches;
    for (const chunk of chunks){
        const number = Number(chunk);
        if (!Number.isNaN(number)) results.push(number);
        else if (matches = chunk.match(STRING_REGEX)) results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character)=>escape ? unescape(escape) : character));
        else throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
    }
    return results;
}
function parseStyle(style) {
    STYLE_REGEX.lastIndex = 0;
    const results = [];
    let matches;
    while((matches = STYLE_REGEX.exec(style)) !== null){
        const name = matches[1];
        if (matches[2]) {
            const args = parseArguments(name, matches[2]);
            results.push([
                name
            ].concat(args));
        } else results.push([
            name
        ]);
    }
    return results;
}
function buildStyle(chalk, styles) {
    const enabled = {};
    for (const layer of styles)for (const style of layer.styles)enabled[style[0]] = layer.inverse ? null : style.slice(1);
    let current = chalk;
    for (const [styleName, styles] of Object.entries(enabled)){
        if (!Array.isArray(styles)) continue;
        if (!(styleName in current)) throw new Error(`Unknown Chalk style: ${styleName}`);
        current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
    }
    return current;
}
module.exports = (chalk, temporary)=>{
    const styles = [];
    const chunks = [];
    let chunk = [];
    // eslint-disable-next-line max-params
    temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character)=>{
        if (escapeCharacter) chunk.push(unescape(escapeCharacter));
        else if (style) {
            const string = chunk.join("");
            chunk = [];
            chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
            styles.push({
                inverse,
                styles: parseStyle(style)
            });
        } else if (close) {
            if (styles.length === 0) throw new Error("Found extraneous } in Chalk template literal");
            chunks.push(buildStyle(chalk, styles)(chunk.join("")));
            chunk = [];
            styles.pop();
        } else chunk.push(character);
    });
    chunks.push(chunk.join(""));
    if (styles.length > 0) {
        const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
        throw new Error(errMessage);
    }
    return chunks.join("");
};

},{}],"iZ5sw":[function(require,module,exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as references for various `Number` constants. */ var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 1.7976931348623157e+308, NAN = 0 / 0;
/** `Object#toString` result references. */ var symbolTag = "[object Symbol]";
/** Used to match leading and trailing whitespace. */ var reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */ var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var reIsOctal = /^0o[0-7]+$/i;
/** Used to compose unicode character classes. */ var rsAstralRange = "\ud800-\udfff", rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23", rsComboSymbolsRange = "\\u20d0-\\u20f0", rsVarRange = "\\ufe0e\\ufe0f";
/** Used to compose unicode capture groups. */ var rsAstral = "[" + rsAstralRange + "]", rsCombo = "[" + rsComboMarksRange + rsComboSymbolsRange + "]", rsFitz = "\ud83c[\udffb-\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\ud83c[\udde6-\uddff]){2}", rsSurrPair = "[\ud800-\udbff][\udc00-\udfff]", rsZWJ = "\\u200d";
/** Used to compose unicode regexes. */ var reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [
    rsNonAstral,
    rsRegional,
    rsSurrPair
].join("|") + ")" + rsOptVar + reOptMod + ")*", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsSymbol = "(?:" + [
    rsNonAstral + rsCombo + "?",
    rsCombo,
    rsRegional,
    rsSurrPair,
    rsAstral
].join("|") + ")";
/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */ var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */ var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]");
/** Built-in method references without a dependency on `root`. */ var freeParseInt = parseInt;
/** Detect free variable `global` from Node.js. */ var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
/** Detect free variable `self`. */ var freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var root = freeGlobal || freeSelf || Function("return this")();
/**
 * Gets the size of an ASCII `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */ var asciiSize = baseProperty("length");
/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */ function asciiToArray(string) {
    return string.split("");
}
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */ function baseProperty(key) {
    return function(object) {
        return object == null ? undefined : object[key];
    };
}
/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */ function hasUnicode(string) {
    return reHasUnicode.test(string);
}
/**
 * Gets the number of symbols in `string`.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {number} Returns the string size.
 */ function stringSize(string) {
    return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
}
/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */ function stringToArray(string) {
    return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
}
/**
 * Gets the size of a Unicode `string`.
 *
 * @private
 * @param {string} string The string inspect.
 * @returns {number} Returns the string size.
 */ function unicodeSize(string) {
    var result = reUnicode.lastIndex = 0;
    while(reUnicode.test(string))result++;
    return result;
}
/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */ function unicodeToArray(string) {
    return string.match(reUnicode) || [];
}
/** Used for built-in method references. */ var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/** Built-in value references. */ var Symbol = root.Symbol;
/* Built-in method references for those with the same name as other `lodash` methods. */ var nativeCeil = Math.ceil, nativeFloor = Math.floor;
/** Used to convert symbols to primitives and strings. */ var symbolProto = Symbol ? Symbol.prototype : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.repeat` which doesn't coerce arguments.
 *
 * @private
 * @param {string} string The string to repeat.
 * @param {number} n The number of times to repeat the string.
 * @returns {string} Returns the repeated string.
 */ function baseRepeat(string, n) {
    var result = "";
    if (!string || n < 1 || n > MAX_SAFE_INTEGER) return result;
    // Leverage the exponentiation by squaring algorithm for a faster repeat.
    // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
    do {
        if (n % 2) result += string;
        n = nativeFloor(n / 2);
        if (n) string += string;
    }while (n);
    return result;
}
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */ function baseSlice(array, start, end) {
    var index = -1, length = array.length;
    if (start < 0) start = -start > length ? 0 : length + start;
    end = end > length ? length : end;
    if (end < 0) end += length;
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    var result = Array(length);
    while(++index < length)result[index] = array[index + start];
    return result;
}
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */ function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == "string") return value;
    if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */ function castSlice(array, start, end) {
    var length = array.length;
    end = end === undefined ? length : end;
    return !start && end >= length ? array : baseSlice(array, start, end);
}
/**
 * Creates the padding for `string` based on `length`. The `chars` string
 * is truncated if the number of characters exceeds `length`.
 *
 * @private
 * @param {number} length The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padding for `string`.
 */ function createPadding(length, chars) {
    chars = chars === undefined ? " " : baseToString(chars);
    var charsLength = chars.length;
    if (charsLength < 2) return charsLength ? baseRepeat(chars, length) : chars;
    var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
    return hasUnicode(chars) ? castSlice(stringToArray(result), 0, length).join("") : result.slice(0, length);
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == "object";
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */ function toFinite(value) {
    if (!value) return value === 0 ? value : 0;
    value = toNumber(value);
    if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
    }
    return value === value ? value : 0;
}
/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */ function toInteger(value) {
    var result = toFinite(value), remainder = result % 1;
    return result === result ? remainder ? result - remainder : result : 0;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function toNumber(value) {
    if (typeof value == "number") return value;
    if (isSymbol(value)) return NAN;
    if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
    }
    if (typeof value != "string") return value === 0 ? value : +value;
    value = value.replace(reTrim, "");
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */ function toString(value) {
    return value == null ? "" : baseToString(value);
}
/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.padEnd('abc', 6);
 * // => 'abc   '
 *
 * _.padEnd('abc', 6, '_-');
 * // => 'abc_-_'
 *
 * _.padEnd('abc', 3);
 * // => 'abc'
 */ function padEnd(string, length, chars) {
    string = toString(string);
    length = toInteger(length);
    var strLength = length ? stringSize(string) : 0;
    return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
}
module.exports = padEnd;

},{}],"4336l":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildApp", ()=>buildApp);
var _bundler = require("bundler");
var _dir = require("dir");
var _fs = require("fs");
var _fsJetpack = require("fs-jetpack");
const buildApp = async (opt)=>{
    await (0, _fsJetpack.writeAsync)((0, _dir.dir).path(".output/app/pnpm-workspace.yaml"), `\
packages:
  - ./*`);
    const dirs = (0, _fs.readdirSync)((0, _dir.dir).path("app")).filter((e)=>![
            "node_modules",
            "app.ts",
            "package.json",
            "gen"
        ].includes(e)).map((e)=>({
            name: e,
            stat: (0, _fs.statSync)((0, _dir.dir).path(`app/${e}`))
        })).filter(({ stat , name  })=>stat.isDirectory() && (0, _fs.existsSync)((0, _dir.dir).path(`app/${name}/main.ts`)));
    if (!await (0, _bundler.bundle)({
        input: (0, _dir.dir).root("app/app.ts"),
        output: (0, _dir.dir).root(".output/app/app.js"),
        pkgjson: (0, _dir.dir).root(".output/app/package.json")
    })) console.log("build failed");
    return {
        path: (0, _dir.dir).root(".output/app/app.js"),
        cwd: (0, _dir.dir).root(".output/app"),
        serviceNames: dirs.map((e)=>e.name)
    };
};

},{"bundler":"fcLYH","dir":"er1Is","fs":"fs","fs-jetpack":"dr8qG","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"fcLYH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _bundle = require("./src/bundle");
parcelHelpers.exportAll(_bundle, exports);
var _runner = require("./src/runner");
parcelHelpers.exportAll(_runner, exports);

},{"./src/bundle":"ewSxj","./src/runner":"h5KBY","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"ewSxj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bundle", ()=>bundle);
var _core = require("@parcel/core");
var _coreDefault = parcelHelpers.interopDefault(_core);
var _dir = require("dir");
var _fsJetpack = require("fs-jetpack");
var _path = require("path");
var _pkg = require("pkg");
const bundle = async (arg)=>{
    const { input , output , watch  } = arg;
    const cacheDir = (0, _dir.dir).root(`.output/.cache/${(0, _path.dirname)(input.substring((0, _dir.dir).root("").length + 1))}/cache`);
    try {
        await (0, _fsJetpack.dirAsync)(cacheDir);
        const bundler = new (0, _coreDefault.default)({
            entries: input,
            config: (0, _dir.dir).root("pkgs/base/pkgs/bundler/parcel.config.json5"),
            shouldBundleIncrementally: arg.incremental ? arg.incremental : true,
            cacheDir,
            targets: {
                default: {
                    distDir: (0, _path.dirname)(output),
                    distEntry: (0, _path.basename)(output),
                    sourceMap: true,
                    includeNodeModules: true,
                    engines: {
                        node: ">= 18"
                    }
                }
            }
        });
        const genPkgJson = async ()=>{
            if (arg.pkgjson) {
                const oldpkg = await (0, _dir.ascendFile)(input, "package.json");
                const json = (0, _pkg.pkg).produce(await (0, _fsJetpack.readAsync)(oldpkg, "json"));
                await (0, _fsJetpack.writeAsync)(arg.pkgjson, json);
                await (0, _pkg.pkg).install([
                    (0, _path.dirname)(arg.pkgjson)
                ], {
                    cwd: (0, _path.dirname)(arg.pkgjson)
                });
            }
        };
        if (watch) {
            const watcher = await bundler.watch(async (err, event)=>{
                if (event) {
                    if (event.type === "buildSuccess") {
                        await genPkgJson();
                        await watch(watcher, err, event);
                    } else if (event.type === "buildFailure") {
                        console.log(`Error: ${event.diagnostics.map((e)=>e.message).join("\n")}`);
                        await watcher.unsubscribe();
                    }
                }
            });
        } else {
            await bundler.run();
            await genPkgJson();
        }
        return true;
    } catch (e) {
        await (0, _fsJetpack.removeAsync)(cacheDir);
        console.error(e);
        return false;
    }
};

},{"@parcel/core":"@parcel/core","dir":"er1Is","fs-jetpack":"dr8qG","path":"path","pkg":"hBNqT","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"er1Is":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "globalize", ()=>globalize);
parcelHelpers.export(exports, "dir", ()=>dir);
parcelHelpers.export(exports, "ascend", ()=>ascend);
parcelHelpers.export(exports, "ascendFile", ()=>ascendFile);
var _fs = require("fs");
var _path = require("path");
var _process = require("process");
const globalize = (arg)=>{
    const { name , init  } = arg;
    const g = global;
    if (typeof g[name] === "undefined") g[name] = arg.value;
    g[name].init = async ()=>{
        if (init) await init(g[name]);
    };
    return g[name];
};
const dir = new Proxy({}, {
    get (_target, p) {
        if (p === "path") return (arg = "")=>{
            return (0, _path.join)(process.cwd(), ...(arg || "").split("/"));
        };
        if (p === "root") return (arg = "")=>{
            if ((0, _fs.existsSync)((0, _path.join)((0, _process.cwd)(), "base"))) return (0, _path.join)(process.cwd(), ...arg.split("/"));
            return (0, _path.join)(process.cwd(), "..", "..", ...arg.split("/"));
        };
    }
});
const ascend = function(start, callback) {
    let dir = (0, _path.resolve)(".", start);
    let tmp, stats = (0, _fs.statSync)(dir);
    if (!stats.isDirectory()) dir = (0, _path.dirname)(dir);
    while(true){
        tmp = callback(dir, (0, _fs.readdirSync)(dir));
        if (tmp) return (0, _path.resolve)(dir, tmp);
        dir = (0, _path.dirname)(tmp = dir);
        if (tmp === dir) break;
    }
};
const ascendFile = async (dir, untilFoundFile)=>{
    return new Promise((resolve)=>{
        ascend(dir, (dir, files)=>{
            if (files.includes(untilFoundFile)) {
                resolve((0, _path.join)(dir, untilFoundFile));
                return dir;
            }
        });
    });
};

},{"fs":"fs","path":"path","process":"process","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"dr8qG":[function(require,module,exports) {
"use strict";
const jetpack = require("741f43e9333674c6");
module.exports = jetpack();

},{"741f43e9333674c6":"4DbU4"}],"4DbU4":[function(require,module,exports) {
"use strict";
const util = require("1ea4a96ad39b3162");
const pathUtil = require("e5a24a50f040cc0a");
const append = require("f1d67be2875df3cb");
const dir = require("db0239f712f06f66");
const file = require("ecf939bca930e7cd");
const find = require("54f843a592b4109a");
const inspect = require("5e3b841a8c8f95f");
const inspectTree = require("14893d111f4d6ad3");
const copy = require("5398eba98976d07");
const exists = require("932d63cf77667307");
const list = require("1030a8c799ba8038");
const move = require("68b9e56b5efb8b9e");
const read = require("da78c60ee9d22f97");
const remove = require("92b875bfacb27dbd");
const rename = require("91e881c416a16908");
const symlink = require("866ee5c0ffdb0e29");
const streams = require("300b739e0119102e");
const tmpDir = require("9c2ea64822d0191f");
const write = require("fa532e42b887eb7");
// The Jetpack Context object.
// It provides the public API, and resolves all paths regarding to
// passed cwdPath, or default process.cwd() if cwdPath was not specified.
const jetpackContext = (cwdPath)=>{
    const getCwdPath = ()=>{
        return cwdPath || process.cwd();
    };
    const cwd = function() {
        // return current CWD if no arguments specified...
        if (arguments.length === 0) return getCwdPath();
        // ...create new CWD context otherwise
        const args = Array.prototype.slice.call(arguments);
        const pathParts = [
            getCwdPath()
        ].concat(args);
        return jetpackContext(pathUtil.resolve.apply(null, pathParts));
    };
    // resolves path to inner CWD path of this jetpack instance
    const resolvePath = (path)=>{
        return pathUtil.resolve(getCwdPath(), path);
    };
    const getPath = function() {
        // add CWD base path as first element of arguments array
        Array.prototype.unshift.call(arguments, getCwdPath());
        return pathUtil.resolve.apply(null, arguments);
    };
    const normalizeOptions = (options)=>{
        const opts = options || {};
        opts.cwd = getCwdPath();
        return opts;
    };
    // API
    const api = {
        cwd,
        path: getPath,
        append: (path, data, options)=>{
            append.validateInput("append", path, data, options);
            append.sync(resolvePath(path), data, options);
        },
        appendAsync: (path, data, options)=>{
            append.validateInput("appendAsync", path, data, options);
            return append.async(resolvePath(path), data, options);
        },
        copy: (from, to, options)=>{
            copy.validateInput("copy", from, to, options);
            copy.sync(resolvePath(from), resolvePath(to), options);
        },
        copyAsync: (from, to, options)=>{
            copy.validateInput("copyAsync", from, to, options);
            return copy.async(resolvePath(from), resolvePath(to), options);
        },
        createWriteStream: (path, options)=>{
            return streams.createWriteStream(resolvePath(path), options);
        },
        createReadStream: (path, options)=>{
            return streams.createReadStream(resolvePath(path), options);
        },
        dir: (path, criteria)=>{
            dir.validateInput("dir", path, criteria);
            const normalizedPath = resolvePath(path);
            dir.sync(normalizedPath, criteria);
            return cwd(normalizedPath);
        },
        dirAsync: (path, criteria)=>{
            dir.validateInput("dirAsync", path, criteria);
            return new Promise((resolve, reject)=>{
                const normalizedPath = resolvePath(path);
                dir.async(normalizedPath, criteria).then(()=>{
                    resolve(cwd(normalizedPath));
                }, reject);
            });
        },
        exists: (path)=>{
            exists.validateInput("exists", path);
            return exists.sync(resolvePath(path));
        },
        existsAsync: (path)=>{
            exists.validateInput("existsAsync", path);
            return exists.async(resolvePath(path));
        },
        file: (path, criteria)=>{
            file.validateInput("file", path, criteria);
            file.sync(resolvePath(path), criteria);
            return api;
        },
        fileAsync: (path, criteria)=>{
            file.validateInput("fileAsync", path, criteria);
            return new Promise((resolve, reject)=>{
                file.async(resolvePath(path), criteria).then(()=>{
                    resolve(api);
                }, reject);
            });
        },
        find: (startPath, options)=>{
            // startPath is optional parameter, if not specified move rest of params
            // to proper places and default startPath to CWD.
            if (typeof options === "undefined" && typeof startPath === "object") {
                options = startPath;
                startPath = ".";
            }
            find.validateInput("find", startPath, options);
            return find.sync(resolvePath(startPath), normalizeOptions(options));
        },
        findAsync: (startPath, options)=>{
            // startPath is optional parameter, if not specified move rest of params
            // to proper places and default startPath to CWD.
            if (typeof options === "undefined" && typeof startPath === "object") {
                options = startPath;
                startPath = ".";
            }
            find.validateInput("findAsync", startPath, options);
            return find.async(resolvePath(startPath), normalizeOptions(options));
        },
        inspect: (path, fieldsToInclude)=>{
            inspect.validateInput("inspect", path, fieldsToInclude);
            return inspect.sync(resolvePath(path), fieldsToInclude);
        },
        inspectAsync: (path, fieldsToInclude)=>{
            inspect.validateInput("inspectAsync", path, fieldsToInclude);
            return inspect.async(resolvePath(path), fieldsToInclude);
        },
        inspectTree: (path, options)=>{
            inspectTree.validateInput("inspectTree", path, options);
            return inspectTree.sync(resolvePath(path), options);
        },
        inspectTreeAsync: (path, options)=>{
            inspectTree.validateInput("inspectTreeAsync", path, options);
            return inspectTree.async(resolvePath(path), options);
        },
        list: (path)=>{
            list.validateInput("list", path);
            return list.sync(resolvePath(path || "."));
        },
        listAsync: (path)=>{
            list.validateInput("listAsync", path);
            return list.async(resolvePath(path || "."));
        },
        move: (from, to, options)=>{
            move.validateInput("move", from, to, options);
            move.sync(resolvePath(from), resolvePath(to), options);
        },
        moveAsync: (from, to, options)=>{
            move.validateInput("moveAsync", from, to, options);
            return move.async(resolvePath(from), resolvePath(to), options);
        },
        read: (path, returnAs)=>{
            read.validateInput("read", path, returnAs);
            return read.sync(resolvePath(path), returnAs);
        },
        readAsync: (path, returnAs)=>{
            read.validateInput("readAsync", path, returnAs);
            return read.async(resolvePath(path), returnAs);
        },
        remove: (path)=>{
            remove.validateInput("remove", path);
            // If path not specified defaults to CWD
            remove.sync(resolvePath(path || "."));
        },
        removeAsync: (path)=>{
            remove.validateInput("removeAsync", path);
            // If path not specified defaults to CWD
            return remove.async(resolvePath(path || "."));
        },
        rename: (path, newName, options)=>{
            rename.validateInput("rename", path, newName, options);
            rename.sync(resolvePath(path), newName, options);
        },
        renameAsync: (path, newName, options)=>{
            rename.validateInput("renameAsync", path, newName, options);
            return rename.async(resolvePath(path), newName, options);
        },
        symlink: (symlinkValue, path)=>{
            symlink.validateInput("symlink", symlinkValue, path);
            symlink.sync(symlinkValue, resolvePath(path));
        },
        symlinkAsync: (symlinkValue, path)=>{
            symlink.validateInput("symlinkAsync", symlinkValue, path);
            return symlink.async(symlinkValue, resolvePath(path));
        },
        tmpDir: (options)=>{
            tmpDir.validateInput("tmpDir", options);
            const pathOfCreatedDirectory = tmpDir.sync(getCwdPath(), options);
            return cwd(pathOfCreatedDirectory);
        },
        tmpDirAsync: (options)=>{
            tmpDir.validateInput("tmpDirAsync", options);
            return new Promise((resolve, reject)=>{
                tmpDir.async(getCwdPath(), options).then((pathOfCreatedDirectory)=>{
                    resolve(cwd(pathOfCreatedDirectory));
                }, reject);
            });
        },
        write: (path, data, options)=>{
            write.validateInput("write", path, data, options);
            write.sync(resolvePath(path), data, options);
        },
        writeAsync: (path, data, options)=>{
            write.validateInput("writeAsync", path, data, options);
            return write.async(resolvePath(path), data, options);
        }
    };
    if (util.inspect.custom !== undefined) // Without this console.log(jetpack) throws obscure error. Details:
    // https://github.com/szwacz/fs-jetpack/issues/29
    // https://nodejs.org/api/util.html#util_custom_inspection_functions_on_objects
    api[util.inspect.custom] = ()=>{
        return `[fs-jetpack CWD: ${getCwdPath()}]`;
    };
    return api;
};
module.exports = jetpackContext;

},{"1ea4a96ad39b3162":"util","e5a24a50f040cc0a":"path","f1d67be2875df3cb":"h7gpt","db0239f712f06f66":"dv3dd","ecf939bca930e7cd":"3wlxj","54f843a592b4109a":"eY2VI","5e3b841a8c8f95f":"24g0a","14893d111f4d6ad3":"hMNkv","5398eba98976d07":"6zUc5","932d63cf77667307":"fbjTz","1030a8c799ba8038":"kh5Rb","68b9e56b5efb8b9e":"5vC2F","da78c60ee9d22f97":"aDboT","92b875bfacb27dbd":"aNX46","91e881c416a16908":"eDG6w","866ee5c0ffdb0e29":"eAnDy","300b739e0119102e":"bBSqZ","9c2ea64822d0191f":"htlut","fa532e42b887eb7":"h20BV"}],"h7gpt":[function(require,module,exports) {
"use strict";
const fs = require("4c80dc3a8304b119");
const write = require("4e5190e0f6d11e1f");
const validate = require("f2938809156aae0");
const validateInput = (methodName, path, data, options)=>{
    const methodSignature = `${methodName}(path, data, [options])`;
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
    validate.argument(methodSignature, "data", data, [
        "string",
        "buffer"
    ]);
    validate.options(methodSignature, "options", options, {
        mode: [
            "string",
            "number"
        ]
    });
};
// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------
const appendSync = (path, data, options)=>{
    try {
        fs.appendFileSync(path, data, options);
    } catch (err) {
        if (err.code === "ENOENT") // Parent directory doesn't exist, so just pass the task to `write`,
        // which will create the folder and file.
        write.sync(path, data, options);
        else throw err;
    }
};
// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------
const appendAsync = (path, data, options)=>{
    return new Promise((resolve, reject)=>{
        fs.appendFile(path, data, options).then(resolve).catch((err)=>{
            if (err.code === "ENOENT") // Parent directory doesn't exist, so just pass the task to `write`,
            // which will create the folder and file.
            write.async(path, data, options).then(resolve, reject);
            else reject(err);
        });
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = appendSync;
exports.async = appendAsync;

},{"4c80dc3a8304b119":"kdumJ","4e5190e0f6d11e1f":"h20BV","f2938809156aae0":"59cGU"}],"kdumJ":[function(require,module,exports) {
// Adater module exposing all `fs` methods with promises instead of callbacks.
"use strict";
const fs = require("27f22c17fb5cc678");
const promisify = require("9fc44858cf04a5a3");
const isCallbackMethod = (key)=>{
    return [
        typeof fs[key] === "function",
        !key.match(/Sync$/),
        !key.match(/^[A-Z]/),
        !key.match(/^create/),
        !key.match(/^(un)?watch/)
    ].every(Boolean);
};
const adaptMethod = (name)=>{
    const original = fs[name];
    return promisify(original);
};
const adaptAllMethods = ()=>{
    const adapted = {};
    Object.keys(fs).forEach((key)=>{
        if (isCallbackMethod(key)) {
            if (key === "exists") // fs.exists() does not follow standard
            // Node callback conventions, and has
            // no error object in the callback
            adapted.exists = ()=>{
                throw new Error("fs.exists() is deprecated");
            };
            else adapted[key] = adaptMethod(key);
        } else adapted[key] = fs[key];
    });
    return adapted;
};
module.exports = adaptAllMethods();

},{"27f22c17fb5cc678":"fs","9fc44858cf04a5a3":"8zci7"}],"8zci7":[function(require,module,exports) {
"use strict";
module.exports = (fn)=>{
    return function() {
        const length = arguments.length;
        const args = new Array(length);
        for(let i = 0; i < length; i += 1)args[i] = arguments[i];
        return new Promise((resolve, reject)=>{
            args.push((err, data)=>{
                if (err) reject(err);
                else resolve(data);
            });
            fn.apply(null, args);
        });
    };
};

},{}],"h20BV":[function(require,module,exports) {
"use strict";
const pathUtil = require("8d28cd7cac21d7b3");
const fs = require("b39334e7a8f298aa");
const validate = require("2750612783042e77");
const dir = require("e84c786b9467b30f");
const validateInput = (methodName, path, data, options)=>{
    const methodSignature = `${methodName}(path, data, [options])`;
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
    validate.argument(methodSignature, "data", data, [
        "string",
        "buffer",
        "object",
        "array"
    ]);
    validate.options(methodSignature, "options", options, {
        mode: [
            "string",
            "number"
        ],
        atomic: [
            "boolean"
        ],
        jsonIndent: [
            "number"
        ]
    });
};
// Temporary file extensions used for atomic file overwriting.
const newExt = ".__new__";
const serializeToJsonMaybe = (data, jsonIndent)=>{
    let indent = jsonIndent;
    if (typeof indent !== "number") indent = 2;
    if (typeof data === "object" && !Buffer.isBuffer(data) && data !== null) return JSON.stringify(data, null, indent);
    return data;
};
// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------
const writeFileSync = (path, data, options)=>{
    try {
        fs.writeFileSync(path, data, options);
    } catch (err) {
        if (err.code === "ENOENT") {
            // Means parent directory doesn't exist, so create it and try again.
            dir.createSync(pathUtil.dirname(path));
            fs.writeFileSync(path, data, options);
        } else throw err;
    }
};
const writeAtomicSync = (path, data, options)=>{
    // we are assuming there is file on given path, and we don't want
    // to touch it until we are sure our data has been saved correctly,
    // so write the data into temporary file...
    writeFileSync(path + newExt, data, options);
    // ...next rename temp file to replace real path.
    fs.renameSync(path + newExt, path);
};
const writeSync = (path, data, options)=>{
    const opts = options || {};
    const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
    let writeStrategy = writeFileSync;
    if (opts.atomic) writeStrategy = writeAtomicSync;
    writeStrategy(path, processedData, {
        mode: opts.mode
    });
};
// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------
const writeFileAsync = (path, data, options)=>{
    return new Promise((resolve, reject)=>{
        fs.writeFile(path, data, options).then(resolve).catch((err)=>{
            // First attempt to write a file ended with error.
            // Check if this is not due to nonexistent parent directory.
            if (err.code === "ENOENT") // Parent directory doesn't exist, so create it and try again.
            dir.createAsync(pathUtil.dirname(path)).then(()=>{
                return fs.writeFile(path, data, options);
            }).then(resolve, reject);
            else // Nope, some other error, throw it.
            reject(err);
        });
    });
};
const writeAtomicAsync = (path, data, options)=>{
    return new Promise((resolve, reject)=>{
        // We are assuming there is file on given path, and we don't want
        // to touch it until we are sure our data has been saved correctly,
        // so write the data into temporary file...
        writeFileAsync(path + newExt, data, options).then(()=>{
            // ...next rename temp file to real path.
            return fs.rename(path + newExt, path);
        }).then(resolve, reject);
    });
};
const writeAsync = (path, data, options)=>{
    const opts = options || {};
    const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
    let writeStrategy = writeFileAsync;
    if (opts.atomic) writeStrategy = writeAtomicAsync;
    return writeStrategy(path, processedData, {
        mode: opts.mode
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = writeSync;
exports.async = writeAsync;

},{"8d28cd7cac21d7b3":"path","b39334e7a8f298aa":"kdumJ","2750612783042e77":"59cGU","e84c786b9467b30f":"dv3dd"}],"59cGU":[function(require,module,exports) {
"use strict";
const prettyPrintTypes = (types)=>{
    const addArticle = (str)=>{
        const vowels = [
            "a",
            "e",
            "i",
            "o",
            "u"
        ];
        if (vowels.indexOf(str[0]) !== -1) return `an ${str}`;
        return `a ${str}`;
    };
    return types.map(addArticle).join(" or ");
};
const isArrayOfNotation = (typeDefinition)=>{
    return /array of /.test(typeDefinition);
};
const extractTypeFromArrayOfNotation = (typeDefinition)=>{
    // The notation is e.g. 'array of string'
    return typeDefinition.split(" of ")[1];
};
const isValidTypeDefinition = (typeStr)=>{
    if (isArrayOfNotation(typeStr)) return isValidTypeDefinition(extractTypeFromArrayOfNotation(typeStr));
    return [
        "string",
        "number",
        "boolean",
        "array",
        "object",
        "buffer",
        "null",
        "undefined",
        "function"
    ].some((validType)=>{
        return validType === typeStr;
    });
};
const detectType = (value)=>{
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    if (Buffer.isBuffer(value)) return "buffer";
    return typeof value;
};
const onlyUniqueValuesInArrayFilter = (value, index, self)=>{
    return self.indexOf(value) === index;
};
const detectTypeDeep = (value)=>{
    let type = detectType(value);
    let typesInArray;
    if (type === "array") {
        typesInArray = value.map((element)=>{
            return detectType(element);
        }).filter(onlyUniqueValuesInArrayFilter);
        type += ` of ${typesInArray.join(", ")}`;
    }
    return type;
};
const validateArray = (argumentValue, typeToCheck)=>{
    const allowedTypeInArray = extractTypeFromArrayOfNotation(typeToCheck);
    if (detectType(argumentValue) !== "array") return false;
    return argumentValue.every((element)=>{
        return detectType(element) === allowedTypeInArray;
    });
};
const validateArgument = (methodName, argumentName, argumentValue, argumentMustBe)=>{
    const isOneOfAllowedTypes = argumentMustBe.some((type)=>{
        if (!isValidTypeDefinition(type)) throw new Error(`Unknown type "${type}"`);
        if (isArrayOfNotation(type)) return validateArray(argumentValue, type);
        return type === detectType(argumentValue);
    });
    if (!isOneOfAllowedTypes) throw new Error(`Argument "${argumentName}" passed to ${methodName} must be ${prettyPrintTypes(argumentMustBe)}. Received ${detectTypeDeep(argumentValue)}`);
};
const validateOptions = (methodName, optionsObjName, obj, allowedOptions)=>{
    if (obj !== undefined) {
        validateArgument(methodName, optionsObjName, obj, [
            "object"
        ]);
        Object.keys(obj).forEach((key)=>{
            const argName = `${optionsObjName}.${key}`;
            if (allowedOptions[key] !== undefined) validateArgument(methodName, argName, obj[key], allowedOptions[key]);
            else throw new Error(`Unknown argument "${argName}" passed to ${methodName}`);
        });
    }
};
module.exports = {
    argument: validateArgument,
    options: validateOptions
};

},{}],"dv3dd":[function(require,module,exports) {
"use strict";
const pathUtil = require("110941fc2fbc3ea7");
const fs = require("4f178ae68ed30c59");
const modeUtil = require("9bfa544ff89b2d0f");
const validate = require("c5292f6566964e80");
const remove = require("7a7776798262ae72");
const validateInput = (methodName, path, criteria)=>{
    const methodSignature = `${methodName}(path, [criteria])`;
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
    validate.options(methodSignature, "criteria", criteria, {
        empty: [
            "boolean"
        ],
        mode: [
            "string",
            "number"
        ]
    });
};
const getCriteriaDefaults = (passedCriteria)=>{
    const criteria = passedCriteria || {};
    if (typeof criteria.empty !== "boolean") criteria.empty = false;
    if (criteria.mode !== undefined) criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
    return criteria;
};
const generatePathOccupiedByNotDirectoryError = (path)=>{
    return new Error(`Path ${path} exists but is not a directory. Halting jetpack.dir() call for safety reasons.`);
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const checkWhatAlreadyOccupiesPathSync = (path)=>{
    let stat;
    try {
        stat = fs.statSync(path);
    } catch (err) {
        // Detection if path already exists
        if (err.code !== "ENOENT") throw err;
    }
    if (stat && !stat.isDirectory()) throw generatePathOccupiedByNotDirectoryError(path);
    return stat;
};
const createBrandNewDirectorySync = (path, opts)=>{
    const options = opts || {};
    try {
        fs.mkdirSync(path, options.mode);
    } catch (err) {
        if (err.code === "ENOENT") {
            // Parent directory doesn't exist. Need to create it first.
            createBrandNewDirectorySync(pathUtil.dirname(path), options);
            // Now retry creating this directory.
            fs.mkdirSync(path, options.mode);
        } else if (err.code === "EEXIST") ;
        else throw err;
    }
};
const checkExistingDirectoryFulfillsCriteriaSync = (path, stat, criteria)=>{
    const checkMode = ()=>{
        const mode = modeUtil.normalizeFileMode(stat.mode);
        if (criteria.mode !== undefined && criteria.mode !== mode) fs.chmodSync(path, criteria.mode);
    };
    const checkEmptiness = ()=>{
        if (criteria.empty) {
            // Delete everything inside this directory
            const list = fs.readdirSync(path);
            list.forEach((filename)=>{
                remove.sync(pathUtil.resolve(path, filename));
            });
        }
    };
    checkMode();
    checkEmptiness();
};
const dirSync = (path, passedCriteria)=>{
    const criteria = getCriteriaDefaults(passedCriteria);
    const stat = checkWhatAlreadyOccupiesPathSync(path);
    if (stat) checkExistingDirectoryFulfillsCriteriaSync(path, stat, criteria);
    else createBrandNewDirectorySync(path, criteria);
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const checkWhatAlreadyOccupiesPathAsync = (path)=>{
    return new Promise((resolve, reject)=>{
        fs.stat(path).then((stat)=>{
            if (stat.isDirectory()) resolve(stat);
            else reject(generatePathOccupiedByNotDirectoryError(path));
        }).catch((err)=>{
            if (err.code === "ENOENT") // Path doesn't exist
            resolve(undefined);
            else // This is other error that nonexistent path, so end here.
            reject(err);
        });
    });
};
// Delete all files and directores inside given directory
const emptyAsync = (path)=>{
    return new Promise((resolve, reject)=>{
        fs.readdir(path).then((list)=>{
            const doOne = (index)=>{
                if (index === list.length) resolve();
                else {
                    const subPath = pathUtil.resolve(path, list[index]);
                    remove.async(subPath).then(()=>{
                        doOne(index + 1);
                    });
                }
            };
            doOne(0);
        }).catch(reject);
    });
};
const checkExistingDirectoryFulfillsCriteriaAsync = (path, stat, criteria)=>{
    return new Promise((resolve, reject)=>{
        const checkMode = ()=>{
            const mode = modeUtil.normalizeFileMode(stat.mode);
            if (criteria.mode !== undefined && criteria.mode !== mode) return fs.chmod(path, criteria.mode);
            return Promise.resolve();
        };
        const checkEmptiness = ()=>{
            if (criteria.empty) return emptyAsync(path);
            return Promise.resolve();
        };
        checkMode().then(checkEmptiness).then(resolve, reject);
    });
};
const createBrandNewDirectoryAsync = (path, opts)=>{
    const options = opts || {};
    return new Promise((resolve, reject)=>{
        fs.mkdir(path, options.mode).then(resolve).catch((err)=>{
            if (err.code === "ENOENT") // Parent directory doesn't exist. Need to create it first.
            createBrandNewDirectoryAsync(pathUtil.dirname(path), options).then(()=>{
                // Now retry creating this directory.
                return fs.mkdir(path, options.mode);
            }).then(resolve).catch((err2)=>{
                if (err2.code === "EEXIST") // Hmm, something other have already created the directory?
                // No problem for us.
                resolve();
                else reject(err2);
            });
            else if (err.code === "EEXIST") // The path already exists. We're fine.
            resolve();
            else reject(err);
        });
    });
};
const dirAsync = (path, passedCriteria)=>{
    return new Promise((resolve, reject)=>{
        const criteria = getCriteriaDefaults(passedCriteria);
        checkWhatAlreadyOccupiesPathAsync(path).then((stat)=>{
            if (stat !== undefined) return checkExistingDirectoryFulfillsCriteriaAsync(path, stat, criteria);
            return createBrandNewDirectoryAsync(path, criteria);
        }).then(resolve, reject);
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = dirSync;
exports.createSync = createBrandNewDirectorySync;
exports.async = dirAsync;
exports.createAsync = createBrandNewDirectoryAsync;

},{"110941fc2fbc3ea7":"path","4f178ae68ed30c59":"kdumJ","9bfa544ff89b2d0f":"2IuWw","c5292f6566964e80":"59cGU","7a7776798262ae72":"aNX46"}],"2IuWw":[function(require,module,exports) {
// Logic for unix file mode operations.
"use strict";
// Converts mode to string 3 characters long.
exports.normalizeFileMode = (mode)=>{
    let modeAsString;
    if (typeof mode === "number") modeAsString = mode.toString(8);
    else modeAsString = mode;
    return modeAsString.substring(modeAsString.length - 3);
};

},{}],"aNX46":[function(require,module,exports) {
"use strict";
const fs = require("bb991e8d8f6736dc");
const validate = require("a06878d247e939cb");
const validateInput = (methodName, path)=>{
    const methodSignature = `${methodName}([path])`;
    validate.argument(methodSignature, "path", path, [
        "string",
        "undefined"
    ]);
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const removeSync = (path)=>{
    fs.rmSync(path, {
        recursive: true,
        force: true,
        maxRetries: 3
    });
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const removeAsync = (path)=>{
    return fs.rm(path, {
        recursive: true,
        force: true,
        maxRetries: 3
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = removeSync;
exports.async = removeAsync;

},{"bb991e8d8f6736dc":"kdumJ","a06878d247e939cb":"59cGU"}],"3wlxj":[function(require,module,exports) {
"use strict";
const fs = require("1b4b7e4dac18bdfc");
const modeUtil = require("64438a7331c4be9c");
const validate = require("b9320b7c8d74a59f");
const write = require("ce4e6301520703a7");
const validateInput = (methodName, path, criteria)=>{
    const methodSignature = `${methodName}(path, [criteria])`;
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
    validate.options(methodSignature, "criteria", criteria, {
        content: [
            "string",
            "buffer",
            "object",
            "array"
        ],
        jsonIndent: [
            "number"
        ],
        mode: [
            "string",
            "number"
        ]
    });
};
const getCriteriaDefaults = (passedCriteria)=>{
    const criteria = passedCriteria || {};
    if (criteria.mode !== undefined) criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
    return criteria;
};
const generatePathOccupiedByNotFileError = (path)=>{
    return new Error(`Path ${path} exists but is not a file. Halting jetpack.file() call for safety reasons.`);
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const checkWhatAlreadyOccupiesPathSync = (path)=>{
    let stat;
    try {
        stat = fs.statSync(path);
    } catch (err) {
        // Detection if path exists
        if (err.code !== "ENOENT") throw err;
    }
    if (stat && !stat.isFile()) throw generatePathOccupiedByNotFileError(path);
    return stat;
};
const checkExistingFileFulfillsCriteriaSync = (path, stat, criteria)=>{
    const mode = modeUtil.normalizeFileMode(stat.mode);
    const checkContent = ()=>{
        if (criteria.content !== undefined) {
            write.sync(path, criteria.content, {
                mode,
                jsonIndent: criteria.jsonIndent
            });
            return true;
        }
        return false;
    };
    const checkMode = ()=>{
        if (criteria.mode !== undefined && criteria.mode !== mode) fs.chmodSync(path, criteria.mode);
    };
    const contentReplaced = checkContent();
    if (!contentReplaced) checkMode();
};
const createBrandNewFileSync = (path, criteria)=>{
    let content = "";
    if (criteria.content !== undefined) content = criteria.content;
    write.sync(path, content, {
        mode: criteria.mode,
        jsonIndent: criteria.jsonIndent
    });
};
const fileSync = (path, passedCriteria)=>{
    const criteria = getCriteriaDefaults(passedCriteria);
    const stat = checkWhatAlreadyOccupiesPathSync(path);
    if (stat !== undefined) checkExistingFileFulfillsCriteriaSync(path, stat, criteria);
    else createBrandNewFileSync(path, criteria);
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const checkWhatAlreadyOccupiesPathAsync = (path)=>{
    return new Promise((resolve, reject)=>{
        fs.stat(path).then((stat)=>{
            if (stat.isFile()) resolve(stat);
            else reject(generatePathOccupiedByNotFileError(path));
        }).catch((err)=>{
            if (err.code === "ENOENT") // Path doesn't exist.
            resolve(undefined);
            else // This is other error. Must end here.
            reject(err);
        });
    });
};
const checkExistingFileFulfillsCriteriaAsync = (path, stat, criteria)=>{
    const mode = modeUtil.normalizeFileMode(stat.mode);
    const checkContent = ()=>{
        return new Promise((resolve, reject)=>{
            if (criteria.content !== undefined) write.async(path, criteria.content, {
                mode,
                jsonIndent: criteria.jsonIndent
            }).then(()=>{
                resolve(true);
            }).catch(reject);
            else resolve(false);
        });
    };
    const checkMode = ()=>{
        if (criteria.mode !== undefined && criteria.mode !== mode) return fs.chmod(path, criteria.mode);
        return undefined;
    };
    return checkContent().then((contentReplaced)=>{
        if (!contentReplaced) return checkMode();
        return undefined;
    });
};
const createBrandNewFileAsync = (path, criteria)=>{
    let content = "";
    if (criteria.content !== undefined) content = criteria.content;
    return write.async(path, content, {
        mode: criteria.mode,
        jsonIndent: criteria.jsonIndent
    });
};
const fileAsync = (path, passedCriteria)=>{
    return new Promise((resolve, reject)=>{
        const criteria = getCriteriaDefaults(passedCriteria);
        checkWhatAlreadyOccupiesPathAsync(path).then((stat)=>{
            if (stat !== undefined) return checkExistingFileFulfillsCriteriaAsync(path, stat, criteria);
            return createBrandNewFileAsync(path, criteria);
        }).then(resolve, reject);
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = fileSync;
exports.async = fileAsync;

},{"1b4b7e4dac18bdfc":"kdumJ","64438a7331c4be9c":"2IuWw","b9320b7c8d74a59f":"59cGU","ce4e6301520703a7":"h20BV"}],"eY2VI":[function(require,module,exports) {
"use strict";
const pathUtil = require("249f269ad987267c");
const treeWalker = require("6eb67cd6f550714b");
const inspect = require("3befb901d5ce7d31");
const matcher = require("6fe6c5651b22aff8");
const validate = require("20a728dbd5a6256a");
const validateInput = (methodName, path, options)=>{
    const methodSignature = `${methodName}([path], options)`;
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
    validate.options(methodSignature, "options", options, {
        matching: [
            "string",
            "array of string"
        ],
        filter: [
            "function"
        ],
        files: [
            "boolean"
        ],
        directories: [
            "boolean"
        ],
        recursive: [
            "boolean"
        ],
        ignoreCase: [
            "boolean"
        ]
    });
};
const normalizeOptions = (options)=>{
    const opts = options || {};
    // defaults:
    if (opts.matching === undefined) opts.matching = "*";
    if (opts.files === undefined) opts.files = true;
    if (opts.ignoreCase === undefined) opts.ignoreCase = false;
    if (opts.directories === undefined) opts.directories = false;
    if (opts.recursive === undefined) opts.recursive = true;
    return opts;
};
const processFoundPaths = (foundPaths, cwd)=>{
    return foundPaths.map((path)=>{
        return pathUtil.relative(cwd, path);
    });
};
const generatePathDoesntExistError = (path)=>{
    const err = new Error(`Path you want to find stuff in doesn't exist ${path}`);
    err.code = "ENOENT";
    return err;
};
const generatePathNotDirectoryError = (path)=>{
    const err = new Error(`Path you want to find stuff in must be a directory ${path}`);
    err.code = "ENOTDIR";
    return err;
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const findSync = (path, options)=>{
    const foundAbsolutePaths = [];
    const matchesAnyOfGlobs = matcher.create(path, options.matching, options.ignoreCase);
    let maxLevelsDeep = Infinity;
    if (options.recursive === false) maxLevelsDeep = 1;
    treeWalker.sync(path, {
        maxLevelsDeep,
        symlinks: "follow",
        inspectOptions: {
            times: true,
            absolutePath: true
        }
    }, (itemPath, item)=>{
        if (item && itemPath !== path && matchesAnyOfGlobs(itemPath)) {
            const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
            if (weHaveMatch) {
                if (options.filter) {
                    const passedThroughFilter = options.filter(item);
                    if (passedThroughFilter) foundAbsolutePaths.push(itemPath);
                } else foundAbsolutePaths.push(itemPath);
            }
        }
    });
    foundAbsolutePaths.sort();
    return processFoundPaths(foundAbsolutePaths, options.cwd);
};
const findSyncInit = (path, options)=>{
    const entryPointInspect = inspect.sync(path, {
        symlinks: "follow"
    });
    if (entryPointInspect === undefined) throw generatePathDoesntExistError(path);
    else if (entryPointInspect.type !== "dir") throw generatePathNotDirectoryError(path);
    return findSync(path, normalizeOptions(options));
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const findAsync = (path, options)=>{
    return new Promise((resolve, reject)=>{
        const foundAbsolutePaths = [];
        const matchesAnyOfGlobs = matcher.create(path, options.matching, options.ignoreCase);
        let maxLevelsDeep = Infinity;
        if (options.recursive === false) maxLevelsDeep = 1;
        let waitingForFiltersToFinish = 0;
        let treeWalkerDone = false;
        const maybeDone = ()=>{
            if (treeWalkerDone && waitingForFiltersToFinish === 0) {
                foundAbsolutePaths.sort();
                resolve(processFoundPaths(foundAbsolutePaths, options.cwd));
            }
        };
        treeWalker.async(path, {
            maxLevelsDeep,
            symlinks: "follow",
            inspectOptions: {
                times: true,
                absolutePath: true
            }
        }, (itemPath, item)=>{
            if (item && itemPath !== path && matchesAnyOfGlobs(itemPath)) {
                const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
                if (weHaveMatch) {
                    if (options.filter) {
                        const passedThroughFilter = options.filter(item);
                        const isPromise = typeof passedThroughFilter.then === "function";
                        if (isPromise) {
                            waitingForFiltersToFinish += 1;
                            passedThroughFilter.then((passedThroughFilterResult)=>{
                                if (passedThroughFilterResult) foundAbsolutePaths.push(itemPath);
                                waitingForFiltersToFinish -= 1;
                                maybeDone();
                            }).catch((err)=>{
                                reject(err);
                            });
                        } else if (passedThroughFilter) foundAbsolutePaths.push(itemPath);
                    } else foundAbsolutePaths.push(itemPath);
                }
            }
        }, (err)=>{
            if (err) reject(err);
            else {
                treeWalkerDone = true;
                maybeDone();
            }
        });
    });
};
const findAsyncInit = (path, options)=>{
    return inspect.async(path, {
        symlinks: "follow"
    }).then((entryPointInspect)=>{
        if (entryPointInspect === undefined) throw generatePathDoesntExistError(path);
        else if (entryPointInspect.type !== "dir") throw generatePathNotDirectoryError(path);
        return findAsync(path, normalizeOptions(options));
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = findSyncInit;
exports.async = findAsyncInit;

},{"249f269ad987267c":"path","6eb67cd6f550714b":"4vnJf","3befb901d5ce7d31":"24g0a","6fe6c5651b22aff8":"cdi8o","20a728dbd5a6256a":"59cGU"}],"4vnJf":[function(require,module,exports) {
"use strict";
const fs = require("e993d661bcf51347");
const pathUtil = require("fa5544e6279b6192");
const inspect = require("d61afa8284162779");
const list = require("9e3936dc1d764cb4");
const fileType = (dirent)=>{
    if (dirent.isDirectory()) return "dir";
    if (dirent.isFile()) return "file";
    if (dirent.isSymbolicLink()) return "symlink";
    return "other";
};
// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------
const initialWalkSync = (path, options, callback)=>{
    if (options.maxLevelsDeep === undefined) options.maxLevelsDeep = Infinity;
    const performInspectOnEachNode = options.inspectOptions !== undefined;
    if (options.symlinks) {
        if (options.inspectOptions === undefined) options.inspectOptions = {
            symlinks: options.symlinks
        };
        else options.inspectOptions.symlinks = options.symlinks;
    }
    const walkSync = (path, currentLevel)=>{
        fs.readdirSync(path, {
            withFileTypes: true
        }).forEach((direntItem)=>{
            const withFileTypesNotSupported = typeof direntItem === "string";
            let fileItemPath;
            if (withFileTypesNotSupported) fileItemPath = pathUtil.join(path, direntItem);
            else fileItemPath = pathUtil.join(path, direntItem.name);
            let fileItem;
            if (performInspectOnEachNode) fileItem = inspect.sync(fileItemPath, options.inspectOptions);
            else if (withFileTypesNotSupported) {
                // New "withFileTypes" API not supported, need to do extra inspect
                // on each node, to know if this is a directory or a file.
                const inspectObject = inspect.sync(fileItemPath, options.inspectOptions);
                fileItem = {
                    name: inspectObject.name,
                    type: inspectObject.type
                };
            } else {
                const type = fileType(direntItem);
                if (type === "symlink" && options.symlinks === "follow") {
                    const symlinkPointsTo = fs.statSync(fileItemPath);
                    fileItem = {
                        name: direntItem.name,
                        type: fileType(symlinkPointsTo)
                    };
                } else fileItem = {
                    name: direntItem.name,
                    type
                };
            }
            if (fileItem !== undefined) {
                callback(fileItemPath, fileItem);
                if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) walkSync(fileItemPath, currentLevel + 1);
            }
        });
    };
    const item = inspect.sync(path, options.inspectOptions);
    if (item) {
        if (performInspectOnEachNode) callback(path, item);
        else // Return simplified object, not full inspect object
        callback(path, {
            name: item.name,
            type: item.type
        });
        if (item.type === "dir") walkSync(path, 1);
    } else callback(path, undefined);
};
// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------
const maxConcurrentOperations = 5;
const initialWalkAsync = (path, options, callback, doneCallback)=>{
    if (options.maxLevelsDeep === undefined) options.maxLevelsDeep = Infinity;
    const performInspectOnEachNode = options.inspectOptions !== undefined;
    if (options.symlinks) {
        if (options.inspectOptions === undefined) options.inspectOptions = {
            symlinks: options.symlinks
        };
        else options.inspectOptions.symlinks = options.symlinks;
    }
    const concurrentOperationsQueue = [];
    let nowDoingConcurrentOperations = 0;
    const checkConcurrentOperations = ()=>{
        if (concurrentOperationsQueue.length === 0 && nowDoingConcurrentOperations === 0) doneCallback();
        else if (concurrentOperationsQueue.length > 0 && nowDoingConcurrentOperations < maxConcurrentOperations) {
            const operation = concurrentOperationsQueue.pop();
            nowDoingConcurrentOperations += 1;
            operation();
        }
    };
    const whenConcurrencySlotAvailable = (operation)=>{
        concurrentOperationsQueue.push(operation);
        checkConcurrentOperations();
    };
    const concurrentOperationDone = ()=>{
        nowDoingConcurrentOperations -= 1;
        checkConcurrentOperations();
    };
    const walkAsync = (path, currentLevel)=>{
        const goDeeperIfDir = (fileItemPath, fileItem)=>{
            if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) walkAsync(fileItemPath, currentLevel + 1);
        };
        whenConcurrencySlotAvailable(()=>{
            fs.readdir(path, {
                withFileTypes: true
            }, (err, files)=>{
                if (err) doneCallback(err);
                else {
                    files.forEach((direntItem)=>{
                        const withFileTypesNotSupported = typeof direntItem === "string";
                        let fileItemPath;
                        if (withFileTypesNotSupported) fileItemPath = pathUtil.join(path, direntItem);
                        else fileItemPath = pathUtil.join(path, direntItem.name);
                        if (performInspectOnEachNode || withFileTypesNotSupported) whenConcurrencySlotAvailable(()=>{
                            inspect.async(fileItemPath, options.inspectOptions).then((fileItem)=>{
                                if (fileItem !== undefined) {
                                    if (performInspectOnEachNode) callback(fileItemPath, fileItem);
                                    else callback(fileItemPath, {
                                        name: fileItem.name,
                                        type: fileItem.type
                                    });
                                    goDeeperIfDir(fileItemPath, fileItem);
                                }
                                concurrentOperationDone();
                            }).catch((err)=>{
                                doneCallback(err);
                            });
                        });
                        else {
                            const type = fileType(direntItem);
                            if (type === "symlink" && options.symlinks === "follow") whenConcurrencySlotAvailable(()=>{
                                fs.stat(fileItemPath, (err, symlinkPointsTo)=>{
                                    if (err) doneCallback(err);
                                    else {
                                        const fileItem = {
                                            name: direntItem.name,
                                            type: fileType(symlinkPointsTo)
                                        };
                                        callback(fileItemPath, fileItem);
                                        goDeeperIfDir(fileItemPath, fileItem);
                                        concurrentOperationDone();
                                    }
                                });
                            });
                            else {
                                const fileItem = {
                                    name: direntItem.name,
                                    type
                                };
                                callback(fileItemPath, fileItem);
                                goDeeperIfDir(fileItemPath, fileItem);
                            }
                        }
                    });
                    concurrentOperationDone();
                }
            });
        });
    };
    inspect.async(path, options.inspectOptions).then((item)=>{
        if (item) {
            if (performInspectOnEachNode) callback(path, item);
            else // Return simplified object, not full inspect object
            callback(path, {
                name: item.name,
                type: item.type
            });
            if (item.type === "dir") walkAsync(path, 1);
            else doneCallback();
        } else {
            callback(path, undefined);
            doneCallback();
        }
    }).catch((err)=>{
        doneCallback(err);
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.sync = initialWalkSync;
exports.async = initialWalkAsync;

},{"e993d661bcf51347":"fs","fa5544e6279b6192":"path","d61afa8284162779":"24g0a","9e3936dc1d764cb4":"kh5Rb"}],"24g0a":[function(require,module,exports) {
"use strict";
const crypto = require("7977c57ec69a0306");
const pathUtil = require("9fdba676b100bddc");
const fs = require("3063f7385684c980");
const validate = require("ee667a5e31ad0890");
const supportedChecksumAlgorithms = [
    "md5",
    "sha1",
    "sha256",
    "sha512"
];
const symlinkOptions = [
    "report",
    "follow"
];
const validateInput = (methodName, path, options)=>{
    const methodSignature = `${methodName}(path, [options])`;
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
    validate.options(methodSignature, "options", options, {
        checksum: [
            "string"
        ],
        mode: [
            "boolean"
        ],
        times: [
            "boolean"
        ],
        absolutePath: [
            "boolean"
        ],
        symlinks: [
            "string"
        ]
    });
    if (options && options.checksum !== undefined && supportedChecksumAlgorithms.indexOf(options.checksum) === -1) throw new Error(`Argument "options.checksum" passed to ${methodSignature} must have one of values: ${supportedChecksumAlgorithms.join(", ")}`);
    if (options && options.symlinks !== undefined && symlinkOptions.indexOf(options.symlinks) === -1) throw new Error(`Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${symlinkOptions.join(", ")}`);
};
const createInspectObj = (path, options, stat)=>{
    const obj = {};
    obj.name = pathUtil.basename(path);
    if (stat.isFile()) {
        obj.type = "file";
        obj.size = stat.size;
    } else if (stat.isDirectory()) obj.type = "dir";
    else if (stat.isSymbolicLink()) obj.type = "symlink";
    else obj.type = "other";
    if (options.mode) obj.mode = stat.mode;
    if (options.times) {
        obj.accessTime = stat.atime;
        obj.modifyTime = stat.mtime;
        obj.changeTime = stat.ctime;
        obj.birthTime = stat.birthtime;
    }
    if (options.absolutePath) obj.absolutePath = path;
    return obj;
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const fileChecksum = (path, algo)=>{
    const hash = crypto.createHash(algo);
    const data = fs.readFileSync(path);
    hash.update(data);
    return hash.digest("hex");
};
const addExtraFieldsSync = (path, inspectObj, options)=>{
    if (inspectObj.type === "file" && options.checksum) inspectObj[options.checksum] = fileChecksum(path, options.checksum);
    else if (inspectObj.type === "symlink") inspectObj.pointsAt = fs.readlinkSync(path);
};
const inspectSync = (path, options)=>{
    let statOperation = fs.lstatSync;
    let stat;
    const opts = options || {};
    if (opts.symlinks === "follow") statOperation = fs.statSync;
    try {
        stat = statOperation(path);
    } catch (err) {
        // Detection if path exists
        if (err.code === "ENOENT") // Doesn't exist. Return undefined instead of throwing.
        return undefined;
        throw err;
    }
    const inspectObj = createInspectObj(path, opts, stat);
    addExtraFieldsSync(path, inspectObj, opts);
    return inspectObj;
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const fileChecksumAsync = (path, algo)=>{
    return new Promise((resolve, reject)=>{
        const hash = crypto.createHash(algo);
        const s = fs.createReadStream(path);
        s.on("data", (data)=>{
            hash.update(data);
        });
        s.on("end", ()=>{
            resolve(hash.digest("hex"));
        });
        s.on("error", reject);
    });
};
const addExtraFieldsAsync = (path, inspectObj, options)=>{
    if (inspectObj.type === "file" && options.checksum) return fileChecksumAsync(path, options.checksum).then((checksum)=>{
        inspectObj[options.checksum] = checksum;
        return inspectObj;
    });
    else if (inspectObj.type === "symlink") return fs.readlink(path).then((linkPath)=>{
        inspectObj.pointsAt = linkPath;
        return inspectObj;
    });
    return Promise.resolve(inspectObj);
};
const inspectAsync = (path, options)=>{
    return new Promise((resolve, reject)=>{
        let statOperation = fs.lstat;
        const opts = options || {};
        if (opts.symlinks === "follow") statOperation = fs.stat;
        statOperation(path).then((stat)=>{
            const inspectObj = createInspectObj(path, opts, stat);
            addExtraFieldsAsync(path, inspectObj, opts).then(resolve, reject);
        }).catch((err)=>{
            // Detection if path exists
            if (err.code === "ENOENT") // Doesn't exist. Return undefined instead of throwing.
            resolve(undefined);
            else reject(err);
        });
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.supportedChecksumAlgorithms = supportedChecksumAlgorithms;
exports.symlinkOptions = symlinkOptions;
exports.validateInput = validateInput;
exports.sync = inspectSync;
exports.async = inspectAsync;

},{"7977c57ec69a0306":"crypto","9fdba676b100bddc":"path","3063f7385684c980":"kdumJ","ee667a5e31ad0890":"59cGU"}],"kh5Rb":[function(require,module,exports) {
"use strict";
const fs = require("5467a40408db1e75");
const validate = require("ba1c2c7a93b70feb");
const validateInput = (methodName, path)=>{
    const methodSignature = `${methodName}(path)`;
    validate.argument(methodSignature, "path", path, [
        "string",
        "undefined"
    ]);
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const listSync = (path)=>{
    try {
        return fs.readdirSync(path);
    } catch (err) {
        if (err.code === "ENOENT") // Doesn't exist. Return undefined instead of throwing.
        return undefined;
        throw err;
    }
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const listAsync = (path)=>{
    return new Promise((resolve, reject)=>{
        fs.readdir(path).then((list)=>{
            resolve(list);
        }).catch((err)=>{
            if (err.code === "ENOENT") // Doesn't exist. Return undefined instead of throwing.
            resolve(undefined);
            else reject(err);
        });
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = listSync;
exports.async = listAsync;

},{"5467a40408db1e75":"kdumJ","ba1c2c7a93b70feb":"59cGU"}],"cdi8o":[function(require,module,exports) {
"use strict";
const Minimatch = require("235d887b9ece405e").Minimatch;
const convertPatternToAbsolutePath = (basePath, pattern)=>{
    // All patterns without slash are left as they are, if pattern contain
    // any slash we need to turn it into absolute path.
    const hasSlash = pattern.indexOf("/") !== -1;
    const isAbsolute = /^!?\//.test(pattern);
    const isNegated = /^!/.test(pattern);
    let separator;
    if (!isAbsolute && hasSlash) {
        // Throw out meaningful characters from the beginning ("!", "./").
        const patternWithoutFirstCharacters = pattern.replace(/^!/, "").replace(/^\.\//, "");
        if (/\/$/.test(basePath)) separator = "";
        else separator = "/";
        if (isNegated) return `!${basePath}${separator}${patternWithoutFirstCharacters}`;
        return `${basePath}${separator}${patternWithoutFirstCharacters}`;
    }
    return pattern;
};
exports.create = (basePath, patterns, ignoreCase)=>{
    let normalizedPatterns;
    if (typeof patterns === "string") normalizedPatterns = [
        patterns
    ];
    else normalizedPatterns = patterns;
    const matchers = normalizedPatterns.map((pattern)=>{
        return convertPatternToAbsolutePath(basePath, pattern);
    }).map((pattern)=>{
        return new Minimatch(pattern, {
            matchBase: true,
            nocomment: true,
            nocase: ignoreCase || false,
            dot: true,
            windowsPathsNoEscape: true
        });
    });
    const performMatch = (absolutePath)=>{
        let mode = "matching";
        let weHaveMatch = false;
        let currentMatcher;
        let i;
        for(i = 0; i < matchers.length; i += 1){
            currentMatcher = matchers[i];
            if (currentMatcher.negate) {
                mode = "negation";
                if (i === 0) // There are only negated patterns in the set,
                // so make everything matching by default and
                // start to reject stuff.
                weHaveMatch = true;
            }
            if (mode === "negation" && weHaveMatch && !currentMatcher.match(absolutePath)) // One negation match is enought to know we can reject this one.
            return false;
            if (mode === "matching" && !weHaveMatch) weHaveMatch = currentMatcher.match(absolutePath);
        }
        return weHaveMatch;
    };
    return performMatch;
};

},{"235d887b9ece405e":"guHQ1"}],"guHQ1":[function(require,module,exports) {
const minimatch = module.exports = (p, pattern, options = {})=>{
    assertValidPattern(pattern);
    // shortcut: comments match nothing.
    if (!options.nocomment && pattern.charAt(0) === "#") return false;
    return new Minimatch(pattern, options).match(p);
};
module.exports = minimatch;
const path = require("5b19941f49a82f37");
minimatch.sep = path.sep;
const GLOBSTAR = Symbol("globstar **");
minimatch.GLOBSTAR = GLOBSTAR;
const expand = require("9d1c01bc6ba57396");
const plTypes = {
    "!": {
        open: "(?:(?!(?:",
        close: "))[^/]*?)"
    },
    "?": {
        open: "(?:",
        close: ")?"
    },
    "+": {
        open: "(?:",
        close: ")+"
    },
    "*": {
        open: "(?:",
        close: ")*"
    },
    "@": {
        open: "(?:",
        close: ")"
    }
};
// any single thing other than /
// don't need to escape / when using new RegExp()
const qmark = "[^/]";
// * => any number of characters
const star = qmark + "*?";
// ** when dots are allowed.  Anything goes, except .. and .
// not (^ or / followed by one or two dots followed by $ or /),
// followed by anything, any number of times.
const twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
// not a ^ or / followed by a dot,
// followed by anything, any number of times.
const twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
// "abc" -> { a:true, b:true, c:true }
const charSet = (s)=>s.split("").reduce((set, c)=>{
        set[c] = true;
        return set;
    }, {});
// characters that need to be escaped in RegExp.
const reSpecials = charSet("().*{}+?[]^$\\!");
// characters that indicate we have to add the pattern start
const addPatternStartSet = charSet("[.(");
// normalizes slashes.
const slashSplit = /\/+/;
minimatch.filter = (pattern, options = {})=>(p, i, list)=>minimatch(p, pattern, options);
const ext = (a, b = {})=>{
    const t = {};
    Object.keys(a).forEach((k)=>t[k] = a[k]);
    Object.keys(b).forEach((k)=>t[k] = b[k]);
    return t;
};
minimatch.defaults = (def)=>{
    if (!def || typeof def !== "object" || !Object.keys(def).length) return minimatch;
    const orig = minimatch;
    const m = (p, pattern, options)=>orig(p, pattern, ext(def, options));
    m.Minimatch = class Minimatch extends orig.Minimatch {
        constructor(pattern, options){
            super(pattern, ext(def, options));
        }
    };
    m.Minimatch.defaults = (options)=>orig.defaults(ext(def, options)).Minimatch;
    m.filter = (pattern, options)=>orig.filter(pattern, ext(def, options));
    m.defaults = (options)=>orig.defaults(ext(def, options));
    m.makeRe = (pattern, options)=>orig.makeRe(pattern, ext(def, options));
    m.braceExpand = (pattern, options)=>orig.braceExpand(pattern, ext(def, options));
    m.match = (list, pattern, options)=>orig.match(list, pattern, ext(def, options));
    return m;
};
// Brace expansion:
// a{b,c}d -> abd acd
// a{b,}c -> abc ac
// a{0..3}d -> a0d a1d a2d a3d
// a{b,c{d,e}f}g -> abg acdfg acefg
// a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
//
// Invalid sets are not expanded.
// a{2..}b -> a{2..}b
// a{b}c -> a{b}c
minimatch.braceExpand = (pattern, options)=>braceExpand(pattern, options);
const braceExpand = (pattern, options = {})=>{
    assertValidPattern(pattern);
    // Thanks to Yeting Li <https://github.com/yetingli> for
    // improving this regexp to avoid a ReDOS vulnerability.
    if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) // shortcut. no need to expand.
    return [
        pattern
    ];
    return expand(pattern);
};
const MAX_PATTERN_LENGTH = 65536;
const assertValidPattern = (pattern)=>{
    if (typeof pattern !== "string") throw new TypeError("invalid pattern");
    if (pattern.length > MAX_PATTERN_LENGTH) throw new TypeError("pattern is too long");
};
// parse a component of the expanded set.
// At this point, no pattern may contain "/" in it
// so we're going to return a 2d array, where each entry is the full
// pattern, split on '/', and then turned into a regular expression.
// A regexp is made at the end which joins each array with an
// escaped /, and another full one which joins each regexp with |.
//
// Following the lead of Bash 4.1, note that "**" only has special meaning
// when it is the *only* thing in a path portion.  Otherwise, any series
// of * is equivalent to a single *.  Globstar behavior is enabled by
// default, and can be disabled by setting options.noglobstar.
const SUBPARSE = Symbol("subparse");
minimatch.makeRe = (pattern, options)=>new Minimatch(pattern, options || {}).makeRe();
minimatch.match = (list, pattern, options = {})=>{
    const mm = new Minimatch(pattern, options);
    list = list.filter((f)=>mm.match(f));
    if (mm.options.nonull && !list.length) list.push(pattern);
    return list;
};
// replace stuff like \* with *
const globUnescape = (s)=>s.replace(/\\(.)/g, "$1");
const charUnescape = (s)=>s.replace(/\\([^-\]])/g, "$1");
const regExpEscape = (s)=>s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
const braExpEscape = (s)=>s.replace(/[[\]\\]/g, "\\$&");
class Minimatch {
    constructor(pattern, options){
        assertValidPattern(pattern);
        if (!options) options = {};
        this.options = options;
        this.set = [];
        this.pattern = pattern;
        this.windowsPathsNoEscape = !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
        if (this.windowsPathsNoEscape) this.pattern = this.pattern.replace(/\\/g, "/");
        this.regexp = null;
        this.negate = false;
        this.comment = false;
        this.empty = false;
        this.partial = !!options.partial;
        // make the set of regexps etc.
        this.make();
    }
    debug() {}
    make() {
        const pattern = this.pattern;
        const options = this.options;
        // empty patterns and comments match nothing.
        if (!options.nocomment && pattern.charAt(0) === "#") {
            this.comment = true;
            return;
        }
        if (!pattern) {
            this.empty = true;
            return;
        }
        // step 1: figure out negation, etc.
        this.parseNegate();
        // step 2: expand braces
        let set = this.globSet = this.braceExpand();
        if (options.debug) this.debug = (...args)=>console.error(...args);
        this.debug(this.pattern, set);
        // step 3: now we have a set, so turn each one into a series of path-portion
        // matching patterns.
        // These will be regexps, except in the case of "**", which is
        // set to the GLOBSTAR object for globstar behavior,
        // and will not contain any / characters
        set = this.globParts = set.map((s)=>s.split(slashSplit));
        this.debug(this.pattern, set);
        // glob --> regexps
        set = set.map((s, si, set)=>s.map(this.parse, this));
        this.debug(this.pattern, set);
        // filter out everything that didn't compile properly.
        set = set.filter((s)=>s.indexOf(false) === -1);
        this.debug(this.pattern, set);
        this.set = set;
    }
    parseNegate() {
        if (this.options.nonegate) return;
        const pattern = this.pattern;
        let negate = false;
        let negateOffset = 0;
        for(let i = 0; i < pattern.length && pattern.charAt(i) === "!"; i++){
            negate = !negate;
            negateOffset++;
        }
        if (negateOffset) this.pattern = pattern.slice(negateOffset);
        this.negate = negate;
    }
    // set partial to true to test if, for example,
    // "/a/b" matches the start of "/*/b/*/d"
    // Partial means, if you run out of file before you run
    // out of pattern, then that's fine, as long as all
    // the parts match.
    matchOne(file, pattern, partial) {
        var options = this.options;
        this.debug("matchOne", {
            "this": this,
            file: file,
            pattern: pattern
        });
        this.debug("matchOne", file.length, pattern.length);
        for(var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++){
            this.debug("matchOne loop");
            var p = pattern[pi];
            var f = file[fi];
            this.debug(pattern, p, f);
            // should be impossible.
            // some invalid regexp stuff in the set.
            /* istanbul ignore if */ if (p === false) return false;
            if (p === GLOBSTAR) {
                this.debug("GLOBSTAR", [
                    pattern,
                    p,
                    f
                ]);
                // "**"
                // a/**/b/**/c would match the following:
                // a/b/x/y/z/c
                // a/x/y/z/b/c
                // a/b/x/b/x/c
                // a/b/c
                // To do this, take the rest of the pattern after
                // the **, and see if it would match the file remainder.
                // If so, return success.
                // If not, the ** "swallows" a segment, and try again.
                // This is recursively awful.
                //
                // a/**/b/**/c matching a/b/x/y/z/c
                // - a matches a
                // - doublestar
                //   - matchOne(b/x/y/z/c, b/**/c)
                //     - b matches b
                //     - doublestar
                //       - matchOne(x/y/z/c, c) -> no
                //       - matchOne(y/z/c, c) -> no
                //       - matchOne(z/c, c) -> no
                //       - matchOne(c, c) yes, hit
                var fr = fi;
                var pr = pi + 1;
                if (pr === pl) {
                    this.debug("** at the end");
                    // a ** at the end will just swallow the rest.
                    // We have found a match.
                    // however, it will not swallow /.x, unless
                    // options.dot is set.
                    // . and .. are *never* matched by **, for explosively
                    // exponential reasons.
                    for(; fi < fl; fi++){
                        if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".") return false;
                    }
                    return true;
                }
                // ok, let's see if we can swallow whatever we can.
                while(fr < fl){
                    var swallowee = file[fr];
                    this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
                    // XXX remove this slice.  Just pass the start index.
                    if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
                        this.debug("globstar found match!", fr, fl, swallowee);
                        // found a match.
                        return true;
                    } else {
                        // can't swallow "." or ".." ever.
                        // can only swallow ".foo" when explicitly asked.
                        if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
                            this.debug("dot detected!", file, fr, pattern, pr);
                            break;
                        }
                        // ** swallows a segment, and continue.
                        this.debug("globstar swallow a segment, and continue");
                        fr++;
                    }
                }
                // no match was found.
                // However, in partial mode, we can't say this is necessarily over.
                // If there's more *pattern* left, then
                /* istanbul ignore if */ if (partial) {
                    // ran out of file
                    this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
                    if (fr === fl) return true;
                }
                return false;
            }
            // something other than **
            // non-magic patterns just have to match exactly
            // patterns with magic have been turned into regexps.
            var hit;
            if (typeof p === "string") {
                hit = f === p;
                this.debug("string match", p, f, hit);
            } else {
                hit = f.match(p);
                this.debug("pattern match", p, f, hit);
            }
            if (!hit) return false;
        }
        // Note: ending in / means that we'll get a final ""
        // at the end of the pattern.  This can only match a
        // corresponding "" at the end of the file.
        // If the file ends in /, then it can only match a
        // a pattern that ends in /, unless the pattern just
        // doesn't have any more for it. But, a/b/ should *not*
        // match "a/b/*", even though "" matches against the
        // [^/]*? pattern, except in partial mode, where it might
        // simply not be reached yet.
        // However, a/b/ should still satisfy a/*
        // now either we fell off the end of the pattern, or we're done.
        if (fi === fl && pi === pl) // ran out of pattern and filename at the same time.
        // an exact hit!
        return true;
        else if (fi === fl) // ran out of file, but still had pattern left.
        // this is ok if we're doing the match as part of
        // a glob fs traversal.
        return partial;
        else /* istanbul ignore else */ if (pi === pl) // ran out of pattern, still have file left.
        // this is only acceptable if we're on the very last
        // empty segment of a file with a trailing slash.
        // a/* should match a/b/
        return fi === fl - 1 && file[fi] === "";
        // should be unreachable.
        /* istanbul ignore next */ throw new Error("wtf?");
    }
    braceExpand() {
        return braceExpand(this.pattern, this.options);
    }
    parse(pattern, isSub) {
        assertValidPattern(pattern);
        const options = this.options;
        // shortcuts
        if (pattern === "**") {
            if (!options.noglobstar) return GLOBSTAR;
            else pattern = "*";
        }
        if (pattern === "") return "";
        let re = "";
        let hasMagic = false;
        let escaping = false;
        // ? => one single character
        const patternListStack = [];
        const negativeLists = [];
        let stateChar;
        let inClass = false;
        let reClassStart = -1;
        let classStart = -1;
        let cs;
        let pl;
        let sp;
        // . and .. never match anything that doesn't start with .,
        // even when options.dot is set.  However, if the pattern
        // starts with ., then traversal patterns can match.
        let dotTravAllowed = pattern.charAt(0) === ".";
        let dotFileAllowed = options.dot || dotTravAllowed;
        const patternStart = ()=>dotTravAllowed ? "" : dotFileAllowed ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
        const subPatternStart = (p)=>p.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
        const clearStateChar = ()=>{
            if (stateChar) {
                // we had some state-tracking character
                // that wasn't consumed by this pass.
                switch(stateChar){
                    case "*":
                        re += star;
                        hasMagic = true;
                        break;
                    case "?":
                        re += qmark;
                        hasMagic = true;
                        break;
                    default:
                        re += "\\" + stateChar;
                        break;
                }
                this.debug("clearStateChar %j %j", stateChar, re);
                stateChar = false;
            }
        };
        for(let i = 0, c; i < pattern.length && (c = pattern.charAt(i)); i++){
            this.debug("%s	%s %s %j", pattern, i, re, c);
            // skip over any that are escaped.
            if (escaping) {
                /* istanbul ignore next - completely not allowed, even escaped. */ if (c === "/") return false;
                if (reSpecials[c]) re += "\\";
                re += c;
                escaping = false;
                continue;
            }
            switch(c){
                /* istanbul ignore next */ case "/":
                    // Should already be path-split by now.
                    return false;
                case "\\":
                    if (inClass && pattern.charAt(i + 1) === "-") {
                        re += c;
                        continue;
                    }
                    clearStateChar();
                    escaping = true;
                    continue;
                // the various stateChar values
                // for the "extglob" stuff.
                case "?":
                case "*":
                case "+":
                case "@":
                case "!":
                    this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
                    // all of those are literals inside a class, except that
                    // the glob [!a] means [^a] in regexp
                    if (inClass) {
                        this.debug("  in class");
                        if (c === "!" && i === classStart + 1) c = "^";
                        re += c;
                        continue;
                    }
                    // if we already have a stateChar, then it means
                    // that there was something like ** or +? in there.
                    // Handle the stateChar, then proceed with this one.
                    this.debug("call clearStateChar %j", stateChar);
                    clearStateChar();
                    stateChar = c;
                    // if extglob is disabled, then +(asdf|foo) isn't a thing.
                    // just clear the statechar *now*, rather than even diving into
                    // the patternList stuff.
                    if (options.noext) clearStateChar();
                    continue;
                case "(":
                    {
                        if (inClass) {
                            re += "(";
                            continue;
                        }
                        if (!stateChar) {
                            re += "\\(";
                            continue;
                        }
                        const plEntry = {
                            type: stateChar,
                            start: i - 1,
                            reStart: re.length,
                            open: plTypes[stateChar].open,
                            close: plTypes[stateChar].close
                        };
                        this.debug(this.pattern, "	", plEntry);
                        patternListStack.push(plEntry);
                        // negation is (?:(?!(?:js)(?:<rest>))[^/]*)
                        re += plEntry.open;
                        // next entry starts with a dot maybe?
                        if (plEntry.start === 0 && plEntry.type !== "!") {
                            dotTravAllowed = true;
                            re += subPatternStart(pattern.slice(i + 1));
                        }
                        this.debug("plType %j %j", stateChar, re);
                        stateChar = false;
                        continue;
                    }
                case ")":
                    {
                        const plEntry = patternListStack[patternListStack.length - 1];
                        if (inClass || !plEntry) {
                            re += "\\)";
                            continue;
                        }
                        patternListStack.pop();
                        // closing an extglob
                        clearStateChar();
                        hasMagic = true;
                        pl = plEntry;
                        // negation is (?:(?!js)[^/]*)
                        // The others are (?:<pattern>)<type>
                        re += pl.close;
                        if (pl.type === "!") negativeLists.push(Object.assign(pl, {
                            reEnd: re.length
                        }));
                        continue;
                    }
                case "|":
                    {
                        const plEntry = patternListStack[patternListStack.length - 1];
                        if (inClass || !plEntry) {
                            re += "\\|";
                            continue;
                        }
                        clearStateChar();
                        re += "|";
                        // next subpattern can start with a dot?
                        if (plEntry.start === 0 && plEntry.type !== "!") {
                            dotTravAllowed = true;
                            re += subPatternStart(pattern.slice(i + 1));
                        }
                        continue;
                    }
                // these are mostly the same in regexp and glob
                case "[":
                    // swallow any state-tracking char before the [
                    clearStateChar();
                    if (inClass) {
                        re += "\\" + c;
                        continue;
                    }
                    inClass = true;
                    classStart = i;
                    reClassStart = re.length;
                    re += c;
                    continue;
                case "]":
                    //  a right bracket shall lose its special
                    //  meaning and represent itself in
                    //  a bracket expression if it occurs
                    //  first in the list.  -- POSIX.2 2.8.3.2
                    if (i === classStart + 1 || !inClass) {
                        re += "\\" + c;
                        continue;
                    }
                    // split where the last [ was, make sure we don't have
                    // an invalid re. if so, re-walk the contents of the
                    // would-be class to re-translate any characters that
                    // were passed through as-is
                    // TODO: It would probably be faster to determine this
                    // without a try/catch and a new RegExp, but it's tricky
                    // to do safely.  For now, this is safe and works.
                    cs = pattern.substring(classStart + 1, i);
                    try {
                        RegExp("[" + braExpEscape(charUnescape(cs)) + "]");
                        // looks good, finish up the class.
                        re += c;
                    } catch (er) {
                        // out of order ranges in JS are errors, but in glob syntax,
                        // they're just a range that matches nothing.
                        re = re.substring(0, reClassStart) + "(?:$.)" // match nothing ever
                        ;
                    }
                    hasMagic = true;
                    inClass = false;
                    continue;
                default:
                    // swallow any state char that wasn't consumed
                    clearStateChar();
                    if (reSpecials[c] && !(c === "^" && inClass)) re += "\\";
                    re += c;
                    break;
            } // switch
        } // for
        // handle the case where we left a class open.
        // "[abc" is valid, equivalent to "\[abc"
        if (inClass) {
            // split where the last [ was, and escape it
            // this is a huge pita.  We now have to re-walk
            // the contents of the would-be class to re-translate
            // any characters that were passed through as-is
            cs = pattern.slice(classStart + 1);
            sp = this.parse(cs, SUBPARSE);
            re = re.substring(0, reClassStart) + "\\[" + sp[0];
            hasMagic = hasMagic || sp[1];
        }
        // handle the case where we had a +( thing at the *end*
        // of the pattern.
        // each pattern list stack adds 3 chars, and we need to go through
        // and escape any | chars that were passed through as-is for the regexp.
        // Go through and escape them, taking care not to double-escape any
        // | chars that were already escaped.
        for(pl = patternListStack.pop(); pl; pl = patternListStack.pop()){
            let tail;
            tail = re.slice(pl.reStart + pl.open.length);
            this.debug("setting tail", re, pl);
            // maybe some even number of \, then maybe 1 \, followed by a |
            tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, (_, $1, $2)=>{
                /* istanbul ignore else - should already be done */ if (!$2) // the | isn't already escaped, so escape it.
                $2 = "\\";
                // need to escape all those slashes *again*, without escaping the
                // one that we need for escaping the | character.  As it works out,
                // escaping an even number of slashes can be done by simply repeating
                // it exactly after itself.  That's why this trick works.
                //
                // I am sorry that you have to see this.
                return $1 + $1 + $2 + "|";
            });
            this.debug("tail=%j\n   %s", tail, tail, pl, re);
            const t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
            hasMagic = true;
            re = re.slice(0, pl.reStart) + t + "\\(" + tail;
        }
        // handle trailing things that only matter at the very end.
        clearStateChar();
        if (escaping) // trailing \\
        re += "\\\\";
        // only need to apply the nodot start if the re starts with
        // something that could conceivably capture a dot
        const addPatternStart = addPatternStartSet[re.charAt(0)];
        // Hack to work around lack of negative lookbehind in JS
        // A pattern like: *.!(x).!(y|z) needs to ensure that a name
        // like 'a.xyz.yz' doesn't match.  So, the first negative
        // lookahead, has to look ALL the way ahead, to the end of
        // the pattern.
        for(let n = negativeLists.length - 1; n > -1; n--){
            const nl = negativeLists[n];
            const nlBefore = re.slice(0, nl.reStart);
            const nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
            let nlAfter = re.slice(nl.reEnd);
            const nlLast = re.slice(nl.reEnd - 8, nl.reEnd) + nlAfter;
            // Handle nested stuff like *(*.js|!(*.json)), where open parens
            // mean that we should *not* include the ) in the bit that is considered
            // "after" the negated section.
            const closeParensBefore = nlBefore.split(")").length;
            const openParensBefore = nlBefore.split("(").length - closeParensBefore;
            let cleanAfter = nlAfter;
            for(let i = 0; i < openParensBefore; i++)cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
            nlAfter = cleanAfter;
            const dollar = nlAfter === "" && isSub !== SUBPARSE ? "(?:$|\\/)" : "";
            re = nlBefore + nlFirst + nlAfter + dollar + nlLast;
        }
        // if the re is not "" at this point, then we need to make sure
        // it doesn't match against an empty path part.
        // Otherwise a/* will match a/, which it should not.
        if (re !== "" && hasMagic) re = "(?=.)" + re;
        if (addPatternStart) re = patternStart() + re;
        // parsing just a piece of a larger pattern.
        if (isSub === SUBPARSE) return [
            re,
            hasMagic
        ];
        // if it's nocase, and the lcase/uppercase don't match, it's magic
        if (options.nocase && !hasMagic) hasMagic = pattern.toUpperCase() !== pattern.toLowerCase();
        // skip the regexp for non-magical patterns
        // unescape anything in it, though, so that it'll be
        // an exact match against a file etc.
        if (!hasMagic) return globUnescape(pattern);
        const flags = options.nocase ? "i" : "";
        try {
            return Object.assign(new RegExp("^" + re + "$", flags), {
                _glob: pattern,
                _src: re
            });
        } catch (er) /* istanbul ignore next - should be impossible */ {
            // If it was an invalid regular expression, then it can't match
            // anything.  This trick looks for a character after the end of
            // the string, which is of course impossible, except in multi-line
            // mode, but it's not a /m regex.
            return new RegExp("$.");
        }
    }
    makeRe() {
        if (this.regexp || this.regexp === false) return this.regexp;
        // at this point, this.set is a 2d array of partial
        // pattern strings, or "**".
        //
        // It's better to use .match().  This function shouldn't
        // be used, really, but it's pretty convenient sometimes,
        // when you just want to work with a regex.
        const set = this.set;
        if (!set.length) {
            this.regexp = false;
            return this.regexp;
        }
        const options = this.options;
        const twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
        const flags = options.nocase ? "i" : "";
        // coalesce globstars and regexpify non-globstar patterns
        // if it's the only item, then we just do one twoStar
        // if it's the first, and there are more, prepend (\/|twoStar\/)? to next
        // if it's the last, append (\/twoStar|) to previous
        // if it's in the middle, append (\/|\/twoStar\/) to previous
        // then filter out GLOBSTAR symbols
        let re = set.map((pattern)=>{
            pattern = pattern.map((p)=>typeof p === "string" ? regExpEscape(p) : p === GLOBSTAR ? GLOBSTAR : p._src).reduce((set, p)=>{
                if (!(set[set.length - 1] === GLOBSTAR && p === GLOBSTAR)) set.push(p);
                return set;
            }, []);
            pattern.forEach((p, i)=>{
                if (p !== GLOBSTAR || pattern[i - 1] === GLOBSTAR) return;
                if (i === 0) {
                    if (pattern.length > 1) pattern[i + 1] = "(?:\\/|" + twoStar + "\\/)?" + pattern[i + 1];
                    else pattern[i] = twoStar;
                } else if (i === pattern.length - 1) pattern[i - 1] += "(?:\\/|" + twoStar + ")?";
                else {
                    pattern[i - 1] += "(?:\\/|\\/" + twoStar + "\\/)" + pattern[i + 1];
                    pattern[i + 1] = GLOBSTAR;
                }
            });
            return pattern.filter((p)=>p !== GLOBSTAR).join("/");
        }).join("|");
        // must match entire pattern
        // ending in a * or ** will make it less strict.
        re = "^(?:" + re + ")$";
        // can match anything, as long as it's not this.
        if (this.negate) re = "^(?!" + re + ").*$";
        try {
            this.regexp = new RegExp(re, flags);
        } catch (ex) /* istanbul ignore next - should be impossible */ {
            this.regexp = false;
        }
        return this.regexp;
    }
    match(f, partial = this.partial) {
        this.debug("match", f, this.pattern);
        // short-circuit in the case of busted things.
        // comments, etc.
        if (this.comment) return false;
        if (this.empty) return f === "";
        if (f === "/" && partial) return true;
        const options = this.options;
        // windows: need to use /, not \
        if (path.sep !== "/") f = f.split(path.sep).join("/");
        // treat the test path as a set of pathparts.
        f = f.split(slashSplit);
        this.debug(this.pattern, "split", f);
        // just ONE of the pattern sets in this.set needs to match
        // in order for it to be valid.  If negating, then just one
        // match means that we have failed.
        // Either way, return on the first hit.
        const set = this.set;
        this.debug(this.pattern, "set", set);
        // Find the basename of the path by looking for the last non-empty segment
        let filename;
        for(let i = f.length - 1; i >= 0; i--){
            filename = f[i];
            if (filename) break;
        }
        for(let i = 0; i < set.length; i++){
            const pattern = set[i];
            let file = f;
            if (options.matchBase && pattern.length === 1) file = [
                filename
            ];
            const hit = this.matchOne(file, pattern, partial);
            if (hit) {
                if (options.flipNegate) return true;
                return !this.negate;
            }
        }
        // didn't get any hits.  this is success if it's a negative
        // pattern, failure otherwise.
        if (options.flipNegate) return false;
        return this.negate;
    }
    static defaults(def) {
        return minimatch.defaults(def).Minimatch;
    }
}
minimatch.Minimatch = Minimatch;

},{"5b19941f49a82f37":"hUuj2","9d1c01bc6ba57396":"baabV"}],"hUuj2":[function(require,module,exports) {
const isWindows = typeof process === "object" && process && process.platform === "win32";
module.exports = isWindows ? {
    sep: "\\"
} : {
    sep: "/"
};

},{}],"baabV":[function(require,module,exports) {
var balanced = require("8e3bfed5271e8941");
module.exports = expandTop;
var escSlash = "\0SLASH" + Math.random() + "\0";
var escOpen = "\0OPEN" + Math.random() + "\0";
var escClose = "\0CLOSE" + Math.random() + "\0";
var escComma = "\0COMMA" + Math.random() + "\0";
var escPeriod = "\0PERIOD" + Math.random() + "\0";
function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
}
function escapeBraces(str) {
    return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
}
function unescapeBraces(str) {
    return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
}
// Basically just str.split(","), but handling cases
// where we have nested braced sections, which should be
// treated as individual members, like {a,{b,c},d}
function parseCommaParts(str) {
    if (!str) return [
        ""
    ];
    var parts = [];
    var m = balanced("{", "}", str);
    if (!m) return str.split(",");
    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(",");
    p[p.length - 1] += "{" + body + "}";
    var postParts = parseCommaParts(post);
    if (post.length) {
        p[p.length - 1] += postParts.shift();
        p.push.apply(p, postParts);
    }
    parts.push.apply(parts, p);
    return parts;
}
function expandTop(str) {
    if (!str) return [];
    // I don't know why Bash 4.3 does this, but it does.
    // Anything starting with {} will have the first two bytes preserved
    // but *only* at the top level, so {},a}b will not expand to anything,
    // but a{},b}c will be expanded to [a}c,abc].
    // One could argue that this is a bug in Bash, but since the goal of
    // this module is to match Bash's rules, we escape a leading {}
    if (str.substr(0, 2) === "{}") str = "\\{\\}" + str.substr(2);
    return expand(escapeBraces(str), true).map(unescapeBraces);
}
function embrace(str) {
    return "{" + str + "}";
}
function isPadded(el) {
    return /^-?0\d/.test(el);
}
function lte(i, y) {
    return i <= y;
}
function gte(i, y) {
    return i >= y;
}
function expand(str, isTop) {
    var expansions = [];
    var m = balanced("{", "}", str);
    if (!m) return [
        str
    ];
    // no need to expand pre, since it is guaranteed to be free of brace-sets
    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [
        ""
    ];
    if (/\$$/.test(m.pre)) for(var k = 0; k < post.length; k++){
        var expansion = pre + "{" + m.body + "}" + post[k];
        expansions.push(expansion);
    }
    else {
        var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
        var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
        var isSequence = isNumericSequence || isAlphaSequence;
        var isOptions = m.body.indexOf(",") >= 0;
        if (!isSequence && !isOptions) {
            // {a},b}
            if (m.post.match(/,.*\}/)) {
                str = m.pre + "{" + m.body + escClose + m.post;
                return expand(str);
            }
            return [
                str
            ];
        }
        var n;
        if (isSequence) n = m.body.split(/\.\./);
        else {
            n = parseCommaParts(m.body);
            if (n.length === 1) {
                // x{{a,b}}y ==> x{a}y x{b}y
                n = expand(n[0], false).map(embrace);
                if (n.length === 1) return post.map(function(p) {
                    return m.pre + n[0] + p;
                });
            }
        }
        // at this point, n is the parts, and we know it's not a comma set
        // with a single entry.
        var N;
        if (isSequence) {
            var x = numeric(n[0]);
            var y = numeric(n[1]);
            var width = Math.max(n[0].length, n[1].length);
            var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
            var test = lte;
            var reverse = y < x;
            if (reverse) {
                incr *= -1;
                test = gte;
            }
            var pad = n.some(isPadded);
            N = [];
            for(var i = x; test(i, y); i += incr){
                var c;
                if (isAlphaSequence) {
                    c = String.fromCharCode(i);
                    if (c === "\\") c = "";
                } else {
                    c = String(i);
                    if (pad) {
                        var need = width - c.length;
                        if (need > 0) {
                            var z = new Array(need + 1).join("0");
                            if (i < 0) c = "-" + z + c.slice(1);
                            else c = z + c;
                        }
                    }
                }
                N.push(c);
            }
        } else {
            N = [];
            for(var j = 0; j < n.length; j++)N.push.apply(N, expand(n[j], false));
        }
        for(var j = 0; j < N.length; j++)for(var k = 0; k < post.length; k++){
            var expansion = pre + N[j] + post[k];
            if (!isTop || isSequence || expansion) expansions.push(expansion);
        }
    }
    return expansions;
}

},{"8e3bfed5271e8941":"2vs2x"}],"2vs2x":[function(require,module,exports) {
"use strict";
module.exports = balanced;
function balanced(a, b, str) {
    if (a instanceof RegExp) a = maybeMatch(a, str);
    if (b instanceof RegExp) b = maybeMatch(b, str);
    var r = range(a, b, str);
    return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
    };
}
function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
}
balanced.range = range;
function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;
    if (ai >= 0 && bi > 0) {
        if (a === b) return [
            ai,
            bi
        ];
        begs = [];
        left = str.length;
        while(i >= 0 && !result){
            if (i == ai) {
                begs.push(i);
                ai = str.indexOf(a, i + 1);
            } else if (begs.length == 1) result = [
                begs.pop(),
                bi
            ];
            else {
                beg = begs.pop();
                if (beg < left) {
                    left = beg;
                    right = bi;
                }
                bi = str.indexOf(b, i + 1);
            }
            i = ai < bi && ai >= 0 ? ai : bi;
        }
        if (begs.length) result = [
            left,
            right
        ];
    }
    return result;
}

},{}],"hMNkv":[function(require,module,exports) {
"use strict";
const crypto = require("69e8561268cff317");
const pathUtil = require("68b13959b27a4642");
const inspect = require("6ef481007a091e54");
const list = require("b3034c9acea9fc64");
const validate = require("7e2aa0bf7a845033");
const treeWalker = require("39eb296a6172535");
const validateInput = (methodName, path, options)=>{
    const methodSignature = `${methodName}(path, [options])`;
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
    validate.options(methodSignature, "options", options, {
        checksum: [
            "string"
        ],
        relativePath: [
            "boolean"
        ],
        times: [
            "boolean"
        ],
        symlinks: [
            "string"
        ]
    });
    if (options && options.checksum !== undefined && inspect.supportedChecksumAlgorithms.indexOf(options.checksum) === -1) throw new Error(`Argument "options.checksum" passed to ${methodSignature} must have one of values: ${inspect.supportedChecksumAlgorithms.join(", ")}`);
    if (options && options.symlinks !== undefined && inspect.symlinkOptions.indexOf(options.symlinks) === -1) throw new Error(`Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${inspect.symlinkOptions.join(", ")}`);
};
const relativePathInTree = (parentInspectObj, inspectObj)=>{
    if (parentInspectObj === undefined) return ".";
    return parentInspectObj.relativePath + "/" + inspectObj.name;
};
// Creates checksum of a directory by using
// checksums and names of all its children.
const checksumOfDir = (inspectList, algo)=>{
    const hash = crypto.createHash(algo);
    inspectList.forEach((inspectObj)=>{
        hash.update(inspectObj.name + inspectObj[algo]);
    });
    return hash.digest("hex");
};
const calculateTreeDependentProperties = (parentInspectObj, inspectObj, options)=>{
    if (options.relativePath) inspectObj.relativePath = relativePathInTree(parentInspectObj, inspectObj);
    if (inspectObj.type === "dir") {
        inspectObj.children.forEach((childInspectObj)=>{
            calculateTreeDependentProperties(inspectObj, childInspectObj, options);
        });
        inspectObj.size = 0;
        inspectObj.children.sort((a, b)=>{
            if (a.type === "dir" && b.type === "file") return -1;
            if (a.type === "file" && b.type === "dir") return 1;
            return a.name.localeCompare(b.name);
        });
        inspectObj.children.forEach((child)=>{
            inspectObj.size += child.size || 0;
        });
        if (options.checksum) inspectObj[options.checksum] = checksumOfDir(inspectObj.children, options.checksum);
    }
};
const findParentInTree = (treeNode, pathChain, item)=>{
    const name = pathChain[0];
    if (pathChain.length > 1) {
        const itemInTreeForPathChain = treeNode.children.find((child)=>{
            return child.name === name;
        });
        return findParentInTree(itemInTreeForPathChain, pathChain.slice(1), item);
    }
    return treeNode;
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const inspectTreeSync = (path, opts)=>{
    const options = opts || {};
    let tree;
    treeWalker.sync(path, {
        inspectOptions: options
    }, (itemPath, item)=>{
        if (item) {
            if (item.type === "dir") item.children = [];
            const relativePath = pathUtil.relative(path, itemPath);
            if (relativePath === "") tree = item;
            else {
                const parentItem = findParentInTree(tree, relativePath.split(pathUtil.sep), item);
                parentItem.children.push(item);
            }
        }
    });
    if (tree) calculateTreeDependentProperties(undefined, tree, options);
    return tree;
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const inspectTreeAsync = (path, opts)=>{
    const options = opts || {};
    let tree;
    return new Promise((resolve, reject)=>{
        treeWalker.async(path, {
            inspectOptions: options
        }, (itemPath, item)=>{
            if (item) {
                if (item.type === "dir") item.children = [];
                const relativePath = pathUtil.relative(path, itemPath);
                if (relativePath === "") tree = item;
                else {
                    const parentItem = findParentInTree(tree, relativePath.split(pathUtil.sep), item);
                    parentItem.children.push(item);
                }
            }
        }, (err)=>{
            if (err) reject(err);
            else {
                if (tree) calculateTreeDependentProperties(undefined, tree, options);
                resolve(tree);
            }
        });
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = inspectTreeSync;
exports.async = inspectTreeAsync;

},{"69e8561268cff317":"crypto","68b13959b27a4642":"path","6ef481007a091e54":"24g0a","b3034c9acea9fc64":"kh5Rb","7e2aa0bf7a845033":"59cGU","39eb296a6172535":"4vnJf"}],"6zUc5":[function(require,module,exports) {
"use strict";
const pathUtil = require("9969fb07938963b5");
const fs = require("d03b46d94a608809");
const dir = require("ef94cc3adcb2aa4c");
const exists = require("b87cb8b4e2c7f322");
const inspect = require("554b7be108b95898");
const write = require("2426c7cd849e9b7e");
const matcher = require("ff82b8f8c6ee2ee0");
const fileMode = require("21cbf37654a0e6fd");
const treeWalker = require("785633ace9e85bbf");
const validate = require("ba6949cf45611203");
const validateInput = (methodName, from, to, options)=>{
    const methodSignature = `${methodName}(from, to, [options])`;
    validate.argument(methodSignature, "from", from, [
        "string"
    ]);
    validate.argument(methodSignature, "to", to, [
        "string"
    ]);
    validate.options(methodSignature, "options", options, {
        overwrite: [
            "boolean",
            "function"
        ],
        matching: [
            "string",
            "array of string"
        ],
        ignoreCase: [
            "boolean"
        ]
    });
};
const parseOptions = (options, from)=>{
    const opts = options || {};
    const parsedOptions = {};
    if (opts.ignoreCase === undefined) opts.ignoreCase = false;
    parsedOptions.overwrite = opts.overwrite;
    if (opts.matching) parsedOptions.allowedToCopy = matcher.create(from, opts.matching, opts.ignoreCase);
    else parsedOptions.allowedToCopy = ()=>{
        // Default behaviour - copy everything.
        return true;
    };
    return parsedOptions;
};
const generateNoSourceError = (path)=>{
    const err = new Error(`Path to copy doesn't exist ${path}`);
    err.code = "ENOENT";
    return err;
};
const generateDestinationExistsError = (path)=>{
    const err = new Error(`Destination path already exists ${path}`);
    err.code = "EEXIST";
    return err;
};
const inspectOptions = {
    mode: true,
    symlinks: "report",
    times: true,
    absolutePath: true
};
const shouldThrowDestinationExistsError = (context)=>{
    return typeof context.opts.overwrite !== "function" && context.opts.overwrite !== true;
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const checksBeforeCopyingSync = (from, to, opts)=>{
    if (!exists.sync(from)) throw generateNoSourceError(from);
    if (exists.sync(to) && !opts.overwrite) throw generateDestinationExistsError(to);
};
const canOverwriteItSync = (context)=>{
    if (typeof context.opts.overwrite === "function") {
        const destInspectData = inspect.sync(context.destPath, inspectOptions);
        return context.opts.overwrite(context.srcInspectData, destInspectData);
    }
    return context.opts.overwrite === true;
};
const copyFileSync = (srcPath, destPath, mode, context)=>{
    const data = fs.readFileSync(srcPath);
    try {
        fs.writeFileSync(destPath, data, {
            mode,
            flag: "wx"
        });
    } catch (err) {
        if (err.code === "ENOENT") write.sync(destPath, data, {
            mode
        });
        else if (err.code === "EEXIST") {
            if (canOverwriteItSync(context)) fs.writeFileSync(destPath, data, {
                mode
            });
            else if (shouldThrowDestinationExistsError(context)) throw generateDestinationExistsError(context.destPath);
        } else throw err;
    }
};
const copySymlinkSync = (from, to)=>{
    const symlinkPointsAt = fs.readlinkSync(from);
    try {
        fs.symlinkSync(symlinkPointsAt, to);
    } catch (err) {
        // There is already file/symlink with this name on destination location.
        // Must erase it manually, otherwise system won't allow us to place symlink there.
        if (err.code === "EEXIST") {
            fs.unlinkSync(to);
            // Retry...
            fs.symlinkSync(symlinkPointsAt, to);
        } else throw err;
    }
};
const copyItemSync = (srcPath, srcInspectData, destPath, opts)=>{
    const context = {
        srcPath,
        destPath,
        srcInspectData,
        opts
    };
    const mode = fileMode.normalizeFileMode(srcInspectData.mode);
    if (srcInspectData.type === "dir") dir.createSync(destPath, {
        mode
    });
    else if (srcInspectData.type === "file") copyFileSync(srcPath, destPath, mode, context);
    else if (srcInspectData.type === "symlink") copySymlinkSync(srcPath, destPath);
};
const copySync = (from, to, options)=>{
    const opts = parseOptions(options, from);
    checksBeforeCopyingSync(from, to, opts);
    treeWalker.sync(from, {
        inspectOptions
    }, (srcPath, srcInspectData)=>{
        const rel = pathUtil.relative(from, srcPath);
        const destPath = pathUtil.resolve(to, rel);
        if (opts.allowedToCopy(srcPath, destPath, srcInspectData)) copyItemSync(srcPath, srcInspectData, destPath, opts);
    });
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const checksBeforeCopyingAsync = (from, to, opts)=>{
    return exists.async(from).then((srcPathExists)=>{
        if (!srcPathExists) throw generateNoSourceError(from);
        else return exists.async(to);
    }).then((destPathExists)=>{
        if (destPathExists && !opts.overwrite) throw generateDestinationExistsError(to);
    });
};
const canOverwriteItAsync = (context)=>{
    return new Promise((resolve, reject)=>{
        if (typeof context.opts.overwrite === "function") inspect.async(context.destPath, inspectOptions).then((destInspectData)=>{
            resolve(context.opts.overwrite(context.srcInspectData, destInspectData));
        }).catch(reject);
        else resolve(context.opts.overwrite === true);
    });
};
const copyFileAsync = (srcPath, destPath, mode, context, runOptions)=>{
    return new Promise((resolve, reject)=>{
        const runOpts = runOptions || {};
        let flags = "wx";
        if (runOpts.overwrite) flags = "w";
        const readStream = fs.createReadStream(srcPath);
        const writeStream = fs.createWriteStream(destPath, {
            mode,
            flags
        });
        readStream.on("error", reject);
        writeStream.on("error", (err)=>{
            // Force read stream to close, since write stream errored
            // read stream serves us no purpose.
            readStream.resume();
            if (err.code === "ENOENT") // Some parent directory doesn't exits. Create it and retry.
            dir.createAsync(pathUtil.dirname(destPath)).then(()=>{
                copyFileAsync(srcPath, destPath, mode, context).then(resolve, reject);
            }).catch(reject);
            else if (err.code === "EEXIST") canOverwriteItAsync(context).then((canOverwite)=>{
                if (canOverwite) copyFileAsync(srcPath, destPath, mode, context, {
                    overwrite: true
                }).then(resolve, reject);
                else if (shouldThrowDestinationExistsError(context)) reject(generateDestinationExistsError(destPath));
                else resolve();
            }).catch(reject);
            else reject(err);
        });
        writeStream.on("finish", resolve);
        readStream.pipe(writeStream);
    });
};
const copySymlinkAsync = (from, to)=>{
    return fs.readlink(from).then((symlinkPointsAt)=>{
        return new Promise((resolve, reject)=>{
            fs.symlink(symlinkPointsAt, to).then(resolve).catch((err)=>{
                if (err.code === "EEXIST") // There is already file/symlink with this name on destination location.
                // Must erase it manually, otherwise system won't allow us to place symlink there.
                fs.unlink(to).then(()=>{
                    // Retry...
                    return fs.symlink(symlinkPointsAt, to);
                }).then(resolve, reject);
                else reject(err);
            });
        });
    });
};
const copyItemAsync = (srcPath, srcInspectData, destPath, opts)=>{
    const context = {
        srcPath,
        destPath,
        srcInspectData,
        opts
    };
    const mode = fileMode.normalizeFileMode(srcInspectData.mode);
    if (srcInspectData.type === "dir") return dir.createAsync(destPath, {
        mode
    });
    else if (srcInspectData.type === "file") return copyFileAsync(srcPath, destPath, mode, context);
    else if (srcInspectData.type === "symlink") return copySymlinkAsync(srcPath, destPath);
    // Ha! This is none of supported file system entities. What now?
    // Just continuing without actually copying sounds sane.
    return Promise.resolve();
};
const copyAsync = (from, to, options)=>{
    return new Promise((resolve, reject)=>{
        const opts = parseOptions(options, from);
        checksBeforeCopyingAsync(from, to, opts).then(()=>{
            let allFilesDelivered = false;
            let filesInProgress = 0;
            treeWalker.async(from, {
                inspectOptions
            }, (srcPath, item)=>{
                if (item) {
                    const rel = pathUtil.relative(from, srcPath);
                    const destPath = pathUtil.resolve(to, rel);
                    if (opts.allowedToCopy(srcPath, item, destPath)) {
                        filesInProgress += 1;
                        copyItemAsync(srcPath, item, destPath, opts).then(()=>{
                            filesInProgress -= 1;
                            if (allFilesDelivered && filesInProgress === 0) resolve();
                        }).catch(reject);
                    }
                }
            }, (err)=>{
                if (err) reject(err);
                else {
                    allFilesDelivered = true;
                    if (allFilesDelivered && filesInProgress === 0) resolve();
                }
            });
        }).catch(reject);
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = copySync;
exports.async = copyAsync;

},{"9969fb07938963b5":"path","d03b46d94a608809":"kdumJ","ef94cc3adcb2aa4c":"dv3dd","b87cb8b4e2c7f322":"fbjTz","554b7be108b95898":"24g0a","2426c7cd849e9b7e":"h20BV","ff82b8f8c6ee2ee0":"cdi8o","21cbf37654a0e6fd":"2IuWw","785633ace9e85bbf":"4vnJf","ba6949cf45611203":"59cGU"}],"fbjTz":[function(require,module,exports) {
"use strict";
const fs = require("89b91b809ec2bcde");
const validate = require("1fbf04c85796feea");
const validateInput = (methodName, path)=>{
    const methodSignature = `${methodName}(path)`;
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const existsSync = (path)=>{
    try {
        const stat = fs.statSync(path);
        if (stat.isDirectory()) return "dir";
        else if (stat.isFile()) return "file";
        return "other";
    } catch (err) {
        if (err.code !== "ENOENT") throw err;
    }
    return false;
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const existsAsync = (path)=>{
    return new Promise((resolve, reject)=>{
        fs.stat(path).then((stat)=>{
            if (stat.isDirectory()) resolve("dir");
            else if (stat.isFile()) resolve("file");
            else resolve("other");
        }).catch((err)=>{
            if (err.code === "ENOENT") resolve(false);
            else reject(err);
        });
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = existsSync;
exports.async = existsAsync;

},{"89b91b809ec2bcde":"kdumJ","1fbf04c85796feea":"59cGU"}],"5vC2F":[function(require,module,exports) {
"use strict";
const pathUtil = require("1ad6d3ae1fb0f5d8");
const fs = require("c8bb043a294e7d36");
const validate = require("442a5d1aeb1b8f40");
const copy = require("ca2cb071e3ad53ed");
const dir = require("e54300270a1ab823");
const exists = require("41ba4550283d5db6");
const remove = require("404318fa51432fa1");
const validateInput = (methodName, from, to, options)=>{
    const methodSignature = `${methodName}(from, to, [options])`;
    validate.argument(methodSignature, "from", from, [
        "string"
    ]);
    validate.argument(methodSignature, "to", to, [
        "string"
    ]);
    validate.options(methodSignature, "options", options, {
        overwrite: [
            "boolean"
        ]
    });
};
const parseOptions = (options)=>{
    const opts = options || {};
    return opts;
};
const generateDestinationExistsError = (path)=>{
    const err = new Error(`Destination path already exists ${path}`);
    err.code = "EEXIST";
    return err;
};
const generateSourceDoesntExistError = (path)=>{
    const err = new Error(`Path to move doesn't exist ${path}`);
    err.code = "ENOENT";
    return err;
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const moveSync = (from, to, options)=>{
    const opts = parseOptions(options);
    if (exists.sync(to) !== false && opts.overwrite !== true) throw generateDestinationExistsError(to);
    // We now have permission to overwrite, since either `opts.overwrite` is true
    // or the destination does not exist (in which overwriting is irrelevant).
    try {
        // If destination is a file, `fs.renameSync` will overwrite it.
        fs.renameSync(from, to);
    } catch (err) {
        if (err.code === "EISDIR" || err.code === "EPERM") {
            // Looks like the destination path is a directory in the same device,
            // so we can remove it and call `fs.renameSync` again.
            remove.sync(to);
            fs.renameSync(from, to);
        } else if (err.code === "EXDEV") {
            // The destination path is in another device.
            copy.sync(from, to, {
                overwrite: true
            });
            remove.sync(from);
        } else if (err.code === "ENOENT") {
            // This can be caused by either the source not existing or one or more folders
            // in the destination path not existing.
            if (!exists.sync(from)) throw generateSourceDoesntExistError(from);
            // One or more directories in the destination path don't exist.
            dir.createSync(pathUtil.dirname(to));
            // Retry the attempt
            fs.renameSync(from, to);
        } else // We can't make sense of this error. Rethrow it.
        throw err;
    }
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const ensureDestinationPathExistsAsync = (to)=>{
    return new Promise((resolve, reject)=>{
        const destDir = pathUtil.dirname(to);
        exists.async(destDir).then((dstExists)=>{
            if (!dstExists) dir.createAsync(destDir).then(resolve, reject);
            else // Hah, no idea.
            reject();
        }).catch(reject);
    });
};
const moveAsync = (from, to, options)=>{
    const opts = parseOptions(options);
    return new Promise((resolve, reject)=>{
        exists.async(to).then((destinationExists)=>{
            if (destinationExists !== false && opts.overwrite !== true) reject(generateDestinationExistsError(to));
            else // We now have permission to overwrite, since either `opts.overwrite` is true
            // or the destination does not exist (in which overwriting is irrelevant).
            // If destination is a file, `fs.rename` will overwrite it.
            fs.rename(from, to).then(resolve).catch((err)=>{
                if (err.code === "EISDIR" || err.code === "EPERM") // Looks like the destination path is a directory in the same device,
                // so we can remove it and call `fs.rename` again.
                remove.async(to).then(()=>fs.rename(from, to)).then(resolve, reject);
                else if (err.code === "EXDEV") // The destination path is in another device.
                copy.async(from, to, {
                    overwrite: true
                }).then(()=>remove.async(from)).then(resolve, reject);
                else if (err.code === "ENOENT") // This can be caused by either the source not existing or one or more folders
                // in the destination path not existing.
                exists.async(from).then((srcExists)=>{
                    if (!srcExists) reject(generateSourceDoesntExistError(from));
                    else // One or more directories in the destination path don't exist.
                    ensureDestinationPathExistsAsync(to).then(()=>{
                        // Retry the attempt
                        return fs.rename(from, to);
                    }).then(resolve, reject);
                }).catch(reject);
                else // Something unknown. Rethrow original error.
                reject(err);
            });
        });
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = moveSync;
exports.async = moveAsync;

},{"1ad6d3ae1fb0f5d8":"path","c8bb043a294e7d36":"kdumJ","442a5d1aeb1b8f40":"59cGU","ca2cb071e3ad53ed":"6zUc5","e54300270a1ab823":"dv3dd","41ba4550283d5db6":"fbjTz","404318fa51432fa1":"aNX46"}],"aDboT":[function(require,module,exports) {
"use strict";
const fs = require("25cad42f7e87716b");
const validate = require("25b00910a7923a22");
const supportedReturnAs = [
    "utf8",
    "buffer",
    "json",
    "jsonWithDates"
];
const validateInput = (methodName, path, returnAs)=>{
    const methodSignature = `${methodName}(path, returnAs)`;
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
    validate.argument(methodSignature, "returnAs", returnAs, [
        "string",
        "undefined"
    ]);
    if (returnAs && supportedReturnAs.indexOf(returnAs) === -1) throw new Error(`Argument "returnAs" passed to ${methodSignature} must have one of values: ${supportedReturnAs.join(", ")}`);
};
// Matches strings generated by Date.toJSON()
// which is called to serialize date to JSON.
const jsonDateParser = (key, value)=>{
    const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
    if (typeof value === "string") {
        if (reISO.exec(value)) return new Date(value);
    }
    return value;
};
const makeNicerJsonParsingError = (path, err)=>{
    const nicerError = new Error(`JSON parsing failed while reading ${path} [${err}]`);
    nicerError.originalError = err;
    return nicerError;
};
// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------
const readSync = (path, returnAs)=>{
    const retAs = returnAs || "utf8";
    let data;
    let encoding = "utf8";
    if (retAs === "buffer") encoding = null;
    try {
        data = fs.readFileSync(path, {
            encoding
        });
    } catch (err) {
        if (err.code === "ENOENT") // If file doesn't exist return undefined instead of throwing.
        return undefined;
        // Otherwise rethrow the error
        throw err;
    }
    try {
        if (retAs === "json") data = JSON.parse(data);
        else if (retAs === "jsonWithDates") data = JSON.parse(data, jsonDateParser);
    } catch (err) {
        throw makeNicerJsonParsingError(path, err);
    }
    return data;
};
// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------
const readAsync = (path, returnAs)=>{
    return new Promise((resolve, reject)=>{
        const retAs = returnAs || "utf8";
        let encoding = "utf8";
        if (retAs === "buffer") encoding = null;
        fs.readFile(path, {
            encoding
        }).then((data)=>{
            // Make final parsing of the data before returning.
            try {
                if (retAs === "json") resolve(JSON.parse(data));
                else if (retAs === "jsonWithDates") resolve(JSON.parse(data, jsonDateParser));
                else resolve(data);
            } catch (err) {
                reject(makeNicerJsonParsingError(path, err));
            }
        }).catch((err)=>{
            if (err.code === "ENOENT") // If file doesn't exist return undefined instead of throwing.
            resolve(undefined);
            else // Otherwise throw
            reject(err);
        });
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = readSync;
exports.async = readAsync;

},{"25cad42f7e87716b":"kdumJ","25b00910a7923a22":"59cGU"}],"eDG6w":[function(require,module,exports) {
"use strict";
const pathUtil = require("846d61a7ad5eeec7");
const move = require("bef72949f7d8af53");
const validate = require("8ed912bb17671f33");
const validateInput = (methodName, path, newName, options)=>{
    const methodSignature = `${methodName}(path, newName, [options])`;
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
    validate.argument(methodSignature, "newName", newName, [
        "string"
    ]);
    validate.options(methodSignature, "options", options, {
        overwrite: [
            "boolean"
        ]
    });
    if (pathUtil.basename(newName) !== newName) throw new Error(`Argument "newName" passed to ${methodSignature} should be a filename, not a path. Received "${newName}"`);
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const renameSync = (path, newName, options)=>{
    const newPath = pathUtil.join(pathUtil.dirname(path), newName);
    move.sync(path, newPath, options);
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const renameAsync = (path, newName, options)=>{
    const newPath = pathUtil.join(pathUtil.dirname(path), newName);
    return move.async(path, newPath, options);
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = renameSync;
exports.async = renameAsync;

},{"846d61a7ad5eeec7":"path","bef72949f7d8af53":"5vC2F","8ed912bb17671f33":"59cGU"}],"eAnDy":[function(require,module,exports) {
"use strict";
const pathUtil = require("b4e2feb3148808cc");
const fs = require("1ad6f3e9adf028b1");
const validate = require("c93c9aa808ed2330");
const dir = require("cf40fb21c59513fc");
const validateInput = (methodName, symlinkValue, path)=>{
    const methodSignature = `${methodName}(symlinkValue, path)`;
    validate.argument(methodSignature, "symlinkValue", symlinkValue, [
        "string"
    ]);
    validate.argument(methodSignature, "path", path, [
        "string"
    ]);
};
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const symlinkSync = (symlinkValue, path)=>{
    try {
        fs.symlinkSync(symlinkValue, path);
    } catch (err) {
        if (err.code === "ENOENT") {
            // Parent directories don't exist. Just create them and retry.
            dir.createSync(pathUtil.dirname(path));
            fs.symlinkSync(symlinkValue, path);
        } else throw err;
    }
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const symlinkAsync = (symlinkValue, path)=>{
    return new Promise((resolve, reject)=>{
        fs.symlink(symlinkValue, path).then(resolve).catch((err)=>{
            if (err.code === "ENOENT") // Parent directories don't exist. Just create them and retry.
            dir.createAsync(pathUtil.dirname(path)).then(()=>{
                return fs.symlink(symlinkValue, path);
            }).then(resolve, reject);
            else reject(err);
        });
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = symlinkSync;
exports.async = symlinkAsync;

},{"b4e2feb3148808cc":"path","1ad6f3e9adf028b1":"kdumJ","c93c9aa808ed2330":"59cGU","cf40fb21c59513fc":"dv3dd"}],"bBSqZ":[function(require,module,exports) {
"use strict";
const fs = require("2a7dcc211d82d30");
exports.createWriteStream = fs.createWriteStream;
exports.createReadStream = fs.createReadStream;

},{"2a7dcc211d82d30":"fs"}],"htlut":[function(require,module,exports) {
"use strict";
const pathUtil = require("ea91c8e4f119e3f2");
const os = require("63125c0bde46ed7d");
const crypto = require("7f07bc516de55183");
const dir = require("7d30f28e2edd3012");
const fs = require("f11522bb9ba1e10");
const validate = require("7619d3a3f9522780");
const validateInput = (methodName, options)=>{
    const methodSignature = `${methodName}([options])`;
    validate.options(methodSignature, "options", options, {
        prefix: [
            "string"
        ],
        basePath: [
            "string"
        ]
    });
};
const getOptionsDefaults = (passedOptions, cwdPath)=>{
    passedOptions = passedOptions || {};
    const options = {};
    if (typeof passedOptions.prefix !== "string") options.prefix = "";
    else options.prefix = passedOptions.prefix;
    if (typeof passedOptions.basePath === "string") options.basePath = pathUtil.resolve(cwdPath, passedOptions.basePath);
    else options.basePath = os.tmpdir();
    return options;
};
const randomStringLength = 32;
// ---------------------------------------------------------
// Sync
// ---------------------------------------------------------
const tmpDirSync = (cwdPath, passedOptions)=>{
    const options = getOptionsDefaults(passedOptions, cwdPath);
    const randomString = crypto.randomBytes(randomStringLength / 2).toString("hex");
    const dirPath = pathUtil.join(options.basePath, options.prefix + randomString);
    // Let's assume everything will go well, do the directory fastest way possible
    try {
        fs.mkdirSync(dirPath);
    } catch (err) {
        // Something went wrong, try to recover by using more sophisticated approach
        if (err.code === "ENOENT") dir.sync(dirPath);
        else throw err;
    }
    return dirPath;
};
// ---------------------------------------------------------
// Async
// ---------------------------------------------------------
const tmpDirAsync = (cwdPath, passedOptions)=>{
    return new Promise((resolve, reject)=>{
        const options = getOptionsDefaults(passedOptions, cwdPath);
        crypto.randomBytes(randomStringLength / 2, (err, bytes)=>{
            if (err) reject(err);
            else {
                const randomString = bytes.toString("hex");
                const dirPath = pathUtil.join(options.basePath, options.prefix + randomString);
                // Let's assume everything will go well, do the directory fastest way possible
                fs.mkdir(dirPath, (err)=>{
                    if (err) {
                        // Something went wrong, try to recover by using more sophisticated approach
                        if (err.code === "ENOENT") dir.async(dirPath).then(()=>{
                            resolve(dirPath);
                        }, reject);
                        else reject(err);
                    } else resolve(dirPath);
                });
            }
        });
    });
};
// ---------------------------------------------------------
// API
// ---------------------------------------------------------
exports.validateInput = validateInput;
exports.sync = tmpDirSync;
exports.async = tmpDirAsync;

},{"ea91c8e4f119e3f2":"path","63125c0bde46ed7d":"os","7f07bc516de55183":"crypto","7d30f28e2edd3012":"dv3dd","f11522bb9ba1e10":"kdumJ","7619d3a3f9522780":"59cGU"}],"hBNqT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "pkg", ()=>pkg);
parcelHelpers.export(exports, "scanDir", ()=>scanDir);
var _childProcess = require("child_process");
var _chalk = require("chalk");
var _chalkDefault = parcelHelpers.interopDefault(_chalk);
var _fs = require("fs");
var _fsDefault = parcelHelpers.interopDefault(_fs);
var _path = require("path");
var _pathDefault = parcelHelpers.interopDefault(_path);
var _shouldInstall = require("./src/should-install");
var _dir = require("dir");
const g = globalThis;
if (!g.pkgRunner) g.pkgRunner = new Set();
const getModuleVersion = (name)=>{
    const res = (0, _childProcess.spawnSync)("pnpm", [
        "why",
        "-r",
        name
    ], {
        cwd: (0, _dir.dir).root(""),
        env: process.env
    });
    const out = res.output.filter((e)=>!!e);
    try {
        return out.toString().split(`${name} `)[1].split("\n")[0].split(" ")[0];
    } catch (e) {
        return "";
    }
};
const pkg = {
    preventRun: false,
    isRunning: (cwd)=>g.pkgRunner.has(cwd || ""),
    produce (pkg) {
        const dependencies = {};
        if (pkg.external) for (const f of pkg.external)dependencies[f] = getModuleVersion(f);
        return {
            name: pkg.name,
            version: pkg.version,
            dependencies
        };
    },
    async install (paths, arg) {
        const _arg = arg ? arg : {
            cwd: undefined,
            silent: false
        };
        if (pkg.preventRun) return;
        if (g.pkgRunner.has(_arg.cwd || "")) {
            console.log("Install deps still running ", (0, _chalkDefault.default).green((0, _path.dirname)((_arg.cwd || "").substring(process.cwd().length + 1))));
            return;
        }
        g.pkgRunner.add(_arg.cwd || "");
        if (!Array.isArray(paths)) await new Promise((resolve)=>{
            const child = (0, _childProcess.spawn)("pnpm", [
                "i"
            ], {
                stdio: "inherit",
                cwd: _arg.cwd || process.cwd()
            });
            child.on("exit", ()=>{
                g.pkgRunner.delete(_arg.cwd || "");
                resolve();
            });
        });
        else {
            const dirs = await scanDir(paths);
            let mustInstall = new Set();
            const all = await Promise.all(dirs.map((e)=>[
                    e,
                    (0, _shouldInstall.shouldInstall)(e, arg?.silent)
                ]));
            for (const [e, i] of all)if (await i) mustInstall.add(e);
            if (mustInstall.size > 0) {
                console.log(`\n${(0, _chalkDefault.default).magenta("Installing")} deps:\n ${(0, _chalkDefault.default).blue("➥")}`, [
                    ...mustInstall
                ].map((e)=>(0, _chalkDefault.default).green((0, _path.dirname)(e.substring(process.cwd().length + 1)))).join(" "));
                await new Promise((resolve)=>{
                    const child = (0, _childProcess.spawn)("pnpm", [
                        "i"
                    ], {
                        stdio: "inherit",
                        cwd: _arg.cwd || process.cwd()
                    });
                    child.on("exit", ()=>{
                        g.pkgRunner.delete(_arg.cwd || "");
                        resolve();
                    });
                });
            } else g.pkgRunner.delete(_arg.cwd || "");
        }
    }
};
const scanDir = async (paths)=>{
    const pkgs = [];
    for (const path of paths)for await (const p of walk(path)){
        if (p.endsWith("package.json")) pkgs.push(p);
        if (p.endsWith("node_modules")) break;
    }
    return pkgs;
};
async function* walk(dir) {
    for await (const d of (await (0, _fsDefault.default).promises.opendir(dir))){
        const entry = (0, _pathDefault.default).join(dir, d.name);
        if (d.isDirectory()) {
            if (!entry.endsWith("node_modules")) yield* await walk(entry);
        } else if (d.isFile()) yield entry;
    }
}

},{"child_process":"child_process","chalk":"1lbiC","fs":"fs","path":"path","./src/should-install":"lzAjG","dir":"er1Is","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"lzAjG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shouldInstall", ()=>shouldInstall);
var _chalk = require("chalk");
var _chalkDefault = parcelHelpers.interopDefault(_chalk);
var _fsJetpack = require("fs-jetpack");
var _path = require("path");
const shouldInstall = async (path, silent = false)=>{
    const dir = (0, _path.dirname)(path);
    const pkg = await (0, _fsJetpack.readAsync)(path, "json");
    let shouldInstall = false;
    await Promise.all([
        "dependencies",
        "devDependencies"
    ].map(async (e)=>{
        if (!pkg[e]) return;
        for (const [k, v] of Object.entries(pkg[e])){
            if (!await (0, _fsJetpack.existsAsync)((0, _path.join)(dir, "node_modules", k))) {
                if (silent === false) console.log(`module ${(0, _chalkDefault.default).cyan(k)} not found in ${(0, _path.join)(dir, "node_modules").substring(process.cwd().length + 1)}`);
                shouldInstall = true;
            }
            if (v === "*") try {
                const res = await fetch(`https://data.jsdelivr.com/v1/packages/npm/${k}/resolved`);
                const json = await res.json();
                pkg[e][k] = json.version;
                if (silent === false) console.log(`found ${k} = "*" in ${path.substring(process.cwd().length + 1)}`);
                shouldInstall = true;
            } catch (e) {}
        }
    }));
    if (shouldInstall) await (0, _fsJetpack.writeAsync)(path, pkg, {
        jsonIndent: 2
    });
    return shouldInstall;
};

},{"chalk":"1lbiC","fs-jetpack":"dr8qG","path":"path","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"h5KBY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "runner", ()=>runner);
var _fs = require("fs");
var _nodePty = require("node-pty");
const g = globalThis;
if (!g.runs) g.runs = {};
const runner = {
    get list () {
        return g.runs;
    },
    async restart (path) {
        g.runs[path].kill();
        g.runs[path].onExit(()=>{
            runner.run(g.runs[path].arg);
        });
    },
    async stop (path) {
        g.runs[path].kill();
        delete g.runs[path];
    },
    async run (arg) {
        try {
            const { path , onData , args , cwd , onStop  } = arg;
            if (!(0, _fs.existsSync)(path)) return false;
            g.runs[path] = (0, _nodePty.spawn)(process.execPath, [
                "--enable-source-maps",
                path,
                ...args || []
            ], {
                cwd: cwd
            });
            g.runs[path].arg = arg;
            if (onData) g.runs[path].onData(onData);
            else g.runs[path].onData((e)=>process.stdout.write(e));
            if (onStop) g.runs[path].onExit(onStop);
            return true;
        } catch (e) {
            return false;
        }
    }
};

},{"fs":"fs","node-pty":"node-pty","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"7ii00":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "buildService", ()=>buildService);
const buildService = async (serviceName)=>{
    console.log(serviceName, process.cwd());
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"aBIlz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "commitHook", ()=>commitHook);
var _childProcess = require("child_process");
var _dir = require("dir");
var _fsJetpack = require("fs-jetpack");
var _nodePty = require("node-pty");
const commitHook = async (args)=>{
    const isMainRepo = async ()=>{
        const conf = await (0, _fsJetpack.readAsync)((0, _dir.dir).root(".git/config"), "utf8");
        if (conf?.includes("url = https://github.com/avolut/royal")) return true;
        return false;
    };
    if (args.includes("pre-commit")) {
        if (await isMainRepo()) {
            if (!await (0, _fsJetpack.existsAsync)((0, _dir.dir).root(".husky/_/husky.sh"))) (0, _childProcess.spawnSync)("pnpm husky install", {
                cwd: (0, _dir.dir).root("")
            });
            await (0, _fsJetpack.writeAsync)((0, _dir.dir).root(".output/.commit"), "");
        }
        if (process.send) process.send("exit");
        else process.exit();
        return true;
    }
    if (args.includes("post-commit")) {
        if (await isMainRepo()) {
            if (await (0, _fsJetpack.existsAsync)((0, _dir.dir).root(".output/.commit"))) {
                await (0, _fsJetpack.removeAsync)((0, _dir.dir).root(".output/.commit"));
                await (0, _fsJetpack.writeAsync)((0, _dir.dir).root("pkgs/version.json"), {
                    ts: Date.now()
                });
                await new Promise((resolve)=>{
                    (0, _nodePty.spawn)("git", [
                        "add",
                        "./pkgs/version.json"
                    ], {
                        cwd: (0, _dir.dir).root("")
                    }).onExit(resolve);
                });
                await new Promise((resolve)=>{
                    (0, _nodePty.spawn)("git", [
                        "commit",
                        "--amend",
                        "-C",
                        "HEAD",
                        "--no-verify"
                    ], {
                        cwd: (0, _dir.dir).root("")
                    }).onExit(resolve);
                });
            }
        }
        if (process.send) process.send("exit");
        else process.exit();
        return true;
    }
};

},{"child_process":"child_process","dir":"er1Is","fs-jetpack":"dr8qG","node-pty":"node-pty","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"enXmf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "upgradeHook", ()=>upgradeHook);
var _childProcess = require("child_process");
var _dir = require("dir");
var _fflate = require("fflate");
var _fs = require("fs");
var _fsJetpack = require("fs-jetpack");
var _path = require("path");
const upgradeHook = async (args)=>{
    if (args.includes("upgrade")) {
        const backupDir = (0, _dir.dir).root(".output/upgrade/backup");
        await (0, _fsJetpack.removeAsync)((0, _dir.dir).root(".output/upgrade"));
        await (0, _fsJetpack.dirAsync)(backupDir);
        console.log(`Upgrading Base Framework`);
        console.log(` > Downloading upgrade zip`);
        const downloadURI = `https://github.com/avolut/royal/archive/refs/heads/main.zip`;
        const res = await fetch(downloadURI);
        const ab = await res.arrayBuffer();
        console.log(` > Extracting: .output/upgrade/royal`);
        const uzi = (0, _fflate.unzipSync)(new Uint8Array(ab));
        await (0, _fsJetpack.dirAsync)((0, _dir.dir).root(".output/upgrade/royal-main"));
        await Promise.all(Object.entries(uzi).map(async ([filename, buf])=>{
            if (buf.length === 0) await (0, _fsJetpack.dirAsync)((0, _dir.dir).root(`.output/upgrade/${filename}`));
            else await (0, _fsJetpack.writeAsync)((0, _dir.dir).root(`.output/upgrade/${filename}`), Buffer.from(buf));
        }));
        console.log(` > Backing up existing pkgs to: .output/upgrade/backup`);
        const root = (0, _dir.dir).root("");
        for (const f of (0, _fs.readdirSync)((0, _dir.dir).root(""))){
            if (f !== "app" && f !== ".output" && f !== ".husky" && f !== ".git") {
                if (await (0, _fsJetpack.existsAsync)((0, _path.join)(root, `.output/upgrade/backup/${f}`))) await (0, _fsJetpack.moveAsync)((0, _path.join)(root, f), (0, _path.join)(root, `.output/upgrade/backup/${f}`));
            }
        }
        console.log(` > Applying upgrade`);
        for (const f of (0, _fs.readdirSync)((0, _path.join)(root, ".output/upgrade/royal-main")))if (f !== "app" && f !== ".output" && f !== "." && f !== ".." && f !== ".husky" && f !== ".git") await (0, _fsJetpack.copyAsync)((0, _path.join)(root, `.output/upgrade/royal-main/${f}`), (0, _path.join)(root, f), {
            overwrite: true
        });
        (0, _childProcess.spawnSync)("pnpm", [
            "i"
        ], {
            cwd: (0, _dir.dir).root(""),
            stdio: "inherit"
        });
        if (process.send) process.send("exit");
        else process.exit();
        return true;
    }
};

},{"child_process":"child_process","dir":"er1Is","fflate":"5OTOM","fs":"fs","fs-jetpack":"dr8qG","path":"path","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"5OTOM":[function(require,module,exports) {
// DEFLATE is a complex format; to read this code, you should probably check the RFC first:
// https://tools.ietf.org/html/rfc1951
// You may also wish to take a look at the guide I made about this program:
// https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
// Some of the following code is similar to that of UZIP.js:
// https://github.com/photopea/UZIP.js
// However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
// Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
// is better for memory in most engines (I *think*).
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "FlateErrorCode", ()=>FlateErrorCode);
parcelHelpers.export(exports, "Deflate", ()=>Deflate);
parcelHelpers.export(exports, "AsyncDeflate", ()=>AsyncDeflate);
parcelHelpers.export(exports, "deflate", ()=>deflate);
/**
 * Compresses data with DEFLATE without any wrapper
 * @param data The data to compress
 * @param opts The compression options
 * @returns The deflated version of the data
 */ parcelHelpers.export(exports, "deflateSync", ()=>deflateSync);
parcelHelpers.export(exports, "Inflate", ()=>Inflate);
parcelHelpers.export(exports, "AsyncInflate", ()=>AsyncInflate);
parcelHelpers.export(exports, "inflate", ()=>inflate);
/**
 * Expands DEFLATE data with no wrapper
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */ parcelHelpers.export(exports, "inflateSync", ()=>inflateSync);
parcelHelpers.export(exports, "Gzip", ()=>Gzip);
parcelHelpers.export(exports, "AsyncGzip", ()=>AsyncGzip);
parcelHelpers.export(exports, "gzip", ()=>gzip);
/**
 * Compresses data with GZIP
 * @param data The data to compress
 * @param opts The compression options
 * @returns The gzipped version of the data
 */ parcelHelpers.export(exports, "gzipSync", ()=>gzipSync);
parcelHelpers.export(exports, "Gunzip", ()=>Gunzip);
parcelHelpers.export(exports, "AsyncGunzip", ()=>AsyncGunzip);
parcelHelpers.export(exports, "gunzip", ()=>gunzip);
/**
 * Expands GZIP data
 * @param data The data to decompress
 * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
 * @returns The decompressed version of the data
 */ parcelHelpers.export(exports, "gunzipSync", ()=>gunzipSync);
parcelHelpers.export(exports, "Zlib", ()=>Zlib);
parcelHelpers.export(exports, "AsyncZlib", ()=>AsyncZlib);
parcelHelpers.export(exports, "zlib", ()=>zlib);
/**
 * Compress data with Zlib
 * @param data The data to compress
 * @param opts The compression options
 * @returns The zlib-compressed version of the data
 */ parcelHelpers.export(exports, "zlibSync", ()=>zlibSync);
parcelHelpers.export(exports, "Unzlib", ()=>Unzlib);
parcelHelpers.export(exports, "AsyncUnzlib", ()=>AsyncUnzlib);
parcelHelpers.export(exports, "unzlib", ()=>unzlib);
/**
 * Expands Zlib data
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */ parcelHelpers.export(exports, "unzlibSync", ()=>unzlibSync);
// Default algorithm for compression (used because having a known output size allows faster decompression)
parcelHelpers.export(exports, "compress", ()=>gzip);
parcelHelpers.export(exports, "AsyncCompress", ()=>AsyncGzip);
// Default algorithm for compression (used because having a known output size allows faster decompression)
parcelHelpers.export(exports, "compressSync", ()=>gzipSync);
parcelHelpers.export(exports, "Compress", ()=>Gzip);
parcelHelpers.export(exports, "Decompress", ()=>Decompress);
parcelHelpers.export(exports, "AsyncDecompress", ()=>AsyncDecompress);
parcelHelpers.export(exports, "decompress", ()=>decompress);
/**
 * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
 * @param data The data to decompress
 * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
 * @returns The decompressed version of the data
 */ parcelHelpers.export(exports, "decompressSync", ()=>decompressSync);
parcelHelpers.export(exports, "DecodeUTF8", ()=>DecodeUTF8);
parcelHelpers.export(exports, "EncodeUTF8", ()=>EncodeUTF8);
/**
 * Converts a string into a Uint8Array for use with compression/decompression methods
 * @param str The string to encode
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless decoding a binary string.
 * @returns The string encoded in UTF-8/Latin-1 binary
 */ parcelHelpers.export(exports, "strToU8", ()=>strToU8);
/**
 * Converts a Uint8Array to a string
 * @param dat The data to decode to string
 * @param latin1 Whether or not to interpret the data as Latin-1. This should
 *               not need to be true unless encoding to binary string.
 * @returns The original UTF-8/Latin-1 string
 */ parcelHelpers.export(exports, "strFromU8", ()=>strFromU8);
parcelHelpers.export(exports, "ZipPassThrough", ()=>ZipPassThrough);
parcelHelpers.export(exports, "ZipDeflate", ()=>ZipDeflate);
parcelHelpers.export(exports, "AsyncZipDeflate", ()=>AsyncZipDeflate);
parcelHelpers.export(exports, "Zip", ()=>Zip);
parcelHelpers.export(exports, "zip", ()=>zip);
/**
 * Synchronously creates a ZIP file. Prefer using `zip` for better performance
 * with more than one file.
 * @param data The directory structure for the ZIP archive
 * @param opts The main options, merged with per-file options
 * @returns The generated ZIP archive
 */ parcelHelpers.export(exports, "zipSync", ()=>zipSync);
parcelHelpers.export(exports, "UnzipPassThrough", ()=>UnzipPassThrough);
parcelHelpers.export(exports, "UnzipInflate", ()=>UnzipInflate);
parcelHelpers.export(exports, "AsyncUnzipInflate", ()=>AsyncUnzipInflate);
parcelHelpers.export(exports, "Unzip", ()=>Unzip);
parcelHelpers.export(exports, "unzip", ()=>unzip);
/**
 * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
 * performance with more than one file.
 * @param data The raw compressed ZIP file
 * @param opts The ZIP extraction options
 * @returns The decompressed files
 */ parcelHelpers.export(exports, "unzipSync", ()=>unzipSync);
var ch2 = {};
var wk = function(c, id, msg, transfer, cb) {
    var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
        c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
    ], {
        type: "text/javascript"
    }))));
    w.onmessage = function(e) {
        var d = e.data, ed = d.$e$;
        if (ed) {
            var err = new Error(ed[0]);
            err["code"] = ed[1];
            err.stack = ed[2];
            cb(err, null);
        } else cb(null, d);
    };
    w.postMessage(msg, transfer);
    return w;
};
// aliases for shorter compressed code (most minifers don't do this)
var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
// fixed length extra bits
var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */ 0,
    0,
    /* impossible */ 0
]);
// fixed distance extra bits
// see fleb note
var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */ 0,
    0
]);
// code length index map
var clim = new u8([
    16,
    17,
    18,
    0,
    8,
    7,
    9,
    6,
    10,
    5,
    11,
    4,
    12,
    3,
    13,
    2,
    14,
    1,
    15
]);
// get base, reverse index map from extra bits
var freb = function(eb, start) {
    var b = new u16(31);
    for(var i = 0; i < 31; ++i)b[i] = start += 1 << eb[i - 1];
    // numbers here are at max 18 bits
    var r = new u32(b[30]);
    for(var i = 1; i < 30; ++i)for(var j = b[i]; j < b[i + 1]; ++j)r[j] = j - b[i] << 5 | i;
    return [
        b,
        r
    ];
};
var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
// we can ignore the fact that the other numbers are wrong; they never happen anyway
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1];
// map of value to reverse (assuming 16 bits)
var rev = new u16(32768);
for(var i = 0; i < 32768; ++i){
    // reverse table algorithm from SO
    var x = (i & 0xAAAA) >>> 1 | (i & 0x5555) << 1;
    x = (x & 0xCCCC) >>> 2 | (x & 0x3333) << 2;
    x = (x & 0xF0F0) >>> 4 | (x & 0x0F0F) << 4;
    rev[i] = ((x & 0xFF00) >>> 8 | (x & 0x00FF) << 8) >>> 1;
}
// create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?
var hMap = function(cd, mb, r) {
    var s = cd.length;
    // index
    var i = 0;
    // u16 "map": index -> # of codes with bit length = index
    var l = new u16(mb);
    // length of cd must be 288 (total # of codes)
    for(; i < s; ++i)if (cd[i]) ++l[cd[i] - 1];
    // u16 "map": index -> minimum code for bit length = index
    var le = new u16(mb);
    for(i = 0; i < mb; ++i)le[i] = le[i - 1] + l[i - 1] << 1;
    var co;
    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb);
        // bits to remove for reverser
        var rvb = 15 - mb;
        for(i = 0; i < s; ++i)// ignore 0 lengths
        if (cd[i]) {
            // num encoding both symbol and bits read
            var sv = i << 4 | cd[i];
            // free bits
            var r_1 = mb - cd[i];
            // start value
            var v = le[cd[i] - 1]++ << r_1;
            // m is end value
            for(var m = v | (1 << r_1) - 1; v <= m; ++v)// every 16 bit value starting with the code yields the same result
            co[rev[v] >>> rvb] = sv;
        }
    } else {
        co = new u16(s);
        for(i = 0; i < s; ++i)if (cd[i]) co[i] = rev[le[cd[i] - 1]++] >>> 15 - cd[i];
    }
    return co;
};
// fixed length tree
var flt = new u8(288);
for(var i = 0; i < 144; ++i)flt[i] = 8;
for(var i = 144; i < 256; ++i)flt[i] = 9;
for(var i = 256; i < 280; ++i)flt[i] = 7;
for(var i = 280; i < 288; ++i)flt[i] = 8;
// fixed distance tree
var fdt = new u8(32);
for(var i = 0; i < 32; ++i)fdt[i] = 5;
// fixed length map
var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
// fixed distance map
var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
// find max of array
var max = function(a) {
    var m = a[0];
    for(var i = 1; i < a.length; ++i)if (a[i] > m) m = a[i];
    return m;
};
// read d, starting at bit p and mask with m
var bits = function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
// read d, starting at bit p continuing for at least 16 bits
var bits16 = function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
// get end of byte
var shft = function(p) {
    return (p + 7) / 8 | 0;
};
// typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice
var slc = function(v, s, e) {
    if (s == null || s < 0) s = 0;
    if (e == null || e > v.length) e = v.length;
    // can't use .constructor in case user-supplied
    var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
    n.set(v.subarray(s, e));
    return n;
};
var FlateErrorCode = {
    UnexpectedEOF: 0,
    InvalidBlockType: 1,
    InvalidLengthLiteral: 2,
    InvalidDistance: 3,
    StreamFinished: 4,
    NoStreamHandler: 5,
    InvalidHeader: 6,
    NoCallback: 7,
    InvalidUTF8: 8,
    ExtraFieldTooLong: 9,
    InvalidDate: 10,
    FilenameTooLong: 11,
    StreamFinishing: 12,
    InvalidZipData: 13,
    UnknownCompressionMethod: 14
};
// error codes
var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
];
var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace) Error.captureStackTrace(e, err);
    if (!nt) throw e;
    return e;
};
// expands raw DEFLATE data
var inflt = function(dat, buf, st) {
    // source length
    var sl = dat.length;
    if (!sl || st && st.f && !st.l) return buf || new u8(0);
    // have to estimate size
    var noBuf = !buf || st;
    // no state
    var noSt = !st || st.i;
    if (!st) st = {};
    // Assumes roughly 33% compression ratio average
    if (!buf) buf = new u8(sl * 3);
    // ensure buffer can fit at least l elements
    var cbuf = function(l) {
        var bl = buf.length;
        // need to increase size to fit
        if (l > bl) {
            // Double or set to necessary, whichever is greater
            var nbuf = new u8(Math.max(bl * 2, l));
            nbuf.set(buf);
            buf = nbuf;
        }
    };
    //  last chunk         bitpos           bytes
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    // total bits
    var tbts = sl * 8;
    do {
        if (!lm) {
            // BFINAL - this is only 1 when last chunk is next
            final = bits(dat, pos, 1);
            // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
            var type = bits(dat, pos + 1, 3);
            pos += 3;
            if (!type) {
                // go to end of byte boundary
                var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
                if (t > sl) {
                    if (noSt) err(0);
                    break;
                }
                // ensure size
                if (noBuf) cbuf(bt + l);
                // Copy over uncompressed data
                buf.set(dat.subarray(s, t), bt);
                // Get new bitpos, update byte count
                st.b = bt += l, st.p = pos = t * 8, st.f = final;
                continue;
            } else if (type == 1) lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
            else if (type == 2) {
                //  literal                            lengths
                var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                var tl = hLit + bits(dat, pos + 5, 31) + 1;
                pos += 14;
                // length+distance tree
                var ldt = new u8(tl);
                // code length tree
                var clt = new u8(19);
                for(var i = 0; i < hcLen; ++i)// use index map to get real code
                clt[clim[i]] = bits(dat, pos + i * 3, 7);
                pos += hcLen * 3;
                // code lengths bits
                var clb = max(clt), clbmsk = (1 << clb) - 1;
                // code lengths map
                var clm = hMap(clt, clb, 1);
                for(var i = 0; i < tl;){
                    var r = clm[bits(dat, pos, clbmsk)];
                    // bits read
                    pos += r & 15;
                    // symbol
                    var s = r >>> 4;
                    // code length to copy
                    if (s < 16) ldt[i++] = s;
                    else {
                        //  copy   count
                        var c = 0, n = 0;
                        if (s == 16) n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                        else if (s == 17) n = 3 + bits(dat, pos, 7), pos += 3;
                        else if (s == 18) n = 11 + bits(dat, pos, 127), pos += 7;
                        while(n--)ldt[i++] = c;
                    }
                }
                //    length tree                 distance tree
                var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                // max length bits
                lbt = max(lt);
                // max dist bits
                dbt = max(dt);
                lm = hMap(lt, lbt, 1);
                dm = hMap(dt, dbt, 1);
            } else err(1);
            if (pos > tbts) {
                if (noSt) err(0);
                break;
            }
        }
        // Make sure the buffer can hold this + the largest possible addition
        // Maximum chunk size (practically, theoretically infinite) is 2^17;
        if (noBuf) cbuf(bt + 131072);
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for(;; lpos = pos){
            // bits read, code
            var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
            pos += c & 15;
            if (pos > tbts) {
                if (noSt) err(0);
                break;
            }
            if (!c) err(2);
            if (sym < 256) buf[bt++] = sym;
            else if (sym == 256) {
                lpos = pos, lm = null;
                break;
            } else {
                var add = sym - 254;
                // no extra bits needed if less
                if (sym > 264) {
                    // index
                    var i = sym - 257, b = fleb[i];
                    add = bits(dat, pos, (1 << b) - 1) + fl[i];
                    pos += b;
                }
                // dist
                var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                if (!d) err(3);
                pos += d & 15;
                var dt = fd[dsym];
                if (dsym > 3) {
                    var b = fdeb[dsym];
                    dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
                }
                if (pos > tbts) {
                    if (noSt) err(0);
                    break;
                }
                if (noBuf) cbuf(bt + 131072);
                var end = bt + add;
                for(; bt < end; bt += 4){
                    buf[bt] = buf[bt - dt];
                    buf[bt + 1] = buf[bt + 1 - dt];
                    buf[bt + 2] = buf[bt + 2 - dt];
                    buf[bt + 3] = buf[bt + 3 - dt];
                }
                bt = end;
            }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final;
        if (lm) final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    }while (!final);
    return bt == buf.length ? buf : slc(buf, 0, bt);
};
// starting at p, write the minimum number of bits that can hold v to d
var wbits = function(d, p, v) {
    v <<= p & 7;
    var o = p / 8 | 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
};
// starting at p, write the minimum number of bits (>8) that can hold v to d
var wbits16 = function(d, p, v) {
    v <<= p & 7;
    var o = p / 8 | 0;
    d[o] |= v;
    d[o + 1] |= v >>> 8;
    d[o + 2] |= v >>> 16;
};
// creates code lengths from a frequency table
var hTree = function(d, mb) {
    // Need extra info to make a tree
    var t = [];
    for(var i = 0; i < d.length; ++i)if (d[i]) t.push({
        s: i,
        f: d[i]
    });
    var s = t.length;
    var t2 = t.slice();
    if (!s) return [
        et,
        0
    ];
    if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return [
            v,
            1
        ];
    }
    t.sort(function(a, b) {
        return a.f - b.f;
    });
    // after i2 reaches last ind, will be stopped
    // freq must be greater than largest possible number of symbols
    t.push({
        s: -1,
        f: 25001
    });
    var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
    t[0] = {
        s: -1,
        f: l.f + r.f,
        l: l,
        r: r
    };
    // efficient algorithm from UZIP.js
    // i0 is lookbehind, i2 is lookahead - after processing two low-freq
    // symbols that combined have high freq, will start processing i2 (high-freq,
    // non-composite) symbols instead
    // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
    while(i1 != s - 1){
        l = t[t[i0].f < t[i2].f ? i0++ : i2++];
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
        t[i1++] = {
            s: -1,
            f: l.f + r.f,
            l: l,
            r: r
        };
    }
    var maxSym = t2[0].s;
    for(var i = 1; i < s; ++i)if (t2[i].s > maxSym) maxSym = t2[i].s;
    // code lengths
    var tr = new u16(maxSym + 1);
    // max bits in tree
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
        // more algorithms from UZIP.js
        // TODO: find out how this code works (debt)
        //  ind    debt
        var i = 0, dt = 0;
        //    left            cost
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function(a, b) {
            return tr[b.s] - tr[a.s] || a.f - b.f;
        });
        for(; i < s; ++i){
            var i2_1 = t2[i].s;
            if (tr[i2_1] > mb) {
                dt += cst - (1 << mbt - tr[i2_1]);
                tr[i2_1] = mb;
            } else break;
        }
        dt >>>= lft;
        while(dt > 0){
            var i2_2 = t2[i].s;
            if (tr[i2_2] < mb) dt -= 1 << mb - tr[i2_2]++ - 1;
            else ++i;
        }
        for(; i >= 0 && dt; --i){
            var i2_3 = t2[i].s;
            if (tr[i2_3] == mb) {
                --tr[i2_3];
                ++dt;
            }
        }
        mbt = mb;
    }
    return [
        new u8(tr),
        mbt
    ];
};
// get the max length and assign length codes
var ln = function(n, l, d) {
    return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
// length codes generation
var lc = function(c) {
    var s = c.length;
    // Note that the semicolon was intentional
    while(s && !c[--s]);
    var cl = new u16(++s);
    //  ind      num         streak
    var cli = 0, cln = c[0], cls = 1;
    var w = function(v) {
        cl[cli++] = v;
    };
    for(var i = 1; i <= s; ++i)if (c[i] == cln && i != s) ++cls;
    else {
        if (!cln && cls > 2) {
            for(; cls > 138; cls -= 138)w(32754);
            if (cls > 2) {
                w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
                cls = 0;
            }
        } else if (cls > 3) {
            w(cln), --cls;
            for(; cls > 6; cls -= 6)w(8304);
            if (cls > 2) w(cls - 3 << 5 | 8208), cls = 0;
        }
        while(cls--)w(cln);
        cls = 1;
        cln = c[i];
    }
    return [
        cl.subarray(0, cli),
        s
    ];
};
// calculate the length of output from tree, code lengths
var clen = function(cf, cl) {
    var l = 0;
    for(var i = 0; i < cl.length; ++i)l += cf[i] * cl[i];
    return l;
};
// writes a fixed block
// returns the new bit pos
var wfblk = function(out, pos, dat) {
    // no need to write 00 as type: TypedArray defaults to 0
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >>> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for(var i = 0; i < s; ++i)out[o + i + 4] = dat[i];
    return (o + 4 + s) * 8;
};
// writes a block
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1];
    var _b = hTree(df, 15), ddt = _b[0], mdb = _b[1];
    var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
    var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
    var lcfreq = new u16(19);
    for(var i = 0; i < lclt.length; ++i)lcfreq[lclt[i] & 31]++;
    for(var i = 0; i < lcdt.length; ++i)lcfreq[lcdt[i] & 31]++;
    var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
    var nlcc = 19;
    for(; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc);
    var flen = bl + 5 << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
    if (flen <= ftlen && flen <= dtlen) return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for(var i = 0; i < nlcc; ++i)wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [
            lclt,
            lcdt
        ];
        for(var it = 0; it < 2; ++it){
            var clct = lcts[it];
            for(var i = 0; i < clct.length; ++i){
                var len = clct[i] & 31;
                wbits(out, p, llm[len]), p += lct[len];
                if (len > 15) wbits(out, p, clct[i] >>> 5 & 127), p += clct[i] >>> 12;
            }
        }
    } else lm = flm, ll = flt, dm = fdm, dl = fdt;
    for(var i = 0; i < li; ++i)if (syms[i] > 255) {
        var len = syms[i] >>> 18 & 31;
        wbits16(out, p, lm[len + 257]), p += ll[len + 257];
        if (len > 7) wbits(out, p, syms[i] >>> 23 & 31), p += fleb[len];
        var dst = syms[i] & 31;
        wbits16(out, p, dm[dst]), p += dl[dst];
        if (dst > 3) wbits16(out, p, syms[i] >>> 5 & 8191), p += fdeb[dst];
    } else wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
    wbits16(out, p, lm[256]);
    return p + ll[256];
};
// deflate options (nice << 13) | chain
var deo = /*#__PURE__*/ new u32([
    65540,
    131080,
    131088,
    131104,
    262176,
    1048704,
    1048832,
    2114560,
    2117632
]);
// empty
var et = /*#__PURE__*/ new u8(0);
// compresses data into a raw DEFLATE buffer
var dflt = function(dat, lvl, plvl, pre, post, lst) {
    var s = dat.length;
    var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
    // writing to this writes to the output buffer
    var w = o.subarray(pre, o.length - post);
    var pos = 0;
    if (!lvl || s < 8) for(var i = 0; i <= s; i += 65535){
        // end
        var e = i + 65535;
        if (e >= s) // write final block
        w[pos >> 3] = lst;
        pos = wfblk(w, pos + 1, dat.subarray(i, e));
    }
    else {
        var opt = deo[lvl - 1];
        var n = opt >>> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        //    prev 2-byte val map    curr 2-byte val map
        var prev = new u16(32768), head = new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function(i) {
            return (dat[i] ^ dat[i + 1] << bs1_1 ^ dat[i + 2] << bs2_1) & msk_1;
        };
        // 24576 is an arbitrary number of maximum symbols per block
        // 424 buffer for last block
        var syms = new u32(25000);
        // length/literal freq   distance freq
        var lf = new u16(288), df = new u16(32);
        //  l/lcnt  exbits  index  l/lind  waitdx  bitpos
        var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
        for(; i < s; ++i){
            // hash value
            // deopt when i > s - 3 - at end, deopt acceptable
            var hv = hsh(i);
            // index mod 32768    previous index mod
            var imod = i & 32767, pimod = head[hv];
            prev[imod] = pimod;
            head[hv] = imod;
            // We always should modify head and prev, but only add symbols if
            // this data is not yet processed ("wait" for wait index)
            if (wi <= i) {
                // bytes remaining
                var rem = s - i;
                if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                    pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                    li = lc_1 = eb = 0, bs = i;
                    for(var j = 0; j < 286; ++j)lf[j] = 0;
                    for(var j = 0; j < 30; ++j)df[j] = 0;
                }
                //  len    dist   chain
                var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
                if (rem > 2 && hv == hsh(i - dif)) {
                    var maxn = Math.min(n, rem) - 1;
                    var maxd = Math.min(32767, i);
                    // max possible length
                    // not capped at dif because decompressors implement "rolling" index population
                    var ml = Math.min(258, rem);
                    while(dif <= maxd && --ch_1 && imod != pimod){
                        if (dat[i + l] == dat[i + l - dif]) {
                            var nl = 0;
                            for(; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl);
                            if (nl > l) {
                                l = nl, d = dif;
                                // break out early when we reach "nice" (we are satisfied enough)
                                if (nl > maxn) break;
                                // now, find the rarest 2-byte sequence within this
                                // length of literals and search for that instead.
                                // Much faster than just using the start
                                var mmd = Math.min(dif, nl - 2);
                                var md = 0;
                                for(var j = 0; j < mmd; ++j){
                                    var ti = i - dif + j + 32768 & 32767;
                                    var pti = prev[ti];
                                    var cd = ti - pti + 32768 & 32767;
                                    if (cd > md) md = cd, pimod = ti;
                                }
                            }
                        }
                        // check the previous match
                        imod = pimod, pimod = prev[imod];
                        dif += imod - pimod + 32768 & 32767;
                    }
                }
                // d will be nonzero only when a match was found
                if (d) {
                    // store both dist and len data in one Uint32
                    // Make sure this is recognized as a len/dist with 28th bit (2^28)
                    syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
                    var lin = revfl[l] & 31, din = revfd[d] & 31;
                    eb += fleb[lin] + fdeb[din];
                    ++lf[257 + lin];
                    ++df[din];
                    wi = i + l;
                    ++lc_1;
                } else {
                    syms[li++] = dat[i];
                    ++lf[dat[i]];
                }
            }
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        // this is the easiest way to avoid needing to maintain state
        if (!lst && pos & 7) pos = wfblk(w, pos + 1, et);
    }
    return slc(o, 0, pre + shft(pos) + post);
};
// CRC32 table
var crct = /*#__PURE__*/ function() {
    var t = new Int32Array(256);
    for(var i = 0; i < 256; ++i){
        var c = i, k = 9;
        while(--k)c = (c & 1 && -306674912) ^ c >>> 1;
        t[i] = c;
    }
    return t;
}();
// CRC32
var crc = function() {
    var c = -1;
    return {
        p: function(d) {
            // closures have awful performance
            var cr = c;
            for(var i = 0; i < d.length; ++i)cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
            c = cr;
        },
        d: function() {
            return ~c;
        }
    };
};
// Alder32
var adler = function() {
    var a = 1, b = 0;
    return {
        p: function(d) {
            // closures have awful performance
            var n = a, m = b;
            var l = d.length | 0;
            for(var i = 0; i != l;){
                var e = Math.min(i + 2655, l);
                for(; i < e; ++i)m += n += d[i];
                n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
            }
            a = n, b = m;
        },
        d: function() {
            a %= 65521, b %= 65521;
            return (a & 255) << 24 | a >>> 8 << 16 | (b & 255) << 8 | b >>> 8;
        }
    };
};
// deflate with opts
var dopt = function(dat, opt, pre, post, st) {
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 12 + opt.mem, pre, post, !st);
};
// Walmart object spread
var mrg = function(a, b) {
    var o = {};
    for(var k in a)o[k] = a[k];
    for(var k in b)o[k] = b[k];
    return o;
};
// worker clone
// This is possibly the craziest part of the entire codebase, despite how simple it may seem.
// The only parameter to this function is a closure that returns an array of variables outside of the function scope.
// We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
// We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
// The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
// This took me three weeks to figure out how to do.
var wcln = function(fn, fnStr, td) {
    var dt = fn();
    var st = fn.toString();
    var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
    for(var i = 0; i < dt.length; ++i){
        var v = dt[i], k = ks[i];
        if (typeof v == "function") {
            fnStr += ";" + k + "=";
            var st_1 = v.toString();
            if (v.prototype) {
                // for global objects
                if (st_1.indexOf("[native code]") != -1) {
                    var spInd = st_1.indexOf(" ", 8) + 1;
                    fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
                } else {
                    fnStr += st_1;
                    for(var t in v.prototype)fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
                }
            } else fnStr += st_1;
        } else td[k] = v;
    }
    return [
        fnStr,
        td
    ];
};
var ch = [];
// clone bufs
var cbfs = function(v) {
    var tl = [];
    for(var k in v)if (v[k].buffer) tl.push((v[k] = new v[k].constructor(v[k])).buffer);
    return tl;
};
// use a worker to execute code
var wrkr = function(fns, init, id, cb) {
    var _a;
    if (!ch[id]) {
        var fnStr = "", td_1 = {}, m = fns.length - 1;
        for(var i = 0; i < m; ++i)_a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
        ch[id] = wcln(fns[m], fnStr, td_1);
    }
    var td = mrg({}, ch[id][1]);
    return wk(ch[id][0] + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td, cbfs(td), cb);
};
// base async inflate fn
var bInflt = function() {
    return [
        u8,
        u16,
        u32,
        fleb,
        fdeb,
        clim,
        fl,
        fd,
        flrm,
        fdrm,
        rev,
        ec,
        hMap,
        max,
        bits,
        bits16,
        shft,
        slc,
        err,
        inflt,
        inflateSync,
        pbf,
        gu8
    ];
};
var bDflt = function() {
    return [
        u8,
        u16,
        u32,
        fleb,
        fdeb,
        clim,
        revfl,
        revfd,
        flm,
        flt,
        fdm,
        fdt,
        rev,
        deo,
        et,
        hMap,
        wbits,
        wbits16,
        hTree,
        ln,
        lc,
        clen,
        wfblk,
        wblk,
        shft,
        slc,
        dflt,
        dopt,
        deflateSync,
        pbf
    ];
};
// gzip extra
var gze = function() {
    return [
        gzh,
        gzhl,
        wbytes,
        crc,
        crct
    ];
};
// gunzip extra
var guze = function() {
    return [
        gzs,
        gzl
    ];
};
// zlib extra
var zle = function() {
    return [
        zlh,
        wbytes,
        adler
    ];
};
// unzlib extra
var zule = function() {
    return [
        zlv
    ];
};
// post buf
var pbf = function(msg) {
    return postMessage(msg, [
        msg.buffer
    ]);
};
// get u8
var gu8 = function(o) {
    return o && o.size && new u8(o.size);
};
// async helper
var cbify = function(dat, opts, fns, init, id, cb) {
    var w = wrkr(fns, init, id, function(err, dat) {
        w.terminate();
        cb(err, dat);
    });
    w.postMessage([
        dat,
        opts
    ], opts.consume ? [
        dat.buffer
    ] : []);
    return function() {
        w.terminate();
    };
};
// auto stream
var astrm = function(strm) {
    strm.ondata = function(dat, final) {
        return postMessage([
            dat,
            final
        ], [
            dat.buffer
        ]);
    };
    return function(ev) {
        return strm.push(ev.data[0], ev.data[1]);
    };
};
// async stream attach
var astrmify = function(fns, strm, opts, init, id) {
    var t;
    var w = wrkr(fns, init, id, function(err, dat) {
        if (err) w.terminate(), strm.ondata.call(strm, err);
        else {
            if (dat[1]) w.terminate();
            strm.ondata.call(strm, err, dat[0], dat[1]);
        }
    });
    w.postMessage(opts);
    strm.push = function(d, f) {
        if (!strm.ondata) err(5);
        if (t) strm.ondata(err(4, 0, 1), null, !!f);
        w.postMessage([
            d,
            t = f
        ], [
            d.buffer
        ]);
    };
    strm.terminate = function() {
        w.terminate();
    };
};
// read 2 bytes
var b2 = function(d, b) {
    return d[b] | d[b + 1] << 8;
};
// read 4 bytes
var b4 = function(d, b) {
    return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var b8 = function(d, b) {
    return b4(d, b) + b4(d, b + 4) * 4294967296;
};
// write bytes
var wbytes = function(d, b, v) {
    for(; v; ++b)d[b] = v, v >>>= 8;
};
// gzip header
var gzh = function(c, o) {
    var fn = o.filename;
    c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
    if (o.mtime != 0) wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
    if (fn) {
        c[3] = 8;
        for(var i = 0; i <= fn.length; ++i)c[i + 10] = fn.charCodeAt(i);
    }
};
// gzip footer: -8 to -4 = CRC, -4 to -0 is length
// gzip start
var gzs = function(d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8) err(6, "invalid gzip data");
    var flg = d[3];
    var st = 10;
    if (flg & 4) st += d[10] | (d[11] << 8) + 2;
    for(var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++]);
    return st + (flg & 2);
};
// gzip length
var gzl = function(d) {
    var l = d.length;
    return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
};
// gzip header length
var gzhl = function(o) {
    return 10 + (o.filename && o.filename.length + 1 || 0);
};
// zlib header
var zlh = function(c, o) {
    var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
    c[0] = 120, c[1] = fl << 6 | (fl ? 32 - 2 * fl : 1);
};
// zlib valid
var zlv = function(d) {
    if ((d[0] & 15) != 8 || d[0] >>> 4 > 7 || (d[0] << 8 | d[1]) % 31) err(6, "invalid zlib data");
    if (d[1] & 32) err(6, "invalid zlib data: preset dictionaries not supported");
};
function AsyncCmpStrm(opts, cb) {
    if (!cb && typeof opts == "function") cb = opts, opts = {};
    this.ondata = cb;
    return opts;
}
// zlib footer: -4 to -0 is Adler32
/**
 * Streaming DEFLATE compression
 */ var Deflate = /*#__PURE__*/ function() {
    function Deflate(opts, cb) {
        if (!cb && typeof opts == "function") cb = opts, opts = {};
        this.ondata = cb;
        this.o = opts || {};
    }
    Deflate.prototype.p = function(c, f) {
        this.ondata(dopt(c, this.o, 0, 0, !f), f);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Deflate.prototype.push = function(chunk, final) {
        if (!this.ondata) err(5);
        if (this.d) err(4);
        this.d = final;
        this.p(chunk, final || false);
    };
    return Deflate;
}();
/**
 * Asynchronous streaming DEFLATE compression
 */ var AsyncDeflate = /*#__PURE__*/ function() {
    function AsyncDeflate(opts, cb) {
        astrmify([
            bDflt,
            function() {
                return [
                    astrm,
                    Deflate
                ];
            }
        ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
            var strm = new Deflate(ev.data);
            onmessage = astrm(strm);
        }, 6);
    }
    return AsyncDeflate;
}();
function deflate(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != "function") err(7);
    return cbify(data, opts, [
        bDflt
    ], function(ev) {
        return pbf(deflateSync(ev.data[0], ev.data[1]));
    }, 0, cb);
}
function deflateSync(data, opts) {
    return dopt(data, opts || {}, 0, 0);
}
/**
 * Streaming DEFLATE decompression
 */ var Inflate = /*#__PURE__*/ function() {
    /**
     * Creates an inflation stream
     * @param cb The callback to call whenever data is inflated
     */ function Inflate(cb) {
        this.s = {};
        this.p = new u8(0);
        this.ondata = cb;
    }
    Inflate.prototype.e = function(c) {
        if (!this.ondata) err(5);
        if (this.d) err(4);
        var l = this.p.length;
        var n = new u8(l + c.length);
        n.set(this.p), n.set(c, l), this.p = n;
    };
    Inflate.prototype.c = function(final) {
        this.d = this.s.i = final || false;
        var bts = this.s.b;
        var dt = inflt(this.p, this.o, this.s);
        this.ondata(slc(dt, bts, this.s.b), this.d);
        this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
        this.p = slc(this.p, this.s.p / 8 | 0), this.s.p &= 7;
    };
    /**
     * Pushes a chunk to be inflated
     * @param chunk The chunk to push
     * @param final Whether this is the final chunk
     */ Inflate.prototype.push = function(chunk, final) {
        this.e(chunk), this.c(final);
    };
    return Inflate;
}();
/**
 * Asynchronous streaming DEFLATE decompression
 */ var AsyncInflate = /*#__PURE__*/ function() {
    /**
     * Creates an asynchronous inflation stream
     * @param cb The callback to call whenever data is deflated
     */ function AsyncInflate(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            function() {
                return [
                    astrm,
                    Inflate
                ];
            }
        ], this, 0, function() {
            var strm = new Inflate();
            onmessage = astrm(strm);
        }, 7);
    }
    return AsyncInflate;
}();
function inflate(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != "function") err(7);
    return cbify(data, opts, [
        bInflt
    ], function(ev) {
        return pbf(inflateSync(ev.data[0], gu8(ev.data[1])));
    }, 1, cb);
}
function inflateSync(data, out) {
    return inflt(data, out);
}
// before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
/**
 * Streaming GZIP compression
 */ var Gzip = /*#__PURE__*/ function() {
    function Gzip(opts, cb) {
        this.c = crc();
        this.l = 0;
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be GZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Gzip.prototype.push = function(chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Gzip.prototype.p = function(c, f) {
        this.c.p(c);
        this.l += c.length;
        var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
        if (this.v) gzh(raw, this.o), this.v = 0;
        if (f) wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
        this.ondata(raw, f);
    };
    return Gzip;
}();
/**
 * Asynchronous streaming GZIP compression
 */ var AsyncGzip = /*#__PURE__*/ function() {
    function AsyncGzip(opts, cb) {
        astrmify([
            bDflt,
            gze,
            function() {
                return [
                    astrm,
                    Deflate,
                    Gzip
                ];
            }
        ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
            var strm = new Gzip(ev.data);
            onmessage = astrm(strm);
        }, 8);
    }
    return AsyncGzip;
}();
function gzip(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != "function") err(7);
    return cbify(data, opts, [
        bDflt,
        gze,
        function() {
            return [
                gzipSync
            ];
        }
    ], function(ev) {
        return pbf(gzipSync(ev.data[0], ev.data[1]));
    }, 2, cb);
}
function gzipSync(data, opts) {
    if (!opts) opts = {};
    var c = crc(), l = data.length;
    c.p(data);
    var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
    return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
/**
 * Streaming GZIP decompression
 */ var Gunzip = /*#__PURE__*/ function() {
    /**
     * Creates a GUNZIP stream
     * @param cb The callback to call whenever data is inflated
     */ function Gunzip(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be GUNZIPped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Gunzip.prototype.push = function(chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            var s = this.p.length > 3 ? gzs(this.p) : 4;
            if (s >= this.p.length && !final) return;
            this.p = this.p.subarray(s), this.v = 0;
        }
        if (final) {
            if (this.p.length < 8) err(6, "invalid gzip data");
            this.p = this.p.subarray(0, -8);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Gunzip;
}();
/**
 * Asynchronous streaming GZIP decompression
 */ var AsyncGunzip = /*#__PURE__*/ function() {
    /**
     * Creates an asynchronous GUNZIP stream
     * @param cb The callback to call whenever data is deflated
     */ function AsyncGunzip(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            guze,
            function() {
                return [
                    astrm,
                    Inflate,
                    Gunzip
                ];
            }
        ], this, 0, function() {
            var strm = new Gunzip();
            onmessage = astrm(strm);
        }, 9);
    }
    return AsyncGunzip;
}();
function gunzip(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != "function") err(7);
    return cbify(data, opts, [
        bInflt,
        guze,
        function() {
            return [
                gunzipSync
            ];
        }
    ], function(ev) {
        return pbf(gunzipSync(ev.data[0]));
    }, 3, cb);
}
function gunzipSync(data, out) {
    return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
}
/**
 * Streaming Zlib compression
 */ var Zlib = /*#__PURE__*/ function() {
    function Zlib(opts, cb) {
        this.c = adler();
        this.v = 1;
        Deflate.call(this, opts, cb);
    }
    /**
     * Pushes a chunk to be zlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Zlib.prototype.push = function(chunk, final) {
        Deflate.prototype.push.call(this, chunk, final);
    };
    Zlib.prototype.p = function(c, f) {
        this.c.p(c);
        var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
        if (this.v) zlh(raw, this.o), this.v = 0;
        if (f) wbytes(raw, raw.length - 4, this.c.d());
        this.ondata(raw, f);
    };
    return Zlib;
}();
/**
 * Asynchronous streaming Zlib compression
 */ var AsyncZlib = /*#__PURE__*/ function() {
    function AsyncZlib(opts, cb) {
        astrmify([
            bDflt,
            zle,
            function() {
                return [
                    astrm,
                    Deflate,
                    Zlib
                ];
            }
        ], this, AsyncCmpStrm.call(this, opts, cb), function(ev) {
            var strm = new Zlib(ev.data);
            onmessage = astrm(strm);
        }, 10);
    }
    return AsyncZlib;
}();
function zlib(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != "function") err(7);
    return cbify(data, opts, [
        bDflt,
        zle,
        function() {
            return [
                zlibSync
            ];
        }
    ], function(ev) {
        return pbf(zlibSync(ev.data[0], ev.data[1]));
    }, 4, cb);
}
function zlibSync(data, opts) {
    if (!opts) opts = {};
    var a = adler();
    a.p(data);
    var d = dopt(data, opts, 2, 4);
    return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
}
/**
 * Streaming Zlib decompression
 */ var Unzlib = /*#__PURE__*/ function() {
    /**
     * Creates a Zlib decompression stream
     * @param cb The callback to call whenever data is inflated
     */ function Unzlib(cb) {
        this.v = 1;
        Inflate.call(this, cb);
    }
    /**
     * Pushes a chunk to be unzlibbed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Unzlib.prototype.push = function(chunk, final) {
        Inflate.prototype.e.call(this, chunk);
        if (this.v) {
            if (this.p.length < 2 && !final) return;
            this.p = this.p.subarray(2), this.v = 0;
        }
        if (final) {
            if (this.p.length < 4) err(6, "invalid zlib data");
            this.p = this.p.subarray(0, -4);
        }
        // necessary to prevent TS from using the closure value
        // This allows for workerization to function correctly
        Inflate.prototype.c.call(this, final);
    };
    return Unzlib;
}();
/**
 * Asynchronous streaming Zlib decompression
 */ var AsyncUnzlib = /*#__PURE__*/ function() {
    /**
     * Creates an asynchronous Zlib decompression stream
     * @param cb The callback to call whenever data is deflated
     */ function AsyncUnzlib(cb) {
        this.ondata = cb;
        astrmify([
            bInflt,
            zule,
            function() {
                return [
                    astrm,
                    Inflate,
                    Unzlib
                ];
            }
        ], this, 0, function() {
            var strm = new Unzlib();
            onmessage = astrm(strm);
        }, 11);
    }
    return AsyncUnzlib;
}();
function unzlib(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != "function") err(7);
    return cbify(data, opts, [
        bInflt,
        zule,
        function() {
            return [
                unzlibSync
            ];
        }
    ], function(ev) {
        return pbf(unzlibSync(ev.data[0], gu8(ev.data[1])));
    }, 5, cb);
}
function unzlibSync(data, out) {
    return inflt((zlv(data), data.subarray(2, -4)), out);
}
/**
 * Streaming GZIP, Zlib, or raw DEFLATE decompression
 */ var Decompress = /*#__PURE__*/ function() {
    /**
     * Creates a decompression stream
     * @param cb The callback to call whenever data is decompressed
     */ function Decompress(cb) {
        this.G = Gunzip;
        this.I = Inflate;
        this.Z = Unzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Decompress.prototype.push = function(chunk, final) {
        if (!this.ondata) err(5);
        if (!this.s) {
            if (this.p && this.p.length) {
                var n = new u8(this.p.length + chunk.length);
                n.set(this.p), n.set(chunk, this.p.length);
            } else this.p = chunk;
            if (this.p.length > 2) {
                var _this_1 = this;
                var cb = function() {
                    _this_1.ondata.apply(_this_1, arguments);
                };
                this.s = this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8 ? new this.G(cb) : (this.p[0] & 15) != 8 || this.p[0] >> 4 > 7 || (this.p[0] << 8 | this.p[1]) % 31 ? new this.I(cb) : new this.Z(cb);
                this.s.push(this.p, final);
                this.p = null;
            }
        } else this.s.push(chunk, final);
    };
    return Decompress;
}();
/**
 * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
 */ var AsyncDecompress = /*#__PURE__*/ function() {
    /**
   * Creates an asynchronous decompression stream
   * @param cb The callback to call whenever data is decompressed
   */ function AsyncDecompress(cb) {
        this.G = AsyncGunzip;
        this.I = AsyncInflate;
        this.Z = AsyncUnzlib;
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be decompressed
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ AsyncDecompress.prototype.push = function(chunk, final) {
        Decompress.prototype.push.call(this, chunk, final);
    };
    return AsyncDecompress;
}();
function decompress(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != "function") err(7);
    return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzip(data, opts, cb) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflate(data, opts, cb) : unzlib(data, opts, cb);
}
function decompressSync(data, out) {
    return data[0] == 31 && data[1] == 139 && data[2] == 8 ? gunzipSync(data, out) : (data[0] & 15) != 8 || data[0] >> 4 > 7 || (data[0] << 8 | data[1]) % 31 ? inflateSync(data, out) : unzlibSync(data, out);
}
// flatten a directory structure
var fltn = function(d, p, t, o) {
    for(var k in d){
        var val = d[k], n = p + k, op = o;
        if (Array.isArray(val)) op = mrg(o, val[1]), val = val[0];
        if (val instanceof u8) t[n] = [
            val,
            op
        ];
        else {
            t[n += "/"] = [
                new u8(0),
                op
            ];
            fltn(val, n, t, o);
        }
    }
};
// text encoder
var te = typeof TextEncoder != "undefined" && /*#__PURE__*/ new TextEncoder();
// text decoder
var td = typeof TextDecoder != "undefined" && /*#__PURE__*/ new TextDecoder();
// text decoder stream
var tds = 0;
try {
    td.decode(et, {
        stream: true
    });
    tds = 1;
} catch (e) {}
// decode UTF8
var dutf8 = function(d) {
    for(var r = "", i = 0;;){
        var c = d[i++];
        var eb = (c > 127) + (c > 223) + (c > 239);
        if (i + eb > d.length) return [
            r,
            slc(d, i - 1)
        ];
        if (!eb) r += String.fromCharCode(c);
        else if (eb == 3) c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
        else if (eb & 1) r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
        else r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
    }
};
/**
 * Streaming UTF-8 decoding
 */ var DecodeUTF8 = /*#__PURE__*/ function() {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is decoded
     */ function DecodeUTF8(cb) {
        this.ondata = cb;
        if (tds) this.t = new TextDecoder();
        else this.p = et;
    }
    /**
     * Pushes a chunk to be decoded from UTF-8 binary
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ DecodeUTF8.prototype.push = function(chunk, final) {
        if (!this.ondata) err(5);
        final = !!final;
        if (this.t) {
            this.ondata(this.t.decode(chunk, {
                stream: true
            }), final);
            if (final) {
                if (this.t.decode().length) err(8);
                this.t = null;
            }
            return;
        }
        if (!this.p) err(4);
        var dat = new u8(this.p.length + chunk.length);
        dat.set(this.p);
        dat.set(chunk, this.p.length);
        var _a = dutf8(dat), ch = _a[0], np = _a[1];
        if (final) {
            if (np.length) err(8);
            this.p = null;
        } else this.p = np;
        this.ondata(ch, final);
    };
    return DecodeUTF8;
}();
/**
 * Streaming UTF-8 encoding
 */ var EncodeUTF8 = /*#__PURE__*/ function() {
    /**
     * Creates a UTF-8 decoding stream
     * @param cb The callback to call whenever data is encoded
     */ function EncodeUTF8(cb) {
        this.ondata = cb;
    }
    /**
     * Pushes a chunk to be encoded to UTF-8
     * @param chunk The string data to push
     * @param final Whether this is the last chunk
     */ EncodeUTF8.prototype.push = function(chunk, final) {
        if (!this.ondata) err(5);
        if (this.d) err(4);
        this.ondata(strToU8(chunk), this.d = final || false);
    };
    return EncodeUTF8;
}();
function strToU8(str, latin1) {
    if (latin1) {
        var ar_1 = new u8(str.length);
        for(var i = 0; i < str.length; ++i)ar_1[i] = str.charCodeAt(i);
        return ar_1;
    }
    if (te) return te.encode(str);
    var l = str.length;
    var ar = new u8(str.length + (str.length >> 1));
    var ai = 0;
    var w = function(v) {
        ar[ai++] = v;
    };
    for(var i = 0; i < l; ++i){
        if (ai + 5 > ar.length) {
            var n = new u8(ai + 8 + (l - i << 1));
            n.set(ar);
            ar = n;
        }
        var c = str.charCodeAt(i);
        if (c < 128 || latin1) w(c);
        else if (c < 2048) w(192 | c >> 6), w(128 | c & 63);
        else if (c > 55295 && c < 57344) c = 65536 + (c & 1047552) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
        else w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
    }
    return slc(ar, 0, ai);
}
function strFromU8(dat, latin1) {
    if (latin1) {
        var r = "";
        for(var i = 0; i < dat.length; i += 16384)r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
        return r;
    } else if (td) return td.decode(dat);
    else {
        var _a = dutf8(dat), out = _a[0], ext = _a[1];
        if (ext.length) err(8);
        return out;
    }
}
// deflate bit flag
var dbf = function(l) {
    return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0;
};
// skip local zip header
var slzh = function(d, b) {
    return b + 30 + b2(d, b + 26) + b2(d, b + 28);
};
// read zip header
var zh = function(d, b, z) {
    var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
    var _a = z && bs == 4294967295 ? z64e(d, es) : [
        bs,
        b4(d, b + 24),
        b4(d, b + 42)
    ], sc = _a[0], su = _a[1], off = _a[2];
    return [
        b2(d, b + 10),
        sc,
        su,
        fn,
        es + b2(d, b + 30) + b2(d, b + 32),
        off
    ];
};
// read zip64 extra field
var z64e = function(d, b) {
    for(; b2(d, b) != 1; b += 4 + b2(d, b + 2));
    return [
        b8(d, b + 12),
        b8(d, b + 4),
        b8(d, b + 20)
    ];
};
// extra field length
var exfl = function(ex) {
    var le = 0;
    if (ex) for(var k in ex){
        var l = ex[k].length;
        if (l > 65535) err(9);
        le += l + 4;
    }
    return le;
};
// write zip header
var wzh = function(d, b, f, fn, u, c, ce, co) {
    var fl = fn.length, ex = f.extra, col = co && co.length;
    var exl = exfl(ex);
    wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
    if (ce != null) d[b++] = 20, d[b++] = f.os;
    d[b] = 20, b += 2; // spec compliance? what's that?
    d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
    d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
    var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
    if (y < 0 || y > 119) err(10);
    wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >>> 1), b += 4;
    if (c != -1) {
        wbytes(d, b, f.crc);
        wbytes(d, b + 4, c < 0 ? -c - 2 : c);
        wbytes(d, b + 8, f.size);
    }
    wbytes(d, b + 12, fl);
    wbytes(d, b + 14, exl), b += 16;
    if (ce != null) {
        wbytes(d, b, col);
        wbytes(d, b + 6, f.attrs);
        wbytes(d, b + 10, ce), b += 14;
    }
    d.set(fn, b);
    b += fl;
    if (exl) for(var k in ex){
        var exf = ex[k], l = exf.length;
        wbytes(d, b, +k);
        wbytes(d, b + 2, l);
        d.set(exf, b + 4), b += 4 + l;
    }
    if (col) d.set(co, b), b += col;
    return b;
};
// write zip footer (end of central directory)
var wzf = function(o, b, c, d, e) {
    wbytes(o, b, 0x6054B50); // skip disk
    wbytes(o, b + 8, c);
    wbytes(o, b + 10, c);
    wbytes(o, b + 12, d);
    wbytes(o, b + 16, e);
};
/**
 * A pass-through stream to keep data uncompressed in a ZIP archive.
 */ var ZipPassThrough = /*#__PURE__*/ function() {
    /**
     * Creates a pass-through stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     */ function ZipPassThrough(filename) {
        this.filename = filename;
        this.c = crc();
        this.size = 0;
        this.compression = 0;
    }
    /**
     * Processes a chunk and pushes to the output stream. You can override this
     * method in a subclass for custom behavior, but by default this passes
     * the data through. You must call this.ondata(err, chunk, final) at some
     * point in this method.
     * @param chunk The chunk to process
     * @param final Whether this is the last chunk
     */ ZipPassThrough.prototype.process = function(chunk, final) {
        this.ondata(null, chunk, final);
    };
    /**
     * Pushes a chunk to be added. If you are subclassing this with a custom
     * compression algorithm, note that you must push data from the source
     * file only, pre-compression.
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ ZipPassThrough.prototype.push = function(chunk, final) {
        if (!this.ondata) err(5);
        this.c.p(chunk);
        this.size += chunk.length;
        if (final) this.crc = this.c.d();
        this.process(chunk, final || false);
    };
    return ZipPassThrough;
}();
// I don't extend because TypeScript extension adds 1kB of runtime bloat
/**
 * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate
 * for better performance
 */ var ZipDeflate = /*#__PURE__*/ function() {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */ function ZipDeflate(filename, opts) {
        var _this_1 = this;
        if (!opts) opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new Deflate(opts, function(dat, final) {
            _this_1.ondata(null, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
    }
    ZipDeflate.prototype.process = function(chunk, final) {
        try {
            this.d.push(chunk, final);
        } catch (e) {
            this.ondata(e, null, final);
        }
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ ZipDeflate.prototype.push = function(chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return ZipDeflate;
}();
/**
 * Asynchronous streaming DEFLATE compression for ZIP archives
 */ var AsyncZipDeflate = /*#__PURE__*/ function() {
    /**
     * Creates a DEFLATE stream that can be added to ZIP archives
     * @param filename The filename to associate with this data stream
     * @param opts The compression options
     */ function AsyncZipDeflate(filename, opts) {
        var _this_1 = this;
        if (!opts) opts = {};
        ZipPassThrough.call(this, filename);
        this.d = new AsyncDeflate(opts, function(err, dat, final) {
            _this_1.ondata(err, dat, final);
        });
        this.compression = 8;
        this.flag = dbf(opts.level);
        this.terminate = this.d.terminate;
    }
    AsyncZipDeflate.prototype.process = function(chunk, final) {
        this.d.push(chunk, final);
    };
    /**
     * Pushes a chunk to be deflated
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ AsyncZipDeflate.prototype.push = function(chunk, final) {
        ZipPassThrough.prototype.push.call(this, chunk, final);
    };
    return AsyncZipDeflate;
}();
// TODO: Better tree shaking
/**
 * A zippable archive to which files can incrementally be added
 */ var Zip = /*#__PURE__*/ function() {
    /**
     * Creates an empty ZIP archive to which files can be added
     * @param cb The callback to call whenever data for the generated ZIP archive
     *           is available
     */ function Zip(cb) {
        this.ondata = cb;
        this.u = [];
        this.d = 1;
    }
    /**
     * Adds a file to the ZIP archive
     * @param file The file stream to add
     */ Zip.prototype.add = function(file) {
        var _this_1 = this;
        if (!this.ondata) err(5);
        // finishing or finished
        if (this.d & 2) this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
        else {
            var f = strToU8(file.filename), fl_1 = f.length;
            var com = file.comment, o = com && strToU8(com);
            var u = fl_1 != file.filename.length || o && com.length != o.length;
            var hl_1 = fl_1 + exfl(file.extra) + 30;
            if (fl_1 > 65535) this.ondata(err(11, 0, 1), null, false);
            var header = new u8(hl_1);
            wzh(header, 0, file, f, u, -1);
            var chks_1 = [
                header
            ];
            var pAll_1 = function() {
                for(var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++){
                    var chk = chks_2[_i];
                    _this_1.ondata(null, chk, false);
                }
                chks_1 = [];
            };
            var tr_1 = this.d;
            this.d = 0;
            var ind_1 = this.u.length;
            var uf_1 = mrg(file, {
                f: f,
                u: u,
                o: o,
                t: function() {
                    if (file.terminate) file.terminate();
                },
                r: function() {
                    pAll_1();
                    if (tr_1) {
                        var nxt = _this_1.u[ind_1 + 1];
                        if (nxt) nxt.r();
                        else _this_1.d = 1;
                    }
                    tr_1 = 1;
                }
            });
            var cl_1 = 0;
            file.ondata = function(err, dat, final) {
                if (err) {
                    _this_1.ondata(err, dat, final);
                    _this_1.terminate();
                } else {
                    cl_1 += dat.length;
                    chks_1.push(dat);
                    if (final) {
                        var dd = new u8(16);
                        wbytes(dd, 0, 0x8074B50);
                        wbytes(dd, 4, file.crc);
                        wbytes(dd, 8, cl_1);
                        wbytes(dd, 12, file.size);
                        chks_1.push(dd);
                        uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                        if (tr_1) uf_1.r();
                        tr_1 = 1;
                    } else if (tr_1) pAll_1();
                }
            };
            this.u.push(uf_1);
        }
    };
    /**
     * Ends the process of adding files and prepares to emit the final chunks.
     * This *must* be called after adding all desired files for the resulting
     * ZIP file to work properly.
     */ Zip.prototype.end = function() {
        var _this_1 = this;
        if (this.d & 2) {
            this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
            return;
        }
        if (this.d) this.e();
        else this.u.push({
            r: function() {
                if (!(_this_1.d & 1)) return;
                _this_1.u.splice(-1, 1);
                _this_1.e();
            },
            t: function() {}
        });
        this.d = 3;
    };
    Zip.prototype.e = function() {
        var bt = 0, l = 0, tl = 0;
        for(var _i = 0, _a = this.u; _i < _a.length; _i++){
            var f = _a[_i];
            tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
        }
        var out = new u8(tl + 22);
        for(var _b = 0, _c = this.u; _b < _c.length; _b++){
            var f = _c[_b];
            wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
            bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
        }
        wzf(out, bt, this.u.length, tl, l);
        this.ondata(null, out, true);
        this.d = 2;
    };
    /**
     * A method to terminate any internal workers used by the stream. Subsequent
     * calls to add() will fail.
     */ Zip.prototype.terminate = function() {
        for(var _i = 0, _a = this.u; _i < _a.length; _i++){
            var f = _a[_i];
            f.t();
        }
        this.d = 2;
    };
    return Zip;
}();
function zip(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != "function") err(7);
    var r = {};
    fltn(data, "", r, opts);
    var k = Object.keys(r);
    var lft = k.length, o = 0, tot = 0;
    var slft = lft, files = new Array(lft);
    var term = [];
    var tAll = function() {
        for(var i = 0; i < term.length; ++i)term[i]();
    };
    var cbd = function(a, b) {
        mt(function() {
            cb(a, b);
        });
    };
    mt(function() {
        cbd = cb;
    });
    var cbf = function() {
        var out = new u8(tot + 22), oe = o, cdl = tot - o;
        tot = 0;
        for(var i = 0; i < slft; ++i){
            var f = files[i];
            try {
                var l = f.c.length;
                wzh(out, tot, f, f.f, f.u, l);
                var badd = 30 + f.f.length + exfl(f.extra);
                var loc = tot + badd;
                out.set(f.c, loc);
                wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
            } catch (e) {
                return cbd(e, null);
            }
        }
        wzf(out, o, files.length, cdl, oe);
        cbd(null, out);
    };
    if (!lft) cbf();
    var _loop_1 = function(i) {
        var fn = k[i];
        var _a = r[fn], file = _a[0], p = _a[1];
        var c = crc(), size = file.length;
        c.p(file);
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        var compression = p.level == 0 ? 0 : 8;
        var cbl = function(e, d) {
            if (e) {
                tAll();
                cbd(e, null);
            } else {
                var l = d.length;
                files[i] = mrg(p, {
                    size: size,
                    crc: c.d(),
                    c: d,
                    f: f,
                    m: m,
                    u: s != fn.length || m && com.length != ms,
                    compression: compression
                });
                o += 30 + s + exl + l;
                tot += 76 + 2 * (s + exl) + (ms || 0) + l;
                if (!--lft) cbf();
            }
        };
        if (s > 65535) cbl(err(11, 0, 1), null);
        if (!compression) cbl(null, file);
        else if (size < 160000) try {
            cbl(null, deflateSync(file, p));
        } catch (e) {
            cbl(e, null);
        }
        else term.push(deflate(file, p, cbl));
    };
    // Cannot use lft because it can decrease
    for(var i = 0; i < slft; ++i)_loop_1(i);
    return tAll;
}
function zipSync(data, opts) {
    if (!opts) opts = {};
    var r = {};
    var files = [];
    fltn(data, "", r, opts);
    var o = 0;
    var tot = 0;
    for(var fn in r){
        var _a = r[fn], file = _a[0], p = _a[1];
        var compression = p.level == 0 ? 0 : 8;
        var f = strToU8(fn), s = f.length;
        var com = p.comment, m = com && strToU8(com), ms = m && m.length;
        var exl = exfl(p.extra);
        if (s > 65535) err(11);
        var d = compression ? deflateSync(file, p) : file, l = d.length;
        var c = crc();
        c.p(file);
        files.push(mrg(p, {
            size: file.length,
            crc: c.d(),
            c: d,
            f: f,
            m: m,
            u: s != fn.length || m && com.length != ms,
            o: o,
            compression: compression
        }));
        o += 30 + s + exl + l;
        tot += 76 + 2 * (s + exl) + (ms || 0) + l;
    }
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    for(var i = 0; i < files.length; ++i){
        var f = files[i];
        wzh(out, f.o, f, f.f, f.u, f.c.length);
        var badd = 30 + f.f.length + exfl(f.extra);
        out.set(f.c, f.o + badd);
        wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
    }
    wzf(out, o, files.length, cdl, oe);
    return out;
}
/**
 * Streaming pass-through decompression for ZIP archives
 */ var UnzipPassThrough = /*#__PURE__*/ function() {
    function UnzipPassThrough() {}
    UnzipPassThrough.prototype.push = function(data, final) {
        this.ondata(null, data, final);
    };
    UnzipPassThrough.compression = 0;
    return UnzipPassThrough;
}();
/**
 * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
 * better performance.
 */ var UnzipInflate = /*#__PURE__*/ function() {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */ function UnzipInflate() {
        var _this_1 = this;
        this.i = new Inflate(function(dat, final) {
            _this_1.ondata(null, dat, final);
        });
    }
    UnzipInflate.prototype.push = function(data, final) {
        try {
            this.i.push(data, final);
        } catch (e) {
            this.ondata(e, null, final);
        }
    };
    UnzipInflate.compression = 8;
    return UnzipInflate;
}();
/**
 * Asynchronous streaming DEFLATE decompression for ZIP archives
 */ var AsyncUnzipInflate = /*#__PURE__*/ function() {
    /**
     * Creates a DEFLATE decompression that can be used in ZIP archives
     */ function AsyncUnzipInflate(_, sz) {
        var _this_1 = this;
        if (sz < 320000) this.i = new Inflate(function(dat, final) {
            _this_1.ondata(null, dat, final);
        });
        else {
            this.i = new AsyncInflate(function(err, dat, final) {
                _this_1.ondata(err, dat, final);
            });
            this.terminate = this.i.terminate;
        }
    }
    AsyncUnzipInflate.prototype.push = function(data, final) {
        if (this.i.terminate) data = slc(data, 0);
        this.i.push(data, final);
    };
    AsyncUnzipInflate.compression = 8;
    return AsyncUnzipInflate;
}();
/**
 * A ZIP archive decompression stream that emits files as they are discovered
 */ var Unzip = /*#__PURE__*/ function() {
    /**
     * Creates a ZIP decompression stream
     * @param cb The callback to call whenever a file in the ZIP archive is found
     */ function Unzip(cb) {
        this.onfile = cb;
        this.k = [];
        this.o = {
            0: UnzipPassThrough
        };
        this.p = et;
    }
    /**
     * Pushes a chunk to be unzipped
     * @param chunk The chunk to push
     * @param final Whether this is the last chunk
     */ Unzip.prototype.push = function(chunk, final) {
        var _this_1 = this;
        if (!this.onfile) err(5);
        if (!this.p) err(4);
        if (this.c > 0) {
            var len = Math.min(this.c, chunk.length);
            var toAdd = chunk.subarray(0, len);
            this.c -= len;
            if (this.d) this.d.push(toAdd, !this.c);
            else this.k[0].push(toAdd);
            chunk = chunk.subarray(len);
            if (chunk.length) return this.push(chunk, final);
        } else {
            var f = 0, i = 0, is = void 0, buf = void 0;
            if (!this.p.length) buf = chunk;
            else if (!chunk.length) buf = this.p;
            else {
                buf = new u8(this.p.length + chunk.length);
                buf.set(this.p), buf.set(chunk, this.p.length);
            }
            var l = buf.length, oc = this.c, add = oc && this.d;
            var _loop_2 = function() {
                var _a;
                var sig = b4(buf, i);
                if (sig == 0x4034B50) {
                    f = 1, is = i;
                    this_1.d = null;
                    this_1.c = 0;
                    var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
                    if (l > i + 30 + fnl + es) {
                        var chks_3 = [];
                        this_1.k.unshift(chks_3);
                        f = 2;
                        var sc_1 = b4(buf, i + 18), su_1 = b4(buf, i + 22);
                        var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                        if (sc_1 == 4294967295) _a = dd ? [
                            -2
                        ] : z64e(buf, i), sc_1 = _a[0], su_1 = _a[1];
                        else if (dd) sc_1 = -1;
                        i += es;
                        this_1.c = sc_1;
                        var d_1;
                        var file_1 = {
                            name: fn_1,
                            compression: cmp_1,
                            start: function() {
                                if (!file_1.ondata) err(5);
                                if (!sc_1) file_1.ondata(null, et, true);
                                else {
                                    var ctr = _this_1.o[cmp_1];
                                    if (!ctr) file_1.ondata(err(14, "unknown compression type " + cmp_1, 1), null, false);
                                    d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                                    d_1.ondata = function(err, dat, final) {
                                        file_1.ondata(err, dat, final);
                                    };
                                    for(var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++){
                                        var dat = chks_4[_i];
                                        d_1.push(dat, false);
                                    }
                                    if (_this_1.k[0] == chks_3 && _this_1.c) _this_1.d = d_1;
                                    else d_1.push(et, true);
                                }
                            },
                            terminate: function() {
                                if (d_1 && d_1.terminate) d_1.terminate();
                            }
                        };
                        if (sc_1 >= 0) file_1.size = sc_1, file_1.originalSize = su_1;
                        this_1.onfile(file_1);
                    }
                    return "break";
                } else if (oc) {
                    if (sig == 0x8074B50) {
                        is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                        return "break";
                    } else if (sig == 0x2014B50) {
                        is = i -= 4, f = 3, this_1.c = 0;
                        return "break";
                    }
                }
            };
            var this_1 = this;
            for(; i < l - 4; ++i){
                var state_1 = _loop_2();
                if (state_1 === "break") break;
            }
            this.p = et;
            if (oc < 0) {
                var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 0x8074B50 && 4)) : buf.subarray(0, i);
                if (add) add.push(dat, !!f);
                else this.k[+(f == 2)].push(dat);
            }
            if (f & 2) return this.push(buf.subarray(i), final);
            this.p = buf.subarray(i);
        }
        if (final) {
            if (this.c) err(13);
            this.p = null;
        }
    };
    /**
     * Registers a decoder with the stream, allowing for files compressed with
     * the compression type provided to be expanded correctly
     * @param decoder The decoder constructor
     */ Unzip.prototype.register = function(decoder) {
        this.o[decoder.compression] = decoder;
    };
    return Unzip;
}();
var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {
    fn();
};
function unzip(data, opts, cb) {
    if (!cb) cb = opts, opts = {};
    if (typeof cb != "function") err(7);
    var term = [];
    var tAll = function() {
        for(var i = 0; i < term.length; ++i)term[i]();
    };
    var files = {};
    var cbd = function(a, b) {
        mt(function() {
            cb(a, b);
        });
    };
    mt(function() {
        cbd = cb;
    });
    var e = data.length - 22;
    for(; b4(data, e) != 0x6054B50; --e)if (!e || data.length - e > 65558) {
        cbd(err(13, 0, 1), null);
        return tAll;
    }
    var lft = b2(data, e + 8);
    if (lft) {
        var c = lft;
        var o = b4(data, e + 16);
        var z = o == 4294967295 || c == 65535;
        if (z) {
            var ze = b4(data, e - 12);
            z = b4(data, ze) == 0x6064B50;
            if (z) {
                c = lft = b4(data, ze + 32);
                o = b4(data, ze + 48);
            }
        }
        var fltr = opts && opts.filter;
        var _loop_3 = function(i) {
            var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
            o = no;
            var cbl = function(e, d) {
                if (e) {
                    tAll();
                    cbd(e, null);
                } else {
                    if (d) files[fn] = d;
                    if (!--lft) cbd(null, files);
                }
            };
            if (!fltr || fltr({
                name: fn,
                size: sc,
                originalSize: su,
                compression: c_1
            })) {
                if (!c_1) cbl(null, slc(data, b, b + sc));
                else if (c_1 == 8) {
                    var infl = data.subarray(b, b + sc);
                    if (sc < 320000) try {
                        cbl(null, inflateSync(infl, new u8(su)));
                    } catch (e) {
                        cbl(e, null);
                    }
                    else term.push(inflate(infl, {
                        size: su
                    }, cbl));
                } else cbl(err(14, "unknown compression type " + c_1, 1), null);
            } else cbl(null, null);
        };
        for(var i = 0; i < c; ++i)_loop_3(i);
    } else cbd(null, {});
    return tAll;
}
function unzipSync(data, opts) {
    var files = {};
    var e = data.length - 22;
    for(; b4(data, e) != 0x6054B50; --e)if (!e || data.length - e > 65558) err(13);
    var c = b2(data, e + 8);
    if (!c) return {};
    var o = b4(data, e + 16);
    var z = o == 4294967295 || c == 65535;
    if (z) {
        var ze = b4(data, e - 12);
        z = b4(data, ze) == 0x6064B50;
        if (z) {
            c = b4(data, ze + 32);
            o = b4(data, ze + 48);
        }
    }
    var fltr = opts && opts.filter;
    for(var i = 0; i < c; ++i){
        var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
        o = no;
        if (!fltr || fltr({
            name: fn,
            size: sc,
            originalSize: su,
            compression: c_2
        })) {
            if (!c_2) files[fn] = slc(data, b, b + sc);
            else if (c_2 == 8) files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
            else err(14, "unknown compression type " + c_2);
        }
    }
    return files;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"eANhU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "versionCheck", ()=>versionCheck);
var _chalk = require("chalk");
var _chalkDefault = parcelHelpers.interopDefault(_chalk);
var _dateFns = require("date-fns");
var _dir = require("dir");
var _fsJetpack = require("fs-jetpack");
const versionCheck = async (opt)=>{
    //check version on dev
    const version = await (0, _fsJetpack.readAsync)((0, _dir.dir).root("pkgs/version.json"), "json");
    const abortctrl = new AbortController();
    let timeout = {
        timer: null
    };
    fetch(`https://raw.githubusercontent.com/avolut/royal/main/pkgs/version.json`, {
        signal: abortctrl.signal
    }).then(async (res)=>{
        const remoteVersion = await res.json();
        timeout.timer = setTimeout(async ()=>{
            try {
                if (remoteVersion.ts > version.ts) console.log(`
📣 New version available: ${(0, _chalkDefault.default).cyan(`v${(0, _dateFns.format)(new Date(remoteVersion.ts), "1.Md.hm")}`)} 
${(0, _chalkDefault.default).reset(`
To upgrade, please run: 
  > ${(0, _chalkDefault.default).underline((0, _chalkDefault.default).green(`node base upgrade`))}

If somehow upgrade failed you can rollback using
  > ${(0, _chalkDefault.default).red(`node base rollback`)}
`)}
────────────────────────────────────────
`);
                else console.log(`\n👌 Royal is in latest version [ v${(0, _dateFns.format)(new Date(remoteVersion.ts), "1.Md.hm")} ]\n`);
            } catch (e) {}
        }, opt.timeout);
    }).catch(()=>{});
};

},{"chalk":"1lbiC","date-fns":"78Szb","dir":"er1Is","fs-jetpack":"dr8qG","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"78Szb":[function(require,module,exports) {
// This file is generated automatically by `scripts/build/indices.ts`. Please, don't change it.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "add", ()=>(0, _indexJsDefault.default));
parcelHelpers.export(exports, "addBusinessDays", ()=>(0, _indexJsDefault1.default));
parcelHelpers.export(exports, "addDays", ()=>(0, _indexJsDefault2.default));
parcelHelpers.export(exports, "addHours", ()=>(0, _indexJsDefault3.default));
parcelHelpers.export(exports, "addISOWeekYears", ()=>(0, _indexJsDefault4.default));
parcelHelpers.export(exports, "addMilliseconds", ()=>(0, _indexJsDefault5.default));
parcelHelpers.export(exports, "addMinutes", ()=>(0, _indexJsDefault6.default));
parcelHelpers.export(exports, "addMonths", ()=>(0, _indexJsDefault7.default));
parcelHelpers.export(exports, "addQuarters", ()=>(0, _indexJsDefault8.default));
parcelHelpers.export(exports, "addSeconds", ()=>(0, _indexJsDefault9.default));
parcelHelpers.export(exports, "addWeeks", ()=>(0, _indexJsDefault10.default));
parcelHelpers.export(exports, "addYears", ()=>(0, _indexJsDefault11.default));
parcelHelpers.export(exports, "areIntervalsOverlapping", ()=>(0, _indexJsDefault12.default));
parcelHelpers.export(exports, "clamp", ()=>(0, _indexJsDefault13.default));
parcelHelpers.export(exports, "closestIndexTo", ()=>(0, _indexJsDefault14.default));
parcelHelpers.export(exports, "closestTo", ()=>(0, _indexJsDefault15.default));
parcelHelpers.export(exports, "compareAsc", ()=>(0, _indexJsDefault16.default));
parcelHelpers.export(exports, "compareDesc", ()=>(0, _indexJsDefault17.default));
parcelHelpers.export(exports, "daysToWeeks", ()=>(0, _indexJsDefault18.default));
parcelHelpers.export(exports, "differenceInBusinessDays", ()=>(0, _indexJsDefault19.default));
parcelHelpers.export(exports, "differenceInCalendarDays", ()=>(0, _indexJsDefault20.default));
parcelHelpers.export(exports, "differenceInCalendarISOWeekYears", ()=>(0, _indexJsDefault21.default));
parcelHelpers.export(exports, "differenceInCalendarISOWeeks", ()=>(0, _indexJsDefault22.default));
parcelHelpers.export(exports, "differenceInCalendarMonths", ()=>(0, _indexJsDefault23.default));
parcelHelpers.export(exports, "differenceInCalendarQuarters", ()=>(0, _indexJsDefault24.default));
parcelHelpers.export(exports, "differenceInCalendarWeeks", ()=>(0, _indexJsDefault25.default));
parcelHelpers.export(exports, "differenceInCalendarYears", ()=>(0, _indexJsDefault26.default));
parcelHelpers.export(exports, "differenceInDays", ()=>(0, _indexJsDefault27.default));
parcelHelpers.export(exports, "differenceInHours", ()=>(0, _indexJsDefault28.default));
parcelHelpers.export(exports, "differenceInISOWeekYears", ()=>(0, _indexJsDefault29.default));
parcelHelpers.export(exports, "differenceInMilliseconds", ()=>(0, _indexJsDefault30.default));
parcelHelpers.export(exports, "differenceInMinutes", ()=>(0, _indexJsDefault31.default));
parcelHelpers.export(exports, "differenceInMonths", ()=>(0, _indexJsDefault32.default));
parcelHelpers.export(exports, "differenceInQuarters", ()=>(0, _indexJsDefault33.default));
parcelHelpers.export(exports, "differenceInSeconds", ()=>(0, _indexJsDefault34.default));
parcelHelpers.export(exports, "differenceInWeeks", ()=>(0, _indexJsDefault35.default));
parcelHelpers.export(exports, "differenceInYears", ()=>(0, _indexJsDefault36.default));
parcelHelpers.export(exports, "eachDayOfInterval", ()=>(0, _indexJsDefault37.default));
parcelHelpers.export(exports, "eachHourOfInterval", ()=>(0, _indexJsDefault38.default));
parcelHelpers.export(exports, "eachMinuteOfInterval", ()=>(0, _indexJsDefault39.default));
parcelHelpers.export(exports, "eachMonthOfInterval", ()=>(0, _indexJsDefault40.default));
parcelHelpers.export(exports, "eachQuarterOfInterval", ()=>(0, _indexJsDefault41.default));
parcelHelpers.export(exports, "eachWeekOfInterval", ()=>(0, _indexJsDefault42.default));
parcelHelpers.export(exports, "eachWeekendOfInterval", ()=>(0, _indexJsDefault43.default));
parcelHelpers.export(exports, "eachWeekendOfMonth", ()=>(0, _indexJsDefault44.default));
parcelHelpers.export(exports, "eachWeekendOfYear", ()=>(0, _indexJsDefault45.default));
parcelHelpers.export(exports, "eachYearOfInterval", ()=>(0, _indexJsDefault46.default));
parcelHelpers.export(exports, "endOfDay", ()=>(0, _indexJsDefault47.default));
parcelHelpers.export(exports, "endOfDecade", ()=>(0, _indexJsDefault48.default));
parcelHelpers.export(exports, "endOfHour", ()=>(0, _indexJsDefault49.default));
parcelHelpers.export(exports, "endOfISOWeek", ()=>(0, _indexJsDefault50.default));
parcelHelpers.export(exports, "endOfISOWeekYear", ()=>(0, _indexJsDefault51.default));
parcelHelpers.export(exports, "endOfMinute", ()=>(0, _indexJsDefault52.default));
parcelHelpers.export(exports, "endOfMonth", ()=>(0, _indexJsDefault53.default));
parcelHelpers.export(exports, "endOfQuarter", ()=>(0, _indexJsDefault54.default));
parcelHelpers.export(exports, "endOfSecond", ()=>(0, _indexJsDefault55.default));
parcelHelpers.export(exports, "endOfToday", ()=>(0, _indexJsDefault56.default));
parcelHelpers.export(exports, "endOfTomorrow", ()=>(0, _indexJsDefault57.default));
parcelHelpers.export(exports, "endOfWeek", ()=>(0, _indexJsDefault58.default));
parcelHelpers.export(exports, "endOfYear", ()=>(0, _indexJsDefault59.default));
parcelHelpers.export(exports, "endOfYesterday", ()=>(0, _indexJsDefault60.default));
parcelHelpers.export(exports, "format", ()=>(0, _indexJsDefault61.default));
parcelHelpers.export(exports, "formatDistance", ()=>(0, _indexJsDefault62.default));
parcelHelpers.export(exports, "formatDistanceStrict", ()=>(0, _indexJsDefault63.default));
parcelHelpers.export(exports, "formatDistanceToNow", ()=>(0, _indexJsDefault64.default));
parcelHelpers.export(exports, "formatDistanceToNowStrict", ()=>(0, _indexJsDefault65.default));
parcelHelpers.export(exports, "formatDuration", ()=>(0, _indexJsDefault66.default));
parcelHelpers.export(exports, "formatISO", ()=>(0, _indexJsDefault67.default));
parcelHelpers.export(exports, "formatISO9075", ()=>(0, _indexJsDefault68.default));
parcelHelpers.export(exports, "formatISODuration", ()=>(0, _indexJsDefault69.default));
parcelHelpers.export(exports, "formatRFC3339", ()=>(0, _indexJsDefault70.default));
parcelHelpers.export(exports, "formatRFC7231", ()=>(0, _indexJsDefault71.default));
parcelHelpers.export(exports, "formatRelative", ()=>(0, _indexJsDefault72.default));
parcelHelpers.export(exports, "fromUnixTime", ()=>(0, _indexJsDefault73.default));
parcelHelpers.export(exports, "getDate", ()=>(0, _indexJsDefault74.default));
parcelHelpers.export(exports, "getDay", ()=>(0, _indexJsDefault75.default));
parcelHelpers.export(exports, "getDayOfYear", ()=>(0, _indexJsDefault76.default));
parcelHelpers.export(exports, "getDaysInMonth", ()=>(0, _indexJsDefault77.default));
parcelHelpers.export(exports, "getDaysInYear", ()=>(0, _indexJsDefault78.default));
parcelHelpers.export(exports, "getDecade", ()=>(0, _indexJsDefault79.default));
parcelHelpers.export(exports, "getDefaultOptions", ()=>(0, _indexJsDefault80.default));
parcelHelpers.export(exports, "getHours", ()=>(0, _indexJsDefault81.default));
parcelHelpers.export(exports, "getISODay", ()=>(0, _indexJsDefault82.default));
parcelHelpers.export(exports, "getISOWeek", ()=>(0, _indexJsDefault83.default));
parcelHelpers.export(exports, "getISOWeekYear", ()=>(0, _indexJsDefault84.default));
parcelHelpers.export(exports, "getISOWeeksInYear", ()=>(0, _indexJsDefault85.default));
parcelHelpers.export(exports, "getMilliseconds", ()=>(0, _indexJsDefault86.default));
parcelHelpers.export(exports, "getMinutes", ()=>(0, _indexJsDefault87.default));
parcelHelpers.export(exports, "getMonth", ()=>(0, _indexJsDefault88.default));
parcelHelpers.export(exports, "getOverlappingDaysInIntervals", ()=>(0, _indexJsDefault89.default));
parcelHelpers.export(exports, "getQuarter", ()=>(0, _indexJsDefault90.default));
parcelHelpers.export(exports, "getSeconds", ()=>(0, _indexJsDefault91.default));
parcelHelpers.export(exports, "getTime", ()=>(0, _indexJsDefault92.default));
parcelHelpers.export(exports, "getUnixTime", ()=>(0, _indexJsDefault93.default));
parcelHelpers.export(exports, "getWeek", ()=>(0, _indexJsDefault94.default));
parcelHelpers.export(exports, "getWeekOfMonth", ()=>(0, _indexJsDefault95.default));
parcelHelpers.export(exports, "getWeekYear", ()=>(0, _indexJsDefault96.default));
parcelHelpers.export(exports, "getWeeksInMonth", ()=>(0, _indexJsDefault97.default));
parcelHelpers.export(exports, "getYear", ()=>(0, _indexJsDefault98.default));
parcelHelpers.export(exports, "hoursToMilliseconds", ()=>(0, _indexJsDefault99.default));
parcelHelpers.export(exports, "hoursToMinutes", ()=>(0, _indexJsDefault100.default));
parcelHelpers.export(exports, "hoursToSeconds", ()=>(0, _indexJsDefault101.default));
parcelHelpers.export(exports, "intervalToDuration", ()=>(0, _indexJsDefault102.default));
parcelHelpers.export(exports, "intlFormat", ()=>(0, _indexJsDefault103.default));
parcelHelpers.export(exports, "intlFormatDistance", ()=>(0, _indexJsDefault104.default));
parcelHelpers.export(exports, "isAfter", ()=>(0, _indexJsDefault105.default));
parcelHelpers.export(exports, "isBefore", ()=>(0, _indexJsDefault106.default));
parcelHelpers.export(exports, "isDate", ()=>(0, _indexJsDefault107.default));
parcelHelpers.export(exports, "isEqual", ()=>(0, _indexJsDefault108.default));
parcelHelpers.export(exports, "isExists", ()=>(0, _indexJsDefault109.default));
parcelHelpers.export(exports, "isFirstDayOfMonth", ()=>(0, _indexJsDefault110.default));
parcelHelpers.export(exports, "isFriday", ()=>(0, _indexJsDefault111.default));
parcelHelpers.export(exports, "isFuture", ()=>(0, _indexJsDefault112.default));
parcelHelpers.export(exports, "isLastDayOfMonth", ()=>(0, _indexJsDefault113.default));
parcelHelpers.export(exports, "isLeapYear", ()=>(0, _indexJsDefault114.default));
parcelHelpers.export(exports, "isMatch", ()=>(0, _indexJsDefault115.default));
parcelHelpers.export(exports, "isMonday", ()=>(0, _indexJsDefault116.default));
parcelHelpers.export(exports, "isPast", ()=>(0, _indexJsDefault117.default));
parcelHelpers.export(exports, "isSameDay", ()=>(0, _indexJsDefault118.default));
parcelHelpers.export(exports, "isSameHour", ()=>(0, _indexJsDefault119.default));
parcelHelpers.export(exports, "isSameISOWeek", ()=>(0, _indexJsDefault120.default));
parcelHelpers.export(exports, "isSameISOWeekYear", ()=>(0, _indexJsDefault121.default));
parcelHelpers.export(exports, "isSameMinute", ()=>(0, _indexJsDefault122.default));
parcelHelpers.export(exports, "isSameMonth", ()=>(0, _indexJsDefault123.default));
parcelHelpers.export(exports, "isSameQuarter", ()=>(0, _indexJsDefault124.default));
parcelHelpers.export(exports, "isSameSecond", ()=>(0, _indexJsDefault125.default));
parcelHelpers.export(exports, "isSameWeek", ()=>(0, _indexJsDefault126.default));
parcelHelpers.export(exports, "isSameYear", ()=>(0, _indexJsDefault127.default));
parcelHelpers.export(exports, "isSaturday", ()=>(0, _indexJsDefault128.default));
parcelHelpers.export(exports, "isSunday", ()=>(0, _indexJsDefault129.default));
parcelHelpers.export(exports, "isThisHour", ()=>(0, _indexJsDefault130.default));
parcelHelpers.export(exports, "isThisISOWeek", ()=>(0, _indexJsDefault131.default));
parcelHelpers.export(exports, "isThisMinute", ()=>(0, _indexJsDefault132.default));
parcelHelpers.export(exports, "isThisMonth", ()=>(0, _indexJsDefault133.default));
parcelHelpers.export(exports, "isThisQuarter", ()=>(0, _indexJsDefault134.default));
parcelHelpers.export(exports, "isThisSecond", ()=>(0, _indexJsDefault135.default));
parcelHelpers.export(exports, "isThisWeek", ()=>(0, _indexJsDefault136.default));
parcelHelpers.export(exports, "isThisYear", ()=>(0, _indexJsDefault137.default));
parcelHelpers.export(exports, "isThursday", ()=>(0, _indexJsDefault138.default));
parcelHelpers.export(exports, "isToday", ()=>(0, _indexJsDefault139.default));
parcelHelpers.export(exports, "isTomorrow", ()=>(0, _indexJsDefault140.default));
parcelHelpers.export(exports, "isTuesday", ()=>(0, _indexJsDefault141.default));
parcelHelpers.export(exports, "isValid", ()=>(0, _indexJsDefault142.default));
parcelHelpers.export(exports, "isWednesday", ()=>(0, _indexJsDefault143.default));
parcelHelpers.export(exports, "isWeekend", ()=>(0, _indexJsDefault144.default));
parcelHelpers.export(exports, "isWithinInterval", ()=>(0, _indexJsDefault145.default));
parcelHelpers.export(exports, "isYesterday", ()=>(0, _indexJsDefault146.default));
parcelHelpers.export(exports, "lastDayOfDecade", ()=>(0, _indexJsDefault147.default));
parcelHelpers.export(exports, "lastDayOfISOWeek", ()=>(0, _indexJsDefault148.default));
parcelHelpers.export(exports, "lastDayOfISOWeekYear", ()=>(0, _indexJsDefault149.default));
parcelHelpers.export(exports, "lastDayOfMonth", ()=>(0, _indexJsDefault150.default));
parcelHelpers.export(exports, "lastDayOfQuarter", ()=>(0, _indexJsDefault151.default));
parcelHelpers.export(exports, "lastDayOfWeek", ()=>(0, _indexJsDefault152.default));
parcelHelpers.export(exports, "lastDayOfYear", ()=>(0, _indexJsDefault153.default));
parcelHelpers.export(exports, "lightFormat", ()=>(0, _indexJsDefault154.default));
parcelHelpers.export(exports, "max", ()=>(0, _indexJsDefault155.default));
parcelHelpers.export(exports, "milliseconds", ()=>(0, _indexJsDefault156.default));
parcelHelpers.export(exports, "millisecondsToHours", ()=>(0, _indexJsDefault157.default));
parcelHelpers.export(exports, "millisecondsToMinutes", ()=>(0, _indexJsDefault158.default));
parcelHelpers.export(exports, "millisecondsToSeconds", ()=>(0, _indexJsDefault159.default));
parcelHelpers.export(exports, "min", ()=>(0, _indexJsDefault160.default));
parcelHelpers.export(exports, "minutesToHours", ()=>(0, _indexJsDefault161.default));
parcelHelpers.export(exports, "minutesToMilliseconds", ()=>(0, _indexJsDefault162.default));
parcelHelpers.export(exports, "minutesToSeconds", ()=>(0, _indexJsDefault163.default));
parcelHelpers.export(exports, "monthsToQuarters", ()=>(0, _indexJsDefault164.default));
parcelHelpers.export(exports, "monthsToYears", ()=>(0, _indexJsDefault165.default));
parcelHelpers.export(exports, "nextDay", ()=>(0, _indexJsDefault166.default));
parcelHelpers.export(exports, "nextFriday", ()=>(0, _indexJsDefault167.default));
parcelHelpers.export(exports, "nextMonday", ()=>(0, _indexJsDefault168.default));
parcelHelpers.export(exports, "nextSaturday", ()=>(0, _indexJsDefault169.default));
parcelHelpers.export(exports, "nextSunday", ()=>(0, _indexJsDefault170.default));
parcelHelpers.export(exports, "nextThursday", ()=>(0, _indexJsDefault171.default));
parcelHelpers.export(exports, "nextTuesday", ()=>(0, _indexJsDefault172.default));
parcelHelpers.export(exports, "nextWednesday", ()=>(0, _indexJsDefault173.default));
parcelHelpers.export(exports, "parse", ()=>(0, _indexJsDefault174.default));
parcelHelpers.export(exports, "parseISO", ()=>(0, _indexJsDefault175.default));
parcelHelpers.export(exports, "parseJSON", ()=>(0, _indexJsDefault176.default));
parcelHelpers.export(exports, "previousDay", ()=>(0, _indexJsDefault177.default));
parcelHelpers.export(exports, "previousFriday", ()=>(0, _indexJsDefault178.default));
parcelHelpers.export(exports, "previousMonday", ()=>(0, _indexJsDefault179.default));
parcelHelpers.export(exports, "previousSaturday", ()=>(0, _indexJsDefault180.default));
parcelHelpers.export(exports, "previousSunday", ()=>(0, _indexJsDefault181.default));
parcelHelpers.export(exports, "previousThursday", ()=>(0, _indexJsDefault182.default));
parcelHelpers.export(exports, "previousTuesday", ()=>(0, _indexJsDefault183.default));
parcelHelpers.export(exports, "previousWednesday", ()=>(0, _indexJsDefault184.default));
parcelHelpers.export(exports, "quartersToMonths", ()=>(0, _indexJsDefault185.default));
parcelHelpers.export(exports, "quartersToYears", ()=>(0, _indexJsDefault186.default));
parcelHelpers.export(exports, "roundToNearestMinutes", ()=>(0, _indexJsDefault187.default));
parcelHelpers.export(exports, "secondsToHours", ()=>(0, _indexJsDefault188.default));
parcelHelpers.export(exports, "secondsToMilliseconds", ()=>(0, _indexJsDefault189.default));
parcelHelpers.export(exports, "secondsToMinutes", ()=>(0, _indexJsDefault190.default));
parcelHelpers.export(exports, "set", ()=>(0, _indexJsDefault191.default));
parcelHelpers.export(exports, "setDate", ()=>(0, _indexJsDefault192.default));
parcelHelpers.export(exports, "setDay", ()=>(0, _indexJsDefault193.default));
parcelHelpers.export(exports, "setDayOfYear", ()=>(0, _indexJsDefault194.default));
parcelHelpers.export(exports, "setDefaultOptions", ()=>(0, _indexJsDefault195.default));
parcelHelpers.export(exports, "setHours", ()=>(0, _indexJsDefault196.default));
parcelHelpers.export(exports, "setISODay", ()=>(0, _indexJsDefault197.default));
parcelHelpers.export(exports, "setISOWeek", ()=>(0, _indexJsDefault198.default));
parcelHelpers.export(exports, "setISOWeekYear", ()=>(0, _indexJsDefault199.default));
parcelHelpers.export(exports, "setMilliseconds", ()=>(0, _indexJsDefault200.default));
parcelHelpers.export(exports, "setMinutes", ()=>(0, _indexJsDefault201.default));
parcelHelpers.export(exports, "setMonth", ()=>(0, _indexJsDefault202.default));
parcelHelpers.export(exports, "setQuarter", ()=>(0, _indexJsDefault203.default));
parcelHelpers.export(exports, "setSeconds", ()=>(0, _indexJsDefault204.default));
parcelHelpers.export(exports, "setWeek", ()=>(0, _indexJsDefault205.default));
parcelHelpers.export(exports, "setWeekYear", ()=>(0, _indexJsDefault206.default));
parcelHelpers.export(exports, "setYear", ()=>(0, _indexJsDefault207.default));
parcelHelpers.export(exports, "startOfDay", ()=>(0, _indexJsDefault208.default));
parcelHelpers.export(exports, "startOfDecade", ()=>(0, _indexJsDefault209.default));
parcelHelpers.export(exports, "startOfHour", ()=>(0, _indexJsDefault210.default));
parcelHelpers.export(exports, "startOfISOWeek", ()=>(0, _indexJsDefault211.default));
parcelHelpers.export(exports, "startOfISOWeekYear", ()=>(0, _indexJsDefault212.default));
parcelHelpers.export(exports, "startOfMinute", ()=>(0, _indexJsDefault213.default));
parcelHelpers.export(exports, "startOfMonth", ()=>(0, _indexJsDefault214.default));
parcelHelpers.export(exports, "startOfQuarter", ()=>(0, _indexJsDefault215.default));
parcelHelpers.export(exports, "startOfSecond", ()=>(0, _indexJsDefault216.default));
parcelHelpers.export(exports, "startOfToday", ()=>(0, _indexJsDefault217.default));
parcelHelpers.export(exports, "startOfTomorrow", ()=>(0, _indexJsDefault218.default));
parcelHelpers.export(exports, "startOfWeek", ()=>(0, _indexJsDefault219.default));
parcelHelpers.export(exports, "startOfWeekYear", ()=>(0, _indexJsDefault220.default));
parcelHelpers.export(exports, "startOfYear", ()=>(0, _indexJsDefault221.default));
parcelHelpers.export(exports, "startOfYesterday", ()=>(0, _indexJsDefault222.default));
parcelHelpers.export(exports, "sub", ()=>(0, _indexJsDefault223.default));
parcelHelpers.export(exports, "subBusinessDays", ()=>(0, _indexJsDefault224.default));
parcelHelpers.export(exports, "subDays", ()=>(0, _indexJsDefault225.default));
parcelHelpers.export(exports, "subHours", ()=>(0, _indexJsDefault226.default));
parcelHelpers.export(exports, "subISOWeekYears", ()=>(0, _indexJsDefault227.default));
parcelHelpers.export(exports, "subMilliseconds", ()=>(0, _indexJsDefault228.default));
parcelHelpers.export(exports, "subMinutes", ()=>(0, _indexJsDefault229.default));
parcelHelpers.export(exports, "subMonths", ()=>(0, _indexJsDefault230.default));
parcelHelpers.export(exports, "subQuarters", ()=>(0, _indexJsDefault231.default));
parcelHelpers.export(exports, "subSeconds", ()=>(0, _indexJsDefault232.default));
parcelHelpers.export(exports, "subWeeks", ()=>(0, _indexJsDefault233.default));
parcelHelpers.export(exports, "subYears", ()=>(0, _indexJsDefault234.default));
parcelHelpers.export(exports, "toDate", ()=>(0, _indexJsDefault235.default));
parcelHelpers.export(exports, "weeksToDays", ()=>(0, _indexJsDefault236.default));
parcelHelpers.export(exports, "yearsToMonths", ()=>(0, _indexJsDefault237.default));
parcelHelpers.export(exports, "yearsToQuarters", ()=>(0, _indexJsDefault238.default));
var _indexJs = require("./add/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("./addBusinessDays/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("./addDays/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
var _indexJs3 = require("./addHours/index.js");
var _indexJsDefault3 = parcelHelpers.interopDefault(_indexJs3);
var _indexJs4 = require("./addISOWeekYears/index.js");
var _indexJsDefault4 = parcelHelpers.interopDefault(_indexJs4);
var _indexJs5 = require("./addMilliseconds/index.js");
var _indexJsDefault5 = parcelHelpers.interopDefault(_indexJs5);
var _indexJs6 = require("./addMinutes/index.js");
var _indexJsDefault6 = parcelHelpers.interopDefault(_indexJs6);
var _indexJs7 = require("./addMonths/index.js");
var _indexJsDefault7 = parcelHelpers.interopDefault(_indexJs7);
var _indexJs8 = require("./addQuarters/index.js");
var _indexJsDefault8 = parcelHelpers.interopDefault(_indexJs8);
var _indexJs9 = require("./addSeconds/index.js");
var _indexJsDefault9 = parcelHelpers.interopDefault(_indexJs9);
var _indexJs10 = require("./addWeeks/index.js");
var _indexJsDefault10 = parcelHelpers.interopDefault(_indexJs10);
var _indexJs11 = require("./addYears/index.js");
var _indexJsDefault11 = parcelHelpers.interopDefault(_indexJs11);
var _indexJs12 = require("./areIntervalsOverlapping/index.js");
var _indexJsDefault12 = parcelHelpers.interopDefault(_indexJs12);
var _indexJs13 = require("./clamp/index.js");
var _indexJsDefault13 = parcelHelpers.interopDefault(_indexJs13);
var _indexJs14 = require("./closestIndexTo/index.js");
var _indexJsDefault14 = parcelHelpers.interopDefault(_indexJs14);
var _indexJs15 = require("./closestTo/index.js");
var _indexJsDefault15 = parcelHelpers.interopDefault(_indexJs15);
var _indexJs16 = require("./compareAsc/index.js");
var _indexJsDefault16 = parcelHelpers.interopDefault(_indexJs16);
var _indexJs17 = require("./compareDesc/index.js");
var _indexJsDefault17 = parcelHelpers.interopDefault(_indexJs17);
var _indexJs18 = require("./daysToWeeks/index.js");
var _indexJsDefault18 = parcelHelpers.interopDefault(_indexJs18);
var _indexJs19 = require("./differenceInBusinessDays/index.js");
var _indexJsDefault19 = parcelHelpers.interopDefault(_indexJs19);
var _indexJs20 = require("./differenceInCalendarDays/index.js");
var _indexJsDefault20 = parcelHelpers.interopDefault(_indexJs20);
var _indexJs21 = require("./differenceInCalendarISOWeekYears/index.js");
var _indexJsDefault21 = parcelHelpers.interopDefault(_indexJs21);
var _indexJs22 = require("./differenceInCalendarISOWeeks/index.js");
var _indexJsDefault22 = parcelHelpers.interopDefault(_indexJs22);
var _indexJs23 = require("./differenceInCalendarMonths/index.js");
var _indexJsDefault23 = parcelHelpers.interopDefault(_indexJs23);
var _indexJs24 = require("./differenceInCalendarQuarters/index.js");
var _indexJsDefault24 = parcelHelpers.interopDefault(_indexJs24);
var _indexJs25 = require("./differenceInCalendarWeeks/index.js");
var _indexJsDefault25 = parcelHelpers.interopDefault(_indexJs25);
var _indexJs26 = require("./differenceInCalendarYears/index.js");
var _indexJsDefault26 = parcelHelpers.interopDefault(_indexJs26);
var _indexJs27 = require("./differenceInDays/index.js");
var _indexJsDefault27 = parcelHelpers.interopDefault(_indexJs27);
var _indexJs28 = require("./differenceInHours/index.js");
var _indexJsDefault28 = parcelHelpers.interopDefault(_indexJs28);
var _indexJs29 = require("./differenceInISOWeekYears/index.js");
var _indexJsDefault29 = parcelHelpers.interopDefault(_indexJs29);
var _indexJs30 = require("./differenceInMilliseconds/index.js");
var _indexJsDefault30 = parcelHelpers.interopDefault(_indexJs30);
var _indexJs31 = require("./differenceInMinutes/index.js");
var _indexJsDefault31 = parcelHelpers.interopDefault(_indexJs31);
var _indexJs32 = require("./differenceInMonths/index.js");
var _indexJsDefault32 = parcelHelpers.interopDefault(_indexJs32);
var _indexJs33 = require("./differenceInQuarters/index.js");
var _indexJsDefault33 = parcelHelpers.interopDefault(_indexJs33);
var _indexJs34 = require("./differenceInSeconds/index.js");
var _indexJsDefault34 = parcelHelpers.interopDefault(_indexJs34);
var _indexJs35 = require("./differenceInWeeks/index.js");
var _indexJsDefault35 = parcelHelpers.interopDefault(_indexJs35);
var _indexJs36 = require("./differenceInYears/index.js");
var _indexJsDefault36 = parcelHelpers.interopDefault(_indexJs36);
var _indexJs37 = require("./eachDayOfInterval/index.js");
var _indexJsDefault37 = parcelHelpers.interopDefault(_indexJs37);
var _indexJs38 = require("./eachHourOfInterval/index.js");
var _indexJsDefault38 = parcelHelpers.interopDefault(_indexJs38);
var _indexJs39 = require("./eachMinuteOfInterval/index.js");
var _indexJsDefault39 = parcelHelpers.interopDefault(_indexJs39);
var _indexJs40 = require("./eachMonthOfInterval/index.js");
var _indexJsDefault40 = parcelHelpers.interopDefault(_indexJs40);
var _indexJs41 = require("./eachQuarterOfInterval/index.js");
var _indexJsDefault41 = parcelHelpers.interopDefault(_indexJs41);
var _indexJs42 = require("./eachWeekOfInterval/index.js");
var _indexJsDefault42 = parcelHelpers.interopDefault(_indexJs42);
var _indexJs43 = require("./eachWeekendOfInterval/index.js");
var _indexJsDefault43 = parcelHelpers.interopDefault(_indexJs43);
var _indexJs44 = require("./eachWeekendOfMonth/index.js");
var _indexJsDefault44 = parcelHelpers.interopDefault(_indexJs44);
var _indexJs45 = require("./eachWeekendOfYear/index.js");
var _indexJsDefault45 = parcelHelpers.interopDefault(_indexJs45);
var _indexJs46 = require("./eachYearOfInterval/index.js");
var _indexJsDefault46 = parcelHelpers.interopDefault(_indexJs46);
var _indexJs47 = require("./endOfDay/index.js");
var _indexJsDefault47 = parcelHelpers.interopDefault(_indexJs47);
var _indexJs48 = require("./endOfDecade/index.js");
var _indexJsDefault48 = parcelHelpers.interopDefault(_indexJs48);
var _indexJs49 = require("./endOfHour/index.js");
var _indexJsDefault49 = parcelHelpers.interopDefault(_indexJs49);
var _indexJs50 = require("./endOfISOWeek/index.js");
var _indexJsDefault50 = parcelHelpers.interopDefault(_indexJs50);
var _indexJs51 = require("./endOfISOWeekYear/index.js");
var _indexJsDefault51 = parcelHelpers.interopDefault(_indexJs51);
var _indexJs52 = require("./endOfMinute/index.js");
var _indexJsDefault52 = parcelHelpers.interopDefault(_indexJs52);
var _indexJs53 = require("./endOfMonth/index.js");
var _indexJsDefault53 = parcelHelpers.interopDefault(_indexJs53);
var _indexJs54 = require("./endOfQuarter/index.js");
var _indexJsDefault54 = parcelHelpers.interopDefault(_indexJs54);
var _indexJs55 = require("./endOfSecond/index.js");
var _indexJsDefault55 = parcelHelpers.interopDefault(_indexJs55);
var _indexJs56 = require("./endOfToday/index.js");
var _indexJsDefault56 = parcelHelpers.interopDefault(_indexJs56);
var _indexJs57 = require("./endOfTomorrow/index.js");
var _indexJsDefault57 = parcelHelpers.interopDefault(_indexJs57);
var _indexJs58 = require("./endOfWeek/index.js");
var _indexJsDefault58 = parcelHelpers.interopDefault(_indexJs58);
var _indexJs59 = require("./endOfYear/index.js");
var _indexJsDefault59 = parcelHelpers.interopDefault(_indexJs59);
var _indexJs60 = require("./endOfYesterday/index.js");
var _indexJsDefault60 = parcelHelpers.interopDefault(_indexJs60);
var _indexJs61 = require("./format/index.js");
var _indexJsDefault61 = parcelHelpers.interopDefault(_indexJs61);
var _indexJs62 = require("./formatDistance/index.js");
var _indexJsDefault62 = parcelHelpers.interopDefault(_indexJs62);
var _indexJs63 = require("./formatDistanceStrict/index.js");
var _indexJsDefault63 = parcelHelpers.interopDefault(_indexJs63);
var _indexJs64 = require("./formatDistanceToNow/index.js");
var _indexJsDefault64 = parcelHelpers.interopDefault(_indexJs64);
var _indexJs65 = require("./formatDistanceToNowStrict/index.js");
var _indexJsDefault65 = parcelHelpers.interopDefault(_indexJs65);
var _indexJs66 = require("./formatDuration/index.js");
var _indexJsDefault66 = parcelHelpers.interopDefault(_indexJs66);
var _indexJs67 = require("./formatISO/index.js");
var _indexJsDefault67 = parcelHelpers.interopDefault(_indexJs67);
var _indexJs68 = require("./formatISO9075/index.js");
var _indexJsDefault68 = parcelHelpers.interopDefault(_indexJs68);
var _indexJs69 = require("./formatISODuration/index.js");
var _indexJsDefault69 = parcelHelpers.interopDefault(_indexJs69);
var _indexJs70 = require("./formatRFC3339/index.js");
var _indexJsDefault70 = parcelHelpers.interopDefault(_indexJs70);
var _indexJs71 = require("./formatRFC7231/index.js");
var _indexJsDefault71 = parcelHelpers.interopDefault(_indexJs71);
var _indexJs72 = require("./formatRelative/index.js");
var _indexJsDefault72 = parcelHelpers.interopDefault(_indexJs72);
var _indexJs73 = require("./fromUnixTime/index.js");
var _indexJsDefault73 = parcelHelpers.interopDefault(_indexJs73);
var _indexJs74 = require("./getDate/index.js");
var _indexJsDefault74 = parcelHelpers.interopDefault(_indexJs74);
var _indexJs75 = require("./getDay/index.js");
var _indexJsDefault75 = parcelHelpers.interopDefault(_indexJs75);
var _indexJs76 = require("./getDayOfYear/index.js");
var _indexJsDefault76 = parcelHelpers.interopDefault(_indexJs76);
var _indexJs77 = require("./getDaysInMonth/index.js");
var _indexJsDefault77 = parcelHelpers.interopDefault(_indexJs77);
var _indexJs78 = require("./getDaysInYear/index.js");
var _indexJsDefault78 = parcelHelpers.interopDefault(_indexJs78);
var _indexJs79 = require("./getDecade/index.js");
var _indexJsDefault79 = parcelHelpers.interopDefault(_indexJs79);
var _indexJs80 = require("./getDefaultOptions/index.js");
var _indexJsDefault80 = parcelHelpers.interopDefault(_indexJs80);
var _indexJs81 = require("./getHours/index.js");
var _indexJsDefault81 = parcelHelpers.interopDefault(_indexJs81);
var _indexJs82 = require("./getISODay/index.js");
var _indexJsDefault82 = parcelHelpers.interopDefault(_indexJs82);
var _indexJs83 = require("./getISOWeek/index.js");
var _indexJsDefault83 = parcelHelpers.interopDefault(_indexJs83);
var _indexJs84 = require("./getISOWeekYear/index.js");
var _indexJsDefault84 = parcelHelpers.interopDefault(_indexJs84);
var _indexJs85 = require("./getISOWeeksInYear/index.js");
var _indexJsDefault85 = parcelHelpers.interopDefault(_indexJs85);
var _indexJs86 = require("./getMilliseconds/index.js");
var _indexJsDefault86 = parcelHelpers.interopDefault(_indexJs86);
var _indexJs87 = require("./getMinutes/index.js");
var _indexJsDefault87 = parcelHelpers.interopDefault(_indexJs87);
var _indexJs88 = require("./getMonth/index.js");
var _indexJsDefault88 = parcelHelpers.interopDefault(_indexJs88);
var _indexJs89 = require("./getOverlappingDaysInIntervals/index.js");
var _indexJsDefault89 = parcelHelpers.interopDefault(_indexJs89);
var _indexJs90 = require("./getQuarter/index.js");
var _indexJsDefault90 = parcelHelpers.interopDefault(_indexJs90);
var _indexJs91 = require("./getSeconds/index.js");
var _indexJsDefault91 = parcelHelpers.interopDefault(_indexJs91);
var _indexJs92 = require("./getTime/index.js");
var _indexJsDefault92 = parcelHelpers.interopDefault(_indexJs92);
var _indexJs93 = require("./getUnixTime/index.js");
var _indexJsDefault93 = parcelHelpers.interopDefault(_indexJs93);
var _indexJs94 = require("./getWeek/index.js");
var _indexJsDefault94 = parcelHelpers.interopDefault(_indexJs94);
var _indexJs95 = require("./getWeekOfMonth/index.js");
var _indexJsDefault95 = parcelHelpers.interopDefault(_indexJs95);
var _indexJs96 = require("./getWeekYear/index.js");
var _indexJsDefault96 = parcelHelpers.interopDefault(_indexJs96);
var _indexJs97 = require("./getWeeksInMonth/index.js");
var _indexJsDefault97 = parcelHelpers.interopDefault(_indexJs97);
var _indexJs98 = require("./getYear/index.js");
var _indexJsDefault98 = parcelHelpers.interopDefault(_indexJs98);
var _indexJs99 = require("./hoursToMilliseconds/index.js");
var _indexJsDefault99 = parcelHelpers.interopDefault(_indexJs99);
var _indexJs100 = require("./hoursToMinutes/index.js");
var _indexJsDefault100 = parcelHelpers.interopDefault(_indexJs100);
var _indexJs101 = require("./hoursToSeconds/index.js");
var _indexJsDefault101 = parcelHelpers.interopDefault(_indexJs101);
var _indexJs102 = require("./intervalToDuration/index.js");
var _indexJsDefault102 = parcelHelpers.interopDefault(_indexJs102);
var _indexJs103 = require("./intlFormat/index.js");
var _indexJsDefault103 = parcelHelpers.interopDefault(_indexJs103);
var _indexJs104 = require("./intlFormatDistance/index.js");
var _indexJsDefault104 = parcelHelpers.interopDefault(_indexJs104);
var _indexJs105 = require("./isAfter/index.js");
var _indexJsDefault105 = parcelHelpers.interopDefault(_indexJs105);
var _indexJs106 = require("./isBefore/index.js");
var _indexJsDefault106 = parcelHelpers.interopDefault(_indexJs106);
var _indexJs107 = require("./isDate/index.js");
var _indexJsDefault107 = parcelHelpers.interopDefault(_indexJs107);
var _indexJs108 = require("./isEqual/index.js");
var _indexJsDefault108 = parcelHelpers.interopDefault(_indexJs108);
var _indexJs109 = require("./isExists/index.js");
var _indexJsDefault109 = parcelHelpers.interopDefault(_indexJs109);
var _indexJs110 = require("./isFirstDayOfMonth/index.js");
var _indexJsDefault110 = parcelHelpers.interopDefault(_indexJs110);
var _indexJs111 = require("./isFriday/index.js");
var _indexJsDefault111 = parcelHelpers.interopDefault(_indexJs111);
var _indexJs112 = require("./isFuture/index.js");
var _indexJsDefault112 = parcelHelpers.interopDefault(_indexJs112);
var _indexJs113 = require("./isLastDayOfMonth/index.js");
var _indexJsDefault113 = parcelHelpers.interopDefault(_indexJs113);
var _indexJs114 = require("./isLeapYear/index.js");
var _indexJsDefault114 = parcelHelpers.interopDefault(_indexJs114);
var _indexJs115 = require("./isMatch/index.js");
var _indexJsDefault115 = parcelHelpers.interopDefault(_indexJs115);
var _indexJs116 = require("./isMonday/index.js");
var _indexJsDefault116 = parcelHelpers.interopDefault(_indexJs116);
var _indexJs117 = require("./isPast/index.js");
var _indexJsDefault117 = parcelHelpers.interopDefault(_indexJs117);
var _indexJs118 = require("./isSameDay/index.js");
var _indexJsDefault118 = parcelHelpers.interopDefault(_indexJs118);
var _indexJs119 = require("./isSameHour/index.js");
var _indexJsDefault119 = parcelHelpers.interopDefault(_indexJs119);
var _indexJs120 = require("./isSameISOWeek/index.js");
var _indexJsDefault120 = parcelHelpers.interopDefault(_indexJs120);
var _indexJs121 = require("./isSameISOWeekYear/index.js");
var _indexJsDefault121 = parcelHelpers.interopDefault(_indexJs121);
var _indexJs122 = require("./isSameMinute/index.js");
var _indexJsDefault122 = parcelHelpers.interopDefault(_indexJs122);
var _indexJs123 = require("./isSameMonth/index.js");
var _indexJsDefault123 = parcelHelpers.interopDefault(_indexJs123);
var _indexJs124 = require("./isSameQuarter/index.js");
var _indexJsDefault124 = parcelHelpers.interopDefault(_indexJs124);
var _indexJs125 = require("./isSameSecond/index.js");
var _indexJsDefault125 = parcelHelpers.interopDefault(_indexJs125);
var _indexJs126 = require("./isSameWeek/index.js");
var _indexJsDefault126 = parcelHelpers.interopDefault(_indexJs126);
var _indexJs127 = require("./isSameYear/index.js");
var _indexJsDefault127 = parcelHelpers.interopDefault(_indexJs127);
var _indexJs128 = require("./isSaturday/index.js");
var _indexJsDefault128 = parcelHelpers.interopDefault(_indexJs128);
var _indexJs129 = require("./isSunday/index.js");
var _indexJsDefault129 = parcelHelpers.interopDefault(_indexJs129);
var _indexJs130 = require("./isThisHour/index.js");
var _indexJsDefault130 = parcelHelpers.interopDefault(_indexJs130);
var _indexJs131 = require("./isThisISOWeek/index.js");
var _indexJsDefault131 = parcelHelpers.interopDefault(_indexJs131);
var _indexJs132 = require("./isThisMinute/index.js");
var _indexJsDefault132 = parcelHelpers.interopDefault(_indexJs132);
var _indexJs133 = require("./isThisMonth/index.js");
var _indexJsDefault133 = parcelHelpers.interopDefault(_indexJs133);
var _indexJs134 = require("./isThisQuarter/index.js");
var _indexJsDefault134 = parcelHelpers.interopDefault(_indexJs134);
var _indexJs135 = require("./isThisSecond/index.js");
var _indexJsDefault135 = parcelHelpers.interopDefault(_indexJs135);
var _indexJs136 = require("./isThisWeek/index.js");
var _indexJsDefault136 = parcelHelpers.interopDefault(_indexJs136);
var _indexJs137 = require("./isThisYear/index.js");
var _indexJsDefault137 = parcelHelpers.interopDefault(_indexJs137);
var _indexJs138 = require("./isThursday/index.js");
var _indexJsDefault138 = parcelHelpers.interopDefault(_indexJs138);
var _indexJs139 = require("./isToday/index.js");
var _indexJsDefault139 = parcelHelpers.interopDefault(_indexJs139);
var _indexJs140 = require("./isTomorrow/index.js");
var _indexJsDefault140 = parcelHelpers.interopDefault(_indexJs140);
var _indexJs141 = require("./isTuesday/index.js");
var _indexJsDefault141 = parcelHelpers.interopDefault(_indexJs141);
var _indexJs142 = require("./isValid/index.js");
var _indexJsDefault142 = parcelHelpers.interopDefault(_indexJs142);
var _indexJs143 = require("./isWednesday/index.js");
var _indexJsDefault143 = parcelHelpers.interopDefault(_indexJs143);
var _indexJs144 = require("./isWeekend/index.js");
var _indexJsDefault144 = parcelHelpers.interopDefault(_indexJs144);
var _indexJs145 = require("./isWithinInterval/index.js");
var _indexJsDefault145 = parcelHelpers.interopDefault(_indexJs145);
var _indexJs146 = require("./isYesterday/index.js");
var _indexJsDefault146 = parcelHelpers.interopDefault(_indexJs146);
var _indexJs147 = require("./lastDayOfDecade/index.js");
var _indexJsDefault147 = parcelHelpers.interopDefault(_indexJs147);
var _indexJs148 = require("./lastDayOfISOWeek/index.js");
var _indexJsDefault148 = parcelHelpers.interopDefault(_indexJs148);
var _indexJs149 = require("./lastDayOfISOWeekYear/index.js");
var _indexJsDefault149 = parcelHelpers.interopDefault(_indexJs149);
var _indexJs150 = require("./lastDayOfMonth/index.js");
var _indexJsDefault150 = parcelHelpers.interopDefault(_indexJs150);
var _indexJs151 = require("./lastDayOfQuarter/index.js");
var _indexJsDefault151 = parcelHelpers.interopDefault(_indexJs151);
var _indexJs152 = require("./lastDayOfWeek/index.js");
var _indexJsDefault152 = parcelHelpers.interopDefault(_indexJs152);
var _indexJs153 = require("./lastDayOfYear/index.js");
var _indexJsDefault153 = parcelHelpers.interopDefault(_indexJs153);
var _indexJs154 = require("./lightFormat/index.js");
var _indexJsDefault154 = parcelHelpers.interopDefault(_indexJs154);
var _indexJs155 = require("./max/index.js");
var _indexJsDefault155 = parcelHelpers.interopDefault(_indexJs155);
var _indexJs156 = require("./milliseconds/index.js");
var _indexJsDefault156 = parcelHelpers.interopDefault(_indexJs156);
var _indexJs157 = require("./millisecondsToHours/index.js");
var _indexJsDefault157 = parcelHelpers.interopDefault(_indexJs157);
var _indexJs158 = require("./millisecondsToMinutes/index.js");
var _indexJsDefault158 = parcelHelpers.interopDefault(_indexJs158);
var _indexJs159 = require("./millisecondsToSeconds/index.js");
var _indexJsDefault159 = parcelHelpers.interopDefault(_indexJs159);
var _indexJs160 = require("./min/index.js");
var _indexJsDefault160 = parcelHelpers.interopDefault(_indexJs160);
var _indexJs161 = require("./minutesToHours/index.js");
var _indexJsDefault161 = parcelHelpers.interopDefault(_indexJs161);
var _indexJs162 = require("./minutesToMilliseconds/index.js");
var _indexJsDefault162 = parcelHelpers.interopDefault(_indexJs162);
var _indexJs163 = require("./minutesToSeconds/index.js");
var _indexJsDefault163 = parcelHelpers.interopDefault(_indexJs163);
var _indexJs164 = require("./monthsToQuarters/index.js");
var _indexJsDefault164 = parcelHelpers.interopDefault(_indexJs164);
var _indexJs165 = require("./monthsToYears/index.js");
var _indexJsDefault165 = parcelHelpers.interopDefault(_indexJs165);
var _indexJs166 = require("./nextDay/index.js");
var _indexJsDefault166 = parcelHelpers.interopDefault(_indexJs166);
var _indexJs167 = require("./nextFriday/index.js");
var _indexJsDefault167 = parcelHelpers.interopDefault(_indexJs167);
var _indexJs168 = require("./nextMonday/index.js");
var _indexJsDefault168 = parcelHelpers.interopDefault(_indexJs168);
var _indexJs169 = require("./nextSaturday/index.js");
var _indexJsDefault169 = parcelHelpers.interopDefault(_indexJs169);
var _indexJs170 = require("./nextSunday/index.js");
var _indexJsDefault170 = parcelHelpers.interopDefault(_indexJs170);
var _indexJs171 = require("./nextThursday/index.js");
var _indexJsDefault171 = parcelHelpers.interopDefault(_indexJs171);
var _indexJs172 = require("./nextTuesday/index.js");
var _indexJsDefault172 = parcelHelpers.interopDefault(_indexJs172);
var _indexJs173 = require("./nextWednesday/index.js");
var _indexJsDefault173 = parcelHelpers.interopDefault(_indexJs173);
var _indexJs174 = require("./parse/index.js");
var _indexJsDefault174 = parcelHelpers.interopDefault(_indexJs174);
var _indexJs175 = require("./parseISO/index.js");
var _indexJsDefault175 = parcelHelpers.interopDefault(_indexJs175);
var _indexJs176 = require("./parseJSON/index.js");
var _indexJsDefault176 = parcelHelpers.interopDefault(_indexJs176);
var _indexJs177 = require("./previousDay/index.js");
var _indexJsDefault177 = parcelHelpers.interopDefault(_indexJs177);
var _indexJs178 = require("./previousFriday/index.js");
var _indexJsDefault178 = parcelHelpers.interopDefault(_indexJs178);
var _indexJs179 = require("./previousMonday/index.js");
var _indexJsDefault179 = parcelHelpers.interopDefault(_indexJs179);
var _indexJs180 = require("./previousSaturday/index.js");
var _indexJsDefault180 = parcelHelpers.interopDefault(_indexJs180);
var _indexJs181 = require("./previousSunday/index.js");
var _indexJsDefault181 = parcelHelpers.interopDefault(_indexJs181);
var _indexJs182 = require("./previousThursday/index.js");
var _indexJsDefault182 = parcelHelpers.interopDefault(_indexJs182);
var _indexJs183 = require("./previousTuesday/index.js");
var _indexJsDefault183 = parcelHelpers.interopDefault(_indexJs183);
var _indexJs184 = require("./previousWednesday/index.js");
var _indexJsDefault184 = parcelHelpers.interopDefault(_indexJs184);
var _indexJs185 = require("./quartersToMonths/index.js");
var _indexJsDefault185 = parcelHelpers.interopDefault(_indexJs185);
var _indexJs186 = require("./quartersToYears/index.js");
var _indexJsDefault186 = parcelHelpers.interopDefault(_indexJs186);
var _indexJs187 = require("./roundToNearestMinutes/index.js");
var _indexJsDefault187 = parcelHelpers.interopDefault(_indexJs187);
var _indexJs188 = require("./secondsToHours/index.js");
var _indexJsDefault188 = parcelHelpers.interopDefault(_indexJs188);
var _indexJs189 = require("./secondsToMilliseconds/index.js");
var _indexJsDefault189 = parcelHelpers.interopDefault(_indexJs189);
var _indexJs190 = require("./secondsToMinutes/index.js");
var _indexJsDefault190 = parcelHelpers.interopDefault(_indexJs190);
var _indexJs191 = require("./set/index.js");
var _indexJsDefault191 = parcelHelpers.interopDefault(_indexJs191);
var _indexJs192 = require("./setDate/index.js");
var _indexJsDefault192 = parcelHelpers.interopDefault(_indexJs192);
var _indexJs193 = require("./setDay/index.js");
var _indexJsDefault193 = parcelHelpers.interopDefault(_indexJs193);
var _indexJs194 = require("./setDayOfYear/index.js");
var _indexJsDefault194 = parcelHelpers.interopDefault(_indexJs194);
var _indexJs195 = require("./setDefaultOptions/index.js");
var _indexJsDefault195 = parcelHelpers.interopDefault(_indexJs195);
var _indexJs196 = require("./setHours/index.js");
var _indexJsDefault196 = parcelHelpers.interopDefault(_indexJs196);
var _indexJs197 = require("./setISODay/index.js");
var _indexJsDefault197 = parcelHelpers.interopDefault(_indexJs197);
var _indexJs198 = require("./setISOWeek/index.js");
var _indexJsDefault198 = parcelHelpers.interopDefault(_indexJs198);
var _indexJs199 = require("./setISOWeekYear/index.js");
var _indexJsDefault199 = parcelHelpers.interopDefault(_indexJs199);
var _indexJs200 = require("./setMilliseconds/index.js");
var _indexJsDefault200 = parcelHelpers.interopDefault(_indexJs200);
var _indexJs201 = require("./setMinutes/index.js");
var _indexJsDefault201 = parcelHelpers.interopDefault(_indexJs201);
var _indexJs202 = require("./setMonth/index.js");
var _indexJsDefault202 = parcelHelpers.interopDefault(_indexJs202);
var _indexJs203 = require("./setQuarter/index.js");
var _indexJsDefault203 = parcelHelpers.interopDefault(_indexJs203);
var _indexJs204 = require("./setSeconds/index.js");
var _indexJsDefault204 = parcelHelpers.interopDefault(_indexJs204);
var _indexJs205 = require("./setWeek/index.js");
var _indexJsDefault205 = parcelHelpers.interopDefault(_indexJs205);
var _indexJs206 = require("./setWeekYear/index.js");
var _indexJsDefault206 = parcelHelpers.interopDefault(_indexJs206);
var _indexJs207 = require("./setYear/index.js");
var _indexJsDefault207 = parcelHelpers.interopDefault(_indexJs207);
var _indexJs208 = require("./startOfDay/index.js");
var _indexJsDefault208 = parcelHelpers.interopDefault(_indexJs208);
var _indexJs209 = require("./startOfDecade/index.js");
var _indexJsDefault209 = parcelHelpers.interopDefault(_indexJs209);
var _indexJs210 = require("./startOfHour/index.js");
var _indexJsDefault210 = parcelHelpers.interopDefault(_indexJs210);
var _indexJs211 = require("./startOfISOWeek/index.js");
var _indexJsDefault211 = parcelHelpers.interopDefault(_indexJs211);
var _indexJs212 = require("./startOfISOWeekYear/index.js");
var _indexJsDefault212 = parcelHelpers.interopDefault(_indexJs212);
var _indexJs213 = require("./startOfMinute/index.js");
var _indexJsDefault213 = parcelHelpers.interopDefault(_indexJs213);
var _indexJs214 = require("./startOfMonth/index.js");
var _indexJsDefault214 = parcelHelpers.interopDefault(_indexJs214);
var _indexJs215 = require("./startOfQuarter/index.js");
var _indexJsDefault215 = parcelHelpers.interopDefault(_indexJs215);
var _indexJs216 = require("./startOfSecond/index.js");
var _indexJsDefault216 = parcelHelpers.interopDefault(_indexJs216);
var _indexJs217 = require("./startOfToday/index.js");
var _indexJsDefault217 = parcelHelpers.interopDefault(_indexJs217);
var _indexJs218 = require("./startOfTomorrow/index.js");
var _indexJsDefault218 = parcelHelpers.interopDefault(_indexJs218);
var _indexJs219 = require("./startOfWeek/index.js");
var _indexJsDefault219 = parcelHelpers.interopDefault(_indexJs219);
var _indexJs220 = require("./startOfWeekYear/index.js");
var _indexJsDefault220 = parcelHelpers.interopDefault(_indexJs220);
var _indexJs221 = require("./startOfYear/index.js");
var _indexJsDefault221 = parcelHelpers.interopDefault(_indexJs221);
var _indexJs222 = require("./startOfYesterday/index.js");
var _indexJsDefault222 = parcelHelpers.interopDefault(_indexJs222);
var _indexJs223 = require("./sub/index.js");
var _indexJsDefault223 = parcelHelpers.interopDefault(_indexJs223);
var _indexJs224 = require("./subBusinessDays/index.js");
var _indexJsDefault224 = parcelHelpers.interopDefault(_indexJs224);
var _indexJs225 = require("./subDays/index.js");
var _indexJsDefault225 = parcelHelpers.interopDefault(_indexJs225);
var _indexJs226 = require("./subHours/index.js");
var _indexJsDefault226 = parcelHelpers.interopDefault(_indexJs226);
var _indexJs227 = require("./subISOWeekYears/index.js");
var _indexJsDefault227 = parcelHelpers.interopDefault(_indexJs227);
var _indexJs228 = require("./subMilliseconds/index.js");
var _indexJsDefault228 = parcelHelpers.interopDefault(_indexJs228);
var _indexJs229 = require("./subMinutes/index.js");
var _indexJsDefault229 = parcelHelpers.interopDefault(_indexJs229);
var _indexJs230 = require("./subMonths/index.js");
var _indexJsDefault230 = parcelHelpers.interopDefault(_indexJs230);
var _indexJs231 = require("./subQuarters/index.js");
var _indexJsDefault231 = parcelHelpers.interopDefault(_indexJs231);
var _indexJs232 = require("./subSeconds/index.js");
var _indexJsDefault232 = parcelHelpers.interopDefault(_indexJs232);
var _indexJs233 = require("./subWeeks/index.js");
var _indexJsDefault233 = parcelHelpers.interopDefault(_indexJs233);
var _indexJs234 = require("./subYears/index.js");
var _indexJsDefault234 = parcelHelpers.interopDefault(_indexJs234);
var _indexJs235 = require("./toDate/index.js");
var _indexJsDefault235 = parcelHelpers.interopDefault(_indexJs235);
var _indexJs236 = require("./weeksToDays/index.js");
var _indexJsDefault236 = parcelHelpers.interopDefault(_indexJs236);
var _indexJs237 = require("./yearsToMonths/index.js");
var _indexJsDefault237 = parcelHelpers.interopDefault(_indexJs237);
var _indexJs238 = require("./yearsToQuarters/index.js");
var _indexJsDefault238 = parcelHelpers.interopDefault(_indexJs238);
var _indexJs239 = require("./constants/index.js");
parcelHelpers.exportAll(_indexJs239, exports);

},{"./add/index.js":false,"./addBusinessDays/index.js":false,"./addDays/index.js":false,"./addHours/index.js":false,"./addISOWeekYears/index.js":false,"./addMilliseconds/index.js":"7n8yB","./addMinutes/index.js":false,"./addMonths/index.js":false,"./addQuarters/index.js":false,"./addSeconds/index.js":false,"./addWeeks/index.js":false,"./addYears/index.js":false,"./areIntervalsOverlapping/index.js":false,"./clamp/index.js":false,"./closestIndexTo/index.js":false,"./closestTo/index.js":false,"./compareAsc/index.js":false,"./compareDesc/index.js":false,"./daysToWeeks/index.js":false,"./differenceInBusinessDays/index.js":false,"./differenceInCalendarDays/index.js":false,"./differenceInCalendarISOWeekYears/index.js":false,"./differenceInCalendarISOWeeks/index.js":false,"./differenceInCalendarMonths/index.js":false,"./differenceInCalendarQuarters/index.js":false,"./differenceInCalendarWeeks/index.js":false,"./differenceInCalendarYears/index.js":false,"./differenceInDays/index.js":false,"./differenceInHours/index.js":false,"./differenceInISOWeekYears/index.js":false,"./differenceInMilliseconds/index.js":false,"./differenceInMinutes/index.js":false,"./differenceInMonths/index.js":false,"./differenceInQuarters/index.js":false,"./differenceInSeconds/index.js":false,"./differenceInWeeks/index.js":false,"./differenceInYears/index.js":false,"./eachDayOfInterval/index.js":false,"./eachHourOfInterval/index.js":false,"./eachMinuteOfInterval/index.js":false,"./eachMonthOfInterval/index.js":false,"./eachQuarterOfInterval/index.js":false,"./eachWeekOfInterval/index.js":false,"./eachWeekendOfInterval/index.js":false,"./eachWeekendOfMonth/index.js":false,"./eachWeekendOfYear/index.js":false,"./eachYearOfInterval/index.js":false,"./endOfDay/index.js":false,"./endOfDecade/index.js":false,"./endOfHour/index.js":false,"./endOfISOWeek/index.js":false,"./endOfISOWeekYear/index.js":false,"./endOfMinute/index.js":false,"./endOfMonth/index.js":false,"./endOfQuarter/index.js":false,"./endOfSecond/index.js":false,"./endOfToday/index.js":false,"./endOfTomorrow/index.js":false,"./endOfWeek/index.js":false,"./endOfYear/index.js":false,"./endOfYesterday/index.js":false,"./format/index.js":"jQ9NH","./formatDistance/index.js":false,"./formatDistanceStrict/index.js":false,"./formatDistanceToNow/index.js":false,"./formatDistanceToNowStrict/index.js":false,"./formatDuration/index.js":false,"./formatISO/index.js":false,"./formatISO9075/index.js":false,"./formatISODuration/index.js":false,"./formatRFC3339/index.js":false,"./formatRFC7231/index.js":false,"./formatRelative/index.js":false,"./fromUnixTime/index.js":false,"./getDate/index.js":false,"./getDay/index.js":false,"./getDayOfYear/index.js":false,"./getDaysInMonth/index.js":false,"./getDaysInYear/index.js":false,"./getDecade/index.js":false,"./getDefaultOptions/index.js":false,"./getHours/index.js":false,"./getISODay/index.js":false,"./getISOWeek/index.js":false,"./getISOWeekYear/index.js":false,"./getISOWeeksInYear/index.js":false,"./getMilliseconds/index.js":false,"./getMinutes/index.js":false,"./getMonth/index.js":false,"./getOverlappingDaysInIntervals/index.js":false,"./getQuarter/index.js":false,"./getSeconds/index.js":false,"./getTime/index.js":false,"./getUnixTime/index.js":false,"./getWeek/index.js":false,"./getWeekOfMonth/index.js":false,"./getWeekYear/index.js":false,"./getWeeksInMonth/index.js":false,"./getYear/index.js":false,"./hoursToMilliseconds/index.js":false,"./hoursToMinutes/index.js":false,"./hoursToSeconds/index.js":false,"./intervalToDuration/index.js":false,"./intlFormat/index.js":false,"./intlFormatDistance/index.js":false,"./isAfter/index.js":false,"./isBefore/index.js":false,"./isDate/index.js":"ectA5","./isEqual/index.js":false,"./isExists/index.js":false,"./isFirstDayOfMonth/index.js":false,"./isFriday/index.js":false,"./isFuture/index.js":false,"./isLastDayOfMonth/index.js":false,"./isLeapYear/index.js":false,"./isMatch/index.js":false,"./isMonday/index.js":false,"./isPast/index.js":false,"./isSameDay/index.js":false,"./isSameHour/index.js":false,"./isSameISOWeek/index.js":false,"./isSameISOWeekYear/index.js":false,"./isSameMinute/index.js":false,"./isSameMonth/index.js":false,"./isSameQuarter/index.js":false,"./isSameSecond/index.js":false,"./isSameWeek/index.js":false,"./isSameYear/index.js":false,"./isSaturday/index.js":false,"./isSunday/index.js":false,"./isThisHour/index.js":false,"./isThisISOWeek/index.js":false,"./isThisMinute/index.js":false,"./isThisMonth/index.js":false,"./isThisQuarter/index.js":false,"./isThisSecond/index.js":false,"./isThisWeek/index.js":false,"./isThisYear/index.js":false,"./isThursday/index.js":false,"./isToday/index.js":false,"./isTomorrow/index.js":false,"./isTuesday/index.js":false,"./isValid/index.js":"24Ebo","./isWednesday/index.js":false,"./isWeekend/index.js":false,"./isWithinInterval/index.js":false,"./isYesterday/index.js":false,"./lastDayOfDecade/index.js":false,"./lastDayOfISOWeek/index.js":false,"./lastDayOfISOWeekYear/index.js":false,"./lastDayOfMonth/index.js":false,"./lastDayOfQuarter/index.js":false,"./lastDayOfWeek/index.js":false,"./lastDayOfYear/index.js":false,"./lightFormat/index.js":false,"./max/index.js":false,"./milliseconds/index.js":false,"./millisecondsToHours/index.js":false,"./millisecondsToMinutes/index.js":false,"./millisecondsToSeconds/index.js":false,"./min/index.js":false,"./minutesToHours/index.js":false,"./minutesToMilliseconds/index.js":false,"./minutesToSeconds/index.js":false,"./monthsToQuarters/index.js":false,"./monthsToYears/index.js":false,"./nextDay/index.js":false,"./nextFriday/index.js":false,"./nextMonday/index.js":false,"./nextSaturday/index.js":false,"./nextSunday/index.js":false,"./nextThursday/index.js":false,"./nextTuesday/index.js":false,"./nextWednesday/index.js":false,"./parse/index.js":false,"./parseISO/index.js":false,"./parseJSON/index.js":false,"./previousDay/index.js":false,"./previousFriday/index.js":false,"./previousMonday/index.js":false,"./previousSaturday/index.js":false,"./previousSunday/index.js":false,"./previousThursday/index.js":false,"./previousTuesday/index.js":false,"./previousWednesday/index.js":false,"./quartersToMonths/index.js":false,"./quartersToYears/index.js":false,"./roundToNearestMinutes/index.js":false,"./secondsToHours/index.js":false,"./secondsToMilliseconds/index.js":false,"./secondsToMinutes/index.js":false,"./set/index.js":false,"./setDate/index.js":false,"./setDay/index.js":false,"./setDayOfYear/index.js":false,"./setDefaultOptions/index.js":false,"./setHours/index.js":false,"./setISODay/index.js":false,"./setISOWeek/index.js":false,"./setISOWeekYear/index.js":false,"./setMilliseconds/index.js":false,"./setMinutes/index.js":false,"./setMonth/index.js":false,"./setQuarter/index.js":false,"./setSeconds/index.js":false,"./setWeek/index.js":false,"./setWeekYear/index.js":false,"./setYear/index.js":false,"./startOfDay/index.js":false,"./startOfDecade/index.js":false,"./startOfHour/index.js":false,"./startOfISOWeek/index.js":false,"./startOfISOWeekYear/index.js":false,"./startOfMinute/index.js":false,"./startOfMonth/index.js":false,"./startOfQuarter/index.js":false,"./startOfSecond/index.js":false,"./startOfToday/index.js":false,"./startOfTomorrow/index.js":false,"./startOfWeek/index.js":false,"./startOfWeekYear/index.js":false,"./startOfYear/index.js":false,"./startOfYesterday/index.js":false,"./sub/index.js":false,"./subBusinessDays/index.js":false,"./subDays/index.js":false,"./subHours/index.js":false,"./subISOWeekYears/index.js":false,"./subMilliseconds/index.js":"lscGa","./subMinutes/index.js":false,"./subMonths/index.js":false,"./subQuarters/index.js":false,"./subSeconds/index.js":false,"./subWeeks/index.js":false,"./subYears/index.js":false,"./toDate/index.js":"aBwSY","./weeksToDays/index.js":false,"./yearsToMonths/index.js":false,"./yearsToQuarters/index.js":false,"./constants/index.js":"24Hck","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"7n8yB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../_lib/toInteger/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../toDate/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../_lib/requiredArgs/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
function addMilliseconds(dirtyDate, dirtyAmount) {
    (0, _indexJsDefault2.default)(2, arguments);
    var timestamp = (0, _indexJsDefault1.default)(dirtyDate).getTime();
    var amount = (0, _indexJsDefault.default)(dirtyAmount);
    return new Date(timestamp + amount);
}
exports.default = addMilliseconds;

},{"../_lib/toInteger/index.js":"aBFIm","../toDate/index.js":"aBwSY","../_lib/requiredArgs/index.js":"gCfW8","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"aBFIm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function toInteger(dirtyNumber) {
    if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) return NaN;
    var number = Number(dirtyNumber);
    if (isNaN(number)) return number;
    return number < 0 ? Math.ceil(number) : Math.floor(number);
}
exports.default = toInteger;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"aBwSY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../_lib/requiredArgs/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function _typeof(obj) {
        return typeof obj;
    };
    else _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    return _typeof(obj);
}
function toDate(argument) {
    (0, _indexJsDefault.default)(1, arguments);
    var argStr = Object.prototype.toString.call(argument); // Clone the date
    if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
    else if (typeof argument === "number" || argStr === "[object Number]") return new Date(argument);
    else {
        if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
            // eslint-disable-next-line no-console
            console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console
            console.warn(new Error().stack);
        }
        return new Date(NaN);
    }
}
exports.default = toDate;

},{"../_lib/requiredArgs/index.js":"gCfW8","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"gCfW8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function requiredArgs(required, args) {
    if (args.length < required) throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
}
exports.default = requiredArgs;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"jQ9NH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../isValid/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../subMilliseconds/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../toDate/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
var _indexJs3 = require("../_lib/format/formatters/index.js");
var _indexJsDefault3 = parcelHelpers.interopDefault(_indexJs3);
var _indexJs4 = require("../_lib/format/longFormatters/index.js");
var _indexJsDefault4 = parcelHelpers.interopDefault(_indexJs4);
var _indexJs5 = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");
var _indexJsDefault5 = parcelHelpers.interopDefault(_indexJs5);
var _indexJs6 = require("../_lib/protectedTokens/index.js");
var _indexJs7 = require("../_lib/toInteger/index.js");
var _indexJsDefault6 = parcelHelpers.interopDefault(_indexJs7);
var _indexJs8 = require("../_lib/requiredArgs/index.js");
var _indexJsDefault7 = parcelHelpers.interopDefault(_indexJs8);
var _indexJs9 = require("../_lib/defaultOptions/index.js");
var _indexJs10 = require("../_lib/defaultLocale/index.js"); // This RegExp consists of three parts separated by `|`:
var _indexJsDefault8 = parcelHelpers.interopDefault(_indexJs10);
// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
//   (one of the certain letters followed by `o`)
// - (\w)\1* matches any sequences of the same letter
// - '' matches two quote characters in a row
// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
//   except a single quote symbol, which ends the sequence.
//   Two quote characters do not end the sequence.
//   If there is no matching single quote
//   then the sequence will continue until the end of the string.
// - . matches any single character unmatched by previous parts of the RegExps
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, options) {
    var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
    (0, _indexJsDefault7.default)(2, arguments);
    var formatStr = String(dirtyFormatStr);
    var defaultOptions = (0, _indexJs9.getDefaultOptions)();
    var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : (0, _indexJsDefault8.default);
    var firstWeekContainsDate = (0, _indexJsDefault6.default)((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    var weekStartsOn = (0, _indexJsDefault6.default)((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if (!locale.localize) throw new RangeError("locale must contain localize property");
    if (!locale.formatLong) throw new RangeError("locale must contain formatLong property");
    var originalDate = (0, _indexJsDefault2.default)(dirtyDate);
    if (!(0, _indexJsDefault.default)(originalDate)) throw new RangeError("Invalid time value");
     // Convert the date in system timezone to the same date in UTC+00:00 timezone.
    // This ensures that when UTC functions will be implemented, locales will be compatible with them.
    // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
    var timezoneOffset = (0, _indexJsDefault5.default)(originalDate);
    var utcDate = (0, _indexJsDefault1.default)(originalDate, timezoneOffset);
    var formatterOptions = {
        firstWeekContainsDate: firstWeekContainsDate,
        weekStartsOn: weekStartsOn,
        locale: locale,
        _originalDate: originalDate
    };
    var result = formatStr.match(longFormattingTokensRegExp).map(function(substring) {
        var firstCharacter = substring[0];
        if (firstCharacter === "p" || firstCharacter === "P") {
            var longFormatter = (0, _indexJsDefault4.default)[firstCharacter];
            return longFormatter(substring, locale.formatLong);
        }
        return substring;
    }).join("").match(formattingTokensRegExp).map(function(substring) {
        // Replace two single quote characters with one single quote character
        if (substring === "''") return "'";
        var firstCharacter = substring[0];
        if (firstCharacter === "'") return cleanEscapedString(substring);
        var formatter = (0, _indexJsDefault3.default)[firstCharacter];
        if (formatter) {
            if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && (0, _indexJs6.isProtectedWeekYearToken)(substring)) (0, _indexJs6.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
            if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && (0, _indexJs6.isProtectedDayOfYearToken)(substring)) (0, _indexJs6.throwProtectedError)(substring, dirtyFormatStr, String(dirtyDate));
            return formatter(utcDate, substring, locale.localize, formatterOptions);
        }
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
        return substring;
    }).join("");
    return result;
}
exports.default = format;
function cleanEscapedString(input) {
    var matched = input.match(escapedStringRegExp);
    if (!matched) return input;
    return matched[1].replace(doubleQuoteRegExp, "'");
}

},{"../isValid/index.js":"24Ebo","../subMilliseconds/index.js":"lscGa","../toDate/index.js":"aBwSY","../_lib/format/formatters/index.js":"2G4Fb","../_lib/format/longFormatters/index.js":"fIbx5","../_lib/getTimezoneOffsetInMilliseconds/index.js":"4FOq7","../_lib/protectedTokens/index.js":"8nc2r","../_lib/toInteger/index.js":"aBFIm","../_lib/requiredArgs/index.js":"gCfW8","../_lib/defaultOptions/index.js":"igxQ5","../_lib/defaultLocale/index.js":"hwfDf","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"24Ebo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../isDate/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../toDate/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../_lib/requiredArgs/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
function isValid(dirtyDate) {
    (0, _indexJsDefault2.default)(1, arguments);
    if (!(0, _indexJsDefault.default)(dirtyDate) && typeof dirtyDate !== "number") return false;
    var date = (0, _indexJsDefault1.default)(dirtyDate);
    return !isNaN(Number(date));
}
exports.default = isValid;

},{"../isDate/index.js":"ectA5","../toDate/index.js":"aBwSY","../_lib/requiredArgs/index.js":"gCfW8","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"ectA5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../_lib/requiredArgs/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") _typeof = function _typeof(obj) {
        return typeof obj;
    };
    else _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    return _typeof(obj);
}
function isDate(value) {
    (0, _indexJsDefault.default)(1, arguments);
    return value instanceof Date || _typeof(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
exports.default = isDate;

},{"../_lib/requiredArgs/index.js":"gCfW8","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"lscGa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../addMilliseconds/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../_lib/requiredArgs/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../_lib/toInteger/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
function subMilliseconds(dirtyDate, dirtyAmount) {
    (0, _indexJsDefault1.default)(2, arguments);
    var amount = (0, _indexJsDefault2.default)(dirtyAmount);
    return (0, _indexJsDefault.default)(dirtyDate, -amount);
}
exports.default = subMilliseconds;

},{"../addMilliseconds/index.js":"7n8yB","../_lib/requiredArgs/index.js":"gCfW8","../_lib/toInteger/index.js":"aBFIm","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"2G4Fb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../../_lib/getUTCDayOfYear/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../../../_lib/getUTCISOWeek/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../../../_lib/getUTCISOWeekYear/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
var _indexJs3 = require("../../../_lib/getUTCWeek/index.js");
var _indexJsDefault3 = parcelHelpers.interopDefault(_indexJs3);
var _indexJs4 = require("../../../_lib/getUTCWeekYear/index.js");
var _indexJsDefault4 = parcelHelpers.interopDefault(_indexJs4);
var _indexJs5 = require("../../addLeadingZeros/index.js");
var _indexJsDefault5 = parcelHelpers.interopDefault(_indexJs5);
var _indexJs6 = require("../lightFormatters/index.js");
var _indexJsDefault6 = parcelHelpers.interopDefault(_indexJs6);
var dayPeriodEnum = {
    am: "am",
    pm: "pm",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
};
/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
 * |  d  | Day of month                   |  D  | Day of year                    |
 * |  e  | Local day of week              |  E  | Day of week                    |
 * |  f  |                                |  F* | Day of week in month           |
 * |  g* | Modified Julian day            |  G  | Era                            |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  i! | ISO day of week                |  I! | ISO week of year               |
 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
 * |  m  | Minute                         |  M  | Month                          |
 * |  n  |                                |  N  |                                |
 * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
 * |  p! | Long localized time            |  P! | Long localized date            |
 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
 * |  u  | Extended year                  |  U* | Cyclic year                    |
 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
 * |  w  | Local week of year             |  W* | Week of month                  |
 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
 * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 *
 * Letters marked by ! are non-standard, but implemented by date-fns:
 * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
 *   i.e. 7 for Sunday, 1 for Monday, etc.
 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
 *   `R` is supposed to be used in conjunction with `I` and `i`
 *   for universal ISO week-numbering date, whereas
 *   `Y` is supposed to be used in conjunction with `w` and `e`
 *   for week-numbering date specific to the locale.
 * - `P` is long localized date format
 * - `p` is long localized time format
 */ var formatters = {
    // Era
    G: function G(date, token, localize) {
        var era = date.getUTCFullYear() > 0 ? 1 : 0;
        switch(token){
            // AD, BC
            case "G":
            case "GG":
            case "GGG":
                return localize.era(era, {
                    width: "abbreviated"
                });
            // A, B
            case "GGGGG":
                return localize.era(era, {
                    width: "narrow"
                });
            // Anno Domini, Before Christ
            case "GGGG":
            default:
                return localize.era(era, {
                    width: "wide"
                });
        }
    },
    // Year
    y: function y(date, token, localize) {
        // Ordinal number
        if (token === "yo") {
            var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)
            var year = signedYear > 0 ? signedYear : 1 - signedYear;
            return localize.ordinalNumber(year, {
                unit: "year"
            });
        }
        return (0, _indexJsDefault6.default).y(date, token);
    },
    // Local week-numbering year
    Y: function Y(date, token, localize, options) {
        var signedWeekYear = (0, _indexJsDefault4.default)(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)
        var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year
        if (token === "YY") {
            var twoDigitYear = weekYear % 100;
            return (0, _indexJsDefault5.default)(twoDigitYear, 2);
        } // Ordinal number
        if (token === "Yo") return localize.ordinalNumber(weekYear, {
            unit: "year"
        });
         // Padding
        return (0, _indexJsDefault5.default)(weekYear, token.length);
    },
    // ISO week-numbering year
    R: function R(date, token) {
        var isoWeekYear = (0, _indexJsDefault2.default)(date); // Padding
        return (0, _indexJsDefault5.default)(isoWeekYear, token.length);
    },
    // Extended year. This is a single number designating the year of this calendar system.
    // The main difference between `y` and `u` localizers are B.C. years:
    // | Year | `y` | `u` |
    // |------|-----|-----|
    // | AC 1 |   1 |   1 |
    // | BC 1 |   1 |   0 |
    // | BC 2 |   2 |  -1 |
    // Also `yy` always returns the last two digits of a year,
    // while `uu` pads single digit years to 2 characters and returns other years unchanged.
    u: function u(date, token) {
        var year = date.getUTCFullYear();
        return (0, _indexJsDefault5.default)(year, token.length);
    },
    // Quarter
    Q: function Q(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        switch(token){
            // 1, 2, 3, 4
            case "Q":
                return String(quarter);
            // 01, 02, 03, 04
            case "QQ":
                return (0, _indexJsDefault5.default)(quarter, 2);
            // 1st, 2nd, 3rd, 4th
            case "Qo":
                return localize.ordinalNumber(quarter, {
                    unit: "quarter"
                });
            // Q1, Q2, Q3, Q4
            case "QQQ":
                return localize.quarter(quarter, {
                    width: "abbreviated",
                    context: "formatting"
                });
            // 1, 2, 3, 4 (narrow quarter; could be not numerical)
            case "QQQQQ":
                return localize.quarter(quarter, {
                    width: "narrow",
                    context: "formatting"
                });
            // 1st quarter, 2nd quarter, ...
            case "QQQQ":
            default:
                return localize.quarter(quarter, {
                    width: "wide",
                    context: "formatting"
                });
        }
    },
    // Stand-alone quarter
    q: function q(date, token, localize) {
        var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
        switch(token){
            // 1, 2, 3, 4
            case "q":
                return String(quarter);
            // 01, 02, 03, 04
            case "qq":
                return (0, _indexJsDefault5.default)(quarter, 2);
            // 1st, 2nd, 3rd, 4th
            case "qo":
                return localize.ordinalNumber(quarter, {
                    unit: "quarter"
                });
            // Q1, Q2, Q3, Q4
            case "qqq":
                return localize.quarter(quarter, {
                    width: "abbreviated",
                    context: "standalone"
                });
            // 1, 2, 3, 4 (narrow quarter; could be not numerical)
            case "qqqqq":
                return localize.quarter(quarter, {
                    width: "narrow",
                    context: "standalone"
                });
            // 1st quarter, 2nd quarter, ...
            case "qqqq":
            default:
                return localize.quarter(quarter, {
                    width: "wide",
                    context: "standalone"
                });
        }
    },
    // Month
    M: function M(date, token, localize) {
        var month = date.getUTCMonth();
        switch(token){
            case "M":
            case "MM":
                return (0, _indexJsDefault6.default).M(date, token);
            // 1st, 2nd, ..., 12th
            case "Mo":
                return localize.ordinalNumber(month + 1, {
                    unit: "month"
                });
            // Jan, Feb, ..., Dec
            case "MMM":
                return localize.month(month, {
                    width: "abbreviated",
                    context: "formatting"
                });
            // J, F, ..., D
            case "MMMMM":
                return localize.month(month, {
                    width: "narrow",
                    context: "formatting"
                });
            // January, February, ..., December
            case "MMMM":
            default:
                return localize.month(month, {
                    width: "wide",
                    context: "formatting"
                });
        }
    },
    // Stand-alone month
    L: function L(date, token, localize) {
        var month = date.getUTCMonth();
        switch(token){
            // 1, 2, ..., 12
            case "L":
                return String(month + 1);
            // 01, 02, ..., 12
            case "LL":
                return (0, _indexJsDefault5.default)(month + 1, 2);
            // 1st, 2nd, ..., 12th
            case "Lo":
                return localize.ordinalNumber(month + 1, {
                    unit: "month"
                });
            // Jan, Feb, ..., Dec
            case "LLL":
                return localize.month(month, {
                    width: "abbreviated",
                    context: "standalone"
                });
            // J, F, ..., D
            case "LLLLL":
                return localize.month(month, {
                    width: "narrow",
                    context: "standalone"
                });
            // January, February, ..., December
            case "LLLL":
            default:
                return localize.month(month, {
                    width: "wide",
                    context: "standalone"
                });
        }
    },
    // Local week of year
    w: function w(date, token, localize, options) {
        var week = (0, _indexJsDefault3.default)(date, options);
        if (token === "wo") return localize.ordinalNumber(week, {
            unit: "week"
        });
        return (0, _indexJsDefault5.default)(week, token.length);
    },
    // ISO week of year
    I: function I(date, token, localize) {
        var isoWeek = (0, _indexJsDefault1.default)(date);
        if (token === "Io") return localize.ordinalNumber(isoWeek, {
            unit: "week"
        });
        return (0, _indexJsDefault5.default)(isoWeek, token.length);
    },
    // Day of the month
    d: function d(date, token, localize) {
        if (token === "do") return localize.ordinalNumber(date.getUTCDate(), {
            unit: "date"
        });
        return (0, _indexJsDefault6.default).d(date, token);
    },
    // Day of year
    D: function D(date, token, localize) {
        var dayOfYear = (0, _indexJsDefault.default)(date);
        if (token === "Do") return localize.ordinalNumber(dayOfYear, {
            unit: "dayOfYear"
        });
        return (0, _indexJsDefault5.default)(dayOfYear, token.length);
    },
    // Day of week
    E: function E(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        switch(token){
            // Tue
            case "E":
            case "EE":
            case "EEE":
                return localize.day(dayOfWeek, {
                    width: "abbreviated",
                    context: "formatting"
                });
            // T
            case "EEEEE":
                return localize.day(dayOfWeek, {
                    width: "narrow",
                    context: "formatting"
                });
            // Tu
            case "EEEEEE":
                return localize.day(dayOfWeek, {
                    width: "short",
                    context: "formatting"
                });
            // Tuesday
            case "EEEE":
            default:
                return localize.day(dayOfWeek, {
                    width: "wide",
                    context: "formatting"
                });
        }
    },
    // Local day of week
    e: function e(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch(token){
            // Numerical value (Nth day of week with current locale or weekStartsOn)
            case "e":
                return String(localDayOfWeek);
            // Padded numerical value
            case "ee":
                return (0, _indexJsDefault5.default)(localDayOfWeek, 2);
            // 1st, 2nd, ..., 7th
            case "eo":
                return localize.ordinalNumber(localDayOfWeek, {
                    unit: "day"
                });
            case "eee":
                return localize.day(dayOfWeek, {
                    width: "abbreviated",
                    context: "formatting"
                });
            // T
            case "eeeee":
                return localize.day(dayOfWeek, {
                    width: "narrow",
                    context: "formatting"
                });
            // Tu
            case "eeeeee":
                return localize.day(dayOfWeek, {
                    width: "short",
                    context: "formatting"
                });
            // Tuesday
            case "eeee":
            default:
                return localize.day(dayOfWeek, {
                    width: "wide",
                    context: "formatting"
                });
        }
    },
    // Stand-alone local day of week
    c: function c(date, token, localize, options) {
        var dayOfWeek = date.getUTCDay();
        var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
        switch(token){
            // Numerical value (same as in `e`)
            case "c":
                return String(localDayOfWeek);
            // Padded numerical value
            case "cc":
                return (0, _indexJsDefault5.default)(localDayOfWeek, token.length);
            // 1st, 2nd, ..., 7th
            case "co":
                return localize.ordinalNumber(localDayOfWeek, {
                    unit: "day"
                });
            case "ccc":
                return localize.day(dayOfWeek, {
                    width: "abbreviated",
                    context: "standalone"
                });
            // T
            case "ccccc":
                return localize.day(dayOfWeek, {
                    width: "narrow",
                    context: "standalone"
                });
            // Tu
            case "cccccc":
                return localize.day(dayOfWeek, {
                    width: "short",
                    context: "standalone"
                });
            // Tuesday
            case "cccc":
            default:
                return localize.day(dayOfWeek, {
                    width: "wide",
                    context: "standalone"
                });
        }
    },
    // ISO day of week
    i: function i(date, token, localize) {
        var dayOfWeek = date.getUTCDay();
        var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
        switch(token){
            // 2
            case "i":
                return String(isoDayOfWeek);
            // 02
            case "ii":
                return (0, _indexJsDefault5.default)(isoDayOfWeek, token.length);
            // 2nd
            case "io":
                return localize.ordinalNumber(isoDayOfWeek, {
                    unit: "day"
                });
            // Tue
            case "iii":
                return localize.day(dayOfWeek, {
                    width: "abbreviated",
                    context: "formatting"
                });
            // T
            case "iiiii":
                return localize.day(dayOfWeek, {
                    width: "narrow",
                    context: "formatting"
                });
            // Tu
            case "iiiiii":
                return localize.day(dayOfWeek, {
                    width: "short",
                    context: "formatting"
                });
            // Tuesday
            case "iiii":
            default:
                return localize.day(dayOfWeek, {
                    width: "wide",
                    context: "formatting"
                });
        }
    },
    // AM or PM
    a: function a(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
        switch(token){
            case "a":
            case "aa":
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "abbreviated",
                    context: "formatting"
                });
            case "aaa":
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "abbreviated",
                    context: "formatting"
                }).toLowerCase();
            case "aaaaa":
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "narrow",
                    context: "formatting"
                });
            case "aaaa":
            default:
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "wide",
                    context: "formatting"
                });
        }
    },
    // AM, PM, midnight, noon
    b: function b(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;
        if (hours === 12) dayPeriodEnumValue = dayPeriodEnum.noon;
        else if (hours === 0) dayPeriodEnumValue = dayPeriodEnum.midnight;
        else dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
        switch(token){
            case "b":
            case "bb":
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "abbreviated",
                    context: "formatting"
                });
            case "bbb":
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "abbreviated",
                    context: "formatting"
                }).toLowerCase();
            case "bbbbb":
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "narrow",
                    context: "formatting"
                });
            case "bbbb":
            default:
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "wide",
                    context: "formatting"
                });
        }
    },
    // in the morning, in the afternoon, in the evening, at night
    B: function B(date, token, localize) {
        var hours = date.getUTCHours();
        var dayPeriodEnumValue;
        if (hours >= 17) dayPeriodEnumValue = dayPeriodEnum.evening;
        else if (hours >= 12) dayPeriodEnumValue = dayPeriodEnum.afternoon;
        else if (hours >= 4) dayPeriodEnumValue = dayPeriodEnum.morning;
        else dayPeriodEnumValue = dayPeriodEnum.night;
        switch(token){
            case "B":
            case "BB":
            case "BBB":
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "abbreviated",
                    context: "formatting"
                });
            case "BBBBB":
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "narrow",
                    context: "formatting"
                });
            case "BBBB":
            default:
                return localize.dayPeriod(dayPeriodEnumValue, {
                    width: "wide",
                    context: "formatting"
                });
        }
    },
    // Hour [1-12]
    h: function h(date, token, localize) {
        if (token === "ho") {
            var hours = date.getUTCHours() % 12;
            if (hours === 0) hours = 12;
            return localize.ordinalNumber(hours, {
                unit: "hour"
            });
        }
        return (0, _indexJsDefault6.default).h(date, token);
    },
    // Hour [0-23]
    H: function H(date, token, localize) {
        if (token === "Ho") return localize.ordinalNumber(date.getUTCHours(), {
            unit: "hour"
        });
        return (0, _indexJsDefault6.default).H(date, token);
    },
    // Hour [0-11]
    K: function K(date, token, localize) {
        var hours = date.getUTCHours() % 12;
        if (token === "Ko") return localize.ordinalNumber(hours, {
            unit: "hour"
        });
        return (0, _indexJsDefault5.default)(hours, token.length);
    },
    // Hour [1-24]
    k: function k(date, token, localize) {
        var hours = date.getUTCHours();
        if (hours === 0) hours = 24;
        if (token === "ko") return localize.ordinalNumber(hours, {
            unit: "hour"
        });
        return (0, _indexJsDefault5.default)(hours, token.length);
    },
    // Minute
    m: function m(date, token, localize) {
        if (token === "mo") return localize.ordinalNumber(date.getUTCMinutes(), {
            unit: "minute"
        });
        return (0, _indexJsDefault6.default).m(date, token);
    },
    // Second
    s: function s(date, token, localize) {
        if (token === "so") return localize.ordinalNumber(date.getUTCSeconds(), {
            unit: "second"
        });
        return (0, _indexJsDefault6.default).s(date, token);
    },
    // Fraction of second
    S: function S(date, token) {
        return (0, _indexJsDefault6.default).S(date, token);
    },
    // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
    X: function X(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        if (timezoneOffset === 0) return "Z";
        switch(token){
            // Hours and optional minutes
            case "X":
                return formatTimezoneWithOptionalMinutes(timezoneOffset);
            // Hours, minutes and optional seconds without `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `XX`
            case "XXXX":
            case "XX":
                // Hours and minutes without `:` delimiter
                return formatTimezone(timezoneOffset);
            // Hours, minutes and optional seconds with `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `XXX`
            case "XXXXX":
            case "XXX":
            default:
                return formatTimezone(timezoneOffset, ":");
        }
    },
    // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
    x: function x(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch(token){
            // Hours and optional minutes
            case "x":
                return formatTimezoneWithOptionalMinutes(timezoneOffset);
            // Hours, minutes and optional seconds without `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `xx`
            case "xxxx":
            case "xx":
                // Hours and minutes without `:` delimiter
                return formatTimezone(timezoneOffset);
            // Hours, minutes and optional seconds with `:` delimiter
            // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
            // so this token always has the same output as `xxx`
            case "xxxxx":
            case "xxx":
            default:
                return formatTimezone(timezoneOffset, ":");
        }
    },
    // Timezone (GMT)
    O: function O(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch(token){
            // Short
            case "O":
            case "OO":
            case "OOO":
                return "GMT" + formatTimezoneShort(timezoneOffset, ":");
            // Long
            case "OOOO":
            default:
                return "GMT" + formatTimezone(timezoneOffset, ":");
        }
    },
    // Timezone (specific non-location)
    z: function z(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timezoneOffset = originalDate.getTimezoneOffset();
        switch(token){
            // Short
            case "z":
            case "zz":
            case "zzz":
                return "GMT" + formatTimezoneShort(timezoneOffset, ":");
            // Long
            case "zzzz":
            default:
                return "GMT" + formatTimezone(timezoneOffset, ":");
        }
    },
    // Seconds timestamp
    t: function t(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = Math.floor(originalDate.getTime() / 1000);
        return (0, _indexJsDefault5.default)(timestamp, token.length);
    },
    // Milliseconds timestamp
    T: function T(date, token, _localize, options) {
        var originalDate = options._originalDate || date;
        var timestamp = originalDate.getTime();
        return (0, _indexJsDefault5.default)(timestamp, token.length);
    }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
    var sign = offset > 0 ? "-" : "+";
    var absOffset = Math.abs(offset);
    var hours = Math.floor(absOffset / 60);
    var minutes = absOffset % 60;
    if (minutes === 0) return sign + String(hours);
    var delimiter = dirtyDelimiter || "";
    return sign + String(hours) + delimiter + (0, _indexJsDefault5.default)(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
    if (offset % 60 === 0) {
        var sign = offset > 0 ? "-" : "+";
        return sign + (0, _indexJsDefault5.default)(Math.abs(offset) / 60, 2);
    }
    return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
    var delimiter = dirtyDelimiter || "";
    var sign = offset > 0 ? "-" : "+";
    var absOffset = Math.abs(offset);
    var hours = (0, _indexJsDefault5.default)(Math.floor(absOffset / 60), 2);
    var minutes = (0, _indexJsDefault5.default)(absOffset % 60, 2);
    return sign + hours + delimiter + minutes;
}
exports.default = formatters;

},{"../../../_lib/getUTCDayOfYear/index.js":"7hzxR","../../../_lib/getUTCISOWeek/index.js":"a5Ldr","../../../_lib/getUTCISOWeekYear/index.js":"bWJcI","../../../_lib/getUTCWeek/index.js":"2cW8T","../../../_lib/getUTCWeekYear/index.js":"2qDtb","../../addLeadingZeros/index.js":"2lGnL","../lightFormatters/index.js":"2Aou0","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"7hzxR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../toDate/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../requiredArgs/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var MILLISECONDS_IN_DAY = 86400000;
function getUTCDayOfYear(dirtyDate) {
    (0, _indexJsDefault1.default)(1, arguments);
    var date = (0, _indexJsDefault.default)(dirtyDate);
    var timestamp = date.getTime();
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
    var startOfYearTimestamp = date.getTime();
    var difference = timestamp - startOfYearTimestamp;
    return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
exports.default = getUTCDayOfYear;

},{"../../toDate/index.js":"aBwSY","../requiredArgs/index.js":"gCfW8","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"a5Ldr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../toDate/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../startOfUTCISOWeek/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../startOfUTCISOWeekYear/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
var _indexJs3 = require("../requiredArgs/index.js");
var _indexJsDefault3 = parcelHelpers.interopDefault(_indexJs3);
var MILLISECONDS_IN_WEEK = 604800000;
function getUTCISOWeek(dirtyDate) {
    (0, _indexJsDefault3.default)(1, arguments);
    var date = (0, _indexJsDefault.default)(dirtyDate);
    var diff = (0, _indexJsDefault1.default)(date).getTime() - (0, _indexJsDefault2.default)(date).getTime(); // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
exports.default = getUTCISOWeek;

},{"../../toDate/index.js":"aBwSY","../startOfUTCISOWeek/index.js":"eEJgA","../startOfUTCISOWeekYear/index.js":"5OOpS","../requiredArgs/index.js":"gCfW8","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"eEJgA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../toDate/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../requiredArgs/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
function startOfUTCISOWeek(dirtyDate) {
    (0, _indexJsDefault1.default)(1, arguments);
    var weekStartsOn = 1;
    var date = (0, _indexJsDefault.default)(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}
exports.default = startOfUTCISOWeek;

},{"../../toDate/index.js":"aBwSY","../requiredArgs/index.js":"gCfW8","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"5OOpS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../getUTCISOWeekYear/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../startOfUTCISOWeek/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../requiredArgs/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
function startOfUTCISOWeekYear(dirtyDate) {
    (0, _indexJsDefault2.default)(1, arguments);
    var year = (0, _indexJsDefault.default)(dirtyDate);
    var fourthOfJanuary = new Date(0);
    fourthOfJanuary.setUTCFullYear(year, 0, 4);
    fourthOfJanuary.setUTCHours(0, 0, 0, 0);
    var date = (0, _indexJsDefault1.default)(fourthOfJanuary);
    return date;
}
exports.default = startOfUTCISOWeekYear;

},{"../getUTCISOWeekYear/index.js":"bWJcI","../startOfUTCISOWeek/index.js":"eEJgA","../requiredArgs/index.js":"gCfW8","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"bWJcI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../toDate/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../requiredArgs/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../startOfUTCISOWeek/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
function getUTCISOWeekYear(dirtyDate) {
    (0, _indexJsDefault1.default)(1, arguments);
    var date = (0, _indexJsDefault.default)(dirtyDate);
    var year = date.getUTCFullYear();
    var fourthOfJanuaryOfNextYear = new Date(0);
    fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
    fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = (0, _indexJsDefault2.default)(fourthOfJanuaryOfNextYear);
    var fourthOfJanuaryOfThisYear = new Date(0);
    fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
    fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = (0, _indexJsDefault2.default)(fourthOfJanuaryOfThisYear);
    if (date.getTime() >= startOfNextYear.getTime()) return year + 1;
    else if (date.getTime() >= startOfThisYear.getTime()) return year;
    else return year - 1;
}
exports.default = getUTCISOWeekYear;

},{"../../toDate/index.js":"aBwSY","../requiredArgs/index.js":"gCfW8","../startOfUTCISOWeek/index.js":"eEJgA","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"2cW8T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../toDate/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../startOfUTCWeek/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../startOfUTCWeekYear/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
var _indexJs3 = require("../requiredArgs/index.js");
var _indexJsDefault3 = parcelHelpers.interopDefault(_indexJs3);
var MILLISECONDS_IN_WEEK = 604800000;
function getUTCWeek(dirtyDate, options) {
    (0, _indexJsDefault3.default)(1, arguments);
    var date = (0, _indexJsDefault.default)(dirtyDate);
    var diff = (0, _indexJsDefault1.default)(date, options).getTime() - (0, _indexJsDefault2.default)(date, options).getTime(); // Round the number of days to the nearest integer
    // because the number of milliseconds in a week is not constant
    // (e.g. it's different in the week of the daylight saving time clock shift)
    return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
exports.default = getUTCWeek;

},{"../../toDate/index.js":"aBwSY","../startOfUTCWeek/index.js":"4OMm8","../startOfUTCWeekYear/index.js":"iweVW","../requiredArgs/index.js":"gCfW8","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"4OMm8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../toDate/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../requiredArgs/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../toInteger/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
var _indexJs3 = require("../defaultOptions/index.js");
function startOfUTCWeek(dirtyDate, options) {
    var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    (0, _indexJsDefault1.default)(1, arguments);
    var defaultOptions = (0, _indexJs3.getDefaultOptions)();
    var weekStartsOn = (0, _indexJsDefault2.default)((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
    if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var date = (0, _indexJsDefault.default)(dirtyDate);
    var day = date.getUTCDay();
    var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
    date.setUTCDate(date.getUTCDate() - diff);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}
exports.default = startOfUTCWeek;

},{"../../toDate/index.js":"aBwSY","../requiredArgs/index.js":"gCfW8","../toInteger/index.js":"aBFIm","../defaultOptions/index.js":"igxQ5","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"igxQ5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getDefaultOptions", ()=>getDefaultOptions);
parcelHelpers.export(exports, "setDefaultOptions", ()=>setDefaultOptions);
var defaultOptions = {};
function getDefaultOptions() {
    return defaultOptions;
}
function setDefaultOptions(newOptions) {
    defaultOptions = newOptions;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"iweVW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../getUTCWeekYear/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../requiredArgs/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../startOfUTCWeek/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
var _indexJs3 = require("../toInteger/index.js");
var _indexJsDefault3 = parcelHelpers.interopDefault(_indexJs3);
var _indexJs4 = require("../defaultOptions/index.js");
function startOfUTCWeekYear(dirtyDate, options) {
    var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    (0, _indexJsDefault1.default)(1, arguments);
    var defaultOptions = (0, _indexJs4.getDefaultOptions)();
    var firstWeekContainsDate = (0, _indexJsDefault3.default)((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
    var year = (0, _indexJsDefault.default)(dirtyDate, options);
    var firstWeek = new Date(0);
    firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeek.setUTCHours(0, 0, 0, 0);
    var date = (0, _indexJsDefault2.default)(firstWeek, options);
    return date;
}
exports.default = startOfUTCWeekYear;

},{"../getUTCWeekYear/index.js":"2qDtb","../requiredArgs/index.js":"gCfW8","../startOfUTCWeek/index.js":"4OMm8","../toInteger/index.js":"aBFIm","../defaultOptions/index.js":"igxQ5","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"2qDtb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../toDate/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../requiredArgs/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("../startOfUTCWeek/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
var _indexJs3 = require("../toInteger/index.js");
var _indexJsDefault3 = parcelHelpers.interopDefault(_indexJs3);
var _indexJs4 = require("../defaultOptions/index.js");
function getUTCWeekYear(dirtyDate, options) {
    var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
    (0, _indexJsDefault1.default)(1, arguments);
    var date = (0, _indexJsDefault.default)(dirtyDate);
    var year = date.getUTCFullYear();
    var defaultOptions = (0, _indexJs4.getDefaultOptions)();
    var firstWeekContainsDate = (0, _indexJsDefault3.default)((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN
    if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
    var firstWeekOfNextYear = new Date(0);
    firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
    firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
    var startOfNextYear = (0, _indexJsDefault2.default)(firstWeekOfNextYear, options);
    var firstWeekOfThisYear = new Date(0);
    firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
    firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
    var startOfThisYear = (0, _indexJsDefault2.default)(firstWeekOfThisYear, options);
    if (date.getTime() >= startOfNextYear.getTime()) return year + 1;
    else if (date.getTime() >= startOfThisYear.getTime()) return year;
    else return year - 1;
}
exports.default = getUTCWeekYear;

},{"../../toDate/index.js":"aBwSY","../requiredArgs/index.js":"gCfW8","../startOfUTCWeek/index.js":"4OMm8","../toInteger/index.js":"aBFIm","../defaultOptions/index.js":"igxQ5","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"2lGnL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function addLeadingZeros(number, targetLength) {
    var sign = number < 0 ? "-" : "";
    var output = Math.abs(number).toString();
    while(output.length < targetLength)output = "0" + output;
    return sign + output;
}
exports.default = addLeadingZeros;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"2Aou0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../addLeadingZeros/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
/*
 * |     | Unit                           |     | Unit                           |
 * |-----|--------------------------------|-----|--------------------------------|
 * |  a  | AM, PM                         |  A* |                                |
 * |  d  | Day of month                   |  D  |                                |
 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
 * |  m  | Minute                         |  M  | Month                          |
 * |  s  | Second                         |  S  | Fraction of second             |
 * |  y  | Year (abs)                     |  Y  |                                |
 *
 * Letters marked by * are not implemented but reserved by Unicode standard.
 */ var formatters = {
    // Year
    y: function y(date, token) {
        // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
        // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
        // |----------|-------|----|-------|-------|-------|
        // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
        // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
        // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
        // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
        // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
        var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)
        var year = signedYear > 0 ? signedYear : 1 - signedYear;
        return (0, _indexJsDefault.default)(token === "yy" ? year % 100 : year, token.length);
    },
    // Month
    M: function M(date, token) {
        var month = date.getUTCMonth();
        return token === "M" ? String(month + 1) : (0, _indexJsDefault.default)(month + 1, 2);
    },
    // Day of the month
    d: function d(date, token) {
        return (0, _indexJsDefault.default)(date.getUTCDate(), token.length);
    },
    // AM or PM
    a: function a(date, token) {
        var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
        switch(token){
            case "a":
            case "aa":
                return dayPeriodEnumValue.toUpperCase();
            case "aaa":
                return dayPeriodEnumValue;
            case "aaaaa":
                return dayPeriodEnumValue[0];
            case "aaaa":
            default:
                return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
        }
    },
    // Hour [1-12]
    h: function h(date, token) {
        return (0, _indexJsDefault.default)(date.getUTCHours() % 12 || 12, token.length);
    },
    // Hour [0-23]
    H: function H(date, token) {
        return (0, _indexJsDefault.default)(date.getUTCHours(), token.length);
    },
    // Minute
    m: function m(date, token) {
        return (0, _indexJsDefault.default)(date.getUTCMinutes(), token.length);
    },
    // Second
    s: function s(date, token) {
        return (0, _indexJsDefault.default)(date.getUTCSeconds(), token.length);
    },
    // Fraction of second
    S: function S(date, token) {
        var numberOfDigits = token.length;
        var milliseconds = date.getUTCMilliseconds();
        var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
        return (0, _indexJsDefault.default)(fractionalSeconds, token.length);
    }
};
exports.default = formatters;

},{"../../addLeadingZeros/index.js":"2lGnL","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"fIbx5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var dateLongFormatter = function dateLongFormatter(pattern, formatLong) {
    switch(pattern){
        case "P":
            return formatLong.date({
                width: "short"
            });
        case "PP":
            return formatLong.date({
                width: "medium"
            });
        case "PPP":
            return formatLong.date({
                width: "long"
            });
        case "PPPP":
        default:
            return formatLong.date({
                width: "full"
            });
    }
};
var timeLongFormatter = function timeLongFormatter(pattern, formatLong) {
    switch(pattern){
        case "p":
            return formatLong.time({
                width: "short"
            });
        case "pp":
            return formatLong.time({
                width: "medium"
            });
        case "ppp":
            return formatLong.time({
                width: "long"
            });
        case "pppp":
        default:
            return formatLong.time({
                width: "full"
            });
    }
};
var dateTimeLongFormatter = function dateTimeLongFormatter(pattern, formatLong) {
    var matchResult = pattern.match(/(P+)(p+)?/) || [];
    var datePattern = matchResult[1];
    var timePattern = matchResult[2];
    if (!timePattern) return dateLongFormatter(pattern, formatLong);
    var dateTimeFormat;
    switch(datePattern){
        case "P":
            dateTimeFormat = formatLong.dateTime({
                width: "short"
            });
            break;
        case "PP":
            dateTimeFormat = formatLong.dateTime({
                width: "medium"
            });
            break;
        case "PPP":
            dateTimeFormat = formatLong.dateTime({
                width: "long"
            });
            break;
        case "PPPP":
        default:
            dateTimeFormat = formatLong.dateTime({
                width: "full"
            });
            break;
    }
    return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong)).replace("{{time}}", timeLongFormatter(timePattern, formatLong));
};
var longFormatters = {
    p: timeLongFormatter,
    P: dateTimeLongFormatter
};
exports.default = longFormatters;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"4FOq7":[function(require,module,exports) {
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function getTimezoneOffsetInMilliseconds(date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
}
exports.default = getTimezoneOffsetInMilliseconds;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"8nc2r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isProtectedDayOfYearToken", ()=>isProtectedDayOfYearToken);
parcelHelpers.export(exports, "isProtectedWeekYearToken", ()=>isProtectedWeekYearToken);
parcelHelpers.export(exports, "throwProtectedError", ()=>throwProtectedError);
var protectedDayOfYearTokens = [
    "D",
    "DD"
];
var protectedWeekYearTokens = [
    "YY",
    "YYYY"
];
function isProtectedDayOfYearToken(token) {
    return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
    return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format, input) {
    if (token === "YYYY") throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    else if (token === "YY") throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    else if (token === "D") throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
    else if (token === "DD") throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"hwfDf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../locale/en-US/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
exports.default = (0, _indexJsDefault.default);

},{"../../locale/en-US/index.js":"flPcR","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"flPcR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("./_lib/formatDistance/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("./_lib/formatLong/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var _indexJs2 = require("./_lib/formatRelative/index.js");
var _indexJsDefault2 = parcelHelpers.interopDefault(_indexJs2);
var _indexJs3 = require("./_lib/localize/index.js");
var _indexJsDefault3 = parcelHelpers.interopDefault(_indexJs3);
var _indexJs4 = require("./_lib/match/index.js");
var _indexJsDefault4 = parcelHelpers.interopDefault(_indexJs4);
/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */ var locale = {
    code: "en-US",
    formatDistance: (0, _indexJsDefault.default),
    formatLong: (0, _indexJsDefault1.default),
    formatRelative: (0, _indexJsDefault2.default),
    localize: (0, _indexJsDefault3.default),
    match: (0, _indexJsDefault4.default),
    options: {
        weekStartsOn: 0,
        firstWeekContainsDate: 1
    }
};
exports.default = locale;

},{"./_lib/formatDistance/index.js":"bP18R","./_lib/formatLong/index.js":"aW6e4","./_lib/formatRelative/index.js":"dPiRM","./_lib/localize/index.js":"cepZt","./_lib/match/index.js":"2nhpa","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"bP18R":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var formatDistanceLocale = {
    lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds"
    },
    xSeconds: {
        one: "1 second",
        other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes"
    },
    xMinutes: {
        one: "1 minute",
        other: "{{count}} minutes"
    },
    aboutXHours: {
        one: "about 1 hour",
        other: "about {{count}} hours"
    },
    xHours: {
        one: "1 hour",
        other: "{{count}} hours"
    },
    xDays: {
        one: "1 day",
        other: "{{count}} days"
    },
    aboutXWeeks: {
        one: "about 1 week",
        other: "about {{count}} weeks"
    },
    xWeeks: {
        one: "1 week",
        other: "{{count}} weeks"
    },
    aboutXMonths: {
        one: "about 1 month",
        other: "about {{count}} months"
    },
    xMonths: {
        one: "1 month",
        other: "{{count}} months"
    },
    aboutXYears: {
        one: "about 1 year",
        other: "about {{count}} years"
    },
    xYears: {
        one: "1 year",
        other: "{{count}} years"
    },
    overXYears: {
        one: "over 1 year",
        other: "over {{count}} years"
    },
    almostXYears: {
        one: "almost 1 year",
        other: "almost {{count}} years"
    }
};
var formatDistance = function formatDistance(token, count, options) {
    var result;
    var tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") result = tokenValue;
    else if (count === 1) result = tokenValue.one;
    else result = tokenValue.other.replace("{{count}}", count.toString());
    if (options !== null && options !== void 0 && options.addSuffix) {
        if (options.comparison && options.comparison > 0) return "in " + result;
        else return result + " ago";
    }
    return result;
};
exports.default = formatDistance;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"aW6e4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../../_lib/buildFormatLongFn/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
};
var timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
};
var dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
};
var formatLong = {
    date: (0, _indexJsDefault.default)({
        formats: dateFormats,
        defaultWidth: "full"
    }),
    time: (0, _indexJsDefault.default)({
        formats: timeFormats,
        defaultWidth: "full"
    }),
    dateTime: (0, _indexJsDefault.default)({
        formats: dateTimeFormats,
        defaultWidth: "full"
    })
};
exports.default = formatLong;

},{"../../../_lib/buildFormatLongFn/index.js":"dFePi","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"dFePi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function buildFormatLongFn(args) {
    return function() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        // TODO: Remove String()
        var width = options.width ? String(options.width) : args.defaultWidth;
        var format = args.formats[width] || args.formats[args.defaultWidth];
        return format;
    };
}
exports.default = buildFormatLongFn;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"dPiRM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
};
var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
};
exports.default = formatRelative;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"cepZt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../../_lib/buildLocalizeFn/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var eraValues = {
    narrow: [
        "B",
        "A"
    ],
    abbreviated: [
        "BC",
        "AD"
    ],
    wide: [
        "Before Christ",
        "Anno Domini"
    ]
};
var quarterValues = {
    narrow: [
        "1",
        "2",
        "3",
        "4"
    ],
    abbreviated: [
        "Q1",
        "Q2",
        "Q3",
        "Q4"
    ],
    wide: [
        "1st quarter",
        "2nd quarter",
        "3rd quarter",
        "4th quarter"
    ]
}; // Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
var monthValues = {
    narrow: [
        "J",
        "F",
        "M",
        "A",
        "M",
        "J",
        "J",
        "A",
        "S",
        "O",
        "N",
        "D"
    ],
    abbreviated: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ],
    wide: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]
};
var dayValues = {
    narrow: [
        "S",
        "M",
        "T",
        "W",
        "T",
        "F",
        "S"
    ],
    short: [
        "Su",
        "Mo",
        "Tu",
        "We",
        "Th",
        "Fr",
        "Sa"
    ],
    abbreviated: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ],
    wide: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
};
var dayPeriodValues = {
    narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
    },
    abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
    },
    wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "morning",
        afternoon: "afternoon",
        evening: "evening",
        night: "night"
    }
};
var formattingDayPeriodValues = {
    narrow: {
        am: "a",
        pm: "p",
        midnight: "mi",
        noon: "n",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
    },
    abbreviated: {
        am: "AM",
        pm: "PM",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
    },
    wide: {
        am: "a.m.",
        pm: "p.m.",
        midnight: "midnight",
        noon: "noon",
        morning: "in the morning",
        afternoon: "in the afternoon",
        evening: "in the evening",
        night: "at night"
    }
};
var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
    var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
    // if they are different for different grammatical genders,
    // use `options.unit`.
    //
    // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
    // 'day', 'hour', 'minute', 'second'.
    var rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) switch(rem100 % 10){
        case 1:
            return number + "st";
        case 2:
            return number + "nd";
        case 3:
            return number + "rd";
    }
    return number + "th";
};
var localize = {
    ordinalNumber: ordinalNumber,
    era: (0, _indexJsDefault.default)({
        values: eraValues,
        defaultWidth: "wide"
    }),
    quarter: (0, _indexJsDefault.default)({
        values: quarterValues,
        defaultWidth: "wide",
        argumentCallback: function argumentCallback(quarter) {
            return quarter - 1;
        }
    }),
    month: (0, _indexJsDefault.default)({
        values: monthValues,
        defaultWidth: "wide"
    }),
    day: (0, _indexJsDefault.default)({
        values: dayValues,
        defaultWidth: "wide"
    }),
    dayPeriod: (0, _indexJsDefault.default)({
        values: dayPeriodValues,
        defaultWidth: "wide",
        formattingValues: formattingDayPeriodValues,
        defaultFormattingWidth: "wide"
    })
};
exports.default = localize;

},{"../../../_lib/buildLocalizeFn/index.js":"d6Ew7","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"d6Ew7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function buildLocalizeFn(args) {
    return function(dirtyIndex, options) {
        var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
        var valuesArray;
        if (context === "formatting" && args.formattingValues) {
            var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
            var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
            valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
        } else {
            var _defaultWidth = args.defaultWidth;
            var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
            valuesArray = args.values[_width] || args.values[_defaultWidth];
        }
        var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex; // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
        return valuesArray[index];
    };
}
exports.default = buildLocalizeFn;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"2nhpa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _indexJs = require("../../../_lib/buildMatchFn/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _indexJs1 = require("../../../_lib/buildMatchPatternFn/index.js");
var _indexJsDefault1 = parcelHelpers.interopDefault(_indexJs1);
var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
    any: [
        /^b/i,
        /^(a|c)/i
    ]
};
var matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
    any: [
        /1/i,
        /2/i,
        /3/i,
        /4/i
    ]
};
var matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
    narrow: [
        /^j/i,
        /^f/i,
        /^m/i,
        /^a/i,
        /^m/i,
        /^j/i,
        /^j/i,
        /^a/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i
    ],
    any: [
        /^ja/i,
        /^f/i,
        /^mar/i,
        /^ap/i,
        /^may/i,
        /^jun/i,
        /^jul/i,
        /^au/i,
        /^s/i,
        /^o/i,
        /^n/i,
        /^d/i
    ]
};
var matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
    narrow: [
        /^s/i,
        /^m/i,
        /^t/i,
        /^w/i,
        /^t/i,
        /^f/i,
        /^s/i
    ],
    any: [
        /^su/i,
        /^m/i,
        /^tu/i,
        /^w/i,
        /^th/i,
        /^f/i,
        /^sa/i
    ]
};
var matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
    any: {
        am: /^a/i,
        pm: /^p/i,
        midnight: /^mi/i,
        noon: /^no/i,
        morning: /morning/i,
        afternoon: /afternoon/i,
        evening: /evening/i,
        night: /night/i
    }
};
var match = {
    ordinalNumber: (0, _indexJsDefault1.default)({
        matchPattern: matchOrdinalNumberPattern,
        parsePattern: parseOrdinalNumberPattern,
        valueCallback: function valueCallback(value) {
            return parseInt(value, 10);
        }
    }),
    era: (0, _indexJsDefault.default)({
        matchPatterns: matchEraPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseEraPatterns,
        defaultParseWidth: "any"
    }),
    quarter: (0, _indexJsDefault.default)({
        matchPatterns: matchQuarterPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseQuarterPatterns,
        defaultParseWidth: "any",
        valueCallback: function valueCallback(index) {
            return index + 1;
        }
    }),
    month: (0, _indexJsDefault.default)({
        matchPatterns: matchMonthPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseMonthPatterns,
        defaultParseWidth: "any"
    }),
    day: (0, _indexJsDefault.default)({
        matchPatterns: matchDayPatterns,
        defaultMatchWidth: "wide",
        parsePatterns: parseDayPatterns,
        defaultParseWidth: "any"
    }),
    dayPeriod: (0, _indexJsDefault.default)({
        matchPatterns: matchDayPeriodPatterns,
        defaultMatchWidth: "any",
        parsePatterns: parseDayPeriodPatterns,
        defaultParseWidth: "any"
    })
};
exports.default = match;

},{"../../../_lib/buildMatchFn/index.js":"eKL7t","../../../_lib/buildMatchPatternFn/index.js":"8sKx9","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"eKL7t":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function buildMatchFn(args) {
    return function(string) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var width = options.width;
        var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
        var matchResult = string.match(matchPattern);
        if (!matchResult) return null;
        var matchedString = matchResult[0];
        var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
        var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
            return pattern.test(matchedString);
        }) : findKey(parsePatterns, function(pattern) {
            return pattern.test(matchedString);
        });
        var value;
        value = args.valueCallback ? args.valueCallback(key) : key;
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
            value: value,
            rest: rest
        };
    };
}
exports.default = buildMatchFn;
function findKey(object, predicate) {
    for(var key in object){
        if (object.hasOwnProperty(key) && predicate(object[key])) return key;
    }
    return undefined;
}
function findIndex(array, predicate) {
    for(var key = 0; key < array.length; key++){
        if (predicate(array[key])) return key;
    }
    return undefined;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"8sKx9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
function buildMatchPatternFn(args) {
    return function(string) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var matchResult = string.match(args.matchPattern);
        if (!matchResult) return null;
        var matchedString = matchResult[0];
        var parseResult = string.match(args.parsePattern);
        if (!parseResult) return null;
        var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
        value = options.valueCallback ? options.valueCallback(value) : value;
        var rest = string.slice(matchedString.length);
        return {
            value: value,
            rest: rest
        };
    };
}
exports.default = buildMatchPatternFn;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"24Hck":[function(require,module,exports) {
/**
 * Days in 1 week.
 *
 * @name daysInWeek
 * @constant
 * @type {number}
 * @default
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "daysInWeek", ()=>daysInWeek);
parcelHelpers.export(exports, "daysInYear", ()=>daysInYear);
parcelHelpers.export(exports, "maxTime", ()=>maxTime);
parcelHelpers.export(exports, "millisecondsInMinute", ()=>millisecondsInMinute);
parcelHelpers.export(exports, "millisecondsInHour", ()=>millisecondsInHour);
parcelHelpers.export(exports, "millisecondsInSecond", ()=>millisecondsInSecond);
parcelHelpers.export(exports, "minTime", ()=>minTime);
parcelHelpers.export(exports, "minutesInHour", ()=>minutesInHour);
parcelHelpers.export(exports, "monthsInQuarter", ()=>monthsInQuarter);
parcelHelpers.export(exports, "monthsInYear", ()=>monthsInYear);
parcelHelpers.export(exports, "quartersInYear", ()=>quartersInYear);
parcelHelpers.export(exports, "secondsInHour", ()=>secondsInHour);
parcelHelpers.export(exports, "secondsInMinute", ()=>secondsInMinute);
parcelHelpers.export(exports, "secondsInDay", ()=>secondsInDay);
parcelHelpers.export(exports, "secondsInWeek", ()=>secondsInWeek);
parcelHelpers.export(exports, "secondsInYear", ()=>secondsInYear);
parcelHelpers.export(exports, "secondsInMonth", ()=>secondsInMonth);
parcelHelpers.export(exports, "secondsInQuarter", ()=>secondsInQuarter);
var daysInWeek = 7;
var daysInYear = 365.2425;
var maxTime = Math.pow(10, 8) * 86400000;
var millisecondsInMinute = 60000;
var millisecondsInHour = 3600000;
var millisecondsInSecond = 1000;
var minTime = -maxTime;
var minutesInHour = 60;
var monthsInQuarter = 3;
var monthsInYear = 12;
var quartersInYear = 4;
var secondsInHour = 3600;
var secondsInMinute = 60;
var secondsInDay = secondsInHour * 24;
var secondsInWeek = secondsInDay * 7;
var secondsInYear = secondsInDay * daysInYear;
var secondsInMonth = secondsInYear / 12;
var secondsInQuarter = secondsInMonth * 3;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"1Ws3e":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "vscodeSettings", ()=>vscodeSettings);
var _dir = require("dir");
var _fsJetpack = require("fs-jetpack");
var _path = require("path");
const vscodeSettings = async ()=>{
    const vscodeFile = (0, _dir.dir).path(".vscode/settings.json");
    const source = JSON.stringify(defaultVsSettings, null, 2);
    if (await (0, _fsJetpack.existsAsync)(vscodeFile)) {
        if (await (0, _fsJetpack.readAsync)(vscodeFile, "utf8") === source) return;
    }
    await (0, _fsJetpack.dirAsync)((0, _path.dirname)(vscodeFile));
    await (0, _fsJetpack.writeAsync)(vscodeFile, source);
};
const defaultVsSettings = {
    "typescript.preferences.importModuleSpecifier": "relative",
    "search.exclude": {
        "app/gen/**": true
    },
    "typescript.updateImportsOnFileMove.enabled": "always",
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": true,
        "**/Thumbs.db": true,
        "**/bun.lockb": true,
        "**/go.sum": true,
        ".output/.cache": true,
        "**/.parcelrc": true,
        "**/pnpm-lock.yaml": true,
        "**/.gitignore": true,
        "**/.npmrc": true,
        "**/.postcssrc": true,
        "**/pnpm-workspace.yaml": true,
        "**/.vscode": true,
        "**/build": true,
        "**/node_modules": true,
        "**/.htmlnanorc": true,
        "**/.parcel-cache": true,
        ".fleet": true,
        ".vscode": true,
        ".husky": true,
        base: true,
        "app/gen": true
    },
    "hide-files.files": []
};

},{"dir":"er1Is","fs-jetpack":"dr8qG","path":"path","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"auii2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "setupWatchers", ()=>setupWatchers);
var _watch = require("bundler/src/watch");
var _dir = require("dir");
var _service = require("./service");
const setupWatchers = (args, onExit)=>{
    if (args.includes("devbase")) [
        "pkgs/base",
        "pkgs/service"
    ].map((e)=>{
        (0, _watch.watcher).watch({
            dir: (0, _dir.dir).root(e),
            ignore: [
                "pkgs/*/node_modules",
                "node_modules"
            ],
            event: async (err, ev)=>{
                if (!err) {
                    await onExit();
                    process.exit();
                }
            }
        });
    });
    (0, _service.scaffoldServiceOnNewDir)();
};

},{"bundler/src/watch":"2P9Gs","dir":"er1Is","./service":"ju865","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"ju865":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scaffoldServiceOnNewDir", ()=>scaffoldServiceOnNewDir);
var _watch = require("bundler/src/watch");
var _chalk = require("chalk");
var _chalkDefault = parcelHelpers.interopDefault(_chalk);
var _dir = require("dir");
var _fsJetpack = require("fs-jetpack");
var _promises = require("fs/promises");
var _path = require("path");
var _pkg = require("pkg");
var _service = require("../appgen/service");
const scaffoldServiceOnNewDir = ()=>{
    (0, _watch.watcher).watch([
        {
            dir: (0, _dir.dir).root("app"),
            event: async (err, changes)=>{
                if (!err) for (const c of changes){
                    if (c.type === "delete") {
                        console.log(`Removing service: ${(0, _chalkDefault.default).red((0, _path.basename)(c.path))}`);
                        await (0, _pkg.pkg).install((0, _dir.dir).root(""));
                    } else if (c.type === "create") {
                        const s = await (0, _promises.stat)(c.path);
                        if (s.isDirectory() && (await (0, _promises.readdir)(c.path)).length === 0) {
                            console.log(`Scaffolding new service: ${(0, _chalkDefault.default).blue((0, _path.basename)(c.path))}`);
                            const files = await (0, _promises.readdir)((0, _dir.dir).root("pkgs/template/pkgs/service"));
                            for (const f of files)if (f !== "node_modules") {
                                const src = await (0, _fsJetpack.readAsync)((0, _dir.dir).root(`pkgs/template/pkgs/service/${f}`), "utf8");
                                await (0, _fsJetpack.writeAsync)((0, _path.join)(c.path, f), (src || "").replace(/template_service/g, (0, _path.basename)(c.path)));
                            }
                            await (0, _service.serviceGen)();
                            await (0, _pkg.pkg).install((0, _dir.dir).root(""));
                        }
                    }
                }
            }
        }
    ]);
};

},{"bundler/src/watch":"2P9Gs","chalk":"1lbiC","dir":"er1Is","fs-jetpack":"dr8qG","fs/promises":"fs/promises","path":"path","pkg":"hBNqT","../appgen/service":"6695X","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}],"6695X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "serviceGen", ()=>serviceGen);
var _dir = require("dir");
var _fsJetpack = require("fs-jetpack");
var _promises = require("fs/promises");
const serviceGen = async ()=>{
    const names = [];
    for (const f of (await (0, _promises.readdir)((0, _dir.dir).root("app")))){
        const s = await (0, _promises.stat)((0, _dir.dir).root(`app/${f}`));
        if (s.isDirectory() && await (0, _fsJetpack.existsAsync)((0, _dir.dir).root(`app/${f}/main.ts`))) names.push(f);
        await (0, _fsJetpack.writeAsync)((0, _dir.dir).root(`app/gen/service/name.ts`), `export type SERVICE_NAME = "${names.join(`" | "`)}";`);
    }
};

},{"dir":"er1Is","fs-jetpack":"dr8qG","fs/promises":"fs/promises","@parcel/transformer-js/src/esmodule-helpers.js":"bmjVl"}]},["iLELz"], "iLELz", "parcelRequire9e86")

//# sourceMappingURL=main.js.map
