# Executive Summary
- Issue: Init vet-manage web app with Next.js — project structure, locale, common, util
- Source: haelabs/openclaw-team#33
- Promoted: 2026-04-14 10:05
- Handoff source: latest comment containing the handoff document

---

## 📋 Handoff Document

### Overview
This issue initializes the staff-facing web application inside the monorepo. The goal is to scaffold the Next.js App Router application, establish a maintainable project structure, enable Thai-first internationalization from day one, and create the shell and common utilities needed for future business features.

Important naming update from the latest approved comments:
- `petabase` is the confirmed product name replacing `vet-manage`
- implementation should use the current approved name in app paths, docs, and conventions where feasible
- admin/internal flows should remain inside the same app via route/path separation, not a separate app

Why this matters:
- creates the primary Phase 1 product surface for clinic staff
- ensures app structure is ready for auth, organization, scheduling, billing, and patient features
- avoids costly i18n retrofitting later
- keeps deployment and product boundaries simple during MVP

### Requirements
- [ ] Create the Next.js App Router app inside the Nx monorepo
- [ ] Use the approved product naming direction (`petabase`) where the rename is in scope
- [ ] Configure TypeScript, ESLint, Prettier, environment handling, and path aliases
- [ ] Establish a clear source structure for app routes, components, features, utilities, hooks, styles, and local types
- [ ] Set up Thai-first and English-secondary locale routing
- [ ] Add translation file structure and locale negotiation
- [ ] Add auth and dashboard route groups
- [ ] Add admin/internal route subtree inside the same app
- [ ] Add foundational layout components and UI utilities
- [ ] Ensure the app works with monorepo shared packages where available
- [ ] Ensure `nx serve` and `nx build` work for the app

### Technical Spec
- **Architecture**
  - Implement the app as an Nx-managed Next.js App Router application.
  - Use React Server Components by default for routes/layouts and use Client Components only where interactivity requires them.
  - Recommended structure inside the app source:
    - `app/[locale]/(auth)`
    - `app/[locale]/(dashboard)`
    - `app/[locale]/admin`
    - `components/`
    - `features/`
    - `lib/`
    - `hooks/`
    - `types/`
    - `styles/`
    - `messages/` or equivalent locale message directory
  - Use middleware for locale negotiation and coarse auth gating only.
  - Keep detailed authorization and business rules out of middleware.
  - Admin/internal surfaces stay in the same app, segmented by routes and later permissions.

- **API Design**
  - No business feature integration is required in this issue.
  - The app should be compatible with at least these future/minimal endpoints:
    - `GET /api/v1/health`
    - `GET /api/v1/auth/session`
    - `POST /api/v1/auth/login`
    - `POST /api/v1/auth/logout`
  - Frontend API access should be centralized under app utilities, not scattered across route files.
  - Standardize against `{ data, meta? }` and `{ error: { code, message, details? } }` style envelopes.
  - Preferred auth direction for later implementation is server-managed session with HTTP-only cookies.

- **Database Schema**
  - No schema implementation is required in this issue.
  - The app shell should be designed to work with eventual core entities such as:
    - organizations
    - branches
    - users
    - memberships
    - user_sessions
    - user_preferences
  - Locale defaults, branch switching, and role-aware navigation should remain compatible with those near-term entities.

### Implementation Guide
1. Scaffold the Next.js app in the Nx monorepo.
2. Apply current naming direction so the app path and docs align with `petabase` where possible.
3. Add project structure for routes, components, features, utilities, hooks, styles, and locale messages.
4. Integrate i18n with Thai as default and English as secondary.
5. Add locale-aware route groups for auth and dashboard.
6. Add admin/internal route subtree within the same app.
7. Build the base shell: sidebar, header, page wrapper, loading/error primitives.
8. Add styling/token baseline and foundational UI/form utilities.
9. Add environment/config handling and auth placeholders.
10. Wire shared workspace packages where available.
11. Verify serve/build/lint flows and document conventions.

### Task List
- **Task 1: Scaffold Nx Next.js app**
  - Estimate: M
  - Dependency: #28
  - Acceptance Criteria: App runs locally and builds successfully under Nx.

- **Task 2: Establish application folder conventions**
  - Estimate: S
  - Dependency: Task 1
  - Acceptance Criteria: Route, feature, UI, utility, hook, style, and locale directories exist with clear intent.

- **Task 3: Configure i18n with Thai default and English secondary**
  - Estimate: M
  - Dependency: Task 1
  - Acceptance Criteria: Locale routing works, Thai is default, and at least one page renders translated copy in both languages.

- **Task 4: Create root layouts and route groups**
  - Estimate: M
  - Dependency: Tasks 1, 3
  - Acceptance Criteria: Auth routes render without dashboard shell; dashboard/admin routes render with the intended shell structure.

- **Task 5: Build app shell components**
  - Estimate: M
  - Dependency: Task 4
  - Acceptance Criteria: Sidebar, header, page container, and baseline loading/empty patterns exist and render correctly.

- **Task 6: Set up styling and design-token baseline**
  - Estimate: S
  - Dependency: Task 1
  - Acceptance Criteria: Global styles compile and shared design tokens are centralized.

- **Task 7: Add foundational UI/form utilities**
  - Estimate: M
  - Dependency: Tasks 5, 6
  - Acceptance Criteria: Base UI primitives, toast support, error boundary, and loading conventions are available.

- **Task 8: Add environment and config handling**
  - Estimate: S
  - Dependency: Task 1
  - Acceptance Criteria: Env access is centralized and invalid critical config fails clearly.

- **Task 9: Add auth placeholders and route protection hooks**
  - Estimate: S
  - Dependency: Tasks 3, 4, 8
  - Acceptance Criteria: Auth route structure and placeholder protection flow exist without pretending auth is complete.

- **Task 10: Wire shared packages and boundaries**
  - Estimate: S
  - Dependency: Tasks 2, 6, 7
  - Acceptance Criteria: Shared packages can be consumed cleanly and import direction remains maintainable.

- **Task 11: Document local dev and generation conventions**
  - Estimate: S
  - Dependency: Tasks 1-10
  - Acceptance Criteria: New contributors can understand app structure and local commands quickly.

### Testing
- App runs with Nx locally.
- Production build succeeds.
- Locale routes such as `/th/...` and `/en/...` render correctly.
- Default locale negotiation resolves to Thai.
- Invalid or missing locale paths redirect or normalize correctly.
- Auth route group and dashboard route group render different shells as intended.
- Admin routes remain inside the same app structure.
- Base shell components render in both desktop and mobile-friendly layouts.
- Shared packages can be imported without boundary problems.
- Env/config handling fails safely and clearly on invalid setup.
- Placeholder auth gating does not break public auth pages.
- Error/loading UI paths render predictably.

### Decisions Made
- Use Next.js App Router for the staff-facing web app.
- Keep the staff app and admin/internal flows inside one deployable app.
- Use Thai-first and English-secondary i18n from day one.
- Prefer server-rendered route/layout composition by default.
- Add a `features/`-oriented internal structure early to avoid folder sprawl.
- Keep auth implementation out of scope, but make the app auth-ready.
- Align naming and docs with the approved `petabase` product name.

### Open Questions
- Should the physical folder rename to `apps/petabase` happen in this issue or be coordinated with monorepo foundation work first?
- Should locale messages stay app-local initially or move to a shared workspace package early?
- Which UI primitive stack should be standardized for the first iteration?
- How much placeholder session/auth integration is needed now versus waiting for the dedicated auth issue?
- Should branch-switcher shell placement be stubbed now because multi-branch support is expected soon?
