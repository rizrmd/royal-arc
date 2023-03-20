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
      });

  const callback = {
    onMessage: (e: any) => {},
    onExit: (e: { exitCode: number; signal: NodeJS.Signals | null }) => {},
    killResolve: (value: void | PromiseLike<void>) => {},
  };

  if (opt?.ipc) {
    proc.on("message", async (e) => {
      callback.onMessage(e);
    });
  }

  proc.on("exit", (code, signal) => {
    callback.killResolve();
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
    onExit: (
      fn: (e: { exitCode: number; signal: NodeJS.Signals | null }) => any
    ) => {
      callback.onExit = fn;
    },
    kill: () => {
      return new Promise<void>(async (resolve) => {
        callback.killResolve = resolve;
        proc.kill();
      });
    },
  };
};

export interface IDisposable {
  dispose(): void;
}
