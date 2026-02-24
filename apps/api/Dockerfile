# ─────────────────────────────────────────────
# Stage 1: Prune monorepo to only api + its deps
# ─────────────────────────────────────────────
FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm add -g turbo

WORKDIR /app
COPY . .
RUN turbo prune @youness-garage/api --docker

# ─────────────────────────────────────────────
# Stage 2: Install dependencies (cached layer)
# ─────────────────────────────────────────────
FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
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
RUN pnpm turbo build --filter=@youness-garage/api...

# ─────────────────────────────────────────────
# Stage 4: Production runner
# ─────────────────────────────────────────────
FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 apiuser

COPY --from=builder --chown=apiuser:nodejs /app/apps/api/dist ./dist
COPY --from=builder --chown=apiuser:nodejs /app/apps/api/package.json ./package.json
COPY --from=builder --chown=apiuser:nodejs /app/node_modules ./node_modules

USER apiuser
EXPOSE 4000
CMD ["node", "dist/index.js"]
