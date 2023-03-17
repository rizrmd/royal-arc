import { createService } from "service";

export const main = createService("mokaju", async () => {
  // example: lets await some long running stuff
  await new Promise<void>((resolve) => {
    console.log("hello mokaju");

    setTimeout(resolve, 100000);
  });
});
