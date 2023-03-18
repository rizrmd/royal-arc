import { createService } from "service";

export const main = createService("muju", async ({ ready }) => {
  ready();

  console.log("\n muju running ini.");
});
