# Architecture Patterns

**Domain:** Veterinary PIMS MVP (subsequent milestone)
**Researched:** 2026-04-19
**Overall recommendation:** Keep a **modular monolith** in `apps/api` + feature-sliced Next app in `apps/petabase`, and enforce monorepo boundaries before adding workflow code.

## Recommended Architecture

Build on the existing Nx + Next.js + NestJS foundation as a **single deployable API** with strict feature modules, plus a single staff UI app with route-group + feature-slice organization.

Why this is lowest-risk now:
- You already have strong app boundaries (`apps/petabase`, `apps/api`) and cross-cutting API concerns in place (envelope, validation, logging).
- MVP workflows are tightly coupled (appointments → consultations → invoices), so splitting into microservices now would increase integration risk and delivery time.
- Nest’s module encapsulation is a good fit for domain boundaries inside one API deployable.

### Suggested system layout (mapped to this repo)

```text
apps/
  api/
    src/
      modules/
        auth/
        organizations/
        branches/
        users/
        roles/
        permissions/
        patients/
        owners/
        appointments/
        consultations/
        billing/
      infrastructure/
        persistence/      # DB adapters/repositories only
      shared/
        response/
        contracts/        # app-local shared DTO helpers (if needed)

  petabase/
    src/
      app/[locale]/
        (auth)/
        (dashboard)/
        admin/
      features/
        auth/
        dashboard/
        patients/
        appointments/
        consultations/
        billing/
        org-users/
      lib/
        api/              # low-level transport + auth header/cookie handling
        i18n/

packages/
  types/                  # shared contracts + enums (create first)
  sdk/                    # typed API client wrappers (create second)
```

## Component/Module Boundaries

### Boundary rule 1 (hard): app ownership
- `apps/petabase`: presentation, interaction, local view-model shaping only.
- `apps/api`: business rules, authorization checks, workflow state transitions.
- `packages/*`: shared contracts/utilities only; **no app runtime state**.

### Boundary rule 2 (hard): module ownership in `apps/api`

| Module | Owns | Must NOT own | Key integration points |
|---|---|---|---|
| `auth` | login/reset/token/session primitives | org/user profile CRUD | users, roles/permissions |
| `organizations` + `branches` | clinic tenant + branch master data | appointment or billing state | users, patients, billing |
| `users` + `roles` + `permissions` | staff identity + RBAC mapping | auth token issuance details | auth guards, every feature module |
| `patients` + `owners` | patient profile, owner profile, owner-pet links | slot allocation, invoice totals | appointments, consultations |
| `appointments` | schedule slots, lifecycle states, double-booking rule | SOAP details, invoice line math | consultations (create-from-appointment) |
| `consultations` | SOAP note, prescription, visit clinical record | payment settlement | appointments, billing |
| `billing` | invoices, payment records, outstanding balances | appointment slot logic | consultations, organizations |

Implementation constraint:
- Each module exports only service interfaces needed by other modules.
- Cross-module writes go through explicit service methods, not direct repository access.

### Boundary rule 3 (hard): data boundary
- Keep DB ownership in `apps/api` (matches current repo guidance).
- Use `infrastructure/persistence` adapters from feature services; keep domain logic in modules.
- Shared types (`packages/types`) should represent API contracts, not persistence entities.

## Data Flow and Integration Points

### End-to-end request flow (current foundation + recommended extension)

1. `apps/petabase` route/group page calls feature action/hook.
2. Feature uses `src/lib/api/client.ts` (or later `@haelabs/sdk`) to call `/api/v1/*`.
3. `apps/api` receives request → middleware logs request id.
4. Nest global pipe validates DTO input.
5. Auth/RBAC guard checks user/role/permission before controller handler.
6. Feature service executes domain logic and any cross-module service calls.
7. Response is normalized by response-envelope interceptor.
8. UI consumes `{ data, meta }` envelope and maps to locale-aware view state.

### Workflow integration map (MVP-critical)

```text
Auth -> Org/Branch -> Users/RBAC
Org/Branch + Users/RBAC -> Patients/Owners
Patients/Owners + Users(Roles) -> Appointments
Appointments + Patients -> Consultations(SOAP/Prescription)
Consultations + Org/Branch -> Billing(Invoices/Payments)
Billing -> Dashboard summaries
```

### Transaction boundaries (important to minimize rewrite risk)
- **Appointment booking**: single transaction for slot conflict check + appointment create.
- **Consultation completion**: single transaction for consultation status + generated medical record entries.
- **Invoice creation from consultation**: single transaction for invoice header + line items; payment recording separate transaction.

### Idempotency and concurrency points
- Appointment create/update endpoints should require conflict-safe checks (doctor + branch + time window).
- Payment recording should use idempotency key (client-generated) to prevent duplicate payments on retry.

## Patterns to Follow

### Pattern 1: Modular Monolith with Explicit Exports
**What:** Domain modules in `apps/api/src/modules/*`, imported by `AppModule`, each exposing minimal public providers.
**When:** MVP through at least initial production rollout.
**Why:** Fast iteration + clear seams for future extraction if needed.

### Pattern 2: Contract-First UI/API Integration
**What:** Define DTO/envelope contracts in `packages/types`, then consume in both API controllers and web client/sdk.
**When:** Before wiring each feature from mock to real API.
**Why:** Prevents drift between mock UI payloads and real API shapes.

### Pattern 3: Feature Slice in Next app
**What:** Keep route files thin; feature logic lives in `apps/petabase/src/features/<domain>`.
**When:** For all module migrations from mock to API.
**Why:** Makes it easy to replace mock adapters with API adapters incrementally.

## Anti-Patterns to Avoid

### Anti-Pattern 1: Shared “god” service
**What:** One large `ClinicService` handling patients, appointments, consults, billing.
**Why bad:** Erases boundaries, blocks parallel work, high regression blast radius.
**Instead:** Domain service per module + explicit cross-module orchestration.

### Anti-Pattern 2: DB entities leaked to frontend
**What:** Returning persistence models directly from controllers.
**Why bad:** Locks API to storage schema; migrations become breaking changes.
**Instead:** Stable API DTO contracts + mapping layer.

### Anti-Pattern 3: Enforcing access only in Next middleware
**What:** Trusting edge middleware/proxy alone for authorization.
**Why bad:** Middleware/proxy is routing-time guard; business authorization must still be server-enforced.
**Instead:** Keep UI guard for UX, enforce RBAC/permission in API guards and services.

## Suggested Build Order (for roadmap phase planning)

1. **Boundary Hardening + Shared Contracts Foundation**
   - Add `packages/types` real source, initial API DTOs/enums, response contract reuse.
   - Add Nx boundary enforcement rules (tags + `@nx/enforce-module-boundaries`) to prevent accidental cross-imports.
   - Rationale: prevents architectural erosion before feature velocity increases.

2. **Identity and Tenant Core (Auth + Org + Users + Roles/Permissions)**
   - Implement auth flows + RBAC guards and org/branch/user management APIs.
   - Wire sign-in and protected route behavior from mock to real.
   - Dependency reason: every clinical workflow needs actor identity + branch context.

3. **Master Clinical Records (Owners + Patients)**
   - Implement owner/patient CRUD, linking, search, photo/document placeholders.
   - UI patient module switches from mock to API.
   - Dependency reason: appointments/consultations cannot function without patient graph.

4. **Scheduling (Appointments)**
   - Slot generation, doctor availability, status lifecycle, anti-double-booking.
   - UI calendar/list wiring.
   - Dependency reason: consultations are typically spawned from appointment context.

5. **Clinical Encounter (Consultations + SOAP + Prescriptions)**
   - Consultation linked to appointment/patient, status transitions, printable view.
   - Dependency reason: billing derives from consultation outcomes.

6. **Revenue Flow (Billing + Payments + Summaries)**
   - Invoice creation from consultation/manual, payment recording, outstanding queries, dashboard aggregates.
   - Dependency reason: requires upstream consult/service data and org context.

7. **Stabilization + Observability + Hardening**
   - Contract tests across UI/API, audit logging, permission matrix validation, performance checks.
   - Dependency reason: reduce release risk before post-MVP expansion.

## Scalability Considerations

| Concern | At 100 users | At 10K users | At 1M users |
|---|---|---|---|
| API module coupling | Modular monolith is sufficient | Enforce strict module APIs + DB indexing | Consider extraction only for proven hotspots (e.g., appointments) |
| Appointment conflicts | App-level checks may suffice | DB-level unique/constraint strategy required | Dedicated scheduling service may be warranted |
| Reporting load | Inline aggregate queries acceptable | Materialized summaries / async jobs | Separate analytics pipeline (Phase 2+) |
| i18n consistency | Static dictionaries + key discipline | Add localization QA automation | Translation workflow + content service |

## Confidence and Validation Notes

- **HIGH confidence:** Modular monolith + feature modules + explicit exports in Nest (official Nest module docs).
- **HIGH confidence:** Route-group segmentation is valid in Next App Router.
- **MEDIUM confidence:** Nx boundary enforcement approach, because this repo does not yet contain the eslint boundary rule config; recommendation is based on official Nx docs but requires implementation verification in this workspace.
- **LOW confidence (needs phase-specific validation):** exact transaction/idempotency approach for billing/payments because no DB engine/schema is defined yet.

## Sources

1. Repo architecture baseline: `.planning/codebase/ARCHITECTURE.md` (workspace-local source, HIGH)
2. Project scope/context: `.planning/PROJECT.md` (workspace-local source, HIGH)
3. MVP feature sequencing: `requirements/58.md` (workspace-local source, HIGH)
4. NestJS Modules docs: https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/modules.md (official docs content mirror, HIGH)
5. NestJS Authorization docs: https://raw.githubusercontent.com/nestjs/docs.nestjs.com/master/content/security/authorization.md (official docs content mirror, HIGH)
6. Next.js Route Groups docs (v16.2.4): https://nextjs.org/docs/app/api-reference/file-conventions/route-groups (official docs, HIGH)
7. Next.js middleware/proxy docs (v16.2.4; middleware renamed to proxy): https://nextjs.org/docs/app/api-reference/file-conventions/proxy (official docs, HIGH)
8. Nx Enforce Module Boundaries docs: https://nx.dev/docs/features/enforce-module-boundaries (official docs, HIGH)
