import { ChildProcess } from "child_process";
import {
  getParts,
  HttpResponse,
  TemplatedApp,
  WebSocket as uWebSocket,
} from "uWebSockets.js";
import { connection } from "websocket";
import { BaseConfig } from "./config";

export type MHttpResponse = HttpResponse & { aborted?: boolean };

export const g = global as unknown as {
  config: Awaited<ReturnType<typeof BaseConfig>>;
  ports: Record<string, number>;
  mode: "dev" | "staging" | "prod";
  isRestarted: boolean;
  execFromBase: boolean;

  serverName: "default";
  root: string;
  servers: Record<string, TemplatedApp>;
  serverWS: WeakMap<uWebSocket, connection>;
  getParts: typeof getParts;
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
};
