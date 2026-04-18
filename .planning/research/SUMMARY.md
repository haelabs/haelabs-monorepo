# Project Research Summary

**Project:** Petabase - Veterinary PIMS MVP  
**Domain:** Staff-facing veterinary clinic practice management platform (Thailand, bilingual, mobile-first)  
**Researched:** 2026-04-19  
**Confidence:** MEDIUM

## Executive Summary

Petabase is a transactional clinic-operations product, not a content app: success depends on secure multi-tenant access control, data integrity, and clean workflow handoffs across patients, appointments, consultations, and billing. The research strongly supports building MVP on the existing Nx monorepo with a modular NestJS API (`apps/api`) and a feature-sliced Next.js app (`apps/petabase`), using PostgreSQL + Prisma as the system of record and enforcing API-first contracts via shared types.

The recommended approach is to ship table-stakes workflows first (RBAC + org/branch, patient/owner, scheduling, SOAP consultation, billing/payments), while keeping the architecture intentionally simple: modular monolith now, strict boundaries now, extraction later only if proven by load. Bilingual requirements (Thai/English), canonical status codes, UTC persistence, and mobile-first UI are first-order requirements for v1, not polish.

The highest risks are not framework choices but correctness failures: cross-tenant data leaks, scheduling race conditions, mutable clinical records without audit trails, and non-idempotent financial logic. Mitigation is explicit in roadmap sequencing: lock security and data contracts early, enforce DB-level constraints + idempotency, and gate post-MVP features on operational integrity KPIs.

## Key Findings

### Recommended Stack

The stack recommendation is conservative and delivery-oriented: keep current runtime/framework choices and add only what is needed for clinical workflow correctness. The strongest choices are Node 22 LTS, Nx 22, pnpm 10, TypeScript 5.9, Next 15.5 (upgrade to 16 post-hardening), Nest 11, PostgreSQL (managed 17 default), and Prisma 7.

**Core technologies:**
- **Nx + pnpm + TypeScript:** Monorepo orchestration, workspace consistency, and shared contracts with minimal rework risk.
- **Next.js (`apps/petabase`):** Staff UI shell with route groups, locale-first routing, and mobile-first workflow delivery.
- **NestJS (`apps/api`):** Single auth/authorization authority, workflow business rules, and modular domain services.
- **PostgreSQL + Prisma:** Relational integrity for coupled clinic transactions, typed data access, and reliable migrations.
- **Redis + BullMQ:** Background reminders/job workflows and retry-safe async processing.
- **OpenAPI + shared types (`packages/types`, `packages/sdk`):** Contract-first API/UI integration to reduce drift.

**Critical version guidance:**
- Keep **Next 15.5.x** during MVP; defer **Next 16.x** migration until feature hardening.
- Keep **Node 22.x LTS** baseline across CI/runtime.
- Standardize on **Prisma 7.x** and avoid ORM/platform swaps during MVP.

### Expected Features

**Must have (table stakes for v1):**
- RBAC with org/branch-scoped permissions (Admin/Doctor/Nurse/Reception).
- Patient + owner records with robust linking/search.
- Appointment calendar + status lifecycle + anti-double-booking controls.
- Consultation encounter with structured SOAP + prescriptions.
- Billing/invoicing + payment recording (including partial payments).
- Estimate-to-invoice linkage for charge traceability.
- Bilingual Thai/English and mobile-first workflows across modules.

**Should have (near-term differentiator):**
- Automated reminders via channel-agnostic event hooks (single channel first).

**Defer (v2+):**
- Inventory automation, advanced analytics/BI, online booking portal, client portal/app, broad AI documentation, heavy external integrations.

### Architecture Approach

Use a **modular monolith** in `apps/api` with strict domain modules (auth, org/branch, users/roles/permissions, patients/owners, appointments, consultations, billing) and explicit cross-module service interfaces. In `apps/petabase`, keep route files thin and move behavior to feature slices. Keep persistence ownership in API, keep shared packages contract-focused, and enforce Nx module boundaries early to prevent architectural erosion.

**Major components:**
1. **`apps/api` domain modules** — Own business rules, authorization, transactional boundaries, and workflow state transitions.
2. **`apps/petabase` feature slices** — Own UI orchestration, locale-aware presentation, and progressive migration from mock adapters to real API.
3. **`packages/types` + `packages/sdk`** — Own stable API contracts and typed client integration surface.

### Critical Pitfalls

1. **RBAC without tenant/branch/object scope** — Prevent with deny-by-default API policy layer, mandatory scoped queries, and IDOR tests.
2. **Scheduling race conditions/double-booking** — Prevent with atomic booking transactions, DB uniqueness/exclusion constraints, and race tests.
3. **Mutable clinical records without audit trail** — Prevent with append/amend model, signed/final states, and immutable audit events.
4. **Financial correctness bugs (float math + duplicate payment retries)** — Prevent with minor-unit money representation and idempotent payment commands.
5. **Consultation-to-invoice traceability gaps** — Prevent with enforced provenance links and non-destructive invoice adjustment patterns.

## Implications for Roadmap

Based on cross-research synthesis, phase order should follow dependency and risk containment, not UI convenience alone.

### Phase 1: Contract & Boundary Hardening (Foundation)
**Rationale:** Every downstream module depends on stable contracts, canonical enums, and import boundaries.  
**Delivers:** `packages/types` seed, API envelope/DTO baseline, locale-safe enums, Nx boundary enforcement, auth policy scaffolding.  
**Addresses:** Bilingual continuity, cross-module consistency, anti-drift between UI/API.  
**Avoids:** i18n data corruption, architectural erosion, frontend-only auth assumptions.

### Phase 2: Identity + Tenant Core (Auth, Org/Branch, Users, Permissions)
**Rationale:** Security and scoping must exist before clinical or financial data flows.  
**Delivers:** JWT auth, org/branch/user management, role templates + policy checks, scoped repositories, auth integration tests.  
**Addresses:** Table-stakes RBAC and org setup requirements.  
**Avoids:** Cross-clinic leaks, brittle role-matrix-only design.

### Phase 3: Master Records + Scheduling (Patients/Owners + Appointments)
**Rationale:** Appointments depend on clean patient graph and branch/provider context.  
**Delivers:** Owner-patient linkage model, search, duplicate controls, transactional scheduling, lifecycle states, anti-double-booking enforcement.  
**Addresses:** Patient management + appointment modules.  
**Avoids:** Duplicate/fragmented records, calendar integrity failures.

### Phase 4: Clinical Encounter + Billing Integration
**Rationale:** Revenue logic should be built from consultation outcomes with traceable lineage.  
**Delivers:** SOAP/prescription workflows, consultation finalization rules, consultation→invoice mapping, payment idempotency, outstanding balance queries.  
**Addresses:** Consultation + billing table stakes and estimate/invoice linkage.  
**Avoids:** Mutable clinical history, orphan invoice lines, reconciliation drift.

### Phase 5: Hardening & Controlled MVP+ Differentiator
**Rationale:** Stabilize correctness and observability before expansion features.  
**Delivers:** Audit logging, reconciliation jobs, race/security regression suites, performance checks, optional single-channel reminders.  
**Addresses:** Operational dashboard reliability and early retention uplift.  
**Avoids:** Premature Phase 2 scope creep and hidden correctness debt.

### Phase Ordering Rationale

- Security/data boundaries precede feature breadth because every module handles sensitive clinical/financial data.
- Patient/owner modeling must precede scheduling; scheduling must precede consultation; consultation must precede billing.
- Hardening is a mandatory precondition for Phase 2 (inventory/analytics), with KPI gates for integrity.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Identity + Tenant Core):** Needs explicit policy model validation and tenant/object-level authorization test strategy.
- **Phase 3 (Scheduling):** Needs DB-level conflict-control strategy finalization (unique vs exclusion constraints).
- **Phase 4 (Billing):** Needs financial data modeling validation (minor units/decimal strategy, ledger/event model, idempotency semantics).
- **Phase 5 (Reminders):** Needs provider/channel evaluation (SMS/email/LINE) and compliance constraints.

Phases with standard patterns (can likely skip deep research-phase):
- **Phase 1 (Contract & Boundary Hardening):** Well-documented Nx/Nest/Next patterns and internal repo alignment.
- **Core CRUD scaffolding in Phase 3:** Established patterns once contracts/scopes are fixed.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Mostly official docs + already-proven repo baseline; low novelty risk. |
| Features | MEDIUM | Strong internal scope clarity; competitive landscape partly vendor-marketing sourced. |
| Architecture | HIGH | Strong fit with existing monorepo and official framework guidance. |
| Pitfalls | HIGH | Backed by OWASP/Postgres/industry reliability patterns; concrete failure modes identified. |

**Overall confidence:** MEDIUM-HIGH (reported as MEDIUM for planning conservatism).

### Gaps to Address

- **Veterinary jurisdiction-specific compliance detail (Thailand):** run targeted compliance/legal research before production rollout.
- **Payment/tax localization specifics:** validate VAT/tax/receipt edge cases for Thailand accounting workflows.
- **Reminder channel operations:** confirm provider SLAs, delivery guarantees, consent handling, and cost model.
- **Document handling controls:** finalize malware scanning/CDR strategy and retention/access policy.

## Sources

### Primary (HIGH confidence)
- `.planning/PROJECT.md` — Product scope, constraints, sequencing.
- `requirements/58.md` — MVP phase requirements and success criteria.
- NestJS official docs (modules/auth/authorization/openapi/validation).
- Next.js official docs (App Router route groups, middleware/proxy patterns).
- Nx official module-boundary enforcement docs.
- PostgreSQL official docs (constraints, datetime/timezone, `pg_trgm`).
- OWASP cheat sheets (authorization, file upload, logging, session management).

### Secondary (MEDIUM confidence)
- Vendor ecosystem references (ezyVet, Provet, Digitail, Vetspire, NaVetor, Shepherd) for feature expectation patterns.
- BullMQ and supporting library release/docs alignment.

### Tertiary (LOW confidence)
- Veterinary-specific legal recordkeeping references noted as retrieval gaps in PITFALLS research; requires dedicated validation.

---
*Research completed: 2026-04-19*  
*Ready for roadmap: yes*
