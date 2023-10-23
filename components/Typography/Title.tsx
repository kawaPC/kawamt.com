import Link from "next/link";

type Props = {
  href?: string;
  children: React.ReactNode;
};

const Title: React.FC<Props> = ({ href, children }) => {
  return (
    <div className="text-2xl">
      {href ? <Link href={href}>{children}</Link> : children}
    </div>
  );
};

export { Title };
