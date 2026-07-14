"use client";

import { useTranslations } from "next-intl";

import { Header } from "@/shared/ui/Header";

import { HomeHeroBackground } from "./HomeHeroBackground";
import { HomeHeroContent } from "./HomeHeroContent";

export default function HomePageContent() {
  const t = useTranslations("HomePage");

  return (
    <main className="relative min-h-svh overflow-hidden bg-neutral-900 text-white">
      <HomeHeroBackground alt={t("heroImageAlt")} />
      <Header
        className="absolute inset-x-0 top-0 z-20 px-4 pt-5 sm:pr-8"
        variant="overlay"
      />
      <HomeHeroContent />
    </main>
  );
}
