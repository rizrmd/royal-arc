import { join } from "path";
import { UserConfig } from "vite";

export const viteCfg = ({ plugins }: { plugins: any }) => {
  return ({ mode }: { mode: "development" | "production" }) => {
    const hash = Math.floor(Math.random() * 90000) + 10000;
    const root = join(process.cwd(), "..", "..");
    const pkgs = join(root, "pkgs", "royal", "pkgs");

    const alias = {
      src: join(process.cwd(), "src"),
      types: join(process.cwd(), "types"),
      gen: join(root, "gen"),
      "web-init": join(pkgs, "web-init"),
      "web-utils": join(pkgs, "web-utils"),
    };

    if (mode === "production") {
      alias["react/jsx-runtime"] = join(
        pkgs,
        "web-init",
        "src",
        "runtime",
        "jsx"
      );
    } else {
      alias["react/jsx-runtime"] = join(
        pkgs,
        "web-init",
        "src",
        "runtime",
        "jsx-dev-run"
      );
      alias["react/jsx-dev-runtime"] = join(
        pkgs,
        "web-init",
        "src",
        "runtime",
        "jsx-dev"
      );
    }

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
        alias,
      },
      optimizeDeps: {
        esbuildOptions: {
          treeShaking: true,
        },
      },
      plugins,
    } as UserConfig;
  };
};
