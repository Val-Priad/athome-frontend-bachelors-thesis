import { useTranslations } from "next-intl";

import AuthPageLayout from "../../shared/components/AuthPageLayout";
import LogInForm from "./LogInForm";

export default function LogInPageContent() {
  const t = useTranslations("Auth.LogIn");

  return (
    <AuthPageLayout title={t("title")} description={t("description")}>
      <LogInForm />
    </AuthPageLayout>
  );
}
