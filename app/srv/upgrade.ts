import { upgradeRule } from "service";

export const upgrade = {
  "*": upgradeRule({ allExcept: ["index.ts", "action.ts"] }),
  "package.json": upgradeRule({ isPackageJson: true }),
  "api/built-in": upgradeRule({ replaceAll: true }),
};
