// handlers/commandHandler.mjs - スラッシュコマンドの処理

export async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`❌ コマンド "${interaction.commandName}" が見つかりません`);
        await interaction.reply({
            content: '❌ そのコマンドは見つかりません',
            ephemeral: true
        });
        return;
    }

    try {
        console.log(`📝 コマンド実行: /${interaction.commandName} (ユーザー: ${interaction.user.tag})`);
        await command.execute(interaction);
    } catch (error) {
        console.error(`❌ コマンド実行エラー (${interaction.commandName}):`, error);
        const response = {
            content: '❌ コマンド実行中にエラーが発生しました',
            ephemeral: true
        };

        if (interaction.replied) {
            await interaction.followUp(response);
        } else if (interaction.deferred) {
            await interaction.editReply(response);
        } else {
            await interaction.reply(response);
        }
    }
}
