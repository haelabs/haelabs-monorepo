'use client';

import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Badge } from '@petabase/components/ui/badge';
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
import type { MessageCatalog } from '@petabase/types/i18n';

type SignInFormProps = {
  locale: AppLocale;
  messages: MessageCatalog;
  signUpHref: string;
  forgotPasswordHref: string;
};

const ROLE_PRESETS = [
  {
    id: 'admin',
    label: 'Admin',
    scope: 'All branches',
    thScope: 'ทุกสาขา',
  },
  {
    id: 'doctor',
    label: 'Doctor',
    scope: 'Assigned branch + medical records',
    thScope: 'สาขาที่ได้รับมอบหมาย + เวชระเบียน',
  },
  {
    id: 'nurse',
    label: 'Nurse',
    scope: 'Assigned branch + clinical support',
    thScope: 'สาขาที่ได้รับมอบหมาย + การช่วยงานคลินิก',
  },
  {
    id: 'receptionist',
    label: 'Receptionist',
    scope: 'Front desk + appointment operations',
    thScope: 'หน้าฟรอนต์ + งานนัดหมาย',
  },
] as const;

const linkClass =
  'font-normal text-[color:var(--pb-color-primary)] transition-colors duration-140 hover:text-[color:var(--pb-color-primary-deep)] focus-visible:outline-[var(--pb-focus-ring)] focus-visible:outline-offset-2 focus-visible:rounded-sm';

export function SignInForm({
  locale,
  messages,
  signUpHref,
  forgotPasswordHref,
}: SignInFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<(typeof ROLE_PRESETS)[number]['id']>('admin');
  const [branch, setBranch] = useState('bangkok-hq');
  const { push } = useToast();
  const router = useRouter();
  const selectedRolePreset = ROLE_PRESETS.find((preset) => preset.id === selectedRole) ?? ROLE_PRESETS[0];
  const isThai = locale === 'th';

  const selectedBranchLabel =
    branch === 'bangkok-hq'
      ? 'Bangkok HQ'
      : branch === 'rama-9'
        ? 'Rama 9'
        : 'Chiang Mai Satellite';

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    push(
      isThai
        ? `โหมดต้นแบบ: เข้าสู่ระบบเป็น ${selectedRolePreset.label} ที่ ${selectedBranchLabel}`
        : `Prototype mode: signed in as ${selectedRolePreset.label} at ${selectedBranchLabel}`,
    );
    setLoading(false);
    router.push(selectedRole === 'admin' ? `/${locale}/admin` : `/${locale}/dashboard`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
    >
      <Card>
        <form className="grid gap-2.5" onSubmit={onSubmit}>
          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="email">
            {messages.auth.emailLabel}
          </label>
          <Input id="email" type="email" name="email" required placeholder="clinic-admin@petabase.app" />

          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="password">
            {messages.auth.passwordLabel}
          </label>
          <Input id="password" type="password" name="password" required placeholder="••••••••" />

          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="access-branch">
            {isThai ? 'สาขาที่ต้องการเข้าใช้งาน' : 'Branch workspace'}
          </label>
          <Select value={branch} onValueChange={setBranch} name="accessBranch">
            <SelectTrigger id="access-branch">
              <SelectValue placeholder={isThai ? 'เลือกสาขา' : 'Select branch'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bangkok-hq">Bangkok HQ</SelectItem>
              <SelectItem value="rama-9">Rama 9</SelectItem>
              <SelectItem value="chiang-mai">Chiang Mai Satellite</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex flex-col items-start gap-2 text-xs text-[color:var(--pb-color-body)] sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-2" htmlFor="remember-me">
              <input id="remember-me" name="rememberMe" type="checkbox" defaultChecked />
              <span>{isThai ? 'จดจำอุปกรณ์นี้ไว้ 14 วัน' : 'Remember this device for 14 days'}</span>
            </label>
            <Link href={forgotPasswordHref} className={linkClass}>
              {isThai ? 'ลืมรหัสผ่าน?' : 'Forgot password?'}
            </Link>
          </div>

          <fieldset
            className="m-0 grid gap-2.5 rounded-[var(--pb-radius-md)] border border-[color:var(--pb-color-border-soft)] p-3"
            aria-label={isThai ? 'โหมดบทบาทต้นแบบ' : 'Prototype role mode'}
          >
            <legend className="px-1 text-xs tracking-wide text-[color:var(--pb-color-label)]">
              {isThai ? 'ตรวจสอบสิทธิ์ตามบทบาทแบบรวดเร็ว' : 'Quick role access preview'}
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {ROLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  className={`flex min-h-[34px] items-center justify-center rounded-[var(--pb-radius-sm)] border text-sm transition-all duration-140 ${
                    preset.id === selectedRole
                      ? 'border-[color:var(--pb-color-primary)] bg-[color:rgb(83_58_253/0.1)] text-[color:var(--pb-color-primary-deep)]'
                      : 'border-[color:var(--pb-color-border-active)] bg-white text-[color:var(--pb-color-label)] hover:border-[color:var(--pb-color-primary-mid)] hover:bg-[color:rgb(83_58_253/0.05)] hover:-translate-y-px'
                  }`}
                  type="button"
                  onClick={() => setSelectedRole(preset.id)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p className="text-[13px] text-[color:var(--pb-color-body-strong)]">
              {isThai ? 'ขอบเขตการเข้าถึง:' : 'Access scope:'}{' '}
              <strong>{isThai ? selectedRolePreset.thScope : selectedRolePreset.scope}</strong>
            </p>
            <p className="text-[13px] leading-snug text-[color:var(--pb-color-body)]">
              {isThai ? 'พื้นที่เข้าใช้งานปัจจุบัน:' : 'Current workspace:'} <strong>{selectedBranchLabel}</strong>
            </p>
          </fieldset>

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
                  {messages.states.loading}
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {messages.auth.submit}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>

          <p className="text-center text-sm text-[color:var(--pb-color-body)]">
            {isThai ? 'ยังไม่มีบัญชีผู้ดูแล?' : 'Need an admin account?'}{' '}
            <Link href={signUpHref} className={linkClass}>
              {isThai ? 'เริ่มตั้งค่าคลินิก' : 'Start clinic setup'}
            </Link>
          </p>
        </form>
      </Card>

      <Card className="grid gap-3.5">
        <header className="grid gap-1.5">
          <h2 className="text-lg font-light tracking-tight text-[color:var(--pb-color-heading)]">
            {isThai ? 'Phase 1: Access Control & Clinic Setup' : 'Phase 1: Access Control & Clinic Setup'}
          </h2>
          <p className="text-sm text-[color:var(--pb-color-body)]">
            {isThai
              ? 'ต้นแบบนี้ครอบคลุมการเข้าสู่ระบบ, การตั้งค่าองค์กร/สาขา, การเชิญทีมงาน และสิทธิ์ตามบทบาท'
              : 'This prototype covers sign-in, org and branch setup, staff invitations, and role-scoped access.'}
          </p>
        </header>

        <ul className="m-0 grid list-none gap-2 p-0">
          {[
            { state: 'done', text: isThai ? 'ลงทะเบียนและเข้าสู่ระบบผู้ดูแล' : 'Admin sign-up and sign-in flow' },
            { state: 'done', text: isThai ? 'ขอรีเซ็ตรหัสผ่านได้' : 'Password recovery request path' },
            { state: 'active', text: isThai ? 'จัดการโปรไฟล์คลินิกและสาขา' : 'Clinic profile and branch management' },
            { state: 'active', text: isThai ? 'เชิญทีมงานและกำหนดบทบาท' : 'Invite staff and assign roles' },
            { state: 'active', text: isThai ? 'จำกัดสิทธิ์ตามองค์กร/สาขา' : 'Scope access by organization and branch' },
          ].map((item) => (
            <li
              key={item.text}
              className={`rounded-[var(--pb-radius-sm)] border px-2.5 py-2 text-[13px] transition-all duration-140 ${
                item.state === 'done'
                  ? 'border-[color:rgb(21_190_83/0.4)] bg-[color:rgb(21_190_83/0.08)] text-[color:var(--pb-color-body-strong)]'
                  : 'border-[color:var(--pb-color-border-soft)] bg-[linear-gradient(135deg,rgb(246_246_255),white)] text-[color:var(--pb-color-body-strong)]'
              }`}
            >
              {item.text}
            </li>
          ))}
        </ul>

        <div className="grid gap-2 rounded-[var(--pb-radius-md)] border border-[color:var(--pb-color-border)] bg-[color:var(--pb-color-bg-soft)] p-3">
          <p className="text-[13px] font-normal text-[color:var(--pb-color-label)]">
            {isThai ? 'บัญชีทดสอบแนะนำ' : 'Suggested test accounts'}
          </p>
          <ul className="m-0 grid list-none gap-2 p-0">
            {[
              { email: 'owner@petabase.app', role: 'Admin' },
              { email: 'dr.napat@clinic-demo.com', role: 'Doctor' },
              { email: 'frontdesk@clinic-demo.com', role: 'Receptionist' },
            ].map((account) => (
              <li key={account.email} className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[color:var(--pb-color-heading)]">
                <span className="min-w-0 break-words">{account.email}</span>
                <Badge>{account.role}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}
