import { connectRPC } from "rpc";
import { RPCActionResult } from "rpc/src/types";
import { attachSpawnCleanup } from "utility/spawn";
import { rootAction } from "./action";
import { MODE, SERVICE_NAME } from "./types";

export const createService = async <T>(arg: {
  name: SERVICE_NAME;
  mode: "single" | "multi";
  init: (arg: { mode: MODE; markAsRunning: () => void }) => Promise<T>;
}): Promise<T> => {
  attachSpawnCleanup(arg.name);
  const root = await connectRPC<typeof rootAction>("root");

  return await arg.init({
    mode: "dev",
    markAsRunning() {
      try {
        if (process.send)
          process.send(
            `::RUNNING|${arg.name}::`,
            undefined,
            undefined,
            (e) => {}
          );
      } catch (e) {}
    },
  });
};
