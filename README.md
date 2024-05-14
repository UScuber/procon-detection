# procon-detection

高専プロコンのサイトの更新情報の変更を検知して、discordで知らせるプログラムを作りました

## 初期設定

- モジュールのインストール
```
npm install
```

- channelAccessToken.jsonというファイルを作成し、webhook_urlを設定する
```
{
  "webhook_url": "<ここにwebhookのURLを書く>"
}
```

## 起動方法

```
node server.js
```

## 使用ライブラリ

- axios
- node-html-parser
