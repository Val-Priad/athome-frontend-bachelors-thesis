"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { useSession } from "@/features/auth/session/model/SessionProvider";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

import { LanguageSelect } from "./LanguageSelect";
import { Logo } from "./Logo";

type Language = "en" | "ua";

export type HeaderProps = Omit<
  ComponentPropsWithoutRef<"header">,
  "children"
> & {
  actions?: ReactNode;
  actionsClassName?: string;
  variant?: "default" | "overlay";
};

export function Header({
  actions,
  actionsClassName,
  className,
  variant = "default",
  ...props
}: HeaderProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");
  const { isAuthenticated } = useSession();

  function handleLanguageChange(language: Language) {
    router.replace(pathname, { locale: language });
  }

  const browseButtonClassName =
    variant === "overlay"
      ? "rounded-md border border-white/20 bg-black/80 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-black"
      : "border-border bg-card text-foreground hover:bg-muted rounded-md border px-4 py-2 text-sm font-medium transition";

  const defaultActions = isAuthenticated ? (
    <button
      type="button"
      className={browseButtonClassName}
      onClick={() => router.push("/estates")}
    >
      {t("browseEstates")}
    </button>
  ) : (
    <>
      <button
        type="button"
        className="primary-btn xs:px-6 px-4 py-2"
        onClick={() => router.push("/login")}
      >
        {t("login")}
      </button>
      <LanguageSelect
        value={locale as Language}
        onChange={handleLanguageChange}
        ariaLabel={t("selectLanguage")}
        variant={variant}
      />
    </>
  );

  return (
    <header
      className={["flex items-center justify-between", className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <Link href="/" aria-label={t("home")} className="block px-4">
        <Logo className="xs:h-20 h-15 w-auto sm:h-23 2xl:h-35" />
      </Link>

      <div className={actionsClassName ?? "flex items-center gap-2"}>
        {actions === undefined ? defaultActions : actions}
      </div>
    </header>
  );
}
