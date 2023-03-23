import { postRunWeb } from "./postrun/web";

export const postRun = async (name: string) => {
  if (name.startsWith("web")) postRunWeb(name);
};
