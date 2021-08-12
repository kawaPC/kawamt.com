---
title: このサイトのスコア
tags: ['programming']
---

![Lighthouseのスコア](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hachipochi/20210813/20210813022750.png "Lighthouseのスコア")

このブログのLighthouseスコアを貼っておく。

このサイトはAMP Validな実装になっているが、当のAMP scriptがUnused Javascriptとして検出される問題があり、Performanceのスコアが100にならないこともある。
AMPの[issue](https://github.com/ampproject/amphtml/issues/28638)にも同様の事象が報告されているが、閉じられている。
何だか気持ち悪いが、感覚的には満足の行く速度が出ているので問題ないかな……。
記事を増やすといずれPerformanceスコアが落ちるはずなので、ページネーションにはなる早で対応しておきたいところ。

なお、SEOがいくらか減点されているのは「Links do not have descriptive text」という怒られが発生しているため。
「説明がなく遷移先を予測できないリンクは良くない」ということだが、このサイトでいうと"続きを読む"のリンクがそれに引っかかる。
"*記事タイトル*の続きを読む"という形式のリンクに変更すれば解決することは分かっているが、シンプルな"続きを読む"のある古き良きブログのスタイルを守りたいので対応は見送ることにした。

あとヘッダー部分の「リンク」というリンクも良くないらしい。言われてみると確かに……(でも変えない)
