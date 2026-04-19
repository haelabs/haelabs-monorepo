import { EmptyState } from '@petabase/components/feedback/empty-state';
import { PageContainer } from '@petabase/components/layout/page-container';
import { Card } from '@petabase/components/ui/card';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);

  return (
    <PageContainer title={messages.dashboard.title} description={messages.dashboard.subtitle}>
      <section className="pb-stat-grid" aria-label="Clinic operational summary">
        <Card className="pb-stat-card">
          <p className="pb-stat-label">Today appointments</p>
          <p className="pb-stat-value">24</p>
          <p className="pb-stat-trend">+8% from yesterday</p>
        </Card>

        <Card className="pb-stat-card">
          <p className="pb-stat-label">Waiting now</p>
          <p className="pb-stat-value">6</p>
          <p className="pb-stat-trend">Reception queue healthy</p>
        </Card>

        <Card className="pb-stat-card">
          <p className="pb-stat-label">Pending invoices</p>
          <p className="pb-stat-value">11</p>
          <p className="pb-stat-trend">2 overdue need follow-up</p>
        </Card>
      </section>

      <section className="pb-dashboard-grid">
        <Card>
          <header className="pb-section-header">
            <h2>Today&apos;s schedule</h2>
            <p>Mobile-friendly queue for reception and nurses.</p>
          </header>

          <div className="pb-table-wrap">
            <table className="pb-table">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Patient</th>
                  <th scope="col">Doctor</th>
                  <th scope="col">Type</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-numeric="true">09:30</td>
                  <td>Milo (Canine)</td>
                  <td>Dr. Napat</td>
                  <td>Vaccination</td>
                  <td>
                    <span className="pb-pill" data-status="confirmed">
                      Confirmed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td data-numeric="true">10:15</td>
                  <td>Mochi (Feline)</td>
                  <td>Dr. Pim</td>
                  <td>Consultation</td>
                  <td>
                    <span className="pb-pill" data-status="in-progress">
                      In progress
                    </span>
                  </td>
                </tr>
                <tr>
                  <td data-numeric="true">11:45</td>
                  <td>Lucky (Canine)</td>
                  <td>Dr. Napat</td>
                  <td>Dental check</td>
                  <td>
                    <span className="pb-pill" data-status="scheduled">
                      Scheduled
                    </span>
                  </td>
                </tr>
                <tr>
                  <td data-numeric="true">14:00</td>
                  <td>Haru (Feline)</td>
                  <td>Dr. Kanyarat</td>
                  <td>Follow-up</td>
                  <td>
                    <span className="pb-pill" data-status="no-show">
                      No-show
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <header className="pb-section-header">
            <h2>Role workspaces</h2>
            <p>Action patterns for vets, receptionists, and managers.</p>
          </header>

          <ul className="pb-workflow-list">
            <li>
              <p className="pb-workflow-role">Receptionist</p>
              <p className="pb-workflow-copy">Check-in, queue updates, and payment reminders.</p>
            </li>
            <li>
              <p className="pb-workflow-role">Doctor / Nurse</p>
              <p className="pb-workflow-copy">SOAP capture, prescriptions, and history timeline.</p>
            </li>
            <li>
              <p className="pb-workflow-role">Clinic Manager</p>
              <p className="pb-workflow-copy">Branch staffing, billing status, and daily performance.</p>
            </li>
          </ul>
        </Card>
      </section>

      <Card>
        <EmptyState label={messages.states.empty} />
      </Card>
    </PageContainer>
  );
}
