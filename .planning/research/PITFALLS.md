# Domain Pitfalls

**Domain:** Veterinary clinic PIMS MVP (Thailand, bilingual, mobile-first)
**Researched:** 2026-04-19

## Critical Pitfalls

### Pitfall 1: RBAC without tenant + branch scoping (cross-clinic data leaks)
**What goes wrong:** Roles are checked (e.g., Doctor/Nurse/Admin), but queries are not constrained by `organization_id` + `branch_id` + ownership rules, so staff can read/update records outside their clinic/branch.

**Why it happens:** Teams implement UI route guards first and assume backend guards are enough, but miss object-level authorization on every data read/write.

**Consequences:** Patient privacy breach, legal/compliance risk, trust collapse with clinics, expensive emergency re-architecture.

**Warning signs:**
- API handlers accept record IDs without validating tenant/branch ownership.
- “Admin works, others mostly work” but edge routes return foreign records.
- Authorization checks vary by controller instead of one reusable policy layer.

**Prevention strategy:**
- Enforce deny-by-default server-side authorization on **every** request.
- Add mandatory query scopes (`org_id`, `branch_id`) at repository/service layer.
- Add object-level policy checks (`canReadPatient`, `canEditInvoice`) not just role checks.
- Add integration tests for horizontal privilege escalation (same role, different branch/org).

**Detection:** Security tests for IDOR/horizontal privilege escalation; audit logs on authorization failures.

**Roadmap phase to address:** **Phase 1B (Auth + Org + User + Role + Permission API)**, with mandatory regression tests in **Phase 1B.5 (integration hardening)**.

---

### Pitfall 2: “Role matrix only” design causes role explosion and brittle permissions
**What goes wrong:** A static permission matrix cannot express real clinic rules (e.g., receptionist can create appointments for all vets, but can only view limited medical detail; doctor can edit only consultations they authored after lock period).

**Why it happens:** MVP teams overfit to 4 base roles and skip attribute/context checks.

**Consequences:** Either over-permissive access (security risk) or workflow dead-ends (operations risk).

**Warning signs:**
- Frequent production “one-off” permission exceptions.
- New branches require custom hardcoded role variants.
- Policy code duplicated across controllers.

**Prevention strategy:**
- Keep base RBAC roles, but add attribute checks (org, branch, ownership, record status).
- Centralize policy evaluation in one module (not per endpoint ad hoc logic).
- Version permission matrix and run approval workflows for changes.

**Detection:** Track permission override requests and policy-diff churn.

**Roadmap phase to address:** **Phase 1B** design task before endpoint implementation; refinement in **subsequent milestone auth/rbac expansion**.

---

### Pitfall 3: Mutable medical records with no audit/version trail
**What goes wrong:** SOAP notes, diagnosis, prescriptions, and attachments are overwritten in-place with no version history or author/time provenance.

**Why it happens:** CRUD-first implementation treats clinical notes like generic CMS text.

**Consequences:** Clinical safety risk, medico-legal risk, inability to reconstruct care timeline.

**Warning signs:**
- `updated_at` changes but no prior version retained.
- No explicit “amendment reason” for edited consultation notes.
- No immutable event log for “who viewed/changed what”.

**Prevention strategy:**
- Use append/amend model for clinical notes (immutable original + amendment entries).
- Store author, timestamp, reason-for-amendment, and source context.
- Separate “draft consultation” from “signed/finalized consultation” with lock rules.

**Detection:** Quarterly audit replay: can team reconstruct a patient’s exact clinical timeline?

**Roadmap phase to address:** Data model in **Phase 1B (Consultation/SOAP API)**; audit trail completion in **Phase 1B.5**.

---

### Pitfall 4: Weak patient-owner relationship modeling (duplicate pets, fragmented history)
**What goes wrong:** Pets and owners are linked loosely (or denormalized) so ownership changes, multi-owner households, and merged duplicate pet records break history continuity.

**Why it happens:** Teams optimize for quick CRUD forms without domain constraints.

**Consequences:** Wrong patient history at point of care, duplicate billing, poor search reliability.

**Warning signs:**
- Same pet appears under multiple records with slight name spelling changes.
- Consultation references owner snapshot text instead of stable IDs.
- Manual back-office merges happen weekly.

**Prevention strategy:**
- Model pet as primary clinical identity; owner linkage as relationship table with effective dates.
- Introduce merge workflow (soft-merge + audit + conflict review) instead of hard delete.
- Enforce unique constraints where safe (microchip + org, external identifier + org).

**Detection:** Duplicate-pet rate and merge backlog trending.

**Roadmap phase to address:** **Phase 1B (Patient Management API)** with dedicated data-quality stories.

---

### Pitfall 5: Scheduling without transactional conflict controls (double-booking)
**What goes wrong:** Availability is checked in app code, then appointment inserted later; concurrent requests pass checks and double-book doctor/room/slot.

**Why it happens:** No DB-level exclusion/uniqueness strategy and no atomic booking transaction.

**Consequences:** Front-desk chaos, clinician overload, no-show cascades, loss of confidence.

**Warning signs:**
- Rare but recurring “two appointments same vet same slot.”
- Calendar and list views disagree.
- Status transitions skip (e.g., completed without confirmed/in-progress history).

**Prevention strategy:**
- Use atomic booking transaction with DB constraints (unique/exclusion) on effective slot ownership.
- Keep explicit appointment status lifecycle and enforce valid transitions.
- Add idempotency keys for create/update booking actions (especially retries).

**Detection:** Automated race-condition test suite; daily conflict report.

**Roadmap phase to address:** **Phase 1B (Appointment Scheduling API)**; load/race tests in **Phase 1B.5**.

---

### Pitfall 6: Financial correctness bugs (float math + non-idempotent payments)
**What goes wrong:** Billing uses floating-point arithmetic and retryable payment APIs without idempotency, producing rounding drift and duplicate payment records.

**Why it happens:** Typical JS `number` usage and no payment command idempotency model.

**Consequences:** Revenue leakage, reconciliation pain, customer disputes, accounting mistrust.

**Warning signs:**
- “Paid” invoice totals differ by small amounts.
- Partial payments occasionally applied twice after timeout/retry.
- Staff manually edits invoice totals to “fix cents”.

**Prevention strategy:**
- Store monetary amounts in minor units (integer satang) or fixed decimal type.
- Implement idempotency key + request fingerprint for payment recording.
- Keep immutable ledger-style payment events; derive invoice balance from events.

**Detection:** Reconciliation job comparing derived balances vs stored balances.

**Roadmap phase to address:** **Phase 1B (Billing & Invoicing API)** with explicit financial consistency acceptance criteria.

---

### Pitfall 7: Consultation-to-billing linkage gaps (orphan revenue, untraceable charges)
**What goes wrong:** Invoices can be created/edited without preserving source consultation/line-item provenance.

**Why it happens:** Billing module implemented separately from clinical module with weak references.

**Consequences:** Unverifiable invoices, refund disputes, poor doctor performance analytics.

**Warning signs:**
- Invoice line items missing source consultation IDs.
- Staff cannot answer “why was this charged?” from system data.
- Many manual credit notes due to source mismatch.

**Prevention strategy:**
- Enforce source linkage model: consultation → billable items → invoice lines.
- Track status transitions and cancellation reasons for invoices.
- Disallow destructive invoice edits after issue; use adjustments/credit notes.

**Detection:** Random invoice traceability audits (invoice → clinical source).

**Roadmap phase to address:** Data contract in **Phase 1B consultation + billing integration**.

---

### Pitfall 8: Bilingual UX/data handling errors (Thai/English) that corrupt operations
**What goes wrong:** Locale concerns leak into persistence and logic (e.g., translated status strings stored as source-of-truth, inconsistent date parsing, ambiguous numeric/date input).

**Why it happens:** i18n applied at UI layer late, without stable canonical enums and localized formatting rules.

**Consequences:** Broken filters/reports, mismatched status workflows, user-facing confusion.

**Warning signs:**
- DB stores translated labels (`"ชำระแล้ว"`) instead of canonical status keys.
- Search/sort behaves differently by locale.
- Date/time displays differ across devices for same appointment.

**Prevention strategy:**
- Store canonical enums/codes; localize only at render-time.
- Store timestamps in UTC; convert by user/org timezone for display.
- Standardize date/number input parsing and formatting using Intl/CLDR-driven rules.

**Detection:** Cross-locale golden tests (same data, th/en output parity).

**Roadmap phase to address:** Foundation in **Phase 1A (UI contracts)** + strict enforcement in **Phase 1B API DTO/validation**.

## Moderate Pitfalls

### Pitfall 9: Insecure medical document uploads
**What goes wrong:** Any file type allowed; filenames and MIME trusted; files exposed directly from web root.

**Warning signs:** Uploaded files with executable extensions, suspicious content types, oversized files, publicly enumerable URLs.

**Prevention:** Allowlist extensions/signatures, randomize filenames, size limits, AV/CDR scanning where feasible, private object storage + signed download URLs.

**Roadmap phase to address:** **Phase 1B (document upload endpoints)**.

---

### Pitfall 10: Missing clinically meaningful audit logs
**What goes wrong:** System logs infrastructure errors but not business/security events (e.g., record export, permission denial, record amendment).

**Warning signs:** Incident reviews rely on guesswork; cannot answer who viewed/edited sensitive records.

**Prevention:** Structured audit events for auth, authorization failures, record access/modification, export/print, billing adjustments.

**Roadmap phase to address:** Start in **Phase 1B**, harden in **Phase 1B.5**.

## Minor Pitfalls

### Pitfall 11: Frontend-only auth gating assumptions
**What goes wrong:** Route/middleware checks exist, but backend endpoint guards are inconsistent.

**Warning signs:** Direct API call bypasses UI restrictions.

**Prevention:** Treat frontend checks as UX only; backend is source of truth for authz.

**Roadmap phase to address:** **Phase 1B auth endpoints and guards**.

---

### Pitfall 12: Over-ambitious post-MVP feature creep (inventory/reporting before data quality)
**What goes wrong:** Team adds inventory/analytics before clinical and billing correctness is stable.

**Warning signs:** Frequent reconciliation/manual fixes while new modules are started.

**Prevention:** Gate Phase 2 on core workflow integrity KPIs (scheduling conflict rate, invoice traceability, duplicate-pet rate).

**Roadmap phase to address:** **Phase planning checkpoint between 1B and 2**.

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Phase 1A UI prototype | UI state/status values become canonical data model | Freeze canonical enums/DTO contracts before integration |
| Phase 1B auth/rbac | Role checks without tenant/object scope | Add policy layer + org/branch scoped repositories + IDOR tests |
| Phase 1B patient/records | Editable-in-place clinical notes | Add amendment/version model + immutable audit events |
| Phase 1B scheduling | App-level availability check only | Add DB constraints + transactional booking + race tests |
| Phase 1B billing | Float money + retry duplicate payments | Use minor units/decimal + idempotency keys + event-ledger model |
| Phase 1B integrations | Consultation and invoice decouple | Enforce traceable source links and non-destructive corrections |
| Phase 1B.5 hardening | No observability for abuse/incidents | Security/audit logging, alerting, reconciliation jobs |

## Sources

### High confidence
- OWASP Authorization Cheat Sheet — server-side checks, least privilege, deny-by-default, object-level controls: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html
- OWASP Session Management Cheat Sheet — cookie/session hardening and lifecycle controls: https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html
- OWASP Top 10 A01 Broken Access Control — common access control failures: https://owasp.org/Top10/2021/A01_2021-Broken_Access_Control/
- PostgreSQL constraints (unique, FK, exclusion) — enforcing data integrity at DB layer: https://www.postgresql.org/docs/current/ddl-constraints.html
- PostgreSQL date/time and timezone behavior — UTC storage/display conversion pitfalls: https://www.postgresql.org/docs/current/datatype-datetime.html
- Stripe idempotent requests — preventing duplicate side effects on retries: https://docs.stripe.com/api/idempotent_requests
- Stripe currency/minor-unit guidance — safe money representation: https://docs.stripe.com/currencies
- Unicode CLDR date/time patterns and bidi/date formatting guidance: https://cldr.unicode.org/translation/date-time/date-time-patterns
- Unicode LDML dates standard (UTS #35 Part 4): https://www.unicode.org/reports/tr35/tr35-dates.html
- OWASP File Upload Cheat Sheet — safe upload controls for medical documents: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html
- OWASP Logging Cheat Sheet — audit/security event logging patterns: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html

### Medium confidence
- HL7 FHIR Appointment resource lifecycle/status modeling (useful reference for scheduling status rigor): https://hl7.org/fhir/R4/appointment.html
- HL7 FHIR Invoice resource lifecycle/line-item transparency (useful reference for billing state model): https://hl7.org/fhir/R4/invoice.html

### Low confidence / gaps
- Veterinary-specific recordkeeping policy pages (AVMA/RCVS) were not reliably retrievable in this environment (blocked/404), so veterinary legal nuances should be validated in a dedicated compliance sub-research during execution.
