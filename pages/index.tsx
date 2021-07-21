import { GetStaticProps } from "next";
import Head from "next/head";
import { IEntrySummary } from "types/entry";
import { SITE_NAME } from "types/constants";
import { getAllEntrySummaries } from "utils/entryUtil";
import React from "react";
import { EntryDate } from "components/EntryDate";
import { Title } from "components/Typography/Title";
import { ReadMore } from "components/Typography/ReadMore";
import { RehypeToReactElement } from "components/RehypeToReactElement";

type Props = {
  entries: IEntrySummary[];
};

const Home: React.FC<Props> = ({ entries }) => {
  return (
    <section className="space-y-16 mt-10">
      <Head>
        <title>{SITE_NAME}</title>
      </Head>

      {entries.map((entry) => {
        return (
          <article
            key={entry.slug}
            className="border-b-2 last:border-b-0 pb-16"
          >
            <EntryDate date={entry.date}>{entry.formatDate}</EntryDate>
            {entry.title && (
              <Title href={`/entry/${entry.slug}`}>{entry.title}</Title>
            )}
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
