import commandExists from "command-exists";
import { existsSync } from "fs";
import { spawn } from "utility/spawn";
import { runnerGlb } from "./runner-glb";

export const runner = {
  get list() {
    return runnerGlb.runs;
  },
  async dispose() {
    const all = Object.values(runnerGlb.runs).map(async (pty) => {
      await pty.kill();
    });
    return await Promise.all(all);
  },
  async restart(path: keyof typeof runnerGlb.runs) {
    if (runnerGlb.runs[path]) {
      const data = runnerGlb.runs[path].data;
      await this.stop(path);
      await runner.run(data.arg);
    } else {
      return false;
    }
  },
  async stop(path: keyof typeof runnerGlb.runs) {
    return new Promise<boolean>((resolve) => {
      if (!runnerGlb.runs[path]) {
        resolve(true);
      } else {
        runnerGlb.runs[path].onExit(() => resolve(true));
        runnerGlb.runs[path].kill();
        delete runnerGlb.runs[path];
      }
    });
  },
  async run(arg: {
    path: string;
    args?: string[];
    onStop?: (e: {
      exitCode: number;
      signal: NodeJS.Signals | null;
    }) => unknown;
    onPrint?: (stdout: string) => any;
    cwd: string;
  }) {
    try {
      const { path, args, cwd, onStop } = arg;

      let isCommand = false;

      if (!existsSync(path)) {
        if (await commandExists(path)) {
          isCommand = true;
        }
      }

      runnerGlb.runs[path] = spawn(path, args || [], {
        cwd,
        ipc: isCommand ? false : true,
      });
      runnerGlb.runs[path].data = {
        arg,
      };

      runnerGlb.runs[path].onExit(async (e) => {
        if (onStop) await onStop(e);
        delete runnerGlb.runs[path];
      });

      return await new Promise<boolean>((resolve) => {
        if (!isCommand) {
          runnerGlb.runs[path].onMessage((e) => {
            resolve(true);
          });
        } else {
          resolve(true);
        }
      });
    } catch (e) {
      return false;
    }
  },
};

export type Running = ReturnType<typeof runner.run>;
