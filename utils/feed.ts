import RSS from "rss";
import { join } from "path";
import { APP_ROOT, SITE_DESCRIPTION, SITE_NAME } from "utils/constants";
import { IEntry } from "types/entry";

export function generateEntryRssXml(entries: IEntry[], path: string) {
  const rss = new RSS({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site_url: APP_ROOT,
    feed_url: join(APP_ROOT, path, "rss.xml"),
  });

  entries.forEach((entry) => {
    rss.item({
      title: entry.title || entry.slug,
      description: entry.description,
      custom_elements: [
        {
          "content:encoded": {
            _cdata: entry.contentSource,
          },
        },
      ],
      date: new Date(entry.date),
      url: `${APP_ROOT}/entry/${entry.slug}`,
    });
  });

  return rss.xml();
}
