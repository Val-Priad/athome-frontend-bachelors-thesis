"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

import { useSession } from "@/features/auth/session/model/SessionProvider";
import { useRouter } from "@/i18n/navigation";
import { Logo } from "@/shared/ui/Logo";

export default function HomePageContent() {
  const t = useTranslations("HomePage");
  const { user, isAuthenticated, logout } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
      toast.error(t("logoutFailed"));
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <main className="relative min-h-svh overflow-hidden bg-neutral-900 text-white">
      <Image
        src="/images/home-hero-dark.webp"
        alt={t("heroImageAlt")}
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/70" />

      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-4 pt-5">
        <div className="px-4">
          <Logo className="h-15 w-auto" />
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              type="button"
              className="rounded-md border border-white/20 bg-black/80 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-black"
              onClick={() => router.push("/estates")}
            >
              {t("browseEstates")}
            </button>
          ) : (
            <>
              <button
                type="button"
                className="primary-btn px-6 py-2"
                onClick={() => router.push("/login")}
              >
                {t("login")}
              </button>
            </>
          )}
        </div>
      </header>

      <div className="relative z-10 flex min-h-svh items-end">
        <div className="flex w-full flex-col gap-5 p-5 pt-28">
          <section className="max-w-3xl">
            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-white/80 uppercase">
              {t("eyebrow")}
            </p>

            <h1 className="max-w-2xl text-2xl leading-tight font-light tracking-tight">
              {t("title")}
            </h1>

            <p className="mt-5 max-w-xl leading-6 font-light text-white/85">
              {t("description")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-md border border-white/40 bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20"
                onClick={() => router.push("/estates/create")}
              >
                {t("createListing")}
              </button>
              <button
                type="button"
                className="bg-primary text-primary-foreground hover:bg-primary-muted rounded-md px-3 py-2 text-sm font-medium transition"
                onClick={() => router.push("/estates")}
              >
                {t("browseEstates")}
              </button>
            </div>
          </section>

          <aside className="w-full shrink-0">
            {isAuthenticated && (
              <section className="mb-4 rounded-lg border border-white/15 bg-black/55 p-5 backdrop-blur-md">
                <p className="text-xs font-medium tracking-wider text-white/55 uppercase">
                  {t("signedInAs")}
                </p>

                <p className="mt-2 truncate font-medium">{user?.email}</p>

                <p className="mt-1 text-sm text-white/60 capitalize">
                  {user?.role}
                </p>

                <button
                  type="button"
                  className="mt-5 text-sm font-medium underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? t("loggingOut") : t("logout")}
                </button>
              </section>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
