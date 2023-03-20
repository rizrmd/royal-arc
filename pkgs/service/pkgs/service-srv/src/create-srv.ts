import { connectRPC } from "rpc";
import { createService } from "service";
import { SERVICE_NAME } from "../../../src/types";
import { srv } from "./glbsrv";

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
  createService(name, async ({ enableStdout }) => {
    srv.name = name;
    srv.port = port;
    srv.cookieKey = cookieKey;
    if (serverURL) srv.serverURL = serverURL;

    await srv.init();
    enableStdout();
  });
};
