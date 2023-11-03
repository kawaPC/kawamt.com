import { getEntries } from "utils/entryUtil";
import { generateEntryRssXml } from "utils/feed";

export async function GET() {
  const { entries, isLast } = await getEntries(1);

  const rss = generateEntryRssXml(entries, "");
  return new Response(rss, {
    headers: { "Content-Type": "application/rss+xml" },
  });
}
