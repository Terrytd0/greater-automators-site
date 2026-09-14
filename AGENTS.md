# AGENTS.md — Greater Automaters site

## Working rules for coding agents

- This is a static multi-page site (Vite): `index.html`, `solutions.html`, `approach.html`, `contact.html`, with assets in `public/`. Build with `npm run build`, develop with `npm run dev`.
- Do not add Projects or Teach pages, and do not switch templates. Keep the Home / Solutions / Approach / Contact architecture.
- Keep the placeholder images in `public/images/` as they are — do not replace or remove them.
- After running any shell command or tool, always reply with a short text summary of the result and the next step. Never end your turn immediately after a tool result without producing a text response.
