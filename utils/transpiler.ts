import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import breaks from "remark-breaks";
// @ts-ignore
import rehypePrism from "@mapbox/rehype-prism";
import rehypeImsize from "rehype-external-imsize";

export const markdownToHtml = async (markdown: string) => {
  const result = await unified()
    .use(remarkParse)
    .use(breaks)
    .use(remarkRehype)
    .use(rehypeImsize, { maxBufferLengths: 1000 })
    .use(rehypePrism)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
};
