import { DBArg } from "../../pkgs/service";
import { gdb } from "../../pkgs/royal";

export const action = () => ({
  query: async (args: DBArg) => {
    const { table, action, params } = args;

    const tableInstance = (gdb.prisma as any)[table];
    if (tableInstance) {
      if (action === "query" && table.startsWith("$query")) {
        try {
          const q = params.shift();
          q.sql = true;
          Object.freeze(q);
          return await tableInstance.bind(gdb.prisma)(q, ...params);
        } catch (e) {
          console.log(e);
          return e;
        }
      }

      const method = tableInstance[action];
      if (method) {
        try {
          const result = await method(...params);
          return result;
        } catch (e) {
          console.log(e);
          return e;
        }
      }
    }
  },
});  
