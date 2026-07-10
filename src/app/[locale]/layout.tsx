import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../css/global.css";
import Providers from "@/shared/ui/Providers";

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
  const { locale } = await params;
  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
