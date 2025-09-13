import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import NavBar from "@/components/NavBar";

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
    <html lang={locale}>
      <head />
      <body>
        <NextIntlClientProvider>
          <div className="relative">
            <NavBar />
            <div className="lg:px-[60px] md:px-[40px] sm:px-[30px] px-[20px]">
              {children}
            </div>
            <div></div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
