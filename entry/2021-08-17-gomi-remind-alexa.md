---
title: ゴミ出しリマインド
tags: ['diary']
---

![貯まりに貯まった段ボール](https://cdn-ak.f.st-hatena.com/images/fotolife/h/hachipochi/20210817/20210817222250.jpg "貯まりに貯まった段ボール")

ゴミ出しの日をいつまで経っても覚えられないので、アレクサに教えてもらえるように設定を作った。

アレクサの定型アクションにも簡易的なスケジューリング機能はあったけれど、「木曜は週ごとに段ボールと古紙が入れ替わり」といった隔週機能のような複雑なことはできなかったので、[今日のゴミ出し](https://www.amazon.co.jp/d/B07BHTKYDQ)というスキルを使ってゴミ出しの曜日を覚えさせることにした。

このスキルを使うには微妙にコツが必要で、スキル名が「今日のゴミ出し」なので、例えば明日のゴミの種類を聞くには「アレクサ、"今日のゴミ出し"で明日のゴミは？」と聞かなければならない。
これは、このスキルが不親切な訳ではなく、スマートスピーカーの特性上「アレクサ(ウェイクワード)、○○(スキル名)で××(スキルのアクション)」という順番を崩せないためだ。
ただ、アレクサにはアレクサの呼びかけをさらにアクション化するマクロのような機能もあるので、それを活用すれば「アレクサ、明日のゴミは？」で「アレクサ、"今日のゴミ出し"で明日のゴミは？」を呼び出せるようにもできる。

これで「明日なんのゴミの日だっけ……」と思っても、いちいち自治体のpdfファイルを開く必要がなくなった。
「アレクサ、明日のゴミは？」を定期実行するアクションも作ったので、毎日21時にアレクサが出せるゴミの種類を教えてくれる。
ちょっとしたことだが、ゴミ出しとは一生付き合っていかなければならない可能性が高く、これで少しでも考えることが減らせるとしたら割と馬鹿にならないと思う。
それに「せっかくリマインド機能を作ったし」という気持ちがあるせいか、精神的にゴミ出しへ前向きになった気もする。多分。