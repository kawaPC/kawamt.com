type Props = {
  videoid: string;
  width: string;
  height: string;
};

const CustomYotubeIframe: React.VFC<Props> = ({ videoid, width, height }) => {
  return (
    <div className="text-center py-4">
      <amp-youtube
        className="max-w-full"
        data-videoid={videoid}
        layout="fixed"
        width={width}
        height={height}
      />
    </div>
  );
};

export { CustomYotubeIframe };
