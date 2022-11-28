import { stat } from "fs/promises";

export const isDirectory = async (dir: string) => {
  const st = await stat(dir);
  if (st.isDirectory()) {
    return st;
  }
  return false;
};
