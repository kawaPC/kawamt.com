import { GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import Link from "next/link";
import { IEntry } from "types/entry";
import { SITE_NAME } from "types/constants";
import { getAllEntrySummaries } from "utils/entryUtil";

type Props = {
  entries: IEntry[];
};

const Home: React.FC<Props> = ({ entries }) => {
  return (
    <div>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>

      <h1>記事一覧</h1>

      <ol reversed>
        {entries.map((entry) => {
          return (
            <li key={entry.slug}>
              <time dateTime={entry.date}>
                <Link href={`/entry/${entry.slug}`}>{entry.dateJa}</Link>
              </time>
              <p>{entry.title}</p>
              <MDXRemote {...entry.introductionSource} />
              {!entry.isShort && (
                <Link href={`/entry/${entry.slug}`}>続きを読む</Link>
              )}
              <hr />
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const entries = await getAllEntrySummaries();

  return { props: { entries } };
};
