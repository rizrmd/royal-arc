import { unzipSync } from "fflate";
import { appendFile } from "fs/promises";
import { dirname, join, sep } from "path";
import picocolors from "picocolors";
import { dirAsync, existsAsync, moveAsync, removeAsync, root } from "service";
import { runPnpm } from "service/internal/service/build/run-pnpm";

export const deployUploaded = async (buf: Buffer) => {
  const fileuint8 = new Uint8Array(buf);

  const tempdir = join(process.cwd(), "..", "content", "_deploy");

  await removeAsync(tempdir);
  await dirAsync(tempdir);

  console.log(`\n\n── ${picocolors.magenta("Deploying files")}`);

  const decompressed = unzipSync(fileuint8);
  const entries = Object.entries(decompressed);
  for (const [path, data] of entries) {
    const relpath = path;
    const file = join(tempdir, relpath);
    if (data.length > 0) {
      clearLine();
      await dirAsync(dirname(file));

      process.stdout.write(` ›  ${relpath} `);
      await appendFile(file, Buffer.from(data));
    }
  }
  clearLine();
  console.log(` › ${entries.length} files extracted. Installing deps:`);

  await runPnpm(["i"], tempdir);


  await root.boot.deployDir(tempdir);
};

const clearLine = () => {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
};
