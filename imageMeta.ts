import imageSize from "image-size";
import { getAllEntries } from "utils/entryUtil";
import fs from "fs";
import mkdirp from "mkdirp";

const generateImageMetadataFromMarkdown = async () => {
  const entries = getAllEntries();
  let images: string[] = [];

  entries.forEach((entry) => {
    const imageSyntaxArr = entry.content.match(
      /!\[.*\]\((.*\.(?:jpeg|jpg|png|gif))/g
    );
    imageSyntaxArr?.forEach((t) => {
      const filename = t.match(/\((.*?\.(?:jpeg|jpg|png|gif))/)?.[1];

      if (filename && !filename.includes("http")) {
        images.push(filename);
      }
    });
  });

  images = Array.from(new Set(images));

  console.log({ images });

  const imageSizePromises = images.map(async (image) => {
    const imageSrc = `${process.env.NEXT_PUBLIC_IMG_DOMAIN}/${image}`;
    const imageRes = await fetch(imageSrc, { cache: "no-store" });
    if (!imageRes.ok) {
      throw Error(`Invalid image with src "${imageSrc}"`);
    }
    const imageResArrayBuffer = await imageRes.arrayBuffer();
    const imageResBuffer = Buffer.from(imageResArrayBuffer);

    const { width, height } = imageSize(imageResBuffer);

    const primitiveImageSrc = `${
      process.env.NEXT_PUBLIC_IMG_PRIMITIVE_DOMAIN
    }/${image.replace(/\.(?:jpeg|jpg|png|gif)/i, ".svg")}`;

    const primitiveImageRes = await fetch(primitiveImageSrc);

    let base64: string | undefined;

    if (primitiveImageRes.ok) {
      const primitiveImageResBuffer = await primitiveImageRes.arrayBuffer();
      base64 = Buffer.from(primitiveImageResBuffer).toString("base64");
    }

    return { [image]: { width, height, base64 } };
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
