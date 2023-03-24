import { createService } from "service";

export const main = createService({
  name: "coba",
  mode: "single",
  init: async ({}) => {
    console.log("hello coba");
    setTimeout(() => {}, 900000);
    return {
      api: {
        orang: () => {
          return "maulu";
        },
      },
      mantap: () => {
        return "jiwa";
      },
    };
  },
});
