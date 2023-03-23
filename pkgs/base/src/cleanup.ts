import { bundler } from "bundler/global";
import { baseGlobal } from "./action";

export const attachCleanUp = () => {
  let exiting = false;
  function exitHandler() {
    if (!exiting) {
      exiting = true;
      if (bundler.bundlers) {
        bundler.bundlers.forEach((ctx) => {
          ctx.dispose();
        });
      }

      baseGlobal.parcels.forEach((e) => e.kill(9));

      if (bundler.runs) {
        for (const runs of Object.values(bundler.runs)) {
          runs.forEach(async (run) => {
            await run.kill();
          });
        }
      }
      process.exit(0);
    }
  }

  //do something when app is closing
  process.on("exit", exitHandler.bind(null, { cleanup: true }));

  //catches ctrl+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));

  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));

  //catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
};
