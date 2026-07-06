# AGENTS.md

## Cursor Cloud specific instructions

SylvaNova is a single Next.js 15 (App Router) + React 19 landing page for a gaming
community. There is no backend service or database beyond Next.js itself; optional
features call the Discord REST API directly.

Standard commands live in `package.json` (`dev`, `build`, `start`, `lint`). Run the dev
server with `npm run dev` (serves on port 3000). Lint with `npm run lint` (uses
`next lint`; one pre-existing `react-hooks/exhaustive-deps` warning is expected and not a
failure). There is no automated test suite.

Non-obvious notes:

- The app runs fully without any environment variables. Discord OAuth and announcement sync
  are optional and degrade gracefully when their env vars are absent: `SESSION_SECRET`
  falls back to a built-in default and `/api/announcements` returns `{"announcements":[]}`.
- `SHOW_DISCORD_LOGIN` in `lib/constants.ts` is hardcoded `false`, so the Discord login
  button is intentionally hidden on the landing page.
- To exercise the Discord-dependent features, copy `.env.example` to `.env.local` and fill
  in real Discord credentials (see `README.md`). These require a real Discord application,
  bot token, and guild/channel IDs — they cannot be tested without external Discord setup.
- `npm run build` / `npm start` and `docker compose up` are production paths; use
  `npm run dev` for development.
