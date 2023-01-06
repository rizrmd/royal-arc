import { IAppRoot } from "index";
import { createRouter } from "radix3";
import { FC, lazy } from "react";

let w = (
  typeof isSSR === "undefined" ? window : global.window
) as typeof window & {
  importedPages: any;
  importedLayouts: any;
  lazyPages: any;
  lazyLayout: any;
  appRoot: typeof appRoot;
  params: typeof params;
  basepath: typeof basepath;
};

export const importPageAndLayout = async (name: string) => {
  w.lazyPages = {};
  Object.entries(w.importedPages).map(([key, imp]: any) => {
    w.lazyPages[key] = lazy(async () => {
      const component = (await imp[2]()).default.component;
      return {
        default: component,
      };
    });
  });

  w.lazyLayout = {};
  Object.entries(w.importedLayouts).map(([key, imp]) => {
    w.lazyLayout[key] = lazy(async () => {
      // @ts-ignore
      const component = (await imp()).default;
      return {
        default: component,
      };
    });
  });
};

export type IFoundPage = {
  layout: string;
  page: string;
  Page: FC;
  Layout: FC;
  params: any;
};

if (w && w.appRoot) {
  w.appRoot.router = undefined;
  if (w.appRoot.render) w.appRoot.render();
}

// this will be run on each app render, so it cannot be an aysnc func
export const loadPageAndLayout = (local: IAppRoot & { render: () => void }) => {
  if (isSSR) {
    w = global.window as any;
  }

  local.page.list = w.importedPages;
  local.layout.list = w.importedLayouts;

  if (!local.initialized) {
    local.router = createRouter({ strictTrailingSlash: true });
    initializeRoute(local);
  }

  if (local.router) {
    let found = local.router.lookup(local.url) as IFoundPage | null | undefined;
    if (!found || (found && !found.page)) {
      found = local.router.lookup(local.url + "/") as any;
    }

    if (found) {
      w.params = found.params || {};
      local.page.name = found.page;
      if (local.layout.name !== found.layout) {
        local.layout.name = found.layout;
      }

      local.page.current = found.Page;
      local.layout.current = found.Layout;
    }
    return found;
  }
};

const initializeRoute = (local: IAppRoot) => {
  if (local.router) {
    if (local.page.list) {
      for (let [pageName, page] of Object.entries(local.page.list)) {
        let [url, layoutName, pageDef] = page as unknown as [
          string,
          string,
          () => Promise<{
            default: {
              url: string;
              layout: string;
              component: () => {
                default: React.ComponentType<any>;
              };
            };
          }>
        ];
        if (!layoutName) layoutName = "default";

        let _url = url.replace(/\*\*/gi, "*");
        _url = url.replace(/\*/gi, "**");
        local.router.insert(_url, {
          layout: layoutName,
          page: pageName,
          Page: w.lazyPages[pageName],
          Layout: w.lazyLayout[layoutName],
        });
      }
    }
  }
};
