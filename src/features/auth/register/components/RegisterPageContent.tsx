import { useTranslations } from "next-intl";
import RegisterForm from "./RegisterForm";

export default function RegisterPageContent() {
  const t = useTranslations("Auth.Register");

  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-4">
      <section className="border-border bg-card w-full max-w-md rounded-xl border p-6 shadow-lg">
        <div className="mb-5">
          <h1 className="mb-2 text-2xl font-semibold">{t("title")}</h1>
          <p className="text-muted-foreground text-sm">{t("description")}</p>
        </div>

        <RegisterForm />
      </section>
    </main>
  );
}
