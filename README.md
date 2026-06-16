# deck

A multi-talk [Slidev](https://sli.dev/) workspace with a shared landing page, running on [Bun](https://bun.sh/).

```
deck/
├── site/                       # landing page (Vite + Vue + UnoCSS)
│   ├── talks.config.ts         # talks metadata (title, date, tags, cover)
│   └── src/App.vue             # card grid + tag filter
└── packages/<slug>/            # one Slidev project per talk
    ├── slides.md               # the deck itself
    ├── package.json            # per-talk scripts (dev / build / build-base)
    └── public/                 # cover image + any static assets (optional)
```

## Prerequisites

- [Bun](https://bun.sh/) `>= 1.3`

## Install

```sh
bun install
```

## Develop

Run the landing page (talk covers are proxied from `packages/<slug>/public/`):

```sh
bun run dev
```

Run a single talk in Slidev:

```sh
cd packages/<slug>
bun run dev
```

## Build

```sh
bun run build
```

Output goes to `dist/`:

- `dist/index.html` — landing page
- `dist/<slug>/` — built Slidev for each talk

Serve `dist/` as a static site (any host that supports per-directory `index.html` works).

---

## Add a new talk

A talk is a Bun workspace package under `packages/<slug>/`. The slug doubles as the deployed sub-path (`/<slug>/`), so use a stable, URL-safe name. A useful convention is `<YYYY-MM-DD>-<event>`.

### 1. Scaffold the package

Copy the existing demo package as a template, then rename it:

```sh
cp -r packages/<demo-slug> packages/<your-slug>
rm -rf packages/<your-slug>/node_modules
```

A talk package needs at minimum:

| File             | Purpose                                                   |
| ---------------- | --------------------------------------------------------- |
| `package.json`   | Per-talk scripts; **must** declare `build-base` (see #2)  |
| `slides.md`      | The Slidev deck (frontmatter + slides separated by `---`) |
| `public/`        | Static assets — cover image, images, fonts (optional)     |

Optional extras: `uno.config.ts`, `style.css`, `setup/` (shiki, shortcuts, vite plugins), `components/`, `composables/`, `global-bottom.vue`. Add them as you need them.

### 2. Update the package manifest

Edit `packages/<your-slug>/package.json`:

- Change `name` to `<your-slug>`.
- Update the `build-base` script so `--out` and `--base` both reference your slug. This is what the top-level `bun run build` invokes per workspace; getting the slug wrong here will break asset paths on the deployed site.

```json
{
  "name": "<your-slug>",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "slidev --open --remote",
    "build": "slidev build",
    "build-base": "slidev build --out ../../dist/<your-slug> --base /<your-slug>/",
    "export": "slidev export --with-clicks --per-slide --wait-until none"
  }
}
```

### 3. Register the talk on the landing page

Add an entry to `site/talks.config.ts`. The `Talk` interface at the top of that file documents every field; the short version:

```ts
{
  slug: '<your-slug>',                  // must match packages/<your-slug>/
  title: 'Your Talk Title',
  date: '2026-MM-DD',                   // ISO date — used for sorting & year chip
  venue: 'Event · City',                // optional, shown under the title
  description: 'One-sentence summary.', // optional
  tags: ['Tag A', 'Tag B'],             // optional; first tag styles the card accent
  cover: 'cover.png',                   // optional; resolved against packages/<your-slug>/public/
}
```

If you set `cover`, drop the image into `packages/<your-slug>/public/`. Vite middleware serves it during `bun run dev`, and the production build copies it into `dist/<your-slug>/`. Leave `cover` undefined to get a **live first-slide preview** — the landing page embeds the built deck's home as the cover (with a gradient placeholder underneath while it loads, or if the talk hasn't been built yet).

### 4. Write the deck

Edit `packages/<your-slug>/slides.md`. The top frontmatter configures the whole deck (theme, title, export filename, transitions); slides are separated by `---`. See [the Slidev docs](https://sli.dev/) for syntax, layouts, components, and themes.

### 5. Verify

Bun picks up new workspace packages automatically — no root config to edit. Confirm both paths work:

```sh
bun install                              # link the new workspace
cd packages/<your-slug> && bun run dev   # talk runs standalone
cd ../.. && bun run dev                  # landing page shows the new card
bun run build                            # full production build succeeds
```

If the card is missing on the landing page, check `site/talks.config.ts`. If the talk builds but assets 404 in production, re-check the `--base` in `build-base`.
