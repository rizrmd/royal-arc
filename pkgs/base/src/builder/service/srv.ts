import { dir } from "dir";
import { existsAsync, writeAsync } from "fs-jetpack";
import { stat } from "fs/promises";
import { basename, extname } from "path";
import { generateAPI, generateAPIEntry } from "../../scaffold/srv/api";

export const prepareSrv = async (name: string, changes?: Set<string>) => {
  if (!changes || changes.has(dir.root(`app/${name}/main.ts`))) {
    await generateAPIEntry([name]);
    await generateAPI(name, dir.root(`app/${name}/api`));

    return { shouldRestart: false };
  }

  const promises: Promise<any>[] = [];
  changes?.forEach(async (e) => {
    if (e.startsWith(dir.root(`app/${name}/api`))) {
      try {
        const s = await stat(e);
        if (s.size === 0) {
          const routeName = basename(
            e.substring(0, e.length - extname(e).length)
          );
          promises.push(
            writeAsync(
              e,
              `\
import { apiContext } from "service-srv";
export const _ = {
  url: "/${routeName}",
  async api() {
    const { req, res } = apiContext(this);
    return "hello world";
  },
};
            `
            )
          );
        } else {
          promises.push(generateAPI(name, dir.root(`app/${name}/api`)));
        }
      } catch (e) {}
    }
  });
  try {
    await Promise.all(promises);
  } catch (e) {
    console.error(e);
  } 

  return { shouldRestart: true };
};
