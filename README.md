# ChorobyMózgu.pl — Frontend

The web frontend of [chorobymozgu.pl](https://chorobymozgu.pl), the educational portal of the Brain Diseases Foundation (*Fundacja Chorób Mózgu*). It publishes articles on neurology and mental health, interactive data reports, and a map of treatment centres across Poland.

Built with **Next.js (App Router)** and backed by a **Strapi 5** headless CMS.

---

## Features

- **Articles**: category pages, article pages with galleries, tags, related posts and full-text search.
- **Latest materials**: the homepage mixes the newest articles with the latest videos from the Foundation's YouTube channel, sorted by publication date.
- **Reports** (`/raporty`): Tableau Public visualisations managed in the CMS, with auto-generated thumbnails and a full-window viewer.
- **Treatment centre map** (`/mapa`): Leaflet map with canvas-rendered markers. Facilities at the same address are grouped, and the map can be filtered by service type and searched by name or city.
- **Contact form**: messages are sent through the CMS, stored there and forwarded by e-mail. Includes rate limiting and a honeypot field.
- **Interactive brain** (`/brain`): explore brain regions and learn what each one is responsible for.
- **SEO**: metadata, Open Graph, a dynamic `sitemap.xml` and `robots.txt`.
- **Mobile first**: bottom navigation bar, swipeable sections and responsive layouts.

## Tech stack

| Area      | Technology                                        |
| --------- | ------------------------------------------------- |
| Framework | Next.js 16 (App Router, React Server Components)  |
| UI        | React 19, Tailwind CSS 4, daisyUI, Framer Motion  |
| Icons     | lucide-react, react-icons                         |
| Maps      | Leaflet                                           |
| CMS       | Strapi 5 (REST API)                               |
| Language  | TypeScript                                        |

## Project structure

```
src/
├── app/             # Routes (App Router): pages, sitemap, robots
├── api/             # Data access: Strapi, YouTube feed
├── components/      # Shared UI (cards, banners, reports, skeletons…)
├── Components/      # Feature components: homepage sections, map, categories
├── Layout/          # Navbar, footer, mobile bottom menu, transitions
├── types/           # Shared TypeScript types
└── utils/           # Helpers (Tableau embeds, content rendering)
```

## Getting started

### Prerequisites

- Node.js 20+
- A running instance of the CMS. See the **Strapi-FCHM** repository.

### Environment variables

Create `.env.local` in the project root:

```env
# Public URL of the Strapi server (used to resolve media files)
NEXT_PUBLIC_DOMAIN_URL="https://api.chorobymozgu.pl"
# Public URL of this site
NEXT_PUBLIC_CLEAR_URL="https://chorobymozgu.pl"
# Strapi REST API base URL
NEXT_PUBLIC_STRAPI_URL="https://api.chorobymozgu.pl/api"
```

### Development

```bash
npm install
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### Production

```bash
npm run build
npm run start
```

In production the app runs under [PM2](https://pm2.keymetrics.io/) behind an Nginx reverse proxy.

## Data and caching

| Data                       | Source                         | Refresh                    |
| -------------------------- | ------------------------------ | -------------------------- |
| Articles                   | Strapi                         | Fetched on every visit     |
| Reports list / report page | Strapi                         | Rendered on every request  |
| Latest report, YouTube     | Strapi, YouTube RSS            | Revalidated every 10 min   |
| Map locations              | Strapi                         | Revalidated every hour     |

## License

Proprietary. All rights reserved. This code may not be copied, modified or distributed without the owner's written permission.
