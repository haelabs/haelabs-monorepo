'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

import { Button } from '@petabase/components/ui/button';
import { Card } from '@petabase/components/ui/card';
import { Input } from '@petabase/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@petabase/components/ui/select';
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card>
        <form className="grid gap-3" onSubmit={onSubmit}>
          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="reset-email">
            {isThai ? 'อีเมลบัญชีที่ต้องการกู้คืน' : 'Account email to recover'}
          </label>
          <Input id="reset-email" name="resetEmail" type="email" required placeholder="owner@petabase.app" />

          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="reset-language">
            {isThai ? 'ภาษาของอีเมลแจ้งเตือน' : 'Email language'}
          </label>
          <Select defaultValue={locale} name="resetLanguage">
            <SelectTrigger id="reset-language">
              <SelectValue placeholder={isThai ? 'เลือกภาษา' : 'Select language'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="th">ไทย</SelectItem>
              <SelectItem value="en">English</SelectItem>
            </SelectContent>
          </Select>

          {submitted ? (
            <p className="rounded-[var(--pb-radius-sm)] border border-[color:rgb(21_190_83/0.36)] bg-[color:rgb(21_190_83/0.12)] px-3 py-2.5 text-[13px] text-[color:var(--pb-color-success-text)]">
              {isThai
                ? 'หากอีเมลนี้มีอยู่ในระบบ จะได้รับลิงก์รีเซ็ตรหัสผ่านภายใน 5 นาที'
                : 'If this email exists, a password reset link will arrive within 5 minutes.'}
            </p>
          ) : null}

          <Button type="submit" disabled={loading} aria-busy={loading}>
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="pb-spinner" aria-hidden="true" />
                  {isThai ? 'กำลังส่ง...' : 'Sending...'}
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {isThai ? 'ส่งลิงก์รีเซ็ต' : 'Send reset link'}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <p className="text-[13px] leading-snug text-[color:var(--pb-color-body)]">
            {isThai
              ? 'หากไม่พบอีเมลภายใน 5 นาที กรุณาตรวจสอบ Spam หรือให้ผู้ดูแลองค์กรส่งคำเชิญใหม่'
              : 'If no email arrives within 5 minutes, check spam or ask your org admin to resend access invite.'}
          </p>
        </form>
      </Card>
    </motion.div>
  );
}
