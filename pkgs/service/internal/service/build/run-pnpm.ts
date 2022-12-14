import { spawn } from "child_process";
import { Transform } from "stream";
import { getRuntime } from "../../rpc/get-runtime";

export const runPnpm = (
  args: string[],
  cwd: string,
  opt = { silent: true },
) => {
  return new Promise<string>(async (_resolve) => {
    const runtime = getRuntime();

    let ival = 0 as any;
    let i = 0;
    let m = 0;
    let justPrint = false;
    if (opt.silent) {
      ival = setInterval(() => {
        if (i >= 30) {
          if (m >= 3) {
            justPrint = true;
            clearInterval(ival);
            return;
          }
          i = 0;
          m++;
          console.log("");
        }
        if (runtime === "node") {
          process.stdout.write("▒");
        } else if (runtime === "bun") {
          Bun.write(Bun.stdout, "▒");
        }
        i++;
      }, 1000);
    } else {
      justPrint = true;
    }

    if (opt.silent && args[0] === "i" && args.length === 1) {
      args.push("-s");
    }

    const resolve = (code: string) => {
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
      resolve("");
    } else if (runtime === "node") {
      const pnpm = spawn(
        /^win/.test(process.platform) ? "pnpm.cmd" : "pnpm",
        args,
        { cwd, stdio: "pipe" },
      );

      let output = "";
      const tfm = new Transform({
        transform: (chunk, encoding, done) => {
          const str = chunk.toString();
          output += str;

          if (justPrint) {
            process.stdout.write(str);
          }
        },
      });
      pnpm.stdout.pipe(tfm);
      pnpm.stderr.pipe(tfm);

      pnpm.once("exit", (code) => {
        resolve(output);
      });
    }
  });
};
