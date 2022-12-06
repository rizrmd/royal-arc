import { DBArg } from "service";
import { ex, SrvHttpRequest, SrvHttpResponse } from "./global-ex";

export const runDB = async (
  dbName: string,
  req: SrvHttpRequest,
  res: SrvHttpResponse,
) => {
  try {
    //@ts-ignore
    const { prisma } = await import("../../../gen/prisma");
    //@ts-ignore
    const s = root.action(dbName as "db");
    if (s) {
      const runDB = async (arg: DBArg) => {
        //@ts-ignore
        return await s.query(arg);
      };
      try {
        const result = await runDB(req.body);
        res.send(result);
      } catch (e) {
        res.sendStatus(500);
        console.error(e);

        if (!res.headersSent) {
          res.send(e);
        }
      }
      return;
    }
    res.send({ error: `${dbName} not found.` });
  } catch (e) {
    if (e.message.includes("Cannot find module")) {
    } else {
      console.log(`Failed to run DB:\n ➥ ${e.message}`);
    }
  }
};
