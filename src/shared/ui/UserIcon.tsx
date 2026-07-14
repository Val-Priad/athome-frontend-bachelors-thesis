"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

import { useSession } from "@/auth/SessionProvider";
import { Link, useRouter } from "@/i18n/navigation";

export default function UserIcon() {
  const router = useRouter();
  const t = useTranslations("Header");
  const { logout } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      router.replace("/");
      router.refresh();
    } catch {
      toast.error(t("logoutError"));
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="group relative">
      <button
        type="button"
        aria-label={t("userMenu")}
        aria-haspopup="true"
        className="block cursor-pointer rounded-full text-white/75 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="256"
          height="256"
          viewBox="0 0 256 256"
          aria-hidden="true"
          className="size-11"
        >
          <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
            <path
              d="M 45 0 C 20.147 0 0 20.147 0 45 c 0 24.853 20.147 45 45 45 s 45 -20.147 45 -45 C 90 20.147 69.853 0 45 0 z M 45 22.007 c 8.899 0 16.14 7.241 16.14 16.14 c 0 8.9 -7.241 16.14 -16.14 16.14 c -8.9 0 -16.14 -7.24 -16.14 -16.14 C 28.86 29.248 36.1 22.007 45 22.007 z M 45 83.843 c -11.135 0 -21.123 -4.885 -27.957 -12.623 c 3.177 -5.75 8.144 -10.476 14.05 -13.341 c 2.009 -0.974 4.354 -0.958 6.435 0.041 c 2.343 1.126 4.857 1.696 7.473 1.696 c 2.615 0 5.13 -0.571 7.473 -1.696 c 2.083 -1 4.428 -1.015 6.435 -0.041 c 5.906 2.864 10.872 7.591 14.049 13.341 C 66.123 78.957 56.135 83.843 45 83.843 z"
              fill="currentColor"
            />
          </g>
        </svg>
      </button>

      <div className="pointer-events-none invisible absolute top-full right-0 z-30 min-w-40 pt-1 opacity-0 transition group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100">
        <div className="overflow-hidden rounded-md border border-white/20 bg-black/90 py-1 text-sm text-white shadow-lg backdrop-blur">
          <Link
            href="/me"
            className="block px-4 py-2.5 transition hover:bg-white/15 focus-visible:bg-white/15 focus-visible:outline-none"
          >
            {t("me")}
          </Link>
          <button
            type="button"
            disabled={isLoggingOut}
            onClick={handleLogout}
            className="block w-full cursor-pointer px-4 py-2.5 text-left transition hover:bg-white/15 focus-visible:bg-white/15 focus-visible:outline-none disabled:cursor-wait disabled:opacity-60"
          >
            {isLoggingOut ? t("loggingOut") : t("logout")}
          </button>
        </div>
      </div>
    </div>
  );
}
