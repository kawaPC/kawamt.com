type Props = {
  src: string;
  alt?: string;
  title?: string;
};

const CustomImage: React.VFC<Props> = (props) => {
  return (
    <div className="flex justify-center flex-col mb-5">
      <div className="amp-img-fixed-container">
        <amp-img
          className="contain"
          src={props.src}
          layout="fill"
          alt={props.alt}
          title={props.title}
        />
      </div>
      {props.title && (
        <figcaption className="text-center text-xs text-gray-600 mt-1">
          {props.title}
        </figcaption>
      )}
    </div>
  );
};

export { CustomImage };
