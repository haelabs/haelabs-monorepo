import Link from 'next/link';

import { PageContainer } from '@petabase/components/layout/page-container';
import { Card } from '@petabase/components/ui/card';
import { activities, appointments, branches, getBranch, getPatient, getStaff, invoices, patients } from '@petabase/features/prototype/mock-data';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';
import { withLocale } from '@petabase/lib/navigation/locale-path';

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

function formatTime(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'th' ? 'th-TH' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);
  const isThai = locale === 'th';

  const todayRevenue = invoices.reduce((sum, invoice) => {
    const subtotal = invoice.lineItems.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
    return sum + subtotal - invoice.discount;
  }, 0);

  return (
    <PageContainer title={messages.dashboard.title} description={messages.dashboard.subtitle}>
      <Card className="pb-phase-hero">
        <div>
          <p className="pb-sidebar-kicker">Petabase UI Prototype</p>
          <h2>{isThai ? 'ศูนย์ควบคุมงานคลินิกตั้งแต่การลงทะเบียนจนถึงชำระเงิน' : 'Clinic command center from check-in through billing'}</h2>
          <p>
            {isThai
              ? 'ต้นแบบนี้เชื่อมแดชบอร์ด คนไข้ นัดหมาย การรักษา การเงิน และผู้ดูแลระบบไว้ภายใต้ locale-aware route เดียวกัน'
              : 'This prototype connects dashboard, patients, appointments, consultations, billing, and admin flows inside the same locale-aware route structure.'}
          </p>
        </div>
        <div className="pb-phase-status-bar">
          <div>
            <p className="pb-stat-label">{isThai ? 'คนไข้ทั้งหมด' : 'Patients tracked'}</p>
            <p className="pb-stat-value">{patients.length}</p>
          </div>
          <div>
            <p className="pb-stat-label">{isThai ? 'สาขาในระบบ' : 'Active branches'}</p>
            <p className="pb-stat-value">{branches.length}</p>
          </div>
        </div>
      </Card>

      <section className="pb-kpi-grid">
        <Card className="pb-kpi-card">
          <p className="pb-stat-label">{isThai ? 'นัดหมายวันนี้' : 'Today appointments'}</p>
          <p className="pb-stat-value">{appointments.length}</p>
          <p className="pb-stat-trend">{isThai ? '1 เคสกำลังตรวจ' : '1 case in progress'}</p>
        </Card>
        <Card className="pb-kpi-card">
          <p className="pb-stat-label">{isThai ? 'รายได้ร่างวันนี้' : 'Draft revenue today'}</p>
          <p className="pb-stat-value">{new Intl.NumberFormat(locale === 'th' ? 'th-TH' : 'en-US').format(todayRevenue)}</p>
          <p className="pb-stat-trend">THB</p>
        </Card>
        <Card className="pb-kpi-card">
          <p className="pb-stat-label">{isThai ? 'ใบแจ้งหนี้ค้างชำระ' : 'Overdue invoices'}</p>
          <p className="pb-stat-value">1</p>
          <p className="pb-stat-trend">{isThai ? 'ติดตามได้จาก Billing' : 'Follow up from Billing'}</p>
        </Card>
        <Card className="pb-kpi-card">
          <p className="pb-stat-label">{isThai ? 'ทีมงานพร้อมใช้งาน' : 'Staff on roster'}</p>
          <p className="pb-stat-value">{new Set(appointments.map((appointment) => appointment.doctorId)).size + 2}</p>
          <p className="pb-stat-trend">{isThai ? 'ครอบคลุมหน้าฟรอนต์และแพทย์' : 'Covers front desk and doctors'}</p>
        </Card>
      </section>

      <section className="pb-split-grid pb-split-grid-wide">
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'นัดหมายวันนี้' : 'Today schedule'}</h2>
            <p>{isThai ? 'ดูภาพรวมแล้วเข้าโมดูลนัดหมายหรือ consultation ต่อได้ทันที' : 'Review today at a glance, then jump into appointments or consultation.'}</p>
          </header>
          <div className="pb-workflow-list">
            {appointments.map((appointment) => {
              const patient = getPatient(appointment.patientId);
              const doctor = getStaff(appointment.doctorId);
              return (
                <li key={appointment.id}>
                  <p className="pb-workflow-role">{formatTime(appointment.startsAt, locale)} • {patient?.name} • {appointment.type}</p>
                  <p className="pb-workflow-copy">{doctor?.name} • {appointment.room} • <span className="pb-pill" data-status={appointment.status}>{appointment.status}</span></p>
                </li>
              );
            })}
          </div>
          <div className="pb-form-actions pb-form-actions-start">
            <Link className="pb-btn" href={withLocale(locale, '/appointments')}>{isThai ? 'เปิดตารางนัดหมาย' : 'Open appointment board'}</Link>
          </div>
        </Card>

        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'กิจกรรมล่าสุด' : 'Recent activity'}</h2>
            <p>{isThai ? 'กิจกรรมข้ามโมดูลเพื่อทดสอบการเชื่อมโยงของต้นแบบ' : 'Cross-module activity to validate the connected prototype.'}</p>
          </header>
          <ul className="pb-activity-list">
            {activities.map((activity) => (
              <li key={activity.id}>
                <p className="pb-workflow-role">{activity.at} • {activity.actor}</p>
                <p className="pb-workflow-copy">{activity.title}</p>
                <p className="pb-row-meta">{activity.detail}</p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <section className="pb-split-grid pb-split-grid-wide">
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'ทางลัด workflow' : 'Workflow shortcuts'}</h2>
          </header>
          <div className="pb-link-grid">
            <Link className="pb-link-card" href={withLocale(locale, '/patients')}>
              <strong>{messages.nav.patients}</strong>
              <span>{isThai ? 'ค้นหารายชื่อและโปรไฟล์คนไข้' : 'Browse list and patient profiles'}</span>
            </Link>
            <Link className="pb-link-card" href={withLocale(locale, '/consultations')}>
              <strong>{messages.nav.consultations}</strong>
              <span>{isThai ? 'แก้ไข SOAP note และใบยา' : 'Edit SOAP notes and prescriptions'}</span>
            </Link>
            <Link className="pb-link-card" href={withLocale(locale, '/billing')}>
              <strong>{messages.nav.billing}</strong>
              <span>{isThai ? 'ติดตาม invoice และรับชำระ' : 'Track invoices and record payments'}</span>
            </Link>
          </div>
        </Card>

        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'ความพร้อมรายสาขา' : 'Branch readiness'}</h2>
          </header>
          <div className="pb-branch-grid">
            {branches.map((branch) => (
              <article key={branch.id} className="pb-branch-card">
                <p className="pb-workflow-role">{branch.name}</p>
                <p className="pb-workflow-copy">{branch.city} • {branch.type}</p>
                <p className="pb-row-meta">{branch.manager}</p>
                <p><span className="pb-pill" data-status={branch.readiness}>{getBranch(branch.id)?.name ? (isThai ? 'พร้อมต้นแบบ' : 'Prototype ready') : ''}</span></p>
              </article>
            ))}
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
