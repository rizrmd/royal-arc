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
