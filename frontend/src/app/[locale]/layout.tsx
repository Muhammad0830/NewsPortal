import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "next-themes";
import Providers from "@/context/QueryClientContext";
import { AuthProvider } from "@/context/authContext";
import { Toaster } from "@/components/ui/sonner";
type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body>
        <AuthProvider>
          <NextIntlClientProvider>
            <Providers>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                disableTransitionOnChange
              >
                <div className="min-h-screen w-full">
                  {children}
                  <Toaster />
                </div>
              </ThemeProvider>
            </Providers>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
