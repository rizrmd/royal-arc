import { DBArg, root } from "service";

export const runDB = async (
  dbName: string,
  body: any,
) => {
  try {
    //@ts-ignore
    const s = root.action(dbName as "db");
    if (s) {
      const runDB = async (arg: DBArg) => {
        //@ts-ignore
        return await s.query(arg);
      };
      const result = await runDB(body);
      return result;
    }
  } catch (e) {
    if (e && e.message && e.message.includes("Cannot find module")) {
    } else {
      console.log(`Failed to run DB:\n ➥ ${e}`);
    }
  }
};
