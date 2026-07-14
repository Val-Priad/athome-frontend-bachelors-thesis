import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export function HomeHeroContent() {
  const t = useTranslations("HomePage");

  return (
    <section className="xs:pb-10 relative z-10 w-full px-5 pt-33 pb-5 sm:px-10 sm:pb-15 2xl:px-15 2xl:pb-20">
      <div className="max-w-3xl">
        <p className="mb-4 text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
          {t("eyebrow")}
        </p>

        <h1 className="max-w-2xl text-2xl leading-tight font-light tracking-tight 2xl:text-3xl">
          {t("title")}
        </h1>

        <p className="mt-5 max-w-xl leading-6 font-light text-white/85 2xl:text-xl">
          {t("description")}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/estates/create"
            className="xs:px-5 rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20 sm:px-6 2xl:px-6"
          >
            {t("createListing")}
          </Link>
          <Link
            href="/estates"
            className="bg-primary text-primary-foreground hover:bg-primary-muted xs:px-6 rounded-md px-3 py-2 text-sm font-medium transition 2xl:px-6"
          >
            {t("browseEstates")}
          </Link>
        </div>
      </div>
    </section>
  );
}
