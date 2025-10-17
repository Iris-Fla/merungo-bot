# 🎙️ merungo-bot

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)
[![Discord.js](https://img.shields.io/badge/discord.js-v14.23.2-blue)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/node.js-v16+-green)](https://nodejs.org/)

> Discord のボイスチャンネルステータスを簡単に設定・管理できる Discord Bot

---

## 📋 概要

**merungo-bot** は、Discord サーバーのボイスチャンネルに カスタムステータスを設定できる、シンプルで使いやすい Discord Bot です。サーバー管理者がボイスチャンネルの目的や状態を明確に表示できます。

## 📖 使い方

### `/sv` コマンド

ボイスチャンネルのステータスを設定します。

```
/sv チャンネル:<voice_channel> 内容:<status_text>
```

#### パラメータ

| パラメータ     | 説明                                 | 必須 | 制限                     |
| -------------- | ------------------------------------ | ---- | ------------------------ |
| **チャンネル** | ステータスを変更するボイスチャンネル | ✅   | Guild Voice Channel のみ |
| **内容**       | 設定するステータス内容               | ✅   | 最大 96 文字             |

#### 実行例

```
/sv チャンネル:#ゲーム部屋 内容:🎮 マイクラマルチプレイ中！
```

#### レスポンス

- **成功時**: ✅ チャンネル名とステータスが表示されます（3 秒後に自動削除）
- **失敗時**: ❌ エラー詳細が表示されます（3 秒後に自動削除）

#### 必要な権限

- Bot: `チャンネル管理` 権限
- ユーザー: 実行ユーザーは対象チャンネルの `チャンネル管理` 権限が必要

---

## 🚀 クイックスタート

### 前提条件

- Node.js v16 以上
- npm または yarn
- Discord Developer Portal での Bot 作成

### インストール

1. **リポジトリをクローン**

   ```bash
   git clone https://github.com/Iris-Fla/merungo-bot.git
   cd merungo-bot
   ```

2. **依存パッケージをインストール**

   ```bash
   npm install
   ```

3. **環境変数を設定**

   ```bash
   cp .env.example .env
   ```

   `.env` ファイルを編集して以下の環境変数を設定してください：

   ```
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   ```

4. **Bot を起動**
   ```bash
   npm start
   ```

---

## 🏗️ プロジェクト構造

```
merungo-bot/
├── main.mjs                    # Bot のメインプログラム
├── package.json                # プロジェクト設定ファイル
├── LICENSE                     # ライセンス
├── README.md                   # このファイル
├── commands/
│   └── setVoiceStatus.mjs      # ボイスチャンネルステータス変更コマンド
└── handlers/
    ├── commandHandler.mjs      # コマンド実行処理
    └── commandRegistry.mjs     # コマンド登録処理
```

### 主要ファイルの説明

| ファイル                       | 説明                                             |
| ------------------------------ | ------------------------------------------------ |
| `main.mjs`                     | Bot の起動、イベントハンドリング、ステータス更新 |
| `commands/setVoiceStatus.mjs`  | `/sv` コマンドの実装                             |
| `handlers/commandHandler.mjs`  | コマンド実行時の処理フロー                       |
| `handlers/commandRegistry.mjs` | コマンド登録と読み込み                           |

---

## 🛠️ 開発者向け情報

### 必要な Discord.js インテント

Bot が正常に動作するために以下のインテント設定が必要です：

- `Guilds` - サーバー情報の取得
- `GuildVoiceStates` - ボイスチャンネル情報の取得

### 環境変数

```env
DISCORD_TOKEN=          # Discord Bot のトークン
CLIENT_ID=              # Discord Application ID
```

### 依存パッケージ

```json
{
  "discord.js": "^14.23.2", // Discord API ラッパー
  "dotenv": "^17.2.3", // 環境変数管理
  "express": "^5.1.0" // Web フレームワーク
}
```

---

## 🤝 トラブルシューティング

### ❌ Bot が起動しない

1. `.env` ファイルが正しく設定されているか確認
2. `DISCORD_TOKEN` と `CLIENT_ID` の値が正しいか確認
3. Bot にサーバーへの招待権限があるか確認

### ❌ コマンドが反応しない

1. Bot がサーバーに参加しているか確認
2. Bot に `アプリケーションコマンド` を使用する権限があるか確認
3. コンソール出力のエラーメッセージを確認

### ❌ ステータス変更がうまくいかない

1. 対象ボイスチャンネルが正しく選択されているか確認
2. ステータステキストが 96 文字以内か確認
3. Bot に対象チャンネルの `チャンネル管理` 権限があるか確認

---

## 📄 ライセンス

このプロジェクトは ISC ライセンスの下で公開されています。
詳細は [LICENSE](LICENSE) ファイルをご覧ください。

---

## 🙌 Contributing

改善提案やバグ報告は Issue で、コード提案は Pull Request で お待ちしています！

---

## 📞 サポート

問題が発生した場合は、GitHub Issues で報告してください。

---

**Made with ❤️ by Iris-Fla**
