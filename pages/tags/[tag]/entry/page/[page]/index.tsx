import { GetStaticPaths, GetStaticProps } from "next";
import { IEntry } from "types/entry";
import { getEntries, getTaggedEntryPerPagePaths } from "utils/entryUtil";
import React from "react";
import { AppHead } from "components/AppHead";
import { EntrySummary } from "components/EntrySummary";
import { Pagination } from "components/Pagination";

type Props = {
  entries: IEntry[];
  page: number;
  isLast: boolean;
};

const IndexTaggedEntryPerPage: React.FC<Props> = ({
  entries,
  page,
  isLast,
}) => {
  return (
    <section className="space-y-16 mt-10">
      <AppHead />

      {entries.map((entry) => (
        <EntrySummary key={entry.slug} {...entry} />
      ))}

      <Pagination page={page} isLast={isLast} />
    </section>
  );
};

export default IndexTaggedEntryPerPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const tag = params?.tag as string;
  const page = parseInt(params?.page as string, 10);

  const { entries, isLast } = await getEntries(page, tag);

  return { props: { entries, page, isLast } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getTaggedEntryPerPagePaths(),
    fallback: false,
  };
};

export const config = { amp: true };
