import { Subprocess } from "bun";
import { ChildProcess } from "child_process";

export const waitExit = async (child: Subprocess | ChildProcess) => {
  if (!child) return;

  const bunChild = child as Subprocess;
  if (typeof bunChild.exited !== "undefined") {
    await bunChild.exited;
  } else {
    const nodeChild = child as ChildProcess;
    await new Promise<void>((resolve) => {
      nodeChild.on("exit", function () {
        resolve();
      });
    });
  }
};
