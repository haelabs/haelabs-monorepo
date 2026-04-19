import { PageContainer } from '@petabase/components/layout/page-container';
import { Card } from '@petabase/components/ui/card';
import { getMessages } from '@petabase/lib/i18n/dictionaries';
import { ensureLocale } from '@petabase/lib/i18n/locale';

type DashboardPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale: localeParam } = await params;
  const locale = ensureLocale(localeParam);
  const messages = await getMessages(locale);
  const isThai = locale === 'th';
  const roleMatrixLabels = {
    role: isThai ? 'บทบาท' : 'Role',
    access: isThai ? 'สิทธิ์หลัก' : 'Primary access',
    branchScope: isThai ? 'ขอบเขตสาขา' : 'Branch scope',
  } as const;

  const setupMilestones = [
    {
      title: isThai ? 'เปิดใช้งานบัญชีผู้ดูแลหลัก' : 'Primary admin account activated',
      detail: isThai ? 'Thanida Pradit ยืนยันอีเมลและเปิด MFA แล้ว' : 'Thanida Pradit verified email and enabled MFA',
      state: 'done',
    },
    {
      title: isThai ? 'สร้างโปรไฟล์องค์กรและแบรนด์คลินิก' : 'Organization profile and clinic brand configured',
      detail: isThai ? 'โลโก้, เลขทะเบียน, ข้อมูลติดต่อครบถ้วน' : 'Logo, registration id, and contact profile completed',
      state: 'done',
    },
    {
      title: isThai ? 'กำหนดขอบเขตสาขาและบทบาททีมแพทย์' : 'Branch scope and medical role mapping',
      detail: isThai ? 'เหลือรออนุมัติสิทธิ์ Doctor ที่ Chiang Mai Satellite' : 'Doctor scope approval pending for Chiang Mai Satellite',
      state: 'in-progress',
    },
    {
      title: isThai ? 'ปิดแผนความปลอดภัยรหัสผ่านสำหรับทุกทีม' : 'Enforce password policy for all staff',
      detail: isThai ? 'ตั้งรอบเปลี่ยนรหัสผ่าน 90 วัน เริ่มพรุ่งนี้' : '90-day reset policy scheduled to start tomorrow',
      state: 'in-progress',
    },
  ] as const;

  const branchSnapshots = [
    {
      branch: 'Bangkok HQ',
      staff: '12',
      status: isThai ? 'พร้อมใช้งาน' : 'Ready',
      statusCode: 'confirmed',
      risk: isThai ? 'สิทธิ์ครบทุกบทบาท' : 'All required roles assigned',
    },
    {
      branch: 'Rama 9',
      staff: '6',
      status: isThai ? 'กำลังปรับสิทธิ์' : 'Adjusting scope',
      statusCode: 'in-progress',
      risk: isThai ? 'Nurse 1 คนรอเปิดบัญชี' : 'One nurse account pending activation',
    },
    {
      branch: 'Chiang Mai Satellite',
      staff: '0',
      status: isThai ? 'รออนุมัติ' : 'Pending approval',
      statusCode: 'scheduled',
      risk: isThai ? 'ต้องยืนยันผู้รับผิดชอบสาขา' : 'Needs designated branch owner',
    },
  ] as const;

  const roleCoverageRows = [
    {
      role: 'Admin',
      access: isThai ? 'จัดการองค์กร + สาขา + ทีมงาน' : 'Org, branch, and staff administration',
      branchScope: isThai ? 'ทุกสาขา' : 'All branches',
    },
    {
      role: 'Doctor',
      access: isThai ? 'เวชระเบียน + บันทึกการรักษา' : 'Medical records and consultation actions',
      branchScope: isThai ? 'Bangkok HQ, Rama 9' : 'Bangkok HQ, Rama 9',
    },
    {
      role: 'Nurse',
      access: isThai ? 'สนับสนุนการรักษา + เตรียมยา' : 'Clinical support and preparation tasks',
      branchScope: isThai ? 'Bangkok HQ' : 'Bangkok HQ',
    },
    {
      role: 'Receptionist',
      access: isThai ? 'นัดหมาย + ลงทะเบียนหน้างาน' : 'Scheduling and front-desk operations',
      branchScope: isThai ? 'Bangkok HQ, Rama 9' : 'Bangkok HQ, Rama 9',
    },
  ] as const;

  return (
    <PageContainer title={messages.dashboard.title} description={messages.dashboard.subtitle}>
      <Card className="pb-phase-hero">
        <div>
          <p className="pb-sidebar-kicker">Phase 1 Frontend Prototype</p>
          <h2>{isThai ? 'ศูนย์ควบคุมการเปิดสิทธิ์และตั้งค่าคลินิก' : 'Access control and clinic setup command center'}</h2>
          <p>
            {isThai
              ? 'ทีมผู้ดูแลใช้หน้าจอนี้เพื่อติดตามการเปิดบัญชีทีมงาน, ขอบเขตสาขา และนโยบายความปลอดภัยก่อนเริ่มเฟสข้อมูลคนไข้'
              : 'Admin teams use this view to track staff activation, branch scope readiness, and security policies before patient records phase.'}
          </p>
        </div>
        <div className="pb-phase-status-bar" aria-label="Phase status metrics">
          <div>
            <p className="pb-stat-label">{isThai ? 'ความคืบหน้าโดยรวม' : 'Overall completion'}</p>
            <p className="pb-stat-value">78%</p>
          </div>
          <div>
            <p className="pb-stat-label">{isThai ? 'เป้าหมาย Go-live' : 'Target go-live'}</p>
            <p className="pb-stat-value pb-stat-value-sm">29 Apr 2026</p>
          </div>
        </div>
      </Card>

      <section className="pb-kpi-grid" aria-label="Access control summary">
        <Card className="pb-kpi-card">
          <p className="pb-stat-label">{isThai ? 'ผู้ใช้งานที่เปิดใช้งาน' : 'Active staff accounts'}</p>
          <p className="pb-stat-value">18</p>
          <p className="pb-stat-trend">{isThai ? '5 บทบาทข้าม 3 สาขา' : '5 roles across 3 branches'}</p>
        </Card>

        <Card className="pb-kpi-card">
          <p className="pb-stat-label">{isThai ? 'คำเชิญที่รอตอบรับ' : 'Pending invitations'}</p>
          <p className="pb-stat-value">4</p>
          <p className="pb-stat-trend">{isThai ? 'หมดอายุใน 48 ชั่วโมง' : 'Expire within 48 hours'}</p>
        </Card>

        <Card className="pb-kpi-card">
          <p className="pb-stat-label">{isThai ? 'สาขาที่พร้อมใช้งาน' : 'Branches go-live ready'}</p>
          <p className="pb-stat-value">2/3</p>
          <p className="pb-stat-trend">{isThai ? 'รออนุมัติสิทธิ์อีก 1 สาขา' : '1 branch awaiting scope approval'}</p>
        </Card>

        <Card className="pb-kpi-card">
          <p className="pb-stat-label">{isThai ? 'เหตุการณ์ความปลอดภัย' : 'Security incidents'}</p>
          <p className="pb-stat-value">0</p>
          <p className="pb-stat-trend">{isThai ? 'เปิดใช้บังคับรีเซ็ตรหัสผ่านแล้ว' : 'Password reset policy active'}</p>
        </Card>
      </section>

      <section className="pb-split-grid">
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'ตัวติดตามงานเตรียมระบบ' : 'Readiness tracker'}</h2>
            <p>
              {isThai
                ? 'อ้างอิงเงื่อนไขสำเร็จจาก Roadmap เพื่อให้ทีมเห็นความพร้อมก่อนเชื่อมต่อ API จริง'
                : 'Anchored to roadmap success criteria so teams can validate readiness before API wiring.'}
            </p>
          </header>

          <ul className="pb-timeline">
            {setupMilestones.map((milestone) => (
              <li key={milestone.title} data-state={milestone.state}>
                <p className="pb-workflow-role">{milestone.title}</p>
                <p className="pb-workflow-copy">{milestone.detail}</p>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'เหตุการณ์การเข้าถึงล่าสุด' : 'Recent access events'}</h2>
            <p>
              {isThai
                ? 'แสดงลำดับกิจกรรมที่เกี่ยวข้องกับการเชิญผู้ใช้และการจัดการสิทธิ์'
                : 'Chronological feed of invitation and permission management actions.'}
            </p>
          </header>

          <ul className="pb-activity-list">
            <li>
              <p className="pb-workflow-role">09:12 • Thanida P. (Admin)</p>
              <p className="pb-workflow-copy">
                {isThai ? 'เพิ่มสาขาใหม่: Chiang Mai Satellite' : 'Added new branch: Chiang Mai Satellite'}
              </p>
            </li>
            <li>
              <p className="pb-workflow-role">08:45 • Dr. Pim</p>
              <p className="pb-workflow-copy">
                {isThai
                  ? 'ยืนยันบทบาท Doctor และขอบเขตสาขา Bangkok HQ'
                  : 'Doctor role confirmed with Bangkok HQ branch scope'}
              </p>
            </li>
            <li>
              <p className="pb-workflow-role">08:21 • Security Policy</p>
              <p className="pb-workflow-copy">
                {isThai
                  ? 'เปิดนโยบายบังคับรีเซ็ตรหัสผ่านทุก 90 วัน'
                  : 'Enforced mandatory password reset policy every 90 days'}
              </p>
            </li>
          </ul>
        </Card>
      </section>

      <section className="pb-split-grid">
        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'ความพร้อมรายสาขา' : 'Branch readiness'}</h2>
            <p>
              {isThai
                ? 'ติดตามจำนวนทีมงานและสถานะอนุมัติสิทธิ์ในแต่ละสาขา'
                : 'Monitor staff coverage and scope approvals per branch.'}
            </p>
          </header>
          <div className="pb-branch-grid">
            {branchSnapshots.map((branch) => (
              <article key={branch.branch} className="pb-branch-card">
                <p className="pb-workflow-role">{branch.branch}</p>
                <p className="pb-workflow-copy">
                  {isThai ? 'ทีมงานพร้อมใช้งาน' : 'Staff ready'}: <strong>{branch.staff}</strong>
                </p>
                <p>
                  <span className="pb-pill" data-status={branch.statusCode}>
                    {branch.status}
                  </span>
                </p>
                <p className="pb-workflow-copy">{branch.risk}</p>
              </article>
            ))}
          </div>
        </Card>

        <Card>
          <header className="pb-section-header">
            <h2>{isThai ? 'บทบาทและขอบเขตการเข้าถึง' : 'Role and access matrix'}</h2>
            <p>
              {isThai
                ? 'ดูขอบเขตที่อนุญาตเพื่อป้องกันการเข้าถึงข้ามองค์กรหรือข้ามสาขา'
                : 'Reference allowed actions to prevent cross-org or cross-branch access.'}
            </p>
          </header>

          <div className="pb-table-wrap">
            <table className="pb-table">
              <thead>
                <tr>
                  <th scope="col">{roleMatrixLabels.role}</th>
                  <th scope="col">{roleMatrixLabels.access}</th>
                  <th scope="col">{roleMatrixLabels.branchScope}</th>
                </tr>
              </thead>
              <tbody>
                {roleCoverageRows.map((row) => (
                  <tr key={row.role}>
                    <td data-label={roleMatrixLabels.role}>{row.role}</td>
                    <td data-label={roleMatrixLabels.access}>{row.access}</td>
                    <td data-label={roleMatrixLabels.branchScope}>{row.branchScope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
