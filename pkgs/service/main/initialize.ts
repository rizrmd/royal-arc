import padEnd from "lodash.padend";
import { join } from "path";
import picocolors from "picocolors";
import { removeAsync } from "../export";
import { g, initGlobal } from "../internal/global";
import { initClientRPC } from "../internal/rpc/client";
import { getPort } from "../internal/rpc/get-port";
import { initServerRPC } from "../internal/rpc/server";
import { buildAll } from "../internal/service/build/build-all";
import { generateMeta } from "../internal/service/gen-meta";
import { serverCleanUp } from "../internal/service/server/cleanup";
import { vscodeSettings } from "../internal/vscode";
import { root } from "./root";

export const initialize = async (fn: () => Promise<void>) => {
  const svcPort = getPort();
  const executedFromNodeBase = process.argv.includes("base");

  if (executedFromNodeBase) {
    await removeAsync(join(process.cwd(), "conf.json"));
  }

  await initGlobal({ svcPort });

  if (executedFromNodeBase) {
    if (await generateMeta(join(process.cwd(), "..", ".."))) {
      process.exit(111);
    }
    await serverCleanUp();
  }

  console.log(
    `\n\n── ${
      padEnd(
        picocolors.magenta(g.mode.toUpperCase()) + " ",
        30,
        "─",
      )
    } `,
  );

  if (executedFromNodeBase) {
    await vscodeSettings();
    await buildAll();
  }

  Bun.write(Bun.stdout, `Starting: ${picocolors.cyan("WebSocket RPC")} `);
  await initServerRPC(svcPort);
  await initClientRPC({ wsPort: svcPort, clientID: "root" });
  Bun.write(Bun.stdout, `[${(`ws://127.0.0.1:${svcPort}`)}]\n`);

  await fn();
};
