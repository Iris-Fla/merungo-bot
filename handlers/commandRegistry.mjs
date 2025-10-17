// handlers/commandRegistry.mjs - スラッシュコマンドの登録

import { REST, Routes } from 'discord.js';

export async function registerCommands(client, commands) {
    // コマンドデータを抽出
    const commandData = commands.map(cmd => cmd.data.toJSON());

    const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

    try {
        console.log(`🔄 ${commandData.length} 個のスラッシュコマンドを登録中...`);

        // グローバルコマンドとして登録
        await rest.put(Routes.applicationCommands(client.user.id), {
            body: commandData
        });

        console.log('✅ スラッシュコマンド登録完了！');
    } catch (error) {
        console.error('❌ コマンド登録に失敗しました:', error);
        throw error;
    }
}

export function loadCommands(commandModules) {
    const commands = new Map();

    for (const module of commandModules) {
        const command = module.default || module;
        commands.set(command.data.name, command);
        console.log(`📦 コマンド読み込み: /${command.data.name}`);
    }

    return commands;
}
