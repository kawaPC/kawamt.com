import Image from "next/image";
import { MAX_IMAGE_HEIGHT } from "utils/constants";
import { imageRatio } from "utils/math";

function calcMaxWidthStyle(width: string, height: string) {
  const nWidth = Number(width);
  const nHeight = Number(height);

  const maxWidth =
    nHeight < MAX_IMAGE_HEIGHT
      ? width
      : Math.round(
          imageRatio(nWidth, nHeight, MAX_IMAGE_HEIGHT, "height").width
        );

  return { maxWidth };
}

type Props = {
  src: string;
  alt?: string;
  title?: string;
  width: string;
  height: string;
};

const CustomImage: React.VFC<Props> = ({ src, alt, title, width, height }) => {
  return (
    <figure
      className="mx-auto mt-5 pb-5"
      style={calcMaxWidthStyle(width, height)}
    >
      <Image
        className="picture"
        src={src}
        width={width}
        height={height}
        alt={alt}
        title={title}
      />
      {title && (
        <figcaption className="text-center text-xs text-gray-600 mt-2">
          {title}
        </figcaption>
      )}
    </figure>
  );
};

export { CustomImage };
