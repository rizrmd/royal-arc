import { dir } from "dir";
import { existsAsync, writeAsync } from "fs-jetpack";
import { readdir, stat } from "fs/promises";

export const serviceGen = async () => {
  const names: string[] = [];

  for (const f of await readdir(dir.root("app"))) {
    const s = await stat(dir.root(`app/${f}`));
    if (s.isDirectory() && (await existsAsync(dir.root(`app/${f}/main.ts`)))) {
      names.push(f);
    }

    await writeAsync(
      dir.root(`app/gen/service/name.ts`),
      `export type SERVICE_NAME = "${names.join(`" | "`)}";`
    );
  }
};
