import commandExists from "command-exists";
import { existsSync } from "fs";
import { IPty, IDisposable, spawn } from "utility/spawn";
const g = globalThis as unknown as {
  runs: Record<
    string,
    IPty & {
      arg: any;
      markedRunning: boolean;
      stopped: boolean;
    }
  >;
};

if (!g.runs) g.runs = {};

export const runner = {
  get list() {
    return g.runs;
  },
  async restart(path: keyof typeof g.runs) {
    if (g.runs[path]) {
      if (!g.runs[path].stopped) {
        return new Promise<boolean>((resolve) => {
          g.runs[path].onExit(async () => {
            g.runs[path].stopped = true;
            resolve(await runner.run(g.runs[path].arg));
          });
          g.runs[path].kill();
        });
      } else {
        return await runner.run(g.runs[path].arg);
      }
    } else {
      return false;
    }
  },
  async stop(path: keyof typeof g.runs) {
    return new Promise<boolean>((resolve) => {
      g.runs[path].onExit(() => resolve(true));
      g.runs[path].kill();
      delete g.runs[path];
    });
  },
  async run(arg: {
    path: string;
    args?: string[];
    onMessage?: (e: any) => unknown;
    onStop?: (e: {
      exitCode: number;
      signal: NodeJS.Signals | null;
    }) => unknown;
    onPrint?: (stdout: string) => any;
    cwd: string;
  }) {
    try {
      const { path, onMessage: onData, args, cwd, onStop } = arg;

      let isCommand = false;

      if (!existsSync(path)) {
        if (await commandExists(path)) {
          isCommand = true;
        } else {
          return false;
        }
      }

      if (g.runs[path] && !g.runs[path].stopped) return false;

      if (isCommand) {
        g.runs[path] = spawn(path, args || [], { cwd, ipc: false }) as any;
      } else {
        g.runs[path] = spawn(path, args || [], { cwd, ipc: true }) as any;
        if (arg.onMessage) g.runs[path].onMessage(arg.onMessage);
      }

      g.runs[path].arg = arg;

      g.runs[path].onExit(async () => {
        g.runs[path].stopped = true;
        if (onStop) g.runs[path].onExit(onStop);
      });

      return true;
    } catch (e) {
      return false;
    }
  },
};

export type Running = ReturnType<typeof runner.run>;
