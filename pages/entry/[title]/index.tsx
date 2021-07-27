import { getAllEntrySlugs, getEntry } from "utils/entryUtil";
import { GetStaticPaths, GetStaticProps } from "next";
import { IEntry } from "types/entry";
import { H1 } from "components/Typography/H1";
import { EntryDate } from "components/EntryDate";
import { RehypeToReactElement } from "components/RehypeToReactElement";
import { AppHead } from "components/AppHead";

const EntryPage: React.FC<IEntry> = ({
  slug,
  entryUrl,
  title,
  ogImage,
  description,
  date,
  formatDate,
  contentSource,
}) => {
  return (
    <article className="space-y-5 mt-10">
      <AppHead
        url={entryUrl}
        title={title || slug}
        description={description}
        ogImage={ogImage}
      />

      <EntryDate date={date} href={`/entry/${slug}`}>
        {formatDate}
      </EntryDate>
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
