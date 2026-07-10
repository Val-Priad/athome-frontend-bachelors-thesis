import { AuthProvider } from "@/features/auth/model/AuthProvider";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextIntlClientProvider>
      <AuthProvider>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </NextIntlClientProvider>
  );
}
