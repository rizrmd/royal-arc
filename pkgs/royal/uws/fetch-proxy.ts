import { Readable } from "stream";
import { RecognizedString } from "uWebSockets.js";
import { MHttpResponse } from "../global";
import { plog, replaceBodyDev } from "./tools";
import fetch from "node-fetch";
type IUpstream = { method: string; headers: any };

const dec = new TextDecoder("utf-8");
export const fetchProxy = async (
  url: string,
  baseurl: string,
  serverurl: string,
  upstream: IUpstream,
  res: MHttpResponse,
  successCode?: string[],
) => {
  try {
    const r = await sendRequest(url, upstream, res);

    // if (url.startsWith("http://127.0.0.1")) console.log(r, url);
    if (r) {
      if (successCode) {
        let serving = false;
        for (let code of successCode) {
          if (code.startsWith(">=")) {
            if (parseInt(r.status) >= parseInt(code.substring(2))) {
              serving = true;
            }
          }

          if (r.status === code) {
            serving = true;
          }
        }

        if (!serving) {
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
            if (r.headers["content-type"] === "text/html") {
              const body = typeof r.body === "string"
                ? r.body
                : dec.decode(r.body);
              res.write(replaceBodyDev(body, baseurl, serverurl));
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

    if (url.startsWith("http://127.0.")) {
      console.log("ok", url);
    }
    r.headers.forEach((v, k) => {
      headers[k] = Array.isArray(v) ? v.join(" ") : v + "";
    });
    return { body, headers, status: r.status + "" };
  } catch (e: any) {
    if (url.startsWith("http://127.0.")) {
      console.log(url, e);
    }
    if (e.code !== "ECONNREFUSED") {
      plog(`Failed to request ${url} \n  ➥  ${e}`);
    }
  }
};
