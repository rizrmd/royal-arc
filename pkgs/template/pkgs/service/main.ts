import { createService } from "service";

export const main = createService(
  "template_service",
  async ({ enableStdout }) => {
    enableStdout();
    console.log("hello template_service");
  }
);
