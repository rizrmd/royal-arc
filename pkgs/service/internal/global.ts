import { ServerWebSocket, spawn as bunSpawn } from "bun";
import { spawn as nodeSpawn } from "child_process";
import { build, BuildInvalidate } from "esbuild";
import action from "gen/action";
import { _names } from "gen/service";
import { join } from "path";
import { WebSocket as uWebSocket } from "uWebSockets.js";
import { readAsync } from "../internal/service/build/jetpack";

export type ActionItem = typeof action;
export type ActionKey = keyof ActionItem;

export const initGlobal = async (arg: { svcPort: number }) => {
  if (!g.mode) {
    g.mode = process.argv.includes("debug") ? "dev" : "prod";
    if (process.argv.includes("staging")) {
      g.mode = "staging";
    }

    const confg: any =
      await readAsync(join(process.cwd(), "conf.json"), "json") ||
      {};

    for (const [k, v] of Object.entries(confg)) {
      (g as any)[k] = v;
    }

    g.svcPort = arg.svcPort;
    g.node = {
      buildTimeout: {},
      build: {},
      watch: {},
    };
  }
};

export const g = globalThis as unknown as {
  cwd: string;
  svcPort: number;
  mode: "dev" | "prod" | "staging";
  node: {
    buildTimeout: Record<string, any>;
    build: Record<
      string,
      Awaited<ReturnType<typeof build>> & {
        rebuild: BuildInvalidate & (() => void);
      }
    >;
    watch: Record<string, ReturnType<typeof bunSpawn | typeof nodeSpawn>>;
  };
  svc: Record<
    _names,
    Record<
      string,
      {
        runtime: "node" | "bun" | "deno";
        params?: any;
        child?: ReturnType<typeof bunSpawn | typeof nodeSpawn>;
        ws?: ServerWebSocket;
        restarted?: boolean;
        crashed?: boolean;
        starter: _names | "root";
        pendingExit?: { from: string; resolve: (exitCode: number) => void };
        pendingStart?: (started: any) => void;
        pendingActions?: Record<
          string,
          {
            resolve: (result: any) => void;
            reject: (result: any) => void;
          }
        >;
      }
    >
  >;
  ws: WeakMap<
    ServerWebSocket | uWebSocket,
    {
      name: _names;
      pid: string;
      child: ReturnType<typeof bunSpawn | typeof nodeSpawn>;
    }
  >;
};
