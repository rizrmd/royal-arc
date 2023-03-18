import { createService } from "service";

export const main = createService("muju", async () => {
  // example: lets await some long running stuff
  await new Promise<void>((resolve) => {
    console.log("hello muju");

    setTimeout(resolve, 100000);
  });
});
