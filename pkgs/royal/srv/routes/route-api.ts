import { _names } from "gen";
import { ApiMetaParams } from "service";
import { route } from "../route";

export const routeAPI = async (serviceName: _names) => {
  try {
    //@ts-ignore
    const apiImports = await import("../../../../gen/api");
    //@ts-ignore
    const _apiMeta = (await import("../../../../gen/api.meta.json"));

    const apiMeta = _apiMeta[
      serviceName
    ] as { _url: Record<string, string>; _params: ApiMetaParams };
    const api = apiImports[serviceName];

    for (let [apiName, url] of Object.entries(apiMeta._url)) {
      if (!api[apiName]) {
        continue;
      }

      route(url, async (req, res) => {
        try {
          const im = api[apiName].api.bind({
            req,
            res,
          });
          const params: any = req.body ? req.body : {};

          if (typeof params === "object") {
            if (Array.isArray(params)) {
              const apires = await (im as any)(...params);
              res.sendStatus(200);
              res.send(apires);
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

                const sent = res.sentBody || res.sentHeader || res.sentStatus;
                if (!sent) {
                  if (apires !== undefined) {
                    res.sendStatus(200);
                    res.send(apires);
                  } else {
                    res.sendStatus(500);
                    res.send({ status: "failed", reason });
                  }
                }
              }
            }
          }
        } catch (e: any) {
          console.log(`Failed to call API ${url}:`, e);

          if (!res.headersSent) {
            res.sendStatus(500);
            res.send({ status: "failed", reason: e.message });
          }
        }
      });
    }
  } catch (e) {
    if (e.message.includes("Cannot find module")) {
    } else {
      console.log(`Failed to load API:\n ➥ ${e.message}`);
    }
  }
};
