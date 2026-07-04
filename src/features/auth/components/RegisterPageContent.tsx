import RegisterForm from "./RegisterForm";
export default function RegisterPageContent() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <section className="border-border bg-card w-full max-w-md rounded-xl border p-6 shadow-lg">
        <div className="mb-5">
          <h1 className="mb-2 text-2xl font-semibold">Register</h1>
          <p className="text-muted-foreground text-sm">
            Sign up to continue to AtHome.
          </p>
        </div>
        <RegisterForm />
      </section>
    </main>
  );
}
