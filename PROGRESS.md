# Progress Log

## 2026-02-23 — Phase 0: Repository Bootstrap & Tooling

### Completed

- [x] 0.1 — Git repo initialized, `.gitignore` created
- [x] 0.2 — Root `package.json` with Turborepo (pnpm workspaces)
- [x] 0.3 — `turbo.json` with v2 task syntax (build, dev, lint, test, check-types)
- [x] 0.4 — TypeScript config via `@youness-garage/typescript-config` package (base, nextjs, node, react-library)
- [x] 0.5 — Workspace directories scaffolded: `apps/api`, `apps/web-client`, `apps/web-admin`, `packages/shared`
- [x] 0.6 — ESLint via `@youness-garage/eslint-config` package (flat config, typescript-eslint, prettier integration). Prettier at root with `.prettierrc`.
- [x] 0.7 — `PROGRESS.md` created

### Notes

- Scaffolded using official `create-turbo@latest` (pnpm) then adapted to our architecture
- Config packages follow official Turborepo monorepo pattern: `packages/eslint-config`, `packages/typescript-config`
- Added a `node.js` ESLint config and `node.json` tsconfig for the Express API
- web-client and web-admin are stubs — will be initialized with `create-next-app` in Phases 6B/6C

### Next

- Phase 1: Docker & Local Environment
- Phase 2: Terraform IaC
- Phase 3: Shared Package types

---

## 2026-02-23 — Phase 1: Docker & Local Environment

### Completed

- [x] 1.1 — `docker-compose.yml` with postgres (16-alpine, healthcheck), api, web-client, web-admin services
- [x] 1.2 — `.env.example` with all required env vars documented
- [x] 1.3 — `apps/api/Dockerfile` — 4-stage build (prune → install → build → run) using `turbo prune --docker` + `pnpm fetch`
- [x] 1.4 — `apps/web-client/Dockerfile` — 4-stage Next.js standalone build
- [x] 1.5 — `apps/web-admin/Dockerfile` — 4-stage Next.js standalone build

### Notes

- All Dockerfiles use the official Turborepo Docker pattern: `turbo prune --docker` for minimal context, `pnpm fetch` for optimal layer caching
- `.dockerignore` created to exclude node_modules, .next, dist, etc.
- `docker compose config` validates without errors
- Postgres uses `service_healthy` condition so API waits for DB readiness
- Full `docker compose up --build` will work once apps have real build output (Phases 5, 6B, 6C)

### Next

- Phase 2: Terraform IaC
- Phase 3: Shared Package types

---

## 2026-02-23 — Phase 3: Shared Package Types

### Completed

- [x] 3.1 — `packages/shared/package.json` (done in Phase 0)
- [x] 3.2 — `packages/shared/tsconfig.json` (done in Phase 0)
- [x] 3.3 — Booking types: `BookingStatus` enum, `CreateBookingDto`, `BookingResponse` in `packages/shared/src/types/booking.ts`
- [x] 3.4 — Addon types: `AddonType`, `AddonStatus` enums, `CreateAddonDto`, `AddonResponse` in `packages/shared/src/types/addon.ts`
- [x] 3.5 — Common types: `PaginatedResponse<T>`, `ApiError`, `ApiSuccessResponse<T>`, `ParkingSpotType`, `ParkingSpotResponse` in `packages/shared/src/types/common.ts`
- [x] 3.6 — Barrel export updated in `packages/shared/src/index.ts` (uses `.js` extensions for NodeNext resolution)

### Notes

- `BookingResponse` imports `AddonResponse` from addon.ts — no circular deps (addon does not reference booking)
- `ParkingSpotType` and `ParkingSpotResponse` added to common.ts (needed by Phase 4 entities and Phase 6A routes)
- `pnpm turbo build --filter=@youness-garage/shared` compiles cleanly, all `.d.ts` and `.js` files emitted to `dist/`
- `pnpm run lint` passes across all packages

---

## 2026-02-23 — Phase 2: Terraform Infrastructure as Code

### Completed

- [x] 2.1 — `infra/terraform/main.tf` with providers: `kislerdm/neon` (~> 0.13.0), `render-oss/render` (~> 1.8.0), `vercel/vercel` (~> 4.6.0). Also `variables.tf` with sensitive vars for API keys.
- [x] 2.2 — `infra/terraform/neon.tf` — provisions `neon_project` + `neon_database`, outputs `database_url`
- [x] 2.3 — `infra/terraform/render.tf` — `render_web_service` for Express API with Docker build, env vars from Neon outputs
- [x] 2.4 — `infra/terraform/vercel.tf` — two `vercel_project` resources (web-client, web-admin) with env vars for API URL

### Notes

- Terraform is not installed locally — `terraform validate` could not be run. Validation deferred to CI/CD or manual run.
- Provider versions pinned to latest as of 2026-02-23
- Neon provider is community-maintained (`kislerdm/neon`), Render and Vercel providers are official
- Render `env_vars` reference Neon resource attributes directly to construct the DATABASE_URL

### Next

- Phase 4: Database Layer (Entities & Migrations) — depends on Phase 1 ✅ + Phase 3 ✅

---

## 2026-02-23 — Phase 4: Database Layer (Entities & Migrations)

### Completed

- [x] 4.1 — `apps/api/package.json` updated with runtime deps (express, typeorm, pg, reflect-metadata, dotenv, @youness-garage/shared), devDeps (ts-node, @types/express, @types/node), and migration scripts (typeorm, migration:generate, migration:run, migration:revert)
- [x] 4.2 — `apps/api/tsconfig.json` updated with `ts-node.esm: true` block and `exclude: ["dist", "node_modules"]`
- [x] 4.3 — `apps/api/src/data-source.ts` created — TypeORM DataSource with explicit entity imports, `import.meta.url`-based .env resolution, migration glob switching for ESM/compiled JS
- [x] 4.4 — `apps/api/src/entities/Booking.ts` — UUID PK, guest fields, timestamps, decimal(10,2) totalPrice with string→number transformer, varchar(32) status defaulting to PENDING, OneToMany → Addon with cascade
- [x] 4.5 — `apps/api/src/entities/Addon.ts` — UUID PK, explicit bookingId FK column + ManyToOne with onDelete CASCADE, varchar enums for type/status, decimal price with transformer
- [x] 4.6 — `apps/api/src/entities/ParkingSpot.ts` — auto-increment int PK, unique label, boolean isAvailable, varchar type defaulting to STANDARD
- [x] 4.7 — Migration `InitialSchema1771887326188` generated and executed — tables `booking`, `addon`, `parking_spot`, `migrations` confirmed in Postgres

### Notes

- Enum columns use `varchar` (not Postgres enum types) to avoid migration headaches when adding values; type safety enforced at TypeScript layer
- `Relation<T>` wrapper used on relation properties to prevent ESM circular-dependency issues
- Relations use string-based target (`'Addon'`, `'Booking'`) instead of arrow functions for ESM compatibility
- `typeorm-ts-node-esm` CLI binary used for migration commands (supports `emitDecoratorMetadata`)
- `pnpm --filter @youness-garage/api build` compiles with zero errors
- `pnpm --filter @youness-garage/api check-types` passes
- `pnpm lint` clean across monorepo (only turbo env-var warnings, no errors)

### Next

- Phase 5: API Foundation (Express / Middleware)

---

## 2026-02-23 — Phase 5: API Foundation (Express / Middleware)

### Completed

- [x] 5.1 — Updated `apps/api/package.json`: added runtime deps (`cors`, `morgan`, `zod`), devDeps (`@types/cors`, `@types/morgan`, `@types/express-serve-static-core`, `@types/connect`), updated `dev` script to `node --loader ts-node/esm --no-warnings --watch src/index.ts`
- [x] 5.2 — Created middleware stack in `apps/api/src/middleware/`:
  - `cors.ts` — reads `CORS_ORIGINS` env var (comma-separated), defaults to `localhost:3000,localhost:3001`
  - `json.ts` — wraps `express.json({ limit: '1mb' })`
  - `requestLogger.ts` — uses `morgan('dev')` in development, `morgan('combined')` in production
  - `errorHandler.ts` — `AppError` class (extends `Error`, matches shared `ApiError` shape) + 4-param error handler middleware
- [x] 5.3 — Created router scaffold in `apps/api/src/routes/`:
  - `index.ts` — main router mounting `/health`, `/bookings`, `/addons`, `/spots`
  - `health.ts` — `GET /api/health` returns `{ status: "ok" }`
  - `bookings.ts`, `addons.ts`, `spots.ts` — stubs returning 501 "Not implemented yet"
- [x] 5.4 — Created `apps/api/src/utils/validate.ts` — generic `validate<T>(schema, data)` using Zod `safeParse`, throws `AppError(400)` with formatted error messages
- [x] 5.5 — Replaced `apps/api/src/index.ts` with full Express bootstrap: `reflect-metadata` import, DataSource init, middleware stack (cors → json → logger), router at `/api`, error handler, listen on `API_PORT` (default 4000)
- [x] 5.6 — Verified turbo integration: `turbo.json` already has `dev: { persistent: true, cache: false }`

### Verification

- `pnpm --filter @youness-garage/api check-types` — passes
- `pnpm --filter @youness-garage/api build` — compiles with zero errors
- `pnpm lint` — clean (0 errors, 7 warnings: turbo env-var warnings + required `_next` param)

### Notes

- Express 5 natively catches rejected promises from async route handlers — no `express-async-errors` needed
- `@types/express-serve-static-core` and `@types/connect` added as devDeps to satisfy pnpm strict module resolution (TS2742 errors without them)
- Dev script uses `node --loader ts-node/esm` (not `tsx` or `ts-node-dev`) because it's the only option supporting both ESM and `emitDecoratorMetadata` (required by TypeORM)

### Next

- Phase 6A: Booking API Routes (services, full CRUD, validation schemas, seed script)

---

## 2026-02-23 — Phase 6A: Booking API Routes

### Completed

- [x] 6A.1 — Created `BookingService` (`apps/api/src/services/BookingService.ts`) with `create`, `findAll`, `findById`, `updateStatus`, `cancel` methods. Hardcoded pricing ($15/day STANDARD, $25/day EV). Status machine enforced via `VALID_TRANSITIONS` map.
- [x] 6A.2 — Created `SpotService` (`apps/api/src/services/SpotService.ts`) with `findAll`, `findAvailable` (NOT EXISTS subquery for overlap detection), `assign` (auto-assigns first available, 409 if none).
- [x] 6A.3 — Replaced `apps/api/src/routes/bookings.ts` stub with full CRUD: POST (create + auto-assign), GET (paginated + filters), GET /:id, PATCH /:id/status, DELETE /:id (cancel).
- [x] 6A.4 — Replaced `apps/api/src/routes/spots.ts` stub with GET / (list all, optional type filter) and GET /available (date range + type filter).
- [x] 6A.5 — Created Zod validation schemas (`apps/api/src/schemas/booking.schemas.ts`): `CreateBookingSchema`, `UpdateStatusSchema`, `BookingQuerySchema`, `SpotAvailabilityQuerySchema`.
- [x] 6A.6 — Created seed script (`apps/api/src/seeds/seed.ts`): idempotent, 20 parking spots (S-01..S-15 STANDARD + EV-01..EV-05 EV), 2 sample bookings. Added `seed` script to `package.json`.

### Additional Files Created

- `apps/api/src/mappers/bookingMapper.ts` — `toBookingResponse()`, `toAddonResponse()` (Date→ISO string, guards `addons ?? []`)
- `apps/api/src/mappers/spotMapper.ts` — `toParkingSpotResponse()`

### Verification

- `pnpm --filter @youness-garage/api check-types` — passes
- `pnpm --filter @youness-garage/api build` — compiles with zero errors
- `pnpm lint` — 0 errors, 7 warnings (pre-existing turbo env-var warnings + `_next` param)

### Notes

- Spot availability uses temporal overlap detection via NOT EXISTS subquery — `ParkingSpot.isAvailable` is an admin toggle (decommission flag), not used for temporal availability.
- Pricing is hardcoded in `BookingService` ($15/day STANDARD, $25/day EV). Will be extracted to `pricing.ts` in Phase 7.
- `BookingFilters.page` and `limit` made optional with defaults in the service to satisfy Zod's type inference with `.default()`.
- Express 5 async route handlers — no wrappers needed, Express 5 catches rejected promises natively.

### Next

- Phase 6B: Web Client (Guest Booking Site)
- Phase 6C: Web Admin (Dashboard)

---

## 2026-02-24 — Phase 6B: Web Client (Guest Booking Site)

### Completed

- [x] 6B.1 — Manual initialization of `apps/web-client/`: package.json with Next.js 15, React 19, Tailwind 3.4, material-symbols; tsconfig.json extending `@youness-garage/typescript-config/nextjs.json`; next.config.js with `output: 'standalone'` + `transpilePackages`; tailwind.config.ts with Stitch design tokens (charcoal, electric-teal, fresh-mint, glass-dark, glass-border, glow-teal, glow-mint); postcss.config.js; eslint.config.mjs
- [x] 6B.2 — Root layout with Inter font (next/font/google), globals.css with @tailwind directives + glass-card utility + toggle-checkbox styles, Header + Footer shell components
- [x] 6B.3 — Landing page from Stitch design: hero with "Premium Airport Parking" headline, BookingForm client component (airport select, date inputs, car wash/EV charging toggles, price estimate, "Reserve Spot" CTA), "Why Travelers Choose Us" section, photo gallery section
- [x] 6B.4 — Availability checker (`/book`): date inputs + spot type select → calls `getAvailableSpots` API → displays available spots as selectable cards
- [x] 6B.5 — Booking form (`/book/confirm`): reads search params, collects guest info (name, email, phone, vehicle details), calls `createBooking` API → redirects to success
- [x] 6B.6 — Confirmation page (`/book/success`): reads bookingId from params, calls `getBooking` API, displays full booking confirmation with add-ons and total
- [x] 6B.7 — API client utility (`src/lib/api.ts`): typed fetch wrapper with `getAvailableSpots`, `createBooking`, `getBooking`, `getBookings`
- [x] 6B.8 — Static pages from Stitch designs: Locations, Pricing, Services, Support, Login (form UI only), Legal
- [x] 6B.9 — Authenticated user pages under `/account/` route: layout with sidebar nav, Dashboard (session overview), History (past bookings table), Payments (billing management), Settings (account/vehicle management), Support (help center)

### Notes

- Used `account/` real path prefix instead of `(authenticated)` route group to avoid path collision with public `/support` page
- Header component includes mobile hamburger menu with state toggle
- BookingForm calculates estimated price based on dates and selected add-ons ($15/day + $15 car wash + $10 EV charging)
- Server Components used by default; `'use client'` only on interactive pages (BookingForm, login, booking flow, account pages)
- SEO metadata exports on all server component pages
- External image URLs from Stitch designs replaced with gradient placeholder divs

---

## 2026-02-24 — Phase 6C: Web Admin (Dashboard)

### Completed

- [x] 6C.1 — Manual initialization of `apps/web-admin/`: same approach as web-client, admin-specific Tailwind design tokens (primary #0df2f2, surface-dark, sidebar-dark, text-primary, text-secondary, etc.), `bg-page-gradient` background image, glass-panel utility in globals.css
- [x] 6C.2 — Admin layout with Sidebar (GarageOS logo, nav items with Material Symbols icons, active state with primary color indicator, user profile section) + TopBar (dynamic page title, search input, notification bell)
- [x] 6C.3 — Dashboard overview: 3 StatsCard components (Expected Arrivals 42, Departures 38, Pending Washes 12), Vehicle Management table with mock data (6 rows), StatusBadge + AddonIcon components
- [x] 6C.4 — Arrivals page: 3 KPI cards, arrivals table with guest/vehicle/terminal/ETA/status/action columns, Check-In buttons
- [x] 6C.5 — Departures page: 4 KPI cards, departures table with payment/service status, Check-Out buttons
- [x] 6C.6 — Services page: filter buttons (All Active, Car Wash, EV Charging), 6 service cards with priority badges and toggle switches, daily summary panel with SVG progress chart
- [x] 6C.7 — Settings page: Garage Capacity, Pricing Models, Service Packages, Staff Management sections with toggles and inputs

### Reusable Components Created

- `StatsCard.tsx` — glass-panel KPI card with icon, label, value, trend badge, background watermark icon
- `StatusBadge.tsx` — color-coded BookingStatus badge (PENDING=amber, CONFIRMED=blue, CHECKED_IN=emerald, CHECKED_OUT=purple, CANCELLED=rose)
- `AddonIcon.tsx` — soap icon (car wash) / lightning bolt (EV charging) per CLAUDE.md mandate
- `DataTable.tsx` — generic sortable table with pagination

### Verification

- `pnpm turbo build` — all 4 packages compile cleanly (shared, api, web-client 18 pages, web-admin 8 pages)
- `pnpm turbo check-types` — zero TypeScript errors across all packages
- `pnpm turbo lint` — 0 errors (only pre-existing warnings: turbo env-var declarations, `module` in CJS configs)

### Next

- Authentication (pre-Phase 7)
- Phase 7: Add-On Services (Car Wash / EV Charging) — addon API routes, pricing logic, integration into booking flow and admin services queue

---

## 2026-02-24 — Authentication System (JWT + httpOnly Cookies)

### Completed

- [x] Shared auth types — `UserRole` enum, `RegisterDto`, `LoginDto`, `UserResponse`, `AuthResponse` in `packages/shared/src/types/auth.ts`; barrel export updated; `BookingResponse` updated with nullable `userId`
- [x] User entity — `apps/api/src/entities/User.ts`: UUID PK, unique email, passwordHash, role (GUEST/ADMIN), firstName, lastName, phone; relations to Booking + RefreshToken
- [x] RefreshToken entity — `apps/api/src/entities/RefreshToken.ts`: UUID PK, userId FK, SHA-256 tokenHash, expiresAt, isRevoked
- [x] Booking entity updated — nullable `userId` column + `ManyToOne` to User (onDelete: SET NULL)
- [x] DataSource updated — registers User + RefreshToken entities
- [x] Dependencies installed — bcrypt, jsonwebtoken, cookie-parser + @types
- [x] Cookie parser middleware — `apps/api/src/middleware/cookieParser.ts`
- [x] Auth middleware — `apps/api/src/middleware/auth.ts`: `authenticate` (soft), `requireAuth` (401), `requireAdmin` (403) + Express `req.user` type augmentation
- [x] Auth schemas — `apps/api/src/schemas/auth.schemas.ts`: Zod `RegisterSchema`, `LoginSchema`
- [x] User mapper — `apps/api/src/mappers/userMapper.ts`: `toUserResponse()` (never exposes passwordHash)
- [x] Auth service — `apps/api/src/services/AuthService.ts`: `register`, `login`, `generateTokens` (JWT access + refresh with SHA-256 hash in DB), `refresh` (token rotation), `logout`, `getProfile`
- [x] Auth routes — `apps/api/src/routes/auth.ts`: register, login, refresh, logout, me — sets/clears httpOnly cookies
- [x] Routes mounted — `authRouter` at `/auth` in routes/index.ts
- [x] API entry point updated — cookie-parser + global `authenticate` middleware added to stack
- [x] Booking routes protected — `GET /api/bookings` (admin-only), `PATCH /:id/status` (admin-only), `DELETE /:id` (admin-only); `POST /` passes optional `req.user?.sub`
- [x] Booking mapper + service updated — includes `userId` in response; `create()` accepts optional `userId`
- [x] Seed updated — creates admin user `admin@youness-garage.com` / `admin123` with ADMIN role
- [x] `.env.example` updated — added `JWT_SECRET`
- [x] Web-client AuthContext — `apps/web-client/src/contexts/AuthContext.tsx`: `AuthProvider` + `useAuth()` hook with login/register/logout/auto-refresh
- [x] Web-client API updated — `credentials: 'include'` on all fetches; added `apiRegister`, `apiLogin`, `apiRefresh`, `apiLogout`, `apiGetMe`
- [x] Web-client login page wired — form submits to `useAuth().login()`, error state, redirect to `/account/dashboard` on success
- [x] Web-client register page — `apps/web-client/src/app/register/page.tsx` with firstName, lastName, email, password, phone fields
- [x] Web-client Header updated — shows user firstName + "My Account" link when logged in, "Sign In" when not
- [x] Web-client account layout — auth guard redirects to `/login` if not authenticated; logout button wired
- [x] Web-client root layout — wrapped with `<AuthProvider>`
- [x] Web-admin AuthContext — `apps/web-admin/src/contexts/AuthContext.tsx`: enforces `role === ADMIN` after login
- [x] Web-admin login page — `apps/web-admin/src/app/login/page.tsx`
- [x] Web-admin AdminShell — `apps/web-admin/src/components/AdminShell.tsx`: conditionally renders sidebar (hides on `/login`), redirects to `/login` if not admin
- [x] Web-admin layout updated — wrapped with `<AuthProvider>`, uses `AdminShell`
- [x] Web-admin Sidebar — shows user name from auth, logout button wired to `useAuth().logout()`

### Architecture

- JWT access tokens (15min) + refresh tokens (30 days) in httpOnly cookies — no XSS vector
- Refresh token rotation: old token revoked on each refresh, new pair issued
- Refresh tokens stored as SHA-256 hashes in DB — database leak doesn't expose raw tokens
- ADMIN role only via seed/DB — register endpoint always creates GUEST
- Anonymous bookings preserved — `userId` on Booking is nullable

### Route Protection

| Route | Level |
|-------|-------|
| `GET /api/health` | public |
| `POST /api/auth/register,login,refresh` | public |
| `POST /api/auth/logout`, `GET /api/auth/me` | authenticated |
| `POST /api/bookings` | public (optionally links to user) |
| `GET /api/bookings` (list all) | admin-only |
| `PATCH /api/bookings/:id/status` | admin-only |
| `DELETE /api/bookings/:id` | admin-only |
| `GET /api/bookings/:id` | public (UUID acts as bearer) |
| `GET /api/spots`, `GET /api/spots/available` | public |

### Verification

- `pnpm turbo check-types` — all 4 packages pass (0 errors)
- `pnpm turbo build` — all 4 packages build clean (shared, api, web-client 19 pages, web-admin 9 pages)

### Notes

- Migration for User + RefreshToken tables still needed — run `migration:generate` then `migration:run` against a live DB
- Social login buttons (Google/GitHub) present in UI but disabled for MVP
- Token flow: Login → cookies set → browser auto-sends → auth middleware → req.user → 401 triggers refresh → retry

### Next

- Generate and run DB migration for auth entities
- Phase 7: Add-On Services (Car Wash / EV Charging)

---

## 2026-02-24 — Checkout & Payment (Placeholder)

### Completed

- [x] Placeholder payment API — `apps/api/src/routes/payments.ts`: `POST /api/bookings/:id/checkout` simulates payment processing (1.5s delay) and confirms booking status. No Stripe SDK.
- [x] Payment route mounted at `/bookings` in routes/index.ts
- [x] Checkout page — `apps/web-client/src/app/book/checkout/page.tsx`: Stitch-designed payment UI with booking summary (left), payment form (right), credit card inputs with formatting, payment method tabs (Credit Card / Digital Wallet), "pay on arrival" toggle, trust badges, processing overlay with spinner
- [x] API client updated — `checkoutBooking(id)` function added to web-client api.ts
- [x] Booking flow updated — `/book/confirm` now redirects to `/book/checkout?bookingId=xxx` instead of `/book/success`

### Flow

```
/book → /book/confirm (creates booking, PENDING) → /book/checkout (Stitch payment UI)
  → "Pay & Confirm" → processing overlay → API confirms booking → /book/success
```

### Verification

- `pnpm turbo check-types` — all 4 packages pass (0 errors)
- `pnpm turbo build` — all 4 packages build clean (web-client now 20 pages including /book/checkout)

### Notes

- Payment is simulated — card form fields are visual only, no validation, no Stripe
- The checkout page fetches the real booking data from the API and displays actual prices
- Tax calculated at 8% placeholder rate
- When Stripe is integrated later, the checkout route will be replaced with a real Stripe Checkout session

### Next

- Generate and run DB migration for auth + booking userId
- Phase 7: Add-On Services
- Phase 8: Replace placeholder payment with real Stripe integration

---

## 2026-02-24 — Direct Neon DB Migration (Ditch Express API)

### Completed

**Phase 1: DB Layer in Web-Client**
- [x] Installed deps: `@neondatabase/serverless`, `drizzle-orm`, `bcryptjs`, `jose` (+ devDeps: `drizzle-kit`, `@types/bcryptjs`)
- [x] Created Drizzle schema (`src/lib/db/schema.ts`) matching existing TypeORM entities (user, booking, parkingSpot, addon, refreshToken)
- [x] Created DB connection singleton (`src/lib/db/index.ts`) using `neon()` + `drizzle()`
- [x] Created auth utilities (`src/lib/auth.ts`): password hashing (bcryptjs), JWT (jose HS256), refresh tokens (crypto SHA-256), cookie management

**Phase 2: Server Actions**
- [x] Auth actions (`src/app/actions/auth.ts`): register, login, logout, refreshSession, getMe, updateProfile
- [x] Booking actions (`src/app/actions/bookings.ts`): createBooking, getBooking, getMyBookings, getAllBookings (admin), updateBookingStatus (admin), cancelBooking, checkoutBooking
- [x] Spot actions (`src/app/actions/spots.ts`): getAllSpots, getAvailableSpots (temporal overlap detection)
- [x] Addon actions (`src/app/actions/addons.ts`): createAddon, getAllAddons (admin w/ booking join), updateAddonStatus (admin)

**Phase 3: Merge Admin into Web-Client**
- [x] Copied 7 admin components to `src/components/admin/` (Sidebar, TopBar, AdminShell, DataTable, StatsCard, StatusBadge, AddonIcon)
- [x] Created admin route group (`src/app/admin/`) with layout + 6 pages (dashboard, arrivals, departures, services, settings, login)
- [x] Added admin Tailwind tokens (admin-primary, admin-bg, admin-surface, admin-sidebar)
- [x] Added `.glass-panel` class to globals.css
- [x] Added `admin` namespace to i18n (en.ts + fr.ts)
- [x] Added Next.js middleware: JWT verification at edge for `/admin/*` (ADMIN role) and `/account/*` (any auth)

**Phase 4: Wire All Pages to Real Data**
- [x] Rewrote `src/lib/api.ts` as thin facade over server actions (all existing imports keep working)
- [x] AuthContext + login/register pages work via server actions (no changes needed)
- [x] Booking flow pages (`/book`, `/book/confirm`, `/book/checkout`, `/book/success`) work via api.ts facade
- [x] Admin Dashboard — fetches real bookings, computes stats, wires check-in/check-out buttons
- [x] Admin Arrivals — fetches CONFIRMED bookings, wires check-in action
- [x] Admin Departures — fetches CHECKED_IN bookings, computes overdue, wires check-out action
- [x] Admin Services — fetches real addons with booking info, wires status toggle
- [x] Account Dashboard — fetches most recent booking, dynamic service timeline, empty state
- [x] Account History — fetches user's bookings with pagination, real table data
- [x] Account Settings — fetches user profile, wires Save to updateProfile server action

**Phase 5: Verification**
- [x] `pnpm turbo check-types` — passes (0 errors)
- [x] `pnpm turbo build` — builds clean (26 pages compiled)
- [x] Cleaned up unused imports (drizzle-orm `sql`, `not`, `or`; unused `BookingResponse` import; unused `ADDON_PRICES`)
- [x] Added env vars to turbo.json: DATABASE_URL, JWT_SECRET, NODE_ENV

### Architecture Change

```
BEFORE: Express API (Render) → Neon DB ← Next.js web-client (Vercel) + Next.js web-admin (Vercel)
AFTER:  Next.js web-client (Vercel) → Neon DB directly via Drizzle ORM + server actions
```

- Express API stays in repo but is not deployed
- web-admin merged into web-client under `/admin` routes
- All data access via `'use server'` actions with direct DB queries
- JWT auth via `jose` (Edge-compatible) + `bcryptjs` (pure JS) — no native deps
- httpOnly cookies set/read via `next/headers` `cookies()`

### Files Summary

**New files (18):**
- `src/lib/db/schema.ts`, `src/lib/db/index.ts`, `src/lib/auth.ts`
- `src/app/actions/auth.ts`, `bookings.ts`, `spots.ts`, `addons.ts`
- `src/components/admin/` (7 component files)
- `src/app/admin/layout.tsx` + 6 page files
- `middleware.ts`

**Modified files (12):**
- `package.json` (new deps)
- `tailwind.config.ts` (admin colors)
- `globals.css` (glass-panel)
- `en.ts`, `fr.ts` (admin i18n)
- `api.ts` (facade over server actions)
- `admin/page.tsx`, `admin/arrivals/page.tsx`, `admin/departures/page.tsx`, `admin/services/page.tsx`
- `account/dashboard/page.tsx`, `account/history/page.tsx`, `account/settings/page.tsx`
- `turbo.json` (env vars)

### Deployment

Set on Vercel:
```
DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require
JWT_SECRET=<64-char random string>
```

Root Directory: `apps/web-client`
Build Command: `cd ../.. && pnpm install && pnpm --filter @youness-garage/shared build && pnpm --filter @youness-garage/web-client build`

### Next

- Deploy to Vercel with env vars
- Run existing TypeORM migrations against Neon DB to create tables (if starting fresh)
- Phase 7: Add-On Services integration into booking flow
- Phase 8: Stripe payment integration
