import dayjs from "dayjs";
import { ValueOf } from "next/dist/shared/lib/constants";
import type imageSizes from "static/imageSizes.json";

type Props = Omit<ValueOf<typeof imageSizes>, "width" | "height" | "base64">;

export const ExifText: React.FC<Props> = ({
  Make,
  Model,
  LensModel,
  FNumber,
  ISO,
  DateTimeOriginal,
  ExposureTime,
}) => {
  const shutterSpeed = ExposureTime ? `1/${Math.round(1 / ExposureTime)}` : "";
  const camera = [Make, Model].filter((v) => v).join(" ");
  const F = FNumber ? `F${FNumber}` : "";
  const ISOText = ISO ? `ISO${ISO}` : "";
  const datetime = dayjs(DateTimeOriginal).format("YYYY-MM-DD HH:mm");
  const exifText = [camera, LensModel, shutterSpeed, F, ISOText]
    .filter((v) => v)
    .join(", ");

  return datetime || exifText ? (
    <div className="flex flex-wrap gap-x-4 justify-between text-[10px] leading-[20px] p-2 sm:pb-0">
      {datetime && <span>{datetime}</span>}
      {exifText && <span>{exifText}</span>}
    </div>
  ) : null;
};
