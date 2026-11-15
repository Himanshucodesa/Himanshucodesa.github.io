# Frame — Photography Portfolio

React + Vite, deployed to GitHub Pages at https://www.frametheportraits.com/

## Run locally

```bash
npm install
npm run dev
```

## Edit content (no component changes needed)

| What | Where |
|---|---|
| Name, tagline, nav, email, socials, about text | `src/content/site.js` |
| Photos, categories, hero image | `src/content/photos.js` |
| Colors & fonts | top of `src/styles/global.css` |

Add your images to `public/photos/` and reference them as `src: 'photos/your-file.jpg'`.
Export web-sized JPGs (~2000px long edge, < 500 KB) for fast loading.

## Structure

```
src/
  content/     ← all editable data
  components/  ← reusable blocks: Header, Footer, Hero, PhotoGrid, Lightbox, CategoryFilter…
  pages/       ← Home, Gallery, About, Contact (compose components)
  styles/      ← global.css with theme tokens
```

Add a page: create `src/pages/X.jsx`, add a `<Route>` in `src/App.jsx`, add a nav item in `site.js`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to Pages.
One-time setup: GitHub repo → **Settings → Pages → Source: GitHub Actions**.

The custom domain lives in `CNAME` and `public/CNAME` (copied into the build). The site is served from the domain root, so `base` in `vite.config.js` is `/`.
