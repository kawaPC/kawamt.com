import unified from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import breaks from "remark-breaks";

export const markdownToHtml = async (markdown: string) =>
  unified()
    .use(remarkParse)
    .use(breaks)
    .use(remarkRehype)
    .use(rehypeStringify)
    .processSync(markdown)
    .toString();
