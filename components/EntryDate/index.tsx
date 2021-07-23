import Link from "next/link";

type Props = {
  date: string;
  href: string;
};

const EntryDate: React.FC<Props> = ({ date, href, children }) => {
  return (
    <time dateTime={date}>
      <div className="mx-auto mb-5 w-28 text-sm text-white text-center leading-6 rounded-sm bg-gray-900 hover:opacity-70">
        <Link href={href}>
          <a className="block py-1 hover:opacity-100">{children}</a>
        </Link>
      </div>
    </time>
  );
};

export { EntryDate };
