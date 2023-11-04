import {
  TaggedEntryParams,
  getEntries,
  getTaggedEntryParams,
} from "utils/entryUtil";
import { generateEntryRssXml } from "utils/feed";

type Params = {
  params: TaggedEntryParams;
};

export async function generateStaticParams() {
  return getTaggedEntryParams();
}

export async function GET(_request: Request, { params }: Params) {
  const { tag } = params;
  const { entries } = await getEntries(1, tag);

  const path = `/entry/tags/${tag}`;

  const rss = generateEntryRssXml(entries, path);
  return new Response(rss, {
    headers: { "Content-Type": "application/rss+xml" },
  });
}

export const dynamicParams = false;
