import { getAllArticleSlugs, getArticle } from "utils/articlesUtil";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { IArticle } from "types/article";

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IArticle, "slug">;
};

const ArticlePage: React.FC<Props> = ({ source, frontMatter }: Props) => {
  return (
    <article>
      <h1>{frontMatter.title}</h1>

      <MDXRemote {...source} />
    </article>
  );
};

export default ArticlePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, data } = getArticle(params?.title as string);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = getAllArticleSlugs();

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
