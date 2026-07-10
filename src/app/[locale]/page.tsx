"use client";
import { useAuth } from "@/features/auth/model/AuthProvider";
import { Logo } from "@/shared/ui/Logo";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <p>{t("title")}</p>

      {isAuthenticated && (
        <>
          <p>{user?.email}</p>
          <p>{user?.role}</p>
        </>
      )}

      <Logo />
    </>
  );
}
