import { runner } from "bundler/runner";
import { MODE, SERVICE_NAME } from "./types";

export const createService = async (
  serviceName: SERVICE_NAME,
  fn: (arg: { mode: MODE; markAsRunning: () => void }) => Promise<void>
) => {
  await fn({
    mode: "dev",
    markAsRunning() {
      if (process.send) process.send(`::RUNNING|${serviceName}::`);
    },
  });
};
