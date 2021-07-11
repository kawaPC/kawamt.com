import { GetStaticProps } from "next";
import Head from "next/head"
import Link from "next/link";
import { IArticle } from "types/article";
import { SITE_NAME } from "types/constants";
import { getAllArticles } from "utils/articlesUtil";

type Props = {
  articles: IArticle[]
}

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
              <time dateTime={article.date}>{article.date}</time>
              <Link href={`/articles/${article.slug}`}>{article.title}</Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const articles = getAllArticles([
    "slug",
    "date",
    "thumbnail",
    "title",
    "description",
  ]);

  return { props: { articles } };
};