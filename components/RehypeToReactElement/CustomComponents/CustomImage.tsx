import { useAmp } from "next/amp";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  title?: string;
};

const CustomImage: React.VFC<Props> = (props) => {
  const isAmp = useAmp();
  return (
    <div className="flex justify-center flex-col mb-5">
      {isAmp ? (
        <figure className="amp-img-fixed-container">
          <amp-img
            className="contain"
            src={props.src}
            layout="fill"
            alt={props.alt}
            title={props.title}
          />
        </figure>
      ) : (
        <figure className="flex justify-center">
          <Image
            src={props.src}
            alt={props.alt}
            title={props.title}
            width="500"
            height="350"
            loading="lazy"
            objectFit={"contain"}
          />
        </figure>
      )}
      {props.title && (
        <figcaption className="text-center text-xs text-gray-600 mt-1">
          {props.title}
        </figcaption>
      )}
    </div>
  );
};

export { CustomImage };
