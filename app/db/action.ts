import { execQuery, gdb, inspectSchema } from "../../pkgs/royal";
import { DBArg } from "../../pkgs/service";

export const action = () => ({
  query: async (arg: DBArg) => {
    return await execQuery(arg, gdb, "prisma");
  },
  schema: async (table: string) => {
    return await inspectSchema(table, gdb, "prisma");
  },
});
