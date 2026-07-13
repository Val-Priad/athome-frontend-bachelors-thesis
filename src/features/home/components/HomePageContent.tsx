"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

import { useSession } from "@/features/auth/session/model/SessionProvider";
import { useRouter } from "@/i18n/navigation";
import { Logo } from "@/shared/ui/Logo";

export default function HomePageContent() {
  const t = useTranslations("HomePage");
  const { user, isAuthenticated, logout } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
      toast.error(t("logoutFailed"));
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      <p>{t("title")}</p>

      {isAuthenticated && (
        <>
          <p>{user?.email}</p>
          <p>{user?.role}</p>
          <button
            type="button"
            className="primary-btn mt-4 px-4 py-2"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? t("loggingOut") : t("logout")}
          </button>
        </>
      )}

      <Logo />
    </>
  );
}
