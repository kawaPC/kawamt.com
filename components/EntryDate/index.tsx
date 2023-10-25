import Link from "next/link";

type Props = {
  date: string;
  href: string;
  children: React.ReactNode;
};

const EntryDate: React.FC<Props> = ({ date, href, children }) => {
  return (
    <time dateTime={date}>
      <Link className="font-mono text-xl" href={href}>
        {children}
      </Link>
    </time>
  );
};

export { EntryDate };
