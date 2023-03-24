import { createService, service } from "service";

export const main = createService({
  name: "coba",
  mode: "single",
  init: async ({ onServiceReady }) => {
    console.log("hello coba");
    setTimeout(() => {}, 900000);

    onServiceReady(() => {
      service.db.query({} as any);
    });

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
