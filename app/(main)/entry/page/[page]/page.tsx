import { EntrySummary } from "components/EntrySummary";
import { Pagination } from "components/Pagination";
import { Metadata } from "next";
import {
  EntryPerPageParams,
  getEntries,
  getEntryPerPageParams,
} from "utils/entryUtil";
import { createMetadata } from "utils/metadata";

type Params = {
  params: EntryPerPageParams;
};

export async function generateStaticParams() {
  return getEntryPerPageParams();
}

export function generateMetadata({ params }: Params): Metadata {
  const { page } = params;

  return createMetadata({
    path: `/entry/page/${page}`,
    title: `${page}ページ目の記事一覧`,
    description: `${page}ページ目の記事一覧`,
  });
}

export default async function Page({ params }: Params) {
  const { page } = params;
  const parsedPage = parseInt(page, 10);
  const { entries, isLast } = await getEntries(parsedPage);

  return (
    <section className="space-y-16 mt-10">
      {entries.map((entry) => (
        <EntrySummary key={entry.slug} {...entry} />
      ))}

      <Pagination page={parsedPage} isLast={isLast} />
    </section>
  );
}

export const dynamicParams = false;
