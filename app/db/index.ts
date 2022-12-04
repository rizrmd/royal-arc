#!/usr/bin/env node
import { gdb, prepareDb } from "../../pkgs/royal";
import { declareService } from "../../pkgs/service";
import { action } from "./action";

export default declareService({
  name: "db",
  hook: {
    onStart: async () => {
      await prepareDb("db");

      const { PrismaClient } = await import("./node_modules/.gen/index");
      gdb.prisma = new PrismaClient();
      await gdb.prisma.$connect();
    },
    onStop: async () => {
      if (gdb.prisma && gdb.prisma.$disconnect) {
        await gdb.prisma.$disconnect();
      }
    },
  },
  action,
});
 
