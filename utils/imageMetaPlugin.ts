import imageSize from "image-size";
import { ISizeCalculationResult } from "image-size/dist/types/interface";
import { Node } from "unist";
import { visit } from "unist-util-visit";
import svgToMiniDataURI from "mini-svg-data-uri";

type ImageNode = {
  type: "element";
  tagName: "img";
  properties: {
    src: string;
    height?: number;
    width?: number;
    placeholder?: string;
  };
};

function isImageNode(node: Node): node is ImageNode {
  const img = node as ImageNode;
  return (
    img.type === "element" &&
    img.tagName === "img" &&
    img.properties &&
    typeof img.properties.src === "string"
  );
}

async function addProps(node: ImageNode): Promise<void> {
  let res: ISizeCalculationResult | undefined;

  const imageSrc = `${process.env.IMG_DOMAIN}/${node.properties.src}`;
  const primitiveImageSrc = `${
    process.env.IMG_PRIMITIVE_DOMAIN
  }/${node.properties.src.replace(/\.(?:jpeg|jpg|png|gif)/i, ".svg")}`;

  node.properties.src = imageSrc;

  const imageRes = await fetch(imageSrc);
  if (!imageRes.ok) {
    throw Error(`Invalid image with src "${node.properties.src}"`);
  }
  const imageResArrayBuffer = await imageRes.arrayBuffer();
  const imageResBuffer = Buffer.from(imageResArrayBuffer);

  res = imageSize(imageResBuffer);

  if (!res) throw Error(`Invalid image with src "${node.properties.src}"`);

  const primitiveImageRes = await fetch(primitiveImageSrc);

  if (primitiveImageRes.ok) {
    const svg = await primitiveImageRes.text();
    node.properties.placeholder = svgToMiniDataURI(svg);
  }

  node.properties.width = res.width;
  node.properties.height = res.height;
}

const imageMetaPlugin = () => {
  return async function transformer(tree: Node): Promise<Node> {
    const images: ImageNode[] = [];

    visit(tree, "element", (node) => {
      if (isImageNode(node)) {
        images.push(node);
      }
    });

    for (const image of images) {
      await addProps(image);
    }

    return tree;
  };
};

export default imageMetaPlugin;
