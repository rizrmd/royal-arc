import commandExists from "command-exists";
import { existsSync } from "fs";
import { spawn } from "utility/spawn";
import { bundler } from "./global";

export const runner = {
  get list() {
    return bundler.runs;
  },
  async dispose() {
    const all = Object.values(bundler.runs).map(async (pty) => {
      await pty.kill();
    });
    return await Promise.all(all);
  },
  async restart(path: keyof typeof bundler.runs) {
    if (bundler.runs[path]) {
      const data = bundler.runs[path].data;
      await this.stop(path);
      await runner.run(data.arg);
    } else {
      return false;
    }
  },
  async stop(path: keyof typeof bundler.runs) {
    return new Promise<boolean>((resolve) => {
      if (!bundler.runs[path]) {
        resolve(true);
      } else {
        bundler.runs[path].onExit(() => resolve(true));
        bundler.runs[path].kill();
        delete bundler.runs[path];
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
    silent?: boolean;
  }) {
    try {
      const { path, args, cwd, onStop } = arg;

      let isCommand = false;

      if (!existsSync(path)) {
        if (await commandExists(path)) {
          isCommand = true;
        }
      }

      bundler.runs[path] = await spawn(path, args || [], {
        cwd,
        ipc: isCommand ? false : true,
        silent: arg.silent,
      });
      bundler.runs[path].data = {
        arg,
      };

      bundler.runs[path].onExit(async (e) => {
        if (onStop) await onStop(e);
        delete bundler.runs[path];
      });

      return await new Promise<boolean>((resolve) => {
        if (!isCommand) {
          bundler.runs[path].onMessage((e) => {
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
