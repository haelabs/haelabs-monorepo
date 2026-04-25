'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@petabase/components/ui/button';
import { Card } from '@petabase/components/ui/card';
import { Input } from '@petabase/components/ui/input';
import { useToast } from '@petabase/components/ui/toast-provider';
import type { AppLocale } from '@petabase/lib/i18n/config';

type SignUpFormProps = {
  locale: AppLocale;
};

const DEFAULT_INVITES = [
  { email: 'dr.napat@clinic-demo.com', role: 'Doctor' },
  { email: 'frontdesk@clinic-demo.com', role: 'Receptionist' },
] as const;

export function SignUpForm({ locale }: SignUpFormProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { push } = useToast();
  const router = useRouter();
  const isThai = locale === 'th';

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 650));
    setSubmitted(true);
    push(
      isThai
        ? 'สร้างเวิร์กสเปซคลินิกต้นแบบแล้ว ไปต่อที่หน้า Admin เพื่อจัดการสิทธิ์ทีมงาน'
        : 'Prototype clinic workspace created. Continue in Admin to configure staff access.',
    );
    setLoading(false);
    router.push(`/${locale}/admin`);
  }

  return (
    <div className="pb-auth-grid">
      <Card className="pb-auth-card">
        <form className="pb-auth-form" onSubmit={onSubmit}>
          <label htmlFor="clinic-name">{isThai ? 'ชื่อองค์กรคลินิก' : 'Clinic organization name'}</label>
          <Input id="clinic-name" name="clinicName" required placeholder="Paws & Care Veterinary Group" />

          <label htmlFor="business-id">{isThai ? 'เลขทะเบียนนิติบุคคล (ถ้ามี)' : 'Business registration id (optional)'}</label>
          <Input id="business-id" name="businessId" placeholder="0105569112234" />

          <label htmlFor="primary-branch">{isThai ? 'สาขาเริ่มต้น' : 'Primary branch'}</label>
          <Input id="primary-branch" name="primaryBranch" required placeholder="Bangkok HQ" />

          <label htmlFor="branch-type">{isThai ? 'ประเภทสาขา' : 'Branch type'}</label>
          <select id="branch-type" name="branchType" className="pb-select" defaultValue="headquarter">
            <option value="headquarter">{isThai ? 'สำนักงานใหญ่' : 'Headquarter'}</option>
            <option value="satellite">{isThai ? 'สาขาย่อย' : 'Satellite branch'}</option>
            <option value="hospital">{isThai ? 'โรงพยาบาลสัตว์' : 'Veterinary hospital'}</option>
          </select>

          <label htmlFor="admin-email">{isThai ? 'อีเมลผู้ดูแลระบบ' : 'Admin email'}</label>
          <Input id="admin-email" name="adminEmail" type="email" required placeholder="owner@petabase.app" />

          <label htmlFor="admin-name">{isThai ? 'ชื่อผู้ดูแลระบบ' : 'Admin full name'}</label>
          <Input id="admin-name" name="adminName" required placeholder="Thanida Pradit" />

          <label htmlFor="admin-password">{isThai ? 'รหัสผ่านเริ่มต้น' : 'Account password'}</label>
          <Input id="admin-password" name="adminPassword" type="password" required placeholder="••••••••" />

          <label htmlFor="timezone">{isThai ? 'โซนเวลาเริ่มต้น' : 'Default timezone'}</label>
          <Input id="timezone" name="timezone" required defaultValue="Asia/Bangkok (UTC+7)" />

          {submitted ? (
            <p className="pb-form-success">
              {isThai
                ? 'ตั้งค่าองค์กรสำเร็จในโหมดต้นแบบ ต่อไปให้เชิญทีมงานและกำหนดบทบาทในหน้า Admin'
                : 'Organization setup completed in prototype mode. Next: invite staff and assign roles in Admin.'}
            </p>
          ) : null}

          <Button type="submit" disabled={loading} aria-busy={loading}>
            {loading ? (
              <>
                <span className="pb-spinner" aria-hidden="true" />
                {isThai ? 'กำลังสร้างเวิร์กสเปซ...' : 'Creating workspace...'}
              </>
            ) : isThai ? (
              'สร้างเวิร์กสเปซคลินิก'
            ) : (
              'Create clinic workspace'
            )}
          </Button>
        </form>
      </Card>

      <Card className="pb-auth-side">
        <header className="pb-section-header">
          <h2>{isThai ? 'สิ่งที่จะเกิดขึ้นหลังสมัคร' : 'What happens after sign-up'}</h2>
          <p>
            {isThai
              ? 'ระบบจะจำลองการสร้างองค์กร, สาขาแรก, และสิทธิ์ Admin เพื่อเตรียมขั้นตอนเชิญทีมงาน'
              : 'The prototype provisions organization, first branch, and admin permissions for the staff invite flow.'}
          </p>
        </header>

        <ul className="pb-checklist">
          <li className="pb-checklist-item" data-state="done">
            <span>{isThai ? 'ยืนยันบัญชีผู้ดูแล' : 'Verify owner admin account'}</span>
          </li>
          <li className="pb-checklist-item" data-state="active">
            <span>{isThai ? 'สร้างโปรไฟล์องค์กรและสาขาแรก' : 'Create organization profile and first branch'}</span>
          </li>
          <li className="pb-checklist-item" data-state="active">
            <span>{isThai ? 'ตั้งค่านโยบายรหัสผ่านและ MFA' : 'Apply password and MFA policies'}</span>
          </li>
          <li className="pb-checklist-item" data-state="active">
            <span>{isThai ? 'เชิญทีมแพทย์และหน้าฟรอนต์' : 'Invite doctor and front-desk staff'}</span>
          </li>
        </ul>

        <div className="pb-auth-invites">
          <p className="pb-auth-invites-title">{isThai ? 'ตัวอย่างคำเชิญทีมงาน' : 'Seed staff invitations'}</p>
          <ul>
            {DEFAULT_INVITES.map((invite) => (
              <li key={invite.email}>
                <span>{invite.email}</span>
                <span className="pb-pill">{invite.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
