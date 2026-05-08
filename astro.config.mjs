import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://jaggernauth.dev",
  server: {
    port: 3002,
  },
  output: "server",
  adapter: cloudflare(),
});
