import { useAmp } from "next/amp";

type Props = {
  videoid: string;
  src: string;
  width: string;
  height: string;
  allowFullScreen: boolean;
  frameBorder: string;
};

const CustomYotubeIframe: React.VFC<Props> = ({
  videoid,
  src,
  width,
  height,
  allowFullScreen,
  frameBorder,
}) => {
  const isAmp = useAmp();
  return (
    <div className="text-center py-4">
      {isAmp ? (
        <amp-youtube
          className="max-w-full"
          data-videoid={videoid}
          layout="fixed"
          width={width}
          height={height}
        />
      ) : (
        <iframe
          className="inline max-w-full"
          src={src}
          width={width}
          height={height}
          allowFullScreen={allowFullScreen}
          frameBorder={frameBorder}
        />
      )}
    </div>
  );
};

export { CustomYotubeIframe };
