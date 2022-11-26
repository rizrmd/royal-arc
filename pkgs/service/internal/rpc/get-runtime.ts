export const getRuntime = () => {
  if (typeof process !== "undefined") {
    //@ts-ignore
    if (process.isBun) return "bun";
    else return "node";
  }
  return "deno";
};
