"use strict";

const fs = require("./utils/fs");
const validate = require("./utils/validate");

const supportedReturnAs = ["utf8", "buffer", "json", "jsonWithDates"];

const validateInput = (methodName, path, returnAs) => {
  const methodSignature = `${methodName}(path, returnAs)`;
  validate.argument(methodSignature, "path", path, ["string"]);
  validate.argument(methodSignature, "returnAs", returnAs, [
    "string",
    "undefined",
  ]);

  if (returnAs && supportedReturnAs.indexOf(returnAs) === -1) {
    throw new Error(
      `Argument "returnAs" passed to ${methodSignature} must have one of values: ${supportedReturnAs.join(
        ", "
      )}`
    );
  }
};

// Matches strings generated by Date.toJSON()
// which is called to serialize date to JSON.
const jsonDateParser = (key, value) => {
  const reISO =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
  if (typeof value === "string") {
    if (reISO.exec(value)) {
      return new Date(value);
    }
  }
  return value;
};

const makeNicerJsonParsingError = (path, err) => {
  const nicerError = new Error(
    `JSON parsing failed while reading ${path} [${err}]`
  );
  nicerError.originalError = err;
  return nicerError;
};

// ---------------------------------------------------------
// SYNC
// ---------------------------------------------------------

const readSync = (path, returnAs) => {
  const retAs = returnAs || "utf8";
  let data;

  let encoding = "utf8";
  if (retAs === "buffer") {
    encoding = null;
  }

  try {
    data = fs.readFileSync(path, { encoding });
  } catch (err) {
    if (err.code === "ENOENT") {
      // If file doesn't exist return undefined instead of throwing.
      return undefined;
    }
    // Otherwise rethrow the error
    throw err;
  }

  try {
    if (retAs === "json") {
      data = JSON.parse(data);
    } else if (retAs === "jsonWithDates") {
      data = JSON.parse(data, jsonDateParser);
    }
  } catch (err) {
    throw makeNicerJsonParsingError(path, err);
  }

  return data;
};

// ---------------------------------------------------------
// ASYNC
// ---------------------------------------------------------

const readAsync = (path, returnAs) => {
  return new Promise((resolve, reject) => {
    const retAs = returnAs || "utf8";
    let encoding = "utf8";
    if (retAs === "buffer") {
      encoding = null;
    }

    fs.readFile(path, { encoding })
      .then((data) => {
        // Make final parsing of the data before returning.
        try {
          if (retAs === "json") {
            resolve(JSON.parse(data));
          } else if (retAs === "jsonWithDates") {
            resolve(JSON.parse(data, jsonDateParser));
          } else {
            resolve(data);
          }
        } catch (err) {
          reject(makeNicerJsonParsingError(path, err));
        }
      })
      .catch((err) => {
        if (err.code === "ENOENT") {
          // If file doesn't exist return undefined instead of throwing.
          resolve(undefined);
        } else {
          // Otherwise throw
          reject(err);
        }
      });
  });
};

// ---------------------------------------------------------
// API
// ---------------------------------------------------------

exports.validateInput = validateInput;
exports.sync = readSync;
exports.async = readAsync;
