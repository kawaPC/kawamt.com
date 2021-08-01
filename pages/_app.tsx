import { Header } from "components/Header";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container mx-auto px-3 md:px-5 pt-8 pb-14 max-w-4xl">
      <Header />

      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
export default MyApp;
