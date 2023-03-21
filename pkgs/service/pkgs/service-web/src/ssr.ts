import { initRouter } from "web-types/router";
import { web } from "./glbweb";

export const initSSR = async () => {
  const srvURL = await web.rpc.srv.publicURL();

  web.ssr = {
    App: null,
    handler: {},
    initScript: (inject: string) => {
      return `\
(() => {const w=window;w.__REACT_DEVTOOLS_GLOBAL_HOOK__={isDisabled:!0},w.__SRV_URL__="${srvURL}",w.__WEB_NAME__="${web.name}",w.isSSR=!1;${inject}})()`;
    },
  };
  
  initRouter();
  return web.ssr;
};
