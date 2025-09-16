import BackgroundComponent from "@/components/BackgroundComponent";
import NavBar from "@/components/NavBar";

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
        <NavBar />
        <div className="relative">{children}</div>
        <div></div>
      </body>
    </html>
  );
}
