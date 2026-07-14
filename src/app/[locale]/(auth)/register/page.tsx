import { useTranslations } from "next-intl";

import RegisterForm from "./components/RegisterForm";

export default function RegisterPage() {
  const t = useTranslations("Auth.Register");

  return (
    <>
      <div className="mb-5">
        <h1 className="mb-2 text-2xl font-semibold">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <RegisterForm />
    </>
  );
}
