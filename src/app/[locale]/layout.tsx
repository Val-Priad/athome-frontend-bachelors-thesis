import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { getCurrentUserOnServer } from "@/auth/server";
import Providers from "@/shared/ui/Providers";

import "../styles/global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AtHome",
  description: "Real estate app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const [{ locale }, initialUser] = await Promise.all([
    params,
    getCurrentUserOnServer(),
  ]);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-background text-foreground min-h-svh">
        <Providers initialUser={initialUser}>{children}</Providers>
      </body>
    </html>
  );
}
