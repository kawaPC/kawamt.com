import { createElement } from "react";
import unified from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
// @ts-ignore
import highlight from "rehype-highlight";
import { CustomComponents } from "./CustomComponents";

const rehypeToReactProcessor = unified()
  .use(rehypeParse, { fragment: true })
  .use(highlight)
  .use(rehypeReact, {
    createElement: createElement,
    components: CustomComponents,
  });

type Props = {
  htmlSource: string;
};

const RehypeToReactElement: React.VFC<Props> = ({ htmlSource }) => {
  return <>{rehypeToReactProcessor.processSync(htmlSource).result}</>;
};

export { RehypeToReactElement };
