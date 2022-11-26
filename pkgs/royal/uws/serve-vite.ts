import trim from "lodash.trim";
import { WebSocket as uWebSocket } from "uWebSockets.js";
import { client as WebSocket } from "websocket";
import config from "../../../config";
import { g, MHttpResponse } from "../global";
import { fetchProxy } from "./fetch-proxy";
import { IUpstream, localHostName, plog } from "./tools";
export const findWeb = (matches: string[]) =>
  matches.find((e) => e?.startsWith("web"));

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
        conf[webName].url,
        srvurl,
        upstream,
        res,
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
