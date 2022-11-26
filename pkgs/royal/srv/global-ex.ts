import { _names } from "gen";
import { Express, Router } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";
import { g } from "../global";

export const ex = global as unknown as {
  app: Express;
  router: Router;
  server: Server<typeof IncomingMessage, typeof ServerResponse>;
};

export type SrvParams = {
  current: { serviceName: _names; pid: string };
  global: {
    serverName: typeof g["serverName"];
    config: typeof g["config"];
    mode: typeof g["mode"];
  };
};
