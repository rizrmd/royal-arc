import { g, SrvHttpRequest, SrvHttpResponse, SSROverride } from "../export";

export const serveSSR = async (arg: {
  webName: string;
  req: SrvHttpRequest;
  ovr: SSROverride;
  res: SrvHttpResponse;
  g: typeof g;
}) => {
  const { webName, ovr, res, req } = arg;

  let ssr = null as any;

  try {
    //@ts-ignore
    ssr = (await import("../../../app/web/server/ssr")).default;
  } catch (e) {}

  if (!ssr) {
    return;
  }

  let url = ovr.url;

  if (url.startsWith("http")) {
    const _url = new URL(url);
    url = _url.pathname;
  }

  if (g.ssr.route[webName]) {
    let found = g.ssr.route[webName].lookup(url);

    if (!found || (found && !found.ssr)) {
      const _url = url.endsWith("/") ? url : url + "/";
      found = g.ssr.route[webName].lookup(_url);
    }

    if (found) {
      if (typeof found.params === "object") {
        if (!req.params) req.params = {};
        for (const [k, v] of Object.entries(found.params)) {
          req.params[k] = v;
        }
      }

      if (!req.params) {
        req.params = {};
      }

      if (typeof ssr === "function") {
        try {
          g.location = new URL(g.config[g.serverName][g.mode][webName].url);
          g.location.pathname = url;
          const lazyPages = {};

          for (const [k, imp] of Object.entries(g.ssr.pages[webName])) {
            const comp = (await imp[2]()).default.component;
            lazyPages[k] = comp;
          }

          const lazyLayout = {};

          for (const [k, imp] of Object.entries(
            g.ssr.layouts[webName]
          ) as any) {
            const comp = (await imp()).default;
            lazyLayout[k] = comp;
          }

          g.window = {
            ...g.window,
            lazyPages,
            lazyLayout,
            importedPages: g.ssr.pages[webName],
            importedLayouts: g.ssr.layouts[webName],
            location: g.location,
          };

          await ssr(arg);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
};
