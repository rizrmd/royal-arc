import { ex, SrvHttpRequest, SrvHttpResponse, statusCode } from "./global-ex";
import Router from "find-my-way";
import { getParts } from "uWebSockets.js";
import { createReadStream, ReadStream } from "fs";
import { stat } from "fs/promises";
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

export const attachRouter = () => {
  const app = ex.app;
  app.any("/*", async (res: SrvHttpResponse, req: SrvHttpRequest) => {
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

    res.sendStream = (stream: ReadStream, totalSize: number) => {
      return new Promise<void>((resolve, reject) => {
        stream
          .on("data", (chunk) => {
            if (res.aborted) {
              resolve();
              return;
            }
            const ab = toArrayBuffer(chunk);
            res.sendStreamLastOffset = res.getWriteOffset();
            let [ok, done] = res.tryEnd(ab, totalSize);
            if (done) {
              resolve();
            } else if (!ok) {
              stream.pause();
              res.ab = ab;
              res.abOffset = res.sendStreamLastOffset;
              res.onWritable((offset) => {
                res.sentHeader = true;
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

    res.sendFile = async (path: string) => {
      const totalSize = (await stat(path)).size;
      const readStream = createReadStream(path);

      await res.sendStream(readStream, totalSize);
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
      }
    };

    req.headers = {};
    req.forEach((k, v) => {
      req.headers[k] = v;
    });

    req.url = req.getUrl();
    req.queryString = req.getQuery();

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

    const sent = res.sentBody || res.sentBody || res.sentStatus;
    if (!res.aborted && sent) {
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
          if (type.includes("json")) {
            try {
              req.body = JSON.parse(content.toString("utf-8"));
            } catch (e) {
              console.log(e);
            }
          } else if (type.includes("multipart/form-data")) {
            req.body = getParts(content, type);
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

function toArrayBuffer(buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );
}
