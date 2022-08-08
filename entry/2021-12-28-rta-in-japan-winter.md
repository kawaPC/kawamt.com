---
title: 年末の配信ラッシュを乗り越える
tags: ['diary', 'dev']
---

いや〜師走師走。
最近の年末年始は配信イベントが目白押しで忙しいですわ〜。

もはや説明不要なまでに恒例で盛り上がっているRTA in Japanに加えて、今年は獣道とかTOPANGAコンセプトマッチとか色々あってもう脳が処理しきれません。

でも頑張る。

***

すっかり配信視聴が娯楽の中心になってしまった我が家。
リビングでも寝室でもどの部屋でも配信を見られる環境はありますが、見所さんはやっぱり大画面でみたい。

ということでプロジェクターが大活躍。

![RTA in Japan Summer 2021の模様](8686BA4A-436A-41BD-94DE-C1F6CCDA2F99_2.jpg "RTA in Japan Summer 2021の模様")

ただ、大画面にするとコメントの視認性が悪い。
高速で流れるチャットはRTA in Japanの醍醐味のひとつでもあるので何とかしたい。
一応Twitchの機能でコメントのサイズは変えられるけど、MAXにしても足りない。

だったらスクリプトを書いてなんとかすればええがな……こういうときのためにプログラミングを覚えたんだ……。

といっても大したものではないです。ただのブックマークレットです。
適当に作ったブックマークのURLを以下のようなスクリプトに差し替えて、ブックマークからいつでも実行可能な状態で保存しておくという古来からあるテクニックですが、2021年の年末でもまだまだ現役で使えます。

スクリプト
```javascript
javascript:(function(){const head = document.getElementsByTagName('head')[0];const css1 = '.chat-input,.stream-chat-header,.channel-leaderboard,.chat-line__username-container { display: none !important; }';const css2 = '.chat-line__message { padding: 1rem 2rem !important; font-size: 2.5rem !important; }';const style1 = document.createElement('style');const style2 = document.createElement('style');const cssNode1 = document.createTextNode(css1);const cssNode2 = document.createTextNode(css2);style1.appendChild(cssNode1);style2.appendChild(cssNode2);head.appendChild(style1);head.appendChild(style2);const css3 = "span[data-test-selector='chat-message-separator'] { display: none !important; }";const style3 = document.createElement('style');const cssNode3 = document.createTextNode(css3);style3.appendChild(cssNode3);head.appendChild(style3);})()
```

内容
```javascript
const head = document.getElementsByTagName('head')[0];
// 上下のUIを消してチャット一覧だけにする
// ユーザーネーム消す
const css1 = '.chat-input,.stream-chat-header,.channel-leaderboard,.chat-line__username-container { display: none !important; }';
const style1 = document.createElement('style');
const cssNode1 = document.createTextNode(css1);
style1.appendChild(cssNode1);
head.appendChild(style1);

// 文字サイズとチャット間の隙間を大きく
const css2 = '.chat-line__message { padding: 1rem 2rem !important; font-size: 2.5rem !important; }';
const cssNode2 = document.createTextNode(css2);
const style2 = document.createElement('style');
style2.appendChild(cssNode2);
head.appendChild(style2);

// ユーザーネーム横のコロンを消す
const css3 = "span[data-test-selector='chat-message-separator'] { display: none !important; }";
const cssNode3 = document.createTextNode(css3);
const style3 = document.createElement('style');
style3.appendChild(cssNode3);
head.appendChild(style3);
```

やっていることは上記のとおり、単にCSSを上書きして表示を消したりサイズを変えたりしているだけ。
あまり精査してませんが上手いこと動いてくれました。

![チャットを読みやすくした](IMG_6968.jpg "")

チャットがスッキリ大きく読みやすくなりました。
良かったですね。
