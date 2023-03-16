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
    g.runs[path].kill();
    g.runs[path].onExit(() => {
      runner.run(g.runs[path].arg);
    });
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

      if (onData) g.runs[path].onData(onData);
      else g.runs[path].onData((e) => process.stdout.write(e));

      if (onStop) g.runs[path].onExit(onStop);

      return true;
    } catch (e) {
      return false;
    }
  },
};

export type Running = ReturnType<typeof runner.run>;
