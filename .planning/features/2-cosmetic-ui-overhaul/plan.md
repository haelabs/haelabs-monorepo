# Feature Plan: Petabase Complete Cosmetic UI Overhaul — Mobile-First & Modern

## Metadata

- Slug: `2-cosmetic-ui-overhaul`
- Status: `planned`
- Owner: `agent`
- Updated: `2026-04-25`

## Summary

Redesign the entire Petabase staff-facing UI with a modern, visually compelling aesthetic that feels like a native mobile application on small screens while remaining a polished staff-ops tool on desktop. This plan breaks the overhaul into 8 sequential phases, each leaving the app in a buildable, reviewable state.

## Why

- The current UI is a functional prototype with ~1840 lines of hand-rolled vanilla CSS in a single `globals.css` file, no component library, and only 4 basic UI components (`button`, `card`, `input`, `toast-provider`).
- The mobile experience is a responsive collapse of the desktop layout — it needs to feel like a dedicated mobile app with native-quality transitions, gestures, and touch targets.
- UX/UI is the core product differentiator. The overhaul must lock in a design system and interaction patterns before backend integration begins.

## In Scope

### Phase 0 — Research & Library Selection
- Evaluate component libraries (shadcn/ui, Radix UI, Headless UI, Ark UI) for Next.js 15 / React 19 compatibility, bundle size, customization, and Thai/English bilingual support.
- Evaluate animation/motion libraries (Framer Motion / Motion, Motion One, GSAP, React Spring).
- Evaluate CSS architecture: Tailwind CSS vs CSS Modules vs restructured vanilla CSS.
- Evaluate icon libraries supporting bilingual labeling (Lucide, Phosphor, Heroicons).
- Produce a `notes.md` decision document with library choices, tradeoffs, and rationale.

### Phase 1 — Foundation & Token System
- Install chosen dependencies (component library, animation library, icon library, CSS tooling).
- Overhaul `tokens.css` with a modern color palette, spacing scale, elevation system, radius scheme, and typography tokens.
- Establish component file structure under `src/components/ui/` with consistent variants, states, and accessibility.
- Wire the new token system into `globals.css` (replacing the existing monolithic styles).
- Set up the animation library with shared transition presets.

### Phase 2 — Shell & Navigation Redesign
- Redesign `app-shell.tsx`, `app-header.tsx`, `app-sidebar.tsx`, `app-nav-links.tsx`.
- Mobile: native-app-quality bottom navigation bar, context-aware header (large title → compact sticky on scroll), gesture-friendly page transitions, safe-area handling.
- Desktop: modernized sidebar with improved visual hierarchy, workspace layout, and header.
- Ensure the shell works with the locale-aware routing structure (`/[locale]/(dashboard)/...`).

### Phase 3 — Auth Screens Redesign
- Redesign `sign-in`, `sign-up`, `forgot-password` screens.
- Modern form patterns: inline validation, floating labels or clean label placement, social-style login feel.
- Animated transitions between auth states.
- Preserve Thai/English bilingual support.

### Phase 4 — Dashboard Redesign
- Redesign the main dashboard page with modern card-based KPIs.
- Activity feeds, quick-action tiles, animated stat counters.
- Responsive grid that adapts from multi-column desktop to stacked mobile cards.

### Phase 5 — Core Workflow Screens Redesign
- **Patient management**: searchable list with touch-friendly cards on mobile, patient profile with tabbed sections, avatar system.
- **Appointment scheduling**: modern calendar/time-slot grid with smooth animations, touch-optimized time selection.
- **Consultation/SOAP notes**: tabbed form with smooth transitions, organized input sections, prescription cards.
- **Billing/invoicing**: modern line-item cards, inline calculations, payment recording with success animations.

### Phase 6 — Admin & Organization Screens
- Settings panels, user management with invite flows, role matrix.
- Preserve admin functionality inside `apps/petabase` (no separate app).

### Phase 7 — Polish & Cleanup
- Remove all legacy vanilla CSS patterns from `globals.css` that are replaced by the new system.
- Ensure all screens are consistent — no mix of old and new component patterns.
- Modernize print views for consultations and invoices.
- Run full validation suite (lint, typecheck, build).
- Create `handoff.md` with final state summary.

## Out of Scope

- Real backend integration or API wiring — data stays mock.
- Changes to `apps/api` or backend contracts.
- New app creation (no `apps/admin`).
- Content strategy or copywriting overhaul.
- Push notifications, offline/PWA support, or native mobile app wrapper.
- Performance optimization beyond what the new library choices naturally provide.

## Constraints

- Must work with Next.js 15 App Router and React 19.
- Must preserve locale-aware routing (`/[locale]/(dashboard)/...`, `/[locale]/(auth)/...`).
- Must remain inside `apps/petabase` — no structural monorepo changes.
- Preserve print routes and print CSS for consultation and invoice views.
- No external tracker — all planning stays repo-local.
- Node 22–24 compatibility; no runtime features that break either version.
- Each phase must leave the app buildable and lintable.
- Reuse existing `tokens.css` import path (`@petabase/styles/tokens.css`) in `globals.css`.
- Preserve the `pb-locale-root:lang(th)` bilingual font switching pattern.

## Dependencies

- Phase 0 resolves all library choices — every subsequent phase depends on it.
- Phase 1 depends on Phase 0 decisions (installed packages, token architecture).
- Phase 2 (shell) depends on Phase 1 (tokens + base components) and blocks all screen redesigns.
- Phases 3–6 depend on Phase 1 and Phase 2 but are independent of each other.
- Phase 7 depends on all prior phases completing.

### Existing Code Dependencies
- `apps/petabase/src/styles/tokens.css` — token definitions (overhauled in Phase 1).
- `apps/petabase/src/app/globals.css` — ~1840 lines of vanilla CSS (replaced incrementally).
- `apps/petabase/src/components/shell/` — 4 shell components (redesigned in Phase 2).
- `apps/petabase/src/components/ui/` — 4 base components (expanded in Phase 1).
- `apps/petabase/src/components/feedback/` — empty-state, loading-state (modernized in Phase 1+).
- `apps/petabase/src/features/prototype/components/prototype-pages.tsx` — mock page content (touched in Phases 3–6).
- `apps/petabase/src/features/prototype/mock-data.ts` — seed dataset (reused as-is).
- `apps/petabase/src/app/[locale]/` — all route layouts and pages (touched in Phases 2–6).
- `apps/petabase/src/hooks/` — use-auth-guard, use-locale-path, use-toast (preserved, possibly extended).

## Acceptance Criteria

### Phase 0
- [ ] Decision document in `notes.md` covering library evaluations, mobile pattern analysis, and design direction.
- [ ] Single recommendation for component library, animation library, CSS approach, and icon library.

### Phase 1
- [ ] Chosen packages installed and configured in `apps/petabase`.
- [ ] `tokens.css` overhauled with modern palette, spacing, elevation, radius, and typography tokens.
- [ ] Base component set established in `src/components/ui/` (button, card, input, select, textarea, badge/pill, avatar, skeleton, toast, dialog/sheet, tabs, segmented-control).
- [ ] Animation library configured with shared presets for page transitions, enter/exit, and micro-interactions.
- [ ] App builds, lints, and typechecks cleanly.

### Phase 2
- [ ] Mobile: bottom navigation with native-app feel, context-aware header, safe-area handling, page transitions.
- [ ] Desktop: modernized sidebar, header, and workspace grid.
- [ ] Shell preserves locale-aware routing and Thai/English font switching.
- [ ] App builds, lints, and typechecks cleanly.

### Phase 3
- [ ] Auth screens use new design system and components.
- [ ] Inline validation and modern form patterns implemented.
- [ ] Bilingual Thai/English preserved.
- [ ] App builds, lints, and typechecks cleanly.

### Phase 4
- [ ] Dashboard uses modern card-based KPIs, activity feeds, and animated stat counters.
- [ ] Responsive grid adapts cleanly from desktop to mobile.
- [ ] App builds, lints, and typechecks cleanly.

### Phase 5
- [ ] Patient list uses touch-friendly cards on mobile with swipe actions.
- [ ] Appointment calendar has smooth animations and touch-optimized time selection.
- [ ] Consultation notes use tabbed form with transitions.
- [ ] Billing has modern line-item cards and inline calculations.
- [ ] App builds, lints, and typechecks cleanly.

### Phase 6
- [ ] Admin settings, user management, and role matrix use new design system.
- [ ] App builds, lints, and typechecks cleanly.

### Phase 7
- [ ] No legacy vanilla CSS patterns remain — `globals.css` is clean and references only the new token/component system.
- [ ] All screens are visually consistent.
- [ ] Print views for consultations and invoices remain functional and improved.
- [ ] Full validation passes: `pnpm lint && pnpm typecheck && pnpm build` for `apps/petabase`.
- [ ] `handoff.md` created with final state.

## Implementation Notes

### Sequencing
- Phase 0 should be completed as a research spike before any code changes. Record findings in `notes.md`.
- Phase 1 is the critical path — it unblocks everything else. Prioritize getting tokens and base components right.
- Phase 2 (shell) is the second critical path — all page redesigns depend on the new shell.
- Phases 3–6 can be parallelized or done in any order after Phase 2.
- Phase 7 is a final sweep that must come last.

### Key Files to Touch (by phase)

**Phase 0:**
- `.planning/features/2-cosmetic-ui-overhaul/notes.md` (new)

**Phase 1:**
- `apps/petabase/package.json` (add dependencies)
- `apps/petabase/src/styles/tokens.css` (overhaul)
- `apps/petabase/src/app/globals.css` (restructure)
- `apps/petabase/src/components/ui/*` (expand component set)
- `apps/petabase/src/components/feedback/*` (modernize)

**Phase 2:**
- `apps/petabase/src/components/shell/app-shell.tsx`
- `apps/petabase/src/components/shell/app-header.tsx`
- `apps/petabase/src/components/shell/app-sidebar.tsx`
- `apps/petabase/src/components/shell/app-nav-links.tsx`
- `apps/petabase/src/components/layout/page-container.tsx`
- `apps/petabase/src/app/[locale]/(dashboard)/layout.tsx`
- `apps/petabase/src/app/[locale]/layout.tsx`

**Phase 3:**
- `apps/petabase/src/app/[locale]/(auth)/layout.tsx`
- `apps/petabase/src/app/[locale]/(auth)/sign-in/page.tsx`
- `apps/petabase/src/app/[locale]/(auth)/sign-up/page.tsx`
- `apps/petabase/src/app/[locale]/(auth)/forgot-password/page.tsx`
- `apps/petabase/src/features/auth/components/*`

**Phase 4:**
- `apps/petabase/src/app/[locale]/(dashboard)/dashboard/page.tsx`
- `apps/petabase/src/app/[locale]/(dashboard)/page.tsx`

**Phase 5:**
- `apps/petabase/src/app/[locale]/(dashboard)/patients/*`
- `apps/petabase/src/app/[locale]/(dashboard)/appointments/*`
- `apps/petabase/src/app/[locale]/(dashboard)/consultations/*`
- `apps/petabase/src/app/[locale]/(dashboard)/billing/*`
- `apps/petabase/src/features/prototype/components/prototype-pages.tsx`

**Phase 6:**
- `apps/petabase/src/app/[locale]/admin/*`
- `apps/petabase/src/app/[locale]/billing/invoices/*`
- `apps/petabase/src/app/[locale]/consultations/[consultationId]/*`

**Phase 7:**
- `apps/petabase/src/app/globals.css` (final cleanup)
- All files for consistency review

### Technical Considerations
- The current `globals.css` is imported via `@import '@petabase/styles/tokens.css'`. This import path must be preserved.
- The `pb-locale-root:lang(th)` pattern for bilingual font switching must be maintained.
- The existing `classNames` utility approach in `src/lib/utils/` should be evaluated for compatibility with the chosen component library.
- The mock data layer (`src/features/prototype/mock-data.ts`) is reused as-is — no changes to data structure.
- Mobile breakpoints: the current CSS uses 640px and 1024px. These should be formalized as design tokens.
- The existing `env(safe-area-inset-bottom)` handling in the mobile actions bar must be preserved and enhanced.
- The current `pb-print-*` classes and `@media print` block must be preserved through the overhaul.

## Validation

### Per-Phase Checks
- `pnpm --filter @haelabs/petabase run lint` — no new lint errors.
- `pnpm --filter @haelabs/petabase run typecheck` — no type errors.
- `pnpm --filter @haelabs/petabase run build` — clean build.
- Visual review in browser at mobile (375px, 390px), tablet (768px, 1024px), and desktop (1280px+) breakpoints.
- Thai locale rendering check for all modified screens.

### Final Validation (Phase 7)
- `pnpm lint && pnpm typecheck && pnpm build` from repo root — clean across all projects.
- No dead CSS classes remaining in `globals.css`.
- No unused component imports.
- Print views render correctly for consultation and invoice pages.
- Bilingual Thai/English renders correctly on all screens with proper font stacks.

### Risks to Watch
- **React 19 compatibility**: Some animation libraries (especially Framer Motion) may have breaking changes or incomplete support for React 19. Verify early in Phase 0.
- **Bundle size**: Adding a component library + animation library could significantly increase bundle size. Monitor with `@next/bundle-analyzer` during Phase 1.
- **CSS migration scope**: Replacing ~1840 lines of hand-rolled CSS is high-risk. Do it incrementally — new system overlays old, then old is removed in Phase 7.
- **Tailwind conflict risk**: If Tailwind CSS is chosen, its reset/preflight may conflict with existing styles. Test early in Phase 1.
- **Mobile gesture conflicts**: Swipe gestures may conflict with browser native behaviors (back swipe, pull-to-refresh). Test on real devices.
- **Thai font rendering**: Any new font stack or CSS approach must be validated with Thai text early. The existing `Noto Sans Thai` / `Sarabun` / `Prompt` fallback chain should be preserved or explicitly replaced with tested alternatives.
