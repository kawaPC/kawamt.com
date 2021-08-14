import { GetStaticPaths, GetStaticProps } from "next";
import { IEntry } from "types/entry";
import { getTaggedEntryPaths, getEntries } from "utils/entryUtil";
import React from "react";
import { AppHead } from "components/AppHead";
import { EntrySummary } from "components/EntrySummary";
import Link from "next/link";
import { publishRssXml } from "utils/feed";
import { Pagination } from "components/Pagination";

type Props = {
  tag: string;
  path: string;
  entries: IEntry[];
  isLast: boolean;
};

const IndexTaggedEntry: React.FC<Props> = ({ tag, path, entries, isLast }) => {
  return (
    <section className="space-y-16 mt-10">
      <AppHead
        path={path}
        title={`記事一覧 [${tag}]`}
        description={`記事一覧 [${tag}]`}
      />

      <h1 className="text-center text-gray-600">
        <Link href={path}>
          <a className="text-3xl">{`#${tag}`}</a>
        </Link>
      </h1>

      {entries.map((entry) => (
        <EntrySummary key={entry.slug} {...entry} />
      ))}

      <Pagination page={1} isLast={isLast} />
    </section>
  );
};

export default IndexTaggedEntry;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.tag as string;
  const { entries, isLast } = await getEntries(1, tag);
  const path = `/tags/${tag}/entry`;
  publishRssXml(entries, path);

  return { props: { tag, path, entries, isLast } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getTaggedEntryPaths(),
    fallback: false,
  };
};

export const config = { amp: true };
