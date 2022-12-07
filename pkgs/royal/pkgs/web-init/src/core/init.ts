import { css } from "@emotion/react";
import React, { Fragment } from "react";
import { jsx } from "./jsx";
import { createFrameCors } from "./iframe-cors";
import { importPageAndLayout } from "./router";

const w = window as unknown as {
  importedLayouts: any;
  importedPages: any;
  Capacitor: any;

  apiHeaders: typeof apiHeaders;
  serverurl: typeof serverurl;
  baseurl: typeof baseurl;
  basepath: typeof basepath;
  pathname: typeof pathname;
  webname: string;
  css: typeof css;
  mode: typeof mode;
  jsx: typeof jsx;
  Fragment: typeof Fragment;
  React: typeof React;
  params: typeof params;
  isMobile: typeof isMobile;
  mobile: typeof mobile;
  api: any;
  navigate: typeof navigate;
  appRoot: typeof appRoot;
  preventPopRender: boolean;
  frmapi: ReturnType<typeof createFrameCors>;
  db: any;
};

export const initEnv = async (arg: { layout: any; page: any }) => {
  w.importedLayouts = arg.layout;
  w.importedPages = arg.page;
  w.apiHeaders = {};

  // if (!w.serverurl) {
  //   try {
  //     const res = await fetch("/url.json");
  //     if (res.status === 200) {
  //       const url = await res.json();
  //       w.serverurl = url.serverurl;
  //       w.baseurl = url.baseurl;
  //       w.webname = url.webname;
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  if (!w.serverurl) {
    w.serverurl = location.href;
  }

  if (!w.baseurl) {
    w.baseurl = location.href;
  }

  if (!w.basepath) {
    const url = new URL(w.baseurl);
    w.basepath = url.pathname;

    if (w.basepath.endsWith("/")) {
      w.basepath = w.basepath.substring(0, w.basepath.length - 1);
    }
  }

  w.pathname = location.pathname.substring(w.basepath.length);

  await importPageAndLayout(w.webname);

  if (!w.css) {
    if (!w.mode) w.mode = "dev";
    w.css = css;
    w.jsx = jsx;
    w.Fragment = Fragment;
    w.React = React;
    w.params = {};

    if (w.Capacitor) {
      w.isMobile = true;
      w.mobile = {
        ready: false,
        insets: null,
      };
      if (w.Capacitor.Plugins) {
        const app = w.Capacitor.Plugins.App;
        if (app) {
          app.addListener("backButton", () => {
            history.back();
          });
        }
      }
    }

    let apimeta;
    try {
      //@ts-ignore
      apimeta = await import("gen/api.meta.json");
    } catch (e) {
    }

    //@ts-ignore
    if (apimeta && apimeta["srv"]) {
      //@ts-ignore
      const { _params, _url } = apimeta["srv"];
      w.api = new Proxy(
        {},
        {
          get: (_, actionName) => {
            return (...rest: any) => {
              return new Promise<any>(async (resolve) => {
                const action = (_url as any)[actionName];
                const params = (_params as any)[actionName];
                if (action && params) {
                  let actionurl = action;

                  if (rest.length > 0 && params.api.length > 0) {
                    for (const [idx, p] of Object.entries(rest)) {
                      const paramName = params.api[idx];
                      if (params.shared && params.shared.includes(paramName)) {
                        if (
                          !!p &&
                          typeof p !== "string" &&
                          typeof p !== "number"
                        ) {
                          throw new Error(
                            `\n\nAPI Parameter [${paramName}] should be string or number.\nIt is passed in url: ${action}.\n\nCurrent value: \n${
                              JSON.stringify(
                                p,
                              )
                            }\n`,
                          );
                        }
                      }
                      actionurl = actionurl.replace(`:${paramName}?`, p + "");
                      actionurl = actionurl.replace(`:${paramName}`, p + "");
                    }
                  }

                  const url = `${w.basepath}${actionurl}`;
                  const result = await fetchSendApi(url, rest);
                  resolve(result);
                } else {
                  console.error(`API Not Found: ${actionName.toString()}`);
                }
              });
            };
          },
        },
      );
    }

    w.navigate = (href: string) => {
      let _href = href;

      if (_href.startsWith("/")) {
        if (w.basepath.length > 1) {
          _href = `${w.basepath}${_href}`;
        }
      }

      if (!w.appRoot.mounted) {
        location.href = _href;
        return;
      }
      history.pushState({}, "", _href);
      w.pathname = location.pathname.substring(w.basepath.length);
      w.appRoot.render();
    };
    window.addEventListener("popstate", () => {
      if (w.preventPopRender) {
        w.preventPopRender = false;
        return;
      }
      w.appRoot.render();
    });

    let prisma;

    try {
      // @ts-ignore
      prisma = await import("gen/prisma");
    } catch (e) {
    }

    if (prisma) {
      for (let name of Object.keys(prisma)) {
        if (name.startsWith("db.")) {
          (w as any)[name.substring(3)] = dbClient(name);
        } else {
          (w as any)[name] = dbClient(name);
        }
      }
    }
  }
};

const dbClient = (name: string) => {
  return new Proxy(
    {},
    {
      get(_, table: string) {
        if (table.startsWith("$")) {
          return (...params: any[]) => {
            return fetchSendDb(name, {
              db: name,
              action: "query",
              table,
              params,
            });
          };
        }

        return new Proxy(
          {},
          {
            get(_, action: string) {
              return (...params: any[]) => {
                if (table === "query") {
                  table = action;
                  action = "query";
                }
                return fetchSendDb(name, {
                  db: name,
                  action,
                  table,
                  params,
                });
              };
            },
          },
        );
      },
    },
  );
};

export const fetchSendApi = async (url: string, params: any) => {
  if (!w.frmapi) {
    w.frmapi = createFrameCors(w.serverurl);
  }

  return await w.frmapi.send(url, params, w.apiHeaders);
};

export const fetchSendDb = async (name: string, params: any) => {
  const w = window as any;
  let url = `/_dbs/${name}`;

  if (params.table) {
    url += `...${params.table}`;
  }

  if (!w.frmapi) {
    w.frmapi = createFrameCors(w.serverurl);
  }

  return await w.frmapi.send(url, params, w.apiHeaders);
};

//---generated---//
w.db = dbClient("db");
