export type MessageCatalog = {
  common: {
    appName: string;
    welcome: string;
  };
  nav: {
    dashboard: string;
    admin: string;
    signIn: string;
    signOut: string;
  };
  auth: {
    title: string;
    subtitle: string;
    emailLabel: string;
    passwordLabel: string;
    submit: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
  };
  admin: {
    title: string;
    subtitle: string;
  };
  states: {
    loading: string;
    empty: string;
    error: string;
  };
};
