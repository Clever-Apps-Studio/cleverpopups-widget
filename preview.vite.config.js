import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), cssInjectedByJsPlugin()],
  base: "",
  build: {
    // ssr: true,
    cssCodeSplit: false,

    rollupOptions: {
      input: "./src/preview/index.js",
      output: {
        dir: "./build/preview",
        manualChunks: () => "everything.js",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "src/variables.scss" as *;',
      },
    },
  },
});
