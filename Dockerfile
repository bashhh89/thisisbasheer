# syntax=docker/dockerfile:1.7
# ─────────────────────────────────────────────────────────────────────────────
# basheer.app — production Dockerfile
# Multi-stage build, Next.js standalone output, runs as non-root.
# Easypanel-ready: exposes 3000, listens on $PORT, no privileged calls.
#
# Phase 1 additions: Prisma client + Postgres.
#   - openssl installed in every stage that touches the Prisma engine
#   - prisma/ schema copied BEFORE `npm ci` so the `postinstall` hook
#     (which runs `prisma generate`) has something to generate from
#   - runner stage has enough of Prisma to run `prisma migrate deploy`
#     on container boot (see `npm start` in package.json)
# ─────────────────────────────────────────────────────────────────────────────

# ── 1. deps ──────────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

COPY package.json package-lock.json* ./
# Schema must be present for the `postinstall` → `prisma generate` hook
COPY prisma ./prisma

RUN if [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi

# ── 2. builder ───────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# `npm run build` runs `prisma generate && next build`
RUN npm run build

# ── 3. runner ────────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Standalone Next.js runtime (smallest possible image)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# MDX content (projects + writing) lives outside .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/content ./content

# Prisma schema + migrations (needed for `prisma migrate deploy` at startup)
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Prisma CLI + generated client are NOT pulled into standalone automatically —
# copy them explicitly so `npm start` can run `prisma migrate deploy`.
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/prisma ./node_modules/prisma

# Minimal package.json so `npm start` finds the `start` script in the runner.
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

# Built-in healthcheck for Easypanel / Docker
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget --quiet --spider http://127.0.0.1:${PORT}/ || exit 1

# First boot runs the migration (creates ContactSubmission); subsequent boots
# are no-ops. Then the standalone Next.js server takes over.
#
# We call the prisma CLI by its real entrypoint instead of relying on the
# `node_modules/.bin/prisma` symlink — standalone output doesn't carry `.bin`
# over, so `npm start` → `prisma` → "not found". `node server.js` is the
# correct way to run a Next.js standalone build (no `next start` needed).
# If a previous rolling deploy killed a migration mid-apply, Prisma leaves a
# failed-migration marker that blocks all future deploys (P3009). The resolve
# call clears that marker for the cockpit migration (no-op otherwise); the
# migration SQL itself is idempotent, so re-applying over a partial apply is
# safe.
CMD ["sh", "-c", "node node_modules/prisma/build/index.js migrate resolve --rolled-back 20260612000000_cockpit 2>/dev/null; node node_modules/prisma/build/index.js migrate deploy && node server.js"]
