import type { MessageCatalog } from '@petabase/types/i18n';

const th: MessageCatalog = {
  common: {
    appName: 'Petabase',
    welcome: 'ยินดีต้อนรับสู่ระบบจัดการคลินิก',
  },
  nav: {
    dashboard: 'แดชบอร์ด',
    patients: 'คนไข้',
    appointments: 'นัดหมาย',
    consultations: 'การรักษา',
    billing: 'การเงิน',
    admin: 'ผู้ดูแลระบบ',
    signIn: 'เข้าสู่ระบบ',
    signOut: 'ออกจากระบบ',
  },
  auth: {
    title: 'เข้าสู่ระบบ Petabase',
    subtitle: 'เริ่มต้นใช้งานสำหรับทีมคลินิกของคุณ',
    emailLabel: 'อีเมล',
    passwordLabel: 'รหัสผ่าน',
    submit: 'เข้าสู่ระบบ',
  },
  dashboard: {
    title: 'ภาพรวมการดำเนินงานคลินิก',
    subtitle: 'ติดตามนัดหมายวันนี้ การดูแลคนไข้ การเงิน และความพร้อมของแต่ละสาขาในพื้นที่ทำงานเดียว',
  },
  admin: {
    title: 'จัดการองค์กรและสิทธิ์การเข้าถึง',
    subtitle: 'กำหนดโปรไฟล์องค์กร สาขา การเชิญทีมงาน และสิทธิ์ตามบทบาท',
  },
  states: {
    loading: 'กำลังโหลด...',
    empty: 'ยังไม่มีข้อมูลในส่วนนี้',
    error: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
  },
};

export default th;
