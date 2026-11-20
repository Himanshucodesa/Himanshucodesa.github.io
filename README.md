# Frame the Portraits

Portrait and event photography, built with React + Vite for GitHub Pages.
The brand, public URL, and contact settings live in `src/content/site.js`.

## Run locally

```bash
npm install
npm run dev
```

## Pages and content

- **Home** — the existing shutter experience and a carousel of selected work.
- **Portfolio** (`/gallery`) — Adult portraits, Baby portraits, and Dance events.
  Baby portraits uses the moving photo orbit both here and in its homepage chapter.
- **My story** (`/about`) — the journey from bird photography to streets to portraits and events.
- **Contact** — portrait sessions, baby photography, and dance event enquiries.

The design, themes, animation, and language settings remain in place. The portfolio
is intentionally empty while the next selection is prepared. The existing
photographer image remains on My story. No demo landscapes or street photos
are listed as current work.

## Add the next photo selection

Store web copies under:

```text
public/photos/adults/
public/photos/babies/
public/photos/events/
```

Keep originals outside the website repository. Export JPEG or WebP copies with
roughly 1600–2000 px on the long edge; aim for 200–500 KB each where quality allows.
Strip embedded personal metadata before publishing.

Add each photo to `photos` in `src/content/photos.js`:

```js
{
  id: 'adult-01',
  title: 'A quiet moment',
  category: 'Adult portraits', // or 'Baby portraits', 'Dance events'
  src: 'photos/adults/adult-01.jpg',
  width: 1200,
  height: 1800,
  featured: true,
  objectPosition: '50% 35%',
}
```

Use the actual exported width and height. The carousel shows a consistent 4:5 crop;
`objectPosition` adjusts its focus. Gallery and lightbox images retain their proportions.
Set `featured: true` for homepage highlights and category covers. An approved featured
photo automatically replaces the neutral opening backdrop. Empty categories remain safe.

Start with **30–45 portfolio photographs**, roughly 10–15 per category, and **12–18
featured highlights**. These are editorial recommendations, not application limits.
The carousel uses the featured set, or all registered images if none are featured.

Text lives in `src/content/site.js`; category/chapter copy lives in `src/content/photos.js`;
Dutch, German, and French translations live in `src/context/Preferences.jsx`.

## Build and deploy

```bash
npm run build
```

Pushing to `main` runs `.github/workflows/deploy.yml` to publish to Pages.
The build generates `dist/CNAME` from `site.url`; Vite supplies page metadata from
that same configuration. The custom domain is served from `/`.
