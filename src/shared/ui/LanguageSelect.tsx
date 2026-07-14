"use client";

import { FaChevronDown } from "react-icons/fa";

import type { Locale } from "@/i18n/routing";

interface LanguageSelectProps {
  ariaLabel: string;
  value: Locale;
  onChange: (language: Locale) => void;
  variant?: "default" | "overlay";
}

export function LanguageSelect({
  ariaLabel,
  value,
  onChange,
  variant = "default",
}: LanguageSelectProps) {
  const className =
    variant === "overlay"
      ? "relative inline-flex h-11 items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/15 focus-within:ring-2 focus-within:ring-white focus-within:ring-offset-2 focus-within:ring-offset-transparent"
      : "border-border bg-card text-foreground hover:bg-muted focus-within:ring-ring focus-within:ring-offset-background relative inline-flex h-11 items-center rounded-full border transition-colors focus-within:ring-2 focus-within:ring-offset-2";

  return (
    <div className={className}>
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(event) => onChange(event.target.value as Locale)}
        className="xs:pr-10 xs:pl-5 h-full cursor-pointer appearance-none bg-transparent pr-9 pl-3 text-sm font-medium outline-none"
      >
        <option value="en" className="text-black">
          EN
        </option>

        <option value="ua" className="text-black">
          UA
        </option>
      </select>

      <FaChevronDown className="pointer-events-none absolute right-4 size-4" />
    </div>
  );
}
