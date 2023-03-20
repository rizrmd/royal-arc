import { spawn as nativeSpawn, fork } from "child_process";
import { Transform } from "stream";

export type IPty = ReturnType<typeof spawn>;

export const spawn = (
  file: string,
  args: string[],
  opt?: { cwd?: string; ipc?: boolean }
) => {
  let proc = opt?.ipc
    ? fork(file, args, {
        cwd: opt?.cwd,
        stdio: "pipe",
      })
    : nativeSpawn(file, args, {
        cwd: opt?.cwd,
        stdio: "pipe",
      });

  const callback = {
    onMessage: (e: any) => {},
    onPrint: (e: string) => {},
    onExit: (e: { exitCode: number; signal: NodeJS.Signals | null }) => {},
  };

  const tfm = new Transform({
    transform: (chunk, encoding, done) => {
      const str = chunk.toString();
      callback.onPrint(str);
    },
  });
  proc.stdout?.pipe(tfm);
  proc.stderr?.pipe(tfm);

  if (opt?.ipc) {
    proc.on("message", (e) => {
      callback.onMessage(e);
    });
  }

  proc.on("exit", (code, signal) => {
    callback.onExit({
      exitCode: code || 0,
      signal: signal,
    });
  });

  return {
    onMessage: (fn: (e: string) => any) => {
      callback.onMessage = fn;
    },
    onPrint: (fn: (e: string) => any) => {
      callback.onPrint = fn;
    },
    onExit: (
      fn: (e: { exitCode: number; signal: NodeJS.Signals | null }) => any
    ) => {
      callback.onExit = fn;
      return {
        dispose: () => {},
      } as IDisposable;
    },
    kill: () => {},
  };
};

export interface IDisposable {
  dispose(): void;
}
