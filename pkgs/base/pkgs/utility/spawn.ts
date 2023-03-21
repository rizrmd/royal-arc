import { runnerGlb } from "bundler/runner-glb";
import { fork, spawn as nativeSpawn } from "child_process";

export type IPty = ReturnType<typeof spawn>;

export const spawn = (
  file: string,
  args: string[],
  opt?: { cwd?: string; ipc?: boolean }
) => {
  let proc = opt?.ipc
    ? fork(file, args, {
        cwd: opt?.cwd,
        stdio: "inherit",
      })
    : nativeSpawn(file, args, {
        cwd: opt?.cwd,
        stdio: "pipe",
        shell: true,
      });

  const callback = {
    onMessage: (e: any) => {},
    onExit: (e: { exitCode: number; signal: NodeJS.Signals | null }) => {},
  };

  if (opt?.ipc) {
    proc.on("message", async (e) => {
      callback.onMessage(e);
    });
  }

  proc.on("exit", async (code, signal) => {
    callback.onExit({
      exitCode: code || 0,
      signal: signal,
    });
  });

  return {
    data: {} as any,
    markedRunning: false,
    onMessage: (fn: (e: string) => any) => {
      callback.onMessage = fn;
    },
    proc,
    onExit: (
      fn: (e: { exitCode: number; signal: NodeJS.Signals | null }) => any
    ) => {
      callback.onExit = fn;
    },
    killing: null as null | Promise<void>,
    async kill() {
      await new Promise<void>((resolve) => {
        if (opt?.ipc) {
          proc.on("message", (e) => {
            if (e === "::SPAWN_DISPOSED::") {
              resolve();
            }
          });
          proc.send("::SPAWN_DISPOSE::");
        } else {
          resolve();
        }
      });
    },
  };
};

export const attachSpawnCleanup = () => {
  process.on("message", async (e) => {
    if (e === "::SPAWN_DISPOSE::") {
      await Promise.all(
        Object.values(runnerGlb.runs).map(async (run) => {
          await new Promise<void>((resolve) => {
            run.proc.on("message", (e) => {
              if (e === "::SPAWN_DISPOSED::") {
                resolve();
              }
            });
            if (run.proc.send) run.proc.send("::SPAWN_DISPOSE::");
          });
        })
      );

      try {
        if (process.send) process.send(`::SPAWN_DISPOSED::`);
      } catch (e) {}
      process.exit(0);
    }
  });
};

export interface IDisposable {
  dispose(): void;
}
