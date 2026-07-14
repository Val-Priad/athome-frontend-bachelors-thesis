"use client";

import { useLocale, useTranslations } from "next-intl";

import { useSession } from "@/auth/SessionProvider";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

import { LanguageSelect } from "./LanguageSelect";
import { Logo } from "./Logo";

export function HomeHeader() {
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
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-5 sm:pr-8">
      <Link href="/" aria-label={t("home")} className="block px-4">
        <Logo className="xs:h-20 h-15 w-auto sm:h-23 2xl:h-35" />
      </Link>

      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <Link
            href="/estates"
            className="flex h-11 items-center rounded-md border border-white/20 bg-black/80 px-4 text-sm font-medium text-white backdrop-blur transition hover:bg-black"
          >
            {t("browseEstates")}
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className="primary-btn xs:px-6 flex h-11 items-center px-4"
            >
              {t("login")}
            </Link>

            <LanguageSelect
              ariaLabel={t("selectLanguage")}
              value={locale}
              onChange={handleLanguageChange}
              variant="overlay"
            />
          </>
        )}
      </div>
    </header>
  );
}
