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
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
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
