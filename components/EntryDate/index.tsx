import Link from "next/link";

type Props = {
  date: string;
  href: string;
  children: React.ReactNode;
};

const EntryDate: React.FC<Props> = ({ date, href, children }) => {
  return (
    <time dateTime={date}>
      <Link href={href}>
        <a className="font-mono text-xl">{children}</a>
      </Link>
    </time>
  );
};

export { EntryDate };
