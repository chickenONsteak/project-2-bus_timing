import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // add in proxy server to communicate to OneMap's server to bypass CORS error
  server: {
    proxy: {
      "/api": {
        target: "https://www.onemap.gov.sg",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
