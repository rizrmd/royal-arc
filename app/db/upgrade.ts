import { upgradeRule } from "service";

export const upgrade = {
  "*": upgradeRule({ replaceAll: true }),
  "package.json": upgradeRule({ isPackageJson: true }),
};
