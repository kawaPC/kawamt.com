import Image from "next/image";
import { PhotoFrame } from "./_comoponents/PhotoFrame";
import imageSizes from "static/imageSizes.json";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import { ExifText } from "./_comoponents/ExifText";

type Props = {
  filename: string;
};

export const Photo: React.FC<Props> = ({ filename }) => {
  const { base64, width, height, ...exif } = imageSizes[filename];

  const src = `${process.env.NEXT_PUBLIC_IMG_DOMAIN}/${filename}`;
  const placeholder: PlaceholderValue = base64
    ? `data:image/svg+xml;base64,${base64}`
    : "blur";

  return (
    <PhotoFrame
      imageWidth={width}
      imageHeight={height}
      exifTextElement={<ExifText {...exif} />}
    >
      <Image src={src} fill alt={filename} placeholder={placeholder} />
    </PhotoFrame>
  );
};
