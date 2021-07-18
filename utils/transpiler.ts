import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import breaks from "remark-breaks";
// @ts-ignore
import rehypePrism from "@mapbox/rehype-prism";

export const markdownToHtml = async (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(breaks)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();
