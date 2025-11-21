import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "public/index.html"),
        services: resolve(__dirname, "public/services.html"),
        contact: resolve(__dirname, "public/contact.html"),
      }
    }
  }
});
