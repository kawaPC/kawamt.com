import Link from "next/link";

type Props = {
  page: number;
  tag?: string;
  isLast: boolean;
};

const Pagination: React.FC<Props> = ({ page, tag, isLast }) => {
  const basePath = tag ? `/entry/tags/${tag}/page` : "/entry/page";

  return (
    <nav className="flex justify-between text-base">
      {page === 1 ? (
        <span />
      ) : (
        <Link href={page === 2 ? "/" : `${basePath}/${page - 1}`}>
          新しい記事
        </Link>
      )}
      {!isLast && <Link href={`${basePath}/${page + 1}`}>古い記事</Link>}
    </nav>
  );
};

export { Pagination };
