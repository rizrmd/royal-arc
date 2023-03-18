import { MODE, SERVICE_NAME } from "./types";

export const createService = async (
  serviceName: SERVICE_NAME,
  fn: (arg: { mode: MODE; ready: () => void }) => Promise<void>
) => {
  await fn({
    mode: "dev",
    ready() {
      console.log(`::RUNNING|${serviceName}::`);
    },
  });
};
