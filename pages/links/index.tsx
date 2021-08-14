import { AppHead } from "components/AppHead";

const LinksPage: React.FC = () => {
  return (
    <section className="mt-10">
      <AppHead path="/links" title="リンク一覧" description="リンク一覧" />
      <h1 className="text-2xl font-bold">リンク一覧</h1>
      <div className="mt-4 space-y-4">
        <div>
          <a
            className="underline text-base font-medium text-blue-600"
            href="https://github.com/kawaPC/kawamt.com"
          >
            https://github.com/kawaPC/kawamt.com
          </a>
          <p>このサイトのソースコードです</p>
        </div>
      </div>
    </section>
  );
};

export default LinksPage;

export const config = { amp: true };
