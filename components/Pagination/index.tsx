import Link from "next/link";

type Props = {
  page: number;
  isLast: boolean;
};

const Pagination: React.VFC<Props> = ({ page, isLast }) => {
  return (
    <nav className="flex justify-between text-base">
      {page === 1 ? (
        <span />
      ) : (
        <Link href={page === 2 ? "/" : `/entry/page/${page - 1}`}>
          新しい記事
        </Link>
      )}
      {!isLast && <Link href={`/entry/page/${page + 1}`}>古い記事</Link>}
    </nav>
  );
};

export { Pagination };
