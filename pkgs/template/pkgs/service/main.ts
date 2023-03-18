import { createService } from "service";

export const main = createService("template_service", async ({ ready }) => {
  ready();
  console.log("hello template_service");
});
