import { createService } from "service";

export const main = createService("template_service", async () => {
  // example: lets await some long running stuff
  await new Promise<void>((resolve) => {
    console.log("hello template_service");

    setTimeout(resolve, 100000);
  });
});
