import { SignInForm } from '@petabase/features/auth/components/sign-in-form';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';
import { withLocale } from '@petabase/lib/navigation/locale-path';

type SignInPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function SignInPage({ params }: SignInPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);
  const signUpHref = withLocale(locale, '/sign-up');
  const forgotPasswordHref = withLocale(locale, '/forgot-password');

  return (
    <section className="pb-auth-stage pb-auth-stage-calm">
      <header className="pb-auth-header pb-auth-header-calm">
        <p className="pb-sidebar-kicker">Phase 1 Frontend Prototype</p>
        <h1>{messages.auth.title}</h1>
        <p>{messages.auth.subtitle}</p>
      </header>
      <SignInForm
        locale={locale}
        messages={messages}
        signUpHref={signUpHref}
        forgotPasswordHref={forgotPasswordHref}
      />
    </section>
  );
}
