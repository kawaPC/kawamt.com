import { EntryDate } from "components/EntryDate";
import { EntryTags } from "components/EntryTags";
import { RehypeToReactElement } from "components/RehypeToReactElement";
import { Metadata } from "next";
import { getAllEntrySlugs, getEntry } from "utils/entryUtil";
import { createMetadata } from "utils/metadata";

type Params = {
  params: {
    title: string;
  };
};

export async function generateStaticParams() {
  const slugs = getAllEntrySlugs();
  return slugs.map((slug) => ({ title: slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { title: slug } = params;

  const { title, ogImageName, description } = await getEntry(
    params?.title as string
  );

  return createMetadata({
    path: `/entry/${slug}`,
    title: title || slug,
    description: description || `「${title}」の記事詳細`,
    ogImage: ogImageName,
  });
}

export default async function Page({ params }: Params) {
  const { title: slug } = params;
  const { title, tags, date, formatDate, contentSource } = await getEntry(slug);

  const path = `/entry/${slug}`;

  return (
    <article className="mt-10">
      <EntryDate date={date} href={path}>
        {formatDate}
      </EntryDate>
      {title && <h1 className="text-2xl">{title}</h1>}
      {tags && <EntryTags tags={tags} />}

      <RehypeToReactElement htmlSource={contentSource} />
    </article>
  );
}

export const dynamicParams = false;
