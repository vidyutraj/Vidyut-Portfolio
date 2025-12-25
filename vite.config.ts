import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

export default defineConfig(({ mode }) => {
  return {
    base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      // GitHub Pages SPA routing fix
      name: "copy-404",
      closeBundle() {
        const distPath = path.resolve(__dirname, "dist");
        const indexPath = path.join(distPath, "index.html");
        const notFoundPath = path.join(distPath, "404.html");

        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
          console.log("✓ Copied index.html to 404.html");
        }
      },
    },
  ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
