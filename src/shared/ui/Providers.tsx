import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
