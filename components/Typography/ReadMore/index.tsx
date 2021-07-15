import Link from "next/link";

type Props = {
  href: string;
};

const ReadMore: React.VFC<Props> = ({ href }) => {
  return (
    <p className="readMore">
      <Link href={href}>
        <a className="link">続きを読む</a>
      </Link>
    </p>
  );
};

export { ReadMore };
