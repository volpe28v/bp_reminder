# bp_reminder
notion に書いたベストプラクティスを slack に通知する

## 動作イメージ
![image](https://user-images.githubusercontent.com/754962/138047049-5c625f78-502a-4f6a-bb72-939544978990.png)

## 準備
- Notion のアクセストークンを取得する
  - https://developers.notion.com/docs/getting-started
  - Notion の admin 権限が必要
- Slack のトークンを取得する
  - https://api.slack.com/apps から Bots を追加
  - Scope に `chat:write` を追加
  - Workspace にインストール
  - トークンを取得
  - Slack の通知したいチャンネルに app を追加する

## 環境変数を設定する
`.bashrc` などに。
```
export NOTION_ACCESS_TOKEN='xxxxxx'
export NOTION_BP_PAGE_ID='xxxxxx'
export BP_REMINEDER_TOKEN='xxxxx'
```

## ビルド
```
$ npm install
$ npm run build
```

## 実行
ローカルでの実行
```
$ PORT=8082 npm run start
```

別ターミナルから
```
$ cloudevents send http://localhost:8082 --id abc-123 --source cloudevents.conformance.tool --type foo.bar
```

## デバック実行
Notionからの取得データをコンソールに出力します
```
$ npm run main
```
