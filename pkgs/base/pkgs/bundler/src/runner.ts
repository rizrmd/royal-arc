import { dir } from "dir";
import { existsSync } from "fs";
import { IPty, spawn } from "node-pty";

const g = globalThis as unknown as {
  runs: Record<string, IPty & { arg: any }>;
};

if (!g.runs) g.runs = {};

export const runner = {
  get list() {
    return g.runs;
  },
  async restart(path: keyof typeof g.runs) {
    if (g.runs[path]) {
      g.runs[path].kill();
      g.runs[path].onExit(() => {
        runner.run(g.runs[path].arg);
      });
      return true;
    } else {
      return false;
    }
  },
  async stop(path: keyof typeof g.runs) {
    g.runs[path].kill();
    delete g.runs[path];
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

      g.runs[path] = spawn(
        process.execPath,
        ["--enable-source-maps", path, ...(args || [])],
        { cwd: cwd }
      ) as any;

      g.runs[path].arg = arg;

      if (onStop) g.runs[path].onExit(onStop);

      return new Promise<boolean>((resolve) => {
        g.runs[path].onData((e) => {
          if (arg.runningMarker) {
            if (arg.runningMarker(e)) {
              resolve(true);
            } else {
              return;
            }
          }

          if (arg.onData) arg.onData(e);
          else process.stdout.write(e);
        });
        if (!arg.runningMarker) resolve(true);
      });
    } catch (e) {
      return false;
    }
  },
};

export type Running = ReturnType<typeof runner.run>;
