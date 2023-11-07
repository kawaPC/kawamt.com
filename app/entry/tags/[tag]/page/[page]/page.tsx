import { EntrySummary } from "components/EntrySummary";
import { Pagination } from "components/Pagination";
import { Metadata } from "next";
import {
  TaggedEntryPerPageParams,
  getEntries,
  getTaggedEntryPerPageParams,
} from "utils/entryUtil";
import { createMetadata } from "utils/metadata";

type Params = {
  params: TaggedEntryPerPageParams;
};

export async function generateStaticParams() {
  return getTaggedEntryPerPageParams();
}

export function generateMetadata({ params }: Params): Metadata {
  const { page, tag } = params;
  return createMetadata({
    path: `/entry/tags/${tag}/page/${page}`,
    title: `${page}ページ目の記事一覧 [${tag}]`,
    description: `${page}ページ目の記事一覧 [${tag}]`,
  });
}

export default async function Page({ params }: Params) {
  const { page, tag } = params;
  const parsedPage = parseInt(page, 10);
  const { entries, isLast } = await getEntries(parsedPage, tag);

  return (
    <section className="space-y-16 mt-10">
      {entries.map((entry) => (
        <EntrySummary key={entry.slug} {...entry} />
      ))}

      <Pagination page={parsedPage} tag={tag} isLast={isLast} />
    </section>
  );
}

export const dynamicParams = false;
