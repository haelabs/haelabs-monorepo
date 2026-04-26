type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main
      className="grid min-h-screen place-content-center px-3 py-7 sm:px-5 sm:py-8"
      style={{
        background:
          'radial-gradient(circle at 0% 0%, rgb(249 107 238 / 7%) 0, transparent 28%), radial-gradient(circle at 100% 100%, rgb(83 58 253 / 7%) 0, transparent 33%), linear-gradient(160deg, rgb(246 249 252 / 78%) 0%, rgb(255 255 255 / 100%) 74%)',
      }}
    >
      {children}
    </main>
  );
}
