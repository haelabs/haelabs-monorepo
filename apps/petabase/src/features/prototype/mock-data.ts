export type Branch = {
  id: string;
  name: string;
  city: string;
  type: string;
  phone: string;
  manager: string;
  readiness: 'confirmed' | 'in-progress' | 'scheduled';
};

export type StaffRole = 'Admin' | 'Doctor' | 'Nurse' | 'Receptionist';

export type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  branchId: string;
  shift: string;
  status: 'confirmed' | 'in-progress' | 'scheduled';
};

export type Owner = {
  id: string;
  name: string;
  phone: string;
  email: string;
  lineId: string;
  branchId: string;
  address: string;
  notes: string;
};

export type PatientDocument = {
  id: string;
  name: string;
  kind: string;
  uploadedAt: string;
};

export type PatientTimelineEntry = {
  id: string;
  date: string;
  title: string;
  note: string;
  status: 'confirmed' | 'in-progress' | 'scheduled' | 'no-show';
};

export type Patient = {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Rabbit';
  breed: string;
  sex: 'Male' | 'Female';
  age: string;
  weightKg: string;
  color: string;
  microchip: string;
  branchId: string;
  ownerId: string;
  photoLabel: string;
  tags: string[];
  lastVisit: string;
  nextVisit: string;
  alerts: string[];
  timeline: PatientTimelineEntry[];
  documents: PatientDocument[];
};

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
export type AppointmentType = 'Vaccination' | 'Consultation' | 'Surgery Follow-up' | 'Dental' | 'Emergency';

export type Appointment = {
  id: string;
  patientId: string;
  ownerId: string;
  branchId: string;
  doctorId: string;
  type: AppointmentType;
  status: AppointmentStatus;
  startsAt: string;
  durationMinutes: number;
  room: string;
  reason: string;
  note: string;
};

export type PrescriptionItem = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
};

export type SoapNote = {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
};

export type Consultation = {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  branchId: string;
  startedAt: string;
  diagnosis: string;
  soap: SoapNote;
  prescriptions: PrescriptionItem[];
  followUp: string;
  invoiceId: string;
};

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';
export type PaymentMethod = 'Cash' | 'Card' | 'Transfer';

export type InvoiceLineItem = {
  id: string;
  label: string;
  category: 'Service' | 'Product' | 'Charge';
  quantity: number;
  unitPrice: number;
};

export type PaymentRecord = {
  id: string;
  method: PaymentMethod;
  amount: number;
  paidAt: string;
  reference: string;
};

export type Invoice = {
  id: string;
  consultationId: string;
  patientId: string;
  ownerId: string;
  branchId: string;
  issuedAt: string;
  dueAt: string;
  status: InvoiceStatus;
  discount: number;
  taxRate: number;
  lineItems: InvoiceLineItem[];
  payments: PaymentRecord[];
};

export type ActivityItem = {
  id: string;
  at: string;
  actor: string;
  title: string;
  detail: string;
};

export const branches: Branch[] = [
  {
    id: 'bangkok-hq',
    name: 'Bangkok HQ',
    city: 'Bangkok',
    type: '24/7 Hospital',
    phone: '+66 2 245 8800',
    manager: 'Thanida Pradit',
    readiness: 'confirmed',
  },
  {
    id: 'rama-9',
    name: 'Rama 9',
    city: 'Bangkok',
    type: 'Satellite Clinic',
    phone: '+66 2 117 3200',
    manager: 'Dr. Pim Kanchana',
    readiness: 'in-progress',
  },
  {
    id: 'chiang-mai',
    name: 'Chiang Mai Satellite',
    city: 'Chiang Mai',
    type: 'Mobile + Branch Launch',
    phone: '+66 53 410 880',
    manager: 'Pending assignment',
    readiness: 'scheduled',
  },
];

export const staffMembers: StaffMember[] = [
  {
    id: 'staff-thanida',
    name: 'Thanida Pradit',
    email: 'thanida@paws-care.co.th',
    role: 'Admin',
    branchId: 'bangkok-hq',
    shift: '08:00-17:00',
    status: 'confirmed',
  },
  {
    id: 'staff-napat',
    name: 'Dr. Napat Surachai',
    email: 'napat@paws-care.co.th',
    role: 'Doctor',
    branchId: 'bangkok-hq',
    shift: '09:00-18:00',
    status: 'in-progress',
  },
  {
    id: 'staff-pim',
    name: 'Dr. Pim Kanchana',
    email: 'pim@paws-care.co.th',
    role: 'Doctor',
    branchId: 'rama-9',
    shift: '10:00-19:00',
    status: 'confirmed',
  },
  {
    id: 'staff-ploy',
    name: 'Ploy Rattana',
    email: 'ploy@paws-care.co.th',
    role: 'Nurse',
    branchId: 'bangkok-hq',
    shift: '08:00-17:00',
    status: 'confirmed',
  },
  {
    id: 'staff-fon',
    name: 'Fon Anusara',
    email: 'fon@paws-care.co.th',
    role: 'Receptionist',
    branchId: 'rama-9',
    shift: '07:30-16:30',
    status: 'scheduled',
  },
];

export const owners: Owner[] = [
  {
    id: 'owner-mali',
    name: 'Mali Srisawat',
    phone: '089-114-5521',
    email: 'mali.sri@example.com',
    lineId: '@mali.sri',
    branchId: 'bangkok-hq',
    address: '35 Rama IX Road, Huai Khwang, Bangkok',
    notes: 'Prefers medication instructions in Thai and invoice copies by email.',
  },
  {
    id: 'owner-arin',
    name: 'Arin Wongchai',
    phone: '092-711-4432',
    email: 'arin.w@example.com',
    lineId: '@arinw',
    branchId: 'rama-9',
    address: '91 Rama 9 Soi 13, Bangkok',
    notes: 'Often books evening appointments and asks for card receipts.',
  },
  {
    id: 'owner-mew',
    name: 'Mew Kessara',
    phone: '081-221-8884',
    email: 'mew.k@example.com',
    lineId: '@mewk',
    branchId: 'bangkok-hq',
    address: '26 Sukhumvit 39, Bangkok',
    notes: 'Has multiple pets linked to the same account.',
  },
];

export const patients: Patient[] = [
  {
    id: 'patient-luna',
    name: 'Luna',
    species: 'Dog',
    breed: 'Golden Retriever',
    sex: 'Female',
    age: '5y 2m',
    weightKg: '28.4',
    color: 'Golden',
    microchip: '985141008812301',
    branchId: 'bangkok-hq',
    ownerId: 'owner-mali',
    photoLabel: 'LU',
    tags: ['Vaccination due', 'Sensitive stomach'],
    lastVisit: '2026-04-23T10:15:00+07:00',
    nextVisit: '2026-04-29T09:00:00+07:00',
    alerts: ['Monitor appetite after antibiotic course'],
    timeline: [
      {
        id: 'tl-luna-1',
        date: '2026-04-23 10:15',
        title: 'Follow-up consultation completed',
        note: 'GI symptoms improved. Continue bland diet and probiotic support.',
        status: 'confirmed',
      },
      {
        id: 'tl-luna-2',
        date: '2026-04-20 08:40',
        title: 'Blood chemistry panel reviewed',
        note: 'Mild dehydration noted. Owner instructed to increase hydration monitoring.',
        status: 'in-progress',
      },
      {
        id: 'tl-luna-3',
        date: '2026-04-10 15:20',
        title: 'Annual vaccination scheduled',
        note: 'DHPP booster booked for next week.',
        status: 'scheduled',
      },
    ],
    documents: [
      { id: 'doc-luna-1', name: 'CBC-Apr-2026.pdf', kind: 'Lab result', uploadedAt: '2026-04-20' },
      { id: 'doc-luna-2', name: 'Ultrasound-summary.pdf', kind: 'Imaging note', uploadedAt: '2026-04-12' },
    ],
  },
  {
    id: 'patient-mochi',
    name: 'Mochi',
    species: 'Cat',
    breed: 'Scottish Fold',
    sex: 'Male',
    age: '3y 7m',
    weightKg: '4.8',
    color: 'Silver tabby',
    microchip: '985141008812302',
    branchId: 'rama-9',
    ownerId: 'owner-arin',
    photoLabel: 'MO',
    tags: ['Dental review', 'Indoor only'],
    lastVisit: '2026-04-25T11:00:00+07:00',
    nextVisit: '2026-05-02T14:30:00+07:00',
    alerts: ['Requires gentle restraint during oral exam'],
    timeline: [
      {
        id: 'tl-mochi-1',
        date: '2026-04-25 11:00',
        title: 'Dental consultation in progress',
        note: 'Plaque accumulation grade 2. Discussed prophylaxis quote with owner.',
        status: 'in-progress',
      },
      {
        id: 'tl-mochi-2',
        date: '2026-03-18 16:45',
        title: 'Vaccination completed',
        note: 'FVRCP booster administered without adverse events.',
        status: 'confirmed',
      },
    ],
    documents: [{ id: 'doc-mochi-1', name: 'Dental-photo-set.zip', kind: 'Photo set', uploadedAt: '2026-04-25' }],
  },
  {
    id: 'patient-tofu',
    name: 'Tofu',
    species: 'Rabbit',
    breed: 'Netherland Dwarf',
    sex: 'Female',
    age: '1y 10m',
    weightKg: '1.4',
    color: 'White',
    microchip: '985141008812303',
    branchId: 'bangkok-hq',
    ownerId: 'owner-mew',
    photoLabel: 'TO',
    tags: ['Exotics', 'Diet counselling'],
    lastVisit: '2026-04-24T13:20:00+07:00',
    nextVisit: '2026-05-06T10:00:00+07:00',
    alerts: ['Needs printed feeding plan for boarding staff'],
    timeline: [
      {
        id: 'tl-tofu-1',
        date: '2026-04-24 13:20',
        title: 'Weight-loss plan reviewed',
        note: 'Diet adjusted to hay-heavy plan. Follow-up weight check in 2 weeks.',
        status: 'confirmed',
      },
      {
        id: 'tl-tofu-2',
        date: '2026-04-03 09:00',
        title: 'No-show for nutrition consult',
        note: 'Owner requested rebook due to transport issue.',
        status: 'no-show',
      },
    ],
    documents: [{ id: 'doc-tofu-1', name: 'Feeding-plan-v2.pdf', kind: 'Care plan', uploadedAt: '2026-04-24' }],
  },
];

export const appointments: Appointment[] = [
  {
    id: 'apt-1001',
    patientId: 'patient-luna',
    ownerId: 'owner-mali',
    branchId: 'bangkok-hq',
    doctorId: 'staff-napat',
    type: 'Consultation',
    status: 'confirmed',
    startsAt: '2026-04-25T09:00:00+07:00',
    durationMinutes: 30,
    room: 'Exam 2',
    reason: 'Vomiting follow-up',
    note: 'Owner uploaded stool diary via front desk before arrival.',
  },
  {
    id: 'apt-1002',
    patientId: 'patient-mochi',
    ownerId: 'owner-arin',
    branchId: 'rama-9',
    doctorId: 'staff-pim',
    type: 'Dental',
    status: 'in-progress',
    startsAt: '2026-04-25T11:00:00+07:00',
    durationMinutes: 45,
    room: 'Exam 1',
    reason: 'Oral exam and estimate',
    note: 'May convert to procedure booking pending owner approval.',
  },
  {
    id: 'apt-1003',
    patientId: 'patient-tofu',
    ownerId: 'owner-mew',
    branchId: 'bangkok-hq',
    doctorId: 'staff-napat',
    type: 'Consultation',
    status: 'scheduled',
    startsAt: '2026-04-25T14:30:00+07:00',
    durationMinutes: 30,
    room: 'Exotics',
    reason: 'Nutrition counselling',
    note: 'Bring current pellet mix and feeding log.',
  },
  {
    id: 'apt-1004',
    patientId: 'patient-luna',
    ownerId: 'owner-mali',
    branchId: 'bangkok-hq',
    doctorId: 'staff-napat',
    type: 'Vaccination',
    status: 'completed',
    startsAt: '2026-04-22T16:00:00+07:00',
    durationMinutes: 20,
    room: 'Nurse Station',
    reason: 'DHPP booster',
    note: 'Observed for 15 minutes after administration.',
  },
  {
    id: 'apt-1005',
    patientId: 'patient-tofu',
    ownerId: 'owner-mew',
    branchId: 'bangkok-hq',
    doctorId: 'staff-napat',
    type: 'Consultation',
    status: 'no-show',
    startsAt: '2026-04-03T09:00:00+07:00',
    durationMinutes: 30,
    room: 'Exotics',
    reason: 'Weight review',
    note: 'Owner requested to rebook next month.',
  },
];

export const consultations: Consultation[] = [
  {
    id: 'con-2001',
    appointmentId: 'apt-1001',
    patientId: 'patient-luna',
    doctorId: 'staff-napat',
    branchId: 'bangkok-hq',
    startedAt: '2026-04-25T09:12:00+07:00',
    diagnosis: 'Acute gastritis resolving',
    soap: {
      subjective: 'Owner reports appetite improving with one soft stool overnight and no vomiting this morning.',
      objective: 'BAR, hydration improved, abdominal palpation soft, temperature 38.4C, body weight stable at 28.4 kg.',
      assessment: 'Acute gastritis resolving with supportive care. Continue to monitor hydration and appetite closely.',
      plan: 'Continue probiotic 5 days, bland diet 3 days, recheck if vomiting recurs or appetite drops.',
    },
    prescriptions: [
      {
        id: 'rx-luna-1',
        medication: 'Probiotic sachet',
        dosage: '1 sachet',
        frequency: 'BID',
        duration: '5 days',
      },
      {
        id: 'rx-luna-2',
        medication: 'Omeprazole',
        dosage: '10 mg',
        frequency: 'SID',
        duration: '3 days',
      },
    ],
    followUp: 'Return for vaccine and GI recheck in 4 days.',
    invoiceId: 'inv-3001',
  },
  {
    id: 'con-2002',
    appointmentId: 'apt-1002',
    patientId: 'patient-mochi',
    doctorId: 'staff-pim',
    branchId: 'rama-9',
    startedAt: '2026-04-25T11:10:00+07:00',
    diagnosis: 'Stage 2 dental disease',
    soap: {
      subjective: 'Owner noticed halitosis and slower dry-food intake for 2 weeks.',
      objective: 'Mild gingivitis, tartar accumulation premolars, no oral bleeding, weight 4.8 kg.',
      assessment: 'Dental prophylaxis indicated. Patient stable for scheduled procedure workup.',
      plan: 'Share estimate, pre-anesthetic CBC, book dental scale and polish next available slot.',
    },
    prescriptions: [
      {
        id: 'rx-mochi-1',
        medication: 'Chlorhexidine oral gel',
        dosage: 'Apply pea-sized amount',
        frequency: 'SID',
        duration: '7 days',
      },
    ],
    followUp: 'Book dental procedure within 7 days.',
    invoiceId: 'inv-3002',
  },
];

export const invoices: Invoice[] = [
  {
    id: 'inv-3001',
    consultationId: 'con-2001',
    patientId: 'patient-luna',
    ownerId: 'owner-mali',
    branchId: 'bangkok-hq',
    issuedAt: '2026-04-25T09:45:00+07:00',
    dueAt: '2026-04-25T18:00:00+07:00',
    status: 'paid',
    discount: 120,
    taxRate: 0.07,
    lineItems: [
      { id: 'li-1', label: 'Follow-up consultation', category: 'Service', quantity: 1, unitPrice: 650 },
      { id: 'li-2', label: 'Probiotic sachet pack', category: 'Product', quantity: 1, unitPrice: 380 },
      { id: 'li-3', label: 'Medication dispensing fee', category: 'Charge', quantity: 1, unitPrice: 80 },
    ],
    payments: [{ id: 'pay-1', method: 'Card', amount: 1069.6, paidAt: '2026-04-25T09:51:00+07:00', reference: 'VISA **** 8812' }],
  },
  {
    id: 'inv-3002',
    consultationId: 'con-2002',
    patientId: 'patient-mochi',
    ownerId: 'owner-arin',
    branchId: 'rama-9',
    issuedAt: '2026-04-25T11:38:00+07:00',
    dueAt: '2026-04-27T18:00:00+07:00',
    status: 'sent',
    discount: 0,
    taxRate: 0.07,
    lineItems: [
      { id: 'li-4', label: 'Dental consultation', category: 'Service', quantity: 1, unitPrice: 800 },
      { id: 'li-5', label: 'Pre-anesthetic CBC', category: 'Service', quantity: 1, unitPrice: 950 },
      { id: 'li-6', label: 'Oral gel', category: 'Product', quantity: 1, unitPrice: 420 },
    ],
    payments: [],
  },
  {
    id: 'inv-3003',
    consultationId: 'con-2002',
    patientId: 'patient-tofu',
    ownerId: 'owner-mew',
    branchId: 'bangkok-hq',
    issuedAt: '2026-04-21T17:00:00+07:00',
    dueAt: '2026-04-23T18:00:00+07:00',
    status: 'overdue',
    discount: 75,
    taxRate: 0.07,
    lineItems: [
      { id: 'li-7', label: 'Nutrition consult', category: 'Service', quantity: 1, unitPrice: 700 },
      { id: 'li-8', label: 'Care plan print pack', category: 'Charge', quantity: 1, unitPrice: 90 },
    ],
    payments: [{ id: 'pay-2', method: 'Transfer', amount: 300, paidAt: '2026-04-22T10:00:00+07:00', reference: 'TT-49001' }],
  },
  {
    id: 'inv-3004',
    consultationId: 'con-2002',
    patientId: 'patient-luna',
    ownerId: 'owner-mali',
    branchId: 'bangkok-hq',
    issuedAt: '2026-04-25T12:15:00+07:00',
    dueAt: '2026-04-30T18:00:00+07:00',
    status: 'draft',
    discount: 0,
    taxRate: 0.07,
    lineItems: [
      { id: 'li-9', label: 'Vaccination package', category: 'Service', quantity: 1, unitPrice: 1200 },
      { id: 'li-10', label: 'Digital certificate issue', category: 'Charge', quantity: 1, unitPrice: 120 },
    ],
    payments: [],
  },
];

export const activities: ActivityItem[] = [
  {
    id: 'act-1',
    at: '11:42',
    actor: 'Front desk Rama 9',
    title: 'Mochi owner approved dental estimate',
    detail: 'Consultation converted to invoice and follow-up procedure booking.',
  },
  {
    id: 'act-2',
    at: '10:26',
    actor: 'Dr. Napat',
    title: 'Luna SOAP note finalized',
    detail: 'Prescription added and invoice sent to checkout.',
  },
  {
    id: 'act-3',
    at: '09:35',
    actor: 'Admin',
    title: 'Chiang Mai branch onboarding pack updated',
    detail: 'Role matrix revised for new receptionist invite batch.',
  },
];

export function getBranch(branchId: string) {
  return branches.find((branch) => branch.id === branchId);
}

export function getOwner(ownerId: string) {
  return owners.find((owner) => owner.id === ownerId);
}

export function getPatient(patientId: string) {
  return patients.find((patient) => patient.id === patientId);
}

export function getStaff(staffId: string) {
  return staffMembers.find((staff) => staff.id === staffId);
}

export function getConsultation(consultationId: string) {
  return consultations.find((consultation) => consultation.id === consultationId);
}

export function getInvoice(invoiceId: string) {
  return invoices.find((invoice) => invoice.id === invoiceId);
}

export function getOwnerPets(ownerId: string) {
  return patients.filter((patient) => patient.ownerId === ownerId);
}

export function getPatientAppointments(patientId: string) {
  return appointments.filter((appointment) => appointment.patientId === patientId);
}

export function getPatientConsultations(patientId: string) {
  return consultations.filter((consultation) => consultation.patientId === patientId);
}

export function getPatientInvoices(patientId: string) {
  return invoices.filter((invoice) => invoice.patientId === patientId);
}

export function getInvoiceTotals(invoice: Invoice) {
  const subtotal = invoice.lineItems.reduce((sum, lineItem) => sum + lineItem.quantity * lineItem.unitPrice, 0);
  const taxableBase = Math.max(subtotal - invoice.discount, 0);
  const tax = taxableBase * invoice.taxRate;
  const total = taxableBase + tax;
  const paid = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);

  return {
    subtotal,
    tax,
    total,
    paid,
    due: Math.max(total - paid, 0),
  };
}
