import { createService } from "service";

export const main = createService({
  name: "coba",
  mode: "single",
  init: async ({ markAsRunning }) => {
    console.log("hello coba");
    markAsRunning();
    return {
      mantap: () => {
        return "jiwa";
      },
    };
  },
});
