import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import breaks from "remark-breaks";
// @ts-ignore
import rehypePrism from "@mapbox/rehype-prism";
import rehypeProbeImageSize from "rehype-probe-image-size";
import remarkYoutubeEmbed from "remark-youtube-embed";

export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(breaks)
    .use(remarkYoutubeEmbed)
    .use(remarkRehype)
    .use(rehypeProbeImageSize, { staticDir: "public" })
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
};
