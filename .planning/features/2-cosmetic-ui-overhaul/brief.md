# Feature Brief: Petabase Complete Cosmetic UI Overhaul — Mobile-First & Modern

## Metadata

- Slug: `2-cosmetic-ui-overhaul`
- Status: `intake`
- Owner: `agent`
- Updated: `2026-04-25`

## Goal

Redesign the entire Petabase staff-facing UI with a modern, visually compelling aesthetic that feels like a native mobile application on small screens while remaining a polished staff-ops tool on desktop. UX/UI quality is the primary product differentiator — the redesign must research, evaluate, and adopt the right component library, design system approach, and mobile interaction patterns to achieve best-in-class clinic operations UX.

## Why Now

- The current UI is a functional prototype built with vanilla CSS (~1840 lines in `globals.css`) and no component library. It delivers the "Calm Ops" direction well enough for early validation but lacks the visual sophistication, micro-interactions, and mobile-native feel the product needs to compete.
- The prototype phase (feature `1-petabase-ui-prototype`) is complete. This is the right moment to invest in a comprehensive cosmetic overhaul before real backend integration begins, so the design system is stable and the UX patterns are locked in.
- Staff at veterinary clinics predominantly use mobile devices during daily operations (exam rooms, kennel walks, surgery prep). The current mobile experience is a responsive collapse of the desktop layout — it needs to feel like a dedicated mobile app with native-quality transitions, gestures, and touch targets.
- UX/UI is explicitly the core selling point of Petabase. The visual and interaction quality must reflect that priority.

## In Scope

### Research & Evaluation Phase
- Research and evaluate modern React component libraries suitable for Next.js 15 / React 19 (e.g., Radix UI, shadcn/ui, Headless UI, Ark UI, Reakit, Radix Themes).
- Research mobile-first UI patterns: bottom sheets, swipe gestures, pull-to-refresh, haptic feedback cues, native-feeling navigation transitions, and mobile card-based layouts.
- Evaluate animation and motion libraries for React (e.g., Framer Motion, Motion One, GSAP, React Spring) and recommend one for the project.
- Research icon libraries and typography choices that support bilingual Thai/English text.
- Produce a design direction document with library recommendations, token overhaul plan, and mobile interaction spec before implementation begins.

### Design System Overhaul
- Redesign `tokens.css` with a modern color palette, spacing scale, elevation system, and radius scheme that feels contemporary and premium.
- Evaluate and potentially introduce CSS-in-JS, Tailwind, or keep vanilla CSS with a better-organized architecture (the current single-file approach won't scale).
- Establish a proper component library with consistent variants, states, and accessibility built in.

### Shell & Navigation Redesign
- Redesign the app shell (`app-shell`, `app-header`, `app-sidebar`, `app-nav-links`) for both desktop and mobile.
- Mobile: implement native-app-quality bottom navigation, gesture-friendly page transitions, and context-aware headers (large title on scroll, compact sticky header).
- Desktop: modernize the sidebar, header, and workspace layout while maintaining the Calm Ops professional feel.

### Component Redesign (All Screens)
- Auth screens (`sign-in`, `sign-up`, `forgot-password`): modern form patterns, social-style login feel, inline validation.
- Dashboard: modern card-based KPIs, activity feeds, quick-action tiles, animated stat counters.
- Patient management: searchable list with swipe actions on mobile, patient profile with tabbed sections, avatar system.
- Appointment scheduling: modern calendar UI, time-slot grid with smooth animations, drag-to-reschedule on desktop.
- Consultation/SOAP notes: tabbed form with smooth transitions, rich text–style input areas, prescription cards.
- Billing/invoicing: modern line-item cards, inline calculation display, payment recording with success animations.
- Organization/admin: settings panels, user management with invite flows, role matrix.
- Print views: preserve but modernize print-friendly consultation and invoice layouts.

### Mobile-App-Like Experience
- Page transitions with enter/exit animations that feel native (slide, fade, shared elements).
- Bottom sheets for action menus, confirmations, and contextual forms.
- Swipe gestures for common actions (dismiss, navigate back, reveal actions).
- Pull-to-refresh pattern for data views.
- Touch-optimized targets (minimum 44px), generous spacing, thumb-zone-aware layout.
- Safe area handling for notched devices.
- Smooth loading skeletons and shimmer states.
- Haptic feedback visual cues (subtle scale/opacity changes on tap).

### Accessibility & Bilingual
- Maintain WCAG 2.1 AA compliance through the chosen component library.
- Preserve Thai/English bilingual support with proper font stacks and RTL-aware layout tokens.
- Ensure the new design system works with the existing locale-aware routing structure.

## Out of Scope

- Real backend integration or API wiring — this remains a cosmetic/UX overhaul only; data stays mock.
- Changes to `apps/api` or backend contracts.
- New app creation (no `apps/admin`).
- Content strategy or copywriting overhaul — existing Thai/English copy is reused.
- Push notifications, offline/PWA support, or native mobile app wrapper (Capacitor/etc.) — future considerations.
- Performance optimization beyond what the new library choices naturally provide.

## Constraints

- Must work with Next.js 15 App Router and React 19.
- Must preserve the existing locale-aware routing structure (`/[locale]/(dashboard)/...`, `/[locale]/(auth)/...`).
- Must remain inside `apps/petabase` — no new apps or structural monorepo changes.
- Preserve print routes and print CSS for consultation and invoice views.
- No Jira or external tracker dependency — all planning stays repo-local.
- The overhaul should be incremental where possible (shell first, then screens) to keep the app buildable at each step.
- If a component library is introduced, it must be compatible with the existing `classNames` utility approach and not require a full rewrite of the routing structure.
- Node 22–24 compatibility; no runtime features that break either version.

## Assumptions

- The current prototype's information architecture and screen coverage (auth, dashboard, patients, appointments, consultations, billing, admin) is correct and doesn't need restructuring — only the visual layer and interaction patterns are changing.
- The team is open to introducing new dependencies (component library, animation library, icon library) if they significantly improve UX quality and developer experience.
- The "Calm Ops" direction can evolve — the user's request for "modern and interesting" UI supersedes the strict clinical aesthetic, but the result should still feel professional and appropriate for a veterinary clinic staff tool.
- The mobile-app-like experience is the top priority; desktop experience should be excellent but secondary.
- Research and design direction decisions should be documented and reviewed before full implementation begins.
- The existing mock data layer and seed dataset from feature `1-petabase-ui-prototype` will be reused without changes.

## Open Questions

- **Component library choice**: Should we adopt shadcn/ui (copy-paste Radix primitives), Headless UI (Tailwind Labs), Ark UI, or build on Radix directly? Each has different tradeoffs for customization, bundle size, and React 19 support. This should be resolved during the research phase.
- **CSS approach**: Should we introduce Tailwind CSS, migrate to CSS Modules, adopt a CSS-in-JS solution, or restructure the vanilla CSS into a better-organized multi-file architecture?
- **Animation library**: Framer Motion is the most popular but has bundle size and React 19 compatibility considerations. Motion One (the vanilla successor) or GSAP may be better choices. This should be resolved during research.
- **Design direction evolution**: How far from "Calm Ops" should the new design move? Options range from "refined Calm Ops with better mobile" to "full modern SaaS aesthetic with personality." The research phase should produce mood boards or reference examples for the team to align on.
- **Mobile navigation model**: Should the mobile experience use a tab-bar model (current approach, refined), a drawer-based model, or a hybrid with contextual floating actions?

## Acceptance Criteria

- A research document is produced covering library evaluations, mobile pattern analysis, and design direction recommendations.
- The design system tokens are overhauled with a modern, cohesive palette, spacing scale, elevation system, and typography choices.
- A chosen component library is integrated into `apps/petabase` and replaces the current hand-rolled button/card/input components.
- The app shell provides a native-app-quality mobile experience with smooth page transitions, gesture-friendly navigation, and touch-optimized targets.
- All existing screens (auth, dashboard, patients, appointments, consultations, billing, admin) are redesigned with the new visual system and component library.
- Mobile views feel like a dedicated mobile application rather than a responsive collapse of the desktop layout.
- The bilingual Thai/English experience is preserved and enhanced with proper typography.
- Print views for consultations and invoices remain functional and improved.
- The app builds, lints, and typechecks cleanly with the new dependencies and architecture.
- The entire `apps/petabase` codebase is consistent — no legacy vanilla CSS patterns remain alongside the new system.
