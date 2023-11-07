import { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "./constants";

type Props = {
  path: string;
  title?: string;
  description?: string;
  rssPath?: string;
  ogImage?: string;
};

export const createMetadata = ({
  path,
  title,
  description,
  ogImage,
  rssPath,
}: Props): Metadata => {
  const url = path;
  const alternates: Metadata["alternates"] = {
    canonical: url,
    types: {
      "application/rss+xml": rssPath ? `${rssPath}/rss.xml` : "/rss.xml",
    },
  };
  const ogImageUrl = ogImage
    ? `${process.env.NEXT_PUBLIC_IMG_PRIMITIVE_DOMAIN}/${ogImage}.jpg`
    : "/og_image.png";

  const openGraph: Metadata["openGraph"] = {
    images: [{ url: ogImageUrl }],
    siteName: SITE_NAME,
    description: description || SITE_DESCRIPTION,
    url,
  };
  return {
    title,
    description,
    alternates,
    openGraph,
  };
};
