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
    title: 'Today at a glance',
    subtitle: 'The shell is ready for scheduling, patient, and billing modules.',
  },
  admin: {
    title: 'Internal admin area',
    subtitle: 'Admin routes stay inside the same deployable app.',
  },
  states: {
    loading: 'Loading...',
    empty: 'No data yet in this section.',
    error: 'Something went wrong. Please try again.',
  },
};

export default en;
