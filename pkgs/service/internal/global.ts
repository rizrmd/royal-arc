import { ServerWebSocket, spawn } from "bun";
import { build } from "esbuild";
import { _names } from "gen/service";
import action from "gen/action";
import { existsAsync, readAsync } from "../internal/service/build/jetpack";
import { join } from "path";

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
    build: Record<string, Awaited<ReturnType<typeof build>>>;
    watch: Record<string, ReturnType<typeof spawn>>;
  };
  svc: Record<
    _names,
    Record<
      string,
      {
        runtime: "node" | "bun" | "deno";
        params?: any;
        child?: ReturnType<typeof spawn>;
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
    ServerWebSocket,
    { name: _names; pid: string; child: ReturnType<typeof spawn> }
  >;
};
