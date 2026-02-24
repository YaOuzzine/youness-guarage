# ─────────────────────────────────────────────
# Stage 1: Prune monorepo to only web-client + its deps
# ─────────────────────────────────────────────
FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm add -g turbo

WORKDIR /app
COPY . .
RUN turbo prune @youness-garage/web-client --docker

# ─────────────────────────────────────────────
# Stage 2: Install dependencies (cached layer)
# ─────────────────────────────────────────────
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm fetch
COPY --from=pruner /app/out/full/ .
RUN pnpm install --frozen-lockfile --offline

# ─────────────────────────────────────────────
# Stage 3: Build
# ─────────────────────────────────────────────
FROM installer AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm turbo build --filter=@youness-garage/web-client...

# ─────────────────────────────────────────────
# Stage 4: Production runner (Next.js standalone)
# ─────────────────────────────────────────────
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat

WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web-client/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-client/.next/static ./apps/web-client/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web-client/public ./apps/web-client/public

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "apps/web-client/server.js"]
