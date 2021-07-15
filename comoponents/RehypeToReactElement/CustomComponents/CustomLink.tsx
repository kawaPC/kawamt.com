import Link from "next/link";

type Props = {
  children: string;
  href: string;
};

const CustomLink: React.VFC<Props> = ({ children, href }) =>
  href.startsWith("/") || href === "" ? (
    <Link href={href} prefetch={false}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );

export { CustomLink };
