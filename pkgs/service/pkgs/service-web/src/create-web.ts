import { createService } from "service";
import { SERVICE_NAME } from "../../../src/types";
import { web } from "./glbweb";
import { server } from "./server";

export const createWeb = async ({
  name,
  port,
  entry,
}: {
  name: SERVICE_NAME;
  port: number;
  entry: string;
}) => {
  createService(name, async ({ markAsRunning, mode }) => {
    web.name = name;
    await web.init();

    web.server = await server({
      mode,
      port: port,
      name: name,
    });

    markAsRunning();
  });
};
