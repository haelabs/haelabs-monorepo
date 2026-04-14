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
        <p>{messages.common.welcome}</p>
      </Card>
    </PageContainer>
  );
}
