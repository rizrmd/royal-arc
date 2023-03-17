import { dir } from "dir";
import { dirAsync, existsAsync, readAsync, writeAsync } from "fs-jetpack";
import { dirname } from "path";

export const vscodeSettings = async () => {
  const vscodeFile = dir.path(".vscode/settings.json");

  const source = JSON.stringify(defaultVsSettings, null, 2);
  if (await existsAsync(vscodeFile)) {
    if ((await readAsync(vscodeFile, "utf8")) === source) {
      return;
    }
  }

  await dirAsync(dirname(vscodeFile));
  await writeAsync(vscodeFile, source);
};

const defaultVsSettings = {
  "typescript.preferences.importModuleSpecifier": "relative",
  "search.external": {
    "app/gen/**": true,
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "files.external": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/Thumbs.db": true,
    "**/bun.lockb": true,
    "**/go.sum": true,
    ".output/.cache": true,
    "**/.parcelrc": true,
    "**/pnpm-lock.yaml": true,
    "**/.gitignore": true,
    "**/.npmrc": true,
    "**/.postcssrc": true,
    "**/pnpm-workspace.yaml": true,
    "**/.vscode": true,
    "**/build": true,
    "**/node_modules": true,
    "**/.htmlnanorc": true,
    "**/.parcel-cache": true,
    ".fleet": true,
    ".vscode": true,
    ".husky": true,
    base: true,
    "app/gen": true,
  },
  "hide-files.files": [],
};
