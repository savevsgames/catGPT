import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  server: {
    port: 3001,
    open: true, // Automatically open the browser on startup
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Express backend server
        changeOrigin: true,
        secure: false, // HTTPS?
      },
      "/auth": {
        target: "http://localhost:3001", // Proxy auth routes to Express
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
