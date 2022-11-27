import { getRuntime } from "./get-runtime";

export const rawLog = (text: string) => {
  const runtime = getRuntime();
  if (runtime === "bun") {
    Bun.write(Bun.stdout, text);
  } else if (runtime === "node") {
    process.stdout.write(text);
  }
};
