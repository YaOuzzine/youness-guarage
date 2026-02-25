# Master AI Context: Youness Garage MVP

## 1. Project Purpose (The "Why")

This is a Minimum Viable Product (MVP) web application for "Youness's Garage", an airport parking and vehicle service hub.

- **Goal:** Allow guests to seamlessly book parking spots and add-on services (car wash, EV charging) online, while providing a functional admin dashboard for the garage owner to manage daily arrivals, departures, and service queues.
- **Strategy:** Rapid, reliable deployment using a free-tier hosting stack (Neon, Render, Vercel) with an architecture designed to scale.

## 2. Architecture & Stack (The "What")

This project operates as a monorepo managed by **Turborepo**.

**Core Technologies:**

- **Language:** Strict TypeScript.
- **Database:** PostgreSQL (hosted via Neon).
- **ORM:** Drizzle (web-client direct-to-Neon), TypeORM (API).
- **Backend (`apps/api`):** Node.js / Express.
- **Frontend (`apps/web-client`):** React (Next.js App Router), Tailwind CSS.
- **Infrastructure:** Docker for local containerization; Terraform for infrastructure as code.

**Directory Structure:**

- `apps/web-client/`: The public-facing guest booking site AND role-protected admin dashboard at `/admin/*`. Focus on SEO, mobile-first conversions, and admin scannability.
- `apps/api/`: The backend API handling business logic and TypeORM database interactions.
- `packages/shared/`: Shared TypeScript types, utility functions, and core UI components.

## 3. Agent Directives (The "How")

When operating in this codebase, you must strictly adhere to the following behavioral and coding rules:

### State Tracking & Workflow

- **Incremental Progress:** Do not attempt to build the entire system at once. Pick a single vertical slice (e.g., the booking database entity), implement it, verify it, and commit it.
- **Progress File:** Maintain a `PROGRESS.md` file in the root directory. Start every session by reading it to get up to speed. End every session by updating it with what was completed and what needs to be done next.
- **Source Control:** Use `git` to checkpoint your state. Write descriptive, conventional commit messages after completing any logical unit of work so we can revert if necessary.

### Coding Standards

- **TypeScript Mastery:** Enforce strong typing across the monorepo. Avoid `any`. Make heavy use of TypeScript generics and shared interfaces in `packages/shared/` to ensure the Next.js frontends and the Express API agree on data shapes.
- **Database Integrity:** Keep TypeORM entities clean and strictly typed. Never guess the shape of the database models; explicitly read the entities in `apps/api/src/entities` before writing queries.
- **UI/UX:** The admin dashboard must prioritize scannability. Use clear visual indicators (like a soap icon for a car wash or a lightning bolt for EV charging) so the garage staff can process vehicles quickly.

### Communication & Execution

- **Be Direct:** Provide fact-based, concise progress reports. Omit self-celebratory updates or conversational filler.
- **Self-Verification:** Before declaring a feature complete, verify that it runs without breaking the existing environment.
- **Ask for Clarification:** If you encounter a conflict in business logic (e.g., how to handle overlapping booking dates or invalid pricing), stop and ask for clarification rather than assuming the rules.
