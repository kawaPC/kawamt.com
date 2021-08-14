import { getAllEntrySlugs, getEntry } from "utils/entryUtil";
import { GetStaticPaths, GetStaticProps } from "next";
import { IEntry } from "types/entry";
import { EntryDate } from "components/EntryDate";
import { RehypeToReactElement } from "components/RehypeToReactElement";
import { AppHead } from "components/AppHead";
import { EntryTags } from "components/EntryTags";

const Entry: React.FC<IEntry> = ({
  slug,
  entryUrl,
  title,
  tags,
  ogImage,
  description,
  date,
  formatDate,
  contentSource,
}) => {
  return (
    <article className="mt-10">
      <AppHead
        url={entryUrl}
        title={title || slug}
        description={description}
        ogImage={ogImage}
      />

      <EntryDate date={date} href={`/entry/${slug}`}>
        {formatDate}
      </EntryDate>
      {title && <h1 className="text-2xl">{title}</h1>}
      {tags && <EntryTags tags={tags} />}

      <RehypeToReactElement htmlSource={contentSource} />
    </article>
  );
};

export default Entry;

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

export const config = { amp: true };
