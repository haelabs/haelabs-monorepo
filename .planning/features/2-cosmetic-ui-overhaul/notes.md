# Phase 0 Notes: Research & Library Selection

## Metadata

- Slug: `2-cosmetic-ui-overhaul`
- Phase: `0 - Research & Library Selection`
- Updated: `2026-04-25`

## Decision Summary (Single Recommendation)

- **Component library:** `shadcn/ui` (built on Radix primitives)
- **Animation library:** `Motion` (`motion/react`, formerly Framer Motion package line)
- **CSS approach:** `Tailwind CSS v4 + CSS variables tokens` (keep `@petabase/styles/tokens.css` as source of design tokens)
- **Icon library:** `lucide-react`

## Evaluation Matrix

### 1) Component Library Options

#### shadcn/ui
- **Pros:** Best fit for high-customization visual overhaul; Radix accessibility primitives; strong Next.js App Router adoption; easy to tune for bilingual typography and mobile-first spacing.
- **Cons:** Not a hosted package; requires local component ownership and maintenance.
- **React 19 / Next 15 fit:** Strong.

#### Radix UI (raw primitives)
- **Pros:** Excellent accessibility and composability.
- **Cons:** Too low-level for full-screen redesign speed; more bespoke assembly required for every pattern.
- **React 19 / Next 15 fit:** Strong.

#### Headless UI
- **Pros:** Familiar API, good basic primitives.
- **Cons:** Tailwind-oriented ergonomics and smaller primitive breadth for the full admin surface needed.
- **React 19 / Next 15 fit:** Good.

#### Ark UI
- **Pros:** Modern headless approach and broad primitive set.
- **Cons:** Lower ecosystem familiarity in this repo context; fewer proven examples for the exact Petabase shell/navigation patterns.
- **React 19 / Next 15 fit:** Good.

**Decision rationale:** shadcn/ui gives the best balance of delivery speed, accessibility, and full visual control for a complete cosmetic rewrite.

### 2) Animation/Motion Options

#### Motion (`motion/react`)
- **Pros:** Mature React animation API, layout transitions, presence animations, straightforward route/shell transitions.
- **Cons:** Adds runtime bytes if overused.
- **React 19 / Next 15 fit:** Good with current Motion package line.

#### Motion One
- **Pros:** Lightweight and performant web animations.
- **Cons:** Less ergonomic for React component presence/state transitions across many screens.

#### GSAP
- **Pros:** Extremely powerful timeline control.
- **Cons:** Overkill for the required ops-app micro-interactions; steeper implementation overhead.

#### React Spring
- **Pros:** Natural spring feel.
- **Cons:** Less direct for the expected enter/exit/page transition patterns versus Motion.

**Decision rationale:** Motion provides the best implementation velocity for native-feeling page transitions and interaction polish in React.

### 3) CSS Architecture Options

#### Tailwind CSS v4 + token variables
- **Pros:** Fast component iteration, cleaner replacement for monolithic `globals.css`, predictable responsive utilities, easier consistency at scale.
- **Cons:** Requires migration discipline and class-style conventions.

#### CSS Modules
- **Pros:** Strong file scoping and no global collisions.
- **Cons:** Slower for high-volume UI rebuild and variant-heavy component authoring.

#### Restructured vanilla CSS only
- **Pros:** No new tooling.
- **Cons:** High risk of repeating current scaling issues and slower variant composition.

**Decision rationale:** Tailwind v4 with existing token variables preserves design-system authority while accelerating full-screen rebuild.

### 4) Icon Library Options

#### Lucide
- **Pros:** Clean stroke style matching Calm Ops direction, large set, tree-shakeable React package, easy sizing consistency.
- **Cons:** Some niche glyphs may still require custom icon work.

#### Phosphor
- **Pros:** Broad stylistic weights and expressive set.
- **Cons:** Visual tone is sometimes softer/playful than desired.

#### Heroicons
- **Pros:** Solid baseline set.
- **Cons:** Smaller practical breadth for full ops workflows and utility states.

**Decision rationale:** Lucide best matches the refined clinical product tone and required coverage.

## Mobile Pattern Direction (Phase 2+)

- Keep tab-bar style bottom navigation for mobile with safe-area insets.
- Add motion presets for:
  - page enter/exit slide-fade,
  - card stagger-in,
  - tap feedback scale/opacity.
- Use bottom sheets for contextual actions and confirmations.
- Maintain 44px minimum touch targets and thumb-zone placement for primary actions.

## Open Questions Resolved

1. **Component library choice:** `shadcn/ui` selected.
2. **CSS approach:** `Tailwind CSS v4 + tokens.css CSS variables` selected.
3. **Animation library:** `Motion` selected.
4. **Design direction evolution:** Keep **Calm Ops** foundation, increase visual depth/motion polish (not consumer-social aesthetic).
5. **Mobile navigation model:** Refined tab-bar/bottom-nav model with contextual sheets and transitions.

## Implementation Guardrails for Phase 1

- Preserve `@import '@petabase/styles/tokens.css'` usage.
- Preserve `.pb-locale-root:lang(th)` behavior and Thai/English font stacks.
- Keep print-specific classes/routes functional while migrating styles.
- Migrate incrementally to avoid breaking build/lint/typecheck between phases.
