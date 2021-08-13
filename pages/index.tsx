import { GetStaticProps } from "next";
import { IEntrySummary } from "types/entry";
import { getEntrySummaries } from "utils/entryUtil";
import React from "react";
import { AppHead } from "components/AppHead";
import { EntrySummary } from "components/EntrySummary";
import { publishRssXml } from "utils/feed";

type Props = {
  entries: IEntrySummary[];
};

const Home: React.FC<Props> = ({ entries }) => {
  return (
    <section className="space-y-16 mt-10">
      <AppHead />

      {entries.map((entry) => (
        <EntrySummary key={entry.slug} {...entry} />
      ))}
    </section>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const entries = await getEntrySummaries();
  publishRssXml(entries);

  return { props: { entries } };
};

export const config = { amp: true };
