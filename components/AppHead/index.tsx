import Head from "next/head";
import { APP_ROOT, SITE_DESCRIPTION, SITE_NAME } from "utils/constants";

type Props = {
  title?: string;
  description?: string;
  path?: string;
  rssPath?: string;
  ogImage?: string;
};

const AppHead: React.FC<Props> = ({
  title,
  description,
  path,
  ogImage,
  rssPath,
}) => {
  const url = path ? `${APP_ROOT}${path}` : "";
  const ogImageUrl = ogImage
    ? `${process.env.NEXT_PUBLIC_IMG_PRIMITIVE_DOMAIN}/${ogImage}.jpg`
    : `${APP_ROOT}/og_image.png`;

  return (
    <Head>
      <title>{title || SITE_NAME}</title>
      <meta name="description" content={description || SITE_DESCRIPTION} />
      {url && <link rel="canonical" href={url} />}
      <link
        rel="alternate"
        type="application/rss+xml"
        href={rssPath ? `${rssPath}/rss.xml` : "/rss.xml"}
      />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title ?? SITE_NAME} />
      <meta
        property="og:description"
        content={description ?? SITE_DESCRIPTION}
      />
      <meta property="og:url" content={url || APP_ROOT} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:image" content={ogImageUrl} />
    </Head>
  );
};

export { AppHead };
