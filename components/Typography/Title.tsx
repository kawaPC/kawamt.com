import Link from "next/link";

type Props = {
  href?: string;
};

const Title: React.FC<Props> = ({ href, children }) => {
  return (
    <div className="text-center text-2xl font-bold mt-5">
      {href ? (
        <Link href={href}>
          <a className="hover:text-gray-500">{children}</a>
        </Link>
      ) : (
        children
      )}
    </div>
  );
};

export { Title };
