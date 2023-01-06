import react from "@vitejs/plugin-react";
import { viteCfg } from "../../pkgs/royal/web/vitecfg";
import { defineConfig } from "vite";
import { VitePluginFonts } from "vite-plugin-fonts";

const cfg = viteCfg({
  plugins: [
    react({
      fastRefresh: false,
      jsxRuntime: "automatic",
      jsxImportSource: "@emotion/react",
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    VitePluginFonts({
      google: {
        families: ["Source Sans Pro"],
      },
    }),
  ],
});
export default defineConfig(cfg as any);
