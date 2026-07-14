import { useTranslations } from "next-intl";

import LogInForm from "./components/LogInForm";

export default function LoginPage() {
  const t = useTranslations("Auth.LogIn");

  return (
    <>
      <div className="mb-5">
        <h1 className="mb-2 text-2xl font-semibold">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <LogInForm />
    </>
  );
}
