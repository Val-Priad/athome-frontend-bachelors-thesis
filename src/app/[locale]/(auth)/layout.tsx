import type { ReactNode } from "react";

type AuthLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <section className="border-border bg-card w-full max-w-md rounded-xl border p-6 shadow-lg">
        {children}
      </section>
    </main>
  );
}
