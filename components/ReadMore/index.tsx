import Link from "next/link";

type Props = {
  href: string;
};

const ReadMore: React.VFC<Props> = ({ href }) => {
  return (
    <div className="text-center mt-8">
      <Link href={href}>
        <a className="text-base font-bold pb-1 border-b-2 border-gray-800 hover:border-gray-500">
          続きを読む
        </a>
      </Link>
    </div>
  );
};

export { ReadMore };
