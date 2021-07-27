import Head from "next/head";
import { APP_ROOT, SITE_NAME } from "types/constants";

type Props = {
  title?: string;
  description?: string;
  url?: string;
  ogImage?: string;
};

const AppHead: React.FC<Props> = ({ title, description, url, ogImage }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title ?? SITE_NAME} />
      <meta property="og:description" content={description ?? ""} />
      <meta property="og:url" content={url || APP_ROOT} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="og:image"
        content={ogImage || `${APP_ROOT}/og_image.png`}
      />
    </Head>
  );
};

export { AppHead };
