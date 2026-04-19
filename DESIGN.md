# Petabase Design System (Calm Ops)

This document is the current UI source of truth for `apps/petabase`.

## 1) Product Direction

- Visual language: **Calm Ops** (staff-facing, long-session comfort, low cognitive load)
- Personality: clinical and trustworthy, not playful and not consumer-social
- Core usage context: bilingual clinic operations on desktop front desk and mobile floor workflows

## 2) Core Tokens (Implemented)

Defined in `apps/petabase/src/styles/tokens.css`.

### Color

- `--pb-color-bg`: `#ffffff`
- `--pb-color-heading`: `#061b31`
- `--pb-color-body`: `#64748d`
- `--pb-color-label`: `#273951`
- `--pb-color-primary`: `#533afd`
- `--pb-color-primary-hover`: `#4434d4`
- `--pb-color-primary-deep`: `#2e2b8c`
- `--pb-color-border`: `#e5edf5`
- `--pb-color-border-active`: `#b9b9f9`
- `--pb-color-success`: `#15be53`

### Radius

- `--pb-radius-sm`: `4px`
- `--pb-radius-md`: `6px`
- `--pb-radius-lg`: `8px`

### Elevation

- `--pb-shadow-soft`: subtle ambient lift for light panels
- `--pb-shadow-elevated`: default card elevation (blue-tinted + black layer)
- `--pb-shadow-deep`: stronger emphasis for hover/active depth
- `--pb-focus-ring`: `2px solid var(--pb-color-primary)`

## 3) Typography and Real Font Loading

Font loading is implemented in `apps/petabase/src/app/layout.tsx` using `next/font/google` with `display: 'swap'`.

- Latin/UI sans: `Plus_Jakarta_Sans` -> `--pb-font-latin`
- Thai sans: `Noto_Sans_Thai` -> `--pb-font-thai`
- Mono: `Source_Code_Pro` -> `--pb-font-mono-real`

Tokenized stacks in `apps/petabase/src/styles/tokens.css`:

- `--pb-font-sans-latin`: `var(--pb-font-latin), 'sohne-var', 'SF Pro Display', 'Segoe UI', sans-serif`
- `--pb-font-sans-thai`: `var(--pb-font-thai), 'Noto Sans Thai', 'Sarabun', 'Prompt', sans-serif`
- `--pb-font-mono`: `var(--pb-font-mono-real), 'SourceCodePro', 'SFMono-Regular', ui-monospace, monospace`

Language behavior in `apps/petabase/src/app/globals.css`:

- Default body text uses Latin stack with `font-feature-settings: 'ss01'`
- `.pb-locale-root:lang(th)` switches to Thai stack
- Numeric cells/stat values in Thai locale switch back to Latin stack for consistent tabular readability

## 4) Device-Native Shell by Breakpoint

Shell primitives live in `apps/petabase/src/components/shell/*` and `apps/petabase/src/app/globals.css`.

### Desktop (>= 1025px): Mac-like workspace shell

- Framed device container (`.pb-shell-device`) with border, 16px radius, layered shadow
- Header includes macOS-style traffic-light controls (`.pb-header-window-controls`)
- Two-column workspace (`.pb-workspace`): sticky sidebar + main canvas
- Top nav remains visible inside header; sidebar nav remains visible for persistent orientation

### Tablet (641px-1024px): iPad-like top navigation

- Workspace collapses to single column; sidebar hidden
- Top nav remains primary and becomes horizontally scrollable
- Header remains sticky with compact spacing and touch-safe controls

### Mobile (<= 640px): iPhone-like quick-action shell

- Device frame removed (full-bleed app canvas)
- Top nav hidden to reduce header density
- Bottom quick-action bar enabled via `.pb-mobile-actions` + `.pb-bottom-nav`
- Bottom bar respects safe areas: `padding-bottom: calc(8px + env(safe-area-inset-bottom))`
- Main content reserves space above bottom actions: `padding-bottom: calc(88px + env(safe-area-inset-bottom))`

## 5) Layout and Interaction Rules

- Base spacing rhythm: 8px-derived increments; compact but breathable for dense ops screens
- Cards: white surface, `1px` border, `6px` radius, elevated default shadow
- Buttons: 40px min height on desktop/tablet; 34px compact in mobile header only
- Inputs/selects: 42px min height, subtle border, visible focus ring
- Motion: short, purposeful transitions (`~140-180ms`), plus small stagger fade-up for card entry
- Data on mobile: table head hidden, rows become stacked labeled blocks

## 6) Calm Ops Do / Don't

### Do

- Use token variables instead of one-off color/radius/shadow values
- Keep hierarchy calm: lightweight headings, readable body, clear section grouping
- Keep key actions one tap away on mobile through bottom quick actions
- Preserve visible focus states and contrast in all interactive states
- Maintain bilingual readability first, including Thai line-height and numeric clarity

### Don't

- Don't reintroduce generic marketing-hero styling into ops screens
- Don't use hidden-only navigation patterns that break orientation in long sessions
- Don't remove safe-area handling from bottom actions on mobile
- Don't mix ad hoc fonts; rely on loaded Latin/Thai/mono stacks
- Don't add decorative visual noise that competes with patient/appointment/billing data

## 7) Implementation References

- Tokens: `apps/petabase/src/styles/tokens.css`
- Font loading: `apps/petabase/src/app/layout.tsx`
- Global styling + breakpoints: `apps/petabase/src/app/globals.css`
- Shell composition: `apps/petabase/src/components/shell/app-shell.tsx`
- Header/nav patterns: `apps/petabase/src/components/shell/app-header.tsx`, `apps/petabase/src/components/shell/app-nav-links.tsx`, `apps/petabase/src/components/shell/app-sidebar.tsx`
