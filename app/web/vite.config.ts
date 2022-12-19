import react from "@vitejs/plugin-react";
import { viteCfg } from "../../pkgs/royal/web/vitecfg";
import { defineConfig } from "vite";
import { VitePluginFonts } from "vite-plugin-fonts";

const cfg = viteCfg({ react });
export default defineConfig({
  ...cfg,
  plugins: [
    ...(cfg.plugins || []),
    VitePluginFonts({
      google: {
        families: ["Source Sans Pro"],
      },
    }),
  ],
});
