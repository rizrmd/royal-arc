import { createReadStream, ReadStream, statSync } from "fs";
import { existsAsync, readAsync } from "service";
import mime from "mime-types";
import { join, resolve } from "path";
import { HttpResponse } from "uWebSockets.js";
import { MHttpResponse } from "../global";
import { plog } from "./tools";

let streamIndex = 0;

const caches = {} as Record<string, { path: string; src: string }>;

export const serveStatic = async (
  root: string,
  pathname: string,
  serverurl: string,
  res: MHttpResponse,
) => {
  if (!caches[root]) {
    caches[root] = {
      path: resolve(join(root, "index.html")),
      src: (await readAsync(join(root, "index.html"), "utf8")) || "",
    };
  }

  let path = resolve(join(root, pathname));

  if (await existsAsync(path)) {
    let st = statSync(path);
    if (st.isDirectory()) {
      path = caches[root].path;
    }

    if (res.aborted) return true;

    if (path === caches[root].path && !res.aborted) {
      res.writeHeader("content-type", "text/html");
      res.write(caches[root].src);
      res.end();
      return true;
    }

    const contentType = mime.lookup(path);
    if (contentType) res.writeHeader("content-type", contentType);

    ++streamIndex;
    const totalSize = st.size;
    const readStream = createReadStream(path);
    await pipeStreamOverResponse(res, readStream, totalSize);
    return true;
  } else if (!res.aborted) {
    res.writeHeader("content-type", "text/html");
    res.write(caches[root].src);
    res.end();
    return true;
  }
  return false;
};

function toArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  );
}

/* Either onAborted or simply finished request */
function onAbortedOrFinishedResponse(
  res: HttpResponse,
  readStream: ReadStream,
) {
  if (res.id != -1) {
    readStream.destroy();
  }

  /* Mark this response already accounted for */
  res.id = -1;
}

function pipeStreamOverResponse(
  res: HttpResponse,
  readStream: ReadStream,
  totalSize: number,
) {
  res.onAborted(() => {
    onAbortedOrFinishedResponse(res, readStream);
  });
  return new Promise(() => {
    /* Careful! If Node.js would emit error before the first res.tryEnd, res will hang and never time out */
    /* For this demo, I skipped checking for Node.js errors, you are free to PR fixes to this example */
    readStream
      .on("data", (chunk: Buffer) => {
        /* We only take standard V8 units of data */
        const ab = toArrayBuffer(chunk);

        /* Store where we are, globally, in our response */
        let lastOffset = res.getWriteOffset();

        /* Streaming a chunk returns whether that chunk was sent, and if that chunk was last */
        let [ok, done] = res.tryEnd(ab, totalSize);

        /* Did we successfully send last chunk? */
        if (done) {
          onAbortedOrFinishedResponse(res, readStream);
        } else if (!ok) {
          /* If we could not send this chunk, pause */
          readStream.pause();

          /* Save unsent chunk for when we can send it */
          res.ab = ab;
          res.abOffset = lastOffset;

          /* Register async handlers for drainage */
          res.onWritable((offset) => {
            /* Here the timeout is off, we can spend as much time before calling tryEnd we want to */

            /* On failure the timeout will start */
            let [ok, done] = res.tryEnd(
              res.ab.slice(offset - res.abOffset),
              totalSize,
            );
            if (done) {
              resolve();
              onAbortedOrFinishedResponse(res, readStream);
            } else if (ok) {
              /* We sent a chunk and it was not the last one, so let's resume reading.
               * Timeout is still disabled, so we can spend any amount of time waiting
               * for more chunks to send. */
              readStream.resume();
            }

            /* We always have to return true/false in onWritable.
             * If you did not send anything, return true for success. */
            return ok;
          });
        }
      })
      .on("error", (e) => {
        /* Todo: handle errors of the stream, probably good to simply close the response */
        plog("Failed to send static file", e);
      });
  });
}
