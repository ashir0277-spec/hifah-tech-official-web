import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    historyApiFallback: true,
    host: true,
  },
  preview: {
    historyApiFallback: true,
  },
  build: {
    sourcemap: true, // Enable source maps
  },
  plugins: [react(), tailwindcss()],
});
