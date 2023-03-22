const { context } = require("esbuild");

(async () => {
  console.time('e')
  const c = await context({
    entryPoints: ["/Users/r/Desktop/projects/royal-arc/app/app.ts"],
    outfile: "/Users/r/Desktop/projects/royal-arc/.output/app/app.js",
    bundle: true,
    sourcemap: true,
    platform: "node",
    external: ["hyper-express", "esbuild"],
  });
  await c.dispose()
  console.timeEnd('e')

})();
