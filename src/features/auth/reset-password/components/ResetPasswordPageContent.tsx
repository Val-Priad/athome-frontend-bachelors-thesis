import { useTranslations } from "next-intl";

import AuthPageLayout from "../../shared/components/AuthPageLayout";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPageContent() {
  const t = useTranslations("Auth.ResetPassword");

  return (
    <AuthPageLayout title={t("title")} description={t("description")}>
      <ResetPasswordForm />
    </AuthPageLayout>
  );
}
