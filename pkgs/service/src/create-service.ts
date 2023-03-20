import { attachSpawnCleanup } from "utility/spawn";
import { MODE, SERVICE_NAME } from "./types";

export const createService = async (
  serviceName: SERVICE_NAME,
  fn: (arg: { mode: MODE; markAsRunning: () => void }) => Promise<void>
) => {
  attachSpawnCleanup();
  await fn({
    mode: "dev",
    markAsRunning() {
      try {
        if (process.send) process.send(`::RUNNING|${serviceName}::`);
      } catch (e) {}
    },
  });
};
