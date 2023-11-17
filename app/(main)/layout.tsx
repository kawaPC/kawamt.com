import { Header } from "components/Header";
import "styles/tailwind.scss";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-3 md:px-5 pt-5 pb-14 max-w-4xl">
      <Header />
      <main>{children}</main>
    </div>
  );
}
