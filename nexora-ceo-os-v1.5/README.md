# NEXORA CEO OS — v1.0 (Phase 1)

A fully offline personal operating system for running a company from one screen.
No login, no cloud, no APIs — all data lives locally in the browser (IndexedDB via Dexie).

## What's in Phase 1

- **Design system**: locked color tokens (#0B0B0D background / #D4AF37 gold accent), locked spacing scale (4→96px), locked radius scale (8→24px), Apple/Stripe/Linear-grade component primitives (Button, Card, Badge, ProgressRing, ProgressBar).
- **App shell**: sidebar navigation (Dashboard, Content Factory, Sales, Analytics, Settings), top bar with live clock/date.
- **Local database**: full schema for Content Pieces (16-stage lifecycle), Daily Tasks, Sprints, Activity Log, Weekly Reviews — ready for Phase 2 to build on top of.
- **Dashboard** (fully built): Current Sprint ring, Today's Top 3 Priorities, Productivity Score, KPI strip (Ideas/Design/Review/Approval/Scheduled/Published), Monthly Goal progress, Today's Progress, Today's Sales Tasks, Today's Content Tasks, Quick Actions, Recent Activity.
- **Content Factory / Sales / Analytics / Settings**: shell pages, ready to be filled in Phase 2 & 3.

Demo data seeds automatically on first run so the Dashboard isn't empty.

## Running it

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173). Works fully offline after `npm install`.

To build a static offline bundle you can open directly / host anywhere:

```bash
npm run build
```

Output goes to `dist/` — open `dist/index.html` in any browser, or serve the folder.

## Roadmap

- **Phase 2 — Content Factory**: full 16-stage lifecycle board, Content Card (all fields from the spec), Monthly Calendar with day cards, Sprint phases (Think → Write → Design → Review → Schedule → Performance).
- **Phase 3 — Daily Task System, Time Blocking, Weekly/Monthly Review, motion polish** (page transitions, hover states, animated counters, empty/error/success states).

## Tech

React 19 + TypeScript + Vite + Tailwind CSS v4 + Dexie (IndexedDB) + React Router + Lucide icons.
