import { GetStaticPaths, GetStaticProps } from "next";
import { IEntry } from "types/entry";
import { getEntries, getEntryPerPagePaths } from "utils/entryUtil";
import React from "react";
import { AppHead } from "components/AppHead";
import { EntrySummary } from "components/EntrySummary";
import { Pagination } from "components/Pagination";

type Props = {
  entries: IEntry[];
  page: number;
  isLast: boolean;
};

const IndexEntryPerPage: React.FC<Props> = ({ entries, page, isLast }) => {
  const path = `/entry/page/${page}`;

  return (
    <section className="space-y-16 mt-10">
      <AppHead
        path={path}
        title={`${page}ページ目の記事一覧`}
        description={`${page}ページ目の記事一覧`}
      />

      {entries.map((entry) => (
        <EntrySummary key={entry.slug} {...entry} />
      ))}

      <Pagination page={page} isLast={isLast} />
    </section>
  );
};

export default IndexEntryPerPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params?.page as string, 10);

  const { entries, isLast } = await getEntries(page);

  return { props: { entries, page, isLast } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getEntryPerPagePaths(),
    fallback: false,
  };
};

export const config = { amp: true };
