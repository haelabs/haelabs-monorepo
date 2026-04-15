export type CommonMessages = {
  appName: string;
  welcome: string;
};

export type NavMessages = {
  dashboard: string;
  admin: string;
  signIn: string;
  signOut: string;
};

export type AuthMessages = {
  title: string;
  subtitle: string;
  emailLabel: string;
  passwordLabel: string;
  submit: string;
};

export type DashboardMessages = {
  title: string;
  subtitle: string;
};

export type AdminMessages = {
  title: string;
  subtitle: string;
};

export type StateMessages = {
  loading: string;
  empty: string;
  error: string;
};

export type MessageCatalog = {
  common: CommonMessages;
  nav: NavMessages;
  auth: AuthMessages;
  dashboard: DashboardMessages;
  admin: AdminMessages;
  states: StateMessages;
};
