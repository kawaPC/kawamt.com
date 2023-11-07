import { Node } from "unist";
import { visit } from "unist-util-visit";
import imageSizes from "static/imageSizes.json";

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
  const filename = node.properties.src as keyof typeof imageSizes;

  const data = imageSizes[filename];

  if (data) {
    node.properties.src = `${process.env.NEXT_PUBLIC_IMG_DOMAIN}/${filename}`;
    node.properties.width = data.width;
    node.properties.height = data.height;
    node.properties.placeholder = data.base64;
  }
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
