import Link from "next/link";

type Props = {
  href: string;
};

const ReadMore: React.VFC<Props> = ({ href }) => {
  return (
    <div className="text-center mt-8">
      <Link href={href}>
        <a className="link">続きを読む</a>
      </Link>
    </div>
  );
};

export { ReadMore };
