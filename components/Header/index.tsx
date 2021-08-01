import Link from "next/link";

const Header: React.VFC = () => {
  return (
    <header className="flex flex-col items-center md:items-end md:flex-row md:justify-between">
      <div className="text-4xl text-gray-600">
        <Link href="/">
          <a aria-label="kawamt.com">kawamt.com</a>
        </Link>
      </div>
      <nav className="space-x-5 text-gray-700 mt-4 md:mt-0">
        <Link href="/about">
          <a aria-label="自己紹介ページ">About</a>
        </Link>
        <a
          href="https://www.google.com/search?q=site:kawamt.com"
          aria-label="google検索"
        >
          検索
        </a>
        <a href="https://umebosh.tumblr.com" aria-label="Tumbrlの写真ページ">
          写真
        </a>
        <Link href="/links">
          <a aria-label="リンク一覧">リンク</a>
        </Link>
      </nav>
    </header>
  );
};

export { Header };
