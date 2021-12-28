type Props = {
  src: string;
  width: string;
  height: string;
};

const CustomYotubeIframe: React.VFC<Props> = ({ src, width, height }) => {
  return (
    <div className="flex justify-center py-4">
      <iframe
        src={src}
        width={width}
        height={height}
        allowFullScreen
        frameBorder="0"
      />
    </div>
  );
};

export { CustomYotubeIframe };
