/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [
      "node_modules",
      "dist",
      ".idea",
      ".git",
      ".cache",
      "./src/__tests__/setup.ts",
    ],
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.ts",
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: false,
  },
});
