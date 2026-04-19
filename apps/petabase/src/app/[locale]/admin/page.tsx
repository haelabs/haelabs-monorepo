import { PageContainer } from '@petabase/components/layout/page-container';
import { Button } from '@petabase/components/ui/button';
import { Card } from '@petabase/components/ui/card';
import { Input } from '@petabase/components/ui/input';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type AdminPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);
  const isThai = locale === 'th';
  const branchLabels = {
    branch: isThai ? 'สาขา' : 'Branch',
    location: isThai ? 'พื้นที่' : 'Location',
    owner: isThai ? 'ผู้รับผิดชอบ' : 'Owner',
    staffReady: isThai ? 'ทีมงานพร้อมใช้งาน' : 'Staff ready',
    status: isThai ? 'สถานะ' : 'Status',
    actions: isThai ? 'จัดการ' : 'Actions',
  } as const;
  const staffLabels = {
    staff: isThai ? 'ทีมงาน' : 'Staff',
    role: isThai ? 'บทบาท' : 'Role',
    branchScope: isThai ? 'ขอบเขตสาขา' : 'Branch scope',
    lastActive: isThai ? 'ใช้งานล่าสุด' : 'Last active',
    status: isThai ? 'สถานะ' : 'Status',
    actions: isThai ? 'ดำเนินการ' : 'Actions',
  } as const;

  const branchRows = [
    {
      branch: 'Bangkok HQ',
      code: isThai ? 'สาขาหลัก' : 'Main branch',
      city: isThai ? 'กรุงเทพฯ' : 'Bangkok',
      manager: 'Thanida P.',
      staff: '12',
      status: isThai ? 'พร้อมใช้งาน' : 'Ready',
      statusCode: 'confirmed',
    },
    {
      branch: 'Rama 9',
      code: isThai ? 'สาขารอง' : 'Satellite branch',
      city: isThai ? 'กรุงเทพฯ' : 'Bangkok',
      manager: 'Dr. Pim K.',
      staff: '6',
      status: isThai ? 'กำลังปรับสิทธิ์' : 'Adjusting scope',
      statusCode: 'in-progress',
    },
    {
      branch: 'Chiang Mai Satellite',
      code: isThai ? 'สาขาใหม่' : 'New branch',
      city: isThai ? 'เชียงใหม่' : 'Chiang Mai',
      manager: isThai ? 'ยังไม่กำหนด' : 'Unassigned',
      staff: '0',
      status: isThai ? 'รออนุมัติ' : 'Pending approval',
      statusCode: 'scheduled',
    },
  ] as const;

  const staffRows = [
    {
      name: 'Thanida Pradit',
      email: 'thanida@paws-care.co.th',
      role: 'Admin',
      branch: isThai ? 'ทุกสาขา' : 'All branches',
      lastActive: '09:24',
      status: isThai ? 'ใช้งานอยู่' : 'Active',
      statusCode: 'confirmed',
    },
    {
      name: 'Dr. Napat Surachai',
      email: 'napat@paws-care.co.th',
      role: 'Doctor',
      branch: 'Bangkok HQ',
      lastActive: '09:18',
      status: isThai ? 'เข้าเวร' : 'On shift',
      statusCode: 'in-progress',
    },
    {
      name: 'Chompoo R.',
      email: 'chompoo@paws-care.co.th',
      role: 'Nurse',
      branch: 'Rama 9',
      lastActive: isThai ? 'เมื่อวาน' : 'Yesterday',
      status: isThai ? 'รอเปิดบัญชี' : 'Pending activation',
      statusCode: 'scheduled',
    },
    {
      name: 'Frontdesk CM Invite',
      email: 'frontdesk.cm@paws-care.co.th',
      role: 'Receptionist',
      branch: 'Chiang Mai Satellite',
      lastActive: '-',
      status: isThai ? 'เชิญแล้ว' : 'Invited',
      statusCode: 'scheduled',
    },
  ] as const;

  return (
    <PageContainer title={messages.admin.title} description={messages.admin.subtitle}>
      <Card className="pb-phase-hero">
        <div>
          <p className="pb-sidebar-kicker">Phase 1 Frontend Prototype</p>
          <h2>{isThai ? 'จัดการองค์กร สาขา และสิทธิ์ทีมงาน' : 'Manage organization, branches, and staff access'}</h2>
          <p>
            {isThai
              ? 'หน้านี้จำลองการทำงานของผู้ดูแลระบบในการตั้งค่าโครงสร้างคลินิกก่อนเชื่อม API จริง'
              : 'This screen simulates admin operations for clinic setup before real API integration.'}
          </p>
        </div>
        <div className="pb-phase-status-bar">
          <div>
            <p className="pb-stat-label">{isThai ? 'บัญชีรออนุมัติ' : 'Accounts awaiting approval'}</p>
            <p className="pb-stat-value">4</p>
          </div>
          <div>
            <p className="pb-stat-label">{isThai ? 'สาขาทั้งหมด' : 'Total branches'}</p>
            <p className="pb-stat-value">3</p>
          </div>
        </div>
      </Card>

      <section className="pb-split-grid">
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'โปรไฟล์องค์กร' : 'Organization profile'}</h2>
            <p>
              {isThai
                ? 'แก้ไขข้อมูลหลักที่ใช้ในเอกสารและสิทธิ์ระดับองค์กร'
                : 'Update base organization details used in legal and access contexts.'}
            </p>
          </header>

          <form className="pb-form-grid" aria-label="Organization profile form">
            <p className="pb-form-intro">
              {isThai
                ? 'กรอกข้อมูลให้ครบเพื่อใช้กับเอกสาร คลินิกสาขา และสิทธิ์ระดับองค์กร'
                : 'Complete the profile for legal documents, branch setup, and organization-level access.'}
            </p>

            <div className="pb-field">
              <label htmlFor="org-name">{isThai ? 'ชื่อองค์กร' : 'Organization name'}</label>
              <Input id="org-name" defaultValue="Paws & Care Veterinary Group" />
            </div>

            <div className="pb-field">
              <label htmlFor="org-id">{isThai ? 'เลขทะเบียนนิติบุคคล' : 'Business registration id'}</label>
              <Input id="org-id" defaultValue="0105569112234" />
            </div>

            <div className="pb-field">
              <label htmlFor="org-phone">{isThai ? 'เบอร์ติดต่อหลัก' : 'Primary contact number'}</label>
              <Input id="org-phone" defaultValue="+66 2 245 8800" />
            </div>

            <div className="pb-field">
              <label htmlFor="org-email">{isThai ? 'อีเมลสำหรับแจ้งเตือนระบบ' : 'System notification email'}</label>
              <Input id="org-email" defaultValue="admin@paws-care.co.th" />
            </div>

            <div className="pb-field">
              <label htmlFor="org-timezone">{isThai ? 'โซนเวลาองค์กร' : 'Organization timezone'}</label>
              <select id="org-timezone" className="pb-select" defaultValue="Asia/Bangkok">
                <option value="Asia/Bangkok">Asia/Bangkok (UTC+7)</option>
                <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
              </select>
              <p className="pb-field-hint">
                {isThai
                  ? 'เวลานัดหมายและรายงานจะอ้างอิงจากโซนเวลานี้'
                  : 'Appointments and operational reports follow this timezone.'}
              </p>
            </div>

            <div className="pb-field pb-field-span-full">
              <label htmlFor="org-address">{isThai ? 'ที่อยู่สำนักงานใหญ่' : 'Head office address'}</label>
              <Input id="org-address" defaultValue="35 Rama IX Road, Huai Khwang, Bangkok 10310" />
            </div>

            <div className="pb-form-actions">
              <Button type="button" variant="ghost">
                {isThai ? 'ยกเลิกการแก้ไข' : 'Discard changes'}
              </Button>
              <Button type="button">{isThai ? 'บันทึกแบบร่าง' : 'Save draft'}</Button>
            </div>
          </form>
        </Card>

        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'นโยบายการเข้าถึง' : 'Access policies'}</h2>
            <p>
              {isThai
                ? 'นโยบายที่ต้องเปิดใช้ก่อนส่งทีมเข้าหน้าปฏิบัติการ'
                : 'Required controls before granting production operations access.'}
            </p>
          </header>

          <ul className="pb-checklist">
            <li className="pb-checklist-item" data-state="done">
              <span>{isThai ? 'บังคับรีเซ็ตรหัสผ่านทุก 90 วัน' : 'Mandatory password rotation every 90 days'}</span>
            </li>
            <li className="pb-checklist-item" data-state="done">
              <span>{isThai ? 'ยืนยันอีเมลก่อนเปิดใช้งานบัญชี' : 'Email verification required before activation'}</span>
            </li>
            <li className="pb-checklist-item" data-state="active">
              <span>{isThai ? 'เปิด MFA สำหรับบทบาท Admin และ Doctor' : 'Enable MFA for Admin and Doctor roles'}</span>
            </li>
            <li className="pb-checklist-item" data-state="active">
              <span>
                {isThai
                  ? 'จำกัดข้อมูลข้ามสาขาสำหรับ Receptionist'
                  : 'Restrict cross-branch records for Receptionist role'}
              </span>
            </li>
          </ul>
        </Card>
      </section>

      <Card>
        <header className="pb-section-header">
          <h2>{isThai ? 'โครงสร้างสาขา' : 'Branch structure'}</h2>
          <p>
            {isThai
              ? 'สถานะความพร้อมของแต่ละสาขาและผู้รับผิดชอบหลัก'
              : 'Readiness status and ownership for each branch.'}
          </p>
        </header>

        <div className="pb-table-toolbar">
          <div>
            <p className="pb-table-title">{isThai ? 'สรุปภาพรวมสาขา' : 'Branch readiness overview'}</p>
            <p className="pb-table-caption">
              <span className="pb-live-dot" aria-hidden="true" />
              {isThai ? 'อัปเดตล่าสุด 09:30' : 'Last updated at 09:30'}
            </p>
          </div>
          <div className="pb-table-actions">
            <Button type="button" variant="ghost">
              {isThai ? 'ส่งออก CSV' : 'Export CSV'}
            </Button>
          </div>
        </div>

        <div className="pb-table-wrap">
          <table className="pb-table">
            <thead>
              <tr>
                <th scope="col">{branchLabels.branch}</th>
                <th scope="col">{branchLabels.location}</th>
                <th scope="col">{branchLabels.owner}</th>
                <th scope="col">{branchLabels.staffReady}</th>
                <th scope="col">{branchLabels.status}</th>
                <th scope="col">{branchLabels.actions}</th>
              </tr>
            </thead>
            <tbody>
              {branchRows.map((row) => (
                <tr key={row.branch}>
                  <td data-label={branchLabels.branch}>
                    <span className="pb-row-main">{row.branch}</span>
                    <span className="pb-row-meta">{row.code}</span>
                  </td>
                  <td data-label={branchLabels.location}>{row.city}</td>
                  <td data-label={branchLabels.owner}>{row.manager}</td>
                  <td data-label={branchLabels.staffReady} data-numeric="true">
                    {row.staff}
                  </td>
                  <td data-label={branchLabels.status}>
                    <span className="pb-pill" data-status={row.statusCode}>
                      {row.status}
                    </span>
                  </td>
                  <td data-label={branchLabels.actions}>
                    <div className="pb-row-actions">
                      <Button type="button" variant="ghost" className="pb-row-action-btn">
                        {isThai ? 'ดู' : 'View'}
                      </Button>
                      <Button type="button" variant="ghost" className="pb-row-action-btn">
                        {isThai ? 'แก้ไข' : 'Edit'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <header className="pb-section-header">
          <h2>{isThai ? 'รายชื่อทีมงานและสิทธิ์การใช้งาน' : 'Staff roster and access assignments'}</h2>
          <p>
            {isThai
              ? 'จัดการบทบาท, การเปิดใช้งาน, และขอบเขตสาขาของผู้ใช้งานแต่ละคน'
              : 'Manage role, activation state, and branch scope for each account.'}
          </p>
        </header>

        <div className="pb-table-toolbar">
          <div>
            <p className="pb-table-title">{isThai ? 'บัญชีผู้ใช้งานทั้งหมด' : 'All staff accounts'}</p>
            <p className="pb-table-caption">
              <span className="pb-live-dot" aria-hidden="true" />
              {isThai ? 'พร้อมเปิดใช้งานทันที 2 บัญชี' : '2 accounts ready for activation'}
            </p>
          </div>
          <div className="pb-table-actions">
            <Button type="button" variant="ghost">
              {isThai ? 'เชิญทีมงาน' : 'Invite staff'}
            </Button>
          </div>
        </div>

        <div className="pb-table-wrap">
          <table className="pb-table">
            <thead>
              <tr>
                <th scope="col">{staffLabels.staff}</th>
                <th scope="col">{staffLabels.role}</th>
                <th scope="col">{staffLabels.branchScope}</th>
                <th scope="col">{staffLabels.lastActive}</th>
                <th scope="col">{staffLabels.status}</th>
                <th scope="col">{staffLabels.actions}</th>
              </tr>
            </thead>
            <tbody>
              {staffRows.map((row) => (
                <tr key={row.name}>
                  <td data-label={staffLabels.staff}>
                    <span className="pb-row-main">{row.name}</span>
                    <span className="pb-row-meta">{row.email}</span>
                  </td>
                  <td data-label={staffLabels.role}>{row.role}</td>
                  <td data-label={staffLabels.branchScope}>{row.branch}</td>
                  <td data-label={staffLabels.lastActive} data-numeric="true">
                    {row.lastActive}
                  </td>
                  <td data-label={staffLabels.status}>
                    <span className="pb-pill" data-status={row.statusCode}>
                      {row.status}
                    </span>
                  </td>
                  <td data-label={staffLabels.actions}>
                    <div className="pb-row-actions">
                      <Button type="button" variant="ghost" className="pb-row-action-btn">
                        {isThai ? 'รีเซ็ตสิทธิ์' : 'Reset access'}
                      </Button>
                      <Button type="button" variant="ghost" className="pb-row-action-btn">
                        {isThai ? 'ส่งเตือน' : 'Send reminder'}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}
