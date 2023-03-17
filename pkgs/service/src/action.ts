import { SERVICE_NAME } from "./types";

export const action = {
  async start(arg: { name: SERVICE_NAME; multiInstance?: boolean }) {},
};
