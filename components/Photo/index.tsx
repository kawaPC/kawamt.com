"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  name: string;
  width?: number;
  height?: number;
  placeholder: `data:image/${string}`;
  datetime?: string;
  exifText?: string;
};

const calcImageSize = (
  imageWidth: number,
  imageHeight: number,
  boxWidth: number,
  boxHeight: number
) => {
  // 画像の縦幅と横幅が、contentRect の縦幅と横幅よりも小さい場合
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

export const Photo: React.FC<Props> = ({
  src,
  name,
  width: imageWidth,
  height: imageHeight,
  placeholder,
  datetime,
  exifText,
}) => {
  const [imageSizes, setImageSizes] = useState<null | {
    width: number;
    height: number;
  }>(null);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !imageWidth || !imageHeight) return;

    setImageSizes(
      calcImageSize(
        imageWidth,
        imageHeight,
        ref.current.clientWidth,
        ref.current.clientHeight
      )
    );

    const resizeObserver = new ResizeObserver((entries) => {
      const { width: boxWidth, height: fBoxHeight } = entries[0].contentRect;
      const boxHeight = fBoxHeight;

      setImageSizes(
        calcImageSize(imageWidth, imageHeight, boxWidth, boxHeight)
      );
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [imageWidth, imageHeight]);

  return (
    <>
      <div className="absolute w-full h-full">
        <div className="w-full h-full sm:p-3 inline-flex flex-col">
          <div className="flex-1" ref={ref}></div>
          {(datetime || exifText) && (
            <div
              className="flex flex-wrap gap-x-4 justify-between text-[10px] leading-[20px] p-2 sm:pb-0 invisible"
              style={{ width: imageSizes?.width }}
            >
              <span>{datetime}</span>
              <span>{exifText}</span>
            </div>
          )}
        </div>
      </div>
      {imageSizes && (
        <div className="absolute flex justify-center items-center">
          <div className="bg-white border sm:p-3 shadow-lg inline-flex flex-col">
            <Image
              src={src}
              width={imageSizes.width}
              height={imageSizes.height}
              alt={name}
              placeholder={placeholder}
            />
            {(datetime || exifText) && (
              <div
                className={`flex flex-wrap gap-x-4 justify-between text-[10px] leading-[20px] p-2 sm:pb-0`}
                style={{ width: imageSizes?.width }}
              >
                <span>{datetime}</span>
                <span>{exifText}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
