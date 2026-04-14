import { SignInForm } from '@petabase/features/auth/components/sign-in-form';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type SignInPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SignInPage({ params }: SignInPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);

  return (
    <section>
      <header className="pb-auth-header">
        <h1>{messages.auth.title}</h1>
        <p>{messages.auth.subtitle}</p>
      </header>
      <SignInForm messages={messages} />
    </section>
  );
}
