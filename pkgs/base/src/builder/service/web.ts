import { dir } from "dir";
import { writeAsync } from "fs-jetpack";
import { generateLayout, generateLayoutEntry } from "../../scaffold/web/layout";
import { generatePage, generatePageEntry } from "../../scaffold/web/page";
import { generateSSR, generateSSREntry } from "../../scaffold/web/ssr";
import { scaffoldWeb } from "../../scaffold/web/web";

export const prepareWeb = async (name: string, changes?: Set<string>) => {
  if (!changes || changes.has(dir.root(`app/${name}/main.ts`))) {
    await scaffoldWeb();
    await generatePageEntry([name]);
    await generatePage(name, dir.root(`app/${name}/src/base/page`));
    await generateLayoutEntry([name]);
    await generateLayout(name, dir.root(`app/${name}/src/base/layout`));
    await generateSSREntry([name]);
    await generateSSR(name, dir.root(`app/${name}/src/base/ssr`));

    return { shouldRestart: false };
  }
};
