# Feature Plan: Petabase UI Prototype (Mock Data Only)

## Metadata

- Slug: `1-petabase-ui-prototype`
- Status: `planned`
- Owner: `OpenAI agent`
- Updated: `2026-04-25`

## Summary

Expand `apps/petabase` into a connected mock-data clinic operations prototype that covers auth, dashboard, patients, appointments, consultation/SOAP, billing, and organization management inside the existing locale-aware Calm Ops shell.

## Why

- The repo already contains early Phase 1 prototype screens for auth, dashboard, and admin; the feature needs end-to-end workflow coverage rather than isolated screens.
- A UI-only prototype gives the team a stable surface for IA, bilingual UX, shell behavior, and interaction review before any real API or auth coupling.

## In Scope

- Extend existing `apps/petabase` routes to cover patient, appointment, consultation, billing, and richer organization/staff flows.
- Introduce shared mock domain data and local interaction state for realistic CRUD, filtering, status, and workflow transitions.
- Preserve and reuse the existing locale-aware auth and dashboard shell patterns already in `apps/petabase`.
- Add print-friendly consultation and invoice views plus matching print styles.

## Out of Scope

- `apps/api` integration, persistence, real auth/session handling, payment gateways, file storage, or production authorization logic.
- New deployable apps, admin app extraction, or repo layout changes outside normal `apps -> packages` boundaries.
- Final production data contracts beyond what the mock prototype needs.

## Constraints

- Keep all primary work in `apps/petabase`; only move shared code to `packages/` if reuse becomes obvious.
- Maintain locale-first routing, Thai/English readability, and mobile-first behavior from the current Next.js app structure.
- Follow `DESIGN.md` and existing tokens in `apps/petabase/src/styles/tokens.css`; keep the UI clinical, low-noise, and staff-facing.
- Use deterministic mock data and local UI state only; do not add unchecked env usage or backend dependencies.
- Validation should follow repo order `lint -> typecheck -> test -> build`, noting that `apps/petabase` test coverage is currently placeholder-only.
- Repo-level planning files `.planning/PROJECT.md`, `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, and `.planning/ROADMAP.md` are absent, so implementation should continue to anchor on `AGENTS.md`, `DESIGN.md`, and current feature artifacts.

## Dependencies

- Existing app shell and responsive layout in `apps/petabase/src/components/shell/*` and `apps/petabase/src/app/[locale]/(dashboard)/layout.tsx`
- Existing auth routes in `apps/petabase/src/app/[locale]/(auth)/*`
- Existing prototype/dashboard/admin patterns in `apps/petabase/src/app/[locale]/(dashboard)/dashboard/page.tsx` and `apps/petabase/src/app/[locale]/admin/page.tsx`
- Existing i18n helpers in `@petabase/lib/i18n/*` and locale navigation helpers in `@petabase/lib/navigation/*`
- Existing global styles and tokens in `apps/petabase/src/app/globals.css` and `apps/petabase/src/styles/tokens.css`

## Acceptance Criteria

- Staff can navigate through mock auth, dashboard, patient, appointment, consultation, billing, and organization flows without leaving the existing locale-aware app structure.
- Each major module exposes realistic mock states: empty/filled views, filters, forms, status badges, and linked navigation between related records.
- Patient and owner data are visibly connected across list, detail, history, appointment, and billing surfaces.
- Appointment actions can drive local-state prototype transitions into consultation and invoice creation flows.
- Consultation and invoice screens are printable through dedicated routes or print-optimized views/styles.
- UI stays consistent with the existing Calm Ops shell, token usage, bilingual patterns, and breakpoint behavior.

## Implementation Notes

- Sequence work by shared foundations first, then module routes, then print/polish.
- Recommended phases:
  - Phase 1: inventory current routes/components and establish shared mock domain models, seeded records, status enums, formatters, and reusable badges/cards/tables as needed.
  - Phase 2: add patient and owner flows under the existing dashboard shell, including searchable list, profile, history timeline, documents, and related actions.
  - Phase 3: add appointment calendar/list/form flows with local-state transitions that deep-link into consultation entry.
  - Phase 4: add consultation/SOAP and billing/invoice flows, ensuring invoice creation can be reached from consultation and patient contexts.
  - Phase 5: expand org/staff/branch/permission screens where needed, then add print routes/styles and final responsive polish.
- Likely touched areas:
  - `apps/petabase/src/app/[locale]/...` for new route segments and print routes
  - `apps/petabase/src/features/*` for domain-specific components and mock state hooks/helpers
  - `apps/petabase/src/components/*` for reusable tables, filters, badges, timelines, and form primitives
  - `apps/petabase/src/lib/*` for shared mock data, formatters, and locale-aware helpers
  - `apps/petabase/src/app/globals.css` and related style modules only when current tokens/utilities are insufficient
- Prefer route names and folder groupings that match the user-visible domains (`patients`, `appointments`, `consultations`, `billing`, `admin`) instead of prototype-only namespaces.
- Keep mock datasets deterministic and believable so screenshots, demos, and future implementation diffs stay stable.

## Validation

- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- Focused smoke checks in `apps/petabase` for locale routing, responsive shell behavior, and print views
- Risks to watch:
  - route sprawl or inconsistent grouping between auth, dashboard, and admin areas
  - bilingual copy drift across newly added mock screens
  - mobile/tablet regressions if dense table layouts are not converted to stacked blocks
  - ad hoc styling that bypasses existing tokens or Calm Ops shell rules
