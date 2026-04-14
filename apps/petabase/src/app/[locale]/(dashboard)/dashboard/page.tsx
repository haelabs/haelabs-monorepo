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
      <Card>
        <EmptyState label={messages.states.empty} />
      </Card>
    </PageContainer>
  );
}
