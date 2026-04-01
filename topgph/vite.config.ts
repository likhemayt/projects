import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const base = process.env.BASE_PATH ?? "/";

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
  ],
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react-jsx",
        target: "ES2022",
        module: "ESNext",
        moduleResolution: "bundler",
        skipLibCheck: true,
        strictNullChecks: true,
        noImplicitAny: true,
        allowImportingTsExtensions: true,
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    port: Number(process.env.PORT ?? 5173),
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port: Number(process.env.PORT ?? 4173),
    host: "0.0.0.0",
    allowedHosts: true,
  },
});