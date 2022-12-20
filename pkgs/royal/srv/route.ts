import { ex, SrvHttpRequest, SrvHttpResponse, statusCode } from "./global-ex";
import Router from "find-my-way";
import { getParts } from "uWebSockets.js";
import { createReadStream, ReadStream, statSync } from "fs";
import { stat } from "fs/promises";
import mime from "mime-types";

type URLArg = string;
type RouteHandler = (
  req: SrvHttpRequest,
  res: SrvHttpResponse,
) => Promise<void>;

const router = Router({
  caseSensitive: false,
});

export const route = (
  url: URLArg,
  handler: RouteHandler,
) => {
  router.get(url, handler as any);
};

export const decorateReqRes = (req: SrvHttpRequest, res: SrvHttpResponse) => {
  res.onAborted(() => {
    res.aborted = true;
  });

  res.sendHeader = (key: string, value: string) => {
    if (!res.aborted) {
      res.writeHeader(key, value);
      res.sentHeader = true;
    }
  };
  res.setHeader = res.sendHeader;
  res.redirect = (url, code) => {
    res.sendStatus(code || 301);
    res.sendHeader("location", url);
  };

  res.sendStream = (
    stream: ReadStream,
    totalSize: number,
    onData?: (chunk: string | Buffer) => void,
  ) => {
    return new Promise<void>((resolve, reject) => {
      stream
        .on("data", (chunk) => {
          res.sentBody = true;
          if (res.aborted) {
            resolve();
            return;
          }
          const ab = toArrayBuffer(chunk as Buffer);
          if (onData) {
            onData(chunk);
          }

          res.sendStreamLastOffset = res.getWriteOffset();
          let [ok, done] = res.tryEnd(ab, totalSize);
          if (done) {
            res.ended = true;
            resolve();
          } else if (!ok) {
            stream.pause();
            res.ab = ab;
            res.abOffset = res.sendStreamLastOffset;
            res.onWritable((offset) => {
              let [ok, done] = res.tryEnd(
                res.ab.slice(offset - res.abOffset),
                totalSize,
              );
              if (done) {
                resolve();
              } else if (ok) {
                stream.resume();
              }
              return ok;
            });
          }
        })
        .on("error", (e) => {
          reject(e);
        });
    });
  };

  res.sendFile = async (path: string, opt?: { cache?: boolean }) => {
    let onData: any;
    if (opt && opt.cache) {
      if (res.fileCache[path]) {
        res.writeHeader("content-type", res.fileCache[path].mime);
        res.write(res.fileCache[path].src);
        return;
      }
      res.fileCache[path] = { mime: "", src: null };
      onData = (chunk: string | Buffer) => {
        if (res.fileCache[path].src === null) {
          res.fileCache[path].src = chunk;
        }
      };
    }

    const totalSize = (await stat(path)).size;
    const readStream = createReadStream(path);

    const contentType = mime.lookup(path);
    if (res.aborted) {
      return;
    }

    if (contentType) {
      res.fileCache[path].mime = contentType;
      res.writeHeader("content-type", contentType);
    }

    await res.sendStream(readStream, totalSize, onData);
    res.sentBody = true;
  };

  res.sendStatus = (code: number) => {
    if (!res.aborted) {
      const text = statusCode[code] || `Unknown`;
      res.writeStatus(`${code} ${text}`);
      res.sentStatus = code;
    }
  };

  res.send = (data) => {
    if (!res.aborted) {
      if (typeof data === "string") {
        res.write(data);
        res.sentBody = data;
      } else if (typeof data === "number") {
        res.write(data + "");
        res.sentBody = data;
      } else if (typeof data === "object" || !data) {
        res.sentBody = JSON.stringify(data);
        res.writeHeader("content-type", "application/json");
        res.write(res.sentBody);
      }
    } else {
      console.log("Response aborted, failed to send");
    }
  };

  req.headers = {};
  req.forEach((k, v) => {
    req.headers[k] = v;
  });

  res.fileCache = {};
  req.url = req.getUrl();
  req.queryString = req.getQuery();
  return { req, res };
};

export const attachRouter = () => {
  const app = ex.app;
  app.any("/*", async (res: SrvHttpResponse, req: SrvHttpRequest) => {
    decorateReqRes(req, res);

    const found = router.find("GET", req.url + "?" + req.queryString);

    if (found) {
      req.params = found.params;
      req.query = found.searchParams;
      await parseBody(req, res);
      await found.handler(
        req as any,
        res as any,
        found.params,
        found.store,
        found.searchParams,
      );
    }

    if (!res.aborted && !res.ended) {
      res.end();
    }
  });
};

function parseBody(
  req: SrvHttpRequest,
  res: SrvHttpResponse,
) {
  return new Promise<void>((resolve) => {
    if (req.getMethod() === "post") {
      let buffer: Buffer;
      res.onData((ab, isLast) => {
        let chunk = Buffer.from(ab);
        if (isLast) {
          const content = buffer ? Buffer.concat([buffer, chunk]) : chunk;
          const type = req.headers["content-type"];
          if (type) {
            if (type.includes("json")) {
              try {
                req.body = JSON.parse(content.toString("utf-8"));
              } catch (e) {
                console.log(e);
              }
            } else if (type.includes("multipart/form-data")) {
              req.body = getParts(content, type);
            }
          } else {
            req.body = content;
          }
          resolve();
        } else {
          if (buffer) {
            buffer = Buffer.concat([buffer, chunk]);
          } else {
            buffer = Buffer.concat([chunk]);
          }
        }
      });
      return;
    }
    resolve();
  });
}

function toArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );
}
