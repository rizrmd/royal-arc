import { ChildProcess } from "child_process";
import { watch } from "chokidar";
import { RadixRouter } from "radix3";
import { FC } from "react";
import {
  getParts,
  TemplatedApp,
  WebSocket as uWebSocket,
} from "uWebSockets.js";
import { connection } from "websocket";
import { BaseConfig } from "./config";
export const g = global as unknown as {
  config: Awaited<ReturnType<typeof BaseConfig>>;
  ports: Record<string, number>;
  mode: "dev" | "staging" | "prod";
  isPrebuild: boolean;
  isRestarted: boolean;
  isSSR: boolean;
  execFromBase: boolean;
  watcher: {
    web: Record<string, ReturnType<typeof watch>>;
    create: ReturnType<typeof watch>;
  };
  serverName: "default";
  root: string;
  servers: Record<string, TemplatedApp>;
  serverWS: WeakMap<uWebSocket, connection>;
  getParts: typeof getParts;
  ssr: {
    layouts: any;
    pages: any;
    route: Record<
      string,
      RadixRouter<{ url: string; ssr: any; layout: string; component: FC }>
    >;
  };
  outpath: string;
  deployKey: string;

  vite: Record<
    string,
    { child: ChildProcess; streaming: boolean; host: string }
  >;

  panelMsgs: Record<string, (result: any) => void>;
  panelStdOut: string;
  panelVitePort?: string;
  panelWS: uWebSocket[];
  db: any;
  window: any;
  location: URL & { href: string };
};
