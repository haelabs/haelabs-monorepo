# Requirements: Petabase - Veterinary PIMS MVP

**Defined:** 2026-04-19
**Core Value:** Clinic staff can run core day-to-day veterinary operations in one localized system without relying on expensive or poorly localized alternatives.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Authentication & Access

- [ ] **AUTH-01**: User can sign up with email and password
- [ ] **AUTH-02**: User can log in and receive authenticated access tokens
- [ ] **AUTH-03**: User can reset password via email recovery flow
- [ ] **AUTH-04**: User access is restricted by role (Admin, Doctor, Nurse, Receptionist)
- [ ] **AUTH-05**: User access is restricted by organization and branch scope

### Organization & Staff

- [ ] **ORG-01**: Admin can create and update organization profile (name, logo, contact)
- [ ] **ORG-02**: Admin can create and manage branches
- [ ] **ORG-03**: Admin can invite, activate, and deactivate staff users
- [ ] **ORG-04**: Admin can view role-permission matrix for staff access

### Patients & Owners

- [ ] **PATO-01**: Staff can create, update, and search patient records
- [ ] **PATO-02**: Staff can create, update, and search owner records
- [ ] **PATO-03**: Staff can link one owner to multiple pets and view linked relationships
- [ ] **PATO-04**: Staff can upload and view patient profile photo
- [ ] **PATO-05**: Staff can view patient medical history timeline and attached documents

### Appointments

- [ ] **APPT-01**: Staff can create, reschedule, and cancel appointments
- [ ] **APPT-02**: Staff can manage appointment status lifecycle (scheduled, confirmed, in-progress, completed, cancelled, no-show)
- [ ] **APPT-03**: Staff can view appointments in day/week/month calendar and list formats with filters
- [ ] **APPT-04**: System prevents double-booking for the same doctor and time slot

### Consultation & SOAP

- [ ] **SOAP-01**: Staff can start consultation from appointment or patient profile
- [ ] **SOAP-02**: Staff can record complete SOAP note (Subjective, Objective, Assessment, Plan)
- [ ] **SOAP-03**: Staff can create prescriptions with medication, dosage, frequency, and duration
- [ ] **SOAP-04**: Staff can view consultation history per patient
- [ ] **SOAP-05**: Staff can print consultation records in print-friendly format

### Billing & Payments

- [ ] **BILL-01**: Staff can create invoice from consultation or manually
- [ ] **BILL-02**: Staff can add invoice line items, discounts, and taxes
- [ ] **BILL-03**: Staff can record full or partial payments (cash, card, transfer)
- [ ] **BILL-04**: Staff can view invoice statuses (draft, sent, paid, overdue)
- [ ] **BILL-05**: Staff can view daily, weekly, and monthly revenue summaries

### UX, Localization, and Integration

- [ ] **UX-01**: Staff can use all v1 workflows on mobile and desktop responsive layouts
- [ ] **UX-02**: Staff can use the product in Thai and English
- [ ] **UX-03**: UI modules operate with production API data (mock-only mode removed in integrated MVP)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Inventory Management

- **INV-01**: Staff can manage product catalog and stock by branch
- **INV-02**: Staff can record stock adjustments and branch transfers
- **INV-03**: Staff can track stock usage and low-stock alerts
- **INV-04**: Staff can track product expiry dates

### Reporting & Analytics

- **REPT-01**: Staff can view revenue and visit reports by date range
- **REPT-02**: Staff can view appointment and doctor performance analytics
- **REPT-03**: Staff can export reports to PDF and CSV

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Native iOS/Android apps | Web-first delivery is required for MVP speed and cost |
| Marketplace/e-commerce features | Not needed for initial clinic operations value |
| Advanced AI diagnostics support | Clinical and regulatory complexity beyond MVP |
| Multi-country localization beyond Thai/English | Initial target market is Thailand clinics |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| AUTH-03 | Phase 1 | Pending |
| AUTH-04 | Phase 1 | Pending |
| AUTH-05 | Phase 1 | Pending |
| ORG-01 | Phase 1 | Pending |
| ORG-02 | Phase 1 | Pending |
| ORG-03 | Phase 1 | Pending |
| ORG-04 | Phase 1 | Pending |
| PATO-01 | Phase 2 | Pending |
| PATO-02 | Phase 2 | Pending |
| PATO-03 | Phase 2 | Pending |
| PATO-04 | Phase 2 | Pending |
| PATO-05 | Phase 2 | Pending |
| APPT-01 | Phase 3 | Pending |
| APPT-02 | Phase 3 | Pending |
| APPT-03 | Phase 3 | Pending |
| APPT-04 | Phase 3 | Pending |
| SOAP-01 | Phase 4 | Pending |
| SOAP-02 | Phase 4 | Pending |
| SOAP-03 | Phase 4 | Pending |
| SOAP-04 | Phase 4 | Pending |
| SOAP-05 | Phase 4 | Pending |
| BILL-01 | Phase 5 | Pending |
| BILL-02 | Phase 5 | Pending |
| BILL-03 | Phase 5 | Pending |
| BILL-04 | Phase 5 | Pending |
| BILL-05 | Phase 5 | Pending |
| UX-01 | Phase 5 | Pending |
| UX-02 | Phase 5 | Pending |
| UX-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 31 total
- Mapped to phases: 31
- Unmapped: 0

---
*Requirements defined: 2026-04-19*
*Last updated: 2026-04-19 after roadmap mapping*
