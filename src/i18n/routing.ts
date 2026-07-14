import { defineRouting } from "next-intl/routing";

export const locales = ["en", "ua"] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "ua",
  localePrefix: "as-needed",
});
