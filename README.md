# Greater Automators — Official Website

Custom AI automation for repetitive business workflows.

A production-quality, single-page marketing site for **Greater Automators** (`greaterautomators.com`). It is a static site with no backend, built to deploy directly to Cloudflare Pages.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 6 |
| Styling | Hand-written vanilla CSS (design tokens + component styles, no framework) |
| Fonts | Space Grotesk, Inter, JetBrains Mono (Google Fonts) |
| QA | Playwright (screenshot capture + automated layout checks) |

No animation library, no CSS framework, no extra runtime dependencies beyond React — motion is done with CSS and a small set of IntersectionObserver hooks.

## Folder structure

```
greater-automators-site/
├── index.html               # SEO head, OG/Twitter meta, JSON-LD, fonts
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   ├── og-cover.svg / .png  # generated Open Graph image
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── make-og.mjs          # renders og-cover.svg -> og-cover.png
│   ├── qa.mjs               # captures screenshots at 6 breakpoints + per-section shots
│   └── check.mjs            # automated checks (overflow, anchors, ids, images, console)
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── hooks.js             # useInView, useScrollY, usePrefersReducedMotion
│   ├── components/          # Nav, Hero, CoreMessage, Capabilities, Work, Philosophy,
│   │                        # Process, Why, About, Contact, Footer, + primitives
│   └── styles/
│       ├── base.css         # design tokens, typography, buttons, reveal, a11y
│       └── site.css         # layout + component styles, responsive rules
└── dist/                    # production build output (gitignored)
```

## Local development

```bash
npm install
npm run dev       # Vite dev server with HMR
```

Open the printed URL (default `http://localhost:5173`).

## Scripts

```bash
npm run dev       # start the dev server
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run qa        # capture QA screenshots into qa-shots/ (all breakpoints + sections)
npm run check     # automated layout/health checks against the production build
npm run og        # regenerate public/og-cover.png from public/og-cover.svg
```

## Deployment — Cloudflare Pages

This is a plain static site (single page, no client-side routing), so no special redirects are required.

1. Push this folder to a Git repository (GitHub/GitLab).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository and configure:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** 20 (or any current LTS)
4. Deploy. Configure the custom domain `greaterautomators.com` and the canonical (non-www) URL in **Custom domains**.

The `_headers`/`_redirects` files are intentionally omitted — there are no server-side requirements.

## Content placeholders still needed

- **Additional projects** — the Work section currently features four real projects (LexRAG, AI Lead Intelligence, Finance Intelligence Platform, SupportOps AI). Add more by extending the `PROJECTS` array in `src/components/Work.jsx`.
- **GitHub / LinkedIn** — the profile URLs are set (`https://github.com/Terrytd0`, `https://www.linkedin.com/in/terry-nyirenda-210455170`) in `src/components/About.jsx`, `src/components/Footer.jsx`, and `index.html` (JSON-LD `sameAs`).

## Notes

- `npm run qa` and `npm run check` require a local Chromium installation (Playwright's `chromium.launch()`). If no browser is available the scripts exit cleanly with `NO_BROWSER`.
- The site respects `prefers-reduced-motion`; the animated system background and cursor glow are disabled for reduced-motion users and touch devices.
