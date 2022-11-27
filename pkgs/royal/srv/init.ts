import { _names } from "gen";
import bodyParser from "body-parser";
import express from "express";
import { createServer } from "http";
import picocolors from "picocolors";
import { current as cur, root } from "service";
import { ApiMetaParams, DBArg } from "service";
import { g } from "../global";
import { ex } from "./global-ex";
import { preBuildSrv } from "./prebuild";

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

    ex.router.all("*/_api_frm", (req, res) => {
      // TODO: whitelist origin
      const allowUrl = req.headers.origin || req.headers.referer;

      res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, OPTIONS, PUT",
      );
      res.setHeader("Access-Control-Allow-Headers", "content-type rid");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      if (allowUrl) {
        res.setHeader("Access-Control-Allow-Origin", allowUrl);
      }

      res.send(`\
    <script>
      window.addEventListener('message', async (e) => {
        const msg = e.data;
        const res = await fetch(msg.input, msg.init)
        parent.postMessage({result: await res.json(), id: msg.id }, '*')
      })
      parent.postMessage('initialized', '*')
    </script>`);
    });

    try {
      //@ts-ignore
      const apiImports = await import("../../../gen/api");
      //@ts-ignore
      const _apiMeta = (await import("../../../gen/api.meta.json"));

      const apiMeta = _apiMeta[
        serviceName
      ] as { _url: Record<string, string>; _params: ApiMetaParams };
      const api = apiImports[serviceName];

      for (let [apiName, url] of Object.entries(apiMeta._url)) {
        if (!api[apiName]) {
          continue;
        }

        ex.router.all(url, async (req, res) => {
          try {
            const im = api[apiName].api.bind({
              req,
              res,
            });
            const params: any = req.body ? req.body : {};

            if (typeof params === "object") {
              if (Array.isArray(params)) {
                const apires = await (im as any)(...params);
                res.status(200).send(apires);
              } else {
                const prm = apiMeta._params[apiName];
                if (prm) {
                  const passedParams: any[] = [];
                  for (const paramName of Object.values(prm.api) as string[]) {
                    let value = params[paramName];
                    if (req.params[paramName]) {
                      value = req.params[paramName];
                    }
                    passedParams.push(value);
                  }

                  let apires;
                  let reason = "";
                  try {
                    apires = await (im as any)(...passedParams);
                  } catch (e: any) {
                    reason = e.message;
                  }
                  if (apires !== undefined) {
                    res.status(200).send(apires);
                  } else {
                    res.status(500).send({ status: "failed", reason });
                  }
                }
              }
            }
          } catch (e: any) {
            console.log(`Failed to call API ${url}:`, e);
            res.status(500);
            res.send({ status: "failed", reason: e.message });
          }
        });
      }
    } catch (e) {
      if (e.message.includes("Cannot find module")) {
      } else {
        console.log(`Failed to load API:\n ➥ ${e.message}`);
      }
    }

    try {
      //@ts-ignore
      const { prisma } = await import("../../../gen/prisma");
      for (const dbName of Object.keys(prisma)) {
        ex.router.all(`/_dbs/${dbName}*`, async (req, res, next) => {
          //@ts-ignore
          const s = root.action(dbName as "db");
          if (s) {
            const runDB = async (arg: DBArg) => {
              //@ts-ignore
              return await s.query(arg);
            };
            try {
              const result = await runDB(req.body);
              res.send(result);
            } catch (e) {
              res.sendStatus(500);
              console.error(e);

              if (!res.headersSent) {
                res.send(e);
              }
            }
            return;
          }

          res.send({ error: `${dbName} not found.` });
        });
      }
    } catch (e) {
      if (e.message.includes("Cannot find module")) {
      } else {
        console.log(`Failed to run DB:\n ➥ ${e.message}`);
      }
    }

    ex.router.all("/", (req, res) => {
      res.send("API Server Running");
    });
    ex.server.listen(port);
  } catch (e) {
    console.log("Failed to start express:\n", e);
  }
};
