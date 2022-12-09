import { upgradeRule } from "service";

export const upgrade = {
  "*": upgradeRule({ allExcept: ["index.html"] }),
  "package.json": upgradeRule({ isPackageJson: true }),
  "types": upgradeRule({ allExcept: ["layout.ts", "page.ts"] }),
  "src/base/page/built-in": upgradeRule({ replaceAll: true }),
  "src/components/built-in": upgradeRule({ replaceAll: true }),
  "src/gen/built-in": upgradeRule({ replaceAll: true }),
};
