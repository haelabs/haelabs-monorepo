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
    <section className="grid w-full max-w-[1120px] gap-5">
      <header className="grid gap-2 rounded-[var(--pb-radius-md)] border border-[var(--pb-color-border-soft)] bg-[linear-gradient(165deg,rgb(255_255_255/0.95),rgb(247_250_255))] p-4 text-center shadow-[var(--pb-shadow-soft)]">
        <h1 className="text-[color:var(--pb-color-heading)] text-[clamp(1.8rem,4vw,2rem)] font-light tracking-[-0.64px]">
          {messages.auth.title}
        </h1>
        <p className="mx-auto max-w-[64ch] text-[color:var(--pb-color-body)]">{messages.auth.subtitle}</p>
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
