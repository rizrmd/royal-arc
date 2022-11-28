import { spawn } from "child_process";
import { moveAsync, readAsync, writeAsync } from "service";
import trim from "lodash.trim";
import { join, resolve } from "path";
import { cwd } from "process";
import { createRequestHandler, JsonRpcRequest } from "service";
import type { WebSocket } from "uWebSockets.js";
import config from "../../../config";
import { g, MHttpResponse } from "../global";
import { fetchProxy } from "./fetch-proxy";
import { PanelActions } from "./panel/panel-actions";
import { progress } from "./panel/panel-build";
import { deployOnServer } from "./serve-deploy";
import { serveStatic } from "./serve-static";
import { IUpstream } from "./tools";

export const findBoot = (matches: string[]) =>
  matches.find((e) => e === "boot");
export const serveBoot = async (
  upstream: IUpstream,
  _pathname: string,
  res: MHttpResponse,
) => {
  if (res.aborted) return;

  const conf = g.config[g.serverName][g.mode];
  const prefix = new URL(conf["boot"].url).pathname;
  const pathname = _pathname.substring(prefix.length);

  if (pathname.startsWith("/api")) {
    if (pathname === "/api/receive-deploy") {
      let buffer = Buffer.from("");
      res.write(JSON.stringify({ status: "progress" }));

      // plog(` ➤ Resuming deploy sequence on ${g.buildMode}`);
      // g.publishTo = g.buildMode;
      progress(55, `Start Receiving Files`);

      res.onData(async (ab, isLast) => {
        const chunk = Buffer.from(ab);
        buffer = Buffer.concat([buffer, chunk]);
        if (isLast) {
          res.end();
          await deployOnServer(buffer);
        }
      });

      return true;
    }

    res.writeHeader("content-type", "application/json");
    res.write("{}");
    res.end();
    return true;
  }
  if (pathname === "/_api_frm") {
    const allowUrl = upstream.headers.origin || upstream.headers.referer;
    res.writeHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    res.writeHeader("Access-Control-Allow-Headers", "content-type rid");
    res.writeHeader("Access-Control-Allow-Credentials", "true");
    res.writeHeader("Access-Control-Allow-Origin", allowUrl);
    res.write(`\
<script>
    window.addEventListener('message', async (e) => {
        const msg = e.data;
        const res = await fetch(msg.input, msg.init)
        parent.postMessage({result: await res.json(), id: msg.id }, '*')
    })
    parent.postMessage('initialized', '*')
</script>`);
    res.end();
    return true;
  }

  if (g.mode !== "dev") {
    const root = join(cwd(), "client", "_panel");
    return await serveStatic(root, pathname, conf.boot.url, res);
  } else {
    if (!g.vite["royal-panel"] || !g.vite["royal-panel"].host) {
      console.log("Waiting for Boot Vite Panel");
      return false;
    }

    let base = trim(g.vite["royal-panel"].host, "/");
    if (
      !(await fetchProxy(
        `${base}${pathname.startsWith("/") ? pathname : `/${pathname}`}`,
        conf.boot.run_url,
        conf.boot.run_url,
        upstream,
        res,
      ))
    ) {
      return false;
    }
    return true;
  }
};

export const broadcastPanelWS = (msg: any) => {};

const panelActionsHandler = createRequestHandler<typeof PanelActions>(
  PanelActions,
);

export const onPanelWSReceiveMsg = async (
  ws: WebSocket,
  msg: { id: string; request: JsonRpcRequest },
) => {
  const response = await panelActionsHandler.handleRequest(msg.request);
  try {
    ws.send(JSON.stringify({ id: msg.id, response, type: "json-rpc" }));
  } catch (e: any) {
    console.log(e.message);
  }
};

export const buildBootPanel = async (
  rootPath: string,
  buildMode: "prod" | "staging",
) => {
  const conf = (await config)[g.serverName][buildMode];

  if (!conf) {
    console.error(`Config for ${buildMode} not found!`);
    process.exit(0);
    return;
  }

  const url = new URL(conf.boot.run_url);
  const panelPath = resolve(join(rootPath, "pkgs", "web.panel"));
  const bootJsonPath = join(panelPath, "boot.json");
  const baseurl = { base: url.pathname };
  let oldbaseurl = { base: "/" };
  try {
    oldbaseurl = await readAsync(bootJsonPath, "json");
  } catch (e) {}
  await writeAsync(bootJsonPath, baseurl);

  return new Promise<void>((resolve) => {
    console.log("Building BootPanel");
    const vite = spawn(
      join(panelPath, "node_modules", ".bin", "vite"),
      ["build"],
      {
        cwd: panelPath,
        // stdio: 'inherit',
      },
    );
    vite.once("exit", async () => {
      await moveAsync(
        join(panelPath, "dist"),
        join(g.outpath, "client", "_panel"),
      );
      resolve();

      await writeAsync(bootJsonPath, oldbaseurl);

      const indexhtml = join(g.outpath, "client", "_panel", "index.html");
      let html = await readAsync(indexhtml);

      if (html) {
        const serverUrl = conf.boot.publish_url || conf.boot.url;
        const idx = html.lastIndexOf("</body>");
        const injectHtml = `\
<script>
window.mode = "prod";
window.baseurl = "${trim(serverUrl, "/")}";
window.serverurl = "${trim(serverUrl, "/")}";
window.webname = "${g.serverName}";
</script>`;
        html = html.substring(0, idx) + injectHtml + html.substring(idx);

        await writeAsync(indexhtml, html);
      }
    });
  });
};
