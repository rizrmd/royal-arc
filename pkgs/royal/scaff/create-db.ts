import { basename, join } from "path";
import { copyAsync, existsAsync, listAsync } from "service";
import { scaff } from "./util/scaff";

export const defaultPrismaSrc = `\
generator client {
  provider = "prisma-client-js"
  output   = "../node_modules/.gen"
}

datasource db {
  provider = "sqlite"
  url      = "file:../db.sqlite"
}

model user {
  id              Int      @id @default(autoincrement())
  username        String
  password        String
}
`;

const root = join(process.cwd(), "..", "..");
export const reloadDb = async (target: string) => {
  const list = await listAsync(join(root, "app"));
  if (list) {
    for (const dbName of list) {
      if (dbName.startsWith("db")) {
        if (await existsAsync(join(root, "app", dbName, "prisma"))) {
          await copyAsync(
            join(root, "app", dbName, "prisma"),
            join(target, "service", dbName, "prisma"),
            {
              overwrite: true,
            },
          );
        }

        if (await existsAsync(join(root, "app", dbName, ".env"))) {
          await copyAsync(
            join(root, "app", dbName, ".env"),
            join(target, "service", dbName, ".env"),
            {
              overwrite: true,
            },
          );
        }
      }
    }
  }
};

export const createNewDB = async (path: string) => {
  const name = basename(path);

  await scaff({
    "package.json": {
      "name": name,
      "version": "1.0.0",
      "dependencies": {
        "gen": "../../gen",
        "prisma": "^4.6.1",
        "royal": "../../pkgs/royal",
        "service": "../../pkgs/service",
      },
      "devDependencies": {
        "jiti": "^1.16.0",
        "@types/node": "^18.11.9",
      },
    },
    "tsconfig.json": {
      compilerOptions: {
        module: "ESNext",
        moduleResolution: "node",
        target: "ESNext",
        esModuleInterop: true,
        types: ["node"],
      },
    },
    "prisma/schema.prisma": defaultPrismaSrc,
    "index.ts": `\
#!/usr/bin/env node
import { gdb, prepareDb } from "../../pkgs/royal";
import { declareService } from "../../pkgs/service";
import { action } from "./action";

export default declareService({
  name: "${name}",
  hook: {
    onStart: async () => {
      await prepareDb("${name}");

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
 
`,
    "build.ts": `\
import { declareBuild } from "../../pkgs/service";
import { preBuildDb } from "../../pkgs/royal";

declareBuild({
  preBuild() {
    preBuildDb();
  },
});
`,
    "action.ts": `\
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
`,
  }, path);
};
