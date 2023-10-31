import { createElement } from "react";
import unified from "unified";
import rehypeParse from "rehype-parse";
import rehypeReact from "rehype-react";
import { CustomComponents, SummaryCustomComponents } from "./CustomComponents";

const rehypeToReactProcessor = (isSummary = false) =>
  unified()
    .use(rehypeParse, { fragment: true })
    // @ts-ignore
    .use(rehypeReact, {
      createElement: createElement,
      components: isSummary ? SummaryCustomComponents : CustomComponents,
    });

type Props = {
  htmlSource: string;
  isSummary?: boolean;
};

const RehypeToReactElement: React.FC<Props> = ({
  htmlSource,
  isSummary = false,
}) => {
  return (
    <>{rehypeToReactProcessor(isSummary).processSync(htmlSource).result}</>
  );
};

export { RehypeToReactElement };
