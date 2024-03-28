import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/pdf": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
    optimizeDeps: {
      exclude: ["websocket"],
    },
  },
});
