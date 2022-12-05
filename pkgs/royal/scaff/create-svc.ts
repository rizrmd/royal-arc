import { basename, join } from "path";
import { writeAsync } from "service";
const excludes = ["boot", "royal", "service", "service"];

export const createNewSvc = async (path: string) => {
  const name = basename(path);
  await writeAsync(join(path, "package.json"), {
    name,
    version: "1.0.0",
    dependencies: {
      "royal": "../../pkgs/royal",
      "service": "../../pkgs/service",
    },
    "devDependencies": {
      "jiti": "^1.16.0",
      "@types/node": "^18.11.9",
    },
  });
  await writeAsync(
    join(path, "index.ts"),
    `\
#!/usr/bin/env node
import { declareService } from 'service'
import { action } from './action'

export default declareService({
  name: '${name}',
  hook: {
    onStop: async () => {},
    onStart: async ({ restarted, params, pid }) => {},
  },
  action,
})`,
  );
  await writeAsync(
    join(path, "action.ts"),
    `\
export const action = () => ({
  halo(m?: string) {
    return 'halo -> ' + m
  },
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
};
