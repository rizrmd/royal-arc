import trim from "lodash.trim";
import { WebSocket as uWebSocket } from "uWebSockets.js";
import ws from "websocket";
import config from "../../../config";
import { g, MHttpResponse } from "../global";
import { fetchProxy } from "./fetch-proxy";
import { IUpstream, localHostName, plog, replaceBodyDev } from "./tools";
export const findWeb = (matches: string[]) =>
  matches.find((e) => e?.startsWith("web"));

const dec = new TextDecoder();
const WebSocket = ws.client;
export const serveVite = async (
  webName: string,
  upstream: IUpstream,
  pathname: string,
  res: MHttpResponse,
) => {
  if (!g.vite) return false;
  if (!g.vite[webName]) return false;
  const host = trim(g.vite[webName].host, "/");

  if (host) {
    const conf = (await config)[g.serverName][g.mode];
    const srvurl = conf["srv"] ? conf["srv"].url : conf[webName].url;
    if (
      !(await fetchProxy(
        `${host}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
        upstream,
        res,
        {
          overrideBody(r) {
            if (r.headers["content-type"] === "text/html") {
              const body = typeof r.body === "string"
                ? r.body
                : dec.decode(r.body);
              return replaceBodyDev(
                body,
                conf[webName].url,
                srvurl,
              );
            }
            return r.body;
          },
        },
      ))
    ) {
      if (!res.aborted) {
        res.writeStatus("502 Gateway Timeout");
        res.write(`Vite is not started at port ${host}`);
        res.end();
      }
    }
    return true;
  }
  return false;
};

export const serveViteWS = (
  webName: string,
  _ws: uWebSocket,
  fromPort: string,
) => {
  if (!g.vite) return false;
  if (!g.vite[webName]) return false;
  const host = g.vite[webName].host;
  if (host) {
    const ws = new WebSocket({
      closeTimeout: 1,
    });
    ws.on("connect", (connection) => {
      connection.on("error", function (error) {});
      connection.on("close", function () {});
      connection.on("message", function (message) {
        if (message.type === "utf8") {
          try {
            _ws.send(message.utf8Data);
          } catch (e) {}
        }
      });
    });
    ws.on("connectFailed", () => {
      plog("connected failed");
    });
    ws.connect(host, "vite-hmr", `ws://${localHostName}:${fromPort}/`);
  }
};
