import { MAX_IMAGE_HEIGHT } from "utils/constants";
import { imageRatio } from "utils/math";

function calcMaxWidthStyle(width: string, height: string) {
  const nWidth = Number(width);
  const nHeight = Number(height);

  return nHeight < MAX_IMAGE_HEIGHT
    ? undefined
    : {
        maxWidth: imageRatio(nWidth, nHeight, MAX_IMAGE_HEIGHT, "height").width,
      };
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
      <amp-img
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        layout="responsive"
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
