import { _runtime } from "gen";
import { cg, initClientRPC } from "../internal/rpc/client";
import { DeclareServiceArg } from "./types";
import { fileURLToPath } from "url";
import { dirname } from "path";

(BigInt as any).prototype["toJSON"] = function () {
  return this.toString();
};

export const declareBuild = (
  args: { preBuild?: (p: { restarted: boolean; argv: string[] }) => void },
) => {
  const command = process.argv[2];
  if ((args as any)[command]) {
    try {
      (args as any)[command]({ restarted: false, argv: process.argv.slice(3) });
    } catch (_) {}
  }
};

export const declareService = async <P extends Record<string, any>>(
  arg: DeclareServiceArg<P>,
) => {
  if (_runtime[arg.name] === "node") {
    cg._timeoutHolder = setTimeout(() => {}, 9999999);

    const args = process.argv.slice(2);
    const pid = args[args.length - 1];

    cg._wsPort = parseInt(args[args.length - 2]);
    cg._crashed = args[args.length - 3] === "crashed";

    await initClientRPC({
      wsPort: cg._wsPort,
      clientID: `${arg.name}~${pid}`,
    }, arg);
  }
};
export const current = {
  get pid() {
    return cg._pid;
  },
  get serviceName() {
    return cg._serviceName;
  },
};
