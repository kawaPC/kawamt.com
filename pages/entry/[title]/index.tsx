import { getAllEntrySlugs, getEntry } from "utils/entryUtil";
import { GetStaticPaths, GetStaticProps } from "next";
import { IEntry } from "types/entry";
import { H1 } from "components/Typography/H1";
import { EntryDate } from "components/EntryDate";
import Head from "next/head";
import { RehypeToReactElement } from "components/RehypeToReactElement";

const EntryPage: React.FC<IEntry> = ({
  title,
  date,
  formatDate,
  contentSource,
}) => {
  return (
    <article className="space-y-5 mt-10">
      <Head>
        <title>{title || formatDate}</title>
      </Head>

      <EntryDate date={date}>{formatDate}</EntryDate>
      {title && <H1>{title}</H1>}

      <RehypeToReactElement htmlSource={contentSource} />
    </article>
  );
};

export default EntryPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const entry = await getEntry(params?.title as string);

  return {
    props: entry,
    revalidate: 10,
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

export const config = { amp: "hybrid" };
