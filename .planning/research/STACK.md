# Technology Stack

**Project:** Petabase (Veterinary PIMS MVP, Thailand clinics)  
**Researched:** 2026-04-19

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Node.js | **22.x LTS** (runtime baseline), compatible with 24.x | Runtime for Nx, Next, Nest | CI is already on Node 22; keeps runtime stable across web/API while avoiding re-architecture during MVP delivery | HIGH |
| Nx | **22.6.x** | Monorepo orchestration | Already in repo and current `latest` dist-tag; preserves existing project graph/boundaries | HIGH |
| pnpm | **10.x** | Workspace package manager | Already pinned; pnpm 10 supports Node 22/24 and is current docs line | HIGH |
| TypeScript | **5.9.x** | Shared type system | Already installed and aligned with modern ecosystem packages | HIGH |
| Next.js (petabase) | **15.5.x now**, plan controlled upgrade to **16.2.x** post-MVP hardening | Staff-facing web app | You already run 15.5.9. Moving to 16 immediately is optional, not required for MVP clinic workflows. Avoid churn now, upgrade after feature stabilization. | HIGH |
| React | **19.1.x** | UI runtime | Already in app and aligned with Next 15/16 era stack | HIGH |
| NestJS (api) | **11.1.x** | API framework | Already in place; current Nest core `latest` is 11.1.19 | HIGH |

### Database
| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| PostgreSQL | **16–18** (recommend managed **17** default) | Primary transactional store (patients, appointments, SOAP, billing, RBAC) | Strong relational integrity for clinic workflow dependencies + mature indexing + JSONB for selective flexible fields | HIGH |
| Prisma ORM | **7.7.x** (`prisma` + `@prisma/client`) | Type-safe DB access + migrations | Current stable major (`latest` dist-tag 7.7.0), strong TS DX, and good fit for rapid MVP CRUD + relations in Nest | HIGH |
| pg_trgm extension | bundled with PostgreSQL current releases | Fuzzy name search (owner/pet/phone/email typo tolerance) | Useful for real-world reception workflows where spelling and transliteration vary | HIGH |

### Infrastructure
| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|------------|
| Redis | **7.x** | Queue backend + short-lived cache (sessions/rate limiting/job state) | Standard pair with BullMQ for reminders/background jobs and resilient retries | MEDIUM |
| BullMQ + Nest adapter | **bullmq 5.74.x**, **@nestjs/bullmq 11.0.x** | Async jobs (appointment reminders, invoice post-processing, document tasks) | Fits Nest ecosystem and supports worker/producer separation cleanly | HIGH |
| S3-compatible object storage | AWS S3 API (`@aws-sdk/client-s3` **3.1032.x**) | File storage for patient photos/docs/attachments | Keeps binaries out of DB and supports cloud/local (MinIO-compatible) deployment patterns | MEDIUM |
| OpenAPI contract | `@nestjs/swagger` **11.3.x** + `openapi-typescript` **7.13.x** | API contract + client typing | Enables API-first integration with web app and reduces contract drift | HIGH |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt` | 11.x / current | Stateless auth in API | For login, access/refresh tokens, branch/org scoping, and route guards |
| `@node-rs/argon2` | 2.0.x | Password hashing | For credential storage/verification (avoid plaintext and avoid weaker hashes) |
| `class-validator` + `class-transformer` | 0.15.x / 0.5.x | DTO validation in Nest | For request validation pipeline and safer API boundaries |
| `zod` | 4.x | Shared runtime validation (web/env/contracts) | Use at frontend boundaries and shared schema packages |
| `next-intl` | 4.9.x | Thai/English i18n for Next App Router | Route + message + formatting consistency across locale-first UX |
| `@tanstack/react-query` | 5.99.x | Server-state caching/sync on web | For dashboard lists, filters, pagination, optimistic updates |
| `react-hook-form` + `@hookform/resolvers` | 7.72.x | Complex medical/billing forms | For SOAP, appointment, invoice forms with schema-based validation |
| `pino` | 10.3.x | Structured API logging | Keep correlation IDs and audit-relevant event traces |
| `supertest` + `playwright` + `vitest` | 7.2.x / 1.59.x / 4.1.x | API E2E + web E2E + unit/integration tests | For critical workflows (auth, booking, SOAP completion, payment posting) |

## Prescriptive Notes (Important for this codebase)

1. **Keep one auth authority in Nest API.**  
   Use Next.js as UI + session holder only; API mints/verifies JWT and enforces RBAC. This avoids split-brain auth logic across web and API.

2. **Use PostgreSQL as source of truth for all transactional modules.**  
   Appointments, SOAP, invoices, and payments are relationally coupled and need transactional guarantees.

3. **Implement RBAC in DB-backed policy tables, not hardcoded role strings only.**  
   Keep predefined role templates (Admin/Doctor/Nurse/Receptionist) but store effective permissions per org/branch.

4. **Do not re-platform runtime/frameworks during MVP feature wave.**  
   You already have Nx + Next + Nest scaffolds; prioritize delivery with additive libraries only.

## Thai/English i18n and Clinic-Data Constraints

- **i18n strategy:** Use `next-intl` for UI content and `Intl`-based formatting; keep locale route prefixes (`th`, `en`) and dictionary namespaces per module.
- **Date/time rule:** Persist timestamps in UTC (`timestamptz`), render in clinic locale/time zone in UI.
- **Input normalization:** Store canonical search fields (e.g., normalized phone, lowercase email) alongside display fields for reliable search.
- **Thai/English mixed data:** Keep clinician notes as original text; avoid forced machine translation in MVP. Add optional translated summary later if needed.
- **Search pragmatics:** Use `pg_trgm` for typo-tolerant patient/owner lookup before introducing external search engines.

## What NOT to Use (for this MVP context)

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Auth architecture | Nest JWT + guards (`@nestjs/jwt`, `passport-jwt`) | Auth.js/NextAuth as primary auth core | Auth.js docs now indicate transition to Better Auth and `next-auth@5` beta docs; for this API-centric monorepo it adds unnecessary dual-auth complexity |
| Data store | PostgreSQL + Prisma | MongoDB-first model | MVP workflows are relational/transactional (appointments ↔ consults ↔ invoices ↔ payments ↔ staff permissions) |
| API style | REST + OpenAPI | GraphQL-first | Slower MVP execution here; REST + Swagger is simpler for role-guarded CRUD workflows and generated clients |
| ORM in this repo phase | Prisma 7 | Drizzle ORM 1.0 beta path | Drizzle is promising, but current stable is still 0.x with 1.0 in beta; switching now adds migration risk without MVP benefit |
| Topology | Modular monolith in `apps/api` | Early microservices split | Premature operational complexity before workflow validation |

## Installation

```bash
# API (core MVP backend)
pnpm --filter @haelabs/api add @nestjs/jwt @nestjs/passport passport passport-jwt @nestjs/swagger @nestjs/bullmq bullmq prisma @prisma/client @node-rs/argon2 @aws-sdk/client-s3 supertest

# Web (core MVP frontend)
pnpm --filter @haelabs/petabase add next-intl @tanstack/react-query react-hook-form @hookform/resolvers

# Shared/dev
pnpm add -D openapi-typescript playwright vitest
```

## Sources

- Next.js docs (Latest 16.2.4 shown in docs nav): https://nextjs.org/docs  
- npm dist-tags, `next`: https://registry.npmjs.org/-/package/next/dist-tags  
- npm dist-tags, `nx`: https://registry.npmjs.org/-/package/nx/dist-tags  
- pnpm installation + compatibility (10.x docs): https://pnpm.io/installation  
- Nest releases (`v11.1.19` latest): https://github.com/nestjs/nest/releases  
- npm dist-tags, `@nestjs/core`: https://registry.npmjs.org/-/package/@nestjs/core/dist-tags  
- Nest authentication docs: https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/security/authentication.md  
- Nest validation docs: https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/techniques/validation.md  
- Nest OpenAPI docs: https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/openapi/introduction.md  
- npm dist-tags, `prisma` / `@prisma/client`: https://registry.npmjs.org/-/package/prisma/dist-tags , https://registry.npmjs.org/-/package/@prisma/client/dist-tags  
- PostgreSQL current release docs + supported versions: https://www.postgresql.org/docs/current/release.html  
- PostgreSQL `json/jsonb` docs: https://www.postgresql.org/docs/current/datatype-json.html  
- PostgreSQL date/time + timezone behavior: https://www.postgresql.org/docs/current/datatype-datetime.html  
- PostgreSQL `pg_trgm` docs: https://www.postgresql.org/docs/current/pgtrgm.html  
- BullMQ docs: https://docs.bullmq.io/guide/introduction , https://docs.bullmq.io/guide/connections.md  
- npm dist-tags, `@nestjs/bullmq` / `bullmq`: https://registry.npmjs.org/-/package/@nestjs/bullmq/dist-tags , https://registry.npmjs.org/-/package/bullmq/dist-tags  
- next-intl App Router + dates/times docs: https://next-intl.dev/docs/getting-started/app-router , https://next-intl.dev/docs/usage/dates-times  
- npm dist-tags, `next-intl`: https://registry.npmjs.org/-/package/next-intl/dist-tags  
- npm dist-tags, `@tanstack/react-query`: https://registry.npmjs.org/-/package/@tanstack/react-query/dist-tags  
- npm dist-tags, `react-hook-form`: https://registry.npmjs.org/-/package/react-hook-form/dist-tags  
- Auth.js status + v5 beta note: https://authjs.dev/getting-started
