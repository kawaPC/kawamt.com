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
    <figure className="w-full flex justify-center flex-col mb-5">
      {isAmp ? (
        <amp-img
          className="object-contain"
          src={props.src}
          width="500"
          height="350"
          layout="fill"
          alt={props.alt}
          title={props.title}
        />
      ) : (
        <Image
          src={props.src}
          alt={props.alt}
          title={props.title}
          width="500"
          height="350"
          loading="lazy"
          objectFit={"contain"}
        />
      )}
      {props.title && (
        <figcaption className="text-center text-xs text-gray-600 mt-1">
          {props.title}
        </figcaption>
      )}
    </figure>
  );
};

export { CustomImage };
