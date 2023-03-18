import { dir } from "dir";
import { existsSync } from "fs";
import { IDisposable, IPty, spawn } from "node-pty";

const g = globalThis as unknown as {
  runs: Record<
    string,
    IPty & {
      arg: any;
      markedRunning: boolean;
      stopped: boolean;
      clearOnExit: IDisposable;
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
          g.runs[path].clearOnExit.dispose();
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
    onData?: (e: string) => unknown;
    onStop?: (e: { exitCode: number; signal?: number | undefined }) => unknown;
    runningMarker?: (stdout: string) => boolean;
    cwd: string;
  }) {
    try {
      const { path, onData, args, cwd, onStop } = arg;

      if (!existsSync(path)) return false;

      if (g.runs[path] && !g.runs[path].stopped) return false;

      g.runs[path] = spawn(
        process.execPath,
        ["--enable-source-maps", path, ...(args || [])],
        { cwd: cwd }
      ) as any;

      g.runs[path].arg = arg;

      g.runs[path].clearOnExit = g.runs[path].onExit(async () => {
        g.runs[path].stopped = true;
        if (onStop) g.runs[path].onExit(onStop);
      });

      return new Promise<boolean>((resolve) => {
        g.runs[path].onData((e) => {
          if (arg.runningMarker && !g.runs[path].markedRunning) {
            if (arg.runningMarker(e)) {
              g.runs[path].markedRunning = true;
              resolve(true);
            }
            return;
          }

          if (arg.onData) arg.onData(e);
          else process.stdout.write(e);
        });
        if (!arg.runningMarker) {
          g.runs[path].markedRunning = true;
          resolve(true);
        }
      });
    } catch (e) {
      return false;
    }
  },
};

export type Running = ReturnType<typeof runner.run>;
