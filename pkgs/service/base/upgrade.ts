import { unzipSync } from "fflate";
import { appendFile, stat } from "fs/promises";
import fetch from "node-fetch";
import { dirname, join, sep } from "path";
import {
  copyAsync,
  dirAsync,
  existsAsync,
  listAsync,
  moveAsync,
  readAsync,
  removeAsync,
  UpgradeRuleArg,
  writeAsync,
} from "../export";
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
  console.log(
    `\nExtracting To: ${tempdir.substring(process.cwd().length + 1)}`,
  );
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

  console.log(`Replacing pkgs`);
  await removeAsync(join(process.cwd(), "pkgs"));
  await moveAsync(join(tempdir, "pkgs"), join(process.cwd(), "pkgs"));
  process.stdout.write(` › ▒`);
  await runPnpm(["i"], process.cwd());

  const root = process.cwd();
  const dirs = await listAsync(join(root, "app"));
  if (dirs) {
    for (const f of dirs) {
      if (((await stat(join(root, "app", f))).isDirectory())) {
        if (!await existsAsync(join(tempdir, "app", f))) continue;

        if (await existsAsync(join(root, "app", f, "upgrade.ts"))) {
          console.log(`\nUpgrading ${f}`);
          process.stdout.write(` › ▒`);
          if (
            !await existsAsync(join(root, "app", f, "node_modules", "jiti"))
          ) {
            await runPnpm(["i"], process.cwd());
          }

          const json = await runPnpm(
            ["jiti", "upgrade.ts"],
            join(root, "app", f),
          );

          const out = JSON.parse(json) as Record<
            string,
            { ___rule___: UpgradeRuleArg }
          >;

          const paths = Object.keys(out).map((e) =>
            join(root, "app", f, e.replace(/\//ig, sep))
          );

          for (const [_path, v] of Object.entries(out)) {
            let path = _path.replace(/\//ig, sep);
            if (_path === "*") {
              path = "";
            }
            const rule = v["___rule___"];
            if (rule) {
              if (rule.allFilesExcept) {
                for (const fileName of rule.allFilesExcept) {
                  const filePath = join(f, path, fileName);

                  if (paths.includes(filePath)) continue;

                  if (await existsAsync(join(tempdir, "app", filePath))) {
                    if ((await stat(join(tempdir, "app", filePath))).isFile()) {
                      await moveAsync(
                        join(tempdir, "app", filePath),
                        join(root, "app", filePath),
                        { overwrite: true },
                      );
                    }
                  }
                }
              } else if (rule.isPackageJson) {
                let installDep = false;

                const oldPkg = await readAsync(
                  join(root, "app", f, "package.json"),
                  "json",
                );

                const newPkg = await readAsync(
                  join(tempdir, "app", f, "package.json"),
                  "json",
                );

                for (let [k, v] of Object.entries(newPkg.dependencies)) {
                  if (oldPkg.dependencies[k] !== v) {
                    oldPkg.dependencies[k] = v;
                    installDep = true;
                  }
                }

                for (let [k, v] of Object.entries(newPkg.devDependencies)) {
                  if (oldPkg.devDependencies[k] !== v) {
                    oldPkg.devDependencies[k] = v;
                    installDep = true;
                  }
                }

                if (installDep) {
                  await writeAsync(
                    join(root, "app", f, "package.json"),
                    oldPkg,
                  );
                }
              } else if (rule.replaceDir) {
                const from = join(tempdir, "app", f, path);
                const target = join(root, "app", f, path);

                await removeAsync(target);
                await moveAsync(from, target);
              }
            }
          }
        }
      }
    }

    await runPnpm(["i"], process.cwd());
  }

  console.log(`\nUpgrade finished!`);
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
