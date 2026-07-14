"use client";

import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";

export function HomeHeroContent() {
  const router = useRouter();
  const t = useTranslations("HomePage");

  return (
    <div className="relative z-10 flex min-h-svh items-end">
      <div className="xs:pb-10 flex w-full flex-col gap-5 p-5 pt-28 sm:p-10 sm:pb-15 2xl:p-15 2xl:pb-20">
        <section className="max-w-3xl">
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
            <button
              type="button"
              className="xs:px-5 rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20 sm:px-6 2xl:px-6"
              onClick={() => router.push("/estates/create")}
            >
              {t("createListing")}
            </button>
            <button
              type="button"
              className="bg-primary text-primary-foreground hover:bg-primary-muted xs:px-6 rounded-md px-3 py-2 text-sm font-medium transition 2xl:px-6"
              onClick={() => router.push("/estates")}
            >
              {t("browseEstates")}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
