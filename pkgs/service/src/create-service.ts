import { MODE, SERVICE_NAME } from "./types";

export const createService = async (
  serviceName: SERVICE_NAME,
  fn: (arg: { mode: MODE; markAsRunning: () => void }) => Promise<void>
) => {
  process.on("message", (e) => {
    if (e === "::KILL::") process.exit(0);
  });

  await fn({
    mode: "dev",
    markAsRunning() {
      if (process.send) process.send(`::RUNNING|${serviceName}::`);
    },
  });
};
