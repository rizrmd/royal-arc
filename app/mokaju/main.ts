import { createService } from "service";

export const main = createService("mokaju", async () => {
  console.log("mokaju is running");
  // example: lets await some long running stuff
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 100000);
  });  
});
