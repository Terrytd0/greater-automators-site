# Greater Automators — Official Website

The marketing site for **Greater Automators** (`greaterautomators.com`) — a multi-page static site that explains the eight systems that hold a customer journey, and how the studio works.

## Tech stack

- **Static HTML** (no framework, no runtime dependencies) — `index.html`, `solutions.html`, `approach.html`, `contact.html`
- **Build tool:** Vite (bundles the pages and copies `public/`)
- **Styling:** `public/assets/css/main.css` (Escape Velocity template base) + `public/assets/css/custom.css` (brand theme: navy + blue, Inter)
- **Fonts:** Inter (Google Fonts)
- **Images:** optimized WebP + JPEG, responsive `srcset`/`sizes`, lazy-loaded

## Pages

- **Home** (`/`) — hero, the six opportunity leaks, the system, two systems, progressive expansion
- **Solutions** (`/solutions`) — the eight systems across the customer journey
- **Approach** (`/approach`) — principles, the four-step process, built for handoff
- **Contact** (`/contact`) — contact form + contact details

## Folder structure

```
├── index.html / solutions.html / approach.html / contact.html
├── vite.config.js
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── _redirects          # pretty URLs (/solutions -> /solutions.html)
│   ├── assets/
│   │   ├── css/            # main.css (base) + custom.css (theme)
│   │   └── js/             # contact.js (form -> Google Sheets) + vendor libs
│   └── images/             # optimized WebP/JPEG photography + UI visuals
└── dist/                   # build output (gitignored)
```

## Local development

```bash
npm install
npm run dev       # Vite dev server
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Contact form

The form posts to a Google Apps Script web app (`public/assets/js/contact.js`) which appends each submission to a Google Sheet and emails a starred notification. The Apps Script URL lives in `contact.js` (`SCRIPT_URL`).

## Deployment — Cloudflare Pages

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repo, then configure:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy and attach the custom domain `greaterautomators.com`.

The `public/_redirects` file enables pretty URLs (`/solutions` → `/solutions.html`).
