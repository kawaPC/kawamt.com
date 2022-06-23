import Link from "next/link";

type Props = {
  tags: string[];
};

const EntryTags: React.FC<Props> = ({ tags }) => {
  return (
    <div className="font-mono text-gray-500 space-x-2">
      {tags.map((tag) => (
        <Link key={tag} href={`/entry/tags/${tag}`}>
          {`#${tag}`}
        </Link>
      ))}
    </div>
  );
};

export { EntryTags };
