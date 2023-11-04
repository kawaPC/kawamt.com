import { GetStaticProps } from "next";
import { IEntry } from "types/entry";
import { getEntries } from "utils/entryUtil";
import React from "react";
import { AppHead } from "components/AppHead";
import { EntrySummary } from "components/EntrySummary";
import { publishRssXml } from "utils/feed";
import { Pagination } from "components/Pagination";

type Props = {
  entries: IEntry[];
  isLast: boolean;
};

const Home: React.FC<Props> = ({ entries, isLast }) => {
  return (
    <section className="space-y-16 mt-10">
      <AppHead />

      {entries.map((entry) => (
        <EntrySummary key={entry.slug} {...entry} />
      ))}

      <Pagination page={1} isLast={isLast} />
    </section>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const { entries, isLast } = await getEntries(1);
  publishRssXml(entries);

  return { props: { entries, isLast } };
};
