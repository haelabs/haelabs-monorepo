'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Button } from '@petabase/components/ui/button';
import { Card } from '@petabase/components/ui/card';
import { Input } from '@petabase/components/ui/input';
import { useToast } from '@petabase/components/ui/toast-provider';
import type { AppLocale } from '@petabase/lib/i18n/config';
import { withLocale } from '@petabase/lib/navigation/locale-path';
import {
  appointments,
  branches,
  consultations,
  getBranch,
  getInvoice,
  getInvoiceTotals,
  getOwner,
  getOwnerPets,
  getPatient,
  getStaff,
  invoices,
  owners,
  patients,
  staffMembers,
  type AppointmentStatus,
  type InvoiceStatus,
  type Owner,
  type PaymentMethod,
  type StaffMember,
  type StaffRole,
} from '@petabase/features/prototype/mock-data';

function formatCurrency(value: number, locale: AppLocale) {
  return new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDateTime(value: string, locale: AppLocale) {
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function statusLabel(status: string, locale: AppLocale) {
  const isThai = locale === 'th';
  const labels: Record<string, string> = {
    scheduled: isThai ? 'นัดไว้' : 'Scheduled',
    confirmed: isThai ? 'ยืนยันแล้ว' : 'Confirmed',
    'in-progress': isThai ? 'กำลังดำเนินการ' : 'In progress',
    completed: isThai ? 'เสร็จสิ้น' : 'Completed',
    cancelled: isThai ? 'ยกเลิก' : 'Cancelled',
    'no-show': isThai ? 'ไม่มาตามนัด' : 'No-show',
    draft: isThai ? 'ร่าง' : 'Draft',
    sent: isThai ? 'ส่งแล้ว' : 'Sent',
    paid: isThai ? 'ชำระแล้ว' : 'Paid',
    overdue: isThai ? 'เกินกำหนด' : 'Overdue',
  };

  return labels[status] ?? status;
}

export function PrototypePatientsPage({ locale }: { locale: AppLocale }) {
  const isThai = locale === 'th';
  const { push } = useToast();
  const [search, setSearch] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'Dog' | 'Cat' | 'Rabbit'>('all');
  const [selectedOwnerId, setSelectedOwnerId] = useState(owners[0]?.id ?? '');
  const selectedOwner = owners.find((owner) => owner.id === selectedOwnerId) ?? owners[0];
  const [ownerDraft, setOwnerDraft] = useState<Owner>(selectedOwner);

  useEffect(() => {
    if (selectedOwner) {
      setOwnerDraft(selectedOwner);
    }
  }, [selectedOwner]);

  const filteredPatients = patients.filter((patient) => {
    const owner = getOwner(patient.ownerId);
    const matchesSearch = [patient.name, patient.breed, owner?.name ?? '']
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesSpecies = speciesFilter === 'all' || patient.species === speciesFilter;

    return matchesSearch && matchesSpecies;
  });

  function saveOwner() {
    push(
      isThai
        ? `บันทึกข้อมูลเจ้าของ ${ownerDraft.name} ในโหมดต้นแบบแล้ว`
        : `Saved owner profile for ${ownerDraft.name} in prototype mode.`,
    );
  }

  function createOwner() {
    setOwnerDraft({
      id: 'owner-new',
      name: isThai ? 'เจ้าของใหม่' : 'New owner',
      phone: '',
      email: '',
      lineId: '',
      branchId: branches[0]?.id ?? 'bangkok-hq',
      address: '',
      notes: '',
    });
    push(isThai ? 'เปิดฟอร์มสร้างเจ้าของใหม่แล้ว' : 'Opened new owner form.');
  }

  return (
    <>
      <Card className="pb-phase-hero">
        <div>
          <p className="pb-sidebar-kicker">Patients + Owners</p>
          <h2>{isThai ? 'ค้นหาเวชระเบียน ดูประวัติ และจัดการเจ้าของสัตว์เลี้ยง' : 'Search patient records, review history, and manage owners'}</h2>
          <p>
            {isThai
              ? 'หน้าเดียวสำหรับค้นหาคนไข้ เชื่อมเจ้าของ ดูประวัติการรักษา และเตรียมทางลัดไปยังนัดหมายหรือ SOAP note'
              : 'A single workspace for patient search, owner linkage, care history, and quick jumps into appointments or SOAP notes.'}
          </p>
        </div>
        <div className="pb-phase-status-bar">
          <div>
            <p className="pb-stat-label">{isThai ? 'คนไข้ทั้งหมด' : 'Total patients'}</p>
            <p className="pb-stat-value">{patients.length}</p>
          </div>
          <div>
            <p className="pb-stat-label">{isThai ? 'เจ้าของที่เชื่อมแล้ว' : 'Linked owners'}</p>
            <p className="pb-stat-value">{owners.length}</p>
          </div>
        </div>
      </Card>

      <section className="pb-kpi-grid">
        <Card className="pb-kpi-card">
          <p className="pb-stat-label">{isThai ? 'เตือนวัคซีน' : 'Vaccination reminders'}</p>
          <p className="pb-stat-value">2</p>
          <p className="pb-stat-trend">{isThai ? 'ภายใน 7 วัน' : 'Due within 7 days'}</p>
        </Card>
        <Card className="pb-kpi-card">
          <p className="pb-stat-label">{isThai ? 'เอกสารล่าสุด' : 'Recent documents'}</p>
          <p className="pb-stat-value">4</p>
          <p className="pb-stat-trend">{isThai ? 'พร้อมดูจากโปรไฟล์คนไข้' : 'Accessible from patient profiles'}</p>
        </Card>
      </section>

      <section className="pb-split-grid pb-split-grid-wide">
        <Card>
          <div className="pb-table-toolbar">
            <div>
              <p className="pb-table-title">{isThai ? 'รายชื่อคนไข้' : 'Patient list'}</p>
              <p className="pb-table-caption">{isThai ? 'ค้นหาตามชื่อ สายพันธุ์ หรือเจ้าของ' : 'Search by patient, breed, or owner'}</p>
            </div>
          </div>
          <div className="pb-toolbar-grid">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={isThai ? 'ค้นหาคนไข้หรือเจ้าของ' : 'Search patient or owner'}
            />
            <select
              className="pb-select"
              value={speciesFilter}
              onChange={(event) => setSpeciesFilter(event.target.value as 'all' | 'Dog' | 'Cat' | 'Rabbit')}
            >
              <option value="all">{isThai ? 'ทุกประเภท' : 'All species'}</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Rabbit">Rabbit</option>
            </select>
          </div>
          <div className="pb-table-wrap">
            <table className="pb-table">
              <thead>
                <tr>
                  <th>{isThai ? 'คนไข้' : 'Patient'}</th>
                  <th>{isThai ? 'เจ้าของ' : 'Owner'}</th>
                  <th>{isThai ? 'สาขา' : 'Branch'}</th>
                  <th>{isThai ? 'นัดถัดไป' : 'Next visit'}</th>
                  <th>{isThai ? 'การแจ้งเตือน' : 'Alerts'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => {
                  const owner = getOwner(patient.ownerId);
                  const branch = getBranch(patient.branchId);
                  return (
                    <tr key={patient.id}>
                      <td data-label={isThai ? 'คนไข้' : 'Patient'}>
                        <Link className="pb-row-main pb-inline-link" href={withLocale(locale, `/patients/${patient.id}`)}>
                          {patient.name}
                        </Link>
                        <span className="pb-row-meta">{patient.species} • {patient.breed}</span>
                      </td>
                      <td data-label={isThai ? 'เจ้าของ' : 'Owner'}>{owner?.name}</td>
                      <td data-label={isThai ? 'สาขา' : 'Branch'}>{branch?.name}</td>
                      <td data-label={isThai ? 'นัดถัดไป' : 'Next visit'}>{formatDateTime(patient.nextVisit, locale)}</td>
                      <td data-label={isThai ? 'การแจ้งเตือน' : 'Alerts'}>
                        <div className="pb-tag-list">
                          {patient.tags.map((tag) => (
                            <span key={tag} className="pb-pill">{tag}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'จัดการเจ้าของสัตว์เลี้ยง' : 'Owner CRUD prototype'}</h2>
            <p>
              {isThai
                ? 'แก้ไขข้อมูลติดต่อ ผูกสัตว์เลี้ยงในบัญชีเดียว และจำลองการสร้างเจ้าของใหม่'
                : 'Edit contact details, review linked pets, and simulate creating a new owner.'}
            </p>
          </header>
          <div className="pb-toolbar-grid">
            <select className="pb-select" value={selectedOwnerId} onChange={(event) => setSelectedOwnerId(event.target.value)}>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>{owner.name}</option>
              ))}
            </select>
            <Button type="button" variant="ghost" onClick={createOwner}>{isThai ? 'สร้างเจ้าของใหม่' : 'New owner'}</Button>
          </div>
          <form className="pb-form-grid" onSubmit={(event) => event.preventDefault()}>
            <div className="pb-field">
              <label htmlFor="owner-name">{isThai ? 'ชื่อเจ้าของ' : 'Owner name'}</label>
              <Input id="owner-name" value={ownerDraft.name} onChange={(event) => setOwnerDraft({ ...ownerDraft, name: event.target.value })} />
            </div>
            <div className="pb-field">
              <label htmlFor="owner-phone">{isThai ? 'โทรศัพท์' : 'Phone'}</label>
              <Input id="owner-phone" value={ownerDraft.phone} onChange={(event) => setOwnerDraft({ ...ownerDraft, phone: event.target.value })} />
            </div>
            <div className="pb-field">
              <label htmlFor="owner-email">Email</label>
              <Input id="owner-email" value={ownerDraft.email} onChange={(event) => setOwnerDraft({ ...ownerDraft, email: event.target.value })} />
            </div>
            <div className="pb-field">
              <label htmlFor="owner-line">LINE ID</label>
              <Input id="owner-line" value={ownerDraft.lineId} onChange={(event) => setOwnerDraft({ ...ownerDraft, lineId: event.target.value })} />
            </div>
            <div className="pb-field pb-field-span-full">
              <label htmlFor="owner-address">{isThai ? 'ที่อยู่' : 'Address'}</label>
              <Input id="owner-address" value={ownerDraft.address} onChange={(event) => setOwnerDraft({ ...ownerDraft, address: event.target.value })} />
            </div>
            <div className="pb-field pb-field-span-full">
              <label htmlFor="owner-notes">{isThai ? 'บันทึก' : 'Notes'}</label>
              <Input id="owner-notes" value={ownerDraft.notes} onChange={(event) => setOwnerDraft({ ...ownerDraft, notes: event.target.value })} />
            </div>
          </form>
          <div className="pb-linked-panel">
            <p className="pb-table-title">{isThai ? 'สัตว์เลี้ยงที่เชื่อมอยู่' : 'Linked pets'}</p>
            <ul className="pb-workflow-list">
              {getOwnerPets(selectedOwner?.id ?? '').map((pet) => (
                <li key={pet.id}>
                  <p className="pb-workflow-role">{pet.name} • {pet.species}</p>
                  <p className="pb-workflow-copy">{pet.breed} • {isThai ? 'นัดถัดไป' : 'Next visit'} {formatDateTime(pet.nextVisit, locale)}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="pb-form-actions">
            <Button type="button" variant="ghost">{isThai ? 'ลบบัญชีต้นแบบ' : 'Delete draft owner'}</Button>
            <Button type="button" onClick={saveOwner}>{isThai ? 'บันทึกข้อมูลเจ้าของ' : 'Save owner changes'}</Button>
          </div>
        </Card>
      </section>
    </>
  );
}

export function PrototypeAppointmentsPage({ locale }: { locale: AppLocale }) {
  const isThai = locale === 'th';
  const { push } = useToast();
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentStatus>('all');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(appointments[0]?.id ?? '');
  const [draftStatus, setDraftStatus] = useState<AppointmentStatus>('confirmed');

  const filteredAppointments = appointments.filter((appointment) => statusFilter === 'all' || appointment.status === statusFilter);
  const selectedAppointment = filteredAppointments.find((appointment) => appointment.id === selectedAppointmentId) ?? filteredAppointments[0] ?? appointments[0];

  useEffect(() => {
    if (selectedAppointment) {
      setDraftStatus(selectedAppointment.status);
    }
  }, [selectedAppointment]);

  function saveStatus() {
    if (!selectedAppointment) {
      return;
    }

    push(
      isThai
        ? `อัปเดตสถานะนัดหมาย ${selectedAppointment.id} เป็น ${statusLabel(draftStatus, locale)}`
        : `Updated appointment ${selectedAppointment.id} to ${statusLabel(draftStatus, locale)}.`,
    );
  }

  function createAppointment() {
    push(isThai ? 'สร้างนัดหมายต้นแบบใหม่แล้ว' : 'Created a new prototype appointment.');
  }

  return (
    <>
      <Card className="pb-phase-hero">
        <div>
          <p className="pb-sidebar-kicker">Appointments</p>
          <h2>{isThai ? 'ปฏิทินนัดหมาย ตารางเวลา และสถานะการเข้ารับบริการ' : 'Calendar scheduling, slot grid, and appointment status flow'}</h2>
          <p>
            {isThai
              ? 'เปลี่ยนมุมมองวัน/สัปดาห์/เดือน กรองตามสถานะ และผลักนัดหมายต่อไปยัง consultation ด้วยข้อมูลจำลองเดียวกัน'
              : 'Switch between day, week, and month views, filter by status, and push appointments into consultation using the same mock dataset.'}
          </p>
        </div>
        <div className="pb-phase-status-bar">
          <div>
            <p className="pb-stat-label">{isThai ? 'นัดวันนี้' : 'Today appointments'}</p>
            <p className="pb-stat-value">{appointments.length}</p>
          </div>
          <div>
            <p className="pb-stat-label">{isThai ? 'กำลังตรวจ' : 'In consult'}</p>
            <p className="pb-stat-value">1</p>
          </div>
        </div>
      </Card>

      <section className="pb-split-grid pb-split-grid-wide">
        <Card>
          <div className="pb-table-toolbar">
            <div>
              <p className="pb-table-title">{isThai ? 'ปฏิทินและ list view' : 'Calendar and list view'}</p>
            </div>
            <div className="pb-table-actions">
              <div className="pb-segmented-control">
                {(['day', 'week', 'month'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="pb-segmented-btn"
                    data-active={option === view}
                    onClick={() => setView(option)}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
              <select className="pb-select pb-select-compact" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | AppointmentStatus)}>
                <option value="all">{isThai ? 'ทุกสถานะ' : 'All statuses'}</option>
                <option value="scheduled">{statusLabel('scheduled', locale)}</option>
                <option value="confirmed">{statusLabel('confirmed', locale)}</option>
                <option value="in-progress">{statusLabel('in-progress', locale)}</option>
                <option value="completed">{statusLabel('completed', locale)}</option>
                <option value="cancelled">{statusLabel('cancelled', locale)}</option>
                <option value="no-show">{statusLabel('no-show', locale)}</option>
              </select>
            </div>
          </div>

          <div className="pb-calendar-grid" data-view={view}>
            {filteredAppointments.map((appointment) => {
              const patient = getPatient(appointment.patientId);
              const branch = getBranch(appointment.branchId);
              return (
                <button
                  key={appointment.id}
                  type="button"
                  className="pb-calendar-slot"
                  data-active={appointment.id === selectedAppointment?.id}
                  onClick={() => setSelectedAppointmentId(appointment.id)}
                >
                  <span className="pb-workflow-role">{new Date(appointment.startsAt).toLocaleTimeString(locale === 'th' ? 'th-TH' : 'en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="pb-workflow-copy">{patient?.name} • {appointment.type}</span>
                  <span className="pb-row-meta">{branch?.name} • {appointment.room}</span>
                  <span className="pb-pill" data-status={appointment.status}>{statusLabel(appointment.status, locale)}</span>
                </button>
              );
            })}
          </div>

          <div className="pb-table-wrap">
            <table className="pb-table">
              <thead>
                <tr>
                  <th>{isThai ? 'เวลา' : 'Time'}</th>
                  <th>{isThai ? 'คนไข้' : 'Patient'}</th>
                  <th>{isThai ? 'ประเภท' : 'Type'}</th>
                  <th>{isThai ? 'แพทย์' : 'Doctor'}</th>
                  <th>{isThai ? 'สถานะ' : 'Status'}</th>
                  <th>{isThai ? 'ลิงก์งานต่อ' : 'Next step'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((appointment) => {
                  const patient = getPatient(appointment.patientId);
                  const doctor = getStaff(appointment.doctorId);
                  return (
                    <tr key={appointment.id}>
                      <td data-label={isThai ? 'เวลา' : 'Time'}>{formatDateTime(appointment.startsAt, locale)}</td>
                      <td data-label={isThai ? 'คนไข้' : 'Patient'}>{patient?.name}</td>
                      <td data-label={isThai ? 'ประเภท' : 'Type'}>{appointment.type}</td>
                      <td data-label={isThai ? 'แพทย์' : 'Doctor'}>{doctor?.name}</td>
                      <td data-label={isThai ? 'สถานะ' : 'Status'}><span className="pb-pill" data-status={appointment.status}>{statusLabel(appointment.status, locale)}</span></td>
                      <td data-label={isThai ? 'ลิงก์งานต่อ' : 'Next step'}>
                        <Link className="pb-inline-link" href={withLocale(locale, '/consultations')}>
                          {isThai ? 'เปิด Consultation' : 'Open consultation'}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'อัปเดตสถานะและสร้างนัดใหม่' : 'Update status and create appointment'}</h2>
            <p>
              {isThai
                ? 'จำลอง workflow ตั้งแต่นัดไว้ ยืนยัน เข้าตรวจ เสร็จสิ้น ยกเลิก และ no-show'
                : 'Simulate the full appointment workflow from scheduled through confirmed, in-progress, completed, cancelled, and no-show.'}
            </p>
          </header>
          {selectedAppointment ? (
            <div className="pb-detail-stack">
              <div className="pb-status-flow">
                {(['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'] as AppointmentStatus[]).map((step) => (
                  <div key={step} className="pb-status-step" data-active={draftStatus === step}>
                    <span className="pb-pill" data-status={step}>{statusLabel(step, locale)}</span>
                  </div>
                ))}
              </div>
              <div className="pb-field">
                <label htmlFor="appointment-status">{isThai ? 'สถานะปัจจุบัน' : 'Current status'}</label>
                <select id="appointment-status" className="pb-select" value={draftStatus} onChange={(event) => setDraftStatus(event.target.value as AppointmentStatus)}>
                  {(['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'no-show'] as AppointmentStatus[]).map((step) => (
                    <option key={step} value={step}>{statusLabel(step, locale)}</option>
                  ))}
                </select>
              </div>
              <div className="pb-detail-list">
                <div><strong>{isThai ? 'เหตุผล' : 'Reason'}:</strong> {selectedAppointment.reason}</div>
                <div><strong>{isThai ? 'หมายเหตุ' : 'Note'}:</strong> {selectedAppointment.note}</div>
              </div>
              <div className="pb-form-actions">
                <Link className="pb-btn pb-btn-ghost" href={withLocale(locale, '/consultations')}>
                  {isThai ? 'เปิด consultation' : 'Open consultation'}
                </Link>
                <Button type="button" onClick={saveStatus}>{isThai ? 'บันทึกสถานะ' : 'Save status'}</Button>
              </div>
            </div>
          ) : null}

          <div className="pb-linked-panel">
            <p className="pb-table-title">{isThai ? 'ฟอร์มนัดหมายต้นแบบ' : 'Prototype appointment form'}</p>
            <div className="pb-form-grid">
              <div className="pb-field">
                <label htmlFor="new-patient">{isThai ? 'คนไข้' : 'Patient'}</label>
                <select id="new-patient" className="pb-select">
                  {patients.map((patient) => (
                    <option key={patient.id}>{patient.name}</option>
                  ))}
                </select>
              </div>
              <div className="pb-field">
                <label htmlFor="new-type">{isThai ? 'ประเภทนัดหมาย' : 'Appointment type'}</label>
                <select id="new-type" className="pb-select">
                  <option>Consultation</option>
                  <option>Vaccination</option>
                  <option>Dental</option>
                  <option>Emergency</option>
                </select>
              </div>
            </div>
            <div className="pb-form-actions">
              <Button type="button" onClick={createAppointment}>{isThai ? 'สร้างนัดหมาย' : 'Create appointment'}</Button>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}

export function PrototypeConsultationsPage({ locale }: { locale: AppLocale }) {
  const isThai = locale === 'th';
  const { push } = useToast();
  const [selectedConsultationId, setSelectedConsultationId] = useState(consultations[0]?.id ?? '');
  const selectedConsultation = consultations.find((consultation) => consultation.id === selectedConsultationId) ?? consultations[0];
  const [soapDraft, setSoapDraft] = useState(selectedConsultation?.soap);
  const [prescriptionsDraft, setPrescriptionsDraft] = useState(selectedConsultation?.prescriptions ?? []);

  useEffect(() => {
    if (selectedConsultation) {
      setSoapDraft(selectedConsultation.soap);
      setPrescriptionsDraft(selectedConsultation.prescriptions);
    }
  }, [selectedConsultation]);

  if (!selectedConsultation || !soapDraft) {
    return null;
  }

  const patient = getPatient(selectedConsultation.patientId);
  const doctor = getStaff(selectedConsultation.doctorId);
  const invoice = getInvoice(selectedConsultation.invoiceId);

  function saveSoap() {
    push(isThai ? 'บันทึก SOAP note ต้นแบบแล้ว' : 'Saved prototype SOAP note.');
  }

  function createInvoice() {
    push(isThai ? 'สร้าง draft invoice จาก consultation แล้ว' : 'Created draft invoice from consultation.');
  }

  return (
    <>
      <Card className="pb-phase-hero">
        <div>
          <p className="pb-sidebar-kicker">Consultations + SOAP</p>
          <h2>{isThai ? 'ไหลงานจากนัดหมายสู่ SOAP note ใบยา และใบแจ้งหนี้' : 'Move from appointments into SOAP notes, prescriptions, and invoices'}</h2>
          <p>
            {isThai
              ? 'หน้าจอ consultation รวมประวัติ ตรวจปัจจุบัน SOAP form ใบยา และทางลัดไปยังใบพิมพ์หรือ billing'
              : 'The consultation workspace combines history, current exam, SOAP form, prescriptions, and quick links into print or billing flows.'}
          </p>
        </div>
        <div className="pb-phase-status-bar">
          <div>
            <p className="pb-stat-label">{isThai ? 'consultations วันนี้' : 'Today consultations'}</p>
            <p className="pb-stat-value">{consultations.length}</p>
          </div>
          <div>
            <p className="pb-stat-label">{isThai ? 'พร้อมออกใบแจ้งหนี้' : 'Ready for invoice'}</p>
            <p className="pb-stat-value">2</p>
          </div>
        </div>
      </Card>

      <section className="pb-split-grid pb-split-grid-wide">
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'ประวัติ consultation' : 'Consultation history'}</h2>
            <p>{isThai ? 'เลือกเคสเพื่อแก้ไข SOAP note หรือไปดู printable view' : 'Select a case to edit SOAP notes or jump into a printable view.'}</p>
          </header>
          <div className="pb-workflow-list">
            {consultations.map((consultation) => {
              const listPatient = getPatient(consultation.patientId);
              return (
                <button
                  key={consultation.id}
                  type="button"
                  className="pb-list-card-button"
                  data-active={consultation.id === selectedConsultationId}
                  onClick={() => setSelectedConsultationId(consultation.id)}
                >
                  <div>
                    <p className="pb-workflow-role">{listPatient?.name} • {consultation.diagnosis}</p>
                    <p className="pb-workflow-copy">{formatDateTime(consultation.startedAt, locale)}</p>
                  </div>
                  <span className="pb-pill" data-status="confirmed">{isThai ? 'พร้อมพิมพ์' : 'Printable'}</span>
                </button>
              );
            })}
          </div>
        </Card>

        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'SOAP note form' : 'SOAP note form'}</h2>
            <p>
              {patient?.name} • {doctor?.name}
            </p>
          </header>
          <div className="pb-detail-list pb-detail-list-grid">
            <div><strong>{isThai ? 'คนไข้' : 'Patient'}:</strong> {patient?.name}</div>
            <div><strong>{isThai ? 'แพทย์' : 'Doctor'}:</strong> {doctor?.name}</div>
            <div><strong>{isThai ? 'วินิจฉัย' : 'Diagnosis'}:</strong> {selectedConsultation.diagnosis}</div>
            <div><strong>{isThai ? 'Invoice' : 'Invoice'}:</strong> {invoice?.id}</div>
          </div>

          <div className="pb-field">
            <label htmlFor="soap-subjective">Subjective</label>
            <textarea id="soap-subjective" className="pb-textarea" value={soapDraft.subjective} onChange={(event) => setSoapDraft({ ...soapDraft, subjective: event.target.value })} />
          </div>
          <div className="pb-field">
            <label htmlFor="soap-objective">Objective</label>
            <textarea id="soap-objective" className="pb-textarea" value={soapDraft.objective} onChange={(event) => setSoapDraft({ ...soapDraft, objective: event.target.value })} />
          </div>
          <div className="pb-field">
            <label htmlFor="soap-assessment">Assessment</label>
            <textarea id="soap-assessment" className="pb-textarea" value={soapDraft.assessment} onChange={(event) => setSoapDraft({ ...soapDraft, assessment: event.target.value })} />
          </div>
          <div className="pb-field">
            <label htmlFor="soap-plan">Plan</label>
            <textarea id="soap-plan" className="pb-textarea" value={soapDraft.plan} onChange={(event) => setSoapDraft({ ...soapDraft, plan: event.target.value })} />
          </div>

          <div className="pb-linked-panel">
            <p className="pb-table-title">{isThai ? 'Prescription' : 'Prescription'}</p>
            <div className="pb-workflow-list">
              {prescriptionsDraft.map((item) => (
                <li key={item.id}>
                  <p className="pb-workflow-role">{item.medication}</p>
                  <p className="pb-workflow-copy">{item.dosage} • {item.frequency} • {item.duration}</p>
                </li>
              ))}
            </div>
          </div>

          <div className="pb-form-actions">
            <Link className="pb-btn pb-btn-ghost" href={withLocale(locale, `/consultations/${selectedConsultation.id}/print`)}>
              {isThai ? 'เปิดใบพิมพ์' : 'Open print view'}
            </Link>
            <Button type="button" variant="ghost" onClick={createInvoice}>{isThai ? 'สร้าง invoice' : 'Create invoice'}</Button>
            <Button type="button" onClick={saveSoap}>{isThai ? 'บันทึก SOAP' : 'Save SOAP'}</Button>
          </div>
        </Card>
      </section>
    </>
  );
}

export function PrototypeBillingPage({ locale }: { locale: AppLocale }) {
  const isThai = locale === 'th';
  const { push } = useToast();
  const [statusFilter, setStatusFilter] = useState<'all' | InvoiceStatus>('all');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(invoices[0]?.id ?? '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Cash');
  const [paymentAmount, setPaymentAmount] = useState('');

  const filteredInvoices = invoices.filter((invoice) => statusFilter === 'all' || invoice.status === statusFilter);
  const selectedInvoice = filteredInvoices.find((invoice) => invoice.id === selectedInvoiceId) ?? filteredInvoices[0] ?? invoices[0];
  const totals = selectedInvoice ? getInvoiceTotals(selectedInvoice) : null;

  function recordPayment() {
    push(
      isThai
        ? `บันทึกการชำระเงิน ${paymentMethod} จำนวน ${paymentAmount || '0'} บาทแล้ว`
        : `Recorded ${paymentMethod} payment for THB ${paymentAmount || '0'}.`,
    );
    setPaymentAmount('');
  }

  const summary = {
    day: invoices.reduce((sum, invoice) => sum + getInvoiceTotals(invoice).total, 0),
    week: invoices.reduce((sum, invoice) => sum + getInvoiceTotals(invoice).paid, 0),
    month: invoices.reduce((sum, invoice) => sum + getInvoiceTotals(invoice).due, 0),
  };

  return (
    <>
      <Card className="pb-phase-hero">
        <div>
          <p className="pb-sidebar-kicker">Billing + Invoices</p>
          <h2>{isThai ? 'สร้าง invoice จาก consultation ติดตามสถานะ และรับชำระเงิน' : 'Create invoices from consultations, track status, and record payments'}</h2>
          <p>
            {isThai
              ? 'หน้าจอนี้รวม line items ส่วนลด ภาษี การชำระเงิน และสรุปรายวัน/สัปดาห์/เดือนสำหรับทีมหน้าฟรอนต์'
              : 'This screen combines line items, discounts, tax, payments, and daily/weekly/monthly summaries for checkout teams.'}
          </p>
        </div>
        <div className="pb-phase-status-bar">
          <div>
            <p className="pb-stat-label">{isThai ? 'ยอดออกบิลวันนี้' : 'Issued today'}</p>
            <p className="pb-stat-value">{formatCurrency(summary.day, locale)}</p>
          </div>
          <div>
            <p className="pb-stat-label">{isThai ? 'คงค้าง' : 'Outstanding'}</p>
            <p className="pb-stat-value">{formatCurrency(summary.month, locale)}</p>
          </div>
        </div>
      </Card>

      <section className="pb-kpi-grid">
        <Card className="pb-kpi-card"><p className="pb-stat-label">{isThai ? 'รับชำระสัปดาห์นี้' : 'Collected this week'}</p><p className="pb-stat-value">{formatCurrency(summary.week, locale)}</p></Card>
        <Card className="pb-kpi-card"><p className="pb-stat-label">{isThai ? 'invoice ค้างชำระ' : 'Overdue invoices'}</p><p className="pb-stat-value">1</p></Card>
      </section>

      <section className="pb-split-grid pb-split-grid-wide">
        <Card>
          <div className="pb-table-toolbar">
            <div>
              <p className="pb-table-title">{isThai ? 'รายการ invoice' : 'Invoice list'}</p>
            </div>
            <select className="pb-select pb-select-compact" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as 'all' | InvoiceStatus)}>
              <option value="all">{isThai ? 'ทุกสถานะ' : 'All statuses'}</option>
              <option value="draft">{statusLabel('draft', locale)}</option>
              <option value="sent">{statusLabel('sent', locale)}</option>
              <option value="paid">{statusLabel('paid', locale)}</option>
              <option value="overdue">{statusLabel('overdue', locale)}</option>
            </select>
          </div>
          <div className="pb-table-wrap">
            <table className="pb-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>{isThai ? 'คนไข้' : 'Patient'}</th>
                  <th>{isThai ? 'สถานะ' : 'Status'}</th>
                  <th>{isThai ? 'ยอดรวม' : 'Total'}</th>
                  <th>{isThai ? 'พิมพ์' : 'Print'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((invoice) => {
                  const patient = getPatient(invoice.patientId);
                  const totalsForRow = getInvoiceTotals(invoice);
                  return (
                    <tr key={invoice.id}>
                      <td data-label="Invoice">
                        <button type="button" className="pb-table-link-button" onClick={() => setSelectedInvoiceId(invoice.id)}>{invoice.id}</button>
                      </td>
                      <td data-label={isThai ? 'คนไข้' : 'Patient'}>{patient?.name}</td>
                      <td data-label={isThai ? 'สถานะ' : 'Status'}><span className="pb-pill" data-status={invoice.status}>{statusLabel(invoice.status, locale)}</span></td>
                      <td data-label={isThai ? 'ยอดรวม' : 'Total'}>{formatCurrency(totalsForRow.total, locale)}</td>
                      <td data-label={isThai ? 'พิมพ์' : 'Print'}>
                        <Link className="pb-inline-link" href={withLocale(locale, `/billing/invoices/${invoice.id}/print`)}>{isThai ? 'ใบพิมพ์' : 'Print view'}</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          {selectedInvoice && totals ? (
            <>
              <header className="pb-section-header">
                <h2>{isThai ? 'สร้างและรับชำระ invoice' : 'Invoice creation and payment recording'}</h2>
                <p>{selectedInvoice.id}</p>
              </header>
              <div className="pb-workflow-list">
                {selectedInvoice.lineItems.map((item) => (
                  <li key={item.id}>
                    <p className="pb-workflow-role">{item.label}</p>
                    <p className="pb-workflow-copy">{item.category} • {item.quantity} x {formatCurrency(item.unitPrice, locale)}</p>
                  </li>
                ))}
              </div>
              <div className="pb-detail-list pb-detail-list-grid">
                <div><strong>{isThai ? 'Subtotal' : 'Subtotal'}:</strong> {formatCurrency(totals.subtotal, locale)}</div>
                <div><strong>{isThai ? 'ส่วนลด' : 'Discount'}:</strong> {formatCurrency(selectedInvoice.discount, locale)}</div>
                <div><strong>Tax:</strong> {formatCurrency(totals.tax, locale)}</div>
                <div><strong>{isThai ? 'คงเหลือ' : 'Due'}:</strong> {formatCurrency(totals.due, locale)}</div>
              </div>
              <div className="pb-form-grid">
                <div className="pb-field">
                  <label htmlFor="payment-method">{isThai ? 'วิธีชำระ' : 'Payment method'}</label>
                  <select id="payment-method" className="pb-select" value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Transfer">Transfer</option>
                  </select>
                </div>
                <div className="pb-field">
                  <label htmlFor="payment-amount">{isThai ? 'จำนวนเงิน' : 'Amount'}</label>
                  <Input id="payment-amount" value={paymentAmount} onChange={(event) => setPaymentAmount(event.target.value)} placeholder="500" />
                </div>
              </div>
              <div className="pb-form-actions">
                <Button type="button" variant="ghost">{isThai ? 'ส่ง invoice' : 'Send invoice'}</Button>
                <Button type="button" onClick={recordPayment}>{isThai ? 'บันทึกการชำระเงิน' : 'Record payment'}</Button>
              </div>
            </>
          ) : null}
        </Card>
      </section>
    </>
  );
}

export function PrototypeAdminPage({ locale }: { locale: AppLocale }) {
  const isThai = locale === 'th';
  const { push } = useToast();
  const [branchDrafts, setBranchDrafts] = useState(branches);
  const [staffDrafts, setStaffDrafts] = useState(staffMembers);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<StaffRole>('Receptionist');

  function addBranch() {
    const nextBranch = {
      id: `branch-${branchDrafts.length + 1}`,
      name: `Prototype Branch ${branchDrafts.length + 1}`,
      city: 'Bangkok',
      type: 'Satellite Clinic',
      phone: '+66 2 000 0000',
      manager: 'Pending assignment',
      readiness: 'scheduled' as const,
    };
    setBranchDrafts([...branchDrafts, nextBranch]);
    push(isThai ? 'เพิ่มสาขาต้นแบบใหม่แล้ว' : 'Added a new prototype branch.');
  }

  function inviteStaff() {
    if (!inviteEmail) {
      return;
    }
    const nextStaff: StaffMember = {
      id: `staff-${staffDrafts.length + 1}`,
      name: inviteEmail.split('@')[0] || 'Invited staff',
      email: inviteEmail,
      role: inviteRole,
      branchId: branchDrafts[0]?.id ?? 'bangkok-hq',
      shift: 'Pending',
      status: 'scheduled',
    };
    setStaffDrafts([...staffDrafts, nextStaff]);
    setInviteEmail('');
    push(isThai ? 'ส่งคำเชิญทีมงานต้นแบบแล้ว' : 'Sent prototype staff invite.');
  }

  const permissionRows = [
    { role: 'Admin', access: isThai ? 'ทุกโมดูล + ตั้งค่าองค์กร' : 'All modules + org settings', scope: isThai ? 'ทุกสาขา' : 'All branches' },
    { role: 'Doctor', access: isThai ? 'นัดหมาย คนไข้ SOAP Billing preview' : 'Appointments, patients, SOAP, billing preview', scope: isThai ? 'สาขาที่ได้รับมอบหมาย' : 'Assigned branch' },
    { role: 'Nurse', access: isThai ? 'เตรียมยา ประวัติคนไข้ สถานะหัตถการ' : 'Medication prep, patient history, procedure status', scope: isThai ? 'สาขาที่ได้รับมอบหมาย' : 'Assigned branch' },
    { role: 'Receptionist', access: isThai ? 'ลงทะเบียน นัดหมาย ชำระเงิน' : 'Registration, appointments, payments', scope: isThai ? 'หน้าฟรอนต์และ checkout' : 'Front desk and checkout' },
  ] as const;

  return (
    <>
      <Card className="pb-phase-hero">
        <div>
          <p className="pb-sidebar-kicker">Organization + Users</p>
          <h2>{isThai ? 'ตั้งค่าองค์กร สาขา ทีมงาน และสิทธิ์การเข้าถึง' : 'Configure organization, branches, staff, and permissions'}</h2>
          <p>
            {isThai
              ? 'ขยายหน้าผู้ดูแลเดิมให้รองรับ branch CRUD staff invite role overview และ permission matrix แบบเชื่อมโยงกับ prototype ทั้งระบบ'
              : 'The existing admin view is expanded to cover branch CRUD, staff invites, role overview, and a permission matrix linked to the full prototype.'}
          </p>
        </div>
        <div className="pb-phase-status-bar">
          <div><p className="pb-stat-label">{isThai ? 'สาขา' : 'Branches'}</p><p className="pb-stat-value">{branchDrafts.length}</p></div>
          <div><p className="pb-stat-label">{isThai ? 'ทีมงาน' : 'Staff'}</p><p className="pb-stat-value">{staffDrafts.length}</p></div>
        </div>
      </Card>

      <section className="pb-split-grid pb-split-grid-wide">
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'สาขาและข้อมูลติดต่อ' : 'Branches and contact setup'}</h2>
          </header>
          <div className="pb-workflow-list">
            {branchDrafts.map((branch) => (
              <li key={branch.id}>
                <p className="pb-workflow-role">{branch.name} <span className="pb-pill" data-status={branch.readiness}>{statusLabel(branch.readiness, locale)}</span></p>
                <p className="pb-workflow-copy">{branch.city} • {branch.type} • {branch.manager}</p>
              </li>
            ))}
          </div>
          <div className="pb-form-actions">
            <Button type="button" onClick={addBranch}>{isThai ? 'เพิ่มสาขา' : 'Add branch'}</Button>
          </div>
        </Card>

        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'เชิญทีมงานและบทบาท' : 'Staff invite and roles'}</h2>
          </header>
          <div className="pb-form-grid">
            <div className="pb-field">
              <label htmlFor="invite-email">Email</label>
              <Input id="invite-email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="nurse.new@clinic-demo.com" />
            </div>
            <div className="pb-field">
              <label htmlFor="invite-role">{isThai ? 'บทบาท' : 'Role'}</label>
              <select id="invite-role" className="pb-select" value={inviteRole} onChange={(event) => setInviteRole(event.target.value as StaffRole)}>
                <option value="Admin">Admin</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>
          </div>
          <div className="pb-form-actions">
            <Button type="button" onClick={inviteStaff}>{isThai ? 'ส่งคำเชิญ' : 'Send invite'}</Button>
          </div>

          <div className="pb-table-wrap">
            <table className="pb-table">
              <thead>
                <tr>
                  <th>{isThai ? 'ทีมงาน' : 'Staff'}</th>
                  <th>{isThai ? 'บทบาท' : 'Role'}</th>
                  <th>{isThai ? 'ขอบเขต' : 'Scope'}</th>
                  <th>{isThai ? 'สถานะ' : 'Status'}</th>
                </tr>
              </thead>
              <tbody>
                {staffDrafts.map((staff) => (
                  <tr key={staff.id}>
                    <td data-label={isThai ? 'ทีมงาน' : 'Staff'}><span className="pb-row-main">{staff.name}</span><span className="pb-row-meta">{staff.email}</span></td>
                    <td data-label={isThai ? 'บทบาท' : 'Role'}><span className="pb-pill">{staff.role}</span></td>
                    <td data-label={isThai ? 'ขอบเขต' : 'Scope'}>{getBranch(staff.branchId)?.name}</td>
                    <td data-label={isThai ? 'สถานะ' : 'Status'}><span className="pb-pill" data-status={staff.status}>{statusLabel(staff.status, locale)}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      <Card>
        <header className="pb-section-header">
          <h2>{isThai ? 'Permission matrix' : 'Permission matrix'}</h2>
          <p>{isThai ? 'สรุปขอบเขตสิทธิ์ใน prototype สำหรับบทบาทหลัก' : 'A prototype-level summary of access scope for core roles.'}</p>
        </header>
        <div className="pb-table-wrap">
          <table className="pb-table">
            <thead>
              <tr>
                <th>{isThai ? 'บทบาท' : 'Role'}</th>
                <th>{isThai ? 'สิทธิ์หลัก' : 'Primary access'}</th>
                <th>{isThai ? 'ขอบเขต' : 'Scope'}</th>
              </tr>
            </thead>
            <tbody>
              {permissionRows.map((row) => (
                <tr key={row.role}>
                  <td data-label={isThai ? 'บทบาท' : 'Role'}>{row.role}</td>
                  <td data-label={isThai ? 'สิทธิ์หลัก' : 'Primary access'}>{row.access}</td>
                  <td data-label={isThai ? 'ขอบเขต' : 'Scope'}>{row.scope}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
