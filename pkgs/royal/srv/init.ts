import bodyParser from "body-parser";
import express from "express";
import { _names } from "gen";
import { createServer } from "http";
import picocolors from "picocolors";
import { current as cur } from "service";
import { g } from "../global";
import { ex } from "./global-ex";
import { preBuildSrv } from "./prebuild";
import { routeAPI } from "./routes/route-api";
import { routeAPIFrm } from "./routes/route-api-frm";
import { routeDB } from "./routes/route-db";
import { routeDeploy } from "./routes/route-deploy";

export const initExpress = async (params: {
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
    ex.app = express();
    ex.router = express.Router();

    ex.app.use(bodyParser.json());
    ex.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    ex.app.use(ex.router);

    ex.server = createServer(ex.app);

    routeAPIFrm();
    await routeAPI(serviceName);
    await routeDB();
    routeDeploy();

    ex.router.all("/", (req, res) => {
      res.send("API Server Running");
    });
    ex.server.listen(port);
  } catch (e) {
    console.log("Failed to start express:\n", e);
  }
};
