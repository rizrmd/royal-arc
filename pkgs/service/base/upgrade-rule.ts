export type UpgradeRuleArg = {
  allFilesExcept?: string[];
  replaceDir?: true;
  isPackageJson?: true;
};

export const upgradeRule = (
  arg: UpgradeRuleArg,
) => {
  return { ___rule___: arg };
};

export const upgrade = (
  arg: Record<string, ReturnType<typeof upgradeRule>>,
) => {
  console.log(JSON.stringify(arg));
};
