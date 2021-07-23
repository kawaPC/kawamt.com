import Head from "next/head";

const AboutPage: React.FC = () => {
  return (
    <section>
      <Head>
        <title>about</title>
      </Head>
      <div className="h-screen flex flex-col justify-center items-center text-xl">
        工事中です m(_ _)m
      </div>
    </section>
  );
};

export default AboutPage;

export const config = { amp: true };
