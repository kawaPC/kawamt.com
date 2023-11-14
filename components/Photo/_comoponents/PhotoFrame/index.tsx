"use client";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  exifTextElement?: React.ReactNode;
  imageWidth?: number;
  imageHeight?: number;
};

const calcImageSize = (
  imageWidth: number,
  imageHeight: number,
  boxWidth: number,
  boxHeight: number
) => {
  // 画像の縦幅と横幅が contentRect の縦幅と横幅よりも小さい場合
  if (imageWidth < boxWidth && imageHeight < boxHeight) {
    // 画像そのもののサイズを返す
    return { width: imageWidth, height: imageHeight };
  } else {
    const hFillWidth = Math.round((boxHeight * imageWidth) / imageHeight);
    const wFillHeight = Math.round((boxWidth * imageHeight) / imageWidth);
    return hFillWidth < boxWidth
      ? { width: hFillWidth, height: boxHeight }
      : { width: boxWidth, height: wFillHeight };
  }
};

export const PhotoFrame: React.FC<Props> = ({
  children,
  exifTextElement,
  imageWidth,
  imageHeight,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const ghostFrameRef = useRef<HTMLDivElement>(null);
  const ghostExifRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const exifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ghostFrameRef.current || !imageWidth || !imageHeight) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width: fboxWidth, height: fboxHeight } = entries[0].contentRect;
      // borderの分を引く
      const boxWidth = fboxWidth - 2;
      const boxHeight = fboxHeight - 2;

      const { width, height } = calcImageSize(
        imageWidth,
        imageHeight,
        boxWidth,
        boxHeight
      );

      ghostExifRef.current?.setAttribute("style", `width: ${width}px;`);

      frameRef.current?.setAttribute(
        "style",
        `width: ${width}px; height: ${height}px;`
      );

      exifRef.current?.setAttribute("style", `width: ${width}px;`);

      setIsLoaded(true);
    });

    resizeObserver.observe(ghostFrameRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [imageWidth, imageHeight]);

  return (
    <>
      <div
        className={clsx(`absolute flex justify-center items-center`, {
          invisible: !isLoaded,
        })}
      >
        <div
          className="bg-white border sm:p-3 shadow-lg inline-flex flex-col"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className="flex flex-col">
            <div className="relative" ref={frameRef}>
              {children}
            </div>
            {exifTextElement && <div ref={exifRef}>{exifTextElement}</div>}
          </div>
        </div>
      </div>
      <div className="absolute w-full h-full sm:p-3 inline-flex flex-col invisible">
        <div className="flex-1 bg-black" ref={ghostFrameRef}></div>
        {exifTextElement && <div ref={ghostExifRef}>{exifTextElement}</div>}
      </div>
    </>
  );
};
