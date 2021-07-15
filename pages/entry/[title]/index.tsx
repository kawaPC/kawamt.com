import { getAllEntrySlugs, getEntry } from "utils/entryUtil";
import { GetStaticPaths, GetStaticProps } from "next";
import { IEntry } from "types/entry";
import { H1 } from "comoponents/Typography/H1";
import { EntryDate } from "comoponents/EntryDate";
import Head from "next/head";
import { RehypeToReactElement } from "comoponents/RehypeToReactElement";

const EntryPage: React.FC<IEntry> = ({
  title,
  date,
  formatDate,
  contentSource,
}) => {
  return (
    <article>
      <Head>
        <title>{title}</title>
      </Head>

      <EntryDate date={date}>{formatDate}</EntryDate>
      <H1>{title}</H1>

      <RehypeToReactElement htmlSource={contentSource} />
    </article>
  );
};

export default EntryPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const entry = await getEntry(params?.title as string);

  return {
    props: entry,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllEntrySlugs();

  const paths = slugs.map((slug) => ({
    params: {
      title: slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
