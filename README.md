# basheer.app

Ahmad Basheer's digital HQ — a premium, content-driven Next.js platform built as a long-term foundation, not a portfolio one-off.

## Stack

- **Next.js 15** (App Router, Server Components, standalone output)
- **TypeScript** strict
- **Tailwind CSS** with custom editorial theme
- **MDX** content for projects and writing (`gray-matter` + `next-mdx-remote/rsc`)
- **Framer Motion** for restrained motion
- **Zod** for form validation
- **Geist Sans / Geist Mono / Newsreader** typography

## Project structure

```
app/                   # routes (home, work, writing, about, contact, api)
  api/contact/         # contact form handler (extension point for CRM/email)
  work/[slug]/         # case study pages
  writing/[slug]/      # article pages
components/
  layout/              # header, footer, container, section
  home/                # homepage sections
  work/                # project card
  writing/             # article card
  contact/             # contact form
  ui/                  # button, input, badge primitives
  common/              # mdx components, reveal animation
content/
  projects/*.mdx       # case studies (frontmatter + body)
  writing/*.mdx        # articles
data/
  site.ts              # site config
  navigation.ts        # nav structure
  capabilities.ts      # capabilities content
lib/
  content/projects.ts  # MDX project loader
  content/writing.ts   # MDX article loader
  seo.ts               # metadata builder
  utils.ts             # cn, date helpers
```

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## Adding content

### A new project

Drop a new MDX file in `content/projects/`:

```mdx
---
title: "Project name"
slug: "project-slug"
category: "Internal Platform"
summary: "One-line summary."
problem: "What was broken."
solution: "What was built."
status: "live"
featured: true
date: "2026-01-01"
stack: ["Next.js", "PostgreSQL"]
outcomes: ["Outcome one", "Outcome two"]
---

## Overview

Markdown / MDX body…
```

It will appear automatically on `/work` and (if `featured: true`) on the homepage.

### A new article

Drop a new MDX file in `content/writing/`:

```mdx
---
title: "Title"
slug: "title-slug"
excerpt: "One sentence."
date: "2026-01-01"
tags: ["systems"]
---

Markdown body…
```

## Deployment — Easypanel

This repo ships with a multi-stage `Dockerfile` and an `easypanel.json` template.

Easypanel setup (App service):

1. **Source** → GitHub → `bashhh89/thisisbasheer` (branch: `main`)
2. **Build** → Dockerfile (uses the included `Dockerfile`)
3. **Port** → `3000`
4. **Environment**:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `HOSTNAME=0.0.0.0`
   - `NEXT_PUBLIC_SITE_URL=https://basheer.app`
5. **Domain** → attach `basheer.app` (Easypanel handles TLS)

The image runs as non-root, listens on `$PORT`, and includes a `HEALTHCHECK`.

### Build locally with Docker

```bash
docker build -t basheer-app .
docker run -p 3000:3000 basheer-app
```

## Architecture notes

The site is structured as the front end of a much larger machine. Three boundaries are kept clean so future expansion (admin, CRM integration, AI-assisted publishing, auth) can land without rebuilding the foundation:

1. **Content layer** (`content/` + `lib/content/*`) — file-based today, swappable for a database-backed CMS later without touching pages.
2. **Page composition** (`app/`) — pages stay thin, pull from data and lib, never embed copy or state.
3. **API surface** (`app/api/*`) — server actions and route handlers are the seam where persistence, auth, and integrations get added.

When the time comes for `/admin`, `/dashboard`, or auth-gated client areas, they slot in alongside the existing routes without disrupting the public site.
