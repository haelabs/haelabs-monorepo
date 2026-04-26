'use client';

import { AnimatePresence, motion } from 'motion/react';
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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
    >
      <Card>
        <form className="grid gap-2.5" onSubmit={onSubmit}>
          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="clinic-name">
            {isThai ? 'ชื่อองค์กรคลินิก' : 'Clinic organization name'}
          </label>
          <Input id="clinic-name" name="clinicName" required placeholder="Paws & Care Veterinary Group" />

          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="business-id">
            {isThai ? 'เลขทะเบียนนิติบุคคล (ถ้ามี)' : 'Business registration id (optional)'}
          </label>
          <Input id="business-id" name="businessId" placeholder="0105569112234" />

          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="primary-branch">
            {isThai ? 'สาขาเริ่มต้น' : 'Primary branch'}
          </label>
          <Input id="primary-branch" name="primaryBranch" required placeholder="Bangkok HQ" />

          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="branch-type">
            {isThai ? 'ประเภทสาขา' : 'Branch type'}
          </label>
          <Select defaultValue="headquarter" name="branchType">
            <SelectTrigger id="branch-type">
              <SelectValue placeholder={isThai ? 'เลือกประเภทสาขา' : 'Select branch type'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="headquarter">{isThai ? 'สำนักงานใหญ่' : 'Headquarter'}</SelectItem>
              <SelectItem value="satellite">{isThai ? 'สาขาย่อย' : 'Satellite branch'}</SelectItem>
              <SelectItem value="hospital">{isThai ? 'โรงพยาบาลสัตว์' : 'Veterinary hospital'}</SelectItem>
            </SelectContent>
          </Select>

          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="admin-email">
            {isThai ? 'อีเมลผู้ดูแลระบบ' : 'Admin email'}
          </label>
          <Input id="admin-email" name="adminEmail" type="email" required placeholder="owner@petabase.app" />

          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="admin-name">
            {isThai ? 'ชื่อผู้ดูแลระบบ' : 'Admin full name'}
          </label>
          <Input id="admin-name" name="adminName" required placeholder="Thanida Pradit" />

          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="admin-password">
            {isThai ? 'รหัสผ่านเริ่มต้น' : 'Account password'}
          </label>
          <Input id="admin-password" name="adminPassword" type="password" required placeholder="••••••••" />

          <label className="text-sm font-medium text-[color:var(--pb-color-label)]" htmlFor="timezone">
            {isThai ? 'โซนเวลาเริ่มต้น' : 'Default timezone'}
          </label>
          <Input id="timezone" name="timezone" required defaultValue="Asia/Bangkok (UTC+7)" />

          {submitted ? (
            <p className="rounded-[var(--pb-radius-sm)] border border-[color:rgb(21_190_83/0.36)] bg-[color:rgb(21_190_83/0.12)] px-3 py-2.5 text-[13px] text-[color:var(--pb-color-success-text)]">
              {isThai
                ? 'ตั้งค่าองค์กรสำเร็จในโหมดต้นแบบ ต่อไปให้เชิญทีมงานและกำหนดบทบาทในหน้า Admin'
                : 'Organization setup completed in prototype mode. Next: invite staff and assign roles in Admin.'}
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
                  {isThai ? 'กำลังสร้างเวิร์กสเปซ...' : 'Creating workspace...'}
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {isThai ? 'สร้างเวิร์กสเปซคลินิก' : 'Create clinic workspace'}
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </form>
      </Card>

      <Card className="grid gap-3.5">
        <header className="grid gap-1.5">
          <h2 className="text-lg font-light tracking-tight text-[color:var(--pb-color-heading)]">
            {isThai ? 'สิ่งที่จะเกิดขึ้นหลังสมัคร' : 'What happens after sign-up'}
          </h2>
          <p className="text-sm text-[color:var(--pb-color-body)]">
            {isThai
              ? 'ระบบจะจำลองการสร้างองค์กร, สาขาแรก, และสิทธิ์ Admin เพื่อเตรียมขั้นตอนเชิญทีมงาน'
              : 'The prototype provisions organization, first branch, and admin permissions for the staff invite flow.'}
          </p>
        </header>

        <ul className="m-0 grid list-none gap-2 p-0">
          {[
            { state: 'done', text: isThai ? 'ยืนยันบัญชีผู้ดูแล' : 'Verify owner admin account' },
            { state: 'active', text: isThai ? 'สร้างโปรไฟล์องค์กรและสาขาแรก' : 'Create organization profile and first branch' },
            { state: 'active', text: isThai ? 'ตั้งค่านโยบายรหัสผ่านและ MFA' : 'Apply password and MFA policies' },
            { state: 'active', text: isThai ? 'เชิญทีมแพทย์และหน้าฟรอนต์' : 'Invite doctor and front-desk staff' },
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
            {isThai ? 'ตัวอย่างคำเชิญทีมงาน' : 'Seed staff invitations'}
          </p>
          <ul className="m-0 grid list-none gap-2 p-0">
            {DEFAULT_INVITES.map((invite) => (
              <li key={invite.email} className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-[color:var(--pb-color-heading)]">
                <span className="min-w-0 break-words">{invite.email}</span>
                <Badge>{invite.role}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}
