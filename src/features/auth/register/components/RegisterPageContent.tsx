import { useTranslations } from "next-intl";

import AuthPageLayout from "../../shared/components/AuthPageLayout";
import RegisterForm from "./RegisterForm";

export default function LogInPageContent() {
  const t = useTranslations("Auth.Register");

  return (
    <AuthPageLayout title={t("title")} description={t("description")}>
      <RegisterForm />
    </AuthPageLayout>
  );
}
