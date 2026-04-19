import type { MessageCatalog } from '@petabase/types/i18n';

const en: MessageCatalog = {
  common: {
    appName: 'Petabase',
    welcome: 'Welcome to your clinic workspace',
  },
  nav: {
    dashboard: 'Dashboard',
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
    title: 'Phase 1 operations overview',
    subtitle: 'Track access control, branch setup, and staff readiness before API integration.',
  },
  admin: {
    title: 'Clinic setup and access management',
    subtitle: 'Configure organization profile, branches, and role-scoped staff access.',
  },
  states: {
    loading: 'Loading...',
    empty: 'No data yet in this section.',
    error: 'Something went wrong. Please try again.',
  },
};

export default en;
