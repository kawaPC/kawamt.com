declare module "static/imageSizes.json" {
  const data: Record<
    string,
    {
      width?: number;
      height?: number;
      base64?: string;
      Make?: string;
      Model?: string;
      LensModel?: string;
      FNumber?: number;
      ISO?: number;
      DateTimeOriginal?: string;
      ExposureTime?: number;
    }
  >;
  export default data;
}
