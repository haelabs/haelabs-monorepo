import { PageContainer } from '@petabase/components/layout/page-container';
import { Card } from '@petabase/components/ui/card';
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

  const branchRows = [
    {
      branch: 'Bangkok HQ',
      city: isThai ? 'กรุงเทพฯ' : 'Bangkok',
      manager: 'Thanida P.',
      staff: '12',
      status: isThai ? 'พร้อมใช้งาน' : 'Ready',
      statusCode: 'confirmed',
    },
    {
      branch: 'Rama 9',
      city: isThai ? 'กรุงเทพฯ' : 'Bangkok',
      manager: 'Dr. Pim K.',
      staff: '6',
      status: isThai ? 'กำลังปรับสิทธิ์' : 'Adjusting scope',
      statusCode: 'in-progress',
    },
    {
      branch: 'Chiang Mai Satellite',
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
      role: 'Admin',
      branch: isThai ? 'ทุกสาขา' : 'All branches',
      lastActive: '09:24',
      status: isThai ? 'ใช้งานอยู่' : 'Active',
      statusCode: 'confirmed',
    },
    {
      name: 'Dr. Napat Surachai',
      role: 'Doctor',
      branch: 'Bangkok HQ',
      lastActive: '09:18',
      status: isThai ? 'เข้าเวร' : 'On shift',
      statusCode: 'in-progress',
    },
    {
      name: 'Chompoo R.',
      role: 'Nurse',
      branch: 'Rama 9',
      lastActive: isThai ? 'เมื่อวาน' : 'Yesterday',
      status: isThai ? 'รอเปิดบัญชี' : 'Pending activation',
      statusCode: 'scheduled',
    },
    {
      name: 'Frontdesk CM Invite',
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
            <label htmlFor="org-name">{isThai ? 'ชื่อองค์กร' : 'Organization name'}</label>
            <input id="org-name" className="pb-input" defaultValue="Paws & Care Veterinary Group" />

            <label htmlFor="org-id">{isThai ? 'เลขทะเบียนนิติบุคคล' : 'Business registration id'}</label>
            <input id="org-id" className="pb-input" defaultValue="0105569112234" />

            <label htmlFor="org-phone">{isThai ? 'เบอร์ติดต่อหลัก' : 'Primary contact number'}</label>
            <input id="org-phone" className="pb-input" defaultValue="+66 2 245 8800" />

            <label htmlFor="org-email">{isThai ? 'อีเมลสำหรับแจ้งเตือนระบบ' : 'System notification email'}</label>
            <input id="org-email" className="pb-input" defaultValue="admin@paws-care.co.th" />

            <button type="button" className="pb-btn">
              {isThai ? 'บันทึกแบบร่าง' : 'Save draft'}
            </button>
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

        <div className="pb-table-wrap">
          <table className="pb-table">
            <thead>
              <tr>
                <th scope="col">{isThai ? 'สาขา' : 'Branch'}</th>
                <th scope="col">{isThai ? 'พื้นที่' : 'Location'}</th>
                <th scope="col">{isThai ? 'ผู้รับผิดชอบ' : 'Owner'}</th>
                <th scope="col">{isThai ? 'ทีมงานพร้อมใช้งาน' : 'Staff ready'}</th>
                <th scope="col">{isThai ? 'สถานะ' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {branchRows.map((row) => (
                <tr key={row.branch}>
                  <td>{row.branch}</td>
                  <td>{row.city}</td>
                  <td>{row.manager}</td>
                  <td data-numeric="true">{row.staff}</td>
                  <td>
                    <span className="pb-pill" data-status={row.statusCode}>
                      {row.status}
                    </span>
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

        <div className="pb-table-wrap">
          <table className="pb-table">
            <thead>
              <tr>
                <th scope="col">{isThai ? 'ทีมงาน' : 'Staff'}</th>
                <th scope="col">{isThai ? 'บทบาท' : 'Role'}</th>
                <th scope="col">{isThai ? 'ขอบเขตสาขา' : 'Branch scope'}</th>
                <th scope="col">{isThai ? 'ใช้งานล่าสุด' : 'Last active'}</th>
                <th scope="col">{isThai ? 'สถานะ' : 'Status'}</th>
              </tr>
            </thead>
            <tbody>
              {staffRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.role}</td>
                  <td>{row.branch}</td>
                  <td data-numeric="true">{row.lastActive}</td>
                  <td>
                    <span className="pb-pill" data-status={row.statusCode}>
                      {row.status}
                    </span>
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
