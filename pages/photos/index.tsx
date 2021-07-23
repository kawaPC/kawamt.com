import Head from "next/head";

const PhotosPage: React.FC = () => {
  return (
    <section>
      <Head>
        <title>写真一覧</title>
      </Head>
      <div className="h-screen flex flex-col justify-center items-center text-xl">
        工事中です m(_ _)m
      </div>
    </section>
  );
};

export default PhotosPage;

export const config = { amp: true };
