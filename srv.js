var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// pkgs/service/internal/service/build/jetpack/lib/utils/promisify.js
var require_promisify = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/utils/promisify.js"(exports, module2) {
    "use strict";
    module2.exports = (fn) => {
      return function() {
        const length = arguments.length;
        const args = new Array(length);
        for (let i = 0; i < length; i += 1) {
          args[i] = arguments[i];
        }
        return new Promise((resolve, reject) => {
          args.push((err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
          if (Array.isArray(args) && args) {
            for (const v of args) {
              if (typeof v === "object" && !Array.isArray(v)) {
                for (const [i, j] of Object.entries(v)) {
                  if (j === void 0) {
                    delete v[i];
                  }
                }
              }
            }
          }
          fn.apply(null, args);
        });
      };
    };
  }
});

// pkgs/service/internal/service/build/jetpack/lib/utils/fs.js
var require_fs = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/utils/fs.js"(exports, module2) {
    "use strict";
    var import_fs2 = __toESM(require("fs"));
    var import_promisify = __toESM(require_promisify());
    var fs = import_fs2.default;
    var promisify = import_promisify.default;
    var isCallbackMethod = (key) => {
      return [
        typeof fs[key] === "function",
        !key.match(/Sync$/),
        !key.match(/^[A-Z]/),
        !key.match(/^create/),
        !key.match(/^(un)?watch/)
      ].every(Boolean);
    };
    var adaptMethod = (name) => {
      const original = fs[name];
      return promisify(original);
    };
    var adaptAllMethods = () => {
      const adapted = {};
      Object.keys(fs).forEach((key) => {
        if (isCallbackMethod(key)) {
          if (key === "exists") {
            adapted.exists = () => {
              throw new Error("fs.exists() is deprecated");
            };
          } else {
            adapted[key] = adaptMethod(key);
          }
        } else {
          adapted[key] = fs[key];
        }
      });
      return adapted;
    };
    module2.exports = adaptAllMethods();
  }
});

// pkgs/service/internal/service/build/jetpack/lib/utils/validate.js
var require_validate = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/utils/validate.js"(exports, module2) {
    "use strict";
    var prettyPrintTypes = (types) => {
      const addArticle = (str) => {
        const vowels = ["a", "e", "i", "o", "u"];
        if (vowels.indexOf(str[0]) !== -1) {
          return `an ${str}`;
        }
        return `a ${str}`;
      };
      return types.map(addArticle).join(" or ");
    };
    var isArrayOfNotation = (typeDefinition) => {
      return /array of /.test(typeDefinition);
    };
    var extractTypeFromArrayOfNotation = (typeDefinition) => {
      return typeDefinition.split(" of ")[1];
    };
    var isValidTypeDefinition = (typeStr) => {
      if (isArrayOfNotation(typeStr)) {
        return isValidTypeDefinition(extractTypeFromArrayOfNotation(typeStr));
      }
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
      ].some((validType) => {
        return validType === typeStr;
      });
    };
    var detectType = (value) => {
      if (value === null) {
        return "null";
      }
      if (Array.isArray(value)) {
        return "array";
      }
      if (Buffer.isBuffer(value)) {
        return "buffer";
      }
      return typeof value;
    };
    var onlyUniqueValuesInArrayFilter = (value, index, self) => {
      return self.indexOf(value) === index;
    };
    var detectTypeDeep = (value) => {
      let type = detectType(value);
      let typesInArray;
      if (type === "array") {
        typesInArray = value.map((element) => {
          return detectType(element);
        }).filter(onlyUniqueValuesInArrayFilter);
        type += ` of ${typesInArray.join(", ")}`;
      }
      return type;
    };
    var validateArray = (argumentValue, typeToCheck) => {
      const allowedTypeInArray = extractTypeFromArrayOfNotation(typeToCheck);
      if (detectType(argumentValue) !== "array") {
        return false;
      }
      return argumentValue.every((element) => {
        return detectType(element) === allowedTypeInArray;
      });
    };
    var validateArgument = (methodName, argumentName, argumentValue, argumentMustBe) => {
      const isOneOfAllowedTypes = argumentMustBe.some((type) => {
        if (!isValidTypeDefinition(type)) {
          throw new Error(`Unknown type "${type}"`);
        }
        if (isArrayOfNotation(type)) {
          return validateArray(argumentValue, type);
        }
        return type === detectType(argumentValue);
      });
      if (!isOneOfAllowedTypes) {
        throw new Error(
          `Argument "${argumentName}" passed to ${methodName} must be ${prettyPrintTypes(
            argumentMustBe
          )}. Received ${detectTypeDeep(argumentValue)}`
        );
      }
    };
    var validateOptions = (methodName, optionsObjName, obj, allowedOptions) => {
      if (obj !== void 0) {
        validateArgument(methodName, optionsObjName, obj, ["object"]);
        Object.keys(obj).forEach((key) => {
          const argName = `${optionsObjName}.${key}`;
          if (allowedOptions[key] !== void 0) {
            validateArgument(methodName, argName, obj[key], allowedOptions[key]);
          } else {
            throw new Error(
              `Unknown argument "${argName}" passed to ${methodName}`
            );
          }
        });
      }
    };
    module2.exports = {
      argument: validateArgument,
      options: validateOptions
    };
  }
});

// pkgs/service/internal/service/build/jetpack/lib/utils/mode.js
var require_mode = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/utils/mode.js"(exports) {
    "use strict";
    exports.normalizeFileMode = (mode) => {
      let modeAsString;
      if (typeof mode === "number") {
        modeAsString = mode.toString(8);
      } else {
        modeAsString = mode;
      }
      return modeAsString.substring(modeAsString.length - 3);
    };
  }
});

// pkgs/service/internal/service/build/jetpack/lib/remove.js
var require_remove = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/remove.js"(exports) {
    "use strict";
    var import_fs2 = __toESM(require_fs());
    var import_validate = __toESM(require_validate());
    var fs = import_fs2.default;
    var validate = import_validate.default;
    var validateInput = (methodName, path2) => {
      const methodSignature = `${methodName}([path])`;
      validate.argument(methodSignature, "path", path2, ["string", "undefined"]);
    };
    var removeSync = (path2) => {
      fs.rmSync(path2, {
        recursive: true,
        force: true,
        maxRetries: 3
      });
    };
    var removeAsync2 = (path2) => {
      return fs.rm(path2, {
        recursive: true,
        force: true,
        maxRetries: 3
      });
    };
    exports.validateInput = validateInput;
    exports.sync = removeSync;
    exports.async = removeAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/dir.js
var require_dir = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/dir.js"(exports) {
    "use strict";
    var import_path8 = __toESM(require("path"));
    var import_fs2 = __toESM(require_fs());
    var import_mode = __toESM(require_mode());
    var import_validate = __toESM(require_validate());
    var import_remove = __toESM(require_remove());
    var pathUtil = import_path8.default;
    var fs = import_fs2.default;
    var modeUtil = import_mode.default;
    var validate = import_validate.default;
    var remove2 = import_remove.default;
    var validateInput = (methodName, path2, criteria) => {
      const methodSignature = `${methodName}(path, [criteria])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.options(methodSignature, "criteria", criteria, {
        empty: ["boolean"],
        mode: ["string", "number"]
      });
    };
    var getCriteriaDefaults = (passedCriteria) => {
      const criteria = passedCriteria || {};
      if (typeof criteria.empty !== "boolean") {
        criteria.empty = false;
      }
      if (criteria.mode !== void 0) {
        criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
      }
      return criteria;
    };
    var generatePathOccupiedByNotDirectoryError = (path2) => {
      return new Error(
        `Path ${path2} exists but is not a directory. Halting jetpack.dir() call for safety reasons.`
      );
    };
    var checkWhatAlreadyOccupiesPathSync = (path2) => {
      let stat3;
      try {
        stat3 = fs.statSync(path2);
      } catch (err) {
        if (err.code !== "ENOENT") {
          throw err;
        }
      }
      if (stat3 && !stat3.isDirectory()) {
        throw generatePathOccupiedByNotDirectoryError(path2);
      }
      return stat3;
    };
    var createBrandNewDirectorySync = (path2, opts) => {
      const options = opts || {};
      try {
        fs.mkdirSync(path2, options.mode);
      } catch (err) {
        if (err.code === "ENOENT") {
          createBrandNewDirectorySync(pathUtil.dirname(path2), options);
          fs.mkdirSync(path2, options.mode);
        } else if (err.code === "EEXIST") {
        } else {
          throw err;
        }
      }
    };
    var checkExistingDirectoryFulfillsCriteriaSync = (path2, stat3, criteria) => {
      const checkMode = () => {
        const mode = modeUtil.normalizeFileMode(stat3.mode);
        if (criteria.mode !== void 0 && criteria.mode !== mode) {
          fs.chmodSync(path2, criteria.mode);
        }
      };
      const checkEmptiness = () => {
        if (criteria.empty) {
          const list2 = fs.readdirSync(path2);
          list2.forEach((filename) => {
            remove2.sync(pathUtil.resolve(path2, filename));
          });
        }
      };
      checkMode();
      checkEmptiness();
    };
    var dirSync = (path2, passedCriteria) => {
      const criteria = getCriteriaDefaults(passedCriteria);
      const stat3 = checkWhatAlreadyOccupiesPathSync(path2);
      if (stat3) {
        checkExistingDirectoryFulfillsCriteriaSync(path2, stat3, criteria);
      } else {
        createBrandNewDirectorySync(path2, criteria);
      }
    };
    var checkWhatAlreadyOccupiesPathAsync = (path2) => {
      return new Promise((resolve, reject) => {
        fs.stat(path2).then((stat3) => {
          if (stat3.isDirectory()) {
            resolve(stat3);
          } else {
            reject(generatePathOccupiedByNotDirectoryError(path2));
          }
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(void 0);
          } else {
            reject(err);
          }
        });
      });
    };
    var emptyAsync = (path2) => {
      return new Promise((resolve, reject) => {
        fs.readdir(path2).then((list2) => {
          const doOne = (index) => {
            if (index === list2.length) {
              resolve();
            } else {
              const subPath = pathUtil.resolve(path2, list2[index]);
              remove2.async(subPath).then(() => {
                doOne(index + 1);
              });
            }
          };
          doOne(0);
        }).catch(reject);
      });
    };
    var checkExistingDirectoryFulfillsCriteriaAsync = (path2, stat3, criteria) => {
      return new Promise((resolve, reject) => {
        const checkMode = () => {
          const mode = modeUtil.normalizeFileMode(stat3.mode);
          if (criteria.mode !== void 0 && criteria.mode !== mode) {
            return fs.chmod(path2, criteria.mode);
          }
          return Promise.resolve();
        };
        const checkEmptiness = () => {
          if (criteria.empty) {
            return emptyAsync(path2);
          }
          return Promise.resolve();
        };
        checkMode().then(checkEmptiness).then(resolve, reject);
      });
    };
    var createBrandNewDirectoryAsync = (path2, opts) => {
      const options = opts || {};
      return new Promise((resolve, reject) => {
        fs.mkdir(path2, options.mode).then(resolve).catch((err) => {
          if (err.code === "ENOENT") {
            createBrandNewDirectoryAsync(pathUtil.dirname(path2), options).then(() => {
              return fs.mkdir(path2, options.mode);
            }).then(resolve).catch((err2) => {
              if (err2.code === "EEXIST") {
                resolve();
              } else {
                reject(err2);
              }
            });
          } else if (err.code === "EEXIST") {
            resolve();
          } else {
            reject(err);
          }
        });
      });
    };
    var dirAsync2 = (path2, passedCriteria) => {
      return new Promise((resolve, reject) => {
        const criteria = getCriteriaDefaults(passedCriteria);
        checkWhatAlreadyOccupiesPathAsync(path2).then((stat3) => {
          if (stat3 !== void 0) {
            return checkExistingDirectoryFulfillsCriteriaAsync(
              path2,
              stat3,
              criteria
            );
          }
          return createBrandNewDirectoryAsync(path2, criteria);
        }).then(resolve, reject);
      });
    };
    exports.validateInput = validateInput;
    exports.sync = dirSync;
    exports.createSync = createBrandNewDirectorySync;
    exports.async = dirAsync2;
    exports.createAsync = createBrandNewDirectoryAsync;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/write.js
var require_write = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/write.js"(exports) {
    "use strict";
    var import_path8 = __toESM(require("path"));
    var import_fs2 = __toESM(require_fs());
    var import_validate = __toESM(require_validate());
    var import_dir = __toESM(require_dir());
    var pathUtil = import_path8.default;
    var fs = import_fs2.default;
    var validate = import_validate.default;
    var dir2 = import_dir.default;
    var validateInput = (methodName, path2, data, options) => {
      const methodSignature = `${methodName}(path, data, [options])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.argument(methodSignature, "data", data, [
        "string",
        "buffer",
        "object",
        "array"
      ]);
      validate.options(methodSignature, "options", options, {
        mode: ["string", "number"],
        atomic: ["boolean"],
        jsonIndent: ["number"]
      });
    };
    var newExt = ".__new__";
    var serializeToJsonMaybe = (data, jsonIndent) => {
      let indent = jsonIndent;
      if (typeof indent !== "number") {
        indent = 2;
      }
      if (typeof data === "object" && !Buffer.isBuffer(data) && data !== null) {
        return JSON.stringify(data, null, indent);
      }
      return data;
    };
    var writeFileSync = (path2, data, options) => {
      try {
        fs.writeFileSync(path2, data, options);
      } catch (err) {
        if (err.code === "ENOENT") {
          dir2.createSync(pathUtil.dirname(path2));
          fs.writeFileSync(path2, data, options);
        } else {
          throw err;
        }
      }
    };
    var writeAtomicSync = (path2, data, options) => {
      writeFileSync(path2 + newExt, data, options);
      fs.renameSync(path2 + newExt, path2);
    };
    var writeSync = (path2, data, options) => {
      const opts = options || {};
      const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
      let writeStrategy = writeFileSync;
      if (opts.atomic) {
        writeStrategy = writeAtomicSync;
      }
      writeStrategy(path2, processedData, { mode: opts.mode });
    };
    var writeFileAsync = (path2, data, options) => {
      return new Promise((resolve, reject) => {
        fs.writeFile(path2, data, options).then(resolve).catch((err) => {
          if (err.code === "ENOENT") {
            dir2.createAsync(pathUtil.dirname(path2)).then(() => {
              return fs.writeFile(path2, data, options);
            }).then(resolve, reject);
          } else {
            reject(err);
          }
        });
      });
    };
    var writeAtomicAsync = (path2, data, options) => {
      return new Promise((resolve, reject) => {
        writeFileAsync(path2 + newExt, data, options).then(() => {
          return fs.rename(path2 + newExt, path2);
        }).then(resolve, reject);
      });
    };
    var writeAsync2 = (path2, data, options) => {
      const opts = options || {};
      const processedData = serializeToJsonMaybe(data, opts.jsonIndent);
      let writeStrategy = writeFileAsync;
      if (opts.atomic) {
        writeStrategy = writeAtomicAsync;
      }
      return writeStrategy(path2, processedData, { mode: opts.mode });
    };
    exports.validateInput = validateInput;
    exports.sync = writeSync;
    exports.async = writeAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/append.js
var require_append = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/append.js"(exports) {
    "use strict";
    var import_fs2 = __toESM(require_fs());
    var import_write = __toESM(require_write());
    var import_validate = __toESM(require_validate());
    var fs = import_fs2.default;
    var write2 = import_write.default;
    var validate = import_validate.default;
    var validateInput = (methodName, path2, data, options) => {
      const methodSignature = `${methodName}(path, data, [options])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.argument(methodSignature, "data", data, ["string", "buffer"]);
      validate.options(methodSignature, "options", options, {
        mode: ["string", "number"]
      });
    };
    var appendSync = (path2, data, options) => {
      try {
        fs.appendFileSync(path2, data, options);
      } catch (err) {
        if (err.code === "ENOENT") {
          write2.sync(path2, data, options);
        } else {
          throw err;
        }
      }
    };
    var appendAsync2 = (path2, data, options) => {
      return new Promise((resolve, reject) => {
        fs.appendFile(path2, data, options).then(resolve).catch((err) => {
          if (err.code === "ENOENT") {
            write2.async(path2, data, options).then(resolve, reject);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = appendSync;
    exports.async = appendAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/file.js
var require_file = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/file.js"(exports) {
    "use strict";
    var import_fs2 = __toESM(require_fs());
    var import_mode = __toESM(require_mode());
    var import_validate = __toESM(require_validate());
    var import_write = __toESM(require_write());
    var fs = import_fs2.default;
    var modeUtil = import_mode.default;
    var validate = import_validate.default;
    var write2 = import_write.default;
    var validateInput = (methodName, path2, criteria) => {
      const methodSignature = `${methodName}(path, [criteria])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.options(methodSignature, "criteria", criteria, {
        content: ["string", "buffer", "object", "array"],
        jsonIndent: ["number"],
        mode: ["string", "number"]
      });
    };
    var getCriteriaDefaults = (passedCriteria) => {
      const criteria = passedCriteria || {};
      if (criteria.mode !== void 0) {
        criteria.mode = modeUtil.normalizeFileMode(criteria.mode);
      }
      return criteria;
    };
    var generatePathOccupiedByNotFileError = (path2) => {
      return new Error(
        `Path ${path2} exists but is not a file. Halting jetpack.file() call for safety reasons.`
      );
    };
    var checkWhatAlreadyOccupiesPathSync = (path2) => {
      let stat3;
      try {
        stat3 = fs.statSync(path2);
      } catch (err) {
        if (err.code !== "ENOENT") {
          throw err;
        }
      }
      if (stat3 && !stat3.isFile()) {
        throw generatePathOccupiedByNotFileError(path2);
      }
      return stat3;
    };
    var checkExistingFileFulfillsCriteriaSync = (path2, stat3, criteria) => {
      const mode = modeUtil.normalizeFileMode(stat3.mode);
      const checkContent = () => {
        if (criteria.content !== void 0) {
          write2.sync(path2, criteria.content, {
            mode,
            jsonIndent: criteria.jsonIndent
          });
          return true;
        }
        return false;
      };
      const checkMode = () => {
        if (criteria.mode !== void 0 && criteria.mode !== mode) {
          fs.chmodSync(path2, criteria.mode);
        }
      };
      const contentReplaced = checkContent();
      if (!contentReplaced) {
        checkMode();
      }
    };
    var createBrandNewFileSync = (path2, criteria) => {
      let content = "";
      if (criteria.content !== void 0) {
        content = criteria.content;
      }
      write2.sync(path2, content, {
        mode: criteria.mode,
        jsonIndent: criteria.jsonIndent
      });
    };
    var fileSync = (path2, passedCriteria) => {
      const criteria = getCriteriaDefaults(passedCriteria);
      const stat3 = checkWhatAlreadyOccupiesPathSync(path2);
      if (stat3 !== void 0) {
        checkExistingFileFulfillsCriteriaSync(path2, stat3, criteria);
      } else {
        createBrandNewFileSync(path2, criteria);
      }
    };
    var checkWhatAlreadyOccupiesPathAsync = (path2) => {
      return new Promise((resolve, reject) => {
        fs.stat(path2).then((stat3) => {
          if (stat3.isFile()) {
            resolve(stat3);
          } else {
            reject(generatePathOccupiedByNotFileError(path2));
          }
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(void 0);
          } else {
            reject(err);
          }
        });
      });
    };
    var checkExistingFileFulfillsCriteriaAsync = (path2, stat3, criteria) => {
      const mode = modeUtil.normalizeFileMode(stat3.mode);
      const checkContent = () => {
        return new Promise((resolve, reject) => {
          if (criteria.content !== void 0) {
            write2.async(path2, criteria.content, {
              mode,
              jsonIndent: criteria.jsonIndent
            }).then(() => {
              resolve(true);
            }).catch(reject);
          } else {
            resolve(false);
          }
        });
      };
      const checkMode = () => {
        if (criteria.mode !== void 0 && criteria.mode !== mode) {
          return fs.chmod(path2, criteria.mode);
        }
        return void 0;
      };
      return checkContent().then((contentReplaced) => {
        if (!contentReplaced) {
          return checkMode();
        }
        return void 0;
      });
    };
    var createBrandNewFileAsync = (path2, criteria) => {
      let content = "";
      if (criteria.content !== void 0) {
        content = criteria.content;
      }
      return write2.async(path2, content, {
        mode: criteria.mode,
        jsonIndent: criteria.jsonIndent
      });
    };
    var fileAsync2 = (path2, passedCriteria) => {
      return new Promise((resolve, reject) => {
        const criteria = getCriteriaDefaults(passedCriteria);
        checkWhatAlreadyOccupiesPathAsync(path2).then((stat3) => {
          if (stat3 !== void 0) {
            return checkExistingFileFulfillsCriteriaAsync(path2, stat3, criteria);
          }
          return createBrandNewFileAsync(path2, criteria);
        }).then(resolve, reject);
      });
    };
    exports.validateInput = validateInput;
    exports.sync = fileSync;
    exports.async = fileAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/inspect.js
var require_inspect = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/inspect.js"(exports) {
    "use strict";
    var import_crypto = __toESM(require("crypto"));
    var import_path8 = __toESM(require("path"));
    var import_fs2 = __toESM(require_fs());
    var import_validate = __toESM(require_validate());
    var crypto = import_crypto.default;
    var pathUtil = import_path8.default;
    var fs = import_fs2.default;
    var validate = import_validate.default;
    var supportedChecksumAlgorithms = ["md5", "sha1", "sha256", "sha512"];
    var symlinkOptions = ["report", "follow"];
    var validateInput = (methodName, path2, options) => {
      const methodSignature = `${methodName}(path, [options])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.options(methodSignature, "options", options, {
        checksum: ["string"],
        mode: ["boolean"],
        times: ["boolean"],
        absolutePath: ["boolean"],
        symlinks: ["string"]
      });
      if (options && options.checksum !== void 0 && supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
        throw new Error(
          `Argument "options.checksum" passed to ${methodSignature} must have one of values: ${supportedChecksumAlgorithms.join(
            ", "
          )}`
        );
      }
      if (options && options.symlinks !== void 0 && symlinkOptions.indexOf(options.symlinks) === -1) {
        throw new Error(
          `Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${symlinkOptions.join(
            ", "
          )}`
        );
      }
    };
    var createInspectObj = (path2, options, stat3) => {
      const obj = {};
      obj.name = pathUtil.basename(path2);
      if (stat3.isFile()) {
        obj.type = "file";
        obj.size = stat3.size;
      } else if (stat3.isDirectory()) {
        obj.type = "dir";
      } else if (stat3.isSymbolicLink()) {
        obj.type = "symlink";
      } else {
        obj.type = "other";
      }
      if (options.mode) {
        obj.mode = stat3.mode;
      }
      if (options.times) {
        obj.accessTime = stat3.atime;
        obj.modifyTime = stat3.mtime;
        obj.changeTime = stat3.ctime;
        obj.birthTime = stat3.birthtime;
      }
      if (options.absolutePath) {
        obj.absolutePath = path2;
      }
      return obj;
    };
    var fileChecksum = (path2, algo) => {
      const hash = crypto.createHash(algo);
      const data = fs.readFileSync(path2);
      hash.update(data);
      return hash.digest("hex");
    };
    var addExtraFieldsSync = (path2, inspectObj, options) => {
      if (inspectObj.type === "file" && options.checksum) {
        inspectObj[options.checksum] = fileChecksum(path2, options.checksum);
      } else if (inspectObj.type === "symlink") {
        inspectObj.pointsAt = fs.readlinkSync(path2);
      }
    };
    var inspectSync = (path2, options) => {
      let statOperation = fs.lstatSync;
      let stat3;
      const opts = options || {};
      if (opts.symlinks === "follow") {
        statOperation = fs.statSync;
      }
      try {
        stat3 = statOperation(path2);
      } catch (err) {
        if (err.code === "ENOENT") {
          return void 0;
        }
        throw err;
      }
      const inspectObj = createInspectObj(path2, opts, stat3);
      addExtraFieldsSync(path2, inspectObj, opts);
      return inspectObj;
    };
    var fileChecksumAsync = (path2, algo) => {
      return new Promise((resolve, reject) => {
        const hash = crypto.createHash(algo);
        const s = fs.createReadStream(path2);
        s.on("data", (data) => {
          hash.update(data);
        });
        s.on("end", () => {
          resolve(hash.digest("hex"));
        });
        s.on("error", reject);
      });
    };
    var addExtraFieldsAsync = (path2, inspectObj, options) => {
      if (inspectObj.type === "file" && options.checksum) {
        return fileChecksumAsync(path2, options.checksum).then((checksum) => {
          inspectObj[options.checksum] = checksum;
          return inspectObj;
        });
      } else if (inspectObj.type === "symlink") {
        return fs.readlink(path2).then((linkPath) => {
          inspectObj.pointsAt = linkPath;
          return inspectObj;
        });
      }
      return Promise.resolve(inspectObj);
    };
    var inspectAsync2 = (path2, options) => {
      return new Promise((resolve, reject) => {
        let statOperation = fs.lstat;
        const opts = options || {};
        if (opts.symlinks === "follow") {
          statOperation = fs.stat;
        }
        statOperation(path2).then((stat3) => {
          const inspectObj = createInspectObj(path2, opts, stat3);
          addExtraFieldsAsync(path2, inspectObj, opts).then(resolve, reject);
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(void 0);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.supportedChecksumAlgorithms = supportedChecksumAlgorithms;
    exports.symlinkOptions = symlinkOptions;
    exports.validateInput = validateInput;
    exports.sync = inspectSync;
    exports.async = inspectAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/list.js
var require_list = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/list.js"(exports) {
    "use strict";
    var import_fs2 = __toESM(require_fs());
    var import_validate = __toESM(require_validate());
    var fs = import_fs2.default;
    var validate = import_validate.default;
    var validateInput = (methodName, path2) => {
      const methodSignature = `${methodName}(path)`;
      validate.argument(methodSignature, "path", path2, ["string", "undefined"]);
    };
    var listSync = (path2) => {
      try {
        return fs.readdirSync(path2);
      } catch (err) {
        if (err.code === "ENOENT") {
          return void 0;
        }
        throw err;
      }
    };
    var listAsync2 = (path2) => {
      return new Promise((resolve, reject) => {
        fs.readdir(path2).then((list2) => {
          resolve(list2);
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(void 0);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = listSync;
    exports.async = listAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/utils/tree_walker.js
var require_tree_walker = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/utils/tree_walker.js"(exports) {
    "use strict";
    var import_fs2 = __toESM(require("fs"));
    var import_path8 = __toESM(require("path"));
    var import_inspect = __toESM(require_inspect());
    var import_list = __toESM(require_list());
    var fs = import_fs2.default;
    var pathUtil = import_path8.default;
    var inspect2 = import_inspect.default;
    var fileType = (dirent) => {
      if (dirent.isDirectory()) {
        return "dir";
      }
      if (dirent.isFile()) {
        return "file";
      }
      if (dirent.isSymbolicLink()) {
        return "symlink";
      }
      return "other";
    };
    var initialWalkSync = (path2, options, callback) => {
      if (options.maxLevelsDeep === void 0) {
        options.maxLevelsDeep = Infinity;
      }
      const performInspectOnEachNode = options.inspectOptions !== void 0;
      if (options.symlinks) {
        if (options.inspectOptions === void 0) {
          options.inspectOptions = { symlinks: options.symlinks };
        } else {
          options.inspectOptions.symlinks = options.symlinks;
        }
      }
      const walkSync = (path3, currentLevel) => {
        fs.readdirSync(path3, { withFileTypes: true }).forEach((direntItem) => {
          const withFileTypesNotSupported = typeof direntItem === "string";
          let fileItemPath;
          if (withFileTypesNotSupported) {
            fileItemPath = pathUtil.join(path3, direntItem);
          } else {
            fileItemPath = pathUtil.join(path3, direntItem.name);
          }
          let fileItem;
          if (performInspectOnEachNode) {
            fileItem = inspect2.sync(fileItemPath, options.inspectOptions);
          } else if (withFileTypesNotSupported) {
            const inspectObject = inspect2.sync(
              fileItemPath,
              options.inspectOptions
            );
            fileItem = { name: inspectObject.name, type: inspectObject.type };
          } else {
            const type = fileType(direntItem);
            if (type === "symlink" && options.symlinks === "follow") {
              const symlinkPointsTo = fs.statSync(fileItemPath);
              fileItem = { name: direntItem.name, type: fileType(symlinkPointsTo) };
            } else {
              fileItem = { name: direntItem.name, type };
            }
          }
          if (fileItem !== void 0) {
            callback(fileItemPath, fileItem);
            if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
              walkSync(fileItemPath, currentLevel + 1);
            }
          }
        });
      };
      const item = inspect2.sync(path2, options.inspectOptions);
      if (item) {
        if (performInspectOnEachNode) {
          callback(path2, item);
        } else {
          callback(path2, { name: item.name, type: item.type });
        }
        if (item.type === "dir") {
          walkSync(path2, 1);
        }
      } else {
        callback(path2, void 0);
      }
    };
    var maxConcurrentOperations = 5;
    var initialWalkAsync = (path2, options, callback, doneCallback) => {
      if (options.maxLevelsDeep === void 0) {
        options.maxLevelsDeep = Infinity;
      }
      const performInspectOnEachNode = options.inspectOptions !== void 0;
      if (options.symlinks) {
        if (options.inspectOptions === void 0) {
          options.inspectOptions = { symlinks: options.symlinks };
        } else {
          options.inspectOptions.symlinks = options.symlinks;
        }
      }
      const concurrentOperationsQueue = [];
      let nowDoingConcurrentOperations = 0;
      const checkConcurrentOperations = () => {
        if (concurrentOperationsQueue.length === 0 && nowDoingConcurrentOperations === 0) {
          doneCallback();
        } else if (concurrentOperationsQueue.length > 0 && nowDoingConcurrentOperations < maxConcurrentOperations) {
          const operation = concurrentOperationsQueue.pop();
          nowDoingConcurrentOperations += 1;
          operation();
        }
      };
      const whenConcurrencySlotAvailable = (operation) => {
        concurrentOperationsQueue.push(operation);
        checkConcurrentOperations();
      };
      const concurrentOperationDone = () => {
        nowDoingConcurrentOperations -= 1;
        checkConcurrentOperations();
      };
      const walkAsync = (path3, currentLevel) => {
        const goDeeperIfDir = (fileItemPath, fileItem) => {
          if (fileItem.type === "dir" && currentLevel < options.maxLevelsDeep) {
            walkAsync(fileItemPath, currentLevel + 1);
          }
        };
        whenConcurrencySlotAvailable(() => {
          fs.readdir(path3, { withFileTypes: true }, (err, files) => {
            if (err) {
              doneCallback(err);
            } else {
              files.forEach((direntItem) => {
                const withFileTypesNotSupported = typeof direntItem === "string";
                let fileItemPath;
                if (withFileTypesNotSupported) {
                  fileItemPath = pathUtil.join(path3, direntItem);
                } else {
                  fileItemPath = pathUtil.join(path3, direntItem.name);
                }
                if (performInspectOnEachNode || withFileTypesNotSupported) {
                  whenConcurrencySlotAvailable(() => {
                    inspect2.async(fileItemPath, options.inspectOptions).then((fileItem) => {
                      if (fileItem !== void 0) {
                        if (performInspectOnEachNode) {
                          callback(fileItemPath, fileItem);
                        } else {
                          callback(fileItemPath, {
                            name: fileItem.name,
                            type: fileItem.type
                          });
                        }
                        goDeeperIfDir(fileItemPath, fileItem);
                      }
                      concurrentOperationDone();
                    }).catch((err2) => {
                      doneCallback(err2);
                    });
                  });
                } else {
                  const type = fileType(direntItem);
                  if (type === "symlink" && options.symlinks === "follow") {
                    whenConcurrencySlotAvailable(() => {
                      fs.stat(fileItemPath, (err2, symlinkPointsTo) => {
                        if (err2) {
                          doneCallback(err2);
                        } else {
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
                  } else {
                    const fileItem = { name: direntItem.name, type };
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
      inspect2.async(path2, options.inspectOptions).then((item) => {
        if (item) {
          if (performInspectOnEachNode) {
            callback(path2, item);
          } else {
            callback(path2, { name: item.name, type: item.type });
          }
          if (item.type === "dir") {
            walkAsync(path2, 1);
          } else {
            doneCallback();
          }
        } else {
          callback(path2, void 0);
          doneCallback();
        }
      }).catch((err) => {
        doneCallback(err);
      });
    };
    exports.sync = initialWalkSync;
    exports.async = initialWalkAsync;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/utils/matcher.js
var require_matcher = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/utils/matcher.js"(exports) {
    "use strict";
    var import_minimatch = __toESM(require("minimatch"));
    var Minimatch = import_minimatch.default.Minimatch;
    var convertPatternToAbsolutePath = (basePath, pattern) => {
      const hasSlash = pattern.indexOf("/") !== -1;
      const isAbsolute = /^!?\//.test(pattern);
      const isNegated = /^!/.test(pattern);
      let separator;
      if (!isAbsolute && hasSlash) {
        const patternWithoutFirstCharacters = pattern.replace(/^!/, "").replace(/^\.\//, "");
        if (/\/$/.test(basePath)) {
          separator = "";
        } else {
          separator = "/";
        }
        if (isNegated) {
          return `!${basePath}${separator}${patternWithoutFirstCharacters}`;
        }
        return `${basePath}${separator}${patternWithoutFirstCharacters}`;
      }
      return pattern;
    };
    exports.create = (basePath, patterns, ignoreCase) => {
      let normalizedPatterns;
      if (typeof patterns === "string") {
        normalizedPatterns = [patterns];
      } else {
        normalizedPatterns = patterns;
      }
      const matchers = normalizedPatterns.map((pattern) => {
        return convertPatternToAbsolutePath(basePath, pattern);
      }).map((pattern) => {
        return new Minimatch(pattern, {
          matchBase: true,
          nocomment: true,
          nocase: ignoreCase || false,
          dot: true,
          windowsPathsNoEscape: true
        });
      });
      const performMatch = (absolutePath) => {
        let mode = "matching";
        let weHaveMatch = false;
        let currentMatcher;
        let i;
        for (i = 0; i < matchers.length; i += 1) {
          currentMatcher = matchers[i];
          if (currentMatcher.negate) {
            mode = "negation";
            if (i === 0) {
              weHaveMatch = true;
            }
          }
          if (mode === "negation" && weHaveMatch && !currentMatcher.match(absolutePath)) {
            return false;
          }
          if (mode === "matching" && !weHaveMatch) {
            weHaveMatch = currentMatcher.match(absolutePath);
          }
        }
        return weHaveMatch;
      };
      return performMatch;
    };
  }
});

// pkgs/service/internal/service/build/jetpack/lib/find.js
var require_find = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/find.js"(exports) {
    "use strict";
    var import_path8 = __toESM(require("path"));
    var import_tree_walker = __toESM(require_tree_walker());
    var import_inspect = __toESM(require_inspect());
    var import_matcher = __toESM(require_matcher());
    var import_validate = __toESM(require_validate());
    var pathUtil = import_path8.default;
    var treeWalker = import_tree_walker.default;
    var inspect2 = import_inspect.default;
    var matcher = import_matcher.default;
    var validate = import_validate.default;
    var validateInput = (methodName, path2, options) => {
      const methodSignature = `${methodName}([path], options)`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.options(methodSignature, "options", options, {
        matching: ["string", "array of string"],
        filter: ["function"],
        files: ["boolean"],
        directories: ["boolean"],
        recursive: ["boolean"],
        ignoreCase: ["boolean"]
      });
    };
    var normalizeOptions = (options) => {
      const opts = options || {};
      if (opts.matching === void 0) {
        opts.matching = "*";
      }
      if (opts.files === void 0) {
        opts.files = true;
      }
      if (opts.ignoreCase === void 0) {
        opts.ignoreCase = false;
      }
      if (opts.directories === void 0) {
        opts.directories = false;
      }
      if (opts.recursive === void 0) {
        opts.recursive = true;
      }
      return opts;
    };
    var processFoundPaths = (foundPaths, cwd3) => {
      return foundPaths.map((path2) => {
        return pathUtil.relative(cwd3, path2);
      });
    };
    var generatePathDoesntExistError = (path2) => {
      const err = new Error(`Path you want to find stuff in doesn't exist ${path2}`);
      err.code = "ENOENT";
      return err;
    };
    var generatePathNotDirectoryError = (path2) => {
      const err = new Error(
        `Path you want to find stuff in must be a directory ${path2}`
      );
      err.code = "ENOTDIR";
      return err;
    };
    var findSync = (path2, options) => {
      const foundAbsolutePaths = [];
      const matchesAnyOfGlobs = matcher.create(
        path2,
        options.matching,
        options.ignoreCase
      );
      let maxLevelsDeep = Infinity;
      if (options.recursive === false) {
        maxLevelsDeep = 1;
      }
      treeWalker.sync(
        path2,
        {
          maxLevelsDeep,
          symlinks: "follow",
          inspectOptions: { times: true, absolutePath: true }
        },
        (itemPath, item) => {
          if (item && itemPath !== path2 && matchesAnyOfGlobs(itemPath)) {
            const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
            if (weHaveMatch) {
              if (options.filter) {
                const passedThroughFilter = options.filter(item);
                if (passedThroughFilter) {
                  foundAbsolutePaths.push(itemPath);
                }
              } else {
                foundAbsolutePaths.push(itemPath);
              }
            }
          }
        }
      );
      foundAbsolutePaths.sort();
      return processFoundPaths(foundAbsolutePaths, options.cwd);
    };
    var findSyncInit = (path2, options) => {
      const entryPointInspect = inspect2.sync(path2, { symlinks: "follow" });
      if (entryPointInspect === void 0) {
        throw generatePathDoesntExistError(path2);
      } else if (entryPointInspect.type !== "dir") {
        throw generatePathNotDirectoryError(path2);
      }
      return findSync(path2, normalizeOptions(options));
    };
    var findAsync2 = (path2, options) => {
      return new Promise((resolve, reject) => {
        const foundAbsolutePaths = [];
        const matchesAnyOfGlobs = matcher.create(
          path2,
          options.matching,
          options.ignoreCase
        );
        let maxLevelsDeep = Infinity;
        if (options.recursive === false) {
          maxLevelsDeep = 1;
        }
        let waitingForFiltersToFinish = 0;
        let treeWalkerDone = false;
        const maybeDone = () => {
          if (treeWalkerDone && waitingForFiltersToFinish === 0) {
            foundAbsolutePaths.sort();
            resolve(processFoundPaths(foundAbsolutePaths, options.cwd));
          }
        };
        treeWalker.async(
          path2,
          {
            maxLevelsDeep,
            symlinks: "follow",
            inspectOptions: { times: true, absolutePath: true }
          },
          (itemPath, item) => {
            if (item && itemPath !== path2 && matchesAnyOfGlobs(itemPath)) {
              const weHaveMatch = item.type === "file" && options.files === true || item.type === "dir" && options.directories === true;
              if (weHaveMatch) {
                if (options.filter) {
                  const passedThroughFilter = options.filter(item);
                  const isPromise = typeof passedThroughFilter.then === "function";
                  if (isPromise) {
                    waitingForFiltersToFinish += 1;
                    passedThroughFilter.then((passedThroughFilterResult) => {
                      if (passedThroughFilterResult) {
                        foundAbsolutePaths.push(itemPath);
                      }
                      waitingForFiltersToFinish -= 1;
                      maybeDone();
                    }).catch((err) => {
                      reject(err);
                    });
                  } else if (passedThroughFilter) {
                    foundAbsolutePaths.push(itemPath);
                  }
                } else {
                  foundAbsolutePaths.push(itemPath);
                }
              }
            }
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              treeWalkerDone = true;
              maybeDone();
            }
          }
        );
      });
    };
    var findAsyncInit = (path2, options) => {
      return inspect2.async(path2, { symlinks: "follow" }).then((entryPointInspect) => {
        if (entryPointInspect === void 0) {
          throw generatePathDoesntExistError(path2);
        } else if (entryPointInspect.type !== "dir") {
          throw generatePathNotDirectoryError(path2);
        }
        return findAsync2(path2, normalizeOptions(options));
      });
    };
    exports.validateInput = validateInput;
    exports.sync = findSyncInit;
    exports.async = findAsyncInit;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/inspect_tree.js
var require_inspect_tree = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/inspect_tree.js"(exports) {
    "use strict";
    var import_crypto = __toESM(require("crypto"));
    var import_path8 = __toESM(require("path"));
    var import_inspect = __toESM(require_inspect());
    var import_list = __toESM(require_list());
    var import_validate = __toESM(require_validate());
    var import_tree_walker = __toESM(require_tree_walker());
    var crypto = import_crypto.default;
    var pathUtil = import_path8.default;
    var inspect2 = import_inspect.default;
    var validate = import_validate.default;
    var treeWalker = import_tree_walker.default;
    var validateInput = (methodName, path2, options) => {
      const methodSignature = `${methodName}(path, [options])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.options(methodSignature, "options", options, {
        checksum: ["string"],
        relativePath: ["boolean"],
        times: ["boolean"],
        symlinks: ["string"]
      });
      if (options && options.checksum !== void 0 && inspect2.supportedChecksumAlgorithms.indexOf(options.checksum) === -1) {
        throw new Error(
          `Argument "options.checksum" passed to ${methodSignature} must have one of values: ${inspect2.supportedChecksumAlgorithms.join(
            ", "
          )}`
        );
      }
      if (options && options.symlinks !== void 0 && inspect2.symlinkOptions.indexOf(options.symlinks) === -1) {
        throw new Error(
          `Argument "options.symlinks" passed to ${methodSignature} must have one of values: ${inspect2.symlinkOptions.join(
            ", "
          )}`
        );
      }
    };
    var relativePathInTree = (parentInspectObj, inspectObj) => {
      if (parentInspectObj === void 0) {
        return ".";
      }
      return parentInspectObj.relativePath + "/" + inspectObj.name;
    };
    var checksumOfDir = (inspectList, algo) => {
      const hash = crypto.createHash(algo);
      inspectList.forEach((inspectObj) => {
        hash.update(inspectObj.name + inspectObj[algo]);
      });
      return hash.digest("hex");
    };
    var calculateTreeDependentProperties = (parentInspectObj, inspectObj, options) => {
      if (options.relativePath) {
        inspectObj.relativePath = relativePathInTree(parentInspectObj, inspectObj);
      }
      if (inspectObj.type === "dir") {
        inspectObj.children.forEach((childInspectObj) => {
          calculateTreeDependentProperties(inspectObj, childInspectObj, options);
        });
        inspectObj.size = 0;
        inspectObj.children.sort((a, b) => {
          if (a.type === "dir" && b.type === "file") {
            return -1;
          }
          if (a.type === "file" && b.type === "dir") {
            return 1;
          }
          return a.name.localeCompare(b.name);
        });
        inspectObj.children.forEach((child) => {
          inspectObj.size += child.size || 0;
        });
        if (options.checksum) {
          inspectObj[options.checksum] = checksumOfDir(
            inspectObj.children,
            options.checksum
          );
        }
      }
    };
    var findParentInTree = (treeNode, pathChain, item) => {
      const name = pathChain[0];
      if (pathChain.length > 1) {
        const itemInTreeForPathChain = treeNode.children.find((child) => {
          return child.name === name;
        });
        return findParentInTree(itemInTreeForPathChain, pathChain.slice(1), item);
      }
      return treeNode;
    };
    var inspectTreeSync = (path2, opts) => {
      const options = opts || {};
      let tree;
      treeWalker.sync(path2, { inspectOptions: options }, (itemPath, item) => {
        if (item) {
          if (item.type === "dir") {
            item.children = [];
          }
          const relativePath = pathUtil.relative(path2, itemPath);
          if (relativePath === "") {
            tree = item;
          } else {
            const parentItem = findParentInTree(
              tree,
              relativePath.split(pathUtil.sep),
              item
            );
            parentItem.children.push(item);
          }
        }
      });
      if (tree) {
        calculateTreeDependentProperties(void 0, tree, options);
      }
      return tree;
    };
    var inspectTreeAsync2 = (path2, opts) => {
      const options = opts || {};
      let tree;
      return new Promise((resolve, reject) => {
        treeWalker.async(
          path2,
          { inspectOptions: options },
          (itemPath, item) => {
            if (item) {
              if (item.type === "dir") {
                item.children = [];
              }
              const relativePath = pathUtil.relative(path2, itemPath);
              if (relativePath === "") {
                tree = item;
              } else {
                const parentItem = findParentInTree(
                  tree,
                  relativePath.split(pathUtil.sep),
                  item
                );
                parentItem.children.push(item);
              }
            }
          },
          (err) => {
            if (err) {
              reject(err);
            } else {
              if (tree) {
                calculateTreeDependentProperties(void 0, tree, options);
              }
              resolve(tree);
            }
          }
        );
      });
    };
    exports.validateInput = validateInput;
    exports.sync = inspectTreeSync;
    exports.async = inspectTreeAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/exists.js
var require_exists = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/exists.js"(exports) {
    "use strict";
    var import_fs2 = __toESM(require_fs());
    var import_validate = __toESM(require_validate());
    var fs = import_fs2.default;
    var validate = import_validate.default;
    var validateInput = (methodName, path2) => {
      const methodSignature = `${methodName}(path)`;
      validate.argument(methodSignature, "path", path2, ["string"]);
    };
    var existsSync = (path2) => {
      try {
        const stat3 = fs.statSync(path2);
        if (stat3.isDirectory()) {
          return "dir";
        } else if (stat3.isFile()) {
          return "file";
        }
        return "other";
      } catch (err) {
        if (err.code !== "ENOENT") {
          throw err;
        }
      }
      return false;
    };
    var existsAsync2 = (path2) => {
      return new Promise((resolve, reject) => {
        fs.stat(path2).then((stat3) => {
          if (stat3.isDirectory()) {
            resolve("dir");
          } else if (stat3.isFile()) {
            resolve("file");
          } else {
            resolve("other");
          }
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(false);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = existsSync;
    exports.async = existsAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/copy.js
var require_copy = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/copy.js"(exports) {
    "use strict";
    var import_path8 = __toESM(require("path"));
    var import_fs2 = __toESM(require_fs());
    var import_dir = __toESM(require_dir());
    var import_exists = __toESM(require_exists());
    var import_inspect = __toESM(require_inspect());
    var import_write = __toESM(require_write());
    var import_matcher = __toESM(require_matcher());
    var import_mode = __toESM(require_mode());
    var import_tree_walker = __toESM(require_tree_walker());
    var import_validate = __toESM(require_validate());
    var pathUtil = import_path8.default;
    var fs = import_fs2.default;
    var dir2 = import_dir.default;
    var exists2 = import_exists.default;
    var inspect2 = import_inspect.default;
    var write2 = import_write.default;
    var matcher = import_matcher.default;
    var fileMode = import_mode.default;
    var treeWalker = import_tree_walker.default;
    var validate = import_validate.default;
    var validateInput = (methodName, from, to, options) => {
      const methodSignature = `${methodName}(from, to, [options])`;
      validate.argument(methodSignature, "from", from, ["string"]);
      validate.argument(methodSignature, "to", to, ["string"]);
      validate.options(methodSignature, "options", options, {
        overwrite: ["boolean", "function"],
        matching: ["string", "array of string"],
        ignoreCase: ["boolean"]
      });
    };
    var parseOptions = (options, from) => {
      const opts = options || {};
      const parsedOptions = {};
      if (opts.ignoreCase === void 0) {
        opts.ignoreCase = false;
      }
      parsedOptions.overwrite = opts.overwrite;
      if (opts.matching) {
        parsedOptions.allowedToCopy = matcher.create(
          from,
          opts.matching,
          opts.ignoreCase
        );
      } else {
        parsedOptions.allowedToCopy = () => {
          return true;
        };
      }
      return parsedOptions;
    };
    var generateNoSourceError = (path2) => {
      const err = new Error(`Path to copy doesn't exist ${path2}`);
      err.code = "ENOENT";
      return err;
    };
    var generateDestinationExistsError = (path2) => {
      const err = new Error(`Destination path already exists ${path2}`);
      err.code = "EEXIST";
      return err;
    };
    var inspectOptions = {
      mode: true,
      symlinks: "report",
      times: true,
      absolutePath: true
    };
    var shouldThrowDestinationExistsError = (context) => {
      return typeof context.opts.overwrite !== "function" && context.opts.overwrite !== true;
    };
    var checksBeforeCopyingSync = (from, to, opts) => {
      if (!exists2.sync(from)) {
        throw generateNoSourceError(from);
      }
      if (exists2.sync(to) && !opts.overwrite) {
        throw generateDestinationExistsError(to);
      }
    };
    var canOverwriteItSync = (context) => {
      if (typeof context.opts.overwrite === "function") {
        const destInspectData = inspect2.sync(context.destPath, inspectOptions);
        return context.opts.overwrite(context.srcInspectData, destInspectData);
      }
      return context.opts.overwrite === true;
    };
    var copyFileSync = (srcPath, destPath, mode, context) => {
      const data = fs.readFileSync(srcPath);
      try {
        fs.writeFileSync(destPath, data, { mode, flag: "wx" });
      } catch (err) {
        if (err.code === "ENOENT") {
          write2.sync(destPath, data, { mode });
        } else if (err.code === "EEXIST") {
          if (canOverwriteItSync(context)) {
            fs.writeFileSync(destPath, data, { mode });
          } else if (shouldThrowDestinationExistsError(context)) {
            throw generateDestinationExistsError(context.destPath);
          }
        } else {
          throw err;
        }
      }
    };
    var copySymlinkSync = (from, to) => {
      const symlinkPointsAt = fs.readlinkSync(from);
      try {
        fs.symlinkSync(symlinkPointsAt, to);
      } catch (err) {
        if (err.code === "EEXIST") {
          fs.unlinkSync(to);
          fs.symlinkSync(symlinkPointsAt, to);
        } else {
          throw err;
        }
      }
    };
    var copyItemSync = (srcPath, srcInspectData, destPath, opts) => {
      const context = { srcPath, destPath, srcInspectData, opts };
      const mode = fileMode.normalizeFileMode(srcInspectData.mode);
      if (srcInspectData.type === "dir") {
        dir2.createSync(destPath, { mode });
      } else if (srcInspectData.type === "file") {
        copyFileSync(srcPath, destPath, mode, context);
      } else if (srcInspectData.type === "symlink") {
        copySymlinkSync(srcPath, destPath);
      }
    };
    var copySync = (from, to, options) => {
      const opts = parseOptions(options, from);
      checksBeforeCopyingSync(from, to, opts);
      treeWalker.sync(from, { inspectOptions }, (srcPath, srcInspectData) => {
        const rel = pathUtil.relative(from, srcPath);
        const destPath = pathUtil.resolve(to, rel);
        if (opts.allowedToCopy(srcPath, destPath, srcInspectData)) {
          copyItemSync(srcPath, srcInspectData, destPath, opts);
        }
      });
    };
    var checksBeforeCopyingAsync = (from, to, opts) => {
      return exists2.async(from).then((srcPathExists) => {
        if (!srcPathExists) {
          throw generateNoSourceError(from);
        } else {
          return exists2.async(to);
        }
      }).then((destPathExists) => {
        if (destPathExists && !opts.overwrite) {
          throw generateDestinationExistsError(to);
        }
      });
    };
    var canOverwriteItAsync = (context) => {
      return new Promise((resolve, reject) => {
        if (typeof context.opts.overwrite === "function") {
          inspect2.async(context.destPath, inspectOptions).then((destInspectData) => {
            resolve(
              context.opts.overwrite(context.srcInspectData, destInspectData)
            );
          }).catch(reject);
        } else {
          resolve(context.opts.overwrite === true);
        }
      });
    };
    var copyFileAsync = (srcPath, destPath, mode, context, runOptions) => {
      return new Promise((resolve, reject) => {
        const runOpts = runOptions || {};
        let flags = "wx";
        if (runOpts.overwrite) {
          flags = "w";
        }
        const readStream = fs.createReadStream(srcPath);
        const writeStream = fs.createWriteStream(destPath, { mode, flags });
        readStream.on("error", reject);
        writeStream.on("error", (err) => {
          readStream.resume();
          if (err.code === "ENOENT") {
            dir2.createAsync(pathUtil.dirname(destPath)).then(() => {
              copyFileAsync(srcPath, destPath, mode, context).then(
                resolve,
                reject
              );
            }).catch(reject);
          } else if (err.code === "EEXIST") {
            canOverwriteItAsync(context).then((canOverwite) => {
              if (canOverwite) {
                copyFileAsync(srcPath, destPath, mode, context, {
                  overwrite: true
                }).then(resolve, reject);
              } else if (shouldThrowDestinationExistsError(context)) {
                reject(generateDestinationExistsError(destPath));
              } else {
                resolve();
              }
            }).catch(reject);
          } else {
            reject(err);
          }
        });
        writeStream.on("finish", resolve);
        readStream.pipe(writeStream);
      });
    };
    var copySymlinkAsync = (from, to) => {
      return fs.readlink(from).then((symlinkPointsAt) => {
        return new Promise((resolve, reject) => {
          fs.symlink(symlinkPointsAt, to).then(resolve).catch((err) => {
            if (err.code === "EEXIST") {
              fs.unlink(to).then(() => {
                return fs.symlink(symlinkPointsAt, to);
              }).then(resolve, reject);
            } else {
              reject(err);
            }
          });
        });
      });
    };
    var copyItemAsync = (srcPath, srcInspectData, destPath, opts) => {
      const context = { srcPath, destPath, srcInspectData, opts };
      const mode = fileMode.normalizeFileMode(srcInspectData.mode);
      if (srcInspectData.type === "dir") {
        return dir2.createAsync(destPath, { mode });
      } else if (srcInspectData.type === "file") {
        return copyFileAsync(srcPath, destPath, mode, context);
      } else if (srcInspectData.type === "symlink") {
        return copySymlinkAsync(srcPath, destPath);
      }
      return Promise.resolve();
    };
    var copyAsync2 = (from, to, options) => {
      return new Promise((resolve, reject) => {
        const opts = parseOptions(options, from);
        checksBeforeCopyingAsync(from, to, opts).then(() => {
          let allFilesDelivered = false;
          let filesInProgress = 0;
          treeWalker.async(
            from,
            { inspectOptions },
            (srcPath, item) => {
              if (item) {
                const rel = pathUtil.relative(from, srcPath);
                const destPath = pathUtil.resolve(to, rel);
                if (opts.allowedToCopy(srcPath, item, destPath)) {
                  filesInProgress += 1;
                  copyItemAsync(srcPath, item, destPath, opts).then(() => {
                    filesInProgress -= 1;
                    if (allFilesDelivered && filesInProgress === 0) {
                      resolve();
                    }
                  }).catch(reject);
                }
              }
            },
            (err) => {
              if (err) {
                reject(err);
              } else {
                allFilesDelivered = true;
                if (allFilesDelivered && filesInProgress === 0) {
                  resolve();
                }
              }
            }
          );
        }).catch(reject);
      });
    };
    exports.validateInput = validateInput;
    exports.sync = copySync;
    exports.async = copyAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/move.js
var require_move = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/move.js"(exports) {
    "use strict";
    var import_path8 = __toESM(require("path"));
    var import_fs2 = __toESM(require_fs());
    var import_validate = __toESM(require_validate());
    var import_copy = __toESM(require_copy());
    var import_dir = __toESM(require_dir());
    var import_exists = __toESM(require_exists());
    var import_remove = __toESM(require_remove());
    var pathUtil = import_path8.default;
    var fs = import_fs2.default;
    var validate = import_validate.default;
    var copy2 = import_copy.default;
    var dir2 = import_dir.default;
    var exists2 = import_exists.default;
    var remove2 = import_remove.default;
    var validateInput = (methodName, from, to, options) => {
      const methodSignature = `${methodName}(from, to, [options])`;
      validate.argument(methodSignature, "from", from, ["string"]);
      validate.argument(methodSignature, "to", to, ["string"]);
      validate.options(methodSignature, "options", options, {
        overwrite: ["boolean"]
      });
    };
    var parseOptions = (options) => {
      const opts = options || {};
      return opts;
    };
    var generateDestinationExistsError = (path2) => {
      const err = new Error(`Destination path already exists ${path2}`);
      err.code = "EEXIST";
      return err;
    };
    var generateSourceDoesntExistError = (path2) => {
      const err = new Error(`Path to move doesn't exist ${path2}`);
      err.code = "ENOENT";
      return err;
    };
    var moveSync = (from, to, options) => {
      const opts = parseOptions(options);
      if (exists2.sync(to) !== false && opts.overwrite !== true) {
        throw generateDestinationExistsError(to);
      }
      try {
        fs.renameSync(from, to);
      } catch (err) {
        if (err.code === "EISDIR" || err.code === "EPERM") {
          remove2.sync(to);
          fs.renameSync(from, to);
        } else if (err.code === "EXDEV") {
          copy2.sync(from, to, { overwrite: true });
          remove2.sync(from);
        } else if (err.code === "ENOENT") {
          if (!exists2.sync(from)) {
            throw generateSourceDoesntExistError(from);
          }
          dir2.createSync(pathUtil.dirname(to));
          fs.renameSync(from, to);
        } else {
          throw err;
        }
      }
    };
    var ensureDestinationPathExistsAsync = (to) => {
      return new Promise((resolve, reject) => {
        const destDir = pathUtil.dirname(to);
        exists2.async(destDir).then((dstExists) => {
          if (!dstExists) {
            dir2.createAsync(destDir).then(resolve, reject);
          } else {
            reject();
          }
        }).catch(reject);
      });
    };
    var moveAsync2 = (from, to, options) => {
      const opts = parseOptions(options);
      return new Promise((resolve, reject) => {
        exists2.async(to).then((destinationExists) => {
          if (destinationExists !== false && opts.overwrite !== true) {
            reject(generateDestinationExistsError(to));
          } else {
            fs.rename(from, to).then(resolve).catch((err) => {
              if (err.code === "EISDIR" || err.code === "EPERM") {
                remove2.async(to).then(() => fs.rename(from, to)).then(resolve, reject);
              } else if (err.code === "EXDEV") {
                copy2.async(from, to, { overwrite: true }).then(() => remove2.async(from)).then(resolve, reject);
              } else if (err.code === "ENOENT") {
                exists2.async(from).then((srcExists) => {
                  if (!srcExists) {
                    reject(generateSourceDoesntExistError(from));
                  } else {
                    ensureDestinationPathExistsAsync(to).then(() => {
                      return fs.rename(from, to);
                    }).then(resolve, reject);
                  }
                }).catch(reject);
              } else {
                reject(err);
              }
            });
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = moveSync;
    exports.async = moveAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/read.js
var require_read = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/read.js"(exports) {
    "use strict";
    var import_fs2 = __toESM(require_fs());
    var import_validate = __toESM(require_validate());
    var fs = import_fs2.default;
    var validate = import_validate.default;
    var supportedReturnAs = ["utf8", "buffer", "json", "jsonWithDates"];
    var validateInput = (methodName, path2, returnAs) => {
      const methodSignature = `${methodName}(path, returnAs)`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.argument(methodSignature, "returnAs", returnAs, [
        "string",
        "undefined"
      ]);
      if (returnAs && supportedReturnAs.indexOf(returnAs) === -1) {
        throw new Error(
          `Argument "returnAs" passed to ${methodSignature} must have one of values: ${supportedReturnAs.join(
            ", "
          )}`
        );
      }
    };
    var jsonDateParser = (key, value) => {
      const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
      if (typeof value === "string") {
        if (reISO.exec(value)) {
          return new Date(value);
        }
      }
      return value;
    };
    var makeNicerJsonParsingError = (path2, err) => {
      const nicerError = new Error(
        `JSON parsing failed while reading ${path2} [${err}]`
      );
      nicerError.originalError = err;
      return nicerError;
    };
    var readSync = (path2, returnAs) => {
      const retAs = returnAs || "utf8";
      let data;
      let encoding = "utf8";
      if (retAs === "buffer") {
        encoding = null;
      }
      try {
        data = fs.readFileSync(path2, { encoding });
      } catch (err) {
        if (err.code === "ENOENT") {
          return void 0;
        }
        throw err;
      }
      try {
        if (retAs === "json") {
          data = JSON.parse(data);
        } else if (retAs === "jsonWithDates") {
          data = JSON.parse(data, jsonDateParser);
        }
      } catch (err) {
        throw makeNicerJsonParsingError(path2, err);
      }
      return data;
    };
    var readAsync2 = (path2, returnAs) => {
      return new Promise((resolve, reject) => {
        const retAs = returnAs || "utf8";
        let encoding = "utf8";
        if (retAs === "buffer") {
          encoding = null;
        }
        fs.readFile(path2, { encoding }).then((data) => {
          try {
            if (retAs === "json") {
              resolve(JSON.parse(data));
            } else if (retAs === "jsonWithDates") {
              resolve(JSON.parse(data, jsonDateParser));
            } else {
              resolve(data);
            }
          } catch (err) {
            reject(makeNicerJsonParsingError(path2, err));
          }
        }).catch((err) => {
          if (err.code === "ENOENT") {
            resolve(void 0);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = readSync;
    exports.async = readAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/rename.js
var require_rename = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/rename.js"(exports) {
    "use strict";
    var import_path8 = __toESM(require("path"));
    var import_move = __toESM(require_move());
    var import_validate = __toESM(require_validate());
    var pathUtil = import_path8.default;
    var move2 = import_move.default;
    var validate = import_validate.default;
    var validateInput = (methodName, path2, newName, options) => {
      const methodSignature = `${methodName}(path, newName, [options])`;
      validate.argument(methodSignature, "path", path2, ["string"]);
      validate.argument(methodSignature, "newName", newName, ["string"]);
      validate.options(methodSignature, "options", options, {
        overwrite: ["boolean"]
      });
      if (pathUtil.basename(newName) !== newName) {
        throw new Error(
          `Argument "newName" passed to ${methodSignature} should be a filename, not a path. Received "${newName}"`
        );
      }
    };
    var renameSync = (path2, newName, options) => {
      const newPath = pathUtil.join(pathUtil.dirname(path2), newName);
      move2.sync(path2, newPath, options);
    };
    var renameAsync2 = (path2, newName, options) => {
      const newPath = pathUtil.join(pathUtil.dirname(path2), newName);
      return move2.async(path2, newPath, options);
    };
    exports.validateInput = validateInput;
    exports.sync = renameSync;
    exports.async = renameAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/symlink.js
var require_symlink = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/symlink.js"(exports) {
    "use strict";
    var import_path8 = __toESM(require("path"));
    var import_fs2 = __toESM(require_fs());
    var import_validate = __toESM(require_validate());
    var import_dir = __toESM(require_dir());
    var pathUtil = import_path8.default;
    var fs = import_fs2.default;
    var validate = import_validate.default;
    var dir2 = import_dir.default;
    var validateInput = (methodName, symlinkValue, path2) => {
      const methodSignature = `${methodName}(symlinkValue, path)`;
      validate.argument(methodSignature, "symlinkValue", symlinkValue, ["string"]);
      validate.argument(methodSignature, "path", path2, ["string"]);
    };
    var symlinkSync = (symlinkValue, path2) => {
      try {
        fs.symlinkSync(symlinkValue, path2);
      } catch (err) {
        if (err.code === "ENOENT") {
          dir2.createSync(pathUtil.dirname(path2));
          fs.symlinkSync(symlinkValue, path2);
        } else {
          throw err;
        }
      }
    };
    var symlinkAsync2 = (symlinkValue, path2) => {
      return new Promise((resolve, reject) => {
        fs.symlink(symlinkValue, path2).then(resolve).catch((err) => {
          if (err.code === "ENOENT") {
            dir2.createAsync(pathUtil.dirname(path2)).then(() => {
              return fs.symlink(symlinkValue, path2);
            }).then(resolve, reject);
          } else {
            reject(err);
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = symlinkSync;
    exports.async = symlinkAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/streams.js
var require_streams = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/streams.js"(exports) {
    "use strict";
    var import_fs2 = __toESM(require("fs"));
    var fs = import_fs2.default;
    exports.createWriteStream = fs.createWriteStream;
    exports.createReadStream = fs.createReadStream;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/tmp_dir.js
var require_tmp_dir = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/tmp_dir.js"(exports) {
    "use strict";
    var import_path8 = __toESM(require("path"));
    var import_os = __toESM(require("os"));
    var import_crypto = __toESM(require("crypto"));
    var import_dir = __toESM(require_dir());
    var import_fs2 = __toESM(require_fs());
    var import_validate = __toESM(require_validate());
    var pathUtil = import_path8.default;
    var os = import_os.default;
    var crypto = import_crypto.default;
    var dir2 = import_dir.default;
    var fs = import_fs2.default;
    var validate = import_validate.default;
    var validateInput = (methodName, options) => {
      const methodSignature = `${methodName}([options])`;
      validate.options(methodSignature, "options", options, {
        prefix: ["string"],
        basePath: ["string"]
      });
    };
    var getOptionsDefaults = (passedOptions, cwdPath) => {
      passedOptions = passedOptions || {};
      const options = {};
      if (typeof passedOptions.prefix !== "string") {
        options.prefix = "";
      } else {
        options.prefix = passedOptions.prefix;
      }
      if (typeof passedOptions.basePath === "string") {
        options.basePath = pathUtil.resolve(cwdPath, passedOptions.basePath);
      } else {
        options.basePath = os.tmpdir();
      }
      return options;
    };
    var randomStringLength = 32;
    var tmpDirSync = (cwdPath, passedOptions) => {
      const options = getOptionsDefaults(passedOptions, cwdPath);
      const randomString = crypto.randomBytes(randomStringLength / 2).toString("hex");
      const dirPath = pathUtil.join(
        options.basePath,
        options.prefix + randomString
      );
      try {
        fs.mkdirSync(dirPath);
      } catch (err) {
        if (err.code === "ENOENT") {
          dir2.sync(dirPath);
        } else {
          throw err;
        }
      }
      return dirPath;
    };
    var tmpDirAsync2 = (cwdPath, passedOptions) => {
      return new Promise((resolve, reject) => {
        const options = getOptionsDefaults(passedOptions, cwdPath);
        crypto.randomBytes(randomStringLength / 2, (err, bytes) => {
          if (err) {
            reject(err);
          } else {
            const randomString = bytes.toString("hex");
            const dirPath = pathUtil.join(
              options.basePath,
              options.prefix + randomString
            );
            fs.mkdir(dirPath, (err2) => {
              if (err2) {
                if (err2.code === "ENOENT") {
                  dir2.async(dirPath).then(() => {
                    resolve(dirPath);
                  }, reject);
                } else {
                  reject(err2);
                }
              } else {
                resolve(dirPath);
              }
            });
          }
        });
      });
    };
    exports.validateInput = validateInput;
    exports.sync = tmpDirSync;
    exports.async = tmpDirAsync2;
  }
});

// pkgs/service/internal/service/build/jetpack/lib/jetpack.js
var require_jetpack = __commonJS({
  "pkgs/service/internal/service/build/jetpack/lib/jetpack.js"(exports, module2) {
    "use strict";
    var import_util = __toESM(require("util"));
    var import_path8 = __toESM(require("path"));
    var import_append = __toESM(require_append());
    var import_dir = __toESM(require_dir());
    var import_file = __toESM(require_file());
    var import_find = __toESM(require_find());
    var import_inspect = __toESM(require_inspect());
    var import_inspect_tree = __toESM(require_inspect_tree());
    var import_copy = __toESM(require_copy());
    var import_exists = __toESM(require_exists());
    var import_list = __toESM(require_list());
    var import_move = __toESM(require_move());
    var import_read = __toESM(require_read());
    var import_remove = __toESM(require_remove());
    var import_rename = __toESM(require_rename());
    var import_symlink = __toESM(require_symlink());
    var import_streams = __toESM(require_streams());
    var import_tmp_dir = __toESM(require_tmp_dir());
    var import_write = __toESM(require_write());
    var util = import_util.default;
    var pathUtil = import_path8.default;
    var append2 = import_append.default;
    var dir2 = import_dir.default;
    var file2 = import_file.default;
    var find2 = import_find.default;
    var inspect2 = import_inspect.default;
    var inspectTree2 = import_inspect_tree.default;
    var copy2 = import_copy.default;
    var exists2 = import_exists.default;
    var list2 = import_list.default;
    var move2 = import_move.default;
    var read2 = import_read.default;
    var remove2 = import_remove.default;
    var rename2 = import_rename.default;
    var symlink2 = import_symlink.default;
    var streams = import_streams.default;
    var tmpDir2 = import_tmp_dir.default;
    var write2 = import_write.default;
    var jetpackContext = (cwdPath) => {
      const getCwdPath = () => {
        return cwdPath || process.cwd();
      };
      const cwd3 = function() {
        if (arguments.length === 0) {
          return getCwdPath();
        }
        const args = Array.prototype.slice.call(arguments);
        const pathParts = [getCwdPath()].concat(args);
        return jetpackContext(pathUtil.resolve.apply(null, pathParts));
      };
      const resolvePath = (path2) => {
        return pathUtil.resolve(getCwdPath(), path2);
      };
      const getPath = function() {
        Array.prototype.unshift.call(arguments, getCwdPath());
        return pathUtil.resolve.apply(null, arguments);
      };
      const normalizeOptions = (options) => {
        const opts = options || {};
        opts.cwd = getCwdPath();
        return opts;
      };
      const api = {
        cwd: cwd3,
        path: getPath,
        append: (path2, data, options) => {
          append2.validateInput("append", path2, data, options);
          append2.sync(resolvePath(path2), data, options);
        },
        appendAsync: (path2, data, options) => {
          append2.validateInput("appendAsync", path2, data, options);
          return append2.async(resolvePath(path2), data, options);
        },
        copy: (from, to, options) => {
          copy2.validateInput("copy", from, to, options);
          copy2.sync(resolvePath(from), resolvePath(to), options);
        },
        copyAsync: (from, to, options) => {
          copy2.validateInput("copyAsync", from, to, options);
          return copy2.async(resolvePath(from), resolvePath(to), options);
        },
        createWriteStream: (path2, options) => {
          return streams.createWriteStream(resolvePath(path2), options);
        },
        createReadStream: (path2, options) => {
          return streams.createReadStream(resolvePath(path2), options);
        },
        dir: (path2, criteria) => {
          dir2.validateInput("dir", path2, criteria);
          const normalizedPath = resolvePath(path2);
          dir2.sync(normalizedPath, criteria);
          return cwd3(normalizedPath);
        },
        dirAsync: (path2, criteria) => {
          dir2.validateInput("dirAsync", path2, criteria);
          return new Promise((resolve, reject) => {
            const normalizedPath = resolvePath(path2);
            dir2.async(normalizedPath, criteria).then(() => {
              resolve(cwd3(normalizedPath));
            }, reject);
          });
        },
        exists: (path2) => {
          exists2.validateInput("exists", path2);
          return exists2.sync(resolvePath(path2));
        },
        existsAsync: (path2) => {
          exists2.validateInput("existsAsync", path2);
          return exists2.async(resolvePath(path2));
        },
        file: (path2, criteria) => {
          file2.validateInput("file", path2, criteria);
          file2.sync(resolvePath(path2), criteria);
          return api;
        },
        fileAsync: (path2, criteria) => {
          file2.validateInput("fileAsync", path2, criteria);
          return new Promise((resolve, reject) => {
            file2.async(resolvePath(path2), criteria).then(() => {
              resolve(api);
            }, reject);
          });
        },
        find: (startPath, options) => {
          if (typeof options === "undefined" && typeof startPath === "object") {
            options = startPath;
            startPath = ".";
          }
          find2.validateInput("find", startPath, options);
          return find2.sync(resolvePath(startPath), normalizeOptions(options));
        },
        findAsync: (startPath, options) => {
          if (typeof options === "undefined" && typeof startPath === "object") {
            options = startPath;
            startPath = ".";
          }
          find2.validateInput("findAsync", startPath, options);
          return find2.async(resolvePath(startPath), normalizeOptions(options));
        },
        inspect: (path2, fieldsToInclude) => {
          inspect2.validateInput("inspect", path2, fieldsToInclude);
          return inspect2.sync(resolvePath(path2), fieldsToInclude);
        },
        inspectAsync: (path2, fieldsToInclude) => {
          inspect2.validateInput("inspectAsync", path2, fieldsToInclude);
          return inspect2.async(resolvePath(path2), fieldsToInclude);
        },
        inspectTree: (path2, options) => {
          inspectTree2.validateInput("inspectTree", path2, options);
          return inspectTree2.sync(resolvePath(path2), options);
        },
        inspectTreeAsync: (path2, options) => {
          inspectTree2.validateInput("inspectTreeAsync", path2, options);
          return inspectTree2.async(resolvePath(path2), options);
        },
        list: (path2) => {
          list2.validateInput("list", path2);
          return list2.sync(resolvePath(path2 || "."));
        },
        listAsync: (path2) => {
          list2.validateInput("listAsync", path2);
          return list2.async(resolvePath(path2 || "."));
        },
        move: (from, to, options) => {
          move2.validateInput("move", from, to, options);
          move2.sync(resolvePath(from), resolvePath(to), options);
        },
        moveAsync: (from, to, options) => {
          move2.validateInput("moveAsync", from, to, options);
          return move2.async(resolvePath(from), resolvePath(to), options);
        },
        read: (path2, returnAs) => {
          read2.validateInput("read", path2, returnAs);
          return read2.sync(resolvePath(path2), returnAs);
        },
        readAsync: (path2, returnAs) => {
          read2.validateInput("readAsync", path2, returnAs);
          return read2.async(resolvePath(path2), returnAs);
        },
        remove: (path2) => {
          remove2.validateInput("remove", path2);
          remove2.sync(resolvePath(path2 || "."));
        },
        removeAsync: (path2) => {
          remove2.validateInput("removeAsync", path2);
          return remove2.async(resolvePath(path2 || "."));
        },
        rename: (path2, newName, options) => {
          rename2.validateInput("rename", path2, newName, options);
          rename2.sync(resolvePath(path2), newName, options);
        },
        renameAsync: (path2, newName, options) => {
          rename2.validateInput("renameAsync", path2, newName, options);
          return rename2.async(resolvePath(path2), newName, options);
        },
        symlink: (symlinkValue, path2) => {
          symlink2.validateInput("symlink", symlinkValue, path2);
          symlink2.sync(symlinkValue, resolvePath(path2));
        },
        symlinkAsync: (symlinkValue, path2) => {
          symlink2.validateInput("symlinkAsync", symlinkValue, path2);
          return symlink2.async(symlinkValue, resolvePath(path2));
        },
        tmpDir: (options) => {
          tmpDir2.validateInput("tmpDir", options);
          const pathOfCreatedDirectory = tmpDir2.sync(getCwdPath(), options);
          return cwd3(pathOfCreatedDirectory);
        },
        tmpDirAsync: (options) => {
          tmpDir2.validateInput("tmpDirAsync", options);
          return new Promise((resolve, reject) => {
            tmpDir2.async(getCwdPath(), options).then((pathOfCreatedDirectory) => {
              resolve(cwd3(pathOfCreatedDirectory));
            }, reject);
          });
        },
        write: (path2, data, options) => {
          write2.validateInput("write", path2, data, options);
          write2.sync(resolvePath(path2), data, options);
        },
        writeAsync: (path2, data, options) => {
          write2.validateInput("writeAsync", path2, data, options);
          return write2.async(resolvePath(path2), data, options);
        }
      };
      if (util.inspect.custom !== void 0) {
        api[util.inspect.custom] = () => {
          return `[fs-jetpack CWD: ${getCwdPath()}]`;
        };
      }
      return api;
    };
    module2.exports = jetpackContext;
  }
});

// app/srv/build.ts
var import_path7 = require("path");

// pkgs/royal/srv/prebuild-api.ts
var import_path6 = require("path");

// pkgs/service/main/initialize.ts
var import_lodash5 = __toESM(require("lodash.padend"));
var import_picocolors5 = __toESM(require("picocolors"));

// pkgs/service/internal/service/build/jetpack/index.ts
var import_jetpack = __toESM(require_jetpack());
var _jet = (0, import_jetpack.default)();
while (typeof _jet === "function") {
  _jet = _jet();
}
var jetpack = _jet;
var writeAsync = jetpack.writeAsync;
var append = jetpack.append;
var appendAsync = jetpack.appendAsync;
var copy = jetpack.copy;
var copyAsync = jetpack.copyAsync;
var createReadStream = jetpack.createReadStream;
var createWriteStream = jetpack.createWriteStream;
var cwd = jetpack.cwd;
var dir = jetpack.dir;
var dirAsync = jetpack.dirAsync;
var exists = jetpack.exists;
var existsAsync = jetpack.existsAsync;
var file = jetpack.file;
var fileAsync = jetpack.fileAsync;
var find = jetpack.find;
var findAsync = jetpack.findAsync;
var inspect = jetpack.inspect;
var inspectAsync = jetpack.inspectAsync;
var inspectTree = jetpack.inspectTree;
var inspectTreeAsync = jetpack.inspectTreeAsync;
var list = jetpack.list;
var listAsync = jetpack.listAsync;
var move = jetpack.move;
var moveAsync = jetpack.moveAsync;
var path = jetpack.path;
var read = jetpack.read;
var readAsync = jetpack.readAsync;
var remove = jetpack.remove;
var removeAsync = jetpack.removeAsync;
var rename = jetpack.rename;
var renameAsync = jetpack.renameAsync;
var symlink = jetpack.symlink;
var symlinkAsync = jetpack.symlinkAsync;
var tmpDir = jetpack.tmpDir;
var tmpDirAsync = jetpack.tmpDirAsync;
var write = jetpack.write;

// pkgs/service/internal/global.ts
var g = globalThis;

// pkgs/service/internal/rpc/client.ts
var import_ws = require("ws");
var import_pretty_error = __toESM(require("pretty-error"));
var cg = globalThis;
var pe = new import_pretty_error.default();
var rpcQueue = {};
var rpcSender = (rpc) => ({
  sendRequest(request) {
    return new Promise(async (resolve, reject) => {
      const clientID = cg._clientID;
      const ws = cg._ws;
      if (!clientID || !ws) {
        reject(`Cannot send RPC to root. WebSocket not initialized`);
      } else {
        request.id = `${clientID}|${rpc}|${request.id}`;
        if (ws.readyState !== ws.OPEN) {
          await new Promise((resume) => {
            ws.once("open", resume);
          });
        }
        rpcQueue[request.id] = { resolve, reject };
        ws.send(JSON.stringify(request));
      }
    });
  }
});

// pkgs/service/internal/rpc/get-port.ts
var import_get_port = __toESM(require("get-port"));

// pkgs/service/internal/rpc/get-runtime.ts
var getRuntime = () => {
  if (typeof process !== "undefined") {
    if (process.isBun)
      return "bun";
    else
      return "node";
  }
  return "deno";
};

// pkgs/service/internal/rpc/get-port.ts
var getPort = async () => {
  const runtime = getRuntime();
  if (runtime === "bun") {
    let port = getRandomInt(1e4, 22e3);
    while (true) {
      try {
        const res = Bun.serve({
          port,
          hostname: "127.0.0.1",
          fetch() {
            return new Response("ok");
          }
        });
        res.stop();
        break;
      } catch (_) {
        port = getRandomInt(1e4, 22e3);
      }
    }
    return port;
  } else if (runtime === "node") {
    return await (0, import_get_port.default)();
  }
  return 0;
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// pkgs/service/internal/rpc/action-rpc.ts
var import_child_process = require("child_process");
var import_cuid = __toESM(require("cuid"));

// gen/service.ts
var _path = {
  "royal": "pkgs/royal/index.ts"
};
var _runtime = {
  "royal": "node"
};

// pkgs/service/internal/rpc/action-rpc.ts
var import_lodash2 = __toESM(require("lodash.capitalize"));
var import_lodash3 = __toESM(require("lodash.padend"));
var import_path5 = require("path");
var import_picocolors3 = __toESM(require("picocolors"));

// pkgs/service/internal/service/build/build-svc.ts
var import_fs = require("fs");
var import_path3 = require("path");
var import_picocolors2 = __toESM(require("picocolors"));

// pkgs/service/internal/service/build/build-svc-node.ts
var import_chokidar = require("chokidar");
var import_lodash = __toESM(require("lodash.capitalize"));
var import_path2 = require("path");
var import_picocolors = __toESM(require("picocolors"));

// pkgs/service/internal/rpc/wait-exit.ts
var waitExit = async (child) => {
  if (!child)
    return;
  const bunChild = child;
  if (typeof bunChild.exited !== "undefined") {
    await bunChild.exited;
  } else {
    const nodeChild = child;
    await new Promise((resolve) => {
      nodeChild.on("exit", function() {
        resolve();
      });
    });
  }
};

// pkgs/service/internal/service/build/resolve-deps.ts
var import_path = require("path");
var resolveDeps = async (path2, cache) => {
  const pkg = await readAsync((0, import_path.join)(path2, "package.json"), "json");
  const loaded = { ...cache };
  if (!pkg) {
    throw new Error(`File not found: ${(0, import_path.join)(path2, "package.json")}`);
  }
  loaded[path2] = pkg.version || "1.0.0";
  const deps = {
    ...pkg.dependencies
  };
  for (let [k, v] of Object.entries(deps)) {
    if (v.startsWith("workspace:")) {
      delete deps[k];
      const wkpath = await getWorkspace(k);
      if (wkpath && !loaded[wkpath]) {
        const rdeps = await resolveDeps(wkpath, loaded);
        for (const [k2, v2] of Object.entries(rdeps)) {
          loaded[k2] = v2;
        }
      }
    } else if (v.startsWith(".")) {
      delete deps[k];
      if (!loaded[(0, import_path.join)(path2, v)]) {
        const rdeps = await resolveDeps((0, import_path.join)(path2, v), loaded);
        for (const [k2, v2] of Object.entries(rdeps)) {
          loaded[k2] = v2;
        }
      }
    }
  }
  const final = { ...loaded, ...deps };
  if (!cache) {
    for (const key of Object.keys(final)) {
      if (key.startsWith((0, import_path.join)(path2, "..", "..")))
        delete final[key];
    }
  }
  return final;
};
var getWorkspace = async (name) => {
  const dirs = ["pkgs", "app"];
  const cwdsplit = process.cwd().split(import_path.sep);
  const root2 = (cwdsplit.includes(".output") ? cwdsplit.slice(0, cwdsplit.length - 2) : cwdsplit).join(import_path.sep);
  for (const dir2 of dirs) {
    if (await existsAsync((0, import_path.join)(root2, dir2, name))) {
      return (0, import_path.join)(root2, dir2, name);
    }
  }
  return false;
};

// pkgs/service/internal/service/build/build-svc-node.ts
var buildSvcNode = async (name, outPath) => {
  const cwdsplit = process.cwd().split(import_path2.sep);
  const root2 = (cwdsplit.includes(".output") ? cwdsplit.slice(0, cwdsplit.length - 2) : cwdsplit).join(import_path2.sep);
  const tpath = (0, import_path2.join)(outPath, "service", name);
  await dirAsync(tpath);
  const indexPath = (0, import_path2.join)(root2, _path[name]);
  const spath = (0, import_path2.dirname)(indexPath);
  const deps = await resolveDeps(spath);
  await writeAsync((0, import_path2.join)(tpath, "package.json"), {
    name,
    version: "1.0.0",
    type: "module",
    dependencies: deps
  });
  if (await existsAsync((0, import_path2.join)(tpath, "build.ts"))) {
    console.log(["jiti", "build.ts", "preBuild"], spath);
  }
  await new Promise(async (finished) => {
    if (!g.node) {
      g.node = {
        build: {},
        buildTimeout: {},
        recoverError: {}
      };
    }
    let nb = g.node.build[name];
    if (nb && nb.stop)
      nb.stop();
    const { build } = await import("esbuild");
    const { commonjs } = await import("@hyrious/esbuild-plugin-commonjs");
    const rebuild = async () => {
      try {
        g.node.build[name] = await build({
          bundle: true,
          logLevel: "silent",
          platform: "node",
          format: "esm",
          sourcemap: true,
          incremental: true,
          metafile: true,
          minify: true,
          plugins: [commonjs()],
          entryPoints: [indexPath],
          outfile: (0, import_path2.join)(tpath, "index.js"),
          external: Object.keys(deps)
        });
        finished();
      } catch (e) {
        recoverFromError(name, e, rebuild);
      }
    };
    rebuild();
  });
};
var recoverFromError = async (name, e, rebuild) => {
  if (e && e.errors) {
    printError(e, name);
    const files = e.errors.map((e2) => e2.location?.file || "").filter((e2) => e2);
    if (g.node.recoverError[name]) {
      g.node.recoverError[name].kill();
      await waitExit(g.node.recoverError[name]);
    }
    const runtime = getRuntime();
    const cmd = (0, import_path2.join)(
      "node_modules",
      ".bin",
      /^win/.test(process.platform) ? "jiti.cmd" : "jiti"
    );
    if (runtime === "bun") {
      g.node.recoverError[name] = Bun.spawn({
        cmd: [
          cmd,
          (0, import_path2.join)(__dirname, "node-watcher.ts")
        ],
        cwd: process.cwd(),
        stdin: "pipe",
        stdout: "pipe"
      });
      const { stdin, stdout } = g.node.recoverError[name];
      const fstdin = stdin;
      for (const file2 of files) {
        fstdin.write(file2 + "\n");
      }
      fstdin.write("!!start!!\n");
      const rstdout = stdout;
      const reader = rstdout.getReader();
      while (true) {
        await reader.read();
        console.log(import_picocolors.default.yellow(`Rebuilding ${name}...`));
        break;
      }
      g.node.recoverError[name].kill();
    } else {
      const w = (0, import_chokidar.watch)(files, {
        disableGlobbing: true,
        ignoreInitial: true
      });
      await new Promise((done) => {
        w.once("all", async () => {
          await w.close();
          done();
        });
      });
    }
    await waitExit(g.node.recoverError[name]);
    delete g.node.recoverError[name];
    rebuild();
  }
};
var printError = (e, svcName) => {
  for (const [idx, line] of Object.entries(e.message.split("\n"))) {
    if (idx === "0") {
      console.log(
        svcName ? `[${import_picocolors.default.green((0, import_lodash.default)(svcName))}]` : "",
        import_picocolors.default.red(line)
      );
    } else {
      console.log(`  ${line}`);
    }
  }
};

// pkgs/service/internal/service/build/build-svc.ts
var buildSvc = async (name, outPath) => {
  const cwdsplit = process.cwd().split(import_path3.sep);
  const root2 = (cwdsplit.includes(".output") ? cwdsplit.slice(0, cwdsplit.length - 2) : cwdsplit).join(import_path3.sep);
  const indexPath = (0, import_path3.join)(root2, _path[name]);
  const fline = await readFirstLine(indexPath);
  let runtime = "node";
  if (!fline.startsWith("#!/usr/bin/env")) {
    console.log(
      import_picocolors2.default.yellow(`WARNING:`),
      `Assuming runtime is node in ${_path[name]}
       \u27A5 Please put "#!/usr/bin/env node" at first line of that file.`
    );
  } else {
    runtime = fline.split(`#!/usr/bin/env`).pop()?.trim() || "node";
  }
  if (runtime === "node") {
    return await buildSvcNode(name, outPath);
  }
};
var readFirstLine = (file2) => {
  return new Promise((resolve, reject) => {
    const rs = (0, import_fs.createReadStream)(file2, { encoding: "utf8" });
    let acc = "";
    let pos = 0;
    let index;
    rs.on("data", function(chunk) {
      index = chunk.indexOf("\n");
      acc += chunk;
      index !== -1 ? rs.close() : pos += chunk.length;
    });
    rs.on("close", function() {
      resolve(acc.slice(0, acc.indexOf("\n")));
    });
    rs.on("error", function(err) {
      reject(err);
    });
  });
};

// pkgs/service/internal/service/gen-meta.ts
var import_promises = require("fs/promises");
var import_path4 = require("path");
var generateMeta = async (cwd3, subdir = ["app", "pkgs"]) => {
  await dirAsync((0, import_path4.join)(cwd3, "gen"));
  let changed = false;
  const services = {};
  for (const dir2 of subdir) {
    const currentDir = (0, import_path4.join)(cwd3, dir2);
    const dirs = await listAsync(currentDir);
    if (dirs) {
      for (const item of dirs) {
        const s = await (0, import_promises.stat)((0, import_path4.join)(currentDir, item));
        if (s.isDirectory()) {
          const indexPath = (0, import_path4.join)(currentDir, item, "index.ts").replaceAll(
            import_path4.sep,
            "/"
          );
          try {
            const indexSrc = await readAsync(indexPath) || "";
            const fline = indexSrc.substring(0, indexSrc.indexOf("\n"));
            const runtime = fline.split(`#!/usr/bin/env`).pop()?.trim() || "node";
            if (indexSrc && indexSrc.includes("declareService")) {
              services[item] = {
                name: item,
                safeName: item.replaceAll(/\W/ig, "_"),
                runtime,
                path: indexPath.substring(cwd3.length + 1)
              };
            }
          } catch (_) {
          }
        }
      }
    }
  }
  const _names5 = Object.keys(services).sort((a, b) => {
    return a.localeCompare(b);
  }).map((e) => `"${e}"`);
  const gensrc = `/******************************************************/
/************* autogenerated - do not edit ************/
/******************************************************/

export type _names = ${_names5.length > 0 ? _names5.join(" | ") : '""'}; 

export const _path = {
  ${Object.values(services).sort((a, b) => {
    return a.name.localeCompare(b.name);
  }).map((e) => {
    return `"${e.name}": "${e.path}"`;
  }).join(",\n  ")}
}

export const _runtime = {
  ${Object.values(services).sort((a, b) => {
    return a.name.localeCompare(b.name);
  }).map((e) => {
    return `"${e.name}": "${e.runtime}"`;
  }).join(",\n  ")}
}
`;
  const appGenPath = (0, import_path4.join)(cwd3, "gen", "service.ts");
  const gen = await readAsync(appGenPath);
  if (gen !== gensrc) {
    changed = true;
    await writeAsync(appGenPath, gensrc);
  }
  if (await genAction({
    cwd: cwd3,
    services,
    suffix: "",
    outfile: "action.ts"
  })) {
    changed = true;
  }
  return changed;
};
var genAction = async ({
  cwd: cwd3,
  services,
  suffix,
  outfile
}) => {
  const gnodeFile = (0, import_path4.join)(cwd3, "gen", outfile);
  const gnode = `/******************************************************/
/************* autogenerated - do not edit ************/
/******************************************************/

${Object.values(services).sort((a, b) => {
    return a.name.localeCompare(b.name);
  }).map((e) => {
    return `import { action as ${e.safeName} } from '../${e.path.replace(
      "index.ts",
      "action" + suffix
    )}';`;
  }).join("\n")}

export default {
  ${Object.values(services).sort((a, b) => {
    return a.name.localeCompare(b.name);
  }).map((e) => {
    return `"${e.name}": ${e.safeName}`;
  }).join(",\n  ")}
}
  
  `;
  const gnodeOld = await readAsync(gnodeFile);
  if (gnode !== gnodeOld) {
    await writeAsync(gnodeFile, gnode);
    return true;
  }
  return false;
};

// pkgs/service/internal/service/server/cleanup.ts
var serverCleanUp = async () => {
  const pending = [];
  if (g.svc) {
    for (const [name, v] of Object.entries(g.svc)) {
      const build = g.node.build[name];
      if (build) {
        if (build.stop) {
          build.stop();
        }
        build.rebuild.dispose();
      }
      for (const [pid, svc] of Object.entries(v)) {
        pending.push(
          new Promise((resolve) => {
            svc.pendingExit = { resolve, from: "Clean Up" };
            if (svc.ws) {
              svc.ws.send(
                JSON.stringify({
                  type: "event",
                  event: "kill"
                })
              );
            }
          })
        );
        delete v[pid];
      }
    }
  }
  await Promise.all(pending);
};

// pkgs/service/internal/rpc/action-rpc.ts
var { blue, green, magenta, red, yellow } = import_picocolors3.default;
var _boot = () => ({
  async stop() {
    await serverCleanUp();
    process.exit(0);
  },
  async genMeta() {
    await generateMeta((0, import_path5.join)(process.cwd(), "..", ".."));
  },
  async getPort() {
    return await getPort();
  },
  buildSvc
});
var _service = () => ({
  identify(name, pid) {
    const ws = getWs(this);
    let svc = getSvc(name, pid);
    if (svc) {
      svc.ws = ws;
      if (svc.pendingStart) {
        svc.pendingStart({ pid });
      }
      console.log(
        magenta("Started"),
        green(`\u203A ${(0, import_lodash3.default)((0, import_lodash2.default)(name) + " ", 13, " ")}`),
        `[pid: ${blue((0, import_lodash3.default)(pid, 7, " "))}]`,
        !!svc.restarted ? yellow("Restarted") : ""
      );
      return {
        params: svc.params,
        argv: process.argv.slice(2),
        runtime: svc.runtime,
        restarted: !!svc.restarted,
        starter: svc.starter,
        metafile: g.node.build[name].metafile
      };
    }
  },
  start(name, params) {
    return new Promise((resolve) => {
      const ws = getWs(this);
      const starter = g.ws.get(ws)?.name || "root";
      const pid = import_cuid.default.slug();
      const svc = getSvc(name, pid, true);
      const path2 = (0, import_path5.join)(process.cwd(), "service", name);
      svc.params = params;
      svc.starter = starter;
      const restart = (crashed) => {
        svc.restarted = true;
        svc.crashed = !!crashed;
        if (svc.ws) {
          if (svc.ws.readyState === 3)
            svc.ws.close();
          delete svc.ws;
        }
        start();
      };
      const start = () => {
        const svcRuntime = getRuntime();
        const onExit = (exitCode) => {
          const desc = {
            "0": "EXIT WITHOUT ERROR",
            "1": "FATAL ERROR",
            "2": "Incorrect usage, invalid options or missing arguments",
            "55": "Service requested stop parent",
            "126": "Command found but is not executable",
            "128": "Command was forcefully terminated manually",
            "88": "Parent websocket connection lost",
            "111": "Hot Reload",
            "222": "Terminated by parent",
            "130": "SIGINT (ctrl+c)",
            "143": "SIGTERM (kill command)"
          };
          const stoplog = (reason) => {
            console.log(
              red("Stopped"),
              green(`\u203A ${(0, import_lodash3.default)((0, import_lodash2.default)(name) + " ", 13, " ")}`),
              `[pid: ${blue((0, import_lodash3.default)(pid, 7, " "))}] ${yellow(reason || "")}`
            );
          };
          if (svc.pendingExit && svc.pendingExit.resolve) {
            const reason = svc.pendingExit.from;
            if (reason === "Hot Reload") {
              svc.pendingExit.resolve(exitCode);
              restart();
              return;
            } else {
              stoplog(`${reason}`);
              svc.pendingExit.resolve(exitCode);
              delete g.svc[name][pid];
            }
          } else {
            const text = desc[exitCode.toString()] || "Unknown Exit Code";
            if (exitCode === 55) {
              process.exit(55);
            }
            if (exitCode === 111) {
              stoplog(text);
              buildSvc(name, process.cwd());
              restart();
              return;
            } else {
              stoplog(`[${red(`${exitCode}`)}] ${yellow(text)}`);
              if (g.mode !== "dev") {
                restart(true);
              } else {
                delete g.svc[name][pid];
              }
              return;
            }
          }
          delete g.svc[name][pid];
        };
        if (_runtime[name] === "node") {
          const args = [
            "--enable-source-maps",
            "--no-warnings",
            (0, import_path5.join)(path2, "index.js"),
            svc.crashed ? "crashed" : "running",
            g.svcPort.toString(),
            pid
          ].filter((e) => e);
          if (svcRuntime === "bun") {
            svc.child = Bun.spawn({
              cmd: ["node", ...args],
              cwd: process.cwd(),
              stderr: "inherit",
              stdout: "inherit",
              onExit(exitCode) {
                onExit(exitCode);
              }
            });
          } else if (svcRuntime === "node") {
            svc.child = (0, import_child_process.spawn)(process.execPath, args, {
              cwd: process.cwd(),
              stdio: "inherit"
            });
            svc.child.on("exit", (code) => {
              onExit(code || 0);
            });
          }
          svc.pendingStart = resolve;
          return svc;
        } else {
          if (!_runtime[name]) {
            console.log(`Service ${name} not found`);
          } else {
            console.log("Only node service are supported");
          }
        }
      };
      start();
    });
  },
  stopAll(name, reason) {
    return new Promise((_resolve) => {
      const pending = [];
      const resolve = (codes) => {
        _resolve(codes);
      };
      if (g.svc[name]) {
        for (const [_, svc] of Object.entries(g.svc[name])) {
          if (svc && svc.ws) {
            pending.push(
              new Promise((done) => {
                if (svc && svc.ws) {
                  svc.pendingExit = {
                    resolve: done,
                    from: reason || "Stop All"
                  };
                  svc.ws.send(
                    JSON.stringify({
                      type: "event",
                      event: "kill"
                    })
                  );
                }
              })
            );
          }
        }
        Promise.all(pending).then(resolve);
      } else {
        resolve([]);
      }
    });
  },
  stop(name, pid, reason) {
    return new Promise((resolve) => {
      const svc = getSvc(name, pid);
      if (svc && svc.ws) {
        svc.pendingExit = { resolve, from: reason || "Stop" };
        svc.ws.send(
          JSON.stringify({
            type: "event",
            event: "kill"
          })
        );
      }
    });
  }
});
var getSvc = (name, pid, initWhenNotFound) => {
  if (!g.svc[name])
    g.svc[name] = {};
  if (!pid) {
    const firstidx = Object.keys(g.svc[name])[0];
    return g.svc[name][firstidx];
  }
  if (g.svc[name][pid]) {
    return g.svc[name][pid];
  } else if (initWhenNotFound) {
    g.svc[name][pid] = { runtime: "node", starter: "root" };
  }
  return g.svc[name][pid];
};
var getWs = (a) => {
  return a._ws;
};
var rootAction = (sender) => (name, pid) => {
  return new Proxy(
    {},
    {
      get(_, p) {
        return async (...args) => {
          return await sender.sendRequest({
            id: import_cuid.default.slug(),
            jsonrpc: "2.0",
            method: "action",
            params: [name, p, args, pid]
          });
        };
      }
    }
  );
};
var invokeAction = (name, fn, args, pid) => {
  return new Promise((resolve, reject) => {
    const svc = getSvc(name, pid);
    if (svc && svc.ws) {
      if (!svc.pendingActions)
        svc.pendingActions = {};
      const aid = import_cuid.default.slug();
      svc.pendingActions[aid] = { resolve, reject };
      svc.ws.send(
        JSON.stringify({
          type: "action",
          aid,
          fn,
          args
        })
      );
    } else {
      reject(
        `Failed to call ${fn.toString()}: Service ${String(name)} not started yet.`
      );
    }
  });
};
var rootBoot = _boot();
var rootService = _service();

// pkgs/service/internal/rpc/typed-rpc/createJsonRpcRequest.ts
var globalRequestId = 1;
var createJsonRpcRequest = () => (action, ...payload) => {
  const currentRequestId = globalRequestId;
  globalRequestId += 1;
  return {
    jsonrpc: "2.0",
    method: action,
    params: payload,
    id: currentRequestId.toString()
  };
};

// pkgs/service/internal/rpc/typed-rpc/createBasicJsonRpcClient.ts
var createBasicJsonRpcClient = (client) => ({
  send: (action, ...payload) => {
    const request = createJsonRpcRequest()(action, ...payload);
    return client.sendRequest(request);
  }
});

// pkgs/service/internal/rpc/typed-rpc/createJsonRpcClient.ts
var createJsonRpcClient = (client) => {
  const basicClient = createBasicJsonRpcClient(client);
  return new Proxy(basicClient, {
    get: (target, methodOrAttributeName) => {
      return (...rest) => {
        return target.send(
          methodOrAttributeName,
          ...rest
        );
      };
    }
  });
};

// pkgs/service/internal/rpc/typed-rpc/createRequestHandler.ts
var createRequestHandler = (handlers) => {
  return {
    bindThis: (arg) => {
      for (const [k, v] of Object.entries(arg)) {
        handlers[k] = v;
      }
    },
    handleRequest: async (request) => {
      try {
        if (request.method === "action") {
          const params = request.params;
          const result2 = await invokeAction(...params);
          return {
            jsonrpc: "2.0",
            id: request.id,
            result: result2
          };
        }
        const result = await handlers[request.method](
          ...request.params
        );
        const response = {
          jsonrpc: "2.0",
          id: request.id,
          result
        };
        return response;
      } catch (error) {
        let response;
        if (error instanceof Error) {
          response = {
            jsonrpc: "2.0",
            id: request.id,
            error: {
              message: error.message,
              cause: error.cause,
              name: error.name,
              stack: error.stack
            }
          };
        } else {
          response = {
            jsonrpc: "2.0",
            id: request.id,
            error
          };
        }
        return response;
      }
    }
  };
};

// pkgs/service/internal/rpc/server.ts
var bootHandler = createRequestHandler({ ...rootBoot });
var serviceHandler = createRequestHandler({
  ...rootService
});
var dec = new TextDecoder();

// pkgs/service/internal/service/build/build-all.ts
var import_lodash4 = __toESM(require("lodash.capitalize"));
var import_picocolors4 = __toESM(require("picocolors"));

// pkgs/service/internal/service/build/watch-all.ts
var import_chokidar2 = require("chokidar");
var cwd2 = process.cwd();

// pkgs/service/main/declare.ts
BigInt.prototype["toJSON"] = function() {
  return this.toString();
};
var declareBuild = (args) => {
  const command = process.argv[2];
  if (args[command]) {
    try {
      args[command]({ restarted: false, argv: process.argv.slice(3) });
    } catch (_) {
    }
  }
};

// pkgs/service/main/root.ts
var root = {
  boot: createJsonRpcClient(rpcSender("boot")),
  service: createJsonRpcClient(rpcSender("service")),
  action: rootAction(rpcSender("service"))
};

// pkgs/royal/srv/prebuild-api.ts
var import_core = require("@babel/core");
var import_plugin_syntax_typescript = __toESM(require("@babel/plugin-syntax-typescript"), 1);
var import_promises2 = require("fs/promises");
var scaffoldAPI = async (name, apiPath) => {
  console.log("ScaffoldingAPI", name, apiPath);
  await dirAsync(apiPath);
  const index = [];
  let _url = {};
  let _params = {};
  const root2 = (0, import_path6.join)((0, import_path6.dirname)(apiPath), "..", "..");
  const genPath = (0, import_path6.join)((0, import_path6.dirname)(apiPath), "..", "..", "gen");
  const mtimePath = (0, import_path6.join)(
    genPath,
    `api.mtime.json`
  );
  const apimetaPath = (0, import_path6.join)(
    genPath,
    `api.meta.json`
  );
  const apimeta = await readAsync(apimetaPath, "json") || {};
  if (!apimeta[name]) {
    apimeta[name] = {};
  }
  if (apimeta[name]) {
    if (apimeta[name]._url)
      _url = apimeta[name]._url;
    if (apimeta[name]._params)
      _params = apimeta[name]._params;
  }
  let mtime = await readAsync(mtimePath, "json") || {};
  const relPath = apiPath.substring(root2.length + 1);
  const pendingRemove = [];
  const dirs = await listAsync((0, import_path6.join)((0, import_path6.dirname)(apiPath), "..", "..", "gen"));
  if (dirs) {
    for (let file2 of dirs) {
      if (file2.startsWith("api.")) {
        pendingRemove.push(removeAsync((0, import_path6.join)(genPath, file2)));
      }
    }
  }
  await Promise.all(pendingRemove);
  await findAsync(apiPath, {
    recursive: true,
    files: true,
    directories: false,
    filter: async (file2) => {
      if (file2.absolutePath && file2.absolutePath.endsWith(".ts")) {
        const s = await (0, import_promises2.stat)(file2.absolutePath);
        const filePath = file2.absolutePath.substring(apiPath.length + 1);
        let shouldParse = mtime[filePath] !== s.mtimeMs;
        mtime[filePath] = s.mtimeMs;
        const apiName = file2.name.substring(0, file2.name.length - 3).replace(/\W/gi, "_");
        index.push({
          name: apiName,
          path: `../${relPath}/` + file2.absolutePath.substring(
            apiPath.length + 1,
            file2.absolutePath.length - 3
          )
        });
        if (file2.size < 10) {
          await writeAsync(
            file2.absolutePath,
            `import { apiContext } from "royal";
export const _ = {
  url: "/${apiName}",
  async api(name: string) {
    const ctx = apiContext(this);
    return { hello: name || "" };
  },
};
`
          );
          shouldParse = true;
        }
        if (shouldParse || !_params[apiName] || !_url[apiName]) {
          const source = await readAsync(file2.absolutePath, "utf8");
          if (source) {
            _params[apiName] = {
              api: [],
              url: [],
              service: []
            };
            _url[apiName] = await new Promise((resolve) => {
              try {
                const parsed = (0, import_core.parse)(source, {
                  sourceType: "module",
                  plugins: [[import_plugin_syntax_typescript.default]]
                });
                let url = "";
                (0, import_core.traverse)(parsed, {
                  ObjectMethod: (p) => {
                    const c = p.node;
                    const params = [];
                    if (c.key.type === "Identifier" && c.key.name === "api") {
                      for (let [_, param] of Object.entries(c.params)) {
                        let name2 = "";
                        if (param.type === "Identifier") {
                          name2 = param.name;
                        }
                        params.push(name2);
                      }
                    }
                    _params[apiName].api = params;
                  },
                  ObjectProperty: (p) => {
                    if (url)
                      return;
                    const c = p.node;
                    if (c.key.type === "Identifier" && c.key.name === "url") {
                      if (c.value.type === "StringLiteral") {
                        url = c.value.value;
                        resolve(url);
                      }
                    }
                  }
                });
              } catch (e) {
              }
            });
            _params[apiName].url = parseParameterizedPathname(_url[apiName]);
            for (let param of _params[apiName].url) {
              if (_params[apiName].api.includes(param)) {
                _params[apiName].service.push(param);
              }
            }
          }
        }
      }
      return true;
    }
  });
  apimeta[name] = { _url, _params };
  await writeAsync(apimetaPath, apimeta);
  await writeAsync(mtimePath, mtime);
  await writeAsync(
    (0, import_path6.join)((0, import_path6.dirname)(apiPath), "..", "..", "gen", `api.${name}.ts`),
    `/** AUTOGENERATED - DO NOT EDIT **/
export {};
${index.map((e) => {
      return `export { _ as ${e.name} } from "${e.path}"`;
    }).join("\n")}
    `
  );
};
var parseParameterizedPathname = (pathname) => {
  const params = {};
  const splited = pathname.split(":");
  for (let s of splited) {
    const idx = s.indexOf("/");
    if (idx) {
      params[s.substring(0, idx)] = true;
    }
  }
  return Object.keys(params);
};

// app/srv/build.ts
declareBuild({
  async preBuild() {
    await scaffoldAPI("srv", (0, import_path7.join)(process.cwd(), "api"));
  }
});
