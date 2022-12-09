import { upgrade, upgradeRule } from "service";

upgrade({
  "*": upgradeRule({ replaceAll: true }),
  "package.json": upgradeRule({ isPackageJson: true }),
});
