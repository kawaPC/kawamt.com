declare module "static/imageSizes.json" {
  const data: Record<
    string,
    { width?: number; height?: number; base64?: string }
  >;
  export default data;
}
