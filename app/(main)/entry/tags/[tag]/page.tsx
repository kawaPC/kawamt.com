import { EntrySummary } from "components/EntrySummary";
import { Pagination } from "components/Pagination";
import { Metadata } from "next";
import Link from "next/link";
import {
  TaggedEntryParams,
  getEntries,
  getTaggedEntryParams,
} from "utils/entryUtil";
import { createMetadata } from "utils/metadata";

type Params = {
  params: TaggedEntryParams;
};

export async function generateStaticParams() {
  return getTaggedEntryParams();
}

export function generateMetadata({ params }: Params): Metadata {
  return createMetadata({
    path: `/entry/tags/${params.tag}`,
    title: `記事一覧 [${params.tag}]`,
    description: `記事一覧 [${params.tag}]`,
  });
}

export default async function Page({ params }: Params) {
  const tag = params.tag;
  const { entries, isLast } = await getEntries(1, tag);
  const path = `/entry/tags/${tag}`;

  return (
    <section className="space-y-16 mt-10">
      <h1 className="text-center text-gray-600">
        <Link href={path} className="text-3xl">
          {`#${tag}`}
        </Link>
      </h1>

      {entries.map((entry) => (
        <EntrySummary key={entry.slug} {...entry} />
      ))}

      <Pagination page={1} tag={tag} isLast={isLast} />
    </section>
  );
}

export const dynamicParams = false;
