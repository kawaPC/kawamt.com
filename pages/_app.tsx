import { Header } from "components/Header";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto p-3 md:pt-8 md:pb-14 md:px-5 max-w-4xl">
      <Header />

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
export default MyApp;
