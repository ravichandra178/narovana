import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { apiEndpointPlugin } from "./server/vite-api-plugin";

export default defineConfig(({ mode }) => {
  const root = path.resolve(import.meta.dirname);
  const env = loadEnv(mode, root, "");

  Object.assign(process.env, env);

  const port = Number(process.env.PORT ?? 5173);
  const basePath = process.env.BASE_PATH ?? "/";

  return {
    base: basePath,

    plugins: [
      react(),
      tailwindcss(),
      apiEndpointPlugin(),
    ],

    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
        "@assets": path.resolve(
          import.meta.dirname,
          "..",
          "..",
          "attached_assets",
        ),
      },
      dedupe: ["react", "react-dom"],
    },

    root,

    build: {
      outDir: path.resolve(import.meta.dirname, "dist"),
      emptyOutDir: true,
    },

    server: {
      port,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
      fs: {
        strict: true,
      },
    },

    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});