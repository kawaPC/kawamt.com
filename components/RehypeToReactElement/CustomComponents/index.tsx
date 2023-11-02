import { CustomImageWithPlaceholder } from "./CustomImage";
import { CustomLink } from "./CustomLink";
import { CustomParagraph } from "./CustomParagraph";
import { CustomUnorderedList } from "./CustomUnorderedList";
import { CustomBlockquote } from "./CustomBlockquote";
import { CustomYotubeIframe } from "./CustomYotubeIframe";

export const CustomComponents = {
  p: CustomParagraph,
  a: CustomLink,
  img: CustomImageWithPlaceholder,
  ul: CustomUnorderedList,
  blockquote: CustomBlockquote,
  iframe: CustomYotubeIframe,
};

export const SummaryCustomComponents = {
  ...CustomComponents,
  img: CustomImageWithPlaceholder,
};
