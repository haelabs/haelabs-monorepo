# Feature Brief: Petabase UI Prototype (Mock Data Only)

## Metadata

- Slug: `1-petabase-ui-prototype`
- Status: `planned`
- Owner: `OpenAI agent`
- Updated: `2026-04-25`

## Goal

Create a high-fidelity Petabase staff-facing UI prototype in `apps/petabase` that covers core clinic workflows with mock data only, so the team can validate information architecture, screen coverage, interaction patterns, and Calm Ops visual direction before wiring real backend behavior.

## Why Now

- Petabase needs a cohesive end-to-end prototype across auth, dashboard, patient, appointment, consultation, billing, and organization management flows to make the product direction tangible.
- A mock-data-first pass reduces backend coupling, lets the team iterate quickly on bilingual staff UX, and establishes the baseline shell, screen patterns, and workflow expectations for later implementation phases.

## In Scope

- `apps/petabase` prototype screens and flows for mock auth: login, register, forgot-password.
- Dashboard UI for clinic overview, today’s appointments, quick stats, and recent activity.
- Patient management UI: searchable/filterable patient list, patient profile, owner card, medical history timeline, documents, and owner CRUD views with linked pets.
- Appointment scheduling UI: calendar views, slot grid, color-coded appointment states, appointment form, status flow display, and filterable list view.
- Consultation and SOAP note UI: consultation entry from appointment or patient profile, SOAP form, prescription section, history list, and print-friendly presentation.
- Billing and invoicing UI: invoice creation from consultation, line items, discount/tax support, invoice list/status filters, payment recording, and summary views.
- Organization and user management UI: org settings, branch CRUD, staff list, role badges/invite affordances, and permission matrix display.
- Mock data models, static/local prototype state, and UI interactions needed to demonstrate these flows without real auth or API integration.
- Alignment with existing Petabase design system, locale-first routing, mobile-first behavior, and Calm Ops shell patterns.

## Out of Scope

- Real authentication, session management, API calls, persistence, or backend integration in `apps/api`.
- Production authorization enforcement, audit logging, notifications, file upload storage, printing infrastructure, or payment gateway integrations.
- Final domain modeling for live data contracts beyond what is needed to support the prototype.
- New standalone admin app or repo structure changes outside `apps/petabase` and shared packages when reuse is clearly warranted.

## Constraints

- Keep the work repo-native under the feature workflow; no Jira or external tracker dependency.
- Preserve monorepo boundaries: deployable UI stays in `apps/petabase`, with shared code only moving into `packages/` when reuse is justified.
- Follow `DESIGN.md` and existing Petabase tokens/shell behavior; maintain the Calm Ops, bilingual, mobile-first direction.
- Use mock data only for this phase; avoid introducing unchecked env usage, backend coupling, or assumptions that require `apps/api` changes.
- Internal/admin-style organization and permission flows must remain inside `apps/petabase`, not a new app.

## Assumptions

- The prototype is intended to prioritize breadth of workflow coverage over production-complete business logic.
- Mock auth should behave as a fully interactive UI-only flow with believable success, failure, recovery, and navigation states, while remaining local and mock-data-only.
- Calendar, billing, consultation, and management flows should use seeded mock datasets and deterministic local state with full interaction fidelity for the prototype.
- Thai/English support should be preserved at the layout/content level even if some prototype copy starts in one language before full localization pass.
- The prototype should live inside the existing locale-aware app routing structure rather than in an isolated prototype-only route namespace.
- The deliverable is a fully connected clickable prototype across all requested modules, not just a representative screen set.
- Print-friendly consultation and invoice outputs should be supported through both dedicated routes and print styles on the corresponding in-app screens.
- The seed dataset should use a believable multi-branch clinic scenario centered on Paws & Care Veterinary Group, with Bangkok HQ, Rama 9, and Chiang Mai branch personas plus linked staff, owners, pets, appointments, consultations, and invoices.
- Repo-level planning sources `.planning/PROJECT.md`, `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, and `.planning/ROADMAP.md` are currently absent, so this brief is grounded in `AGENTS.md`, `DESIGN.md`, and `.planning/features/*` artifacts.

## Open Questions

- None at implementation close; the current prototype uses a default Paws & Care multi-branch seed dataset that can be refined later if the team wants specific clinic personas.

## Acceptance Criteria

- `apps/petabase` exposes a coherent mock-data-only prototype covering dashboard, auth, patients, appointments, consultation/SOAP, billing, and organization/user management flows.
- The prototype is implemented inside the existing locale-aware Petabase routing structure.
- Core navigation and screen transitions make it possible to move through full end-to-end clinic workflows without backend integration.
- Mock auth, appointment state transitions, billing calculations, and CRUD forms/modals behave with full prototype interaction fidelity using local state and mock data.
- Appointment, billing, and consultation UIs visibly represent the requested states, filters, forms, and status progressions using mock data.
- Patient and owner views clearly show linked relationships, history, and documents in a staff-usable Calm Ops layout.
- Organization, branch, staff, role, and permission views are present as UI prototype screens within `apps/petabase`.
- Consultation and invoice experiences include both dedicated print-friendly routes and print styles on relevant screens.
- The prototype follows existing Petabase design tokens, shell patterns, locale-aware structure, and mobile/desktop behavior expectations.
