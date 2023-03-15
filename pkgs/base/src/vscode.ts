import { dir } from "dir";
import { dirAsync, writeAsync } from "fs-jetpack";
import { dirname } from "path";

export const vscodeSettings = async () => {
  const vscodeFile = dir.path(".vscode/settings.json");
  await dirAsync(dirname(vscodeFile));
  await writeAsync(vscodeFile, defaultVsSettings);
};

const defaultVsSettings = {
  "typescript.preferences.importModuleSpecifier": "relative",
  "search.exclude": {
    "app/gen/**": true,
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/Thumbs.db": true,
    "**/bun.lockb": true,
    "**/go.sum": true,
    "**/.parcelrc": true,
    "**/pnpm-lock.yaml": true,
    "**/.gitignore": true,
    "**/.npmrc": true,
    "**/.postcssrc": true,
    "**/pnpm-workspace.yaml": true,
    "**/.vscode": true,
    "**/build": true,
    "**/tsconfig.json": true,
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
