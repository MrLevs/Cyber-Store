import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import Inspect from 'vite-plugin-inspect';

export default defineConfig({
  plugins: [Inspect()],
  css: {
    devSourcemap: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // login: resolve(__dirname, 'pages/login.html'),
      },
    },
  },
});
