import type { MessageCatalog } from '@petabase/types/i18n';

const th: MessageCatalog = {
  common: {
    appName: 'Petabase',
    welcome: 'ยินดีต้อนรับสู่ระบบจัดการคลินิก',
  },
  nav: {
    dashboard: 'แดชบอร์ด',
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
    title: 'ภาพรวมการทำงานวันนี้',
    subtitle: 'โครงสร้างพร้อมต่อยอดสำหรับนัดหมาย ลูกค้า และการเงิน',
  },
  admin: {
    title: 'พื้นที่ผู้ดูแลภายใน',
    subtitle: 'แยกเส้นทางภายในแอปเดียวตามแนวทางที่อนุมัติ',
  },
  states: {
    loading: 'กำลังโหลด...',
    empty: 'ยังไม่มีข้อมูลในส่วนนี้',
    error: 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
  },
};

export default th;
