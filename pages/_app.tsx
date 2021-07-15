import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <header className="py-4">header</header>
      <main className="max-w-4xl mx-auto p-5">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
export default MyApp;
