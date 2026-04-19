import { PageContainer } from '@petabase/components/layout/page-container';
import { Card } from '@petabase/components/ui/card';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type AdminPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);

  return (
    <PageContainer title={messages.admin.title} description={messages.admin.subtitle}>
      <Card>
        <header className="pb-section-header">
          <h2>Organization and staff access</h2>
          <p>{messages.common.welcome}</p>
        </header>

        <div className="pb-table-wrap">
          <table className="pb-table">
            <thead>
              <tr>
                <th scope="col">Staff</th>
                <th scope="col">Role</th>
                <th scope="col">Branch</th>
                <th scope="col">Last active</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Thanida P.</td>
                <td>Receptionist</td>
                <td>Bangkok HQ</td>
                <td data-numeric="true">08:52</td>
                <td>
                  <span className="pb-pill" data-status="confirmed">
                    Active
                  </span>
                </td>
              </tr>
              <tr>
                <td>Dr. Napat S.</td>
                <td>Doctor</td>
                <td>Bangkok HQ</td>
                <td data-numeric="true">09:18</td>
                <td>
                  <span className="pb-pill" data-status="in-progress">
                    On shift
                  </span>
                </td>
              </tr>
              <tr>
                <td>Chompoo R.</td>
                <td>Nurse</td>
                <td>Rama 9</td>
                <td data-numeric="true">Yesterday</td>
                <td>
                  <span className="pb-pill" data-status="scheduled">
                    Invited
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}
