import { DBArg, waitUntil } from "service";

export const execQuery = async (args: DBArg, obj: any, key: string) => {
  const { table, action, params } = args;

  if (!obj[key]) {
    console.log("Waiting db to connect...");
    await waitUntil(() => obj[key]);
  }

  const tableInstance = (obj[key] as any)[table];
  if (tableInstance) {
    if (action === "query" && table.startsWith("$query")) {
      try {
        const q = params.shift();
        q.sql = true;
        Object.freeze(q);
        return await tableInstance.bind(obj[key])(q, ...params);
      } catch (e) {
        console.log(e);
        return e;
      }
    }

    const method = tableInstance[action];
    if (method) {
      try {
        const result = await method(...params);
        if (typeof result === 'number' && result === 0) {
          return JSON.stringify(result)
        }

        return result;
      } catch (e) {
        console.log(e);
        return e;
      }
    }
  }
};
