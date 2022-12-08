import react from "@vitejs/plugin-react";
import { viteCfg } from "../../pkgs/royal/web/vitecfg";
import { defineConfig } from "vite";

export default defineConfig(viteCfg({ react }));
