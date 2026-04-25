import type { MessageCatalog } from '@petabase/types/i18n';

const en: MessageCatalog = {
  common: {
    appName: 'Petabase',
    welcome: 'Welcome to your clinic workspace',
  },
  nav: {
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    consultations: 'Consultations',
    billing: 'Billing',
    admin: 'Admin',
    signIn: 'Sign in',
    signOut: 'Sign out',
  },
  auth: {
    title: 'Sign in to Petabase',
    subtitle: 'Access your staff workspace',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    submit: 'Sign in',
  },
  dashboard: {
    title: 'Clinic operations overview',
    subtitle: 'Track today\'s appointments, patient care flow, billing, and branch readiness in one prototype workspace.',
  },
  admin: {
    title: 'Organization and access management',
    subtitle: 'Configure organization profile, branches, staff invites, and role-scoped access.',
  },
  states: {
    loading: 'Loading...',
    empty: 'No data yet in this section.',
    error: 'Something went wrong. Please try again.',
  },
};

export default en;
