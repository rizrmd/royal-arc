import { upgrade, upgradeRule } from "service";

upgrade({
  "*": upgradeRule({ allFilesExcept: ["index.html"] }),
  "package.json": upgradeRule({ isPackageJson: true }),
  "types": upgradeRule({ allFilesExcept: ["layout.ts", "page.ts"] }),
  "src/base/page/built-in": upgradeRule({ replaceDir: true }),
  "src/components/built-in": upgradeRule({ replaceDir: true }),
  "src/gen/built-in": upgradeRule({ replaceDir: true }),
});
