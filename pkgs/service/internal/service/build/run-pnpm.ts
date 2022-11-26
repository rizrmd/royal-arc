import { spawn } from "child_process";
import { getRuntime } from "../../rpc/get-runtime";

export const runPnpm = (
  args: string[],
  cwd: string,
  opt = { silent: true, progress: true },
) => {
  return new Promise<number>(async (_resolve) => {
    const runtime = getRuntime();

    let ival = 0 as any;
    let i = 0;
    if (opt.progress) {
      ival = setInterval(() => {
        if (i >= 30) {
          i === 0;
          console.log("");
        }
        if (runtime === "node") {
          process.stdout.write("▒");
        } else if (runtime === "bun") {
          Bun.write(Bun.stdout, "▒");
        }
        i++;
      }, 1000);
    }

    if (opt.silent && args[0] === "i" && args.length === 1) {
      args.push("-s");
    }

    const resolve = (code: number) => {
      clearInterval(ival);
      _resolve(code);
    };

    if (runtime === "bun") {
      const s = Bun.spawn({
        cmd: [
          /^win/.test(process.platform) ? "pnpm.cmd" : "pnpm",
          ...args,
        ],
        cwd: cwd,
      });
      const code = await s.exited;
      resolve(code);
    } else if (runtime === "node") {
      const pnpm = spawn(
        /^win/.test(process.platform) ? "pnpm.cmd" : "pnpm",
        args,
        { cwd, stdio: "ignore" },
      );
      pnpm.once("exit", (code) => {
        resolve(code || 0);
      });
    }
  });
};
