import { basename } from "path";
import { dirAsync } from "service";
import { reloadWebLayoutAll } from "./scaff-web-layout";
import { reloadWebPageAll } from "./scaff-web-page";
import { scaff } from "./util/scaff";

export const reloadWeb = async () => {

  await Promise.all([
    reloadWebLayoutAll(),
    reloadWebPageAll(),
    // reloadWebGen(),
  ]);

};

export const createNewWeb = async (path: string) => {
  await dirAsync(path);
  const name = basename(path);
  await scaff({
    //-------------------------------------------------
    "package.json": {
      "name": name,
      "version": "1.0.0",
      "dependencies": {
        "@emotion/react": "^11.10.5",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "vite": "^3.2.4",
        "gen": "workspace:^",
        "royal": "workspace:^",
        "service": "workspace:^",
        "web-init": "workspace:^",
        "web-utils": "workspace:^",
      },
      "devDependencies": {
        "@types/react": "^18.0.25",
        "@types/react-dom": "^18.0.9",
        "@vitejs/plugin-react": "^2.2.0",
        "autoprefixer": "^10.4.13",
        "postcss": "^8.4.19",
        "vite": "^3.2.4",
        "tailwindcss": "^3.2.4",
      },
    },
    //-------------------------------------------------
    "index.html": `\
<!DOCTYPE html>
<html lang="en" data-theme="emerald">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
  </head>
  <body>
    <div id="root" class="flex flex-col flex-1 w-full h-screen"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>`,
    //-------------------------------------------------
    "postcss.config.js": `\
const path = require('path')
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`,
    //-------------------------------------------------
    "tailwind.config.js": `\
/** @type {import('tailwindcss').Config} */
const color = require('tailwindcss/colors')
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',],
  theme: {
    extend: {
      colors: {
        primary: color.blue
      }
    },
  },
  plugins: [],
}
`,
    //-------------------------------------------------
    "tsconfig.json": {
      "compilerOptions": {
        "target": "ESNext",
        "useDefineForClassFields": true,
        "lib": ["DOM", "DOM.Iterable", "ESNext"],
        "allowJs": false,
        "skipLibCheck": false,
        "esModuleInterop": false,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "module": "ESNext",
        "moduleResolution": "Node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "preserve",
        "jsxFactory": "jsx",
        "jsxFragmentFactory": "React.Fragment",
        "jsxImportSource": "@emotion/react",
        "baseUrl": "./",
        "paths": {
          "src/*": ["src/*"],
          "types/*": ["types/*"],
        },
      },
      "include": ["./src/**/*", "./types/**/*"],
    },
    //-------------------------------------------------
    "vite.config.js": `\
import react from '@vitejs/plugin-react';
import { join } from 'path';
import { defineConfig } from 'vite';

const hash = Math.floor(Math.random() * 90000) + 10000;
export default defineConfig({
  build: {
    outDir: './build',
    emptyOutDir: true,
    target: 'es2015',
    manifest: true,
    rollupOptions: {
      output: {
        entryFileNames: '[name]' + hash + '.js',
        chunkFileNames: '[name]' + hash + '.js',
        assetFileNames: '[name]' + hash + '.[ext]',
      },
    },
  },
  base: '/',
  clearScreen: false,
  resolve: {
    alias: {
      src: join(process.cwd(), 'src'),
      types: join(process.cwd(), 'types'),
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  plugins: [
    react({
      fastRefresh: false,
      jsxImportSource: 'web-init',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
});
`,
    //-------------------------------------------------
    "src/base/layout/blank.tsx": `\
import { layout } from 'web-init'

export default layout({
  component: ({ children }) => {
    return <>{children}</>
  },
})
`,
    //-------------------------------------------------
    "src/base/layout/default.tsx": `\
import { layout } from 'web-init'

export default layout({
component: ({ children }) => {
return <>{children}</>
},
})
`,
    //-------------------------------------------------
    "src/base/page/home.tsx": `\
import { page } from "types/content";
import { useLocal } from "web-utils";

export default page({
  url: "/",
  component: ({}) => {
    const local = useLocal({}, async () => {
      await db.user.create({ data: { password: "123", username: "123" } });
      console.log(await db.user.findFirst());
    });
    return <div>Halo</div>;
  },
});
`,

    //-------------------------------------------------
    "src/index.css": `\
@tailwind base;
@tailwind components;
@tailwind utilities;
`,
    //-------------------------------------------------
    "src/index.tsx": `\
import { createRoot } from "react-dom/client";
import { App, initEnv } from "web-init";
import layout from "../types/layout";
import page from "../types/page";
import "./index.css";

initEnv({ page, layout }).then(() => {
  const rootNode = document.getElementById("root");
  if (rootNode) { 
    const root = createRoot(rootNode);
    root.render(<App />);
  }
});`,
    //-------------------------------------------------
    "types/content.ts": `\
import { FC } from 'react'
import type layouts from './layout'

export { default as pages } from './page'
export { default as layouts } from './layout'

type IPage = {
  url: string
  layout?: keyof typeof layouts
  actions?: string[]
  component: FC<{ layout: any & { ready: boolean; render: () => void } }>
}

export const page = (opt: IPage) => {
  return opt
}`,
    //-------------------------------------------------
    "types/react-app-env.d.ts": `\
declare module "*.png";
declare module "*.svg";
declare module "*.jpeg";
declare module "*.jpg";
`,
    //-------------------------------------------------
    "types/global.d.ts": `\
import { prisma } from "gen/prisma";
import type * as _api from "gen/api";
import "web-init/src/global";

type TApi = typeof _api["srv"];
type TApiKey = keyof TApi;
type TApiFn<K extends TApiKey> = TApi[K]["api"];
type TApiParams<K extends TApiKey> = Parameters<TApiFn<K>>;
type Cons<H, T extends readonly any[]> = ((h: H, ...t: T) => void) extends (
  ...r: infer R
) => void
  ? R
  : never;

declare global {
  const apiHeaders: any;
  const api: {
    [K in TApiKey]: TApiFn<K>;
  };
  const db: typeof prisma["db"];
}`,
  }, path);
};
