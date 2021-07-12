import { GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import Link from "next/link";
import { IArticle } from "types/article";
import { SITE_NAME } from "types/constants";
import { getAllArticleSummaries } from "utils/articlesUtil";

type Props = {
  articles: IArticle[];
};

const Home: React.FC<Props> = ({ articles }) => {
  return (
    <div>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>

      <h1>記事一覧</h1>

      <ol reversed>
        {articles.map((article) => {
          return (
            <li key={article.slug}>
              <time dateTime={article.date}>
                <Link href={`/articles/${article.slug}`}>{article.dateJa}</Link>
              </time>
              <p>{article.title}</p>
              <MDXRemote {...article.introductionSource} />
              {!article.isShort && (
                <Link href={`/articles/${article.slug}`}>続きを読む</Link>
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
  const articles = await getAllArticleSummaries();

  return { props: { articles } };
};
