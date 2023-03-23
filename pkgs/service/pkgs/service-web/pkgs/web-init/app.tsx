import { setup } from "goober";
import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { initRouter } from "./src/web/router";
import { defineWindow } from "./src/web/define-window";
import { SSR } from "web-types";

export const initApp = async (name: string, App: SSR["App"]) => {
  if (!isSSR) {
    setup(React.createElement);
    defineWindow();

    const w = window as any;
    const pageImport = (await import(
      "../../../../../../app/gen/web/page/entry"
    )) as any;
    w.__PAGES__ = {};
    if (pageImport && pageImport[name]) {
      w.__PAGES__ = pageImport[name];
    }

    const layoutImport = (await import(
      "../../../../../../app/gen/web/layout/entry"
    )) as any;
    w.__LAYOUTS__ = {};
    if (layoutImport && layoutImport[name]) {
      const layouts = (layoutImport as any)[name];
      await Promise.all(
        Object.entries(layouts).map(async ([k, v]) => {
          w.__LAYOUTS__[k] = (await (v as any).default).default;
        })
      );
    }

    initRouter();

    const onlyRoot = true;
    if (App) {
      const init = document.getElementById("init_script");
      if (init) {
        const app = (
          <App
            initScript={init.innerText}
            name={__WEB_NAME__}
            props={__SSR_PROP__}
            etag={__ETAG__}
            res={{
              pathname: location.pathname,
              params: {},
              statusCode: (window as any).__STATUS_CODE__,
            }}
            indexCSS={
              document.getElementById("indexCSS")?.getAttribute("href") ||
              undefined
            }
            onlyRoot={onlyRoot}
          />
        );

        if (onlyRoot) {
          const rootEl = document.getElementById("root");
          if (rootEl) {
            const root = createRoot(rootEl);
            root.render(app);
          }
        } else {
          hydrateRoot(document, app);
        }
      }
    }
  }
};
