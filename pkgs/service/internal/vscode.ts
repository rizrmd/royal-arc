import { dirname, join } from "path";
import {
  dirAsync,
  existsAsync,
  readAsync,
  writeAsync,
} from "./service/build/jetpack";

export const vscodeSettings = async () => {
  if (!await existsAsync(join(process.cwd(), "..", "..", "config.ts"))) {
    return;
  }
  const vscodeFile = join(
    process.cwd(),
    "..",
    "..",
    ".vscode",
    "settings.json",
  );
  await dirAsync(dirname(vscodeFile));

  const vs = (await readAsync(vscodeFile, "json")) || {};

  if (
    !vs["hide-files.files"] ||
    (vs["hide-files.files"] && vs["hide-files.files"].length === 0)
  ) {
    await writeAsync(vscodeFile, defaultVsSettings);
  }
};

const defaultVsSettings = {
  "typescript.preferences.importModuleSpecifier": "relative",
  "files.exclude": {
    "**/.git": true,
    "**/.svn": true,
    "**/.hg": true,
    "**/CVS": true,
    "**/.DS_Store": true,
    "**/Thumbs.db": true,
    "**/node_modules": true,
    "**/bun.lockb": true,
    "**/.gitignore": true,
    ".prettierrc": true,
    ".gitignore": true,
    "pnpm-workspace.yaml": true,
    "pnpm-lock.yaml": true,
    ".vscode": true,
    "app/.gen": true,
    ".idea": true,
  },
  "hide-files.files": [
    ".gitignore",
    "pnpm-workspace.yaml",
    "pnpm-lock.yaml",
    ".vscode",
    ".idea",
    "app/.gen",
  ],
  "files.associations": {},
};
