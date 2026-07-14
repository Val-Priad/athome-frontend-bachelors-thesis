import { useTranslations } from "next-intl";

import ResetPasswordForm from "./components/ResetPasswordForm";

export default function ResetPasswordPage() {
  const t = useTranslations("Auth.ResetPassword");

  return (
    <>
      <div className="mb-5">
        <h1 className="mb-2 text-2xl font-semibold">{t("title")}</h1>
        <p className="text-muted-foreground text-sm">{t("description")}</p>
      </div>

      <ResetPasswordForm />
    </>
  );
}
