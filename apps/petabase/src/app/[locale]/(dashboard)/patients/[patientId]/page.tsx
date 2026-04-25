import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PageContainer } from '@petabase/components/layout/page-container';
import { Card } from '@petabase/components/ui/card';
import {
  getBranch,
  getOwner,
  getPatient,
  getPatientAppointments,
  getPatientConsultations,
  getPatientInvoices,
} from '@petabase/features/prototype/mock-data';
import { ensureLocale } from '@petabase/lib/i18n/locale';
import { withLocale } from '@petabase/lib/navigation/locale-path';

type PatientProfilePageProps = {
  params: Promise<{ locale: string; patientId: string }>;
};

function formatDateTime(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export default async function PatientProfilePage({ params }: PatientProfilePageProps) {
  const { locale: localeParam, patientId } = await params;
  const locale = ensureLocale(localeParam);
  const isThai = locale === 'th';
  const patient = getPatient(patientId);

  if (!patient) {
    notFound();
  }

  const owner = getOwner(patient.ownerId);
  const branch = getBranch(patient.branchId);
  const patientAppointments = getPatientAppointments(patient.id);
  const patientConsultations = getPatientConsultations(patient.id);
  const patientInvoices = getPatientInvoices(patient.id);

  return (
    <PageContainer
      title={`${patient.name} ${isThai ? 'โปรไฟล์คนไข้' : 'patient profile'}`}
      description={isThai ? 'ดูรูปคนไข้ เจ้าของ ประวัติการรักษา เอกสาร และลิงก์ workflow ต่อเนื่อง' : 'Review photo, owner card, medical history, documents, and connected workflow links.'}
    >
      <Card className="pb-phase-hero">
        <div className="pb-profile-hero">
          <div className="pb-avatar">{patient.photoLabel}</div>
          <div>
            <p className="pb-sidebar-kicker">{patient.species}</p>
            <h2>{patient.name}</h2>
            <p>{patient.breed} • {patient.sex} • {patient.age} • {patient.weightKg} kg</p>
          </div>
        </div>
        <div className="pb-phase-status-bar">
          <div><p className="pb-stat-label">{isThai ? 'สาขา' : 'Branch'}</p><p className="pb-stat-value pb-stat-value-sm">{branch?.name}</p></div>
          <div><p className="pb-stat-label">{isThai ? 'นัดถัดไป' : 'Next visit'}</p><p className="pb-stat-value pb-stat-value-sm">{formatDateTime(patient.nextVisit, locale)}</p></div>
        </div>
      </Card>

      <section className="pb-split-grid pb-split-grid-wide">
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'Owner card' : 'Owner card'}</h2>
          </header>
          <div className="pb-detail-list">
            <div><strong>{isThai ? 'ชื่อ' : 'Name'}:</strong> {owner?.name}</div>
            <div><strong>{isThai ? 'โทรศัพท์' : 'Phone'}:</strong> {owner?.phone}</div>
            <div><strong>Email:</strong> {owner?.email}</div>
            <div><strong>LINE:</strong> {owner?.lineId}</div>
            <div><strong>{isThai ? 'หมายเหตุ' : 'Notes'}:</strong> {owner?.notes}</div>
          </div>
        </Card>
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'ข้อมูลพื้นฐาน' : 'Clinical summary'}</h2>
          </header>
          <div className="pb-detail-list">
            <div><strong>{isThai ? 'Microchip' : 'Microchip'}:</strong> {patient.microchip}</div>
            <div><strong>{isThai ? 'สี' : 'Color'}:</strong> {patient.color}</div>
            <div><strong>{isThai ? 'แจ้งเตือน' : 'Alerts'}:</strong> {patient.alerts.join(', ')}</div>
            <div><strong>{isThai ? 'แท็ก' : 'Tags'}:</strong> {patient.tags.join(', ')}</div>
          </div>
        </Card>
      </section>

      <section className="pb-split-grid pb-split-grid-wide">
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'Medical history timeline' : 'Medical history timeline'}</h2>
          </header>
          <ul className="pb-timeline">
            {patient.timeline.map((entry) => (
              <li key={entry.id} data-state={entry.status === 'confirmed' ? 'done' : entry.status === 'in-progress' ? 'in-progress' : 'scheduled'}>
                <p className="pb-workflow-role">{entry.date} • {entry.title}</p>
                <p className="pb-workflow-copy">{entry.note}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'Documents' : 'Documents'}</h2>
          </header>
          <ul className="pb-workflow-list">
            {patient.documents.map((document) => (
              <li key={document.id}>
                <p className="pb-workflow-role">{document.name}</p>
                <p className="pb-workflow-copy">{document.kind} • {document.uploadedAt}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="pb-split-grid pb-split-grid-wide">
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'Appointments' : 'Appointments'}</h2>
          </header>
          <ul className="pb-workflow-list">
            {patientAppointments.map((appointment) => (
              <li key={appointment.id}>
                <p className="pb-workflow-role">{formatDateTime(appointment.startsAt, locale)} • {appointment.type}</p>
                <p className="pb-workflow-copy">{appointment.reason}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'Consultations + Billing' : 'Consultations + Billing'}</h2>
          </header>
          <div className="pb-link-grid">
            {patientConsultations.map((consultation) => (
              <Link key={consultation.id} className="pb-link-card" href={withLocale(locale, `/consultations/${consultation.id}/print`)}>
                <strong>{consultation.id}</strong>
                <span>{consultation.diagnosis}</span>
              </Link>
            ))}
            {patientInvoices.map((invoice) => (
              <Link key={invoice.id} className="pb-link-card" href={withLocale(locale, `/billing/invoices/${invoice.id}/print`)}>
                <strong>{invoice.id}</strong>
                <span>{isThai ? 'เปิดใบพิมพ์ invoice' : 'Open invoice print view'}</span>
              </Link>
            ))}
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
