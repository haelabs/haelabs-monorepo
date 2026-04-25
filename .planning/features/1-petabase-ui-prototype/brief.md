# Feature Brief: Petabase UI Prototype (Mock Data Only)

## Metadata

- Slug: `1-petabase-ui-prototype`
- Status: `intake`
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
- Mock auth can be represented with UI-only success/failure states and local prototype navigation.
- Calendar, billing, consultation, and management flows can use seeded mock datasets and deterministic local state.
- Thai/English support should be preserved at the layout/content level even if some prototype copy starts in one language before full localization pass.
- Repo-level planning sources `.planning/PROJECT.md`, `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, and `.planning/ROADMAP.md` are currently absent, so this brief is grounded in `AGENTS.md`, `DESIGN.md`, and `.planning/features/*` artifacts.

## Open Questions

- Should this prototype live behind existing locale-aware app routes, or in a dedicated prototype section within `apps/petabase`?
- How much interaction fidelity is expected for mock auth, appointment state transitions, billing calculations, and CRUD modals/forms?
- Is the target deliverable a fully connected clickable prototype across all modules, or a collection of representative screens with local navigation?
- Should print-friendly consultation/invoice layouts be implemented as dedicated routes, print styles on existing screens, or both?
- Are there preferred mock personas, clinic branches, staff roles, and patient records that should anchor the prototype dataset?

## Acceptance Criteria

- `apps/petabase` exposes a coherent mock-data-only prototype covering dashboard, auth, patients, appointments, consultation/SOAP, billing, and organization/user management flows.
- Core navigation and screen transitions make it possible to move through representative clinic workflows without backend integration.
- Appointment, billing, and consultation UIs visibly represent the requested states, filters, and forms using mock data.
- Patient and owner views clearly show linked relationships, history, and documents in a staff-usable Calm Ops layout.
- Organization, branch, staff, role, and permission views are present as UI prototype screens within `apps/petabase`.
- The prototype follows existing Petabase design tokens, shell patterns, locale-aware structure, and mobile/desktop behavior expectations.
