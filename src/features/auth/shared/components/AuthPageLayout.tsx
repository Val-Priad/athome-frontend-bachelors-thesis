import type { ReactNode } from "react";

type AuthPageLayoutProps = Readonly<{
  title: string;
  description: string;
  children: ReactNode;
}>;

export default function AuthPageLayout({
  title,
  description,
  children,
}: AuthPageLayoutProps) {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <section className="border-border bg-card w-full max-w-md rounded-xl border p-6 shadow-lg">
        <div className="mb-5">
          <h1 className="mb-2 text-2xl font-semibold">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        {children}
      </section>
    </main>
  );
}
