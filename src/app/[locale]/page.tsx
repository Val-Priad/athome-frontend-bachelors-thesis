"use client";
import { useSession } from "@/features/auth/session/model/SessionProvider";
import { Logo } from "@/shared/ui/Logo";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  const { user, isAuthenticated } = useSession();

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
