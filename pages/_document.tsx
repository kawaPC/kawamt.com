import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
// @ts-ignore
import outputcss from "!raw-loader!../styles/output.css";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            key="custom"
            dangerouslySetInnerHTML={{
              __html: outputcss,
            }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link
            rel="icon"
            type="image/png"
            href="/android-chrome-192x192.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
