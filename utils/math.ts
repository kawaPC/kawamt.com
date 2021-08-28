export function imageRatio(
  originWidth: number,
  originHeight: number,
  resizeNumber: number,
  resizeMove: "width" | "height"
) {
  let width = 0;
  let height = 0;

  if (resizeMove === "width") {
    height = (resizeNumber * originHeight) / originWidth;
    width = (height * originWidth) / originHeight;
  } else {
    width = (resizeNumber * originWidth) / originHeight;
    height = (width * originHeight) / originWidth;
  }

  return { width, height };
}
