import fetch from "node-fetch";
import { Readable } from "stream";
import { RecognizedString } from "uWebSockets.js";
import { MHttpResponse } from "../global";
import { plog } from "./tools";
type IUpstream = { method: string; headers: any };

const dec = new TextDecoder("utf-8");
export const fetchProxy = async (
  url: string,
  upstream: IUpstream,
  res: MHttpResponse,
  opt?: {
    onRequest?: (
      r: Awaited<ReturnType<typeof sendRequest>>,
    ) => boolean | Promise<boolean>;
    overrideBody?: (
      r: Awaited<ReturnType<typeof sendRequest>>,
    ) => string | ArrayBuffer;
  },
) => {
  try {
    const r = await sendRequest(url, upstream, res);
    if (r) {
      if (opt && opt.onRequest) {
        if (!await opt.onRequest(r)) {
          return false;
        }
      }

      if (!res.aborted) {
        res.cork(() => {
          res.writeStatus(r.status);

          for (const [k, v] of Object.entries(r.headers)) {
            res.writeHeader(k, v);
          }
          if (r.body) {
            if (opt && opt.overrideBody) {
              const body = opt.overrideBody(r);
              res.write(body);
            } else {
              res.write(r.body);
            }
          }
          res.end();
        });
        return true;
      }
    }
  } catch (e) {
    plog(e);
  }
  return false;
};

const sendRequest = async (
  url: string,
  upstream: IUpstream,
  res: MHttpResponse,
): Promise<
  | undefined
  | {
    body: ArrayBuffer | string;
    headers: Record<string, RecognizedString>;
    status: string;
  }
> => {
  try {
    delete upstream.headers.connection; // forbidden header in undici
    delete upstream.headers["content-length"]; // prevent length mismatch

    const _url = new URL(url);
    if (upstream.headers.referer) {
      upstream.headers.referer = upstream.headers.referer.replace(
        upstream.headers.host,
        _url.host,
      );
    }
    let stream: Readable | undefined;
    const hasBody = upstream.headers["content-type"];
    if (!res.aborted) {
      stream = new Readable();
      stream._read = () => {};
      res.onData((chunk, isLast) => {
        if (stream) {
          stream.push(Buffer.concat([Buffer.from(chunk)]));

          if (isLast) {
            stream.push(null);
          }
        }
      });
    }

    upstream.headers.host = _url.host;

    const r = await fetch(_url.toString(), {
      method: upstream.method.toUpperCase() as any,
      headers: upstream.headers,
      body: hasBody && stream ? stream : undefined,
    });

    const body = await (await r.blob()).arrayBuffer();
    const headers: Record<string, RecognizedString> = {};

    r.headers.forEach((v, k) => {
      headers[k] = Array.isArray(v) ? v.join(" ") : v + "";
    });
    return { body, headers, status: r.status + "" };
  } catch (e: any) {
    if (e.code !== "ECONNREFUSED") {
      plog(`Failed to request ${url} \n  ➥  ${e}`);
    }
  }
};
