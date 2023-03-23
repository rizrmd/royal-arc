import { postBuildWeb } from "./postbuild/web";

export const postBuild = async (name: string) => {
  if (name.startsWith("web")) postBuildWeb(name);
};
