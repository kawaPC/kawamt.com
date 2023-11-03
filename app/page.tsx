import { EntrySummary } from "components/EntrySummary";
import { Pagination } from "components/Pagination";
import { getEntries } from "utils/entryUtil";
import { publishRssXml } from "utils/feed";

export default async function APP_ROOT() {
  const { entries, isLast } = await getEntries(1);
  publishRssXml(entries);

  return (
    <section className="space-y-16 mt-10">
      {entries.map((entry) => (
        <EntrySummary key={entry.slug} {...entry} />
      ))}

      <Pagination page={1} isLast={isLast} />
    </section>
  );
}
