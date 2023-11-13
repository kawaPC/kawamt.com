const { join } = require("path");
const imageSize = require("image-size");
const fs = require("fs");
const mkdirp = require("mkdirp");
const exifr = require("exifr");

const ENTRIES_PATH = join(process.cwd(), "entry/");

const getAllEntries = () => {
  const files = fs
    .readdirSync(ENTRIES_PATH)
    .filter((path) => /\.md?$/.test(path));

  return files.map((file) => {
    const path = join(ENTRIES_PATH, file);
    return fs.readFileSync(path, "utf8");
  });
};

const exifrTargets = ["jpeg", "jpg", "png"];

const generateImageMetadataFromMarkdown = async () => {
  const entries = getAllEntries();
  let images = [];

  entries.forEach((entry) => {
    const imageSyntaxArr = entry.match(/!\[.*\]\((.*\.(?:jpeg|jpg|png|gif))/g);
    imageSyntaxArr?.forEach((t) => {
      const filename = t.match(/\((.*?\.(?:jpeg|jpg|png|gif))/)?.[1];

      if (filename && !filename.includes("http")) {
        images.push(filename);
      }
    });
  });

  images = Array.from(new Set(images));

  const imageSizePromises = images.map(async (image) => {
    const imageSrc = `https://storage.googleapis.com/kawamt/${image}`;
    const imageRes = await fetch(imageSrc, { cache: "no-store" });
    if (!imageRes.ok) {
      throw Error(`Invalid image with src "${imageSrc}"`);
    }
    const imageResArrayBuffer = await imageRes.arrayBuffer();
    const imageResBuffer = Buffer.from(imageResArrayBuffer);

    const { width, height } = imageSize(imageResBuffer);

    let exifrResult;

    if (exifrTargets.some((t) => image.endsWith(t))) {
      exifrResult = await exifr.parse(imageResBuffer);
    }
    const {
      Make,
      Model,
      LensModel,
      FNumber,
      ISO,
      DateTimeOriginal,
      ExposureTime,
    } = exifrResult || {};

    const primitiveImageSrc = `https://storage.googleapis.com/kawamt/primitive/${image.replace(
      /\.(?:jpeg|jpg|png|gif)/i,
      ".svg"
    )}`;

    const primitiveImageRes = await fetch(primitiveImageSrc);

    let base64;

    if (primitiveImageRes.ok) {
      const primitiveImageResBuffer = await primitiveImageRes.arrayBuffer();
      base64 = Buffer.from(primitiveImageResBuffer).toString("base64");
    }

    return {
      [image]: {
        width,
        height,
        base64,
        Make,
        Model,
        LensModel,
        FNumber,
        ISO,
        DateTimeOriginal,
        ExposureTime,
      },
    };
  });

  const imageSizes = await Promise.all(imageSizePromises);

  const imageSizesObject = Object.fromEntries(
    imageSizes.map((t) => Object.entries(t)[0])
  );

  const data = JSON.stringify(imageSizesObject);

  if (!fs.existsSync("static")) {
    mkdirp.sync("static");
  }

  fs.writeFileSync("static/imageSizes.json", data);
};

generateImageMetadataFromMarkdown();
