import Image from "next/image";
import { MAX_IMAGE_HEIGHT } from "utils/constants";
import styles from "./index.module.scss";
import Link from "next/link";

function calcMaxWidthStyle(width: string, height: string) {
  const nWidth = Number(width);
  const nHeight = Number(height);

  const maxWidth =
    nHeight < MAX_IMAGE_HEIGHT
      ? undefined
      : Math.round((MAX_IMAGE_HEIGHT * nWidth) / nHeight);

  return { maxWidth };
}

type Props = {
  src: string;
  filename: string;
  alt?: string;
  title?: string;
  width: string;
  height: string;
  placeholder?: string;
};

const CustomImage: React.FC<Props> = ({
  src,
  filename,
  alt,
  title,
  width,
  height,
  placeholder,
}) => {
  return (
    <figure
      className="mx-auto mt-5 pb-5"
      style={calcMaxWidthStyle(width, height)}
    >
      <Link href={`/photos/${filename}`}>
        <Image
          className={styles.picture}
          src={src}
          width={Number(width)}
          height={Number(height)}
          alt={alt || ""}
          title={title}
          placeholder={`data:image/svg+xml;base64,${placeholder}`}
        />
      </Link>
      {title && (
        <figcaption className="text-center text-xs text-gray-600 mt-2">
          {title}
        </figcaption>
      )}
    </figure>
  );
};

export { CustomImage };
