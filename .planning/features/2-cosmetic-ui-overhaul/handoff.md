# Feature Handoff: Petabase Complete Cosmetic UI Overhaul — Mobile-First & Modern

## Snapshot

- Slug: `2-cosmetic-ui-overhaul`
- Status: `planned`
- Updated: `2026-04-25`

## Summary

Full cosmetic redesign of the Petabase staff-facing Next.js app. The current UI is a functional prototype with ~1840 lines of hand-rolled vanilla CSS in a single `globals.css`, 4 basic UI components, no component library, and a mobile experience that collapses the desktop layout rather than feeling native. This overhaul replaces all of that with a modern design system, component library, and mobile-app-like interaction patterns — while keeping data mock and the existing route structure intact.

**Current state**: Planning complete (brief + plan + status). No code changes yet. Ready to begin Phase 0 (research spike).

## Build Sequence

The plan has 8 phases with a strict dependency chain through Phase 2, then parallel screen work:

1. **Phase 0 — Research & Library Selection** (next step)
   - Evaluate component libraries for Next.js 15 / React 19: shadcn/ui, Radix UI, Headless UI, Ark UI.
   - Evaluate animation/motion libraries: Framer Motion / Motion, Motion One, GSAP, React Spring.
   - Evaluate CSS architecture: Tailwind CSS vs CSS Modules vs restructured vanilla CSS.
   - Evaluate icon libraries: Lucide, Phosphor, Heroicons.
   - Record all decisions and rationale in `notes.md`.

2. **Phase 1 — Foundation & Token System** (critical path)
   - Install chosen packages. Overhaul `tokens.css`. Expand `src/components/ui/` to a full component set. Configure animation presets. Restructure `globals.css`.

3. **Phase 2 — Shell & Navigation Redesign** (blocks all screen work)
   - Redesign `app-shell`, `app-header`, `app-sidebar`, `app-nav-links`. Mobile: bottom nav, context-aware header, page transitions, safe-area handling. Desktop: modernized sidebar and workspace layout.

4. **Phase 3 — Auth Screens**: sign-in, sign-up, forgot-password with new components and inline validation.
5. **Phase 4 — Dashboard**: card-based KPIs, activity feeds, animated stat counters.
6. **Phase 5 — Core Workflow Screens**: patients, appointments, consultations, billing.
7. **Phase 6 — Admin & Organization**: settings, user management, role matrix.
8. **Phase 7 — Polish & Cleanup**: remove all legacy CSS, consistency review, print views, full validation.

## Key Files & Areas

| Area | Path | Phase |
|------|------|-------|
| Design tokens | `apps/petabase/src/styles/tokens.css` | 1 |
| Global styles | `apps/petabase/src/app/globals.css` | 1, 7 |
| Base components | `apps/petabase/src/components/ui/*` | 1 |
| Shell components | `apps/petabase/src/components/shell/*` | 2 |
| Feedback states | `apps/petabase/src/components/feedback/*` | 1+ |
| Route layouts | `apps/petabase/src/app/[locale]/` | 2–6 |
| Mock data | `apps/petabase/src/features/prototype/mock-data.ts` | reuse only |
| Auth screens | `apps/petabase/src/app/[locale]/(auth)/*` | 3 |
| Dashboard | `apps/petabase/src/app/[locale]/(dashboard)/dashboard/` | 4 |
| Core screens | `apps/petabase/src/app/[locale]/(dashboard)/{patients,appointments,consultations,billing}/*` | 5 |
| Admin | `apps/petabase/src/app/[locale]/admin/*` | 6 |

## Validation Checklist

- Per-phase: `pnpm --filter @haelabs/petabase run lint && pnpm --filter @haelabs/petabase run typecheck && pnpm --filter @haelabs/petabase run build`
- Visual review at 375px, 390px (mobile), 768px, 1024px (tablet), 1280px+ (desktop)
- Thai locale rendering check for every modified screen
- Phase 7 final: `pnpm lint && pnpm typecheck && pnpm build` from repo root
- No dead CSS, no unused imports, print views functional, bilingual fonts correct

## Risks to Watch

- **React 19 compat**: Animation libraries may break. Verify in Phase 0.
- **Bundle size**: Component lib + animation lib. Monitor with `@next/bundle-analyzer`.
- **CSS migration scope**: ~1840 lines being replaced. Incremental overlay strategy; old removed only in Phase 7.
- **Tailwind preflight**: If Tailwind is chosen, its reset may conflict with existing styles.
- **Thai font rendering**: Preserve `Noto Sans Thai` / `Sarabun` / `Prompt` fallback chain or replace with tested alternatives.

## Constraints

- Next.js 15 App Router + React 19 only.
- Locale-aware routing (`/[locale]/(dashboard)/...`, `/[locale]/(auth)/...`) must be preserved.
- `@petabase/styles/tokens.css` import path and `pb-locale-root:lang(th)` pattern must be maintained.
- Print routes and print CSS for consultations/invoices must remain functional.
- No changes to `apps/api`. No new apps. No structural monorepo changes.
- Node 22–24 compatibility.
- Each phase must leave the app buildable and lintable.

## Blockers

- None

## Next Recommended Step

- **Start Phase 0 (Research & Library Selection)**. Evaluate the 4 library categories (component, animation, CSS, icons), record findings and final recommendations in `.planning/features/2-cosmetic-ui-overhaul/notes.md`. Resolve the 5 open questions from the brief. Then update `status.md` and proceed to Phase 1.
