import Link from "next/link";

type Props = {
  children: string;
  href: string;
};

const CustomLink: React.VFC<Props> = ({ children, href }) =>
  href.startsWith("/") || href === "" ? (
    <Link href={href} prefetch={false}>
      <a className="underline">{children}</a>
    </Link>
  ) : (
    <a
      href={href}
      className="underline font-medium text-blue-600 hover:text-blue-900"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );

export { CustomLink };
