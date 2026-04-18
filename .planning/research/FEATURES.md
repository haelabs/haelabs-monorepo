# Feature Landscape

**Domain:** Veterinary PIMS (staff-facing web platform for Thailand clinics)  
**Researched:** 2026-04-19  
**Overall confidence:** MEDIUM (strong vendor evidence + strong project context; limited neutral third-party datasets)

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Role-based auth + staff permissions (Admin/Doctor/Nurse/Reception) | Every modern PIMS separates access by role and location | Med | Must be in MVP. Needed before any sensitive records/billing workflows. |
| Patient + owner master records | Core object model across all PIMS (patient chart tied to owner profile) | Med | Include pet demographics, owner contacts, relationship linking, and searchable list. |
| Appointment calendar + status lifecycle | Scheduling is a primary front-desk workflow in all modern systems | Med | Must include anti-double-booking checks and day/week calendar at minimum. |
| Consultation encounter with SOAP notes | Clinical documentation is central to veterinary workflow | High | Start with structured SOAP + prescription fields; avoid heavy freeform complexity initially. |
| Billing/invoicing + payment recording | Checkout and cashflow are baseline capabilities in modern PIMS | High | MVP should support invoice statuses + partial/full payment recording. |
| Estimates-to-invoice linkage | Modern systems reduce missed charges by carrying planned services to billing | Med | Critical revenue guardrail; can be lightweight in MVP. |
| Branch + organization setup | Multi-branch readiness appears in mainstream products and is required by project scope | Med | Implement basic branch ownership and data partitioning from day one. |
| Basic operational dashboard | Users expect "today view" (appointments, quick stats, recent activity) | Low | Keep simple for MVP (no deep BI). |
| Bilingual Thai/English UI and content model | Core market requirement for Thailand clinics | Med | Store locale-ready labels/status values; avoid hardcoded English enums in DB/API contracts. |
| Mobile-first responsive staff workflows | Modern cloud PIMS are browser/device flexible | Med | Prioritize front-desk and doctor flows on tablet/mobile breakpoints. |
| Payment method support: cash/card/transfer | Common real-world checkout methods in Thailand clinics and already in requirements | Low | Include payment method enum + audit trail; keep gateway integrations post-MVP. |

## Differentiators

Features that set product apart. Not expected for MVP completion, but highly valuable after baseline workflows are stable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Automated client reminders (SMS/Email/LINE-ready abstraction) | Reduces no-shows and increases compliance | Med | Build event hooks first; channel providers can follow. Thailand fit improves if LINE channel is added later. |
| Online booking portal | Offloads front-desk calls and improves conversion | High | Add only after scheduling rules + slot governance are stable. |
| Client-facing pet portal/app | Improves retention (records, invoices, reminders, refills) | High | High surface area; defer until core staff-side flows are reliable. |
| AI-assisted documentation (SOAP dictation/summarization) | Major clinician time savings; increasingly common in 2025–2026 products | High | Requires data governance, quality review UX, and auditability. Post-MVP. |
| Integrated lab/imaging ecosystem | Faster diagnostics and less duplicate entry | High | Valuable but integration-heavy and vendor-dependent. |
| Advanced analytics (provider KPI, cohort, utilization) | Better business optimization for scaling clinics | Med | Start with transactional summaries first; defer exploratory analytics. |
| Inventory automation (expiry, reorder, stock transfers) | Revenue/cost control and treatment continuity | High | Important, but explicitly planned for Phase 2 after operational MVP. |
| Wellness plans/subscriptions | Recurring revenue + better preventive care adherence | Med | Useful differentiator once billing + reminders are mature. |

## Anti-Features

Features to explicitly NOT build now.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Native mobile apps during MVP | Slows delivery and duplicates effort while web workflows are still changing | Deliver responsive web UX first; revisit native when workflow churn drops. |
| Full inventory suite in MVP | High complexity and outside current scoped MVP | Keep simple product line items in billing; implement inventory in Phase 2. |
| Deep analytics/BI warehouse | Early data is noisy; dashboards become misleading and expensive | Ship operational summaries only; add analytics after stable event model. |
| Broad AI automation in first release | Risky without mature clinical templates, governance, and QA loops | Add structured templates + clean data first; phase in AI per workflow. |
| Heavy external integrations (labs, accounting, telemedicine) in MVP | Integration testing/support burden can derail core delivery | Design integration-friendly boundaries now, implement connectors post-MVP. |
| Custom accounting/tax platform scope creep | High compliance complexity; distracts from clinic operations | Export-compatible invoices/reports first; integrate with accounting systems later. |

## Feature Dependencies

```text
Organization/Branch model + RBAC
  → Patient/Owner records
  → Appointment scheduling (with branch/staff resources)
  → Consultation/SOAP (+ prescriptions)
  → Billing/Invoices/Payments
  → Dashboard summaries

Shared dependency across all modules:
  i18n domain model (Thai/English labels/status/content)

Differentiator path:
  Stable scheduling + communications events
  → automated reminders
  → online booking
  → client portal/app

Clinical data quality path:
  Structured SOAP + templates + audit trail
  → AI documentation features
```

## MVP Recommendation

Prioritize (MVP table stakes):
1. RBAC + organization/branch/staff setup
2. Patient/owner records
3. Appointment scheduling with status lifecycle + anti-double-booking
4. Consultation/SOAP + prescriptions
5. Billing/invoicing/payments with estimate-to-invoice linkage
6. Bilingual Thai/English + mobile-first UX across all above modules

One controlled differentiator for early value (optional MVP+):
- **Automated reminders (single-channel first, channel-agnostic design)** — best ROI without exploding scope.

Defer:
- Online booking + client app/portal: requires mature scheduling and communication safeguards.
- AI SOAP and broader AI suite: needs high-quality templates, governance, and clinician trust loops.
- Inventory automation and advanced analytics: already correctly positioned as post-MVP expansion.

## Sources

- Internal project scope and sequencing:  
  - `.planning/PROJECT.md` (HIGH confidence)  
  - `requirements/58.md` (HIGH confidence)
- Vendor feature ecosystems (modern PIMS capability patterns):  
  - ezyVet homepage/features navigation: https://www.ezyvet.com/ (MEDIUM confidence)  
  - Provet platform overview: https://www.provet.cloud/ (MEDIUM confidence)  
  - Digitail platform/features: https://digitail.com/ (MEDIUM confidence)  
  - Vetspire feature set: https://www.vetspire.com/ (MEDIUM confidence)  
  - NaVetor features: https://www.navetor.com/features (MEDIUM confidence)  
  - Shepherd feature overview: https://www.shepherd.vet/ (MEDIUM confidence)
