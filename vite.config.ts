import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "NoteGuard",
        short_name: "NoteGuard",
        description:
          "NoteGuard is your go-to digital notebook for effortless note-taking, organizing thoughts, and staying productive on-the-go. Enjoy secure, encrypted notes, offline access, and seamless synchronization across all your devices",
        icons: [
          { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
          { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
        ],
        start_url: "/",
        display: "standalone",
        background_color: "#FFFFFF",
        theme_color: "#FFFFFF",
      },
    }),
  ],
});
