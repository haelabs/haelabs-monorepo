'use client';

import { useState } from 'react';

import { Button } from '@petabase/components/ui/button';
import { Card } from '@petabase/components/ui/card';
import { Input } from '@petabase/components/ui/input';
import { useToast } from '@petabase/components/ui/toast-provider';
import type { AppLocale } from '@petabase/lib/i18n/config';

type ForgotPasswordFormProps = {
  locale: AppLocale;
};

export function ForgotPasswordForm({ locale }: ForgotPasswordFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { push } = useToast();
  const isThai = locale === 'th';

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    setSubmitted(true);
    push(
      isThai
        ? 'ส่งลิงก์รีเซ็ตรหัสผ่านต้นแบบแล้ว (โหมด UI เท่านั้น)'
        : 'Prototype reset link sent (frontend-only flow).',
    );
    setLoading(false);
  }

  return (
    <Card className="pb-auth-card pb-auth-card-compact">
      <form className="pb-auth-form" onSubmit={onSubmit}>
        <label htmlFor="reset-email">{isThai ? 'อีเมลบัญชีที่ต้องการกู้คืน' : 'Account email to recover'}</label>
        <Input id="reset-email" name="resetEmail" type="email" required placeholder="owner@petabase.app" />

        <label htmlFor="reset-language">{isThai ? 'ภาษาของอีเมลแจ้งเตือน' : 'Email language'}</label>
        <select id="reset-language" name="resetLanguage" className="pb-select" defaultValue={locale}>
          <option value="th">ไทย</option>
          <option value="en">English</option>
        </select>

        {submitted ? (
          <p className="pb-form-success">
            {isThai
              ? 'หากอีเมลนี้มีอยู่ในระบบ จะได้รับลิงก์รีเซ็ตรหัสผ่านภายใน 5 นาที'
              : 'If this email exists, a password reset link will arrive within 5 minutes.'}
          </p>
        ) : null}

        <Button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? (
            <>
              <span className="pb-spinner" aria-hidden="true" />
              {isThai ? 'กำลังส่ง...' : 'Sending...'}
            </>
          ) : isThai ? (
            'ส่งลิงก์รีเซ็ต'
          ) : (
            'Send reset link'
          )}
        </Button>

        <p className="pb-workflow-copy">
          {isThai
            ? 'หากไม่พบอีเมลภายใน 5 นาที กรุณาตรวจสอบ Spam หรือให้ผู้ดูแลองค์กรส่งคำเชิญใหม่'
            : 'If no email arrives within 5 minutes, check spam or ask your org admin to resend access invite.'}
        </p>
      </form>
    </Card>
  );
}
