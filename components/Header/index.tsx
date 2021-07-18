import Link from "next/link";

const Header: React.VFC = () => {
  return (
    <header className="flex flex-col items-center md:items-end md:flex-row md:justify-between">
      <div className="text-4xl text-gray-700">
        <Link href="/">kawamt.com</Link>
      </div>
      <nav className="space-x-5 text-gray-700 mt-4 md:mt-0">
        <Link href="/">About</Link>
        <Link href="/">検索</Link>
        <Link href="/">写真</Link>
        <Link href="/">リンク</Link>
      </nav>
    </header>
  );
};

export { Header };