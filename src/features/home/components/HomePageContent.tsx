"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

import { useSession } from "@/features/auth/session/model/SessionProvider";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Logo } from "@/shared/ui/Logo";

import { LanguageSelect } from "./LanguageSelect";

export default function HomePageContent() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("HomePage");
  const { user, isAuthenticated, logout } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  function handleLanguageChange(language: "en" | "ua") {
    router.replace(pathname, {
      locale: language,
    });
  }

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
    <main className="relative min-h-svh overflow-hidden bg-neutral-900 text-white">
      <Image
        src="/images/home-hero-dark.webp"
        alt={t("heroImageAlt")}
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/70" />

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-5">
        <div className="px-4">
          <Logo className="h-15 w-auto 2xl:h-35" />
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              type="button"
              className="rounded-md border border-white/20 bg-black/80 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-black"
              onClick={() => router.push("/estates")}
            >
              {t("browseEstates")}
            </button>
          ) : (
            <>
              <button
                type="button"
                className="primary-btn px-6 py-2"
                onClick={() => router.push("/login")}
              >
                {t("login")}
              </button>
              <LanguageSelect
                value={locale as "en" | "ua"}
                onChange={handleLanguageChange}
              />
            </>
          )}
        </div>
      </header>

      <div className="relative z-10 flex min-h-svh items-end">
        <div className="flex w-full flex-col gap-5 p-5 pt-28 2xl:p-15">
          <section className="max-w-3xl">
            <p className="2xl:text-md mb-4 text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
              {t("eyebrow")}
            </p>

            <h1 className="max-w-2xl text-2xl leading-tight font-light tracking-tight 2xl:text-3xl">
              {t("title")}
            </h1>

            <p className="mt-5 max-w-xl leading-6 font-light text-white/85 2xl:text-xl">
              {t("description")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20 2xl:px-6"
                onClick={() => router.push("/estates/create")}
              >
                {t("createListing")}
              </button>
              <button
                type="button"
                className="bg-primary text-primary-foreground hover:bg-primary-muted rounded-md px-3 py-2 text-sm font-medium transition 2xl:px-6"
                onClick={() => router.push("/estates")}
              >
                {t("browseEstates")}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
