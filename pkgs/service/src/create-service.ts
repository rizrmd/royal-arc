import { MODE, SERVICE_NAME } from "./types";

export const createService = async (
  serviceName: SERVICE_NAME,
  fn: (arg: { mode: MODE; enableStdout: () => void }) => Promise<void>
) => {
  await fn({
    mode: "dev",
    enableStdout() {
      console.log(`::RUNNING|${serviceName}::`);
    },
  });
};
