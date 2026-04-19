import Link from 'next/link';

import { ForgotPasswordForm } from '@petabase/features/auth/components/forgot-password-form';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';
import { withLocale } from '@petabase/lib/navigation/locale-path';

type ForgotPasswordPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);
  const signInHref = withLocale(locale, '/sign-in');
  const isThai = locale === 'th';

  return (
    <section className="pb-auth-stage pb-auth-stage-compact">
      <header className="pb-auth-header">
        <p className="pb-sidebar-kicker">Account Recovery</p>
        <h1>{isThai ? 'กู้คืนการเข้าถึงบัญชี' : 'Recover account access'}</h1>
        <p>
          {isThai
            ? 'สำหรับผู้ดูแลหรือทีมงานที่ลืมรหัสผ่าน และต้องการกลับเข้าใช้งานอย่างปลอดภัย'
            : 'For admins and staff who need secure access recovery after forgetting their password.'}
        </p>
      </header>

      <ForgotPasswordForm locale={locale} />

      <p className="pb-auth-inline-link">
        <Link href={signInHref}>{messages.nav.signIn}</Link>
      </p>
    </section>
  );
}
