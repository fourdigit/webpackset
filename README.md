# webpackset

Webpackベースのフロントエンド開発環境です。
FOURDIGITが考えるベストプラクティスにのっとって、 `opinionated` な作りにしています。案件個別の要請にあわないこともあると思うので、その場合は `gulpset` をつかったり、 `create-react-app` や `vue-cli` や `angular-cli` をつかうことを検討してください。
Gulpを廃して全面的にWebpackのなかで環境をつくることで、ビルド速度の向上を目指しています。

※ Gulpを廃した欠点として、`yarn start`前にエントリーポイントとなるファイルを追加する必要があるという欠点があります。

## 全体構成

https://survivejs.com/webpack/developing/composing-configuration/ を参考にして、loader別にファイルを分けています。

## EJS

HTMLテンプレートとして、`EJS`や`pug`の選択肢がありますが、HTMLに近い書き方を維持するために`EJS`を採用しています。(テンプレート機能は`pug`のほうが強力なので、案件で必要だと感じたら追加してください)
Webpackは、1つのエントリーポイント設定に対して1ファイルを生成するという形になっています。
ふつうにejs-loaderをつかうと、1ページ増やすごとに`webpack.config`を書き直すことになり、メンテナンス性が悪いです。これを避けるため、Webpack起動時に、エントリーポイントとなる`ejs`ファイルを探索して、エントリーポイントの設定とします。下記の記事を参考にしました。

- https://qiita.com/kn1cht/items/d3fcd3376ab3461bf05a#%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AE%E6%95%B0%E3%81%A0%E3%81%91htmlwebpackplugin%E3%82%92%E5%A2%97%E3%82%84%E3%81%95%E3%81%AA%E3%81%8F%E3%81%A6%E3%81%84%E3%81%84%E3%82%88%E3%81%86%E3%81%AB%E3%81%99%E3%82%8B
- https://github.com/kayac/kayac-html5-starter/blob/master/webpack.config.base.js

## SCSS

CSSのメタ言語としては、`Sass`, `Stylus`, `PostCSS`(これはメタ言語ではなくポストプロセッサですが)が候補に上がりますが、

- `Stylus`のエコシステム・ツールチェイン(VSCode側対応、Stylintの開発が活発でない)が弱く、ユーザーも少ない
- `SCSS`記法になれているメンバーが多い
- `PostCSS`にして仕様が追いついたら`PostCSS`を外すということも考えられるが、その日が通そう

ということで、`SCSS`で書く形にしています。
`/.browserlistrc`に基づいて、autoprefixerが働きます。

## SCSS Lint

SCSS修正時にLintをおこない、エラーがあれば通知を出します。

## Babel

ES2018水準で書けるようにしています。

## ES Lint

JS修正時にLintを行い、エラーがあれば通知を出します。

## TypeScript

`babel 7`でのコンパイルを行なっています。

## 画像

development時は何もせず、production時に圧縮されるようにしています。

## Deploy

単純なNode.js(v8 lts/carbon)で書いています。
