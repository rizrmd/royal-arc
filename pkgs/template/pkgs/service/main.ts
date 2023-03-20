import { createService } from "service";

export const main = createService(
  "template_service",
  async ({ markAsRunning }) => {
    markAsRunning();
    console.log("hello template_service");
  }
);
