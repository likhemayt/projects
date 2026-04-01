import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // With `vite` on :5173, run `vercel dev` on :3000 so /api/* hits Vercel handlers.
      "/api": { target: "http://127.0.0.1:3000", changeOrigin: true },
    },
  },
});
