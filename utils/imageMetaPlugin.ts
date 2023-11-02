import imageSize from "image-size";
import { ISizeCalculationResult } from "image-size/dist/types/interface";
import { Node } from "unist";
import { visit } from "unist-util-visit";

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

// function resContentToDataUri(res: Response): Promise<string> {
//   return res.blob().then(
//     (blob) =>
//       new Promise((resolve) => {
//         let reader = new FileReader();
//         reader.onload = function () {
//           if (reader.result && typeof reader.result === "string") {
//             resolve(reader.result);
//           } else {
//             new Error("Failed to read file");
//           }
//         };
//         reader.readAsDataURL(blob);
//       })
//   );
// }

async function addProps(node: ImageNode): Promise<void> {
  let res: ISizeCalculationResult | undefined;

  const imageSrc = `${process.env.NEXT_PUBLIC_IMG_DOMAIN}/${node.properties.src}`;
  const primitiveImageSrc = `${
    process.env.NEXT_PUBLIC_IMG_PRIMITIVE_DOMAIN
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
    const primitiveImageResBuffer = await primitiveImageRes.arrayBuffer();
    const base64 = Buffer.from(primitiveImageResBuffer).toString("base64");
    node.properties.placeholder = base64;
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
