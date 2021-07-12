import { getAllEntrySlugs, getEntry } from "utils/entryUtil";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { IEntry } from "types/entry";

type Props = {
  source: MDXRemoteSerializeResult;
  frontMatter: Omit<IEntry, "slug">;
};

const EntryPage: React.FC<Props> = ({ source, frontMatter }: Props) => {
  return (
    <article>
      <h1>{frontMatter.title}</h1>

      <MDXRemote {...source} />
    </article>
  );
};

export default EntryPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { content, data } = getEntry(params?.title as string);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
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
