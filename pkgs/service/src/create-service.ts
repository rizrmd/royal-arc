import { connectRPC } from "rpc";
import { RPCActionResult } from "rpc/src/types";
import { attachSpawnCleanup } from "utility/spawn";
import { rootAction } from "./action";
import { MODE, SERVICE_NAME } from "./types";

export const createService = async (
  serviceName: SERVICE_NAME,
  fn: (arg: {
    mode: MODE;
    markAsRunning: () => void;
    root: RPCActionResult<typeof rootAction>;
  }) => Promise<void>
) => {
  attachSpawnCleanup(`svc.${serviceName}`);
  const root = await connectRPC<typeof rootAction>("root");

  await fn({
    mode: "dev",
    root,
    markAsRunning() {
      try {
        if (process.send)
          process.send(
            `::RUNNING|${serviceName}::`,
            undefined,
            undefined,
            (e) => {}
          );
      } catch (e) {}
    },
  });
};
