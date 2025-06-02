import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import Inspect from 'vite-plugin-inspect';
import includeHtml from 'vite-plugin-include-html';

export default defineConfig({
  plugins: [Inspect(), includeHtml()],
  css: {
    devSourcemap: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        products: resolve(__dirname, 'pages/products.html'),
        details: resolve(__dirname, 'pages/product-details.html'),
        shop: resolve(__dirname, 'pages/shop.html'),
        address: resolve(__dirname, 'pages/address.html'),
        delivery: resolve(__dirname, 'pages/delivery.html'),
        payment: resolve(__dirname, 'pages/payment.html'),
      },
    },
  },
});
