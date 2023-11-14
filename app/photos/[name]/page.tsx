import { Photo } from "components/Photo";
import { Metadata } from "next";
import imageSizes from "static/imageSizes.json";
import { createMetadata } from "utils/metadata";

type Params = {
  params: {
    name: string;
  };
};

export async function generateStaticParams() {
  const images = Object.entries(imageSizes);

  return images.map((image) => ({ name: image[0] }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { name } = params;

  const title = name;
  const description = `画像: ${name}`;

  const ogImage = `${
    process.env.NEXT_PUBLIC_IMG_PRIMITIVE_DOMAIN
  }/${name.replace(/\.(?:jpeg|jpg|png|gif)/i, ".jpg")}`;

  return createMetadata({
    path: `/photos/${name}`,
    title,
    description,
    ogImage,
  });
}

export default function Page({ params }: Params) {
  const { name } = params;

  return <Photo filename={name} />;
}

export const dynamicParams = false;
