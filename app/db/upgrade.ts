import { upgrade, upgradeRule } from "service";

upgrade({
  "*": upgradeRule({ allFilesExcept: [] }),
  "package.json": upgradeRule({ isPackageJson: true }),
});
