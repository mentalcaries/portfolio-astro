# Repository Guide

## Commands

- Use Node 22 (`.node-version`) and npm; `package-lock.json` is the dependency source of truth.
- `npm run dev` serves Astro on `http://localhost:3002`.
- `npm run build` is the full verification command: it runs `astro check` before the production build. There is no test suite or CI workflow in this repository.
- `npm run check` is not read-only: it runs `biome check --apply-unsafe .` and can rewrite files, including generated `.astro/` and `dist/` output. Prefer read-only, path-scoped checks such as `npx biome check src/pages/index.astro`; review the diff if the npm script is used.

## Architecture

- This is an Astro 7 server-rendered site deployed through `@astrojs/cloudflare`; do not assume a static-output build. The dynamic content detail routes in `src/pages/post/[slug].astro` and `src/pages/project/[slug].astro` are exceptions and explicitly prerender every collection entry.
- `src/content.config.js` is the executable schema for the `post` and `project` Markdown collections. Entry IDs become URL slugs directly, so moving or nesting Markdown files changes their routes.
- Project ordering is controlled by optional numeric `order` frontmatter; missing values and `0` sort last. Blog ordering parses the required display string `dateFormatted` (for example, `Oct 15, 2025`), so preserve that format.
- Markdown images stored beside an entry use paths relative to that Markdown file. Project `cover` values instead reference files under `public/` with root-relative URLs.
- `src/content/resume.md` drives both `/resume` and the `/res` JSON endpoint. `/res` uses a deliberately limited custom Markdown parser in `src/pages/res.ts`; headings and bullet structure affect the JSON shape.

## Runtime Details

- Global styling is Tailwind CSS v4 configured in `src/assets/css/main.css` with CSS directives; there is no Tailwind config file.
- `src/layouts/main.astro` injects `HEADER_INJECT` and `FOOTER_INJECT` as raw HTML. Preserve these deployment hooks and never place untrusted values in them.
