import { unzipSync } from "fflate";
import { appendFile } from "fs/promises";
import fetch from "node-fetch";
import { dirname, join, sep } from "path";
import { dirAsync, moveAsync, removeAsync } from "../export";
import { runPnpm } from "../internal/service/build/run-pnpm";

export const baseUpgrade = async () => {
  console.log(`Downloading royal-arc upgrade...`);
  const res = await fetch(
    `https://github.com/rizrmd/royal-arc/archive/refs/heads/main.zip`,
  );

  const length = {
    total: Number(res.headers.get("content-length")),
    current: 0,
  };
  res.body?.on("data", (chunk) => {
    length.current += chunk.length;
    const percent = Math.round(length.current / length.total * 100);
    if (length.current > 0) clearLine();
    if (length.total > 0) {
      process.stdout.write(
        ` › ${percent}% (${byt(length.current)} / ${byt(length.total)}) `,
      );
    } else {
      process.stdout.write(
        ` › ${byt(length.current)} `,
      );
    }
  });

  const filebuf = await (await res.blob()).arrayBuffer();

  const tempdir = join(process.cwd(), ".output", "content", "temp-upgrade");
  console.log(`\nExtracting To: ${tempdir}`);
  const fileuint8 = new Uint8Array(filebuf);
  await removeAsync(tempdir);
  await dirAsync(tempdir);

  const decompressed = unzipSync(fileuint8);
  const entries = Object.entries(decompressed);
  for (const [path, data] of entries) {
    const relpath = path.split(sep).slice(1).join(sep);
    const file = join(tempdir, relpath);
    await dirAsync(dirname(file));

    if (data.length > 0) {
      clearLine();

      process.stdout.write(` ›  ${relpath} `);
      await appendFile(file, Buffer.from(data));
    }
  }
  clearLine();
  console.log(` › ${entries.length} files extracted`);

  console.log(`Updating pkgs`);
  await removeAsync(join(process.cwd(), "pkgs"));
  await moveAsync(join(tempdir, "pkgs"), join(process.cwd(), "pkgs"));
  await runPnpm(["i"], process.cwd(), { silent: false });
};
const clearLine = () => {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
};

function byt(bytes: number, decimals = 2) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
