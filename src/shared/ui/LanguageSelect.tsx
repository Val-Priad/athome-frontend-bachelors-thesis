"use client";

import { FaChevronDown } from "react-icons/fa";

type Language = "en" | "ua";

interface LanguageSelectProps {
  ariaLabel: string;
  value: Language;
  onChange: (language: Language) => void;
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
      ? "relative inline-flex py-3 items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/15"
      : "border-border bg-card text-foreground hover:bg-muted relative inline-flex h-12 items-center rounded-full border transition-colors";

  return (
    <div className={className}>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as Language)}
        aria-label={ariaLabel}
        className="xs:pr-10 xs:pl-5 cursor-pointer appearance-none bg-transparent pr-9 pl-3 text-sm font-medium outline-none"
      >
        <option value="en" className="text-black">
          EN
        </option>

        <option value="ua" className="text-black">
          UA
        </option>
      </select>

      <FaChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 size-4"
      />
    </div>
  );
}
