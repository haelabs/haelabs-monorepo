'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@petabase/components/ui/button';
import { Card } from '@petabase/components/ui/card';
import { Input } from '@petabase/components/ui/input';
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
  }

  return (
    <div className="pb-auth-grid">
      <Card className="pb-auth-card">
        <form className="pb-auth-form" onSubmit={onSubmit}>
          <label htmlFor="email">{messages.auth.emailLabel}</label>
          <Input id="email" type="email" name="email" required placeholder="clinic-admin@petabase.app" />

          <label htmlFor="password">{messages.auth.passwordLabel}</label>
          <Input id="password" type="password" name="password" required placeholder="••••••••" />

          <label htmlFor="access-branch">{isThai ? 'สาขาที่ต้องการเข้าใช้งาน' : 'Branch workspace'}</label>
          <select
            id="access-branch"
            name="accessBranch"
            className="pb-select"
            value={branch}
            onChange={(event) => setBranch(event.target.value)}
          >
            <option value="bangkok-hq">Bangkok HQ</option>
            <option value="rama-9">Rama 9</option>
            <option value="chiang-mai">Chiang Mai Satellite</option>
          </select>

          <div className="pb-auth-meta">
            <label className="pb-checkbox-label" htmlFor="remember-me">
              <input id="remember-me" name="rememberMe" type="checkbox" defaultChecked />
              <span>{isThai ? 'จดจำอุปกรณ์นี้ไว้ 14 วัน' : 'Remember this device for 14 days'}</span>
            </label>
            <Link href={forgotPasswordHref}>{isThai ? 'ลืมรหัสผ่าน?' : 'Forgot password?'}</Link>
          </div>

          <fieldset className="pb-role-presets" aria-label={isThai ? 'โหมดบทบาทต้นแบบ' : 'Prototype role mode'}>
            <legend>{isThai ? 'ตรวจสอบสิทธิ์ตามบทบาทแบบรวดเร็ว' : 'Quick role access preview'}</legend>
            <div className="pb-role-chip-grid">
              {ROLE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  className="pb-role-chip"
                  data-active={preset.id === selectedRole}
                  type="button"
                  onClick={() => setSelectedRole(preset.id)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
            <p className="pb-role-scope">
              {isThai ? 'ขอบเขตการเข้าถึง:' : 'Access scope:'}{' '}
              <strong>{isThai ? selectedRolePreset.thScope : selectedRolePreset.scope}</strong>
            </p>
            <p className="pb-workflow-copy">
              {isThai ? 'พื้นที่เข้าใช้งานปัจจุบัน:' : 'Current workspace:'} <strong>{selectedBranchLabel}</strong>
            </p>
          </fieldset>

          <Button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? (
              <>
                <span className="pb-spinner" aria-hidden="true" />
                {messages.states.loading}
              </>
            ) : (
              messages.auth.submit
            )}
          </Button>

          <p className="pb-auth-footer-note">
            {isThai ? 'ยังไม่มีบัญชีผู้ดูแล?' : 'Need an admin account?'}{' '}
            <Link href={signUpHref}>{isThai ? 'เริ่มตั้งค่าคลินิก' : 'Start clinic setup'}</Link>
          </p>
        </form>
      </Card>

      <Card className="pb-auth-side">
        <header className="pb-section-header">
          <h2>{isThai ? 'Phase 1: Access Control & Clinic Setup' : 'Phase 1: Access Control & Clinic Setup'}</h2>
          <p>
            {isThai
              ? 'ต้นแบบนี้ครอบคลุมการเข้าสู่ระบบ, การตั้งค่าองค์กร/สาขา, การเชิญทีมงาน และสิทธิ์ตามบทบาท'
              : 'This prototype covers sign-in, org and branch setup, staff invitations, and role-scoped access.'}
          </p>
        </header>

        <ul className="pb-checklist">
          <li className="pb-checklist-item" data-state="done">
            <span>{isThai ? 'ลงทะเบียนและเข้าสู่ระบบผู้ดูแล' : 'Admin sign-up and sign-in flow'}</span>
          </li>
          <li className="pb-checklist-item" data-state="done">
            <span>{isThai ? 'ขอรีเซ็ตรหัสผ่านได้' : 'Password recovery request path'}</span>
          </li>
          <li className="pb-checklist-item" data-state="active">
            <span>{isThai ? 'จัดการโปรไฟล์คลินิกและสาขา' : 'Clinic profile and branch management'}</span>
          </li>
          <li className="pb-checklist-item" data-state="active">
            <span>{isThai ? 'เชิญทีมงานและกำหนดบทบาท' : 'Invite staff and assign roles'}</span>
          </li>
          <li className="pb-checklist-item" data-state="active">
            <span>{isThai ? 'จำกัดสิทธิ์ตามองค์กร/สาขา' : 'Scope access by organization and branch'}</span>
          </li>
        </ul>

        <div className="pb-auth-invites">
          <p className="pb-auth-invites-title">{isThai ? 'บัญชีทดสอบแนะนำ' : 'Suggested test accounts'}</p>
          <ul>
            <li>
              <span>owner@petabase.app</span>
              <span className="pb-pill">Admin</span>
            </li>
            <li>
              <span>dr.napat@clinic-demo.com</span>
              <span className="pb-pill">Doctor</span>
            </li>
            <li>
              <span>frontdesk@clinic-demo.com</span>
              <span className="pb-pill">Receptionist</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
