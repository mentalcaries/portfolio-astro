import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  server: {
    port: 3002,
  },

  output: "server",
  adapter: cloudflare(),
});