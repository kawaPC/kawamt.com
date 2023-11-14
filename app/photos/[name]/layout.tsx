import "./layout.scss";
import { Header } from "components/Header";

export default function PhotoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen max-w-5xl flex flex-col py-5 sm:px-5 gap-y-3 md:gap-y-5 mx-auto">
      <div className="w-full max-w-4xl mx-auto px-3 md:px-5">
        <Header />
      </div>

      <div className="flex-1 relative flex justify-center">{children}</div>
    </div>
  );
}
