import chalk from "chalk";
import padEnd from "lodash.padend";
import { createService } from "service";
import { SERVICE_NAME } from "../../../src/types";
import { srv } from "./glbsrv";
import { server } from "./server";

export const createAPIServer = ({
  name,
  port,
  serverURL,
  cookieKey,
}: {
  name: SERVICE_NAME;
  port: number;
  serverURL?: string;
  cookieKey: string;
}) => {
  createService(name, async ({ markAsRunning, mode }) => {
    srv.name = name;
    srv.port = port;
    srv.cookieKey = cookieKey;
    if (serverURL) srv.serverURL = serverURL;

    await srv.init();

    const running = await server({
      mode,
      port: srv.port,
      name: srv.name,
      cookieKey: srv.cookieKey,
    });

    if (typeof running === "string") {
      console.log(
        `${chalk.red("Skipped")} ${chalk.green(
          `${padEnd(srv.name, 12, " ")}`
        )} ${running}`
      );
    } else {
      console.log(
        `${chalk.magenta("Started")} ${chalk.green(
          `${padEnd(srv.name, 12, " ")}`
        )} http://localhost:${srv.port}`
      );
    }
    markAsRunning();
  });
};
