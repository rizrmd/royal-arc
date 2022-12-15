import { join } from "path";

export const viteCfg = ({ react }: { react: any }) => {
  const hash = Math.floor(Math.random() * 90000) + 10000;
  const root = join(process.cwd(), "..", "..");

  return {
    build: {
      outDir: "./build",
      emptyOutDir: true,
      target: "es2015",
      manifest: true,
      rollupOptions: {
        output: {
          entryFileNames: "[name]" + hash + ".js",
          chunkFileNames: "[name]" + hash + ".js",
          assetFileNames: "[name]" + hash + ".[ext]",
        },
      },
    },
    base: "/",
    clearScreen: false,
    resolve: {
      alias: {
        src: join(process.cwd(), "src"),
        types: join(process.cwd(), "types"),
        "gen": join(root, "gen"),
        "web-init": join(root, "pkgs", "royal", "pkgs", "web-init"),
        "web-utils": join(root, "pkgs", "royal", "pkgs", "web-utils"),
      },
    },
    esbuild: {
      logOverride: { "this-is-undefined-in-esm": "silent" },
    },
    plugins: [
      react({
        fastRefresh: false,
        jsxImportSource: "web-init",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
    ],
  };
};
