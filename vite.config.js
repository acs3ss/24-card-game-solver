import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: false, // Not a PWA (yet!)
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,svg}"],
      },
    }),
  ],
  // Use relative paths (don't assume we're at the domain root)
  base: "./",
  test: {
    environment: "jsdom",
    globals: true,
  },
});
