# Youness Garage MVP — Task Breakdown

> **Single source of truth** for implementation progress.
> Check off tasks (`[x]`) as they are completed and verified.
> Each phase must be finished before its dependents can begin.

---

## Summary Statistics

| Metric               | Value                                            |
| -------------------- | ------------------------------------------------ |
| Total phases         | 12 (0–11)                                        |
| Total tasks          | 84                                               |
| Critical-path length | 0 → 1 → 4 → 5 → 6A → 6B/6C → 7 → 8 → 9 → 10 → 11 |

## Phase Dependency Graph

```
Phase 0  ──┬──▸ Phase 1 ──┐
            ├──▸ Phase 2   │
            └──▸ Phase 3 ──┤
                            ▼
                        Phase 4
                            │
                            ▼
                        Phase 5
                            │
                            ▼
                        Phase 6A
                        ┌───┴───┐
                        ▼       ▼
                    Phase 6B  Phase 6C
                        └───┬───┘
                            ▼
                        Phase 7
                            │
                            ▼
                        Phase 8
                            │
                            ▼
                        Phase 9
                            │
                            ▼
                        Phase 10
                            │
                            ▼
                        Phase 11
```

---

## Phase 0 — Repository Bootstrap & Tooling

**Depends on:** nothing
**Goal:** Establish the monorepo skeleton, install tooling, and wire up Turborepo.

- [x] **0.1** — Initialize git repository
      Run `git init`, create `.gitignore` (Node, macOS, IDE, `.env*`, `dist/`, `.turbo/`).

- [x] **0.2** — Create root `package.json` with Turborepo
      Set `"private": true`, add `turbo`, `typescript` as devDependencies, define `workspaces: ["apps/*", "packages/*"]`.

- [x] **0.3** — Add root `turbo.json`
      Define pipelines: `build`, `dev`, `lint`, `test`. Set proper `dependsOn` and `outputs`.

- [x] **0.4** — Add root `tsconfig.base.json`
      Strict mode, `ES2022` target, path aliases (`@youness-garage/shared`).

- [x] **0.5** — Scaffold workspace directories
      Create empty folders: `apps/api/`, `apps/web-client/`, `apps/web-admin/`, `packages/shared/`.

- [x] **0.6** — Add shared ESLint + Prettier config
      Install `eslint`, `prettier`, `@typescript-eslint/*` at root. Create `.eslintrc.js` and `.prettierrc`.

- [x] **0.7** — Create `PROGRESS.md`
      Initialize with the current date and "Phase 0 in progress" entry.

**Verify:** `npx turbo build` resolves workspaces without errors (no source code yet, so empty builds are fine).

---

## Phase 1 — Docker & Local Environment

**Depends on:** Phase 0
**Goal:** Containerize the local dev stack so every developer gets an identical Postgres + API + frontend setup.

- [x] **1.1** — Create root `docker-compose.yml`
      Define services: `postgres` (image `postgres:16`, port 5432, volume for data persistence), `api` (build from `apps/api/Dockerfile`), `web-client` (build from `apps/web-client/Dockerfile`), `web-admin` (build from `apps/web-admin/Dockerfile`).

- [x] **1.2** — Create `.env.example`
      Document all required env vars: `DATABASE_URL`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `API_PORT`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_API_URL`.

- [x] **1.3** — Create `apps/api/Dockerfile`
      Multi-stage build: install deps → compile TS → slim runtime image.

- [x] **1.4** — Create `apps/web-client/Dockerfile`
      Next.js standalone output build.

- [x] **1.5** — Create `apps/web-admin/Dockerfile`
      Next.js standalone output build.

**Verify:** `docker compose up --build` starts Postgres and all three app containers. Postgres accepts connections on `localhost:5432`.

---

## Phase 2 — Terraform Infrastructure as Code

**Depends on:** Phase 0
**Goal:** Codify the production infrastructure (Neon, Render, Vercel) so deployments are reproducible.

- [x] **2.1** — Create `infra/terraform/main.tf`
      Configure Terraform providers, required versions, and backend state (local file for MVP).

- [x] **2.2** — Create `infra/terraform/neon.tf`
      Provision a Neon project and database. Output `DATABASE_URL`.

- [x] **2.3** — Create `infra/terraform/render.tf`
      Define a Render web service for `apps/api`. Reference Docker build.

- [x] **2.4** — Create `infra/terraform/vercel.tf`
      Define Vercel projects for `apps/web-client` and `apps/web-admin`. Link to monorepo root paths.

**Verify:** `terraform validate` passes in `infra/terraform/`.

---

## Phase 3 — Shared Package (Types & Utils)

**Depends on:** Phase 0
**Goal:** Build the `@youness-garage/shared` package that both frontends and the API import.

- [x] **3.1** — Create `packages/shared/package.json`
      Name: `@youness-garage/shared`, main entry `dist/index.js`, types `dist/index.d.ts`.

- [x] **3.2** — Create `packages/shared/tsconfig.json`
      Extend `../../tsconfig.base.json`. Set `outDir: "dist"`, `rootDir: "src"`.

- [x] **3.3** — Define booking types — `packages/shared/src/types/booking.ts`
      Interfaces: `CreateBookingDto`, `BookingResponse`, `BookingStatus` enum (`PENDING`, `CONFIRMED`, `CHECKED_IN`, `CHECKED_OUT`, `CANCELLED`).

- [x] **3.4** — Define add-on types — `packages/shared/src/types/addon.ts`
      Interfaces: `AddonType` enum (`CAR_WASH`, `EV_CHARGING`), `CreateAddonDto`, `AddonResponse`.

- [x] **3.5** — Define common utility types — `packages/shared/src/types/common.ts`
      `PaginatedResponse<T>`, `ApiError`, `ApiSuccessResponse<T>`.

- [x] **3.6** — Create barrel export — `packages/shared/src/index.ts`
      Re-export everything from `types/`.

**Verify:** `npx turbo build --filter=@youness-garage/shared` compiles to `dist/` without errors.

---

## Phase 4 — Database Layer (Entities & Migrations)

**Depends on:** Phases 1, 3
**Goal:** Define TypeORM entities and run the first migration to create all core tables.

- [x] **4.1** — Initialize `apps/api/package.json`
      Add dependencies: `express`, `typeorm`, `pg`, `reflect-metadata`, `dotenv`. Add devDependencies: `typescript`, `ts-node`, `@types/express`. Reference `@youness-garage/shared`.

- [x] **4.2** — Create `apps/api/tsconfig.json`
      Extend root base, enable `experimentalDecorators`, `emitDecoratorMetadata`. Set `outDir: "dist"`.

- [x] **4.3** — Create TypeORM data source — `apps/api/src/data-source.ts`
      Configure `DataSource` with Postgres connection (from `DATABASE_URL`), entities glob, migrations glob, logging enabled in dev.

- [x] **4.4** — Create `Booking` entity — `apps/api/src/entities/Booking.ts`
      Columns: `id` (UUID PK), `guestName`, `guestEmail`, `guestPhone`, `licensePlate`, `vehicleMake`, `vehicleModel`, `checkIn` (timestamptz), `checkOut` (timestamptz), `spotNumber` (int, nullable), `status` (enum from shared), `totalPrice` (decimal), `stripePaymentIntentId` (nullable), `createdAt`, `updatedAt`.

- [x] **4.5** — Create `Addon` entity — `apps/api/src/entities/Addon.ts`
      Columns: `id` (UUID PK), `bookingId` (FK → Booking), `type` (enum from shared), `status` (`PENDING` | `IN_PROGRESS` | `DONE`), `price` (decimal), `notes` (text, nullable), `createdAt`, `updatedAt`. Relation: `ManyToOne` → Booking (with `OneToMany` inverse on Booking).

- [x] **4.6** — Create `ParkingSpot` entity — `apps/api/src/entities/ParkingSpot.ts`
      Columns: `id` (int PK, auto-increment), `label` (string, unique), `isAvailable` (boolean, default true), `type` (`STANDARD` | `EV`).

- [x] **4.7** — Generate and run initial migration
      `npx typeorm migration:generate -d src/data-source.ts src/migrations/InitialSchema`. Run with `npx typeorm migration:run`.

**Verify:** Connect to the Postgres container and confirm tables `booking`, `addon`, `parking_spot` exist with the correct columns.

---

## Phase 5 — API Foundation (Express / Middleware)

**Depends on:** Phase 4
**Goal:** Stand up the Express server with standard middleware, health check, and error handling.

- [x] **5.1** — Create API entry point — `apps/api/src/index.ts`
      Import `reflect-metadata`, initialize the DataSource, then start Express on `API_PORT` (default 4000).

- [x] **5.2** — Add middleware stack — `apps/api/src/middleware/`
      Files: `cors.ts` (configure allowed origins), `json.ts` (express.json), `requestLogger.ts` (morgan or custom), `errorHandler.ts` (global async error handler mapping to `ApiError`).

- [x] **5.3** — Create router scaffold — `apps/api/src/routes/index.ts`
      Mount sub-routers: `/api/health`, `/api/bookings`, `/api/addons`, `/api/spots`. For now, only `/api/health` returns `{ status: "ok" }`.

- [x] **5.4** — Add validation utility — `apps/api/src/utils/validate.ts`
      Thin wrapper around `zod` (or manual checks) that throws `ApiError` on invalid input.

- [x] **5.5** — Add `dev` script to `apps/api/package.json`
      Use `node --loader ts-node/esm --no-warnings --watch src/index.ts` for hot-reloading.

- [x] **5.6** — Wire API into Turborepo dev pipeline
      Verified `turbo.json` already has correct `dev` config (`persistent: true, cache: false`).

**Verify:** `curl http://localhost:4000/api/health` returns `{ "status": "ok" }`.

---

## Phase 6A — Booking API Routes

**Depends on:** Phase 5
**Goal:** Full CRUD + status transitions for bookings, plus parking-spot assignment.

- [x] **6A.1** — Create booking service — `apps/api/src/services/BookingService.ts`
      Methods: `create(dto)`, `findAll(filters)`, `findById(id)`, `updateStatus(id, status)`, `cancel(id)`. Use the TypeORM repository pattern. Enforce business rules (no overlapping dates for the same spot, valid status transitions).

- [x] **6A.2** — Create spot service — `apps/api/src/services/SpotService.ts`
      Methods: `findAvailable(checkIn, checkOut, type?)`, `assign(spotId, bookingId)`, `release(spotId)`.

- [x] **6A.3** — Create booking routes — `apps/api/src/routes/bookings.ts`
      `POST /api/bookings` — create a booking and auto-assign a spot.
      `GET /api/bookings` — list with pagination, date range, and status filters.
      `GET /api/bookings/:id` — single booking detail.
      `PATCH /api/bookings/:id/status` — transition status (admin).
      `DELETE /api/bookings/:id` — cancel booking and release spot.

- [x] **6A.4** — Create spot routes — `apps/api/src/routes/spots.ts`
      `GET /api/spots` — list all spots with availability.
      `GET /api/spots/available` — filter by date range and type.

- [x] **6A.5** — Add request-validation schemas
      Zod schemas for `CreateBookingDto`, status-transition body, and query params.

- [x] **6A.6** — Seed script — `apps/api/src/seeds/seed.ts`
      Insert 20 parking spots (15 STANDARD, 5 EV). Optionally insert sample bookings.

**Verify:** Use `curl` or a REST client to create a booking, list bookings, change status, and cancel.

---

## Phase 6B — Web Client (Guest Booking Site)

**Depends on:** Phase 6A
**Goal:** Build the public-facing Next.js app where guests search availability and book a spot.

- [ ] **6B.1** — Initialize `apps/web-client/`
      `npx create-next-app@latest` with App Router, TypeScript, Tailwind. Add `@youness-garage/shared` as a dependency.

- [ ] **6B.2** — Create layout & global styles — `apps/web-client/src/app/layout.tsx`
      Responsive shell: header (logo + nav), main content, footer. Mobile-first Tailwind breakpoints.

- [ ] **6B.3** — Build landing page — `apps/web-client/src/app/page.tsx`
      Hero section with tagline ("Airport Parking, Simplified"), CTA button ("Book Now"), feature highlights (car wash, EV charging). SEO metadata.

- [ ] **6B.4** — Build availability checker — `apps/web-client/src/app/book/page.tsx`
      Form: check-in date, check-out date, vehicle type (standard/EV). On submit, call `GET /api/spots/available` and display results.

- [ ] **6B.5** — Build booking form — `apps/web-client/src/app/book/confirm/page.tsx`
      Collect guest info (name, email, phone, license plate, vehicle make/model), select add-ons (car wash, EV charging checkboxes with prices). Show price summary.

- [ ] **6B.6** — Build confirmation page — `apps/web-client/src/app/book/success/page.tsx`
      Display booking reference, dates, spot number, add-ons, total paid.

- [ ] **6B.7** — Create API client utility — `apps/web-client/src/lib/api.ts`
      Typed `fetch` wrapper using shared types. Base URL from `NEXT_PUBLIC_API_URL`.

**Verify:** Complete a full booking flow in the browser: land → check availability → fill form → see confirmation.

---

## Phase 6C — Web Admin (Dashboard)

**Depends on:** Phase 6A
**Goal:** Internal dashboard for the garage owner to manage daily operations.

- [ ] **6C.1** — Initialize `apps/web-admin/`
      `npx create-next-app@latest` with App Router, TypeScript, Tailwind. Add `@youness-garage/shared`.

- [ ] **6C.2** — Create admin layout — `apps/web-admin/src/app/layout.tsx`
      Sidebar navigation: Dashboard, Bookings, Parking Map, Services. Top bar with "Youness's Garage — Admin".

- [ ] **6C.3** — Build dashboard overview — `apps/web-admin/src/app/page.tsx`
      Summary cards: today's arrivals count, today's departures count, active bookings, pending services. Quick-glance numbers.

- [ ] **6C.4** — Build bookings table — `apps/web-admin/src/app/bookings/page.tsx`
      Sortable, filterable data table. Columns: guest name, license plate, dates, spot, status badge, add-on icons. Visual indicators: soap icon (car wash), lightning bolt (EV charging).

- [ ] **6C.5** — Build booking detail view — `apps/web-admin/src/app/bookings/[id]/page.tsx`
      Full booking info. Status-transition buttons (Confirm → Check In → Check Out). Add-on management.

- [ ] **6C.6** — Build parking map view — `apps/web-admin/src/app/spots/page.tsx`
      Grid of spot cards. Color-coded: green (available), red (occupied), blue (EV). Click to see assigned booking.

- [ ] **6C.7** — Build services queue — `apps/web-admin/src/app/services/page.tsx`
      List of pending and in-progress add-on tasks. Mark as done. Filter by type (car wash / EV charging).

**Verify:** Navigate the admin dashboard, view bookings, change a booking status, and mark a service as done.

---

## Phase 7 — Add-On Services (Car Wash / EV Charging)

**Depends on:** Phases 6B, 6C
**Goal:** Full add-on lifecycle from guest selection through admin completion.

- [ ] **7.1** — Create addon service — `apps/api/src/services/AddonService.ts`
      Methods: `create(bookingId, dto)`, `findByBooking(bookingId)`, `findPending()`, `updateStatus(id, status)`.

- [ ] **7.2** — Create addon routes — `apps/api/src/routes/addons.ts`
      `POST /api/bookings/:bookingId/addons` — add an add-on to a booking.
      `GET /api/addons?status=PENDING` — admin: list pending services.
      `PATCH /api/addons/:id/status` — admin: transition add-on status.

- [ ] **7.3** — Add pricing logic — `apps/api/src/utils/pricing.ts`
      Calculate parking price (per-day rate × number of days) plus add-on prices. Export `calculateTotal(booking, addons)`.

- [ ] **7.4** — Integrate add-ons into guest booking flow
      Update `apps/web-client/src/app/book/confirm/page.tsx` to call the addon creation endpoint after booking is created.

- [ ] **7.5** — Integrate add-on indicators into admin bookings table
      Update `apps/web-admin/src/app/bookings/page.tsx` to display soap and lightning-bolt icons based on addon types.

- [ ] **7.6** — Wire services queue to addon API
      Connect `apps/web-admin/src/app/services/page.tsx` to real data from `GET /api/addons`.

**Verify:** Create a booking with a car wash add-on. Verify it appears in the admin services queue. Mark it done and confirm the status updates.

---

## Phase 8 — Payment Integration (Stripe)

**Depends on:** Phase 7
**Goal:** Accept payments via Stripe Checkout and confirm bookings upon successful payment.

- [ ] **8.1** — Install Stripe SDK
      Add `stripe` to `apps/api` dependencies. Add `@stripe/stripe-js` to `apps/web-client`.

- [ ] **8.2** — Create payment service — `apps/api/src/services/PaymentService.ts`
      Methods: `createCheckoutSession(booking, addons)` — returns a Stripe Checkout URL. `handleWebhook(event)` — process `checkout.session.completed` to confirm booking.

- [ ] **8.3** — Create payment routes — `apps/api/src/routes/payments.ts`
      `POST /api/bookings/:id/checkout` — create Stripe checkout session.
      `POST /api/webhooks/stripe` — handle Stripe webhooks (raw body parsing).

- [ ] **8.4** — Integrate Stripe into guest booking flow
      After form submission in `apps/web-client`, redirect to Stripe Checkout. On success, redirect to `/book/success`.

- [ ] **8.5** — Add payment status to admin dashboard
      Show payment status badge on bookings table. Display Stripe payment intent ID on booking detail view.

**Verify:** Complete a booking with Stripe test-mode payment. Confirm the webhook fires and booking status updates to `CONFIRMED`.

---

## Phase 9 — Testing

**Depends on:** Phase 8
**Goal:** Establish baseline test coverage for critical paths.

- [ ] **9.1** — Set up testing infrastructure
      Install `vitest` at root. Add `test` script to Turborepo pipeline. Configure coverage thresholds.

- [ ] **9.2** — Unit tests for shared package
      Test type guards, utility functions, and enum helpers in `packages/shared/`.

- [ ] **9.3** — Unit tests for API services
      Test `BookingService`, `SpotService`, `AddonService`, `PaymentService` with mocked repositories.

- [ ] **9.4** — Integration tests for API routes
      Use `supertest` against the Express app. Test full booking lifecycle: create → confirm → check-in → check-out.

- [ ] **9.5** — Component tests for web-client
      Test the booking form, availability checker, and confirmation page rendering.

- [ ] **9.6** — Component tests for web-admin
      Test the bookings table, status transitions, and services queue.

**Verify:** `npx turbo test` passes all suites. Coverage report is generated.

---

## Phase 10 — Production Deployment

**Depends on:** Phase 9
**Goal:** Deploy the full stack to free-tier hosting.

- [ ] **10.1** — Provision Neon database
      Apply Terraform or manually create. Run migrations against production `DATABASE_URL`.

- [ ] **10.2** — Deploy API to Render
      Connect repo, set build command, set environment variables. Verify health check.

- [ ] **10.3** — Deploy web-client to Vercel
      Import project, set root directory to `apps/web-client`, configure `NEXT_PUBLIC_API_URL`.

- [ ] **10.4** — Deploy web-admin to Vercel
      Import project, set root directory to `apps/web-admin`, configure `NEXT_PUBLIC_API_URL`.

- [ ] **10.5** — Configure Stripe webhooks for production
      Set the webhook endpoint to the Render API URL. Add signing secret to env vars.

- [ ] **10.6** — Smoke test production
      Run through the full booking flow on the live site. Verify admin dashboard loads correctly.

**Verify:** All three services are live and accessible. A test booking can be completed end-to-end.

---

## Phase 11 — Polish & Hardening

**Depends on:** Phase 10
**Goal:** Final quality pass before handoff.

- [ ] **11.1** — Add rate limiting to API
      Use `express-rate-limit` on public routes. Separate limits for booking creation vs. reads.

- [ ] **11.2** — Add input sanitization
      Sanitize all string inputs to prevent XSS. Validate email format, phone format.

- [ ] **11.3** — Add API response caching
      Cache `GET /api/spots/available` results for 30 seconds. Use `Cache-Control` headers on static-ish endpoints.

- [ ] **11.4** — SEO optimization for web-client
      Add OpenGraph meta tags, structured data (LocalBusiness schema), sitemap.xml, robots.txt.

- [ ] **11.5** — Accessibility audit
      Ensure WCAG 2.1 AA compliance: keyboard navigation, ARIA labels, color contrast, screen reader testing.

- [ ] **11.6** — Final documentation
      Update `README.md` with setup instructions, architecture diagram, and deployment guide.

**Verify:** Lighthouse scores > 90 for Performance, Accessibility, Best Practices, SEO on the web-client.

---

## Appendix A — Target File Tree

```
youness-guarage/
├── CLAUDE.md
├── PROGRESS.md
├── plan.md
├── package.json                        # Root workspace config
├── turbo.json
├── tsconfig.base.json
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── .env.example
├── docker-compose.yml
│
├── infra/
│   └── terraform/
│       ├── main.tf
│       ├── neon.tf
│       ├── render.tf
│       └── vercel.tf
│
├── packages/
│   └── shared/
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts
│           └── types/
│               ├── booking.ts
│               ├── addon.ts
│               └── common.ts
│
├── apps/
│   ├── api/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── Dockerfile
│   │   └── src/
│   │       ├── index.ts
│   │       ├── data-source.ts
│   │       ├── entities/
│   │       │   ├── Booking.ts
│   │       │   ├── Addon.ts
│   │       │   └── ParkingSpot.ts
│   │       ├── migrations/
│   │       ├── routes/
│   │       │   ├── index.ts
│   │       │   ├── bookings.ts
│   │       │   ├── spots.ts
│   │       │   ├── addons.ts
│   │       │   └── payments.ts
│   │       ├── services/
│   │       │   ├── BookingService.ts
│   │       │   ├── SpotService.ts
│   │       │   ├── AddonService.ts
│   │       │   └── PaymentService.ts
│   │       ├── middleware/
│   │       │   ├── cors.ts
│   │       │   ├── json.ts
│   │       │   ├── requestLogger.ts
│   │       │   └── errorHandler.ts
│   │       ├── utils/
│   │       │   ├── validate.ts
│   │       │   └── pricing.ts
│   │       └── seeds/
│   │           └── seed.ts
│   │
│   ├── web-client/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── Dockerfile
│   │   ├── next.config.js
│   │   ├── tailwind.config.ts
│   │   └── src/
│   │       ├── app/
│   │       │   ├── layout.tsx
│   │       │   ├── page.tsx
│   │       │   └── book/
│   │       │       ├── page.tsx
│   │       │       ├── confirm/
│   │       │       │   └── page.tsx
│   │       │       └── success/
│   │       │           └── page.tsx
│   │       └── lib/
│   │           └── api.ts
│   │
│   └── web-admin/
│       ├── package.json
│       ├── tsconfig.json
│       ├── Dockerfile
│       ├── next.config.js
│       ├── tailwind.config.ts
│       └── src/
│           └── app/
│               ├── layout.tsx
│               ├── page.tsx
│               ├── bookings/
│               │   ├── page.tsx
│               │   └── [id]/
│               │       └── page.tsx
│               ├── spots/
│               │   └── page.tsx
│               └── services/
│                   └── page.tsx
```

## Appendix B — Critical Files

| File                                            | Why It Matters                                              |
| ----------------------------------------------- | ----------------------------------------------------------- |
| `packages/shared/src/types/booking.ts`          | Contract between API and frontends — must stay in sync      |
| `apps/api/src/entities/Booking.ts`              | Core data model — every feature depends on this             |
| `apps/api/src/data-source.ts`                   | Database connection — nothing works without it              |
| `apps/api/src/services/BookingService.ts`       | Central business logic — booking rules enforced here        |
| `apps/api/src/routes/bookings.ts`               | Public API surface — breaking changes affect both frontends |
| `apps/web-client/src/app/book/confirm/page.tsx` | Revenue-critical — this is where guests commit to booking   |
| `apps/web-admin/src/app/bookings/page.tsx`      | Operations-critical — staff use this every day              |
| `docker-compose.yml`                            | Local dev environment — broken = no one can develop         |
