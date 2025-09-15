import BackgroundComponent from "@/components/BackgroundComponent";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body>
        <BackgroundComponent />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
