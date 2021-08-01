import Link from "next/link";

type Props = {
  href?: string;
};

const Title: React.FC<Props> = ({ href, children }) => {
  return (
    <div className="text-2xl">
      {href ? (
        <Link href={href}>
          <a>{children}</a>
        </Link>
      ) : (
        children
      )}
    </div>
  );
};

export { Title };
