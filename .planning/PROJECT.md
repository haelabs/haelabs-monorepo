# Petabase - Veterinary PIMS MVP

## What This Is

Petabase is a bilingual (Thai/English), mobile-first veterinary practice information management system (PIMS) focused on clinics in Thailand. It combines clinic operations workflows across dashboarding, patient records, appointments, consultations, and billing into one staff-facing web app backed by a role-aware API. This MVP establishes the data and product foundation for clinic operations before post-MVP expansion.

## Core Value

Clinic staff can run core day-to-day veterinary operations in one localized system without relying on expensive or poorly localized alternatives.

## Requirements

### Validated

- ✓ Nx + pnpm monorepo foundation with deployable app boundaries is operational - existing
- ✓ `apps/petabase` Next.js app with locale-first routing shell is operational - existing
- ✓ `apps/api` NestJS API foundation with standardized response/error envelope is operational - existing
- ✓ Shared workspace build/lint/test/typecheck workflows are wired and executable - existing

### Active

- [ ] Dashboard + Auth flows (UI first with mock data, then real auth APIs)
- [ ] Patient + Owner management (search, profile, history, linking)
- [ ] Appointment scheduling (calendar, sloting, status lifecycle, anti-double-booking)
- [ ] Consultation + SOAP notes with prescriptions and document support
- [ ] Billing + invoicing with payments, statuses, and revenue summaries
- [ ] Organization + branch + staff management with role/permission model
- [ ] Thai/English i18n continuity across UI and backend-facing content

### Out of Scope

- Inventory management for products/stock/expiry - explicitly Phase 2 after MVP core operations are stable
- Reporting and analytics dashboards/exports - explicitly Phase 2 after transactional workflows are validated
- Native mobile apps - web-first delivery is required for MVP speed and cost

## Context

The codebase already contains the monorepo foundation, API scaffold, and petabase web scaffold. The immediate effort is feature delivery, not workspace bootstrapping. Product direction prioritizes Thai clinic operations constraints: bilingual UX, mobile-friendly workflows, and practical role-based staff operations. MVP is intentionally split into UI-prototype-first (Phase 1A) and backend implementation/integration (Phase 1B), then post-MVP expansion (Phase 2).

## Constraints

- **Localization**: Thai/English bilingual support from the start - core market requirement
- **Platform**: Mobile-first responsive web UX - clinic staff usage pattern across devices
- **Architecture**: `apps/petabase` (Next.js) + `apps/api` (NestJS) in existing Nx monorepo - aligns with established repository boundaries
- **Cost/Adoption**: MVP scope must stay focused on table-stakes clinic operations - affordability and time-to-value are key
- **Delivery Sequencing**: UI prototype modules precede backend wiring for faster iteration with stakeholders

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Build internal/admin capabilities inside `petabase` routes instead of a separate admin app | Matches repository product direction and avoids premature app fragmentation | - Pending |
| Deliver MVP in two waves (1A mock-driven UI, 1B real backend + integration) | Enables rapid workflow validation before full backend completion | - Pending |
| Keep API ownership in `apps/api` with role-aware REST endpoints | Preserves existing app boundaries and supports secure clinic operations | - Pending |
| Start with core clinic operations only (dashboard, patients, appointments, consultation, billing, org/user) | Maximizes MVP usefulness while keeping scope manageable | - Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-19 after initialization*
