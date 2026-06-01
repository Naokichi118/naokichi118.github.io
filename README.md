# Naokichi118 のホームページ

このサイトでは、研究・発表・連絡先などの情報をまとめています。

## 内容

- `index.html` - トップページ
- `papers.html` - 論文一覧
- `talks.html` - 講演一覧
- `styles.css` - スタイル
- `script.js` - 便利な機能

## 論文・講演の追加方法

新しいプレプリント、出版済み論文、講演を追加する場合は、該当する一覧に 1 件ずつ情報を追記してください。

### 1. プレプリントを追加する場合
- タイトル
- 著者
- 公開年
- arXiv や bioRxiv などのリンク
- 必要に応じて DOI や補足説明

### 2. 出版済み論文を追加する場合
- タイトル
- 著者
- 掲載誌名 / 会議名
- 年
- DOI または出版社リンク
- 必要に応じて preprint との対応関係

### 3. 講演を追加する場合
- 講演タイトル
- イベント名
- 日付
- スライド / 動画 / 要旨のリンク
- 必要に応じて開催場所

### 4. 追加するときの注意
- 既存の項目と同じ書式で書く
- 古い順・新しい順のどちらかをサイト全体で統一する
- リンク切れがないか確認する
- 可能ならプレプリントと出版版の両方を関連付けて記載する

## 追記例

### Publications

```html
<section id="publications">
  <h2>Publications</h2>

  <h3>Preprints</h3>
  <ul>
    <li>
      <strong>Title of Preprint</strong><br>
      Author A, Author B<br>
      <em>arXiv</em>, 2026<br>
      <a href="https://arxiv.org/abs/1234.56789" target="_blank" rel="noopener noreferrer">arXiv:1234.56789</a>
    </li>
  </ul>

  <h3>Published Papers</h3>
  <ul>
    <li>
      <strong>Title of Published Paper</strong><br>
      Author A, Author B<br>
      <em>Journal Name</em>, 2026<br>
      <a href="https://doi.org/10.1234/example-doi" target="_blank" rel="noopener noreferrer">DOI</a>
    </li>
  </ul>
</section>
```

### Talks

```html
<section id="talks">
  <h2>Talks</h2>
  <ul>
    <li>
      <strong>Talk Title</strong><br>
      Event Name, 2026-06-01<br>
      <a href="https://example.com/slides" target="_blank" rel="noopener noreferrer">Slides</a> /
      <a href="https://example.com/video" target="_blank" rel="noopener noreferrer">Video</a>
    </li>
  </ul>
</section>
```

## 更新時のひとこと

新しい項目を追加するときは、タイトル・著者・日付・リンクをそろえて、同じ形式で追記してください。

## ライセンス

© 2026 Naokichi118
