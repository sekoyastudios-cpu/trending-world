# The Search Atlas — PRD

## Original problem statement
"create a website based on must searched ting on the world and make money with that everyday"

## Concept
The Search Atlas — an editorial / Swiss-brutalist site about the most googled things in the world. It blends three experiences and bakes in tasteful monetization:
1. **Atlas (showcase)** — All-time most searched terms.
2. **Dashboard (control room)** — Filterable per-country + per-category trends with chart, table, search.
3. **Higher / Lower (game)** — Guess which of two terms is searched more.
4. **Monetization** — Sponsored slot, affiliate "shelf", Monday newsletter signup.

## Audience / personas
- Curious skimmers ("doom-scroll, but with stats").
- Data / trends nerds who want filterable, sourceable lists.
- Casual gamers (5-minute coffee-break players).
- Future advertisers/sponsors (single tasteful slot per issue).

## Tech / Architecture
- **Backend**: FastAPI, Motor (MongoDB), all routes under `/api`. Seeded trend dataset (no external Trends API yet).
- **Frontend**: React 19 + react-router + Tailwind + shadcn/ui + recharts + sonner.
- **Theme**: Swiss / High-Contrast light. Cabinet Grotesk (display) + IBM Plex Mono (data) + IBM Plex Sans (body). Red `#FF3B30` accent only.

## What's implemented (2026-02)
- Backend endpoints: `/trends/all-time`, `/trends/now` (country+category+limit), `/trends/ticker`, `/trends/countries`, `/trends/categories`, `/game/pair`, `/game/guess`, `/newsletter/subscribe` (idempotent), `/sponsored`, `/affiliates`, `/affiliates/click`, `/affiliates/stats`.
- 12 country datasets (Global, US, IN, BR, JP, DE, GB, FR, NG, ID, MX, KR) × 10 trends each + 15 all-time terms across 8 categories.
- Frontend routes: `/` (Atlas), `/dashboard`, `/game`.
- Components: Header, Ticker (CSS marquee), Hero, CategoryCards, Dashboard (Select + bar chart + table + search), Sponsored, Affiliates (with click tracking), Newsletter, Footer, Higher/Lower Game with persisted best score.
- **Monetization v2 (2026-02)**: 4 AdSense-ready slots (3 on home, 1 on dashboard, 1 on game) controlled by env vars `REACT_APP_ADSENSE_CLIENT`, `REACT_APP_ADSENSE_SLOT_TOP/MID/FOOTER/GAME`. Slots render branded placeholders until configured. Affiliate clicks are recorded server-side for performance analytics.
- Testing: 18/18 backend pytest tests pass; full frontend flows verified by testing agent.

## How to activate AdSense (no code changes needed)
1. Get approved by Google AdSense → copy your `ca-pub-XXXX` publisher id.
2. Edit `/app/frontend/public/index.html` and replace `__ADSENSE_CLIENT__` with your `ca-pub-XXXX`.
3. Add to `frontend/.env`:
   ```
   REACT_APP_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXX
   REACT_APP_ADSENSE_SLOT_TOP=1234567890
   REACT_APP_ADSENSE_SLOT_MID=2345678901
   REACT_APP_ADSENSE_SLOT_FOOTER=3456789012
   REACT_APP_ADSENSE_SLOT_GAME=4567890123
   ```
4. `sudo supervisorctl restart frontend`. Live ads appear in all 4 slots.

## Backlog
### P0 (next iteration)
- Persist game scores per session/user, leaderboard.
- Real Google Trends-style data refresh (cron + cache); pluggable provider.

### P1
- Map / world-heat-map view of search volumes per country.
- Per-category landing pages with SEO (server-rendered metadata).
- Admin: edit seed data / sponsored slot via a tiny CMS panel.

### P2
- Auth + saved searches.
- "Today in search" daily archive page (perma-linkable).
- Stripe-powered "Sponsor this week" self-serve checkout.

## How money is made (current scaffolding)
- One sponsored slot per issue (premium, single placement).
- Affiliate "Shelf" with trending products (Amazon-style tags).
- Newsletter list → future paid placements.
