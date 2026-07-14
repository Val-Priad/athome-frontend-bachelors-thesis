"use client";

import { useLocale, useTranslations } from "next-intl";

import { useSession } from "@/auth/SessionProvider";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

import { LanguageSelect } from "./LanguageSelect";
import { Logo } from "./Logo";

export function AppHeader() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");

  const { isAuthenticated } = useSession();

  function handleLanguageChange(language: Locale) {
    router.replace(pathname, {
      locale: language,
    });
  }

  return (
    <header className="border-border bg-background sticky top-0 z-40 border-b">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={t("home")}
          className="focus-visible:ring-ring rounded-md outline-none focus-visible:ring-2"
        >
          <Logo className="h-14 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Link
              href="/estates"
              className="secondary-btn flex h-11 items-center px-4"
            >
              {t("browseEstates")}
            </Link>
          ) : (
            <Link
              href="/login"
              className="primary-btn flex h-11 items-center px-4 sm:px-6"
            >
              {t("login")}
            </Link>
          )}

          <LanguageSelect
            ariaLabel={t("selectLanguage")}
            value={locale}
            onChange={handleLanguageChange}
          />
        </div>
      </div>
    </header>
  );
}
