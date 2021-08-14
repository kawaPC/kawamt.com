import { AppHead } from "components/AppHead";

const AboutPage: React.FC = () => {
  return (
    <section className="mt-10">
      <AppHead path="/about" title={"about"} description={"私について"} />
      <h1 className="text-2xl font-bold">About</h1>
      <p className="mt-2">
        かつては、バイクで神社をめぐったり、風景写真を撮ってまわったりする日々を送っていました。
        <br />
        現在は主にプログラミングを書いて過ごしています。
        <br />
        ときどき発作的にバイクで遠出をしたりキャンプに出かけたりしますが、基本的にはインドアです。
      </p>

      <h2 className="text-xl font-bold mt-5">居住地の変遷</h2>
      <p className="mt-2">広島 → 東京 → 京都 → 東京(現在)</p>

      <h2 className="text-xl font-bold mt-5">連絡先</h2>
      <amp-img
        src="/mail_address.png"
        layout="fixed"
        alt="メールアドレス"
        title="メールアドレス"
        width="187"
        height="17"
      />
    </section>
  );
};

export default AboutPage;

export const config = { amp: true };
