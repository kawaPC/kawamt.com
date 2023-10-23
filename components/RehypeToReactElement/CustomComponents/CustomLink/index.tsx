import Link from "next/link";

type Props = {
  children: string;
  href: string;
};

const CustomLink: React.FC<Props> = ({ children, href }) =>
  href.startsWith("https://kawamt.com") ? (
    <Link href={href.replace("https://kawamt.com", "")} prefetch={false}>
      <a className="underline font-medium text-blue-600">{children}</a>
    </Link>
  ) : (
    <a
      href={href}
      className="underline font-medium text-blue-600"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );

export { CustomLink };
