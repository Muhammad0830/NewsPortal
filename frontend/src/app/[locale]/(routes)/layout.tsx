import BackgroundComponent from "@/components/BackgroundComponent";
import NavBar from "@/components/NavBar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RoutesLayout({ children }: Props) {
  return (
    <div>
      <BackgroundComponent />
      <NavBar />
      <div className="relative">{children}</div>
      <div></div>
    </div>
  );
}
