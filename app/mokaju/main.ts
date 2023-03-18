import { createService } from "service";

export const main = createService("mokaju", async ({ mode, ready }) => {
  ready();

  console.log("\n mokoju running ini.");
});
