import { useAmp } from "next/amp";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  title?: string;
  width?: string;
  height?: string;
};

const CustomImage: React.VFC<Props> = ({ src, alt, title, width, height }) => {
  const isAmp = useAmp();
  return (
    <div className="flex flex-col mt-5 img">
      {isAmp ? (
        <figure
          className={
            width && height
              ? "flex justify-center max-h-96 w-full"
              : "ampImgFixedContainer"
          }
        >
          <amp-img
            className="contain"
            src={src}
            layout={width && height ? "intrinsic" : "fill"}
            alt={alt}
            title={title}
            width={width}
            height={height}
          />
        </figure>
      ) : (
        <figure className="flex justify-center max-h-96">
          <Image
            src={src}
            alt={alt}
            title={title}
            width={width || 500}
            height={height || 384}
            loading="lazy"
            objectFit={"contain"}
          />
        </figure>
      )}
      {title && (
        <figcaption className="text-center text-xs text-gray-600 mt-1">
          {title}
        </figcaption>
      )}
    </div>
  );
};

export { CustomImage };
