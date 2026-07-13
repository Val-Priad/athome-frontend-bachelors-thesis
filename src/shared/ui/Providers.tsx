import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";

import type { CurrentUser } from "@/entities/user/schema";
import { SessionProvider } from "@/features/auth/session/model/SessionProvider";

type ProvidersProps = Readonly<{
  children: React.ReactNode;
  initialUser: CurrentUser | null;
}>;

export default function Providers({ children, initialUser }: ProvidersProps) {
  return (
    <NextIntlClientProvider>
      <SessionProvider initialUser={initialUser}>
        {children}
        <Toaster position="top-center" reverseOrder={false} />
      </SessionProvider>
    </NextIntlClientProvider>
  );
}
