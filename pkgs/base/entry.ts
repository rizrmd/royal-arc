import { baseMain } from "./src/main";

(async () => {
  process.removeAllListeners("warning");

  await baseMain();
})();
