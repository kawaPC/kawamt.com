import { GetStaticPaths, GetStaticProps } from "next";
import { IEntrySummary } from "types/entry";
import { getAllEntryTags, getTaggedEntrySummaries } from "utils/entryUtil";
import React from "react";
import { AppHead } from "components/AppHead";
import { EntrySummary } from "components/EntrySummary";
import Link from "next/link";
import { APP_ROOT } from "types/constants";

type Props = {
  tag: string;
  tagsEntryPath: string;
  entries: IEntrySummary[];
};

const TagsEntryPage: React.FC<Props> = ({ tag, tagsEntryPath, entries }) => {
  return (
    <section className="space-y-16 mt-10">
      <AppHead
        url={`${APP_ROOT}${tagsEntryPath}`}
        title={`記事一覧 [${tag}]`}
        description={`記事一覧 [${tag}]`}
      />

      <h1 className="text-center text-gray-600">
        <Link href={tagsEntryPath}>
          <a className="text-3xl">{`#${tag}`}</a>
        </Link>
      </h1>

      {entries.map((entry) => (
        <EntrySummary key={entry.slug} {...entry} />
      ))}
    </section>
  );
};

export default TagsEntryPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.tag as string;
  const entries = await getTaggedEntrySummaries(tag);
  const tagsEntryPath = `/tags/${tag}/entry`;

  return { props: { tag, tagsEntryPath, entries } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllEntryTags();

  const paths = tags.map((tag) => ({
    params: {
      tag: tag,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const config = { amp: true };
