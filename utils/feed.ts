import RSS from "rss";
import fs from "fs";
import { join } from "path";
import mkdirp from "mkdirp";
import { APP_ROOT, SITE_DESCRIPTION, SITE_NAME } from "utils/constants";
import { IEntry } from "types/entry";

const PUBLIC_PATH = join(process.cwd(), "public");

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

export const publishRssXml = async (entries: IEntry[], path: string = "") => {
  const rssDir = join(PUBLIC_PATH, path);
  const rssPath = join(rssDir, "rss.xml");
  const rss = generateEntryRssXml(entries, path);
  if (!fs.existsSync(rssDir)) {
    mkdirp.sync(rssDir);
  }
  fs.writeFileSync(rssPath, rss);
};
