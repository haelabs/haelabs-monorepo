# Petabase UI/UX Design Direction

This document applies the repository design baseline in `DESIGN.md` to Petabase's veterinary B2B context and maps it to requirement `requirements/12.md`.

## 1) Mood and Tone

- Professional, calm, and dependable for clinical workflows used 8+ hours/day.
- Warm, human, and approachable so staff-facing screens do not feel sterile.
- Precision-first for data-heavy views (appointments, records, billing) with clear hierarchy and low visual noise.
- Visual voice: "medical-grade trust" with "modern SaaS usability".

## 2) Theme and Color System (WCAG-Aware)

Core palette follows `DESIGN.md`:

- Primary action: `#533afd` (hover `#4434d4`)
- Heading text: `#061b31`
- Body text: `#64748d`
- Label text: `#273951`
- Background: `#ffffff`
- Borders: `#e5edf5`, active `#b9b9f9`
- Dark brand surface: `#1c1e54`
- Decorative accents: Ruby `#ea2261`, Magenta `#f96bee`
- Success: `#15be53` (text `#108c3d`)

Usage rules:

- Keep interactive controls in purple family; keep ruby/magenta decorative.
- Use `#061b31` for key reading text and labels requiring stronger contrast.
- For long-form body copy, prefer `#273951` over `#64748d` when background lighting is harsh (clinic tablets under white light).
- Maintain visible focus with a 2px purple outline for keyboard and switch-device accessibility.

## 3) Typography (Thai + English)

Primary stack:

- UI font: `sohne-var` with `font-feature-settings: "ss01"`
- Thai fallback pairing: `Noto Sans Thai`, `Sarabun`
- System fallback: `SF Pro Display`, `Segoe UI`, `sans-serif`
- Monospace/data: `SourceCodePro`, `SFMono-Regular`, `ui-monospace`

Type behavior:

- Headline and section titles stay lightweight (`300`) for premium clarity.
- Body text stays `300-400`, line-height around `1.4` for scanability.
- Financial and tabular numbers use `"tnum"` for column alignment.
- Minimum practical Thai UI size: 14px for labels, 16px for form inputs and body.

## 4) Component Style Guide Foundation

- Buttons: 4px radius, purple primary and ghost variants, hover darkening, clear focus ring.
- Cards/containers: white surfaces, `1px` soft blue border, 6px radius, blue-tinted layered shadows.
- Inputs/forms: 4px radius, purple focus border/ring, slate placeholders, high-contrast label color.
- Badges: success badge with green tint and subtle border; neutral tags stay low-saturation.
- Data tables: bordered container, sticky visual header treatment, tabular numerals for financial values, horizontal scroll on mobile.
- Navigation: sticky top bar with blur, dark left sidebar for role and section context.

## 5) Reference Analysis (Veterinary + SaaS)

1. Stripe (stripe.com)
   - Strong hierarchy, premium trust cues, disciplined spacing and shadows.
   - Applied to Petabase: typography confidence + controlled depth system.
2. Linear (linear.app)
   - High-density productivity UI with excellent keyboard and status clarity.
   - Applied to Petabase: compact but readable clinic task workflows.
3. Notion (notion.so)
   - Flexible information blocks and clean composition.
   - Applied to Petabase: modular patient timeline and SOAP note sections.
4. Airtable (airtable.com)
   - Robust data-table ergonomics and filtering patterns.
   - Applied to Petabase: appointment and billing list interactions.
5. ezyVet (ezyvet.com)
   - Veterinary domain structure for records, treatments, and billing.
   - Applied to Petabase: domain-specific nav grouping and workflow sequencing.
6. Provet Cloud (provet.cloud)
   - Practice-management IA and scheduling/billing adjacency.
   - Applied to Petabase: role-aware dashboard modules.
7. Digitail (digitail.com)
   - Modern veterinary SaaS tone, less legacy-heavy than older PMS tools.
   - Applied to Petabase: approachable visual language without losing credibility.
8. Shepherd (shepherd.vet)
   - Mobile-aware veterinary workflows and visit-centric operations.
   - Applied to Petabase: consultation-to-invoice flow continuity.

## 6) Navigation and UX Patterns by Role

- Veterinarian: fast patient lookup, visit timeline, SOAP-first consultation workspace.
- Nurse: treatment task queues, medication logging, appointment prep/status updates.
- Receptionist: check-in, appointment board, owner communication, payment collection.
- Manager/Owner: KPI dashboard, revenue/utilization summaries, staff and branch setup.

Recommended patterns:

- Role-aware home dashboard cards with "today first" priorities.
- Persistent global search for patient, owner, invoice, and appointment IDs.
- Status-driven workflows (scheduled -> confirmed -> in progress -> completed).
- Progressive disclosure for advanced forms to reduce cognitive load.
- Consistent sticky action areas on mobile (save, confirm, complete, collect payment).

## 7) Mobile-First Specifications for Clinic Environments

- Breakpoints: mobile `<640`, tablet `640-1024`, desktop `1024+`.
- Primary actions remain thumb-reachable and at least 40px high.
- Tables use horizontal scroll with preserved header context.
- High-glare safe contrast defaults: dark navy text on white, restrained tint usage.
- Form sessions tolerate interruption: visible draft/save states and resilient progress cues.

## 8) Design System Principles (Implementation Contract)

- Use design tokens for colors, radii, shadows, focus ring, and typography.
- Prefer 4-8px radius scale; avoid pills and oversized rounding.
- Always use blue-tinted layered shadows for elevated surfaces.
- Keep purple as the single interactive anchor color.
- Reserve ruby/magenta for decorative accents, not core actions.
- Preserve Thai/English readability parity when introducing new components.

## Completion Mapping to Requirement #12

- Mood/tone defined: yes
- Palette and accessibility guidance: yes
- Thai/English typography recommendations: yes
- Component style guide: yes
- Reference research (5-10): yes (8 references)
- Role-based UX recommendations: yes
- Mobile-first specifications: yes
