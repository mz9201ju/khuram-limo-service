import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "home.html"),
        services: resolve(__dirname, "services.html"),
        contact: resolve(__dirname, "contact.html"),
        // add more pages here
      },
    },
  },
});
