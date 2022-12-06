import { _names } from "gen";
import picocolors from "picocolors";
import { current as cur } from "service";
import { App } from "uWebSockets.js";
import { g } from "../global";
import { ex, SrvHttpResponse, statusCode } from "./global-ex";
import { preBuildSrv } from "./prebuild";
import { attachRouter, route } from "./route";
import { routeAPI } from "./routes/route-api";
import { routeAPIFrm } from "./routes/route-api-frm";

export const initServer = async (params: {
  current: {
    serviceName: _names;
    pid: string;
  };
  global: Partial<typeof g>;
}) => {
  if (!params || (params && !params.current) || (params && !params.global)) {
    console.log(
      picocolors.yellow("\nWARNING:"),
      `Do not run service "${cur.serviceName}" directly. \n         This service will be automatically started when you start royal.  `,
    );
    return;
  }

  if (g.mode === "dev") {
    await preBuildSrv();
  }

  const { current } = params;
  const serviceName = current.serviceName;

  for (let [k, v] of Object.entries(params.global)) {
    if (v) g[k] = v;
  }

  try {
    const port = g.ports[serviceName];
    const app = App({});
    ex.app = app;

    routeAPIFrm();
    routeAPI(serviceName);
    route("/*", async (req, res) => {
      res.sendStatus(404);
      res.send({
        "response": "Not Found",
      });
    });

    attachRouter();
    app.listen("0.0.0.0", port, (token) => {
      ex.socket = token;
    });
  } catch (e) {
    console.log("Failed to start express:\n", e);
  }
};
