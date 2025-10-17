// main.mjs - Discord Botのメインプログラム

// 必要なライブラリを読み込み
import { Client, GatewayIntentBits, Collection, PresenceUpdateStatus, ActivityType } from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import { handleInteraction } from './handlers/commandHandler.mjs';
import { registerCommands, loadCommands } from './handlers/commandRegistry.mjs';
import setVoiceStatus from './commands/setVoiceStatus.mjs';

// .envファイルから環境変数を読み込み
dotenv.config();

// Discord Botクライアントを作成
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,           // サーバー情報取得
        GatewayIntentBits.GuildVoiceStates, // ボイスチャンネル情報
    ],
});

// コマンドコレクションの初期化
client.commands = new Collection();

// Botが起動完了したときの処理
client.once('clientReady', async () => {
    console.log(`🎉 ${client.user.tag} が正常に起動しました！`);
    console.log(`📊 ${client.guilds.cache.size} つのサーバーに参加中`);

    // コマンドを読み込み
    const commands = loadCommands([setVoiceStatus]);
    client.commands = commands;

    // スラッシュコマンドを登録
    try {
        await registerCommands(client, [setVoiceStatus]);
    } catch (error) {
        console.error('❌ コマンド登録に失敗しました:', error);
    }

    // カスタムステータスを設定
    const updateStatus = () => {
        try {
            const ping = Math.round(client.ws.ping);
            client.user.setPresence({
                activities: [
                    {
                        name: `/sv | ${ping}ping`,
                        type: ActivityType.Custom
                    }
                ],
                status: PresenceUpdateStatus.Online
            });
        } catch (error) {
            console.error('❌ ステータス更新に失敗しました:', error);
        }
    };

    // 初回実行
    updateStatus();

    // 10秒ごとにステータスを更新
    setInterval(updateStatus, 10000);
});

// スラッシュコマンドのインタラクション処理
client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        await handleInteraction(interaction);
    }
});

// エラーハンドリング
client.on('error', (error) => {
    console.error('❌ Discord クライアントエラー:', error);
});

// プロセス終了時の処理
process.on('SIGINT', () => {
    console.log('🛑 Botを終了しています...');
    client.destroy();
    process.exit(0);
});

// Discord にログイン
if (!process.env.DISCORD_TOKEN) {
    console.error('❌ DISCORD_TOKEN が .env ファイルに設定されていません！');
    process.exit(1);
}

console.log('🔄 Discord に接続中...');
client.login(process.env.DISCORD_TOKEN)
    .catch(error => {
        console.error('❌ ログインに失敗しました:', error);
        process.exit(1);
    });

// Express Webサーバーの設定（Render用）
const app = express();
const port = process.env.PORT || 3000;

// ヘルスチェック用エンドポイント
app.get('/', (req, res) => {
    res.json({
        status: 'Bot is running! 🤖',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// サーバー起動
app.listen(port, () => {
    console.log(`🌐 Web サーバーがポート ${port} で起動しました`);
});