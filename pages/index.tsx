import { GetStaticProps } from "next";
import { IEntrySummary } from "types/entry";
import { getAllEntrySummaries } from "utils/entryUtil";
import React from "react";
import { EntryDate } from "components/EntryDate";
import { Title } from "components/Typography/Title";
import { ReadMore } from "components/ReadMore";
import { RehypeToReactElement } from "components/RehypeToReactElement";
import { AppHead } from "components/AppHead";

type Props = {
  entries: IEntrySummary[];
};

const Home: React.FC<Props> = ({ entries }) => {
  return (
    <section className="space-y-16 mt-10">
      <AppHead />

      {entries.map((entry) => {
        const entryPath = `/entry/${entry.slug}`;

        return (
          <article
            key={entry.slug}
            className="border-b-2 last:border-b-0 pb-16"
          >
            <EntryDate date={entry.date} href={entryPath}>
              {entry.formatDate}
            </EntryDate>
            {entry.title && <Title href={entryPath}>{entry.title}</Title>}
            <RehypeToReactElement htmlSource={entry.introductionSource} />
            {!entry.isShort && <ReadMore href={`/entry/${entry.slug}`} />}
          </article>
        );
      })}
    </section>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const entries = await getAllEntrySummaries();

  return { props: { entries } };
};

export const config = { amp: true };
