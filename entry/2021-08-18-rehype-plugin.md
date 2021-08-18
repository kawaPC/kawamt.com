---
title: 初めてのnpmパッケージ
tags: ['programming']
---

![公開したnpmパッケージ](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hachipochi/20210818/20210818174151.png)

[rehype-probe-image-size](https://www.npmjs.com/package/rehype-probe-image-size)というRehype Pluginをnpmパッケージとして公開した。
記事内の画像URLから画像サイズを取得し、imgタグにwidth/heightをセットしてくれる。

すでに[rehype-img-size](https://www.npmjs.com/package/rehype-img-size)というnpmパッケージが存在していたのだけど、こちらはCDNなどの外部画像には対応していなかったので使えなかった。
rehype-probe-image-sizeでは、外部画像の場合はサイズ取得のためreadFileの代わりにfetchが走るようになっている。
ビルド時に画像サーバーへリクエストが必要なのは若干気になるが、サイズの取得だけであれば画像全体をダウンロードする必要はないので、大きな負荷になることはないはず。
その辺りの処理は、rehype-probe-image-sizeが依存している[probe-image-size](https://github.com/nodeca/probe-image-size)がよしなにやってくれている。

imgタグのwidth/height指定は[HTML標準でも推奨されており](https://html.spec.whatwg.org/multipage/embedded-content.html#:~:text=developers%20are%20encouraged%20to%20specify%20an%20intrinsic%20aspect%20ratio%20via%20width%20and%20height%20attributes)、画像読み込みによるレイアウトシフトを避けるためには出来れば押さえておきたい項目。
なお、このブログはAMPに対応しているので[必須要件](https://amp.dev/ja/documentation/components/amp-img/#:~:text=(width%20%2F%20height%20%E3%81%AE%E3%82%88%E3%81%86%E3%81%AA)%E6%98%8E%E7%A4%BA%E7%9A%84%E3%81%AA%E3%82%B5%E3%82%A4%E3%82%B9%E3%82%99%E3%82%92%E3%81%82%E3%82%89%E3%81%8B%E3%81%97%E3%82%99%E3%82%81%E6%8C%87%E5%AE%9A%E3%81%97%E3%81%A6%E3%81%8A%E3%81%8F%E5%BF%85%E8%A6%81%E3%81%8B%E3%82%99%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99)だったりする。
