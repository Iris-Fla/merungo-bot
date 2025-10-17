// commands/setVoiceStatus.mjs - ボイスチャンネルステータス変更コマンド

import { SlashCommandBuilder, ChannelType, PermissionFlagsBits, MessageFlags } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('sv')
        .setDescription('ボイスチャンネルのステータスを設定します')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option
                .setName('チャンネル')
                .setDescription('ステータスを変更するボイスチャンネル')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildVoice)
        )
        .addStringOption(option =>
            option
                .setName('内容')
                .setDescription('設定するステータス内容（最大96文字）')
                .setRequired(true)
                .setMaxLength(96)
        ),

    async execute(interaction) {
        const voiceChannel = interaction.options.getChannel('チャンネル');
        const status = interaction.options.getString('内容');

        try {
            // Discord REST API を使用してボイスチャンネルステータスを設定
            await interaction.client.rest.put(`/channels/${voiceChannel.id}/voice-status`, {
                body: {
                    status: status,
                }
            });

            // まだ返信していない場合のみ返信
            if (!interaction.replied && !interaction.deferred) {
                const reply = await interaction.reply({
                    content: `✅ **${voiceChannel.name}** のステータスを以下に設定しました：\n\`\`\`\n${status}\n\`\`\``,
                    flags: MessageFlags.Ephemeral
                });

                // 3秒後に自動削除
                setTimeout(() => reply.delete().catch(() => {}), 3000);
            }

            console.log(`✏️ ステータス変更: ${voiceChannel.name} -> "${status}" (実行者: ${interaction.user.tag})`);
        } catch (error) {
            console.error('❌ ステータス変更に失敗しました:', error);

            const errorResponse = {
                content: `❌ ステータスの変更に失敗しました。\n\`\`\`\n${error.message}\n\`\`\``,
                flags: MessageFlags.Ephemeral
            };

            let reply;
            if (interaction.replied) {
                reply = await interaction.followUp(errorResponse);
            } else if (interaction.deferred) {
                reply = await interaction.editReply(errorResponse);
            } else {
                reply = await interaction.reply(errorResponse);
            }

            // 3秒後に自動削除
            setTimeout(() => reply.delete().catch(() => {}), 3000);
        }
    }
};
