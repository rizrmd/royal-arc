import { createService } from "service";

export const main = createService(
  "srv",
  async ({ enableStdout }) => {
    enableStdout();
    console.log("hello srv");
  }
);
