import { SessionProvider } from "@/features/auth/session/model/SessionProvider";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextIntlClientProvider>
      <SessionProvider>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
