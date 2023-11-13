import { Photo } from "components/Photo";
import dayjs from "dayjs";
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

  console.log({ images });

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
  const {
    width,
    height,
    base64,
    Make,
    Model,
    LensModel,
    FNumber,
    ISO,
    DateTimeOriginal,
    ExposureTime,
  } = imageSizes[name];
  const shutterSpeed = ExposureTime ? `1/${Math.round(1 / ExposureTime)}` : "";
  const camera = [Make, Model].filter((v) => v).join(" ");
  const F = FNumber ? `F${FNumber}` : "";
  const ISOText = ISO ? `ISO${ISO}` : "";
  const datetime = dayjs(DateTimeOriginal).format("YYYY-MM-DD HH:mm");
  const exifText = [camera, LensModel, shutterSpeed, F, ISOText]
    .filter((v) => v)
    .join(", ");

  const src = `${process.env.NEXT_PUBLIC_IMG_DOMAIN}/${name}`;

  return (
    <Photo
      src={src}
      name={name}
      width={width}
      height={height}
      placeholder={`data:image/svg+xml;base64,${base64}`}
      datetime={datetime}
      exifText={exifText}
    />
  );
}

export const dynamicParams = false;
