import { dirAsync, writeAsync } from "service";
import { basename, join } from "path";
import { scaffoldAPI } from "../srv/prebuild-api";

export const createNewSrv = async (path: string) => {
  const name = basename(path);
  await writeAsync(join(path, "package.json"), {
    name,
    version: "1.0.0",
    dependencies: {
      "gen": "workspace:^",
      royal: "workspace:^",
      service: "workspace:^",
    },
    "devDependencies": {
      "@types/node": "^18.11.9",
    },
  });
  await writeAsync(
    join(path, "index.ts"),
    `\
#!/usr/bin/env node
import { cleanupExpress, db, g, initExpress, SrvParams } from "royal";
import { current, declareService } from "service";
import { action } from "./action";
export default declareService<SrvParams>({
  name: "${name}",
  hook: {
    onStart: async ({ restarted, params }) => {
      g.isRestarted = restarted;
      await initExpress(params);
    },
    onStop: () => {
      cleanupExpress(current);
    },
  },
  action,
});
    `,
  );

  await writeAsync(
    join(path, "build.ts"),
    `\
import { declareBuild } from "service";
import { preBuildSrv } from "royal";

declareBuild({
  preBuild() {
    preBuildSrv();
  },
});
`,
  );
  await writeAsync(
    join(path, "action.ts"),
    `\
export const action = () => ({
})`,
  );
  await writeAsync(join(path, "tsconfig.json"), {
    compilerOptions: {
      module: "ESNext",
      moduleResolution: "node",
      target: "ESNext",
      esModuleInterop: true,
      types: ["node"],
    },
  });

  await dirAsync(join(path, "api"));
  await writeAsync(
    join(path, "api", "hello.ts"),
    `\
import { APIContext } from "royal";

export const _ = {
  url: "/hello/:name?",
  async api(name: string) {
    const server: APIContext = this as any;
    return { hello: name || "" };
  },
};
`,
  );

  await scaffoldAPI(name, join(path, "api"));
};
