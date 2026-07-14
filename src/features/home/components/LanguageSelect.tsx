"use client";

import { FaChevronDown } from "react-icons/fa";

type Language = "en" | "ua";

interface LanguageSelectProps {
  value: Language;
  onChange: (language: Language) => void;
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <div className="relative inline-flex h-12 items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/15">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as Language)}
        aria-label="Select language"
        className="h-full cursor-pointer appearance-none bg-transparent pr-10 pl-5 text-sm font-medium outline-none"
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
