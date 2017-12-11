# LaviniaBot

アゾリウス評議会第10管区のラヴィニアさんがスプレッドシートに勤怠管理してくれるやつです。

# How to Use

必要なファイル
- Lavinia.gs
- 対象のスプレッドシート

これらをGoogle Drive内に追加します。

Lavinia.gsにライブラリを追加します。
- SlackApp
  - M3W5Ut3Q39AaIwLquryEPMwV62A3znfOO

Lavinia.gsのプロパティにいくつか追加します。

- SLACK_ACCESS_TOKEN
  - Slackのアクセストークンです
- VERIFY_TOKEN
  - SlackのVerifyトークンです
- SPREADSHEET_URL
  - ラヴィニアさんが記入してくれるスプレッドシートのURLです
  
initialize()で初期化処理をしており、ここで対象となる列の指定をしています。
デフォルトで10列目に出勤時間、11列目に退勤時間を入力するようにしています。必要に応じて変えてください。
(プロパティに持つべきだと思ったのでそのうち修正します)

Outgoing Webhooksをslackに追加し、以下を設定します。
チャンネル: Laviniaを動かしたいチャンネル
引き金となる言葉: ラヴィニア、
URL: Lavinia.gsのウェブアプリケーションURL
- 公開→ウェブアプリケーションとして導入 のあたりから確認できます。

ここで取得できるトークンがVerifyトークンとなります。

あとはslackにLaviniaを追加してアクセストークンを取得できればラヴィニアさんが動くようになります。

うまくいけば指定したチャンネルで「ラヴィニア、」と始まる言葉で動きます。
