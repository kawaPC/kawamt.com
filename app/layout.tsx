import { Metadata } from "next";
import { APP_ROOT, SITE_DESCRIPTION, SITE_NAME } from "utils/constants";
import "styles/tailwind.scss";

export const metadata: Metadata = {
  metadataBase: new URL(APP_ROOT),
  title: SITE_NAME,
  keywords: ["ブログ", "写真", "日記"],
  description: SITE_DESCRIPTION,
  icons: {
    icon: ["/favicon.svg", "/favicon.ico"],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", type: "image/png", url: "/android-chrome-192x192.png" },
    ],
  },
  openGraph: {
    images: [{ url: "/og_image.png" }],
    description: SITE_DESCRIPTION,
    url: APP_ROOT,
  },
  twitter: {
    card: "summary_large_image",
  },
  manifest: "/manifest.json",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="kawamt.com"
          href="/opensearch.xml"
        />
      </head>
      <body>
      {children}
      </body>
    </html>
  );
}
