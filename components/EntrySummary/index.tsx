import { EntryDate } from "components/EntryDate";
import { EntryTags } from "components/EntryTags";
import { ReadMore } from "components/ReadMore";
import { RehypeToReactElement } from "components/RehypeToReactElement";
import { Title } from "components/Typography/Title";
import { IEntry } from "types/entry";

const EntrySummary: React.FC<IEntry> = ({
  slug,
  date,
  formatDate,
  title,
  tags,
  introductionSource,
  isShort,
}) => {
  const entryPath = `/entry/${slug}`;

  return (
    <article key={slug} className="border-b-2 last:border-b-0 pb-16">
      <EntryDate date={date} href={entryPath}>
        {formatDate}
      </EntryDate>

      {title && <Title href={entryPath}>{title}</Title>}

      {tags && <EntryTags tags={tags} />}

      <RehypeToReactElement htmlSource={introductionSource} isSummary />
      {!isShort && <ReadMore title={title} slug={slug} />}
    </article>
  );
};

export { EntrySummary };
