import { upgrade, upgradeRule } from "service";

upgrade({
  "*": upgradeRule({ allFilesExcept: ["index.ts", "action.ts"] }),
  "package.json": upgradeRule({ isPackageJson: true }),
  "api/built-in": upgradeRule({ replaceDir: true }),
});
